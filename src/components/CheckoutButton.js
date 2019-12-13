import React, { Component } from "react";
import { PayPalButton } from "react-paypal-button-v2";

export default class CheckoutButton extends Component {
  render() {
    const products = this.props.products;
    let paidFor = this.props.paidFor;

    return (
      <div>
        <PayPalButton
          options={{
            clientId:
              "AZSGawP8r0Qw0yNnRzPGnTtuMZekEXYYA2FHnjQeVSZQ9YtKOMuc00yfVk2mXb5mW5NhetecGYIu3KxL",
            currency: "EUR"
          }}
          shippingPreference="NO_SHIPPING"
          createOrder={(data, actions) => {
            if (products != null) {
              return actions.order.create({
                purchase_units: products
              });
            }
          }}
          onSuccess={async details => {
            paidFor = true;
            return alert(
              "Transaction completed by " + details.payer.name.given_name
            );
          }}
          onError={err => {
            this.props.error = err;
          }}
        />
      </div>
    );
  }
}
