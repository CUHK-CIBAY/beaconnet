import React from 'react';
import './nav.css';
import {
  AiOutlineBarChart,
  AiOutlineMessage,
  AiOutlineQuestionCircle,
  AiOutlineSearch,
  AiOutlineSetting,
} from 'react-icons/ai';
import { BiHomeAlt2 } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const redirectTo = (path: string) => () => {
    navigate(path);
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <div className="logo">
          <div className="logo-icon">B</div>
          <div className="logo-name">Beaconnet</div>
        </div>

        <div className="nav-links">
          <div className="nav-link" onClick={redirectTo('/')} onKeyDown={redirectTo('/')} role="button" tabIndex={0}>
            <BiHomeAlt2 />
            <p className="nav-link-desc">Home</p>
          </div>
          <div
            className="nav-link"
            onClick={redirectTo('profile')}
            onKeyDown={redirectTo('profile')}
            role="button"
            tabIndex={0}
          >
            <CgProfile />
            <p className="nav-link-desc">Profile</p>
          </div>
          <div
            className="nav-link"
            onClick={redirectTo('message')}
            onKeyDown={redirectTo('message')}
            role="button"
            tabIndex={0}
          >
            <AiOutlineMessage />
            <p className="nav-link-desc">Message</p>
          </div>
          <div
            className="nav-link"
            onClick={redirectTo('statistic')}
            onKeyDown={redirectTo('statistic')}
            role="button"
            tabIndex={0}
          >
            <AiOutlineBarChart />
            <p className="nav-link-desc">Statistic</p>
          </div>
          <div
            className="nav-link"
            onClick={redirectTo('search')}
            onKeyDown={redirectTo('search')}
            role="button"
            tabIndex={0}
          >
            <AiOutlineSearch />
            <p className="nav-link-desc">Search</p>
          </div>
          <div
            className="nav-link"
            onClick={redirectTo('help')}
            onKeyDown={redirectTo('help')}
            role="button"
            tabIndex={0}
          >
            <AiOutlineQuestionCircle />
            <p className="nav-link-desc">Help</p>
          </div>
          <div
            className="nav-link"
            onClick={redirectTo('settings')}
            onKeyDown={redirectTo('settings')}
            role="button"
            tabIndex={0}
          >
            <AiOutlineSetting />
            <p className="nav-link-desc">Settings</p>
          </div>
        </div>
        <div className="nav-controls">
          <div
            className="nav-control"
            onClick={redirectTo('logout')}
            onKeyDown={redirectTo('logout')}
            role="button"
            tabIndex={0}
          >
            <FiLogOut />
            <p className="nav-link-desc">Logout</p>
          </div>
          <div
            className="nav-control"
            onClick={redirectTo('account')}
            onKeyDown={redirectTo('account')}
            role="button"
            tabIndex={0}
          >
            <FiUser />
            <p className="nav-link-desc">Account</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
