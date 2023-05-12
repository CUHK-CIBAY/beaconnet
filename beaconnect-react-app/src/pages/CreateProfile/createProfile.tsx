import React, { useEffect, useState } from 'react';
import './components/createProfile.css';
import RequiredProfile from './components/requiredProfile';
import OptionalProfile from './components/optionalProfile';
import Loading from '../../components/Loading/loading';

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
        <Loading showLoading={loading} />
      </div>
    </div>
  );
};

export default createProfile;
