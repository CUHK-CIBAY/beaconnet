import React from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';

const SettingYourAccount = () => (
  <div className="setting-your-account-container">
    <div className="setting-your-account-header">Your Account</div>
    <div className="your-account-change-password">
      <div>
        <p className="your-account-change-password-header">Change password</p>
        <div className="your-account-change-password-content">Change your password at anytime.</div>
      </div>
      <div className="your-account-change-password-arrow">
        <RiArrowRightSLine />
      </div>
    </div>

    <div className="your-account-deactive-account">
      <div>
        <p className="your-account-deactive-account-header">Deactive your account</p>
        <div className="your-account-deactive-account-content">
          After deactive your account, your username, user ID and your profile is no longer be viewed in all plantfrom
          of Beaconnect
        </div>
      </div>
      <div className="your-account-deactive-account-arrow">
        <RiArrowRightSLine />
      </div>
    </div>
  </div>
);

export default SettingYourAccount;
