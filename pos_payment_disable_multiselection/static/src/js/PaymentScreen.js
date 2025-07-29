odoo.define("pos_payment_multiselect_disable.PaymentScreen", function (require) {
    "use strict";

    const PaymentScreen = require("point_of_sale.PaymentScreen");
    const Registries = require("point_of_sale.Registries");
    const NumberBuffer = require("point_of_sale.NumberBuffer");

    const PosPaymentMultiselectDisablePaymentScreen = (PaymentScreen) =>
        class extends PaymentScreen {
            addNewPaymentLine(event) {
                const paymentMethod = event.detail;

                const matchingLines = this.currentOrder
                    .get_paymentlines()
                    .filter((line) => line.payment_method.id === paymentMethod.id);

                if (matchingLines.length > 0) {
                    if (matchingLines.length > 1) {
                        for (let i = 1; i < matchingLines.length; i++) {
                            this.deletePaymentLine(matchingLines[i]);
                        }
                    }

                    const freshLine = this.currentOrder
                        .get_paymentlines()
                        .find(line => line.payment_method.id === paymentMethod.id);

                    if (freshLine) {
                        this.selectPaymentLine({ detail: freshLine });
                    }
                    return true;
                }
                return super.addNewPaymentLine(event);
            }
        };
    Registries.Component.extend(
        PaymentScreen,
        PosPaymentMultiselectDisablePaymentScreen
    );
    return PaymentScreen;
});
