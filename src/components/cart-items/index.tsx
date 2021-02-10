import React from "react";
import {InputWithCounter} from "../Input-with-Counter";
import DeleteIcon from "@material-ui/icons/Delete";

export const Items: React.FC<any> = (props: any) => {
  const { item, handleDelete, handleUpdate } = props;
  const sku = item.sku;
  const value = item.stockLevel;

  const [state, setState] = React.useState<any>({[sku]: value});

  const handleChange = (event: any) => {
    setState({[event.target.name]: Number(event.target.value)});
    handleUpdate(sku, state[sku]);
  };

  const handleReduce = (sku: string) => {
    if (state[sku] <= 0) {
      return
    }
    else {
      setState({[sku]: state[sku] - 1});
      handleUpdate(sku, state[sku]);
    }
  }

  const handleIncrease = (sku: string) => {
    setState({[sku]: state[sku] + 1});
    handleUpdate(sku, state[sku]);
  }

  return (
    <>
      <tr role="row" key={item?.sku}>
        <td role="cell">{item?.name} {item?.size}</td>
        <td role="cell">$ {item?.price.toFixed(2)}</td>
        <td role="cell">
          <InputWithCounter
            sku={item?.sku}
            value={state[sku]}
            handleChange={handleChange}
            handleIncrease={handleIncrease}
            handleReduce={handleReduce}
          />
        </td>
        <td role="cell">$ {Number((item?.price * state[sku]).toFixed(2))}</td>
        <td>
          <DeleteIcon className="icon__delete" onClick={() => handleDelete(item?.sku)}/>
        </td>
      </tr>
    </>
  )
}
