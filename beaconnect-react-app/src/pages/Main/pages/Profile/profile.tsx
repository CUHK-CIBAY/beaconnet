/* eslint-disable max-len */
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { showProfileQuery, showProfileQueryResult } from './components/profile.query';
import Banner1 from './components/borzoi.jpeg';
import Banner2 from './components/images.jpeg';
import BitBox from '../../components/Bits/bits';
import './profile.css';

const Profile = () => {
  // eslint-disable-next-line no-shadow
  const [profileDetails, setProfileDetails] = useState<any>(null);

  useQuery<showProfileQueryResult>(showProfileQuery, {
    onCompleted: (data: any) => {
      setProfileDetails(data.me);
    },
  });

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
              {profileDetails?.bits?.map((item: any) => (
                <BitBox
                  key={item.id}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...item}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="loading">{/* <div className="loading-text">Loading...</div> */}</div>
      )}
    </div>
  );
};

export default Profile;
