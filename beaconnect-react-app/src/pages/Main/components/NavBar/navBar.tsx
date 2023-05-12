import React from 'react';
import { AiOutlineQuestionCircle, AiOutlineSearch } from 'react-icons/ai';
import { BiHomeAlt2 } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { TiUserAddOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import logo from './images/logo.png';
import './nav.css';

function NavItem({
  icon,
  text,
  path,
  desktopOnly,
}: {
  icon: JSX.Element;
  text: string;
  path: string;
  desktopOnly?: boolean;
}) {
  const navigate = useNavigate();
  const redirectTo = (redirectPath: string) => () => {
    navigate(redirectPath);
  };

  return (
    <div
      className={`nav-link ${desktopOnly ? 'desktopOnly' : ''}`}
      onClick={redirectTo(path)}
      onKeyDown={redirectTo(path)}
      role="button"
      tabIndex={0}
    >
      {icon}
      <p className="nav-link-desc">{text}</p>
    </div>
  );
}

NavItem.defaultProps = {
  desktopOnly: false,
};

function NavBar({ isLoggedIn }: { isLoggedIn: boolean }) {
  let NavLinks: {
    icon: JSX.Element;
    text: string;
    path: string;
    desktopOnly?: boolean;
  }[] = [];
  let NavControls: {
    icon: JSX.Element;
    text: string;
    path: string;
    desktopOnly?: boolean;
  }[] = [];
  if (isLoggedIn) {
    NavLinks = [
      { icon: <BiHomeAlt2 />, text: 'Home', path: '/' },
      { icon: <CgProfile />, text: 'Profile', path: 'profile' },
      { icon: <AiOutlineSearch />, text: 'Search', path: 'search' },
      { icon: <AiOutlineQuestionCircle />, text: 'Help', path: 'help' },
      // { icon: <AiOutlineSetting />, text: 'Settings', path: 'settings' },
    ];

    NavControls = [{ icon: <FiLogOut />, text: 'Logout', path: 'logout' }];
  } else {
    NavLinks = [
      { icon: <BiHomeAlt2 />, text: 'Home', path: '/' },
      { icon: <AiOutlineSearch />, text: 'Search', path: 'search' },
    ];

    NavControls = [
      {
        icon: <FiUser />,
        text: 'Login',
        path: 'login',
      },
      {
        icon: <TiUserAddOutline />,
        text: 'Register',
        path: 'Register',
        desktopOnly: true,
      },
    ];
  }
  return (
    <nav>
      <div className={`nav-wrapper ${isLoggedIn ? 'LoggedIn' : ''}`}>
        <div className="logo">
          <div className="logo-icon">
            <img src={logo} alt="logo" />
          </div>
          <div className="logo-name">Beaconnet</div>
        </div>

        <div className="nav-links">
          {NavLinks.map((link) => (
            <NavItem
              icon={link.icon}
              text={link.text}
              path={link.path}
              key={link.text}
              desktopOnly={link.desktopOnly}
            />
          ))}
        </div>
        <div className="nav-controls">
          {NavControls.map((link) => (
            <NavItem
              icon={link.icon}
              text={link.text}
              path={link.path}
              key={link.text}
              desktopOnly={link.desktopOnly}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
