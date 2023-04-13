import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { FiLogOut } from 'react-icons/fi';
import { showUsersListQuery, showUsersListQueryResult } from '../Main/components/Query/user.query';

import './admin.css';

const NavBar = () => (
  <div className="Navbar-container">
    <p>logo</p>
    <div className="logoutIcon">
      <FiLogOut />
    </div>
  </div>
);

export const ShowUsers = (user: any) => (
  <div className="show-user-row">
    <div className="panel-show-user-name">{user?.username}</div>
    <div className="panel-show-user-id">{user?.id}</div>
    <div className="panel-show-user-nickname">{user?.info?.nickname}</div>
    <div className="panel-show-user-delete">Delete</div>
  </div>
);

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
