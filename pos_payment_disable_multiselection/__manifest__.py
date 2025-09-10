{
    "name": "POS: disable multiple select for payment method",
    "summary": "Prevent selecting the same payment method multiple times in POS",
    "author": "Almas Kopeyev, IT-Projects LLC",
    "version": "17.0.1.0.0",
    "website": "https://github.com/it-projects-llc/pos-addons",
    "depends": ["point_of_sale"],
    "data": [],
    "assets": {
        "point_of_sale._assets_pos": [
            "pos_payment_disable_multiselection/static/src/js/PaymentScreen.js",
        ],
    },
    "license": "LGPL-3",
}
