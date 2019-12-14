import React, { Component } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { paypalConfig } from "./common/data.js";

export default class CheckoutButton extends Component {
  render() {
    const products = this.props.products;

    if (products.description !== "nothing") {
      return (
        <div>
          <PayPalButton
            options={{
              clientId: paypalConfig.clientId,
              currency: paypalConfig.currency
            }}
            shippingPreference="NO_SHIPPING"
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: products
              });
            }}
            onSuccess={async details => {
              this.props.paidFor(true);
            }}
            onError={err => {
              this.props.error(err);
            }}
          />
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
