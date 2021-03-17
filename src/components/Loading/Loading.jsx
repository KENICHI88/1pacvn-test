import React from 'react';
import './Loading.style.scss';

const Loading = ({isShow = false}) => {
  return isShow ? (
    <div className="loading-container">
      <button className="btn btn-primary" type="button" disabled>
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...
      </button>
    </div>
  ) : null;
}

export default Loading;
