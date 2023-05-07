import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AUTH from '../config/constants';

function LoginCheck({
  isLoggedIn,
  children,
  userRole,
}: {
  isLoggedIn: boolean;
  children: React.ReactNode;
  userRole?: string;
}) {
  const location = useLocation();

  if (isLoggedIn && userRole === '') {
    return <div id="auth-container">{children}</div>;
  }
  if (!isLoggedIn) return <Navigate to="/" state={{ from: location }} replace />;

  if (userRole) {
    if (
      `|${userRole}|`.includes(`|${window.atob(JSON.parse(localStorage.getItem(AUTH.token)!).value).split('::')[1]}|`)
    ) {
      return <div id="auth-container">{children}</div>;
    }
  }
  return <Navigate to="/logout" state={{ from: location }} replace />;
}

LoginCheck.defaultProps = {
  userRole: '',
};

export default LoginCheck;
