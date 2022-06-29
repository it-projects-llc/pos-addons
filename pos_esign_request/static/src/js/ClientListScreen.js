odoo.define('pos_esign_request.ClientListScreen', function (require) {
    'use strict';

    var ClientListScreen = require("point_of_sale.ClientListScreen");
    const Registries = require('point_of_sale.Registries');
    const { posbus } = require('point_of_sale.utils');

    const POSESignRequestClientListScreen = (x) => class extends x {
        mounted() {
            posbus.on('update_customer_list', this, this.render);
        }
        willUnmount() {
            posbus.off('update_customer_list', this);
        }
    };

    Registries.Component.extend(ClientListScreen, POSESignRequestClientListScreen);

    return ClientListScreen;
});
