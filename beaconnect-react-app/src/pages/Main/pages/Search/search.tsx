/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { useLazyQuery } from '@apollo/client';
import './search.css';
import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlineLeft } from 'react-icons/ai';
import { searchUserQuery, searchUserVariables, searchUserResult } from '../../components/Query/search.query';
import SearchResultPeople from './components/searchresult_people_left';
import seasonalContent from '../../components/Seasonal/seasonal';

export const SearchUserBar = ({ setFetchResult }: { setFetchResult: any }) => {
  const [searchUser] = useLazyQuery<searchUserResult, searchUserVariables>(searchUserQuery, {
    fetchPolicy: 'network-only',
  });

  const searchUserHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const { currentTarget } = e;
      const searchInput = currentTarget as HTMLInputElement;
      const username = searchInput.value;

      if (username.length > 0) {
        searchUser({ variables: { username } }).then((res) => {
          setFetchResult(res.data);
        });
      }
    }
  };

  return (
    <input className="trend-search-input" type="text" placeholder="search" onKeyDown={searchUserHandler} tabIndex={0} />
  );
};

const backButtonHandler = () => {
  if (window.history.length === 1) {
    window.location.href = '/';
  } else {
    window.history.back();
  }
};

const Search = (isLoggedIn: any) => {
  const [fetchResult, setFetchResult] = React.useState<any>([]);
  return (
    <div className="page-content">
      <div className="page-center-content">
        <div className="trend-searching-container">
          <div className="trend-search-header">
            <div className="trend-search-header-icon">
              <AiOutlineLeft onClick={backButtonHandler} onKeyDown={backButtonHandler} role="button" tabIndex={0} />
            </div>
            <div className="trend-search-header-text">
              <h2>Search</h2>
            </div>
          </div>
          <div className="trend-search-bar">
            <div className="trend-search-bar-icon">
              <BiSearchAlt />
            </div>
            <SearchUserBar setFetchResult={setFetchResult} />
          </div>
          <SearchResultPeople isLoggedIn={isLoggedIn} result={fetchResult} />
        </div>
      </div>

      <div className="page-right-content">
        <div>{seasonalContent}</div>
      </div>
    </div>
  );
};

export default Search;
