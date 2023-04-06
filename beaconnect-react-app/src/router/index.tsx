import React, { lazy, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const Login = lazy(() => import('../pages/Login/login'));
const LoginCheck = lazy(() => import('./LoginCheck'));
const Main = lazy(() => import('../pages/Main/main'));

const Router = () => {
  const [isLoggedIn] = useState(false);

  return (
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
  );
};

export default Router;
