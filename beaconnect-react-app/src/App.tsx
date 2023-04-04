import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
