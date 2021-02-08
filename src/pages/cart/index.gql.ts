import {gql} from "@apollo/client";

export const GET_CART = gql`
query {
  getCart {
    items {
      price
      sku
      stockLevel
      name
      size
    }
    subTotal
    total
    VAT
  }
}
`;

export const UPDATE_PRODUCT = gql`
mutation ($sku: ID!, $stockLevel: Float! ){
  updateProduct(sku: $sku, stockLevel: $stockLevel) {
    items{
      price
      size
      sku
      name
      stockLevel
    }
    subTotal
    VAT
    total
  }
}
`;

export const REMOVE_PRODUCT = gql`
mutation ($sku: ID!){
  deleteProduct(sku: $sku) {
    items{
      price
      size
      sku
      name
      stockLevel
    }
    subTotal
    VAT
    total
  }
}
`;

export const SAVE_CART = gql`
mutation ($skus: [ID]){
  saveCart(skus: $skus) {
    items{
      price
      size
      sku
      name
      stockLevel
    }
    subTotal
    VAT
    total
  }
}
`;
