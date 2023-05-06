import React from 'react';
import './help.css';

const Help = () => {
  const clearAllField = () => {
    const title = document.querySelector('.help-main-report-content-title-input') as HTMLInputElement;
    const description = document.querySelector('.help-main-report-content-description-input') as HTMLInputElement;
    title.value = '';
    description.value = '';
  };

  return (
    <div className="page-content page-content-help">
      <div className="help-main-content-container">
        <div className="help-main-header">Help Center</div>
        <div className="help-main-description">
          <p>In the help center, you can report the problem you are dealing with.</p>
          <p>After reporting it, we will solve the problem within few day.</p>
        </div>
        <div className="help-main-report-header">Report Problem</div>
        <div className="help-main-report-content">
          <div className="help-main-report-content-header">
            <div className="help-main-report-content-title">
              <input type="text" className="help-main-report-content-title-input" placeholder="Title" />
            </div>
            <div
              className="help-main-report-content-button"
              onClick={clearAllField}
              role="button"
              tabIndex={0}
              onKeyDown={clearAllField}
            >
              <button type="submit" className="help-main-report-content-submit">
                Report
              </button>
            </div>
          </div>
          <div className="help-main-report-content-description">
            <textarea className="help-main-report-content-description-input" placeholder="Descrition" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
