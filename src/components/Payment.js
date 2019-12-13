import React /*useState useRef*/ from "react";
// import CheckoutButton from "./CheckoutButton";
import Product from "./Product";

//const paidFor = false;
//const error = null;

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
