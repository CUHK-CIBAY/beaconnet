import React, { useEffect } from 'react';
import userIcon from '../../Home/components/icon.png';
/* eslint-disable */
export const SearchResultPeopleList = (user: any) => (
  <div className="search-result-people-container">
    <img
      className="search-result-user-icon"
      src={
        user?.user?.info?.image
          ? `https://beaconnect-image-imagebucket-ft90dpqhkbr1.s3.ap-southeast-1.amazonaws.com/${user.user.info.image}`
          : userIcon
      }
      alt="profile"
    />
    <div className="search-result-user-info">
      <div className="search-result-user-names">
        <p className="search-result-user-nickname">{user?.user?.info?.nickname || user?.user?.username}</p>
        <p className="search-result-user-nameid">{`@${user?.user?.username}`}</p>
      </div>
      <div className="search-result-user-bio">{user?.user?.info?.bio || 'Hello World'}</div>
    </div>
    <div className="search-result-user-follow">
      <input type="submit" value="Follow" className="search-user-follow-button" />
    </div>
  </div>
);

const SearchResultPeople = (result: any) => {
  useEffect(() => {
    console.log(result?.result?.findUser);
  }, [result]);
  return (
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
        {result?.result?.findUser && (
          <>
            <SearchResultPeopleList user={result?.result.findUser} />
            <hr />
          </>
        )}
        <p>Users you may know~</p>
        <SearchResultPeopleList />
        <SearchResultPeopleList />
        <SearchResultPeopleList />
        <SearchResultPeopleList />
        <SearchResultPeopleList />
        <SearchResultPeopleList />
      </div>
    </div>
  );
};

export default SearchResultPeople;
