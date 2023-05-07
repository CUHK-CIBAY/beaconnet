import React, { useEffect, useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { FiLogOut } from 'react-icons/fi';
import {
  showUsersListQuery,
  showUsersListQueryResult,
  deleteUserMutationResult,
  deleteUserMutationVariables,
  deleteUserQuery,
} from '../Main/components/Query/user.query';
import userIcon from '../Main/pages/Home/components/icon.png';
import logo from '../Main/components/NavBar/images/logo.png';

import './admin.css';

function NavBar() {
  return (
    <div className="Navbar-container">
      <img className="admin-panel-logo" src={logo} alt="logo" />
      <div
        className="logoutIcon"
        onClick={() => {
          window.location.href = '/logout';
        }}
        onKeyDown={() => {
          window.location.href = '/logout';
        }}
        role="button"
        tabIndex={0}
      >
        <FiLogOut />
      </div>
    </div>
  );
}

function DeleteUserOnPage({ userID, queryUser }: { userID: string; queryUser: () => void }) {
  const [deleteUser] = useMutation<deleteUserMutationResult, deleteUserMutationVariables>(deleteUserQuery, {
    onCompleted: () => {
      queryUser();
    },
  });

  const handleDeleteUser = (idNumber: string) => {
    deleteUser({ variables: { id: idNumber } });
  };

  return (
    <div
      className="panel-show-user-delete-icon"
      onClick={() => {
        handleDeleteUser(userID);
      }}
      onKeyDown={() => {
        handleDeleteUser(userID);
      }}
      role="button"
      tabIndex={0}
    >
      Delete
    </div>
  );
}

function ShowUsers({
  username,
  userID,
  nickname,
  image,
  queryUser,
}: {
  username: string;
  userID: string;
  nickname: string;
  image: string;
  queryUser: () => void;
}) {
  if (!username) {
    return <div />;
  }
  return (
    <div className="show-user-row">
      <div className="panel-show-user-name">
        <img
          className="search-result-user-icon"
          src={
            image
              ? `https://beaconnect-image-imagebucket-ft90dpqhkbr1.s3.ap-southeast-1.amazonaws.com/${image}`
              : userIcon
          }
          alt="profile"
        />
        <p className="panel-show-user-name-text">{username}</p>
      </div>
      {userID && (
        <div className="panel-show-user-id">
          <p className="panel-show-user-id-text">{userID}</p>
        </div>
      )}
      {nickname && (
        <div className="panel-show-user-nickname">
          <p className="panel-show-user-nickname-text">{nickname}</p>
        </div>
      )}
      <div className="panel-show-user-delete">
        <DeleteUserOnPage userID={userID} queryUser={queryUser} />
      </div>
    </div>
  );
}

function Panel() {
  const [result, setResult] = useState<showUsersListQueryResult>();

  const [queryUser] = useLazyQuery<showUsersListQueryResult>(showUsersListQuery, {
    onCompleted: (getUser) => {
      setResult(getUser);
    },
    fetchPolicy: 'network-only',
  });
  useEffect(() => {
    queryUser();
  }, []);

  return (
    <div>
      <div className="Panel-component">User List</div>
      <div className="Panel-page">
        {result?.users?.map(
          (user: {
            username: string;
            id: string;
            info: {
              nickname: string;
              image: string;
            };
          }) => (
            <ShowUsers
              username={user?.username}
              userID={user?.id}
              nickname={user?.info?.nickname}
              image={user?.info?.image}
              queryUser={queryUser}
              key={user.id}
            />
          ),
        )}
      </div>
    </div>
  );
}

function Admin() {
  return (
    <div className="admin-container">
      <NavBar />
      <div className="Panel-container">
        <Panel />
      </div>
    </div>
  );
}

export default Admin;
