import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './config/apollo';
import Router from './router';
import UserContextProvider from './userContext';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <UserContextProvider>
          <Router />
        </UserContextProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
