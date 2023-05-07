import React from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';

function SettingPrivacy() {
  return (
    <div className="setting-privacy-safety-container">
      <div className="setting-privacy-safety-header">Privacy and Safety</div>
      <div className="privacy-safety-your-bits">
        <div>
          <p className="privacy-safety-your-bits-header">Your Bits</p>
          <div className="privacy-safety-your-bits-content">Manage the information associated with your Bits</div>
        </div>
        <div className="privacy-safety-your-bits-arrow">
          <RiArrowRightSLine />
        </div>
      </div>

      <div className="privacy-safety-content-see">
        <div>
          <p className="privacy-safety-content-see-header">Content you see</p>
          <div className="privacy-safety-content-see-content">
            Decide what you see on Beaconnect based on your preferences, like topics and interests.
          </div>
        </div>
        <div className="privacy-safety-content-see-arrow">
          <RiArrowRightSLine />
        </div>
      </div>
    </div>
  );
}

export default SettingPrivacy;
