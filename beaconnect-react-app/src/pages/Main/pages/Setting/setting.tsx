import React from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import { RiArrowRightSLine } from 'react-icons/ri';
// import SettingYourAccount from './components/setting_Your_Account';
// import SettingPrivacy from './components/setting_Privacy_Safety';
// import SettingNotification from './components/setting_Notification';
// import SettingAccessibility from './components/setting_Accessibility';
import SettingResetPassword from './components/setting_Your_Account_ResetPassword';
import './setting.css';

const Setting = () => (
  <div className="setting-page-container">
    <div className="page-center-content">
      <div className="setting-container">
        <div className="setting-header">
          <div className="setting-header-icon">
            <AiOutlineLeft />
          </div>
          <div className="setting-header-text">Setting</div>
        </div>
        <div className="setting-bar">
          <div className="setting-bar-your-account">
            <div className="setting-bar-your-account-text">Your Account</div>
            <div className="setting-bar-your-account-arrow">
              <RiArrowRightSLine />
            </div>
          </div>
          <div className="setting-bar-privacy-safety">
            <div className="setting-bar-privacy-safety-text">Privacy and Safety</div>
            <div className="setting-bar-privacy-safety-arrow">
              <RiArrowRightSLine />
            </div>
          </div>
          <div className="setting-bar-notification">
            <div className="setting-bar-notification-text">Notification</div>
            <div className="setting-bar-notification-arrow">
              <RiArrowRightSLine />
            </div>
          </div>
          <div className="setting-bar-accessibility">
            <div className="setting-bar-accessibility-text">Acceessibility</div>
            <div className="setting-bar-accessibility-arrow">
              <RiArrowRightSLine />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="page-right-content">
      <div className="setting-function-container">
        {/* <SettingYourAccount /> */}
        {/* <SettingPrivacy /> */}
        {/* <SettingNotification /> */}
        {/* <SettingAccessibility /> */}
        <SettingResetPassword />
      </div>
    </div>
  </div>
);

export default Setting;
