import React from "react";

export interface ITotalCostTable {
  subTotal?: number;
  totalCost?: number;
  VAT?: string;
}

const text = {
  subTotal: 'Subtotal',
  totalCost: 'Total Cost',
  VAT: 'VAT at 20%',
}

const TotalCostTable: React.FC<ITotalCostTable> = (props) => {
  const {
    subTotal,
    totalCost,
    VAT,
  } = props;

  return (
    <table role="table">
      <tbody role="rowgroup">
      <tr role="row">
        <td role="cell" >{text.subTotal}</td>
        <td role="cell" align="right">{subTotal}</td>
      </tr>
      <tr role="row">
        <td role="cell" >{text.VAT}</td>
        <td role="cell" align="right">{VAT}</td>
      </tr>
      <tr role="row">
        <td role="cell" >{text.totalCost}</td>
        <td role="cell" align="right">{totalCost}</td>
      </tr>
      </tbody>
    </table>
  )
}

export default TotalCostTable;
