import React, { useState } from 'react';
import './help.css';

function Help() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const encodeSpecialCharacters = (str: string) =>
    str.replace(/(&#(\d+);)/g, (match, capture, charCode) => String.fromCharCode(charCode));

  const sendMessage = () => {
    if (!title || !description) {
      alert('Please fill in the title and description.');
      return;
    }
    window.location.href = `mailto:admin@beaconnet.online?subject=${encodeSpecialCharacters(
      title,
    )}&body=${encodeSpecialCharacters(description)}`;
    setTitle('');
    setDescription('');
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
              <input
                type="text"
                className="help-main-report-content-title-input"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div
              className="help-main-report-content-button"
              onClick={sendMessage}
              role="button"
              tabIndex={0}
              onKeyDown={sendMessage}
            >
              <button type="submit" className="help-main-report-content-submit">
                Report
              </button>
            </div>
          </div>
          <div className="help-main-report-content-description">
            <textarea
              className="help-main-report-content-description-input"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
