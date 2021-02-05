import React from 'react';
import TotalCostTable from '../../components/totalcost-table';
import CartTable, { ICartList } from "../../components/cart-table";
import {useQuery} from '@apollo/client';
import {GET_CART} from './index.gql';
import './index.css';

const Cart: React.FC = () => {
  const {loading, error, data} = useQuery(GET_CART);
  const cart: Array<ICartList> = data?.getCart?.items || [];

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
        <CartTable cart={cart} />
        <TotalCostTable
          subTotal={data?.getCart?.subTotal}
          totalCost={data?.getCart?.totalCost}
          VAT={data?.getCart?.VAT}
        />
      </div>
    </div>
  );
}

export default Cart;
