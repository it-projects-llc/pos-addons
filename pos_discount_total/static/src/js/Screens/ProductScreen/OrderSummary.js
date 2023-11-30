odoo.define("pos_discount_total.OrderSummary", function (require) {
    "use strict";

    const OrderSummary = require("point_of_sale.OrderSummary");
    const Registries = require("point_of_sale.Registries");

    const POSDiscountTotalOrderSummary = (x) =>
        class extends x {
            get addedClasses() {
                return {
                    selected: this.props.selected,
                };
            }
        };

    Registries.Component.extend(OrderSummary, POSDiscountTotalOrderSummary);

    return POSDiscountTotalOrderSummary;
});
