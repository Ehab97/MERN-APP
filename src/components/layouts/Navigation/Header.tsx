

import  '../../../styles/header.scss';

interface HeaderProps {
  children: React.ReactNode;
}

const Header:React.FC<HeaderProps> =({children}) =>{
  return (
    <header className="main-header">
      {children}
    </header>
  )
}

export default Header
/*
    <nav>
        <ul className='flex justify-center items-center'>
          <li className='mx-2'><NavLink className={(navData)=>navData.isActive?'active':''} to="/">users</NavLink></li>
          <li className='mx-2'><NavLink className={(navData)=>navData.isActive?'active':''} to="/places/new">places</NavLink></li>
        </ul>
    </nav>
*/