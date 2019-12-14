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

  function PaypalItems() {
    if (buying.items[0] != null) {
      var result = [];

      result.push({
        description: "Events",
        amount: {
          currency_code: "EUR",
          value: processTotal(),
          breakdown: {
            item_total: { currency_code: "EUR", value: processTotal() }
          }
        },
        items: []
      });

      buying.items.forEach(element => {
        var pos = data.findIndex(val => val.id === parseInt(element.id));
        result[0].items.push({
          name: data[pos].eventName,
          description: data[pos].description,
          unit_amount: {
            currency_code: "EUR",
            value: data[pos].price
          },
          quantity: element.amount
        });
      });
      return result;
    } else {
      return { description: "nothing", price: 0 };
    }
  }

  function PaypalLayout() {
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
      <Products items={PaypalItems()} layout={PaypalLayout()}></Products>
    </>
  );
}

export default App;
