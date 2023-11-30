odoo.define("pos_discount_total.ProductScreen", function (require) {
    "use strict";

    const ProductScreen = require("point_of_sale.ProductScreen");
    const Registries = require("point_of_sale.Registries");

    const POSDiscountTotalProductScreen = (x) =>
        class extends x {
            _setValue(val) {
                if (!this.currentOrder.get_selected_orderline()) {
                    if (this.state.numpadMode === "discount") {
                        this.currentOrder.orderlines.models.forEach((model) => {
                            model.set_discount(val);
                        });
                    }
                }
                return super._setValue(...arguments);
            }
        };

    Registries.Component.extend(ProductScreen, POSDiscountTotalProductScreen);

    return POSDiscountTotalProductScreen;
});
