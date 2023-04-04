import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/login';
import Main from './pages/Main/main';
import CheckLogin from './checklogin';

function App() {
  const [isLoggedIn] = useState(false);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <CheckLogin isLoggedIn={isLoggedIn}>
            <Main />
          </CheckLogin>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
