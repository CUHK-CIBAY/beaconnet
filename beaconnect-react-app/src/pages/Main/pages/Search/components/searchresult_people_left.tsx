import React, { useEffect, useState } from 'react';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import userIcon from '../../Home/components/icon.png';
import { showUsersListQuery } from '../../../components/Query/search.query';
/* eslint-disable */
export const SearchResultPeopleList = (user: any) => {
  type deleteUserMutationVariables = {
    id: string;
  };

  type followUserMutationResult = {
    followUser: {
      id: string;
    };
  };

  const followUserQuery = gql`
    mutation followUser($id: ID!) {
      followUser(id: $id) {
        id
      }
    }
  `;

  const [followUser] = useMutation<any, any>(followUserQuery, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const followOtherUser = (id: any) => {
    console.log(id);
    followUser({ variables: { id } });
  };

  return (
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
        <input
          type="submit"
          value="Follow"
          className="search-user-follow-button"
          onClick={() => {
            followOtherUser(user?.user?.id);
          }}
        />
      </div>
    </div>
  );
};

const SearchResultPeople = (result: any) => {
  const [users, setUsers] = useState<any>([]);

  const [queryUser] = useLazyQuery<any>(showUsersListQuery, {
    onCompleted: (getuser) => {
      setUsers(getuser);
    },
  });
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    queryUser();
  }, []);

  const userResult = users?.users?.slice(0, 5);

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
        {userResult && userResult.map((user: any) => <SearchResultPeopleList user={user} />)}
      </div>
    </div>
  );
};

export default SearchResultPeople;
