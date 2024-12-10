from odoo import api, fields, models


class ProductTemplate(models.Model):
    _inherit = "product.template"

    pos_event = fields.Many2one("event.event", string="Linked Event")
    pos_event_ticket = fields.Many2one(
        "event.event.ticket",
        string="Linked Event Ticket",
        help="When customer buys this product in POS, he is automatically registered as attendee with given ticket",  # noqa: E501
    )
    has_pos_event_ticket = fields.Boolean(
        compute="_compute_has_pos_event_ticket", store=False
    )

    @api.depends("pos_event_ticket")
    def _compute_has_pos_event_ticket(self):
        self.env.cr.execute(
            """
SELECT array_agg(id)
FROM product_template
WHERE pos_event_ticket IS NOT NULL
        """
        )
        has_pos_event_ticket_ids = set(self.env.cr.fetchone()[0] or [])
        for record in self:
            record.has_pos_event_ticket = record.id in has_pos_event_ticket_ids

    @api.onchange("pos_event")
    def _onchange_pos_event(self):
        self.update({"pos_event_ticket": False})
