/** @odoo-module */

import {SelfOrderBus} from "@pos_self_order/app/self_order_bus_service";
import {patch} from "@web/core/utils/patch";

patch(SelfOrderBus.prototype, {
    dispatch(message) {
        super.dispatch(...arguments);

        if (message.type === "ESIGN_REQUEST") {
            this.ws_esignRequest(message.payload);
        }
    },
    ws_esignRequest(payload) {
        this.selfOrder.esignRequest.signature.name = payload.partner_name;
        this.selfOrder.esignRequest.partner_id = payload.partner_id;
    },
});
