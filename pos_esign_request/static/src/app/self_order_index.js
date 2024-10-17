/** @odoo-module */

import selfOrder from "@pos_self_order/app/self_order_index";
import {ESignKioskPage} from "@pos_esign_request/app/pages/esign_kiosk_page/esign_kiosk_page";
import {patch} from "@web/core/utils/patch";

// I don't know why import { selfOrderIndex} } does not work
const selfOrderIndex = selfOrder.selfOrderIndex;

patch(selfOrderIndex, {
    components: {...selfOrderIndex.components, ESignKioskPage},
});
