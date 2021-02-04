import React from 'react';
import './App.css';

const tableHeader = {
  cost: 'Cost',
  product: 'Product',
  price: 'Price',
  quantity: 'Quantity'
}

const totalCostText = {
  subTotal: 'Subtotal',
  totalCost: 'Total Cost',
  VAT: 'VAT at 20%',
}

interface IProducts {
  cost: number;
  product: string;
  price: number;
  quantity: number;
}

interface ITotalCost{
  cost: number;
  totalCostText: {
    subTotal: string;
    totalCost: string;
    VAT: string
  }
  quantity?: number;
}

const CartItems: React.FC<IProducts> = ({
  cost,
  product,
  price,
  quantity
                  }) => (
  <table role="table">
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
  const { cost, totalCostText, quantity } = props;
  const { subTotal, VAT, totalCost } = totalCostText;

return (
  <table role="table">
    <tbody role="rowgroup">
    <tr role="row">
      <td role="cell">{subTotal}</td>
      <td role="cell">hello</td>
    </tr>
    <tr role="row">
      <td role="cell">{VAT}</td>
    </tr>
    <tr role="row">
      <td role="cell">{totalCost}</td>
    </tr>
    </tbody>
  </table>
)
}

const App = () => {
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
        <TotalCost cost={12} totalCostText={totalCostText} />
      </div>
    </div>
  );
}

export default App;
