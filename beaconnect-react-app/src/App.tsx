import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import UserContextProvider from './userContext';

const App = () => (
  <BrowserRouter>
    <UserContextProvider>
      <Router />
    </UserContextProvider>
  </BrowserRouter>
);

export default App;
