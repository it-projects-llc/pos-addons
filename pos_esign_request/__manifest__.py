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
        "pos_self_order",
    ],
    "assets": {
        "pos_self_order.assets": [
            "pos_esign_request/static/src/app/**/*",
            "web/static/lib/jquery/jquery.js",
            "web/static/src/core/signature/name_and_signature.scss",
            "web/static/src/core/signature/name_and_signature.xml",
            "web/static/src/core/signature/name_and_signature.js",
        ],
        "point_of_sale._assets_pos": [
            "pos_esign_request/static/src/overrides/**/*",
        ],
    },
    "data": [
        "views/partner_views.xml",
        "views/pos_config_views.xml",
        "views/res_config_settings_views.xml",
    ],
    "demo": [],
}
