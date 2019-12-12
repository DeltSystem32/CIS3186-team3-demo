import React from "react";

import TicketAmount from "./Amount";

class Form extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: props.data,
      buying: props.buying,
      images: props.images,
      onPush: props.onPush,
      setBuying: props.setBuying,
      processTotal: props.processTotal
    };

    this.handlePrice = this.handlePrice.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddRemove = this.handleAddRemove.bind(this);
    this.tableCreatorCall = this.tableCreatorCall.bind(this);
  }

  handlePrice(item) {
    var pos = this.state.buying.items.findIndex(
      val => val.id === parseInt(item.id)
    );

    if (pos === -1) {
      return 0;
    } else {
      return this.state.buying.items[pos].amount * item.price;
    }
  }

  handleChange({ target }) {
    var pos = this.state.buying.items.findIndex(
      val => val.id === parseInt(target.id)
    );
    var result = this.state.buying.items;
    if (pos !== -1) {
      result[pos].amount = parseInt(target.value);

      //remove if 0 reached
      if (this.state.buying.items[pos].amount === 0) {
        result = this.state.buying.items;
        result[pos].amount = this.state.buying.items.splice(pos, 1);
      }
    } else {
      this.state.onPush(target.id, target.value);
    }
    this.state.setBuying({ ...this.state.buying, types: result });
  }

  handleAddRemove(target, amount) {
    var pos = this.state.buying.items.findIndex(val => val.id === target.id);
    var result;
    if (pos !== -1) {
      result = this.state.buying.items;
      result[pos].amount = this.state.buying.items[pos].amount + amount;

      //remove if 0 reached
      if (this.state.buying.items[pos].amount === 0) {
        result = this.state.buying.items.splice(pos, 1);
      }
    } else {
      if (amount > 0) {
        this.state.onPush(target.id, 1);
      }
    }
    this.state.setBuying({ ...this.state.buying, types: result });
  }

  tableCreatorCall() {
    const tableCreator =
      this.state.data.length > 0 &&
      this.state.data.map((item, i) => {
        return (
          <tr style={{ width: "100%" }}>
            <td style={{ width: "30%" }}>
              {item.eventName} <br />
              <br /> {item.description}{" "}
            </td>
            <td style={{ width: "30%" }}>
              <img
                style={{ width: "50%", height: "auto" }}
                src={this.state.images[item.id - 1]}
                alt={item.eventName + " image"}
              />
            </td>
            <td style={{ width: "10%" }}>€{item.price}</td>
            <td style={{ width: "20%" }}>
              <TicketAmount
                item={item}
                amount={this.state.buying}
                onChange={this.handleChange}
                onAddRemove={this.handleAddRemove}
              ></TicketAmount>
            </td>
            <td style={{ width: "10%" }}>€{this.handlePrice(item)}</td>
          </tr>
        );
      }, this);

    return tableCreator;
  }

  render() {
    return (
      <>
        <div>
          <table id="eventTable" style={{ padding: "5px" }}>
            <tr>
              <td>Name & description</td>
              <td>image</td>
              <td>price</td>
              <td>amount</td>
              <td>total</td>
            </tr>
            {this.tableCreatorCall()}
            <tr>
              <td colSpan="4" style={{ border: "none" }}></td>
              <td>
                <br />
                total price: €{this.state.processTotal()}
                <br />
                <br />
              </td>
            </tr>
          </table>
        </div>
      </>
    );
  }
}

export default Form;
