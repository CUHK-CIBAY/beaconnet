import React from 'react';
import { BitBox } from '../Bits/bits';

const fakeData = {
  id: '1',
  content: '123',
  createAt: '2023-04-11T16:02:48.611Z',
  totalLike: 0,
  author: null,
  __typename: 'Bit',
};

/* eslint-disable */
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
      <BitBox {...fakeData} />
      <BitBox {...fakeData} />
      <BitBox {...fakeData} />
      <BitBox {...fakeData} />
      <BitBox {...fakeData} />
    </div>
  </div>
);

export default SearchResultLatest;
