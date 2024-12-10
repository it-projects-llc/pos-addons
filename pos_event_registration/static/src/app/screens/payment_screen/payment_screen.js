/** @odoo-module */

import {ErrorPopup} from "@point_of_sale/app/errors/popups/error_popup";
import {PaymentScreen} from "@point_of_sale/app/screens/payment_screen/payment_screen";
import {_t} from "@web/core/l10n/translation";
import {patch} from "@web/core/utils/patch";

patch(PaymentScreen.prototype, {
    async _isOrderValid(isForceValidate) {
        if (this.currentOrder.has_pos_event_tickets()) {
            const partner = this.currentOrder.get_partner();

            if (!partner) {
                await this.popup.add(ErrorPopup, {
                    title: _t("Unknown customer"),
                    body: _t(
                        "You cannot sell a ticket with unselected customer. Create / Select customer first."
                    ),
                });
                return false;
            } else if (!partner.email) {
                await this.popup.add(ErrorPopup, {
                    title: _t("Customers email is not set"),
                    body: _t(
                        "You cannot sell a ticket to a customer with unspecified email."
                    ),
                });
                return false;
            }

            if (this.currentOrder.check_for_multiple_tickets()) {
                await this.popup.add(ErrorPopup, {
                    title: _t("Multiple tickets per customer"),
                    body: _t(
                        "Unable to buy several tickets on the same event for the same partner."
                    ),
                });
                return false;
            }
        }

        return await super._isOrderValid(isForceValidate);
    },
});
