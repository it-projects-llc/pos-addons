odoo.define("pos_partner_deselection.partner_deselection", [], function (require) {
    "use strict";

    const {Order} = require("@point_of_sale/app/store/models");
    const {PosStore} = require("@point_of_sale/app/store/pos_store");
    const {patch} = require("@web/core/utils/patch");

    patch(PosStore.prototype, {
        showScreen() {
            super.showScreen(...arguments);
            this.setPartnerDeselectTimer();
        },

        setPartnerDeselectTimer() {
            clearTimeout(this.partnerDeselectTimer);
            if (this.shouldResetPartnerDeselectTimer(this.selectedOrder)) {
                this.partnerDeselectTimer = setTimeout(
                    () => this.deselectPartner(),
                    this.config.customer_deselection_interval * 1000
                );
            }
        },

        shouldResetPartnerDeselectTimer(order) {
            return (
                this.mainScreen?.component?.name !== "TicketScreen" &&
                this.config.customer_deselection_interval &&
                order &&
                order.partner &&
                !order.to_invoice
            );
        },

        deselectPartner() {
            if (!this.selectedOrder.finalized && !this.selectedOrder.to_invoice) {
                this.selectedOrder.set_partner(null);
            }
        },
    });

    patch(Order.prototype, {
        setup() {
            super.setup(...arguments);
            if (this.pos.shouldResetPartnerDeselectTimer(this)) {
                this.set_partner(null);
            }
        },

        set_partner() {
            super.set_partner(...arguments);
            this.pos.setPartnerDeselectTimer();
        },

        set_to_invoice() {
            super.set_to_invoice(...arguments);
            this.pos.setPartnerDeselectTimer();
        },
    });
});
