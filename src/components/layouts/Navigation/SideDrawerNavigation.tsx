import React from 'react'
import * as ReactDOM from 'react-dom';
import {CSSTransition} from 'react-transition-group'

import  '../../../styles/header.scss';

interface DrawerProps{
    children?: React.ReactNode;
    className? : string
    el? : string
    show : boolean
    onClick? : ()=>void
}
  export const SideDrawerNavigation: React.FC<DrawerProps> = ({
    children,
    className='drawer-nav',
    el = 'div',
    show,
    onClick
  }): JSX.Element => {
    
    const [container] = React.useState(document.createElement(el))
    container.setAttribute('id', 'drawer-hook')
    React.useEffect(() => {
      if ( className ) container.classList.add(className)
        document.body.appendChild(container)
        return () => {
            document.body.removeChild(container)
        }
    }, [])
    let content = (
        <CSSTransition 
                in={show}
                timeout={200}
                classNames="my-node"
                mountOnEnter
                unmountOnExit>
          <aside className="side-drawer" onClick={onClick}>{children}</aside>
        </CSSTransition>
    );
    return ReactDOM.createPortal(content, container)
  };
  