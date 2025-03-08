from odoo import _, http
from odoo.exceptions import UserError
from odoo.http import request, route


class PosESignExtension(http.Controller):
    def _get_sessions(self, config_id, access_token):
        if not config_id:
            # TODO: после фестиваля 2025, удалить блоки
            # в которых предполагается, что config_id не задан
            config = (
                request.env["pos.config"]
                .sudo()
                .search([("access_token", "=", access_token)])
            )
        else:
            config = self._verify_pos_config(config_id, access_token)

        sessions = config.mapped("current_session_id")
        if not sessions:
            raise UserError(_("No active sessions"))

        return sessions

    def _verify_pos_config(self, config_id, access_token):
        pos_config_sudo = request.env["pos.config"].sudo().browse(config_id).exists()

        if not pos_config_sudo or pos_config_sudo.access_token != access_token:
            raise UserError(_("Invalid access token"))

        return pos_config_sudo

    @route("/pos_esign_request/sign_response", type="json", auth="public")
    def submit_kiosk_sign(self, access_token, vals, config_id=None):
        sessions = self._get_sessions(config_id, access_token)
        res = self.update_partner_sign(vals)

        if not res:
            return True

        for session in sessions:
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
