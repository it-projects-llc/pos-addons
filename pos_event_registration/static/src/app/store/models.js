/** @odoo-module */

import {Order} from "@point_of_sale/app/store/models";
import {patch} from "@web/core/utils/patch";

patch(Order.prototype, {
    has_pos_event_tickets: function () {
        return this.orderlines.find((ol) => ol.product.has_pos_event_ticket);
    },

    check_for_multiple_tickets() {
        const orderlines = this.orderlines;
        const ticket_products = new Set(
            orderlines
                .filter((o) => o.product.has_pos_event_ticket)
                .map((o) => o.product.id)
        );
        for (const pr_id of ticket_products) {
            const same_product_lines = orderlines.filter(
                (ol) => ol.product.id === pr_id
            );
            if (
                same_product_lines.length > 1 ||
                (same_product_lines.length === 1 && same_product_lines[0].quantity > 1)
            ) {
                return true;
            }
        }
        return false;
    },
});
