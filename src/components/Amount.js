import React from "react";
import Button from "@material-ui/core/Button";

import TextInput from "./common/TextInput";

class TicketAmount extends React.Component {
  constructor(props) {
    super();
    this.state = {
      item: props.item,
      amount: props.amount,
      onChange: props.onChange,
      onAddRemove: props.onAddRemove
    };
  }

  amountFunction(item) {
    var pos = this.state.amount.items.findIndex(e => e.id === item.id);

    if (pos !== -1) {
      return this.state.amount.items[pos].amount;
    } else {
      return 0;
    }
  }

  render() {
    return (
      <div id={this.state.amount}>
        <Button
          onClick={e => {
            this.state.onAddRemove(this.state.item, 1);
          }}
        >
          Add
        </Button>

        <TextInput
          id={this.state.item.id}
          label="Ticket Amount"
          value={this.amountFunction(this.state.item)}
          name="ticket Amount"
          onChange={this.state.onChange}
        />

        <Button
          onClick={e => {
            this.state.onAddRemove(this.state.item, -1);
          }}
        >
          Decrease
        </Button>
      </div>
    );
  }
}

export default TicketAmount;
