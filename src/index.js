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
  ApolloLink,
  split,
  HttpLink,
  concat 
} from "@apollo/client";

// import { setContext } from '@apollo/client/link/context';
//  const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('AUTH_TOKEN');
//   // return the headers to the context so httpLink can read them
//   console.log( 'header , token ',headers,token)
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     }
//   }
// });

import { getMainDefinition } from '@apollo/client/utilities';


 import theme from "./theme/themes.module.css";

 import { WebSocketLink } from "@apollo/client/link/ws";



const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization:  localStorage.getItem('AUTH_TOKEN')?`Bearer ${localStorage.getItem('AUTH_TOKEN')}`: null,
    }
  }));
  return forward(operation);
})

const httpLink = new HttpLink({ uri: `http://${window.location.hostname}:${process.env.REACT_APP_PORTBACKEND}/graphql` });

 const wsLink = new WebSocketLink({
  uri: `ws://${window.location.hostname}:${process.env.REACT_APP_PORTBACKEND}/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      Authorization:localStorage.getItem('AUTH_TOKEN'),
      // token: localStorage.getItem('token'),
      // refreshToken: localStorage.getItem('refreshToken'),
    },
  },
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
 const client = new ApolloClient({
  cache: new InMemoryCache(),
  // link: authLink.concat(link),
  link: concat(authMiddleware, splitLink),

  uri: `http://${window.location.hostname}:${process.env.REACT_APP_PORTBACKEND}/graphqlsub`,
  

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
