import React from 'react';
import { AiOutlineLeft } from 'react-icons/ai';

const SettingResetPassword = () => (
  <div className="setting-reset-password-container">
    <div className="setting-reset-password-header">
      <div className="setting-reset-password-header-icon">
        <AiOutlineLeft />
      </div>
      <div className="setting-reset-password-header-content">Reset Password</div>
    </div>
    <div className="setting-reset-password-content">
      <p>
        Change your password with morethan 10 character. Also, must contain at least one uppercase letter, one lowercase
        letter and one special character.
      </p>
      <div className="setting-reset-password-current">
        <input type="password" className="setting-reset-password-current-input" placeholder="Current Password" />
      </div>
      <div className="setting-reset-password-new">
        <input type="password" className="setting-reset-password-new-input" placeholder="New Password" />
      </div>
      <div className="setting-reset-password-confirm">
        <input type="password" className="setting-reset-password-confirm-input" placeholder="Confirm Password" />
      </div>
      <div className="setting-reset-password-submit-container">
        <input type="submit" className="setting-reset-password-submit" />
      </div>
    </div>
  </div>
);

export default SettingResetPassword;
