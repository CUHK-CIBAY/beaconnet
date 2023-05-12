import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import userIcon from '../../Home/components/icon.png';
import {
  showUsersListQuery,
  showUsersListResult,
  followUserMutationResult,
  followUserMutationVariables,
  followUserQuery,
  findUserResult,
  findUserVariables,
  findUserQuery,
} from '../../../components/Query/search.query';
import Loading from '../../../../../components/Loading/loading';
// import AUTH from '../../../../../config/constants';

export function SearchResultPeopleList({ isLoggedIn, user }: { isLoggedIn: boolean; user: any }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [findUser] = useLazyQuery<findUserResult, findUserVariables>(findUserQuery, {
    onCompleted: (data) => {
      const dataWithFollowed = data.findUser;
      dataWithFollowed.followed = !!data.me?.following.find((item: any) => item.id === data.findUser.id);
      setUserInfo(dataWithFollowed);
      setLoading(false);
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    findUser({ variables: { ID: user.id } });
  }, []);

  const [followUser] = useMutation<followUserMutationResult, followUserMutationVariables>(followUserQuery, {
    fetchPolicy: 'network-only',
  });

  const followOtherUser = (id: any) => {
    setLoading(true);
    followUser({ variables: { id } }).then(() => {
      findUser({ variables: { ID: user.id } });
    });
  };

  return (
    <div className="search-result-people-container">
      <img
        className="search-result-user-icon"
        src={
          userInfo?.info?.image
            ? `https://beaconnect-image-imagebucket-ft90dpqhkbr1.s3.ap-southeast-1.amazonaws.com/${userInfo?.info.image}`
            : userIcon
        }
        alt="profile"
      />
      <div className="search-result-user-info">
        <div className="search-result-user-names">
          <p className="search-result-user-nickname">{userInfo?.info?.nickname || userInfo?.username}</p>
          <p className="search-result-user-nameID">{`@${userInfo?.username}`}</p>
        </div>
        <div className="search-result-user-bio">{userInfo?.info?.bio || 'The user has no bio yet!'}</div>
      </div>
      <div className={`search-result-user-follow ${userInfo?.followed ? 'search-result-user-followed' : ''}`}>
        <input
          type="button"
          value={userInfo?.followed ? 'Unfollow' : 'Follow'}
          className="search-user-follow-button"
          onClick={() => {
            if (isLoggedIn) followOtherUser(userInfo?.id);
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
            window.location.href = `/profile?username=${userInfo?.username}`;
          }}
        />
      </div>
      <Loading boxWidth="17px" showLoading={loading} />
    </div>
  );
}

function SearchResultPeople(props: any) {
  const [users, setUsers] = useState<any>([]);
  const [queryUser] = useLazyQuery<showUsersListResult>(showUsersListQuery, {
    onCompleted: (getUser) => {
      setUsers(
        getUser?.users
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
            <SearchResultPeopleList user={props?.result} isLoggedIn={props?.isLoggedIn.isLoggedIn} />
            <hr />
          </>
        )}
        <h3>Users you may know</h3>
        {users &&
          users
            // TODO: Impl Recommendation system / better shuffle Algo
            .map((user: any) => (
              <SearchResultPeopleList user={user} isLoggedIn={props?.isLoggedIn.isLoggedIn} key={user?.id} />
            ))}
      </div>
    </div>
  );
}

export default SearchResultPeople;
