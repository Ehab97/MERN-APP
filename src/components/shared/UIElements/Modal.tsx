import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from  './Backdrop'
import './Modal.css';
import { usePortal } from '../../../app/hooks/usePortal';

interface OverLayProps{
  className?:string;
  headerClass?:string;
  style?: object;
  header?:string;
  footer?:string;
  onSubmit?:()=>void;
  contentClass?:string;
  footerClass?:string;
  children?:React.ReactNode;
  el?:string
}



const ModalOverlay:React.FC <OverLayProps> = ({
  className,
  headerClass,
  style,
  header,
  footer,
  onSubmit,
  contentClass,
  footerClass,
  children,
  el='div'
}) => {

  // const target=usePortal('modal-hook');
  const [container] = React.useState(document.createElement(el))
  container.setAttribute('id', 'drawer-hook')
  React.useEffect(() => {
    if ( className ) container.classList.add(className)
      document.body.appendChild(container)
      return () => {
          document.body.removeChild(container)
      }
  }, [])
  const content = (
    <div className={`modal ${className}`} style={style}>
      <header className={`modal__header ${headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form
        onSubmit={
          onSubmit ? onSubmit : event => event.preventDefault()
        }
      >
        <div className={`modal__content ${contentClass}`}>
          {children}
        </div>
        <footer className={`modal__footer ${footerClass}`}>
          {footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, container);
  // return ReactDOM.createPortal(content, target);
};

const Modal:React.FC = (props:any) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
