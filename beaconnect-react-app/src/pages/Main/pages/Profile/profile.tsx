import React from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { GrFormPreviousLink } from 'react-icons/gr';
import { BsThreeDots } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';

const Profile = () => (
  <div className="page-content">
    <div className="page-center-content">
      <div className="trend-search-header">
        <GrFormPreviousLink />
        <h2>Search</h2>
      </div>
      <div className="trend-search-bar-icon">
        <BiSearchAlt />
      </div>
      <input type="text" placeholder="search" />
      <div className="trend-suggestion-section">
        <h2>Trends for you</h2>
        <div className="trend-suggestion-list">
          <div className="trend-suggestion-list-number">
            <p className="trend-suggestion-item">1</p>
          </div>
          <div className="trend-suggestion-list-item">
            <p className="trend-suggestion-item">GitHub</p>
            <p className="trend-suggestion-item-no-of-bits">140000 bits</p>
          </div>
          <div className="trend-suggestion-list-more">
            <BsThreeDots />
          </div>
        </div>
        <div className="recent-suggestion-section">
          <h2>Recent</h2>
          <div className="recent-suggestion-list">
            <p className="trend-suggestion-item-no-of-bits">GitHub</p>
            <div className="recent-suggestion-item-cross">
              <RxCross2 />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="page-right-content">
      <div className="advance-search-section">
        <h2>Advance Search</h2>
        <div className="advance-search-date">
          <h3>Date</h3>
          <div className="advance-search-date-from">
            <p>from</p>
            <select name="date" id="day">
              <option value="day">Day</option>
            </select>
            <select name="date" id="month">
              <option value="month">Month</option>
            </select>
            <select name="date" id="year">
              <option value="year">Year</option>
            </select>
          </div>
          <div className="advance-search-date-to">
            <p>to</p>
            <select name="date" id="day">
              <option value="day">Day</option>
            </select>
            <select name="date" id="month">
              <option value="month">Month</option>
            </select>
            <select name="date" id="year">
              <option value="year">Year</option>
            </select>
          </div>
        </div>
        <div className="advance-search-location">
          <h3>Location</h3>
          <input type="radio" id="location-same" name="location" value="same" />
          <p>same</p>
          <input type="radio" id="location-anywhere" name="location" value="anywere" />
          <p>anywhere</p>
        </div>
        <div className="advance-search-content-with">
          <h3>Content with</h3>
          <input type="radio" id="content-with-photo" name="content-with" value="photo" />
          <p>photo</p>
          <input type="radio" id="content-with-video" name="content-with" value="video" />
          <p>video</p>
        </div>
        <div className="advance-search-language">
          <h3>Language</h3>
          <select name="language" id="language">
            <option value="all">Language</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);

export default Profile;
