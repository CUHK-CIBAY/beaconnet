import React, { useEffect, useState } from 'react';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import userIcon from '../../Home/components/icon.png';
import { showUsersListQuery } from '../../../components/Query/search.query';
// eslint-disable-next-line no-unused-vars
import AUTH from '../../../../../config/constants';
/* eslint-disable */
export const SearchResultPeopleList = (props: any) => {
  const [followed, setFollowed] = useState<boolean>(false);
  // console.log(user);
  // console.log(
  //   user.user.following &&
  //     user.user.following.find(
  //       (following: any) => following.id === JSON.parse(localStorage.getItem(AUTH.userInfo)!).id,
  //     ),
  // );

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
      // console.log(data);
    },
  });

  const followOtherUser = (id: any) => {
    followUser({ variables: { id } });
  };

  return (
    <div className="search-result-people-container">
      <img
        className="search-result-user-icon"
        src={
          props.user?.info?.image
            ? `https://beaconnect-image-imagebucket-ft90dpqhkbr1.s3.ap-southeast-1.amazonaws.com/${props.user.user.info.image}`
            : userIcon
        }
        alt="profile"
      />
      <div className="search-result-user-info">
        <div className="search-result-user-names">
          <p className="search-result-user-nickname">{props.user?.info?.nickname || props.user?.username}</p>
          <p className="search-result-user-nameID">{`@${props.user?.username}`}</p>
        </div>
        <div className="search-result-user-bio">{props.user?.info?.bio || 'Hello World'}</div>
      </div>
      {props.isLoggedIn.isLoggedIn && (
        <div className="search-result-user-follow">
          <input
            type="button"
            value={followed ? 'Unfollow' : 'Follow'}
            className="search-user-follow-button"
            onClick={() => {
              followOtherUser(props.user?.id);
            }}
          ></input>
        </div>
      )}

      <div className="search-result-user-viewUser">
        <input
          type="button"
          value="View"
          className="search-user-follow-button"
          onClick={() => {
            window.location.href = `/profile?username=${props.user?.username}`;
          }}
        ></input>
      </div>
    </div>
  );
};

const SearchResultPeople = (props: any) => {
  const [users, setUsers] = useState<any>([]);
  const [queryUser] = useLazyQuery<any>(showUsersListQuery, {
    onCompleted: (getuser) => {
      console.log(getuser.me.following);
      setUsers(
        getuser?.users
          ?.map((value: any) => ({ value, sort: Math.random() }))
          .sort((a: { sort: number }, b: { sort: number }) => a.sort - b.sort)
          .map((a: { value: any }) => a.value)
          .slice(0, 5),
      );
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    queryUser();
  }, []);

  return (
    <div className="search-result-people-section">
      <div className="search-result-people">
        {props.result?.findUser && (
          <>
            <SearchResultPeopleList user={props?.result.findUser} isLoggedIn={props.isLoggedIn} />
            <hr />
          </>
        )}
        <h3>Users you may know</h3>
        {users &&
          users.map((user: any) => <SearchResultPeopleList user={user} isLoggedIn={props.isLoggedIn} key={user.id} />)}
      </div>
    </div>
  );
};

export default SearchResultPeople;
