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
