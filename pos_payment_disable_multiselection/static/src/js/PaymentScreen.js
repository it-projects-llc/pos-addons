odoo.define("pos_payment_multiselect_disable.PaymentScreen", function (require) {
    "use strict";

    const PaymentScreen = require("point_of_sale.PaymentScreen");
    const Registries = require("point_of_sale.Registries");

    const PosPaymentMultiselectDisablePaymentScreen = (PaymentScreen) =>
        class extends PaymentScreen {
            addNewPaymentLine(event) {
                const paymentMethod = event.detail;

                const matchingLines = this.currentOrder
                    .get_paymentlines()
                    .filter((line) => line.payment_method.id === paymentMethod.id);

                if (matchingLines.length > 0) {
                    // Delete all duplicate payment lines except the first
                    for (let i = 1; i < matchingLines.length; i++) {
                        this.deletePaymentLine(matchingLines[i]);
                    }
                    // Select the first line
                    this.selectPaymentLine({detail: matchingLines[0]});
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
