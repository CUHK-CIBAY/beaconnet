import React, { useEffect } from 'react';
import { useUserContext } from '../../userContext';

function Logout({
  setIsLoggedIn,
  setGetStatus,
  setUserProfile,
}: {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setGetStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setUserProfile: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { signOut } = useUserContext();

  useEffect(() => {
    localStorage.clear();
    signOut();
    setGetStatus(false);
    setUserProfile(false);
    setIsLoggedIn(false);
    window.location.reload();
  }, []);

  return <span />;
}

export default Logout;
