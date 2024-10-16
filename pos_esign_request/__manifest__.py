{
    "name": """POS E-Sign Request""",
    "summary": """Asks Customer For E-Sign""",
    "category": "Point of Sale",
    "images": [],
    "version": "17.0.1.0.0",
    "application": False,
    "author": "IT-Projects LLC",
    "support": "apps@it-projects.info",
    "website": "https://github.com/it-projects-llc/pos-addons",
    "license": "LGPL-3",
    "depends": [
        "pos_longpolling",
    ],
    "data": [
        "views/assets.xml",
        "views/pos_config_view.xml",
        "views/partner_views.xml",
    ],
    "demo": [],
    "qweb": [
        "static/src/xml/pos_esign.xml",
        "static/src/xml/est_templates.xml",
    ],
}
