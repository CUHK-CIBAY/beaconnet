import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import { BsSoundwave, BsImage } from 'react-icons/bs';
import { FiVideo } from 'react-icons/fi';
import { TbSend } from 'react-icons/tb';
import NavBar from './components/NavBar/navBar';
import './components/main.css';
import './pages/Home/components/home.css';

import userIcon from './pages/Home/components/icon.png';

const WriteBitBox = () => (
  <div className="write-bit-box bit-box-container">
    <img className="bit-box-icon" src={userIcon} alt="profile" />
    <div className="write-bit-box-content">
      <textarea className="write-bit-box-content-text" placeholder="Write something..." />
      <div className="write-bit-box-options">
        <div className="write-bit-box-options-attachment">
          <BsImage className="write-bit-box-options-icon" />
          <FiVideo className="write-bit-box-options-icon" />
          <BsSoundwave className="write-bit-box-options-icon" />
        </div>
        <div className="write-bit-box-options-submit">
          <TbSend className="write-bit-box-options-submit-icon" />
          <input type="submit" value="Send Bit" />
        </div>
      </div>
    </div>
  </div>
);

const BitBox = () => (
  <div className="bit-box bit-box-container">
    <div className="bit-box-content-header">
      <img className="bit-box-icon" src={userIcon} alt="profile" />
      <div className="bit-box-content-header-name">John Doe</div>
      <div className="bit-box-content-header-userID">@johndoe</div>
      <div className="bit-box-content-header-time">2 hours ago</div>
    </div>
    <div className="bit-box-content">
      <div className="bit-box-content-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget tincidunt lacinia, nisl nisl
        aliquet nisl, eget aliquet nisl nisl eget nisl. Donec auctor, nisl eget tincidunt lacinia, nisl nisl aliquet
        nisl, eget aliquet nisl nisl eget nisl.
      </div>
    </div>
    <div className="bit-box-content-footer">
      <div className="bit-box-content-footer-likes bit-box-content-footer-icons">
        <AiOutlineHeart />
        <p>10 likes</p>
      </div>
      <div className="bit-box-content-footer-comments bit-box-content-footer-icons">
        <BiComment />
        <p>5 comments</p>
      </div>
    </div>
    <div className="bit-box-content-footer-comment">
      <div className="bit-box-content-footer-comment-input">
        <input type="text" placeholder="Write a comment..." />
      </div>
      <div className="bit-box-content-footer-comment-submit">
        <TbSend />
      </div>
    </div>
  </div>
);

const Main = () => (
  <div className="homePage">
    <NavBar />
    <div className="page-content">
      <div className="page-center-content">
        <WriteBitBox />
        <BitBox />
      </div>
      <div className="homePage-right-content">
        <p>bbb</p>
      </div>
    </div>
  </div>
);

export default Main;
