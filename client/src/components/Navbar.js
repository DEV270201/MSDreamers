import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

    return(
        <header>
        <nav className="navbar navbar-expand-lg navbar-dark mynavbar">
        <div className="container mycont">
        <NavLink className="navText" to="/">
          <img src="https://www.avanse.com/blog/wp-content/uploads/2014/08/5.jpg" alt="" width="30" height="24"/>
            <span style={{marginLeft: '30px'}}>MsDreamers</span>
        </NavLink>
      </div>
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/about" className="navText">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/forum" className="navText">Forum</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/resources" className="navText">Resources</NavLink>
            </li>
            <span className="navText">|</span>
            <li className="nav-item dropdown">
              <NavLink to="/login" className="navText">Login</NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink to="/register" className="navText">Register</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </header>
    );
}

export default Navbar;