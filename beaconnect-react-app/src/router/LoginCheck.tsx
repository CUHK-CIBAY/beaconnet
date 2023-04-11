import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const LoginCheck = ({ isLoggedIn, children }: { isLoggedIn: boolean; children: React.ReactNode }) => {
  const location = useLocation();
  if (isLoggedIn) {
    return <>{children}</>;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default LoginCheck;
