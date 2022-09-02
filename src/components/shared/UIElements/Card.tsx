import React from 'react';

import './Card.css';

interface Props{
  className?: string;
  style?: object;
  children: React.ReactNode;

}

const Card:React.FC <Props> = ({children,className,style}) => {
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Card;
