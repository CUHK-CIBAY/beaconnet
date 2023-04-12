import React from 'react';
import TrendSuggestionShort from '../Suggestion/trendsuggestion_short';
import seasonalEvent from '../../pages/Home/components/seasonalpic.jpg';

const SearchResultLatestRight = () => (
  <div className="search-result-right">
    <img className="profile-background-picture" src={seasonalEvent} alt="profile" />
    <div className="trend-searching-container">
      <div className="trend-suggestion-section">
        <h2>Trends for you</h2>
        <TrendSuggestionShort />
        <TrendSuggestionShort />
        <TrendSuggestionShort />
        <TrendSuggestionShort />
        <TrendSuggestionShort />
      </div>
    </div>
  </div>
);
export default SearchResultLatestRight;
