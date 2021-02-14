import React from 'react';
import {render, screen, act, cleanup} from '@testing-library/react';
import {MockedProvider} from '@apollo/client/testing';
import {mocks, error} from "../mocks";
import Cart from '../../pages/cart';

// TODO more test cases to be written
describe('Cart', () => {
  const renderComponent = (status: string) => {
    switch (status) {
      case 'response':
        act(() => {
          render(
            <MockedProvider mocks={mocks} addTypename={false}>
              <Cart/>
            </MockedProvider>,
          )
        });
        break;

      case 'error':
        act(() => {
          render(
            <MockedProvider mocks={error} addTypename={false}>
              <Cart/>
            </MockedProvider>,
          )
        });
        break;

      default:
        act(() => {
          render(
            <MockedProvider mocks={mocks} addTypename={false}>
              <Cart/>
            </MockedProvider>,
          )
        });
        break;
    }
  }

  describe('Response received', () => {
    beforeEach(() => {
      renderComponent('response');
    })

    afterEach(cleanup);

    it('Should display loading...', () => {

      const loading = screen.getByText(/Loading.../i);

      expect(loading).toBeInTheDocument();
    });

    it('Should resolves more than one Item', async () => {
      await new Promise(resolve => setTimeout(resolve, 0));

      const item = await screen.queryAllByText(/T-Shirt/i);
      expect(item.length).toEqual(2);
    });
  })

  describe('It displays error component', () => {
    beforeEach(() => {
      renderComponent('error');
    })

    afterEach(cleanup);
    it('should show error', async () => {

      await new Promise(resolve => setTimeout(resolve, 0));

      const loading = screen.getByText('Error :(');

      expect(loading).toBeInTheDocument();
    });
  })
});
