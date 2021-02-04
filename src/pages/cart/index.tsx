import React from 'react';
import {useQuery} from '@apollo/client';
import {GET_CART} from "./index.gql";
import './index.css';

const tableHeader = {
  cost: 'Cost',
  product: 'Product',
  price: 'Price',
  quantity: 'Quantity'
}

const text = {
  subTotal: 'Subtotal',
  totalCost: 'Total Cost',
  VAT: 'VAT at 20%',
}

const cart = {
  subTotal: 100,
  total: 100,
  VAT: 100
}

interface IProducts {
  cost: number;
  product: string;
  price: number;
  quantity: number;
}

interface ITotalCost {
  subTotal: string;
  subTotalValue?: number;
  totalCost: string;
  totalCostValue?: number;
  VAT: string;
  VATValue?: number;
}

const CartItems: React.FC<IProducts> = ({
                                          cost,
                                          product,
                                          price,
                                          quantity
                                        }) => (
  <table role="table" className="cart__item">
    <thead role="rowgroup">
    <tr role="row">
      <th role="columnheader">{tableHeader.product}</th>
      <th role="columnheader">{tableHeader.price}</th>
      <th role="columnheader">{tableHeader.quantity}</th>
      <th role="columnheader">{tableHeader.cost}</th>
    </tr>
    </thead>
    <tbody role="rowgroup">
    <tr role="row">
      <td role="cell">{product}</td>
      <td role="cell">{price}</td>
      <td role="cell">{quantity}</td>
      <td role="cell">{cost}</td>
    </tr>
    </tbody>
  </table>
)

const TotalCost: React.FC<ITotalCost> = (props) => {
  const {
    subTotal,
    subTotalValue,
    totalCost,
    totalCostValue,
    VAT,
    VATValue,
  } = props;

  return (
    <table role="table">
      <tbody role="rowgroup">
      <tr role="row">
        <td role="cell">{subTotal}</td>
        <td role="cell">{subTotalValue}</td>
      </tr>
      <tr role="row">
        <td role="cell">{VAT}</td>
        <td role="cell">{VATValue}</td>
      </tr>
      <tr role="row">
        <td role="cell">{totalCost}</td>
        <td role="cell">{totalCostValue}</td>
      </tr>
      </tbody>
    </table>
  )
}

const Index = () => {
  const {loading, error, data} = useQuery(GET_CART);

  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="container">
      <div className="cart-wrapper">
        <h1 className="cart-wrapper__title">
          Your Basket
        </h1>
        <p className="cart-wrapper__text">
          Items you have added to your basket shown below. Adjust the quantities or remove items before continuing
          purchase
        </p>
        <CartItems
          cost={12}
          product={'world'}
          price={12}
          quantity={2}
        />
        <TotalCost
          subTotal={text.subTotal}
          subTotalValue={cart.subTotal}
          totalCost={text.totalCost}
          totalCostValue={cart.total}
          VAT={text.VAT}
          VATValue={cart.VAT}
        />
      </div>
    </div>
  );
}

export default Index;
