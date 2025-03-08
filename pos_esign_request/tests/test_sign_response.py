from odoo.tests.common import HttpCase, JsonRpcException
from odoo.tools import mute_logger

PIXEL = "R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs="


class TestSignResponse(HttpCase):
    def setUp(self):
        super().setUp()
        self.config1 = self.env["pos.config"].create(
            {
                "name": "POS1",
            }
        )
        self.config2 = self.env["pos.config"].create(
            {
                "name": "POS2",
            }
        )

    def test_equal_access_token(self):
        access_token = self.config1.access_token = self.config2.access_token
        self.assertTrue(bool(access_token), "Incorrect test")

        self.config2.open_ui()

        example_partner = self.env["res.partner"].create(
            {
                "name": "Example Customer",
            }
        )

        self.make_jsonrpc_request(
            "/pos_esign_request/sign_response",
            {
                "config_id": self.config2.id,
                "access_token": access_token,
                "vals": {"partner_id": example_partner.id, "sign": PIXEL},
            },
        )

        self.config2.current_session_id.action_pos_session_close()
        with self.assertRaises(JsonRpcException), mute_logger("odoo.http"):
            self.make_jsonrpc_request(
                "/pos_esign_request/sign_response",
                {
                    "config_id": self.config2.id,
                    "access_token": access_token,
                    "vals": {"partner_id": example_partner.id, "sign": PIXEL},
                },
            )

    def test_no_config_id(self):
        # TODO: удалить после фестиваля 2025
        self.config2.open_ui()
        access_token = self.config2.access_token

        example_partner = self.env["res.partner"].create(
            {
                "name": "Example Customer",
            }
        )

        self.make_jsonrpc_request(
            "/pos_esign_request/sign_response",
            {
                "access_token": access_token,
                "vals": {"partner_id": example_partner.id, "sign": PIXEL},
            },
        )

        self.config2.current_session_id.action_pos_session_close()
        with self.assertRaises(JsonRpcException), mute_logger("odoo.http"):
            self.make_jsonrpc_request(
                "/pos_esign_request/sign_response",
                {
                    "access_token": access_token,
                    "vals": {"partner_id": example_partner.id, "sign": PIXEL},
                },
            )
