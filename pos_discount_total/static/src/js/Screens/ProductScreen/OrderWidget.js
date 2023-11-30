odoo.define("pos_discount_total.OrderWidget", function (require) {
    "use strict";

    const OrderWidget = require("point_of_sale.OrderWidget");
    const Registries = require("point_of_sale.Registries");
    const {useListener} = require("web.custom_hooks");

    const POSDiscountTotalOrderWidget = (x) =>
        class extends x {
            constructor() {
                super(...arguments);
                useListener("select-summary", this._selectSummary);
            }

            _selectSummary() {
                this.order.deselect_orderline();
                this.state.isSummarySelected = true;
            }

            _selectLine() {
                super._selectLine(...arguments);
                this.state.isSummarySelected = false;
            }
        };

    Registries.Component.extend(OrderWidget, POSDiscountTotalOrderWidget);

    return POSDiscountTotalOrderWidget;
});
