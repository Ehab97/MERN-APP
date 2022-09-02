import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

type ButtonType='submit'|'button'|'reset'|undefined;

interface ButtonProps{
  href?:string;
  to?:string;
  inverse?:boolean;
  size?:string;
  children?:React.ReactNode;
  danger?:boolean;
  type?:ButtonType;
  disabled?:boolean;
  onClick?:()=>void
}

const Button:React.FC<ButtonProps>  = ({
  href,
  to,
  inverse,
  size,
  children,
  danger,
  type,
  disabled,
  onClick
}) => {
  if (href) {
    return (
      <a
        className={`button button--${size || 'default'} 
                    ${inverse &&'button--inverse'} 
                    ${danger && 'button--danger'}`}
        href={href}
      >
        {children}
      </a>
    );
  }
  if (to) {
    return (
      <Link
        to={to}
        // exact={exact}
        className={`button button--${size || 'default'} ${inverse &&
          'button--inverse'} ${danger && 'button--danger'}`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`button button--${size || 'default'} ${inverse &&
        'button--inverse'} ${danger && 'button--danger'}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
