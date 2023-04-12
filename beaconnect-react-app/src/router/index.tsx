import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import AUTH from '../config/constants';
import Loading from '../pages/Essentials/Loading/loading';
import Admin from '../pages/Admin/admin';

const Login = lazy(() => import('../pages/Login/login.handle'));
const LoginCheck = lazy(() => import('./LoginCheck'));
const Main = lazy(() => import('../pages/Main/main'));
const Logout = lazy(() => import('../pages/Logout/logout'));

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
          path="/admin"
          element={
            <LoginCheck isLoggedIn={isLoggedIn}>
              <Admin />
            </LoginCheck>
          }
        />
        <Route
          path="/register"
          element={<Login loginType="Register" isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/login"
          element={<Login loginType="Login" isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="*"
          element={
            <LoginCheck isLoggedIn={isLoggedIn}>
              <Main />
            </LoginCheck>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default Router;
