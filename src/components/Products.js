import React from "react";

function Products(props) {
  const layout = props.layout;

  const paidFor = false;
  const error = null;

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
    </div>
  );
}

export default Products;
