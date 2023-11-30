odoo.define("pos_discount_total.tour", function (require) {
    "use strict";

    const {ProductScreen} = require("pos_discount_total.tour.ProductScreenTourMethods");
    const {getSteps, startSteps} = require("point_of_sale.tour.utils");
    var Tour = require("web_tour.tour");

    // Signal to start generating steps
    // when finished, steps can be taken from getSteps
    startSteps();

    // Go by default to home category
    ProductScreen.do.clickHomeCategory();

    ProductScreen.do.clickDisplayedProduct("Desk Organizer");
    ProductScreen.check.selectedOrderlineHas("Desk Organizer", "1.0", "5.10");

    ProductScreen.do.clickDisplayedProduct("Letter Tray");
    ProductScreen.check.selectedOrderlineHas("Letter Tray", "1.0", "4.80");

    ProductScreen.do.clickSummaryLine();
    ProductScreen.check.isSummarySelected();

    ProductScreen.do.pressNumpad("Disc");
    ProductScreen.do.pressNumpad("9 0 .");
    ProductScreen.check.isSummarySelected();

    ProductScreen.do.clickOrderline("Desk Organizer", "1.0");
    ProductScreen.check.selectedOrderlineHas("Desk Organizer", "1.0", "0.51");
    ProductScreen.do.clickOrderline("Letter Tray", "1.0");
    ProductScreen.check.selectedOrderlineHas("Letter Tray", "1.0", "0.48");

    Tour.register("pos_discount_total_tour", {test: true, url: "/pos/ui"}, getSteps());
});
