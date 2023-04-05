import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/login';
import LoginCheck from './LoginCheck';
import Main from './pages/Main/main';

function App() {
  const [isLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LoginCheck isLoggedIn={isLoggedIn}>
              <Main />
            </LoginCheck>
          }
        />
        <Route path="/login" element={<Login loginType="Login" />} />
        <Route path="/register" element={<Login loginType="Register" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
