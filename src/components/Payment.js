import React from "react";
import Product from "./Product";

function Payment(props) {
  const layout = props.layout;
  const items = props.items;

  return (
    <>
      <Product product={items} layout={layout} />
    </>
  );
}

export default Payment;
