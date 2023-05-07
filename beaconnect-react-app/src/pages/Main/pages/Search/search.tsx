/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { useLazyQuery } from '@apollo/client';
import './search.css';
import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlineLeft } from 'react-icons/ai';
import {
  searchUserVariables,
  searchUserResult,
  searchUserQueryUsername,
  searchUserQueryEmail,
} from '../../components/Query/search.query';
import SearchResultPeople from './components/searchresult_people_left';
import seasonalContent from '../../components/Seasonal/seasonal';

export const SearchUserBar = ({ setFetchResult }: { setFetchResult: any }) => {
  const [searchUserEmail] = useLazyQuery<searchUserResult, searchUserVariables>(searchUserQueryEmail, {
    onCompleted: (data) => {
      if (data.findUser) {
        setFetchResult(data);
      } else {
        window.alert('No user found');
      }
    },
    fetchPolicy: 'network-only',
  });

  const [searchUserUsername] = useLazyQuery<searchUserResult, searchUserVariables>(searchUserQueryUsername, {
    onCompleted: (data) => {
      if (data.findUser) {
        setFetchResult(data);
      } else {
        window.alert('No user found');
      }
    },
    fetchPolicy: 'network-only',
  });

  const searchUserHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const { currentTarget } = e;
      const searchInput = currentTarget as HTMLInputElement;
      const userInput = searchInput.value;

      if (userInput.length > 0) {
        // regex test
        const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (emailRegex.test(userInput)) {
          searchUserEmail({ variables: { email: userInput } });
        } else {
          searchUserUsername({ variables: { username: userInput } });
        }
      }
    }
  };

  return (
    <input
      className="trend-search-input"
      type="text"
      placeholder="Search by Email or Username"
      onKeyDown={searchUserHandler}
      tabIndex={0}
    />
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
