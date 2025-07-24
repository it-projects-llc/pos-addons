odoo.define('pos_remove_payment_methods.PaymentScreen', function (require) {
    'use strict';

    const PaymentScreen = require('point_of_sale.PaymentScreen');
    const Registries = require('point_of_sale.Registries');
    const NumberBuffer = require('point_of_sale.NumberBuffer');

    const PosRemovePaymentScreen = (PaymentScreen) =>
        class extends PaymentScreen {
            showScreen(screenName, ...args) {
                const result = super.showScreen(screenName, ...args);
                if (screenName === 'ProductScreen' && this.currentOrder) {
                    [...this.currentOrder.get_paymentlines()].forEach(line => {
                        this.currentOrder.remove_paymentline(line);
                    });
                    NumberBuffer.reset();
                    this.render(true);
                }
                return result;
            }
        };

    Registries.Component.extend(PaymentScreen, PosRemovePaymentScreen);

    return PaymentScreen;
});
