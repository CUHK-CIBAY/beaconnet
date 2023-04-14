import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { showProfileQuery, showProfileQueryVariables, showProfileQueryResult } from './components/profile.query';
import Banner1 from './components/borzoi.jpeg';
import Banner2 from './components/images.jpeg';
import './profile.css';

const Profile = () => {
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get('userID');
    if (userId) {
      console.log(userId);
      // eslint-disable-next-line no-use-before-define, no-unused-expressions
      showProfile;
    }
  }, []);

  const showProfile = useQuery<showProfileQueryResult, showProfileQueryVariables>(showProfileQuery, {
    onCompleted: (data: any) => {
      console.log(data);
    },
  });

  return (
    <div className="profile-container">
      <div className="info-container">
        <div className="profile-banner-container">
          <img className="profile-banner-image" src={Banner2} alt={Banner1} />
        </div>
        <div className="user-info-container">
          <div className="user-icon-container">
            <img className="profile-icon-image" src={Banner1} alt={Banner2} />
            <button type="button" className="profile-edit-button">
              Edit
            </button>
          </div>
          <div className="user-info-detail">
            <div className="user-info-usernameUserID">
              <p className="user-info-username">Jonna</p>
              <p className="user-info-userID">@joNNA389</p>
            </div>
            <div className="user-info-descriptionBox">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tristique odio quam, vel finibus lorem
              aliquam in. Donec interdum quam non lacus lacinia egestas. Nulla accumsan cursus lectus consequat euismod.
            </div>
            <div className="user-info-followItem">
              <p className="user-info-following">123 Following</p>
              <p className="user-info-follower">404 Follower</p>
            </div>
          </div>
          <div className="horizontal-line">
            <hr />
          </div>
          <div className="user-profile-button">
            <button type="button" className="profile-Bit-button profile-buttons">
              Bit
            </button>
            <button type="button" className="profile-ReBit-button profile-buttons">
              ReBits
            </button>
          </div>
          <div className="user-bits-show">aaa</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
