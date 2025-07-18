odoo.define('pos_remove_payment_methods.PaymentScreen', function (require) {
    'use strict';

    const PaymentScreen = require('point_of_sale.PaymentScreen');
    const Registries = require('point_of_sale.Registries');
    const NumberBuffer = require('point_of_sale.NumberBuffer');

    const PosRemovePaymentScreen = (PaymentScreen) =>
        class extends PaymentScreen {

            onCustomBackClick() {
                const currentOrder = this.env.pos.get_order();
                if (currentOrder) {
                    const lines = [...currentOrder.get_paymentlines()];
                    lines.forEach(line => currentOrder.remove_paymentline(line));
                    NumberBuffer.reset();
                }
                this.showScreen('ProductScreen');
            }
        };

    Registries.Component.extend(PaymentScreen, PosRemovePaymentScreen);

    return PosRemovePaymentScreen;
});
