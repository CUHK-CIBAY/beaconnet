/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */

import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { addAbortSignal } from 'stream';
import './search.css';
import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlineLeft } from 'react-icons/ai';
import TrendSuggestionSection from './components/searchindex_left';
import AdvancedSearch from './components/searchindex_right';
import { BitBox } from '../../components/Bits/bits';
import SearchResultLatest from './components/searchresult_latest_left';
import { searchUserQuery, searchUserVariables, searchUserResult } from '../../components/Query/search.query';
import TrendSuggestionShort from './components/trendsuggestion_short';

// for seach result latest page
import seasonalEvent from '../Home/components/seasonalpic.jpg';
import SearchResultRight from './components/searchresult_right';
import userIcon from '../Home/components/icon.png';
import SearchResultPeople from './components/searchresult_people_left';

export const SearchUserBar = () => {
  const [searchUser] = useLazyQuery<searchUserResult, searchUserVariables>(searchUserQuery);

  const searchUserHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const { currentTarget } = e;
      const searchInput = currentTarget as HTMLInputElement;
      const username = searchInput.value;

      if (username.length > 0) {
        searchUser({ variables: { username } });
      }
    }
  };

  return (
    <input className="trend-search-input" type="text" placeholder="search" onKeyDown={searchUserHandler} tabIndex={0} />
  );
};

const Search = () => (
  <div className="page-content">
    <div className="page-center-content">
      <div className="trend-searching-container">
        <div className="trend-search-header">
          <div className="trend-search-header-icon">
            <AiOutlineLeft />
          </div>
          <div className="trend-search-header-text">
            <h2>Search</h2>
          </div>
        </div>
        <div className="trend-search-bar">
          <div className="trend-search-bar-icon">
            <BiSearchAlt />
          </div>
          <SearchUserBar />
        </div>
        <TrendSuggestionSection />
        {/* <SearchResultLatest /> */}
        {/* <SearchResultPeople /> */}
      </div>
    </div>

    <div className="page-right-content">
      <AdvancedSearch />
      {/* <SearchResultRight /> */}
    </div>
  </div>
);

export default Search;
