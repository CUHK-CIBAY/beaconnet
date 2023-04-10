import React from 'react';
import './nav.css';
import { AiOutlineMessage, AiOutlineQuestionCircle, AiOutlineSearch, AiOutlineSetting } from 'react-icons/ai';
import { BiHomeAlt2 } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line no-undef
const NavItem = ({ icon, text, path }: { icon: JSX.Element; text: string; path: string }) => {
  const navigate = useNavigate();
  const redirectTo = (redirectPath: string) => () => {
    navigate(redirectPath);
  };

  return (
    <div className="nav-link" onClick={redirectTo(path)} onKeyDown={redirectTo(path)} role="button" tabIndex={0}>
      {icon}
      <p className="nav-link-desc">{text}</p>
    </div>
  );
};

const NavBar = () => {
  const NavLinks = [
    { icon: <BiHomeAlt2 />, text: 'Home', path: '/' },
    { icon: <CgProfile />, text: 'Profile', path: 'profile' },
    { icon: <AiOutlineMessage />, text: 'Message', path: 'message' },
    { icon: <AiOutlineSearch />, text: 'Search', path: 'search' },
    { icon: <AiOutlineQuestionCircle />, text: 'Help', path: 'help' },
    { icon: <AiOutlineSetting />, text: 'Settings', path: 'settings' },
  ];

  const NavControls = [
    { icon: <FiLogOut />, text: 'Logout', path: 'logout' },
    { icon: <FiUser />, text: 'Account', path: 'account' },
  ];
  return (
    <nav>
      <div className="nav-wrapper">
        <div className="logo">
          <div className="logo-icon">B</div>
          <div className="logo-name">Beaconnet</div>
        </div>

        <div className="nav-links">
          {NavLinks.map((link) => (
            <NavItem icon={link.icon} text={link.text} path={link.path} key={link.text} />
          ))}
        </div>
        <div className="nav-controls">
          {NavControls.map((link) => (
            <NavItem icon={link.icon} text={link.text} path={link.path} key={link.text} />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
