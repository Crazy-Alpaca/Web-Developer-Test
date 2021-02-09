import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import {Counter} from "../counter";
import './index.css';

const cartItems = {
  cost: 'Cost',
  product: 'Product',
  price: 'Price',
  quantity: 'Quantity'
}

export interface ICartList {
  name: string;
  price: number;
  size?: string;
  sku: string;
  stockLevel: number;
}

interface ICartTable {
  cart: Array<ICartList>;
  handleDelete(sku: string): void;
  handleUpdate(sku: string, stockLevel: number): void;
}

const Items: React.FC<any> = (props: any) => {
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
        <td role="cell">{item?.price}</td>
        <td role="cell">
          { console.log(state)}
          <Counter
            sku={item?.sku}
            value={state[sku]}
            handleChange={handleChange}
            handleIncrease={handleIncrease}
            handleReduce={handleReduce}
          />
        </td>
        <td role="cell">{Math.floor(item?.price * state[sku])}</td>
        <td>
          <DeleteIcon className="icon__delete" onClick={() => handleDelete(item?.sku)}/>
        </td>
      </tr>
    </>
  )
}

const CartTable: React.FC<ICartTable> = (props) => {
  const {cart = [], handleDelete, handleUpdate } = props;

  return (
    <table role="table" className="cart__item">
      <thead role="rowgroup">
      <tr role="row">
        <th role="columnheader">{cartItems.product}</th>
        <th role="columnheader">{cartItems.price}</th>
        <th role="columnheader">{cartItems.quantity}</th>
        <th role="columnheader">{cartItems.cost}</th>
      </tr>
      </thead>
      <tbody role="rowgroup">
      {cart?.map((item: ICartList) => <Items item={item} deleteProduct={handleDelete} handleUpdate={handleUpdate} key={item?.sku}/>)}
      </tbody>
    </table>
  )
}

export default CartTable
