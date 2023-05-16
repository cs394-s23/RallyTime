import React from 'react';
import './Navbar.css';
// import bunny from './bunnylogo.jpg';


function Navbar() {
  return (
    <nav className='sticky'>
      {/* <div className="nav-logo"> */}
        
        {/* <a href="/home"><img src={bunny} alt='HomeHop Logo' height='60' /></a> */}

      {/* </div> */}
      {/* <p className='title'>RallyTime</p> */}
      <a href="/dashboard" className='title'>RallyTime</a>
        <ul>
            <li><a href="/dashboard"><strong>Dashboard</strong></a></li>
            <li><a href="/AddClub">Add Club</a></li>
      </ul>
    </nav>
  
  );
}

export default Navbar;