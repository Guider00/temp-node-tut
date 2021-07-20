import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

/**
 *  Allow -redux
 */
//  import { createStore, applyMiddleware, compose } from "redux";
//  import { Provider } from "react-redux";
//  import thunk from "redux-thunk";
/**
 * 
 * @returns 
 */
/**
 *  
 */

 import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";


 import theme from "./theme/themes.module.css";

 import { WebSocketLink } from "@apollo/client/link/ws";


 const link = new WebSocketLink({
  uri: `ws://localhost:4000/graphqlsub`,
  options: {
    reconnect: true,
  },
});
 const client = new ApolloClient({
  link,
  uri: "http://localhost:4000/graphqlsub",
  cache: new InMemoryCache(),
});

 const AppWithRouter = () => (
  <BrowserRouter>
    <div className={theme.font}>
    <ApolloProvider client={client}>

      <App />
    </ApolloProvider>
    </div>
  </BrowserRouter>
);

ReactDOM.render(
  <React.StrictMode>
    <AppWithRouter />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
