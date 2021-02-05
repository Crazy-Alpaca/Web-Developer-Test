import React from 'react';
import Button from '@material-ui/core/Button';
import TotalCostTable from '../../components/totalcost-table';
import CartTable, {ICartList} from "../../components/cart-table";
import {useQuery} from '@apollo/client';
import {useMutation} from '@apollo/client';
import {GET_CART, REMOVE_PRODUCT, UPDATE_PRODUCT} from './index.gql';
import './index.css';

const Cart: React.FC = () => {
  const {loading, error, data} = useQuery(GET_CART);
  const [deleteProduct] = useMutation(REMOVE_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const cart: Array<ICartList> = data?.getCart?.items || [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // const handleClick = (event: any) => {
  //   event.target.value;
  // }

  const handleDelete = (sku: string) => {
    deleteProduct({
      refetchQueries: [{
        query: GET_CART
      }],
      variables: {sku}
    });
  }

  const handleUpdate = (sku: string, stockLevel: string) => {
    updateProduct({
      refetchQueries: [{
        query: GET_CART
      }],
      variables: {sku, stockLevel}
    });
  }

  return (
    <div className="container">
      <div className="cart">
        <h1 className="cart__title">
          Your Basket
        </h1>
        <p className="cart__caption">
          Items you have added to your basket shown below. Adjust the quantities or remove items before continuing
          purchase
        </p>
        <CartTable cart={cart} deleteProduct={handleDelete} updateProduct={handleUpdate}/>
        <TotalCostTable
          subTotal={data?.getCart?.subTotal}
          totalCost={data?.getCart?.totalCost}
          VAT={data?.getCart?.VAT}
        />
        <div className="cart__button--buy-now">
          <Button variant="contained" color="primary">
            BUY NOW
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;

