import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
// import { BiSearchAlt } from 'react-icons/bi';
import { WriteBitBox, BitBox } from '../../components/Bits/bits';
import { showBitsQuery, showBitsQueryVariables, showBitsQueryResult } from '../../components/Query/bit.query';
import seasonalEvent from './components/seasonalpic.jpg';

const Home = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [result, setResult] = useState<any>([]);
  const showBits = useQuery<showBitsQueryResult, showBitsQueryVariables>(showBitsQuery, {
    onCompleted: (data: any) => {
      setResult(data);
    },
  });

  /* eslint-disable */
  useEffect(() => {
    showBits;
  }, []);
  /* eslint-enable */

  return (
    <div className="page-content">
      <div className="page-center-content">
        {isLoggedIn && <WriteBitBox />}
        {result?.showBits?.map((item: any) => (
          /* eslint-disable-next-line */
          <BitBox showBits={showBits} {...item} key={item.id} />
        ))}
      </div>
      <div className="page-right-content">
        <img className="profile-background-picture" src={seasonalEvent} alt="profile" />
        <div className="trend-searching-container">
          <div className="welcome-speech-container">
            <div className="welcome-speech-container-header">
              Welcome to Beaconnnect!!!
            </div>
            <div>
              You can sending Bits to your friend with picture, video and voice.
            </div>
            <div>
              There are some function at the left hand side, such as
            </div>
            <div>
              <ul>
                <li>Home</li>
                <li>Profile</li>
                <li>Search</li>
                <li>Help</li>
                <li>Setting</li>
              </ul>
            </div>
            <div>
              If you help any problem, you can find the help center at the left hand side.
            </div>
          </div>
          {/* <div className="trend-search-bar">
            <div className="trend-search-bar-icon">
              <BiSearchAlt />
            </div>
            <input type="text" placeholder="search" />
          </div>
          <div className="trend-suggestion-section">
            <h2>Trends for you</h2>
            <div className="trend-suggestion-list">
              <p className="trend-suggestion-item">GitHub</p>
              <p className="trend-suggestion-item-size">2.5M Bit</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default Home;
