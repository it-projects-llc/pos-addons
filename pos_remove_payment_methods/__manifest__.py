{
    "name": "POS: clear the payment lines on screen entry",
    "summary": (
        "Clears the payment lines that have been selected before "
        "in case when we return back to the cart and re-entering the POS payment screen"
    ),
    "author": "Almas Kopeyev, IT-Projects LLC",
    "version": "17.0.1.0.0",
    "website": "https://github.com/it-projects-llc/pos-addons",
    "depends": ["point_of_sale"],
    "data": [],
    "assets": {
        "point_of_sale._assets_pos": [
            "pos_remove_payment_methods/static/src/**/*",
        ],
    },
    "license": "LGPL-3",
}
