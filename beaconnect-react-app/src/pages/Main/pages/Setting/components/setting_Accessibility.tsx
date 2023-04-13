import React from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';

const SettingAccessibility = () => (
  <div className="setting-accessibility-container">
    <div className="setting-accessibility-header">
      Accessibility
    </div>
    <div className="accessibility-font-size">
      <div>
        <p className="accessibility-font-size-header">
          Font Size
        </p>
        <div className="accessibility-font-size-content">
          Choose the font size for your perferencees
        </div>
      </div>
      <div className="accessibility-font-size-arrow">
        <RiArrowRightSLine />
      </div>
    </div>
    <div className="accessibility-color">
      <div>
        <p className="accessibility-color-header">
          Color
        </p>
        <div className="accessibility-color-content">
          Select the mode and color for your perferences
        </div>
      </div>
      <div className="accessibility-color-arrow">
        <RiArrowRightSLine />
      </div>
    </div>
  </div>
);

export default SettingAccessibility;
