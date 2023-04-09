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

const NavBar = () => (
  <nav>
    <div className="nav-wrapper">
      <div className="logo">
        <div className="logo-icon">B</div>
        <div className="logo-name">eaconnect</div>
      </div>

      <div className="nav-links">
        <div className="nav-link">
          <BiHomeAlt2 />
          <p className="nav-link-desc">Home</p>
        </div>
        <div className="nav-link">
          <CgProfile />
          <p className="nav-link-desc">Profile</p>
        </div>
        <div className="nav-link">
          <AiOutlineMessage />
          <p className="nav-link-desc">Message</p>
        </div>
        <div className="nav-link">
          <AiOutlineBarChart />
          <p className="nav-link-desc">Statistic</p>
        </div>
        <div className="nav-link">
          <AiOutlineSearch />
          <p className="nav-link-desc">Search</p>
        </div>
        <div className="nav-link">
          <AiOutlineQuestionCircle />
          <p className="nav-link-desc">Help</p>
        </div>
        <div className="nav-link">
          <AiOutlineSetting />
          <p className="nav-link-desc">Settings</p>
        </div>
      </div>
      <div className="nav-controls">
        <div className="nav-control">
          <FiLogOut />
          <p className="nav-link-desc">Logout</p>
        </div>
        <div className="nav-control">
          <FiUser />
          <p className="nav-link-desc">Account</p>
        </div>
      </div>
    </div>
  </nav>
);

export default NavBar;
