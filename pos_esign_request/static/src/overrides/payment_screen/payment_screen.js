/** @odoo-module */

import {ErrorPopup} from "@point_of_sale/app/errors/popups/error_popup";
import {PaymentScreen} from "@point_of_sale/app/screens/payment_screen/payment_screen";
import {_t} from "@web/core/l10n/translation";
import {patch} from "@web/core/utils/patch";

patch(PaymentScreen.prototype, {
    async validateOrder() {
        const partner = this.currentOrder.get_partner();

        do {
            // Customer is not set
            if (!partner) break;

            // Does not need to ask for sign
            if (!this.pos.config.ask_for_sign) break;

            // Customer did sign
            if (partner.sign_attachment_id) break;

            // Sign is not mandatory
            if (!this.pos.config.mandatory_ask_for_sign) break;

            // Customer did not sign and it is mandatory
            this.popup.add(ErrorPopup, {
                title: _t("Error"),
                body: _t("Customer hasn't signed yet."),
            });
            return false;
        } while (false); // eslint-disable-line no-constant-condition

        return await super.validateOrder(...arguments);
    },
});
