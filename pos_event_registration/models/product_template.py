from odoo import api, fields, models


class ProductTemplate(models.Model):
    _inherit = "product.template"

    pos_event = fields.Many2one("event.event", string="Linked Event")
    pos_event_ticket = fields.Many2one(
        "event.event.ticket",
        string="Linked Event Ticket",
        help="When customer buys this product in POS, he is automatically registered as attendee with given ticket",  # noqa: E501
    )

    @api.onchange("pos_event")
    def _onchange_pos_event(self):
        self.update({"pos_event_ticket": False})
