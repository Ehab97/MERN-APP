import React from "react";

import "./Avatar.css";

interface Props {
  image?: string;
  alt?: string;
  width?: string;
  className?: string;
  style?: object;
}

const Avatar: React.FC<Props> = ({ image, alt, className, style, width }) => {
  return (
    <div className={`avatar ${className}`} style={style}>
      <img src={image} alt={alt} style={{ width: width, height: width }} />
    </div>
  );
};

export default Avatar;
