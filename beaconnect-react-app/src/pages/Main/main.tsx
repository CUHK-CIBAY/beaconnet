/* eslint-disable no-unused-vars */
import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiComment, BiSearchAlt } from 'react-icons/bi';
import { BsSoundwave, BsImage } from 'react-icons/bs';
import { FiVideo } from 'react-icons/fi';
import { TbSend } from 'react-icons/tb';
import NavBar from './components/NavBar/navBar';
import './components/main.css';
import './pages/Home/components/home.css';

import { WriteBitBox, BitBox } from './components/Bits/bits';
import seasonalEvent from './pages/Home/components/seasonalpic.jpg';

const Main = () => (
  <div className="homePage">
    <NavBar />
    <div className="page-content">
      <div className="page-center-content">
        <WriteBitBox />
        <BitBox isRepost haveCaption />
        <BitBox isRepost />
        <BitBox isRepost />
        <BitBox isRepost />
        <BitBox isRepost />
        <BitBox isRepost />
      </div>
      <div className="page-right-content">
        <img className="profile-background-picture" src={seasonalEvent} alt="profile" />
        <div className="trend-searching-container">
          <div className="trend-search-bar">
            <div className="trend-search-bar-icon">
              <BiSearchAlt />
            </div>
            <input type="text" placeholder="search" />
          </div>
          <div className="trend-suggestion-section">
            <h2>Trends for you</h2>
            <div className="trend-suggestion-list">
              <p className="trend-suggestion-item">GitHub</p>
              <p className="trend-suggestion-item-size">2.5M Bit</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Main;
