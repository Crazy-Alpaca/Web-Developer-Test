import React from "react";
import {Input} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import './index.css';

interface IncrementCounter {
  index: number;
  sku: string;
  updateProduct(sku: string, value: number): void;
  value: number;
}

export const Counter = (props: IncrementCounter) => {
  const {
    index,
    sku,
    updateProduct,
    value
  } = props;

  const [state, setState] = React.useState<any>({[sku]: value});
  const [i] =  React.useState<string>(sku);


  const handleChange = (event: any) => {
    setState({[event.target.name]: event.target.value})
      console.log(state);
  };

  const handleReduce = () => {
    if (state.sku <= -1) {
      return
    }
    else {
      setState(state.sku - 1)
      console.log(state);
    }
  }

  const handleIncrease = () => setState(state + 1);

  return (
    <div className="counter__container">
      <RemoveIcon onClick={() => handleReduce()} className="counter__remove"/>
      <input
        className="counter__input"
        name={sku}
        onChange={(event) => handleChange(event)}
        type="number"
        value={state[sku as any]}
      />
      <AddIcon onClick={() => handleIncrease()}  className="counter__add"/>
    </div>
  )
}
