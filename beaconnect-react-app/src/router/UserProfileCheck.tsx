import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { getUserProfileQuery } from './components/profile.query';
import Loading from '../pages/Essentials/Loading/loading';
import CreateProfile from '../pages/CreateProfile/createProfile';

const UserProfileCheck = ({
  isLoggedIn,
  children,
  setGetStatus,
  setUserProfile,
  getStatus,
  userProfile,
}: {
  isLoggedIn: boolean;
  children: React.ReactNode;
  setGetStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setUserProfile: React.Dispatch<React.SetStateAction<boolean>>;
  getStatus: boolean;
  userProfile: boolean;
}) => {
  const userProfileChecker = useQuery(getUserProfileQuery, {
    onCompleted: (data) => {
      setGetStatus(true);
      console.log(data);
      if (data.me.info.nickname) setUserProfile(true);
    },
  });

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    setGetStatus(false);
    setUserProfile(false);
    userProfileChecker.refetch();
  }, [isLoggedIn]);

  if (!isLoggedIn) return <>{children}</>;
  if (!getStatus) return <Loading />;
  if (!userProfile) return <CreateProfile setUserProfile={setUserProfile} />;
  return <>{children}</>;
};

export default UserProfileCheck;
