/** @odoo-module **/

import {PaymentScreen} from "@point_of_sale/app/screens/payment_screen/payment_screen";
import {patch} from "@web/core/utils/patch";

patch(PaymentScreen.prototype, {
    addNewPaymentLine(paymentMethod) {
        const matchingLines = this.currentOrder
            .get_paymentlines()
            .filter((line) => line.payment_method.id === paymentMethod.id);

        if (matchingLines.length > 0) {
            // Delete all duplicate payment lines except the first
            for (let i = 1; i < matchingLines.length; i++) {
                this.deletePaymentLine(matchingLines[i].cid);
            }
            // Select the first line
            this.selectPaymentLine(matchingLines[0].cid);
            return true;
        }
        return super.addNewPaymentLine(paymentMethod);
    },
});
