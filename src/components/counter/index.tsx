import React from "react";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import './index.css';

interface IncrementCounter {
  sku: string;
  handleChange(event: any): void;
  handleIncrease(sku: string): void;
  handleReduce(sku: string): void;
  value: number;
}

export const Counter = (props: IncrementCounter) => {
  const {
    sku,
    value,
    handleChange,
    handleIncrease,
    handleReduce,
  } = props;

  return (
    <div className="counter__container">
      <RemoveIcon onClick={() => handleReduce(sku)} className="counter__remove"/>
      <input
        className="counter__input"
        name={sku}
        onChange={handleChange}
        type="number"
        value={value}
      />
      <AddIcon onClick={() => handleIncrease(sku)} className="counter__add"/>
    </div>
  )
}
