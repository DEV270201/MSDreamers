import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return(
        <header>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark mynavbar">
        <div className="container-fluid mycont">
          <div className="divider">
        <NavLink to="/">
          <img src="https://www.avanse.com/blog/wp-content/uploads/2014/08/5.jpg" alt="" width="30" height="24"/>
        </NavLink>
            <span style={{marginLeft:'30px'}}>MsDreamers</span>
            </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon">   
        <i class="bi bi-menu-button"></i>
</span>
  </button>
      </div>
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0 myul">
            <li className="nav-item nav_li_center">
              <NavLink to="/about" className="navText">About</NavLink>
            </li>
            <li className="nav-item nav_li_center">
              <NavLink to="/forum" className="navText">Forum</NavLink>
            </li>
            <li className="nav-item nav_li_center">
              <NavLink to="/resources" className="navText">Resources</NavLink>
            </li>
            <li className="nav-item dropdown nav_li_center">
              <NavLink to="/login" className="navText">Login</NavLink>
            <span className="divider">|</span>
              <NavLink to="/register" className="navText">Register</NavLink>
            </li>
            {/* <li className="nav-item dropdown">
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
    </header>
    );
}

export default Navbar;
