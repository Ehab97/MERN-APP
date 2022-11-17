import React from 'react';

import './LoadingSpinner.css';

interface Props {
    asOverlay:boolean
}

const LoadingSpinner:React.FC<Props> =( {asOverlay} )=> {
  return (
    <div className={`${asOverlay && 'loading-spinner__overlay'}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default LoadingSpinner;
