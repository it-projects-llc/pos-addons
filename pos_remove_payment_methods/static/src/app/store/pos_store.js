/** @odoo-module **/

import {PosStore} from "@point_of_sale/app/store/pos_store";
import {patch} from "@web/core/utils/patch";

patch(PosStore.prototype, {
    async showScreen(screenName, ...args) {
        const result = await super.showScreen(screenName, ...args);
        if (screenName === "ProductScreen" && this.get_order()) {
            const order = this.get_order();
            for (const line of [...order.get_paymentlines()]) {
                order.remove_paymentline(line);
            }

            if (this._numberBuffer) {
                this._numberBuffer.reset();
            }
        }
        return result;
    },
});
