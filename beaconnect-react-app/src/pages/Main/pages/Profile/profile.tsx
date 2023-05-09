import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import {
  showProfileQuery,
  showProfileQueryResult,
  showUserProfileQueryEmail,
  showUserProfileQueryResult,
  showUserProfileQueryUsername,
  showUserProfileQueryVariables,
} from './components/profile.query';
import Banner1 from './components/borzoi.jpeg';
import Banner2 from './components/images.jpeg';
import BitBox from '../../components/Bits/bits';
import Loading from '../../../../components/Loading/loading';
import './profile.css';

function Profile({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [profileDetails, setProfileDetails] = useState<
    showProfileQueryResult['me'] | showUserProfileQueryResult['findUser'] | null
  >(null);

  const [queryProfile] = useLazyQuery<showProfileQueryResult>(showProfileQuery, {
    onCompleted: (data: showProfileQueryResult) => {
      setProfileDetails(data.me);
    },
    fetchPolicy: 'network-only',
  });

  const [queryOtherProfileUsername] = useLazyQuery<showUserProfileQueryResult, showUserProfileQueryVariables>(
    showUserProfileQueryUsername,
    {
      onCompleted: (data: showUserProfileQueryResult) => {
        if (data.findUser) setProfileDetails(data.findUser);
        else {
          window.alert('User not found');
          setTimeout(() => {
            window.location.href = '/search';
          }, 1000);
        }
      },
      fetchPolicy: 'network-only',
    },
  );

  const [queryOtherProfileEmail] = useLazyQuery<showUserProfileQueryResult, showUserProfileQueryVariables>(
    showUserProfileQueryEmail,
    {
      onCompleted: (data: showUserProfileQueryResult) => {
        if (data.findUser) setProfileDetails(data.findUser);
        else {
          window.alert('User not found');
          setTimeout(() => {
            window.location.href = '/search';
          }, 1000);
        }
      },
      fetchPolicy: 'network-only',
    },
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    const email = urlParams.get('email');
    if (username) {
      queryOtherProfileUsername({
        variables: {
          username,
        },
      });
    } else if (email) {
      queryOtherProfileEmail({
        variables: {
          email,
        },
      });
    } else {
      queryProfile();
    }
  }, []);

  return (
    <div className="page-content">
      {profileDetails ? (
        <div className="info-container">
          <div className="profile-banner-container">
            <img className="profile-banner-image" src={Banner2} alt={Banner1} />
          </div>
          <div className="user-info-container">
            <div className="user-icon-container">
              <img
                className="profile-icon-image"
                src={
                  profileDetails?.info?.image
                    ? `https://beaconnect-image-imagebucket-ft90dpqhkbr1.s3.ap-southeast-1.amazonaws.com/${profileDetails?.info?.image}`
                    : Banner1
                }
                alt={Banner2}
              />
              {/* <button type="button" className="profile-edit-button">
              Edit
            </button> */}
            </div>
            <div className="user-info-detail">
              <div className="user-info-usernameUserID">
                <p className="user-info-username">{profileDetails?.info?.nickname}</p>
                <p className="user-info-userID">{`@${profileDetails?.username}`}</p>
              </div>
              <div className="user-info-descriptionBox">{profileDetails?.info?.bio}</div>
              {/* <div className="user-info-followItem">
              <p className="user-info-following">123 Following</p>
              <p className="user-info-follower">404 Follower</p>
            </div> */}
            </div>
            <div className="horizontal-line">
              <hr />
            </div>
            <div className="user-profile-button">
              <button type="button" className="profile-Bit-button profile-buttons">
                Bits
              </button>
              {/* <button type="button" className="profile-ReBit-button profile-buttons">
              ReBits
            </button> */}
            </div>
            <div className="user-bits-show">
              {profileDetails?.bits?.map(
                (item: showUserProfileQueryResult['findUser']['bits'][0] | showProfileQueryResult['me']['bits'][0]) => (
                  <BitBox key={item.id} isLoggedIn={isLoggedIn} data={item} showBits={queryProfile} />
                ),
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Profile;
