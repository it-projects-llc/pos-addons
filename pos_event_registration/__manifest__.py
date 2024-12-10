{
    "name": "Register Event Attendees",
    "summary": "Process Attendees and Sell Tickets via POS",
    "category": "Point of Sale",
    "version": "17.0.0.1.0",
    "author": "IT-Projects LLC",
    "support": "it@it-projects.info",
    "website": "https://github.com/it-projects-llc/pos-addons",
    "license": "LGPL-3",
    "depends": [
        "point_of_sale",
        "event_sale",
    ],
    "data": ["views/product_view.xml"],
    "assets": {
        "point_of_sale._assets_pos": [
            "pos_event_registration/static/src/**/*",
        ],
    },
}
