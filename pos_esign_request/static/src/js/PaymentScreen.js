odoo.define("pos_esign_request.PaymentScreen", function (require) {
    "use strict";

    const PaymentScreen = require("point_of_sale.PaymentScreen");
    const Registries = require("point_of_sale.Registries");

    const POSESignRequestPaymentScreen = (x) => class extends x {
        get canCustomerValidatePayment() {
            const client = this.currentOrder.get_client();
            // customer is not set
            if (!client) return true;

            // does not need to ask for sign
            if (!this.env.pos.config.ask_for_sign) return true;

            // customer did sign
            if (client.sign_attachment_id) return true;

            // sign is not mandatory
            if (!this.env.pos.config.mandatory_ask_for_sign) return true;

            // customer did not sign and it is mandatory
            return false;
        }

        mounted() {
            super.mounted.apply(this, arguments);
            this.env.pos.on('changed:partner_esign', this.render, this);
        }

        willUnmount() {
            super.willUnmount.apply(this, arguments);
            this.env.pos.off('changed:partner_esign', null, this);
        }
    };

    Registries.Component.extend(PaymentScreen, POSESignRequestPaymentScreen);

    return POSESignRequestPaymentScreen;
});
