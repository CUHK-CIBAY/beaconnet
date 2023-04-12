import React from 'react';
import { useMutation } from '@apollo/client';
import { AiFillPlusCircle } from 'react-icons/ai';
import { FaTelegramPlane } from 'react-icons/fa';
import profileCover from '../../Login/images/cover.jpg';
import {
  UpdateRequiredInfoMutationResult,
  UpdateRequiredInfoMutationVariables,
  updateRequiredInfoQuery,
} from '../../../router/components/profile.query';

// eslint-disable-next-line no-unused-vars
const RequiredProfile = ({ setDoneRequired }: { setDoneRequired: (done: boolean) => void }) => {
  const [updateInfo] = useMutation<UpdateRequiredInfoMutationResult, UpdateRequiredInfoMutationVariables>(
    updateRequiredInfoQuery,
    {
      onCompleted: (data: UpdateRequiredInfoMutationResult) => {
        if (data.updateInfo.info.nickname) setDoneRequired(true);
      },
      onError: () => {
        window.alert('Failed to communicate with server. Please try again later.');
      },
    },
  );

  const handleFormSubmit = () => {
    const nickname = document.getElementById('nickname') as HTMLInputElement;
    if (nickname.value) {
      updateInfo({ variables: { nickname: nickname.value } });
    }
  };

  return (
    <div className="create-required-profile">
      <h1>
        Welcome
        <span>👋🏻</span>
        <br />
        Getting started...
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
  );
};

export default RequiredProfile;
