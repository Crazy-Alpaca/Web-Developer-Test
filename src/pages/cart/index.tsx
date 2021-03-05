import React from 'react';
import Button from '@material-ui/core/Button';
import TotalCostTable from '../../components/totalcost-table';
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

const Cart: React.FC = () => {
  const {loading, error, data} = useQuery(GET_CART);
  const [saveCart] = useMutation(SAVE_CART);
  const [deleteProduct] = useMutation(REMOVE_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const cart: Array<ICartList> = data?.getCart?.items;

  function reduce (param: Array<ICartList>) {
    return param.reduce((total: any, current) => {
      return [ ...total, current.sku]
    },[])
  }

  const handleSaveCart = () => {
    const skus = reduce(cart);
    saveCart({variables: {skus}});

    alert("Cart Saved");
  }

  const handleDelete = (sku: string) => {
    deleteProduct({
      refetchQueries: [{
        query: GET_CART
      }],
      variables: {sku}
    });
  }

  const handleUpdate = (sku: string, stockLevel: number) => {
    updateProduct({
      refetchQueries: [{
        query: GET_CART
      }],
      variables: {sku, stockLevel}
    });
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

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
        <CartTable cart={cart} handleDelete={handleDelete} handleUpdate={handleUpdate}/>
        <TotalCostTable
          subTotal={data?.getCart?.subTotal}
          totalCost={data?.getCart?.total}
          VAT={data?.getCart?.VAT}
        />
        <div className="cart__button--buy-now"  data-testid="cart__button--buy-now">
          <Button
            className="buy-now"
            onClick={handleSaveCart}
            data-testid="button--buy-now"
            variant="contained"
          >
            BUY NOW
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;

