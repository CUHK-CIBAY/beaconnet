import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { getUserProfileQuery } from './components/profile.query';
import Loading from '../pages/Essentials/Loading/loading';
import CreateProfile from '../pages/CreateProfile/createProfile';

const UserProfileCheck = ({ isLoggedIn, children }: { isLoggedIn: boolean; children: React.ReactNode }) => {
  const [getStatus, setGetStatus] = useState(false);
  const [userProfile, setUserProfile] = useState(false);

  const userProfileChecker = useQuery(getUserProfileQuery, {
    onCompleted: (data) => {
      console.log(data, isLoggedIn, getStatus, userProfile);
      setGetStatus(true);
      if (data.me.nickname) setUserProfile(true);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    isLoggedIn && !getStatus && userProfileChecker.refetch();
  }, [isLoggedIn]);

  if (!isLoggedIn) return <>{children}</>;
  if (!getStatus) return <Loading />;
  if (!userProfile) return <CreateProfile />;
  return <>{children}</>;
};

export default UserProfileCheck;
