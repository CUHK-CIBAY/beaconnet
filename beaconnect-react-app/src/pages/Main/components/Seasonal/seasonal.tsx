import React from 'react';
import seasonalEvent from './components/seasonalPicture.jpg';

const seasonalContent = (
  <div className="page-right-placeholder-content">
    <img className="profile-background-picture" src={seasonalEvent} alt="profile" />
    <div className="welcome-speech-container">
      <h4 className="welcome-speech-container-header">Welcome to beaConnnet!!!</h4>
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
