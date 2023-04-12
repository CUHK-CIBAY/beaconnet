import React from 'react';
import { useMutation } from '@apollo/client';
import { FaTelegramPlane } from 'react-icons/fa';
import {
  UpdateOptionalInfoMutationResult,
  UpdateOptionalInfoMutationVariables,
  updateOptionalInfoQuery,
} from '../../../router/components/profile.query';

// eslint-disable-next-line no-unused-vars
const OptionalProfile = ({ setUserProfile }: { setUserProfile: (done: boolean) => void }) => {
  const [updateInfo] = useMutation<UpdateOptionalInfoMutationResult, UpdateOptionalInfoMutationVariables>(
    updateOptionalInfoQuery,
    {
      onCompleted: (data: UpdateOptionalInfoMutationResult) => {
        console.log(data);
        if (data.updateInfo.info.bio || data.updateInfo.info.phone) setUserProfile(true);
      },
      onError: () => {
        window.alert('Failed to communicate with server. Please try again later.');
      },
    },
  );

  const handleFormSubmit = () => {
    const bio = document.getElementById('Bio') as HTMLInputElement;
    const phone = document.getElementById('phone') as HTMLInputElement;
    updateInfo({ variables: { bio: bio.value, phone: phone.value } });
  };

  return (
    <div className="create-optional-profile">
      <h1>Let us know more...</h1>
      <div
        className="create-optional-profile-skip"
        onClick={() => setUserProfile(true)}
        onKeyDown={() => setUserProfile(true)}
        role="button"
        tabIndex={0}
      >
        Skip
      </div>
      <form className="create-profile-form">
        <div className="create-profile-form-group">
          <div className="create-profile-form-field">
            <textarea id="Bio" className="create-profile-form-input" placeholder="Introduce yourself!" required />
          </div>
          <div className="create-profile-form-field with-submit">
            <input type="text" id="phone" className="create-profile-form-input" placeholder="Phone" required />
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

export default OptionalProfile;
