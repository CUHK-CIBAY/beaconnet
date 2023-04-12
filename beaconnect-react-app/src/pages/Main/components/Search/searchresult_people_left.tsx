import React from 'react';
import userIcon from '../../pages/Home/components/icon.png';

export const SearchResultPeopleList = () => (
  <div className="search-result-people-container">
    <img className="search-result-user-icon" src={userIcon} alt="profile" />
    <div className="search-result-user-info">
      <div className="search-result-user-names">
        <p className="search-result-user-nickname">Username</p>
        <p className="search-result-user-nameid">@Username_id</p>
      </div>
      <div className="search-result-user-bio"> This is my bio. haha : blah balh balh balh </div>
    </div>
    <div className="search-result-user-follow">
      <input type="submit" value="Follow" className="search-user-follow-button" />
    </div>
  </div>
);

const SearchResultPeople = () => (
  <div className="search-result-people-section">
    <div className="search-result-people-header">
      <div className="search-result-isnotlastest-header">
        <p>Latest</p>
      </div>
      <div className="search-result-ispeople-header">
        <p>People</p>
      </div>
    </div>
    <div className="search-result-people">
      <SearchResultPeopleList />
      <SearchResultPeopleList />
      <SearchResultPeopleList />
      <SearchResultPeopleList />
      <SearchResultPeopleList />
      <SearchResultPeopleList />
      <SearchResultPeopleList />
    </div>
  </div>
);

export default SearchResultPeople;
