import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserContext } from '../../userContext';

const Logout = (props: any) => {
  const { signOut } = useUserContext();
  const { setIsLoggedIn } = props;
  const location = useLocation();

  useEffect(() => {
    localStorage.clear();
    signOut();
    setIsLoggedIn(false);
  }, []);

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default Logout;
