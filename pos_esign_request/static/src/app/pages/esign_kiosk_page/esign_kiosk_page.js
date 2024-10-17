/** @odoo-module */

import {Component, markup, useState} from "@odoo/owl";
import {NameAndSignature} from "@web/core/signature/name_and_signature";
import {useSelfOrder} from "@pos_self_order/app/self_order_service";
import {useService} from "@web/core/utils/hooks";

export class ESignKioskPage extends Component {
    static template = "pos_esign_request.ESignKioskPage";
    static components = {NameAndSignature};

    setup() {
        this.selfOrder = useSelfOrder();
        this.router = useService("router");
        this.rpc = useService("rpc");
        this.selfOrder.esignRequest = {
            showingTerms: false,
            isSubmitting: false,
            signature: {},
        };
        this.state = useState(this.selfOrder.esignRequest);
    }

    showTerms() {
        this.state.showingTerms = true;
    }

    hideTerms() {
        this.state.showingTerms = false;
    }

    get terms() {
        return markup(this.selfOrder.config.terms_to_sign);
    }

    async onClickSubmit() {
        this.state.isSubmitting = true;

        try {
            const vals = this.prepareSignValues();
            await this.rpc("/pos_esign_request/sign_response", {
                access_token: this.selfOrder.access_token,
                vals: vals,
            });
            this.state.partner_id = null;
        } finally {
            this.state.isSubmitting = false;
        }
    }

    onClickReject() {
        this.state.partner_id = null;
    }

    prepareSignValues() {
        return {
            partner_id: this.state.partner_id,
            sign: this.state.signature.getSignatureImage()[1],
        };
    }
}
