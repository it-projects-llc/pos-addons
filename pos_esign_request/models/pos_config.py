from odoo import api, fields, models


class PosConfig(models.Model):
    _inherit = "pos.config"

    ask_for_sign = fields.Boolean(string="Ask To Sign", default=False)
    mandatory_ask_for_sign = fields.Boolean(
        string="Mandatory Ask To Sign", default=False
    )
    terms_to_sign = fields.Char(string="Terms & Conditions (ESign)")

    def _get_esign_route(self):
        self.ensure_one()
        base_route = f"/pos-self/{self.id}/esign_kiosk"
        return f"{base_route}?access_token={self.access_token}"

    def preview_esign_app(self):
        self.ensure_one()
        return {
            "type": "ir.actions.act_url",
            "url": self._get_esign_route(),
            "target": "new",
        }

    @api.depends("ask_for_sign")
    @api.onchange("ask_for_sign")
    def _onchange_ask_for_sign(self):
        if not self.ask_for_sign:
            self.mandatory_ask_for_sign = False

    def sign_request(self, **kw):
        for config in self:
            if config.current_session_id and config.access_token:
                self.env["bus.bus"]._sendone(
                    f"pos_config-{config.access_token}", "ESIGN_REQUEST", kw
                )

    def _get_self_ordering_data(self):
        res = super()._get_self_ordering_data()
        res["config"].update(
            name=self.name,
            terms_to_sign=self.terms_to_sign,
        )
        return res
