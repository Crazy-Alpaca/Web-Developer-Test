import {GET_CART} from '../../pages/cart/index.gql';

export const mocks = [
  {
    request: {
      query: GET_CART,
    },
    result: {
      data: {
        getCart: {
          items: [{
            price: 20,
            sku: 'PW123',
            stockLevel: 3,
            name: 'T-Shirt',
            size: 'medium',
          },
            {
              price: 20,
              sku: 'PW1234s',
              stockLevel: 3,
              name: 'Jeans',
              size: 'medium',
            },
            {
              price: 20,
              sku: 'PW12324s',
              stockLevel: 3,
              name: 'T-Shirt',
              size: 'medium',
            }],
          subTotal: 100,
          total: 1000,
          VAT: 156.99
        },
      },
    },
  },
];

export const error = [
  {
    request: {
      query: GET_CART,
    },
    error: new Error('An error occurred'),
  },
];
