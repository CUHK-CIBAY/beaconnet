import React, { useEffect, useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { FiLogOut } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import {
  showUsersListQuery,
  showUsersListQueryResult,
  deleteUserMutationResult,
  deleteUserMutationVariables,
  deleteUserQuery,
} from '../Main/components/Query/user.query';
import logo from '../Main/components/NavBar/images/logo.png';

import './admin.css';

const NavBar = () => (
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

const ShowUsers = ({ username, userID, nickname, setRefreshQuery }: any) => (
  <div className="show-user-row">
    <div className="panel-show-user-name">{username}</div>
    <div className="panel-show-user-id">{userID}</div>
    <div className="panel-show-user-nickname">{nickname}</div>
    <div className="panel-show-user-delete">
      {/* eslint-disable-next-line */}
      <DeleteUserOnPage userID={userID} setRefreshQuery={setRefreshQuery} />
    </div>
  </div>
);

// eslint-disable-next-line no-unused-vars
const DeleteUserOnPage = ({ userID, setRefreshQuery }: any) => {
  const [deleteUser] = useMutation<deleteUserMutationResult, deleteUserMutationVariables>(deleteUserQuery, {
    onCompleted: () => {
      window.location.reload();
    },
  });

  const handleDeleteUser = (idNumber: any) => {
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
      <RxCross2 />
    </div>
  );
};

const Panel = ({ result, setRefreshQuery }: any) => (
  <div>
    <div className="Panel-componant">Userlist</div>
    <div className="Panel-page">
      <div className="row">
        <div className="block">username</div>
        <div className="block">userID</div>
        <div className="block">nickname</div>
        <div className="block">Delete</div>
      </div>
      {result?.users?.map((user: any) => (
        /* eslint-disable-next-line */
        <ShowUsers
          username={user?.username}
          userID={user?.id}
          nickname={user?.info?.nickname}
          key={user.id}
          setRefreshQuery={setRefreshQuery}
        />
      ))}
    </div>
  </div>
);

const Admin = () => {
  const [result, setResult] = useState<any>([]);
  const [refreshQuery, setRefreshQuery] = useState<boolean>(false);

  const [queryUser] = useLazyQuery<showUsersListQueryResult>(showUsersListQuery, {
    onCompleted: (getuser) => {
      setResult(getuser);
    },
  });
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    queryUser();
  }, []);

  useEffect(() => {
    if (refreshQuery) {
      queryUser();
      setRefreshQuery(false);
    }
  }, [refreshQuery]);

  return (
    <div className="admin-container">
      <NavBar />
      <div className="Panel-container">
        <Panel result={result} setRefreshQuery={setRefreshQuery} />
      </div>
    </div>
  );
};

export default Admin;
