import React from 'react';
import { Navigate } from 'react-router-dom';

function CheckLogin({ isLoggedIn, children }: { isLoggedIn: boolean; children: React.ReactNode }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
export default CheckLogin;
