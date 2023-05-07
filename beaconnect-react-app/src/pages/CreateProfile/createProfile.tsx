import React, { useEffect, useState } from 'react';
import './components/createProfile.css';
import RequiredProfile from './components/requiredProfile';
import OptionalProfile from './components/optionalProfile';

const createProfile = ({ setUserProfile }: { setUserProfile: (_done: boolean) => void }) => {
  const [doneRequired, setDoneRequired] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (doneRequired) {
      document.querySelector('.create-profile-container')?.classList.add('doneRequired');
    }
  }, [doneRequired]);

  return (
    <div className="create-profile-wrapper">
      <div className="create-profile-container">
        <RequiredProfile setDoneRequired={setDoneRequired} doneRequired={doneRequired} setLoading={setLoading} />
        {doneRequired && <OptionalProfile setUserProfile={setUserProfile} setLoading={setLoading} />}
        {loading && (
          <div className="create-profile-loading">
            <div className="create-profile-loading-circle" />
          </div>
        )}
      </div>
    </div>
  );
};

export default createProfile;
