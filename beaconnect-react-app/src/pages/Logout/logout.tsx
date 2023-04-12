import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserContext } from '../../userContext';

const Logout = ({
  setIsLoggedIn,
  setGetStatus,
  setUserProfile,
}: {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setGetStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setUserProfile: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { signOut } = useUserContext();
  const location = useLocation();

  useEffect(() => {
    localStorage.clear();
    signOut();
    setGetStatus(false);
    setUserProfile(false);
    setIsLoggedIn(false);
  }, []);

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default Logout;
