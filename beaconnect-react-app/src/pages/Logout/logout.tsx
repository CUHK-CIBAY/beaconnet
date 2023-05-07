import React, { useEffect } from 'react';
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

  useEffect(() => {
    localStorage.clear();
    signOut();
    setGetStatus(false);
    setUserProfile(false);
    setIsLoggedIn(false);
    window.location.reload();
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
};

export default Logout;
