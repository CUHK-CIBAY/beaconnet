/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlineLeft } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';

const TrendSuggestionItem = () => (
  <div className="trend-suggestion-list">
    <div className="trend-suggestion-list-number">
      <p>1</p>
    </div>
    <div className="trend-suggestion-list-item">
      <div className="trend-suggestion-text">
        <p className="trend-suggestion-item">GitHub</p>
        <p className="trend-suggestion-item-no-of-bits">140000 bits</p>
      </div>
    </div>
    <div className="trend-suggestion-list-icon">
      <BsThreeDots />
    </div>
  </div>
);

const RecentSuggestionItem = () => (
  <div className="recent-suggestion-list">
    <p className="recent-suggestion-item">GitHub</p>
    <div className="recent-suggestion-item-icon">
      <RxCross2 />
    </div>
  </div>
);

const Search = () => (
  <div className="page-content">
    <div className="page-center-content">
      <div className="trend-searching-container">
        <div className="trend-search-header">
          <div className="trend-search-header-icon">
            <AiOutlineLeft />
          </div>
          <div className="trend-search-header-text">
            <h2>Search</h2>
          </div>
        </div>
        <div className="trend-search-bar">
          <div className="trend-search-bar-icon">
            <BiSearchAlt />
          </div>
          <input className="trend-search-input" type="text" placeholder="search" />
        </div>
        <div className="recent-and-trend-suggestion-section">
          <div className="trend-suggestion-section">
            <h2>Trends for you</h2>
            <TrendSuggestionItem />
            <TrendSuggestionItem />
            <TrendSuggestionItem />
            <TrendSuggestionItem />
            <TrendSuggestionItem />
            <TrendSuggestionItem />
            <TrendSuggestionItem />
            <TrendSuggestionItem />
            <div className="recent-suggestion-section">
              <h2>Recent</h2>
              <RecentSuggestionItem />
              <RecentSuggestionItem />
              <RecentSuggestionItem />
              <RecentSuggestionItem />
              <RecentSuggestionItem />
              <RecentSuggestionItem />
              <RecentSuggestionItem />
              <RecentSuggestionItem />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="page-right-content">
      <div className="advance-searching-container">
        <div className="advance-search-header">
          <h2>Advance Search</h2>
        </div>
        <div className="advance-search-section">
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
            <div className="advance-search-location-same">
              <input type="radio" id="location-same" name="location" value="same" />
              <label htmlFor="location-same" className="location-same">
                same
              </label>
            </div>
            <div className="advance-search-location-anywhere">
              <input type="radio" id="location-anywhere" name="location" value="anywere" />
              <label htmlFor="location-anywhere" className="location-anywhere">
                anywhere
              </label>
            </div>
          </div>
          <div className="advance-search-content-with">
            <h3>Content with</h3>
            <div className="advance-search-content-photo">
              <input type="radio" id="content-with-photo" name="content-with" value="photo" />
              <label htmlFor="content-with-photo" className="content-with-photo">
                photo
              </label>
            </div>
            <div className="advance-search-content-video">
              <input type="radio" id="content-with-video" name="content-with" value="video" />
              <label htmlFor="content-with-video" className="content-with-video">
                video
              </label>
            </div>
          </div>
          <div className="advance-search-language">
            <h3>Language</h3>
            <select name="language" id="language">
              <option value="all">Language</option>
            </select>
          </div>
        </div>
        <div className="advance-search-submit">
          <input type="submit" value="Search" className="advance-search-submit-button" />
        </div>
      </div>
    </div>
  </div>
);

export default Search;
