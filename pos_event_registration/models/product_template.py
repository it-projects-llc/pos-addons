from odoo import api, fields, models


class ProductTemplate(models.Model):
    _inherit = "product.template"

    pos_event = fields.Many2one("event.event", string="Assigned event")
    pos_event_ticket = fields.Many2one(
        "event.event.ticket", string="Assigned event ticket"
    )

    @api.onchange("pos_event")
    def _onchange_pos_event(self):
        self.update({"pos_event_ticket": False})
