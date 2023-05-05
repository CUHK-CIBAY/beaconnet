import React from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';

const SettingNotification = () => (
  <div className="setting-notification-container">
    <div className="setting-notification-header">Notification</div>
    <div className="notification-filter">
      <div>
        <p className="notification-filter-header">Filter</p>
        <div className="notification-filter-content">
          Choose the notification you&apos;d like to see and those you don&apos;t
        </div>
      </div>
      <div className="notification-filter-arrow">
        <RiArrowRightSLine />
      </div>
    </div>
    <div className="notification-preferences">
      <div>
        <p className="notification-preferences-header">preferences</p>
        <div className="notification-preferences-content">Select your perference by notification type</div>
      </div>
      <div className="notification-preferences-arrow">
        <RiArrowRightSLine />
      </div>
    </div>
  </div>
);

export default SettingNotification;
