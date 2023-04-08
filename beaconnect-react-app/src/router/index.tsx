import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AUTH from '../config/constants';
import Loading from '../pages/Essentials/Loading/loading';

const Login = lazy(() => import('../pages/Login/login.handle'));
const LoginCheck = lazy(() => import('./LoginCheck'));
const Main = lazy(() => import('../pages/Main/main'));

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(AUTH.token);
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={
            <LoginCheck isLoggedIn={isLoggedIn}>
              <Main />
            </LoginCheck>
          }
        />
        <Route path="/login" element={<Login loginType="Login" isLoggedIn={isLoggedIn} />} />
        <Route path="/register" element={<Login loginType="Register" isLoggedIn={isLoggedIn} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
