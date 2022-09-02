import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header';
import { NavLinkItem } from './NavLinkItem';
import { SideDrawerNavigation } from './SideDrawerNavigation';
import  '../../../styles/header.scss';
import Backdrop from '../../shared/UIElements/Backdrop';


const MainNavigation:React.FC =() =>{
    const [isDrawerOpened,setIsDrawerOpened]=React.useState(false)
     
    const openDrawer=()=>{
        setIsDrawerOpened(true)
    }
    const closeDrawer=()=>{
        setIsDrawerOpened(false)
    }
  return (
    <>
    {isDrawerOpened &&<Backdrop onClick={closeDrawer}/>}
    {isDrawerOpened &&
    (<SideDrawerNavigation show={isDrawerOpened} onClick={closeDrawer}>
        <nav className='main-navigation__drawer-nav'>
            <NavLinkItem/>
        </nav>
    </SideDrawerNavigation>
    )}
    <Header>
        <button className='main-navigation__menu-btn'
            onClick={openDrawer}
        >
            <span />
            <span/>
            <span/>
        </button>
        <h1 className='main-navigation__title'>
          <NavLink to={`/`}>
          your places
            </NavLink>   
        </h1>
        <nav className='main-navigation__header-nav'>
            <NavLinkItem/>
         </nav>   
     </Header>   
    </>
  )
}

export default MainNavigation