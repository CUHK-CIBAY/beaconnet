import React from 'react';
import { BitBox } from '../Bits/bits';

const SearchResultLatest = () => (
  <div className="search-result-lastest-section">
    <div className="search-result-lastest-header">
      <div className="search-result-islastest-header">
        <p>Latest</p>
      </div>
      <div className="search-result-isnotpeople-header">
        <p>People</p>
      </div>
    </div>
    <div className="search-result-lastest">
      <BitBox isRepost haveCaption />
      <BitBox isRepost />
      <BitBox havePhoto />
      <BitBox />
      <BitBox />
    </div>
  </div>
);

export default SearchResultLatest;
