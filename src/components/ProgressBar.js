import React from 'react';

function ProgressBar({ progress }) {
  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${Math.min(progress, 100)}%` }}>
        {Math.round(progress)}%
      </div>
    </div>
  );
}

export default ProgressBar;