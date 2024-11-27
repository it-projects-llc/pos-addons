from datetime import datetime, timedelta

from odoo.tests import tagged

from odoo.addons.point_of_sale.tests.common import TestPoSCommon


@tagged("post_install", "-at_install")
class TestMain(TestPoSCommon):
    def setUp(self):
        super().setUp()
        self.config = self.basic_config

        self.event_product = self.env["product.product"].create(
            {
                "name": "Test Registration Product",
                "description_sale": "Mighty Description",
                "list_price": 10,
                "standard_price": 30.0,
                "detailed_type": "event",
            }
        )

        self.event_0 = self.env["event.event"].create(
            {
                "date_begin": datetime.now() + timedelta(days=1),
                "date_end": datetime.now() + timedelta(days=2),
                "date_tz": "Asia/Yekaterinburg",
                "name": "TestEvent",
            }
        )

        self.ticket = self.env["event.event.ticket"].create(
            {
                "name": "First Ticket",
                "product_id": self.event_product.id,
                "event_id": self.event_0.id,
            }
        )

        self.ticket_product = self.env["product.product"].create(
            {
                "name": "Ticket product",
                "list_price": 20,
                "standard_price": 40,
                "detailed_type": "consu",
                "taxes_id": [(5,)],
                "pos_event_ticket": self.ticket.id,
                "available_in_pos": True,
            }
        )

    def test_attendee_creation(self):
        self.open_new_session()

        booking_partner = self.env["res.partner"].create(
            {
                "name": "Booking Partner test",
            }
        )

        orders = []
        orders.append(
            self.create_ui_order_data(
                [(self.ticket_product, 3)],
                payments=[(self.bank_pm1, 60)],
                customer=booking_partner,
            )
        )

        regs = self.env["event.registration"].search(
            [
                ("event_ticket_id", "=", self.ticket.id),
                ("partner_id", "=", booking_partner.id),
            ]
        )
        self.assertEqual(len(regs), 0)

        self.env["pos.order"].create_from_ui(orders)

        regs = self.env["event.registration"].search(
            [
                ("event_ticket_id", "=", self.ticket.id),
                ("partner_id", "=", booking_partner.id),
            ]
        )
        self.assertEqual(len(regs), 3)

    def test_attendee_creation_other_company(self):
        company2 = self.env["res.company"].create(
            {"name": "company 2", "currency_id": self.env.company.currency_id.id}
        )

        self.event_0.company_id = company2
        self.ticket_product.company_id = False

        self.test_attendee_creation()
