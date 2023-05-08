import React from 'react';
import { useMutation } from '@apollo/client';
import { FaTelegramPlane } from 'react-icons/fa';
import { optionUpdateResult, optionUpdateVariables, optionUpdateQuery } from '../../../router/components/profile.query';

function OptionalProfile({
  setUserProfile,
  setLoading,
}: {
  setUserProfile: (_done: boolean) => void;
  setLoading: (_loading: boolean) => void;
}) {
  // set profile style and state to redirect
  const doneSetProfile = () => {
    document.querySelector('.create-profile-wrapper')?.classList.toggle('redirect');
    setTimeout(() => {
      setUserProfile(true);
    }, 1000);
  };

  // update user info mutation by graphql
  const [updateInfo] = useMutation<optionUpdateResult, optionUpdateVariables>(optionUpdateQuery, {
    onCompleted: (data: optionUpdateResult) => {
      // set loading state
      setLoading(false);
      // redirect to main page
      if (data.updateInfo.info.bio || data.updateInfo.info.phone) doneSetProfile();
    },
    onError: () => {
      // output error message
      setLoading(false);
      window.alert('Failed to communicate with server. Please try again later.');
    },
  });

  // handle form submit
  const handleFormSubmit = () => {
    const bio = document.getElementById('Bio') as HTMLInputElement;
    const phone = document.getElementById('phone') as HTMLInputElement;
    // set loading state
    setLoading(true);
    // update user info
    updateInfo({ variables: { bio: bio.value, phone: phone.value } });
  };

  // render optional profile form
  return (
    <div className="create-optional-profile">
      <h1>Let us know more...</h1>
      <div
        className="create-optional-profile-skip"
        onClick={doneSetProfile}
        onKeyDown={doneSetProfile}
        role="button"
        tabIndex={0}
      >
        Skip
      </div>
      <form
        className="create-profile-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit();
        }}
      >
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
}

export default OptionalProfile;
