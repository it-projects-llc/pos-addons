odoo.define("pos_esign_request.esign_request", function (require) {
    "use strict";

    var Session = require("web.session");
    var models = require("point_of_sale.models");

    const PosComponent = require("point_of_sale.PosComponent");
    const Registries = require("point_of_sale.Registries");
    const {posbus} = require("point_of_sale.utils");

    models.load_fields("res.partner", ["sign_attachment_id"]);

    var PosModelSuper = models.PosModel;
    models.PosModel = models.PosModel.extend({
        initialize: function () {
            var self = this;
            PosModelSuper.prototype.initialize.apply(this, arguments);

            this.ready.then(function () {
                if (!self.config.ask_for_sign) {
                    return;
                }
                var channel_name = "pos.sign_request";
                var callback = self.updates_from_sign_kiosk;
                var bus = self.get_bus();
                bus.add_channel_callback(channel_name, self.esign_callback, self);
                bus.start();
            });
        },

        esign_callback: function (res) {
            if (!res) {
                return;
            }
            res = JSON.parse(res);

            var partner = this.db.get_partner_by_id(res.partner_id);
            if (partner) {
                partner.sign_attachment_id = res.attachment_id;
                this.trigger("changed:partner_esign", res);
            }
        },

        esign_request: function (vals) {
            Session.rpc("/pos_longpolling/sign_request", {
                vals: vals,
            });
        },
    });

    class ButtonEsign extends PosComponent {
        async onClickAttButton() {
            var partner = this.props.partner;
            if (!partner) {
                return;
            }
            this.env.pos.waiting_for_esign_partner = partner;
            this.env.pos.trigger("changed:partner_esign");
            Session.rpc("/pos_longpolling/sign_request", {
                vals: {
                    partner_id: partner.id,
                    partner_name: partner.name,
                    config_id: this.env.pos.config.id,
                },
            });
        }
    }
    ButtonEsign.template = "ESignButton";

    Registries.Component.add(ButtonEsign);

    return ButtonEsign;
});
