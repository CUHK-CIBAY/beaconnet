import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';

export const TrendSuggestionItem = () => (
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

export const RecentSuggestionItem = () => (
  <div className="recent-suggestion-list">
    <p className="recent-suggestion-item">GitHub</p>
    <div className="recent-suggestion-item-icon">
      <RxCross2 />
    </div>
  </div>
);

const TrendSuggestionSection = () => (
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
);

export default TrendSuggestionSection;
