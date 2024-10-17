/** @odoo-module */

import {PosStore} from "@point_of_sale/app/store/pos_store";
import {patch} from "@web/core/utils/patch";

patch(PosStore.prototype, {
    async requestSign(partner) {
        this.waiting_for_esign_partner = partner;
        await this.orm.call("pos.config", "sign_request", [this.config.id], {
            partner_id: partner.id,
            partner_name: partner.name,
        });
    },
});
