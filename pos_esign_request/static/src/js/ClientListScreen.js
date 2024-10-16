odoo.define("pos_esign_request.ClientListScreen", function (require) {
    "use strict";

    var ClientListScreen = require("point_of_sale.ClientListScreen");
    const Registries = require("point_of_sale.Registries");

    const POSESignRequestClientListScreen = (x) =>
        class extends x {
            mounted() {
                super.mounted.apply(this, arguments);
                this.env.pos.on("changed:partner_esign", this.render, this);
            }

            willUnmount() {
                super.willUnmount.apply(this, arguments);
                this.env.pos.off("changed:partner_esign", null, this);
            }
        };

    Registries.Component.extend(ClientListScreen, POSESignRequestClientListScreen);

    return ClientListScreen;
});
