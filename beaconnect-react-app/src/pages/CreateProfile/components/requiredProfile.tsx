import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { AiFillPlusCircle } from 'react-icons/ai';
import { FaTelegramPlane } from 'react-icons/fa';
import profileCover from '../../Login/images/cover.jpg';
import {
  UpdateRequiredInfoMutationResult,
  UpdateRequiredInfoMutationVariables,
  updateRequiredInfoQuery,
} from '../../../router/components/profile.query';

const RequiredProfile = ({
  doneRequired,
  setDoneRequired,
}: {
  doneRequired: boolean;
  // eslint-disable-next-line no-unused-vars
  setDoneRequired: (done: boolean) => void;
}) => {
  const [profileIcon, setProfileIcon] = useState<any>(null);

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

  const handleRequiredProfileDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('dragging');
  };

  const handleRequiredProfileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('dragging');
    if (e.dataTransfer?.files[0].type.includes('image') || e.dataTransfer?.files[0].type.includes('video')) {
      setProfileIcon(e.dataTransfer?.files[0]);
    } else {
      // TODO: Fix type checking not working on chrome
      alert('Only image or video file is allowed, or your browser does not support this feature.');
    }
  };

  const handleRequiredProfileDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('dragging');
  };

  const FileUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setProfileIcon(file);
      }
    };
    fileInput.click();
  };

  const handleFormSubmit = () => {
    const nickname = document.getElementById('nickname') as HTMLInputElement;
    if (nickname.value) {
      updateInfo({ variables: { nickname: nickname.value } });
    }
  };

  return (
    <div
      className="create-required-profile"
      onDragOver={doneRequired ? () => {} : handleRequiredProfileDragOver}
      onDragLeave={doneRequired ? () => {} : handleRequiredProfileDragLeave}
      onDrop={doneRequired ? () => {} : handleRequiredProfileDrop}
    >
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
              <div
                className="create-profile-form-upload-image-container"
                onClick={FileUpload}
                onKeyDown={FileUpload}
                role="button"
                tabIndex={0}
              >
                <img src={profileIcon ? URL.createObjectURL(profileIcon) : profileCover} alt="Cover" />
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
