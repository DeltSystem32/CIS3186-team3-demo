import React, { useState } from "react";
import "./App.css";
import { data } from "./components/common/data.js";

import Form from "./components/Form";
import Products from "./components/Products";

function App() {
  function importAll(r) {
    return r.keys().map(r);
  }

  const [buying, setBuying] = useState({ items: [] });

  const images = importAll(
    require.context("./Images/", false, /\.(png|jpe?g|svg)$/)
  );

  function push(id, amount) {
    buying.items.push({
      id: parseInt(id),
      amount: parseInt(amount)
    });
  }

  function processTotal() {
    var total = 0;

    buying.items.forEach(element => {
      var pos = data.findIndex(val => val.id === parseInt(element.id));
      total = total + element.amount * data[pos].price;
    });

    return total;
  }

  //TODO: Populate Items

  function layout() {
    return (
      <Form
        data={data}
        buying={buying}
        images={images}
        onPush={push}
        setBuying={setBuying}
        processTotal={processTotal}
      ></Form>
    );
  }

  return (
    <>
      {/* TODO: Amend Properties */}
      <Products layout={layout()}></Products>
    </>
  );
}

export default App;
