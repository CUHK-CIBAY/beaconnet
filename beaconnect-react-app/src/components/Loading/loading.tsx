import React from 'react';
import './loading.css';
import { TiTick } from 'react-icons/ti';

function Loading({
  fullScreen,
  text,
  boxWidth,
  done,
  showLoading,
}: {
  fullScreen?: boolean;
  text?: string;
  boxWidth?: string;
  done?: boolean;
  showLoading?: boolean;
}) {
  if (showLoading) {
    if (fullScreen) {
      return (
        <div className="global-loading-screen">
          <p>Loading</p>
        </div>
      );
    }
    return (
      <div className={`create-profile-loading ${done ? 'done' : ''}`}>
        <div
          className="create-profile-loading-circle"
          style={{
            width: boxWidth,
            borderWidth: boxWidth === '50px' ? '5px' : `${parseInt(boxWidth?.match(/\d/g)?.join('')!, 10) / 10}px`,
          }}
        />
        {text && <p>{text}</p>}
        <div className="create-profile-loading-tick-icon-container">
          <TiTick className="create-profile-loading-tick-icon" />
        </div>
      </div>
    );
  }
  return <div />;
}

Loading.defaultProps = {
  fullScreen: false,
  text: '',
  boxWidth: '50px',
  done: false,
  showLoading: true,
};

export default Loading;
