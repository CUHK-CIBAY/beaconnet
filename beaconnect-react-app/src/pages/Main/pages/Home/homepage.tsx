import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
// import { BiSearchAlt } from 'react-icons/bi';
import { WriteBitBox, BitBox } from '../../components/Bits/bits';
import { showBitsQuery, showBitsQueryVariables, showBitsQueryResult } from '../../components/Query/bit.query';
import seasonalEvent from './components/seasonalpic.jpg';

const Home = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [result, setResult] = useState<any>([]);
  const [reBit, setReBit] = useState(null);
  const [bitAttachment, setBitAttachment] = useState<any>(null);

  const [showBits] = useLazyQuery<showBitsQueryResult, showBitsQueryVariables>(showBitsQuery, {
    onCompleted: (data: any) => {
      setResult(data);
    },
  });

  /* eslint-disable */
  useEffect(() => {
    showBits({ variables: { following: isLoggedIn ? true : false } });
  }, []);
  /* eslint-enable */

  return (
    <div className="home-page-container">
      <div className="page-content">
        <div className="page-center-content">
          {isLoggedIn && (
            <WriteBitBox
              reBit={reBit}
              setReBit={setReBit}
              bitAttachment={bitAttachment}
              setBitAttachment={setBitAttachment}
              showBits={showBits}
            />
          )}

          {result.showBits?.length > 0 ? (
            result?.showBits?.map((item: any) => (
              <BitBox
                setReBit={setReBit}
                showBits={showBits}
                setBitAttachment={setBitAttachment}
                isLoggedIn={isLoggedIn}
                key={item.id}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...item}
              />
            ))
          ) : (
            <div className="main-no-bit-warning">Try to follow someone to see their bits!</div>
          )}
        </div>

        <div className="page-right-content">
          <img className="profile-background-picture" src={seasonalEvent} alt="profile" />
          <div className="trend-searching-container">
            <div className="welcome-speech-container">
              <div className="welcome-speech-container-header">Welcome to Beaconnnect!!!</div>
              <div>You can sending Bits to your friend with picture, video and voice.</div>
              <div>There are some function at the left hand side, such as</div>
              <div>
                <ul>
                  <li>Home</li>
                  <li>Profile</li>
                  <li>Search</li>
                  <li>Help</li>
                  <li>Setting</li>
                </ul>
              </div>
              <div>If you help any problem, you can find the help center at the left hand side.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
