import React from 'react'

import { NavLink } from 'react-router-dom';
import  '../../../styles/header.scss';


export const NavLinkItem:React.FC = () => {
  return (
   <ul className="nav-links">
    <li>
    <NavLink className={(navData)=>navData.isActive?'active':''} to="/">users</NavLink>
    </li>
    <li>
    <NavLink className={(navData)=>navData.isActive?'active':''} to="/u1/places">my places</NavLink>
    </li>
    <li>
    <NavLink className={(navData)=>navData.isActive?'active':''} to="/places/new">add place</NavLink>
    </li>
    <li>
    <NavLink className={(navData)=>navData.isActive?'active':''} to="/auth"> Authentication</NavLink>
    </li>
  
   </ul>
  )
}
