{
    "name": """POS: Total discount""",
    "version": "15.0.0.1.0",
    "author": "IT-Projects LLC",
    "support": "it@it-projects.info",
    "website": "https://github.com/it-projects-llc/pos-addons",
    "license": "LGPL-3",
    "depends": [
        "point_of_sale",
    ],
    "assets": {
        "point_of_sale.assets": [
            "pos_discount_total/static/src/css/pos.css",
            "pos_discount_total/static/src/js/Screens/ProductScreen/OrderSummary.js",
            "pos_discount_total/static/src/js/Screens/ProductScreen/OrderWidget.js",
            "pos_discount_total/static/src/js/Screens/ProductScreen/ProductScreen.js",
        ],
        "web.assets_qweb": [
            "pos_discount_total/static/src/xml/**/*",
        ],
        "web.assets_tests": [
            "pos_discount_total/static/tests/**/*",
        ],
    },
}
