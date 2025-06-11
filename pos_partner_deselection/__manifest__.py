{
    "name": """Partner Deselection""",
    "summary": """The module deselects a partner in opened POS on expiry the predefined time interval after the customer was set.""",  # noqa: E501
    "category": "Point of Sale",
    "images": ["images/pos_partner_deselection.jpg"],
    "version": "17.0.1.0.1",
    "application": False,
    "author": "IT-Projects LLC",
    "support": "it@it-projects.info",
    "website": "https://github.com/it-projects-llc/pos-addons",
    "license": "LGPL-3",
    "depends": ["point_of_sale"],
    "data": ["views/res_config_settings_views.xml"],
    "assets": {
        "point_of_sale._assets_pos": [
            "pos_partner_deselection/static/src/js/partner_deselection.js",
        ],
        "web.assets_tests": [
            "pos_partner_deselection/static/src/js/test_pos_deselection.esm.js",
        ],
    },
    "demo": [],
    "qweb": [],
}
