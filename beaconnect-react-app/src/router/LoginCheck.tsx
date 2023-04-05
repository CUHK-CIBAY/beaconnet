import React from 'react';
import { Navigate } from 'react-router-dom';

const LoginCheck = ({ isLoggedIn, children }: { isLoggedIn: boolean; children: React.ReactNode }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default LoginCheck;
