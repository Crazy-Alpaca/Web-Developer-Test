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
mutation {
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
mutation {
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
