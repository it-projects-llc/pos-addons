/** @odoo-module */

import {PosBus} from "@point_of_sale/app/bus/pos_bus_service";
import {patch} from "@web/core/utils/patch";

patch(PosBus.prototype, {
    // Override
    dispatch(message) {
        super.dispatch(...arguments);

        const payload = message.payload;
        if (message.type === "ESIGN_RESPONSE" && payload?.partner_id) {
            const partner = this.pos.db.get_partner_by_id(payload.partner_id);
            if (partner) {
                if (
                    this.pos.waiting_for_esign_partner &&
                    this.pos.waiting_for_esign_partner.id === partner.id
                ) {
                    this.pos.waiting_for_esign_partner = null;
                }

                partner.sign_attachment_id = payload.attachment_id;

                // Updates screen in general
                window.dispatchEvent(new Event("resize"));
            }
        }
    },
});
