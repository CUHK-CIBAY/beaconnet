import React, { useEffect, useState } from 'react';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import userIcon from '../../Home/components/icon.png';
import { showUsersListQuery } from '../../../components/Query/search.query';
// import AUTH from '../../../../../config/constants';

export function SearchResultPeopleList(props: any) {
  const [followed, setFollowed] = useState<boolean>(false);
  // console.log(user);
  // console.log(
  //   user?.user?.following &&
  //     user?.user?.following.find(
  //       (following: any) => following.id === JSON.parse(localStorage.getItem(AUTH.userInfo)!).id,
  //     ),
  // );

  type followUserMutationVariables = {
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

  const [followUser] = useMutation<followUserMutationResult, followUserMutationVariables>(followUserQuery);

  const followOtherUser = (id: any) => {
    followUser({ variables: { id } }).then(() => {
      setFollowed(!followed);
    });
  };

  return (
    <div className="search-result-people-container">
      <img
        className="search-result-user-icon"
        src={
          props?.user?.info?.image
            ? `https://beaconnect-image-imagebucket-ft90dpqhkbr1.s3.ap-southeast-1.amazonaws.com/${props?.user?.info.image}`
            : userIcon
        }
        alt="profile"
      />
      <div className="search-result-user-info">
        <div className="search-result-user-names">
          <p className="search-result-user-nickname">{props?.user?.info?.nickname || props?.user?.username}</p>
          <p className="search-result-user-nameID">{`@${props?.user?.username}`}</p>
        </div>
        <div className="search-result-user-bio">{props?.user?.info?.bio || 'The user has no bio yet!'}</div>
      </div>
      <div className={`search-result-user-follow ${followed ? 'search-result-user-followed' : ''}`}>
        <input
          type="button"
          value={followed ? 'Unfollow' : 'Follow'}
          className="search-user-follow-button"
          onClick={() => {
            if (props?.isLoggedIn.isLoggedIn) followOtherUser(props?.user?.id);
            else window.location.href = '/login';
          }}
        />
      </div>

      <div className="search-result-user-viewUser">
        <input
          type="button"
          value="View"
          className="search-user-follow-button"
          onClick={() => {
            window.location.href = `/profile?username=${props?.user?.username}`;
          }}
        />
      </div>
    </div>
  );
}

function SearchResultPeople(props: any) {
  const [users, setUsers] = useState<any>([]);
  const [queryUser] = useLazyQuery<any>(showUsersListQuery, {
    onCompleted: (getUser) => {
      console.log(getUser);
      setUsers(
        getUser?.users
          // TODO: Impl Recommendation system / better shuffle Algo
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
        {props?.result && (
          <>
            <SearchResultPeopleList user={props?.result} isLoggedIn={!props?.isLoggedIn} />
            <hr />
          </>
        )}
        <h3>Users you may know</h3>
        {users &&
          users.map((user: any) => (
            <SearchResultPeopleList user={user} isLoggedIn={props?.isLoggedIn} key={user?.id} />
          ))}
      </div>
    </div>
  );
}

export default SearchResultPeople;
