odoo.define('pos_payment_multiselect_disable.PaymentScreen', function (require) {
    'use strict';

    const PaymentScreen = require('point_of_sale.PaymentScreen');
    const Registries = require('point_of_sale.Registries');
    const NumberBuffer = require('point_of_sale.NumberBuffer');

    const PosPaymentMultiselectDisablePaymentScreen = (PaymentScreen) =>
        class extends PaymentScreen {
            addNewPaymentLine({ detail: paymentMethod }) {
                const currentOrder = this.env.pos.get_order();

                currentOrder.get_paymentlines().forEach(line => {
                    currentOrder.remove_paymentline(line);
                });

                const result = currentOrder.add_paymentline(paymentMethod);

                if (result) {
                    NumberBuffer.reset();
                    return true;
                } else {
                    this.showPopup('ErrorPopup', {
                        title: this.env._t('Error'),
                        body: this.env._t('There is already an electronic payment in progress or an issue adding the payment.'),
                    });
                    return false;
                }
            }
        };

    Registries.Component.extend(PaymentScreen, PosPaymentMultiselectDisablePaymentScreen);

    return PaymentScreen;
});
