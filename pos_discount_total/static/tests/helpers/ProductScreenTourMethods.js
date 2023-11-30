odoo.define("pos_discount_total.tour.ProductScreenTourMethods", function (require) {
    "use strict";

    const {createTourMethods} = require("point_of_sale.tour.utils");
    const {Do, Check, Execute} = require("point_of_sale.tour.ProductScreenTourMethods");

    class DoExt extends Do {
        clickSummaryLine() {
            return [
                {
                    content: "click summary line",
                    trigger: ".summary",
                    run: "click",
                },
            ];
        }
    }

    class CheckExt extends Check {
        isSummarySelected() {
            return [
                {
                    content: "is summary selected",
                    trigger: ".summary.selected",
                    // eslint-disable-next-line no-empty-function
                    run: () => {},
                },
            ];
        }
    }

    return createTourMethods("ProductScreen", DoExt, CheckExt, Execute);
});
