/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */

import React from 'react';
import './search.css';
import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlineLeft } from 'react-icons/ai';
import TrendSuggestionSection from '../../components/Search/searchindex_left';
import AdvancedSearch from '../../components/Search/searchindex_right';
import { BitBox } from '../../components/Bits/bits';
import SearchResultLatest from '../../components/Search/searchresult_latest_left';
import TrendSuggestionShort from '../../components/Suggestion/trendsuggestion_short';

// for seach result latest page
import seasonalEvent from '../Home/components/seasonalpic.jpg';
import SearchResultLatestRight from '../../components/Search/searchresult_right';

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
          <input className="trend-search-input" type="text" placeholder="search" />
        </div>
        {/* <TrendSuggestionSection /> */}
        <SearchResultLatest />
      </div>
    </div>

    <div className="page-right-content">
      {/* <AdvancedSearch /> */}
      <SearchResultLatestRight />
    </div>
  </div>
);

export default Search;
