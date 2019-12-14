import React, { useState } from "react";
import CheckoutButton from "./CheckoutButton";

function Payment(props) {
  const layout = props.layout;
  const items = props.items;

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  if (paidFor) {
    return (
      <div>
        <h1>Congrats, payment Successful!</h1>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div style={{ color: "red", fontWeight: "bold" }}>
          Uh oh, an error occurred! {error.message}
        </div>
      )}
      {layout}

      <CheckoutButton products={items} paidFor={setPaidFor} error={setError} />
    </div>
  );
}

export default Payment;
