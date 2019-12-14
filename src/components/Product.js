import React, { useState } from "react";
import CheckoutButton from "./CheckoutButton";

function Product(props) {
  const layout = props.layout;
  const product = props.product;
  console.log(product);

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
      {error && <div>Uh oh, an error occurred! {error.message}</div>}
      {layout}
      <div />

      <CheckoutButton
        products={product}
        paidFor={setPaidFor}
        error={setError}
      />
    </div>
  );
}

export default Product;
