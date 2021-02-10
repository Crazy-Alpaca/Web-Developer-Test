import React from "react";
import { Items } from "../cart-items";
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
