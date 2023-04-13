import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { FiLogOut } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import {
  showUsersListQuery,
  showUsersListQueryResult,
  deleteUserMutationResult,
  deleteUserMutationVariables,
  deleteUserQuery,
} from '../Main/components/Query/user.query';

import './admin.css';

const NavBar = () => (
  <div className="Navbar-container">
    <p>logo</p>
    <div className="logoutIcon">
      <FiLogOut />
    </div>
  </div>
);

const ShowUsers = (user: any) => (
  <div className="show-user-row">
    <div className="panel-show-user-name">{user?.username}</div>
    <div className="panel-show-user-id">{user?.id}</div>
    <div className="panel-show-user-nickname">{user?.info?.nickname}</div>
    <div className="panel-show-user-delete">
      {/* eslint-disable-next-line */}
      <DeleteUserOnPage userID={user?.id} />
    </div>
  </div>
);

const DeleteUserOnPage = (user: any) => {
  const [deleteUser] = useMutation<deleteUserMutationResult, deleteUserMutationVariables>(deleteUserQuery, {
    onCompleted: () => {
      window.location.reload();
    },
  });

  const handleDeleteUser = (idNumber: any) => {
    deleteUser({ variables: { id: idNumber?.userID } });
  };

  return (
    <div
      className="panel-show-user-delete-icon"
      onClick={() => {
        handleDeleteUser(user);
      }}
      onKeyDown={() => {
        handleDeleteUser(user);
      }}
      role="button"
      tabIndex={0}
    >
      <RxCross2 />
    </div>
  );
};

const Panel = ({ result }: any) => (
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
        <ShowUsers {...user} key={user.id} />
      ))}
    </div>
  </div>
);

const Admin = () => {
  const [result, setResult] = useState<any>([]);
  const users = useQuery<showUsersListQueryResult>(showUsersListQuery, {
    onCompleted: (getuser) => {
      setResult(getuser);
    },
  });
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    users;
  }, []);

  console.log(result);

  return (
    <div className="admin-container">
      <NavBar />
      <div className="Panel-container">
        <Panel result={result} />
      </div>
    </div>
  );
};

export default Admin;
