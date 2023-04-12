/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './components/createProfile.css';
import { AiFillPlusCircle } from 'react-icons/ai';
import { FaTelegramPlane } from 'react-icons/fa';
import profileCover from '../Login/images/cover.jpg';

const handleFormSubmit = () => {
  console.log('submit');
};

const createProfile = () => (
  <div className="create-profile-wrapper">
    <div className="create-profile-container">
      <h1>
        Welcome
        <span>👋🏻</span>
        <br />
        Initial your profile!
      </h1>
      <form className="create-profile-form">
        <div className="create-profile-form-group">
          <div className="create-profile-form-field">
            <div className="create-profile-form-upload-image">
              <div className="create-profile-form-upload-image-container">
                <img src={profileCover} alt="Cover" />
                <div className="create-profile-form-upload-image-button">
                  <AiFillPlusCircle />
                </div>
              </div>
            </div>
          </div>
          <div className="create-profile-form-field with-submit">
            <input type="text" id="nickname" className="create-profile-form-input" placeholder="Nickname" required />
            <div
              className="create-profile-form-submit-button"
              onClick={handleFormSubmit}
              onKeyDown={handleFormSubmit}
              role="button"
              tabIndex={0}
            >
              <FaTelegramPlane />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
);

export default createProfile;
