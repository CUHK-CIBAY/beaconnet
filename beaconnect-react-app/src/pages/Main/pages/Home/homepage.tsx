import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { BiSearchAlt } from 'react-icons/bi';
import { WriteBitBox, BitBox } from '../../components/Bits/bits';
import { showBitsQuery, showBitsQueryVariables, showBitsQueryResult } from '../../components/Query/bit.query';
import seasonalEvent from './components/seasonalpic.jpg';

const Home = () => {
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
        <WriteBitBox />
        {result?.showBits?.map((item: any) => (
          /* eslint-disable-next-line */
          <BitBox {...item} key={item.id} />
        ))}
      </div>
      <div className="page-right-content">
        <img className="profile-background-picture" src={seasonalEvent} alt="profile" />
        <div className="trend-searching-container">
          <div className="trend-search-bar">
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
