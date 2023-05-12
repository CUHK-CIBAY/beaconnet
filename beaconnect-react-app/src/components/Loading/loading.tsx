import React from 'react';
import './loading.css';
import { TiTick } from 'react-icons/ti';

function Loading({
  fullScreen,
  text,
  boxWidth,
  done,
  showLoading,
  fade,
}: {
  fullScreen?: boolean;
  text?: string;
  boxWidth?: string;
  done?: boolean;
  showLoading?: boolean;
  fade?: boolean;
}) {
  if (showLoading || fade) {
    if (fullScreen) {
      return (
        <div
          className={`global-loading-screen ${done ? 'done' : ''} ${fade && !showLoading ? 'hidden' : ''}`}
          style={{
            animation: fade ? `${showLoading ? 'fadeInLoading' : 'fadeOutLoading'} 1s` : 'none',
          }}
        >
          {text && <p>{text}</p>}
        </div>
      );
    }
    return (
      <div
        className={`container-loading-screen ${done ? 'done' : ''} ${fade && !showLoading ? 'hidden' : ''}`}
        style={{
          animation: fade ? `${showLoading ? 'fadeInLoading' : 'fadeOutLoading'} 1s forwards` : 'none',
        }}
      >
        <div
          className="container-loading-screen-circle"
          style={{
            width: boxWidth,
            borderWidth: boxWidth === '50px' ? '5px' : `${parseInt(boxWidth?.match(/\d/g)?.join('')!, 10) / 10}px`,
          }}
        />
        {text && <p>{text}</p>}
        <div className="container-loading-screen-tick-icon-container">
          <TiTick className="container-loading-screen-tick-icon" />
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
  fade: false,
};

export default Loading;
