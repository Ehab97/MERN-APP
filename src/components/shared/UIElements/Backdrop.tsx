import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

interface Props{
  onClick:()=>void;
}

const Backdrop:React.FC <Props> = ({onClick}) => {
  const [container] = React.useState(document.createElement('div'));
  container.setAttribute('id', 'backdrop-hook')
  
  React.useEffect(() => {
      document.body.appendChild(container)
      return () => {
          document.body.removeChild(container)
      }
  }, [])
  const Button=<div className="backdrop" onClick={onClick}></div>;
  return ReactDOM.createPortal(Button,container);
};

export default Backdrop;
