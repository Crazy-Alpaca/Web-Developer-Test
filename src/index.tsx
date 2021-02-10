import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Cart from './pages/cart/';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  //uri: 'http://localhost:8080/api',
  uri: 'https://sapmle-shopping-cart.herokuapp.com/',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Cart />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
