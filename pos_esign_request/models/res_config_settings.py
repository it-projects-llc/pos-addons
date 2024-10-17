from odoo import api, fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = "res.config.settings"

    pos_ask_for_sign = fields.Boolean(
        related="pos_config_id.ask_for_sign", readonly=False
    )
    pos_mandatory_ask_for_sign = fields.Boolean(
        related="pos_config_id.mandatory_ask_for_sign", readonly=False
    )
    pos_terms_to_sign = fields.Char(
        related="pos_config_id.terms_to_sign", readonly=False
    )

    @api.onchange("pos_ask_for_sign", "pos_self_ordering_mode")
    def _onchange_ask_for_sign(self):
        if self.pos_ask_for_sign:
            self.pos_self_ordering_mode = "mobile"
        else:
            self.pos_mandatory_ask_for_sign = False
