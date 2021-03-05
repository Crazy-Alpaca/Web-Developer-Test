import React from 'react';
import {render, screen, act} from '@testing-library/react';
import TotalCostTable from '../../components/totalcost-table';

// TODO more test cases to be written
const mock = {
    subTotal: 100,
    totalCost: 1000,
    VAT: 111.99
}

  describe('TotalCostTable', () => {
    act(() => { render(<TotalCostTable VAT={mock.VAT} subTotal={mock.subTotal} totalCost={mock.totalCost} />)});

    it('should display data',  () => {

      const totalCost = screen.getByText(/1000/i);

      expect(totalCost).toBeInTheDocument();
    });
  })
