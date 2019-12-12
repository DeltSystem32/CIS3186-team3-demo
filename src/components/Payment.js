import React, { useState, useRef, useEffect } from "react";

function Product(props) {
  const product = props.product;
  const layout = props.layout;
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();

  useEffect(() => {
    if (paypalRef.current != null) {
      while (paypalRef.current.firstChild) {
        paypalRef.current.removeChild(paypalRef.current.firstChild);
      }
    }

    if (product.description !== "nothing") {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: product
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            setPaidFor(true);
            console.log(order);
          },
          onError: err => {
            setError(err);
            console.error(err);
          }
        })
        .render(paypalRef.current);
    }
  });

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
      <div ref={paypalRef} />
    </div>
  );
}

function Payment(props) {
  const layout = props.layout;
  const items = props.items;

  return <Product product={items} layout={layout} />;
}

export default Payment;
