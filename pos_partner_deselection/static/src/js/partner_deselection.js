odoo.define("pos_partner_deselection.partner_deselection", [], function (require) {
    "use strict";

    const {Order} = require("@point_of_sale/app/store/models");
    const {patch} = require("@web/core/utils/patch");

    patch(Order.prototype, {
        setup() {
            super.setup(...arguments);
            if (this.partner) {
                this.set_partner(null);
            }
        },

        setupCustomerDeselection(interval) {
            if (this.partner_deselect_timer) {
                clearTimeout(this.partner_deselect_timer);
            }
            this.partner_deselect_timer = setTimeout(() => {
                if (!this.finalized) {
                    this.set_partner(null);
                }
            }, interval * 1000);
        },

        set_partner(partner) {
            super.set_partner(...arguments);

            const customer_deselection_interval =
                this.pos.config.customer_deselection_interval;

            if (customer_deselection_interval && partner && !this.finalized) {
                this.setupCustomerDeselection(customer_deselection_interval);
            } else if (!partner && this.partner_deselect_timer) {
                clearTimeout(this.partner_deselect_timer);
            }
        },
    });
});
