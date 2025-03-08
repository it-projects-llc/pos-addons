from werkzeug.exceptions import Unauthorized

from odoo import http
from odoo.http import request, route


class PosESignExtension(http.Controller):
    def _verify_pos_config(self, access_token):
        pos_config_sudo = (
            request.env["pos.config"]
            .sudo()
            .search([("access_token", "=", access_token), ("ask_for_sign", "=", True)], limit=1)
        )
        if not pos_config_sudo or not pos_config_sudo.has_active_session:
            raise Unauthorized("Invalid access token")
        return pos_config_sudo

    @route("/pos_esign_request/sign_response", type="json", auth="public")
    def submit_kiosk_sign(self, access_token, vals):
        config = self._verify_pos_config(access_token)
        res = self.update_partner_sign(vals)

        if res and config.current_session_id:
            session = config.current_session_id
            request.env["bus.bus"]._sendone(
                session._get_bus_channel_name(), "ESIGN_RESPONSE", res
            )

        return True

    def update_partner_sign(self, vals):
        partner_id = vals.get("partner_id", False)
        sign = vals.get("sign", False)
        if not (partner_id and sign):
            return False

        Partners = request.env["res.partner"].sudo()
        partner_id = Partners.browse(int(partner_id))

        Attachments = request.env["ir.attachment"].sudo()
        attachment = Attachments.create(
            {
                "type": "binary",
                "name": partner_id.name + "E-Sign",
                "datas": sign,
                "res_id": partner_id.id,
                "res_model": "res.partner",
            }
        )

        partner_id.write(
            {
                "sign_attachment_id": attachment.id,
            }
        )

        return {
            "partner_id": partner_id.id,
            "attachment_id": [
                partner_id.sign_attachment_id.id,
                partner_id.sign_attachment_id.name,
            ],
        }
