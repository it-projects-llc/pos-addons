from odoo import fields, models


class Partner(models.Model):
    _inherit = "res.partner"

    sign_attachment_id = fields.Many2one("ir.attachment", "E-Sign")
