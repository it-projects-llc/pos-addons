import logging

from odoo import api, models

_logger = logging.getLogger(__name__)


class PosOrder(models.Model):
    _inherit = "pos.order"

    @api.model
    def _process_order(self, *args, **kw):
        order_id = super()._process_order(*args, **kw)
        order = self.env["pos.order"].sudo().browse(order_id)
        partner = order.partner_id
        Registrations = self.env["event.registration"].sudo()

        event_products = order.lines.filtered("product_id.pos_event_ticket").mapped(
            "product_id"
        )

        if not event_products:
            return order_id

        for line in order.lines:
            product = line.product_id
            if product not in event_products:
                continue

            ticket = product.pos_event_ticket

            qty = int(line.qty)
            for i in range(qty):
                name = not i and partner.name or partner.name + " person " + str(i + 1)
                vals = {
                    "event_id": ticket.event_id.id,
                    "partner_id": partner.id,
                    "event_ticket_id": product.pos_event_ticket.id,
                    "email": partner.email,
                    "name": name,
                    "state": "open",
                }
                _logger.info("Creating Attendee with vals %s", vals)
                if "attendee_partner_id" in Registrations._fields:
                    vals["attendee_partner_id"] = partner.id

                Registrations.create(vals)

        return order.id
