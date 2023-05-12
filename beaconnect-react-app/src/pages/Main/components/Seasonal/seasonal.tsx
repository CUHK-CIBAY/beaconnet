import React from 'react';
import logo from '../NavBar/images/logo.png';
import AUTH from '../../../../config/constants';
import seasonalEvent from './components/seasonalPicture.jpg';

const seasonalContent = (
  <div className="page-right-placeholder-content">
    <img className="profile-background-picture" src={seasonalEvent} alt="profile" />
    <div className="welcome-speech-container">
      <h4 className="welcome-speech-container-header">Welcome to beaConnnet!!!</h4>
      <div className="welcome-speech-container-animation">
        <img
          className={
            JSON.parse(localStorage.getItem(AUTH.userInfo)!)?.image
              ? 'welcome-speech-container-animation-icon'
              : 'welcome-speech-container-animation-logo'
          }
          src={
            JSON.parse(localStorage.getItem(AUTH.userInfo)!)?.image
              ? `https://beaconnect-image-imagebucket-ft90dpqhkbr1.s3.ap-southeast-1.amazonaws.com/${
                  JSON.parse(localStorage.getItem(AUTH.userInfo)!).image
                }`
              : logo
          }
          alt="profile"
        />
        <div className="welcome-speech-container-animation-dots">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <img className="welcome-speech-container-animation-logo" src={logo} alt="logo" />
      </div>
      <p>
        You can sending Bits to your friend with picture, video and voice. There are some function at the left hand
        side, such as
      </p>
      <ul>
        <li>Home</li>
        <li>Profile</li>
        <li>Search</li>
        <li>Help</li>
        <li>Setting</li>
      </ul>
      <p>If you help any problem, you can find the help center at the left hand side.</p>
    </div>
  </div>
);

export default seasonalContent;
