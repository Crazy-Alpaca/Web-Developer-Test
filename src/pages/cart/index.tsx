import React from 'react';
import Button from '@material-ui/core/Button';
import TotalCostTable, {ITotalCostTable} from '../../components/totalcost-table';
import CartTable, {ICartList} from "../../components/cart-table";
import {useQuery} from '@apollo/client';
import {useMutation} from '@apollo/client';
import {
  GET_CART,
  REMOVE_PRODUCT,
  UPDATE_PRODUCT,
  SAVE_CART
} from './index.gql';
import './index.css';

interface ICart extends ITotalCostTable {
  items: Array<ICartList>;
}

const Cart: React.FC = () => {
  const {loading, error, data} = useQuery(GET_CART);
  const [saveCart] = useMutation(SAVE_CART);
  const [deleteProduct] = useMutation(REMOVE_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const cart: Array<ICartList> = data?.getCart?.items || [];

  function reduce (param: Array<ICartList>) {
    return param.reduce((total: any, current) => {
      return [ ...total, current.sku]
    },[])
  }

  const handleSaveCart = () => {
    const productSkus = reduce(cart);
    saveCart(
      {
        refetchQueries: [{
          query: SAVE_CART
        }],
        variables: {productSkus}
      }
    );
  }

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!cart) return <p>"data?.saveCart"</p>;

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
          totalCost={data?.getCart?.total}
          VAT={data?.getCart?.VAT}
        />
        <div className="cart__button--buy-now">
          <Button variant="contained" color="primary" onClick={handleSaveCart}>
            BUY NOW
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;

