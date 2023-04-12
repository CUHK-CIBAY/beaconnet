/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';

const AdvancedSearch = () => (
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
);

export default AdvancedSearch;
