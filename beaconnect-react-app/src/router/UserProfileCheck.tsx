import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import getUserProfileQuery from './components/profile.query';
import Loading from '../pages/Essentials/Loading/loading';

const UserProfileCheck = ({ isLoggedIn, children }: { isLoggedIn: boolean; children: React.ReactNode }) => {
  const [getStatus, setGetStatus] = useState(false);
  const [userProfile, setUserProfile] = useState(false);

  const userProfileChecker = useQuery(getUserProfileQuery, {
    onCompleted: (data) => {
      if (data.me.nickname) setUserProfile(true);
      setGetStatus(true);
    },
  });

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    userProfileChecker;
  }, []);

  if (!isLoggedIn) return <>{children}</>;
  if (!getStatus) return <Loading />;
  if (!userProfile) return <p>aaa</p>;
  return <>{children}</>;
};

export default UserProfileCheck;
