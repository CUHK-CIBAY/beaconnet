import React, { Suspense, lazy, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loading from '../pages/Essentials/Loading/loading';

const Login = lazy(() => import('../pages/Login/login'));
const LoginCheck = lazy(() => import('./LoginCheck'));
const Main = lazy(() => import('../pages/Main/main'));

const Router = () => {
  const [isLoggedIn] = useState(false);

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
        <Route path="/login" element={<Login loginType="Login" />} />
        <Route path="/register" element={<Login loginType="Register" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
