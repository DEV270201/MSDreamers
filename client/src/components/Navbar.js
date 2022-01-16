import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from "../Icons/logo_gre.png";

const Navbar = () => {
    return(
        <header>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark mynavbar">
        <div className="container-fluid mycont">
          <div className="divider">
        <NavLink to="/">
          <img src={Logo} alt="" width="130" height="35"/>
        </NavLink>
            </div>
        <button className="navbar-toggler mr-3" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon">   
        <i className="bi bi-menu-button"></i>
</span>
  </button>
      </div>
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0 myul">
            <li className="nav-item nav_li_center">
              <NavLink to="/about" data-toggle="collapse" data-target=".navbar-collapse.show" className="navText pb-1">About</NavLink>
            </li>
            <li className="nav-item nav_li_center">
              <NavLink to="/forum" data-toggle="collapse" data-target=".navbar-collapse.show" className="navText pb-1">Forum</NavLink>
            </li>
            <li className="nav-item nav_li_center">
              <NavLink to="/about" data-toggle="collapse" data-target=".navbar-collapse.show" className="navText pb-1">Flashcards</NavLink>
            </li>
            <li className="nav-item nav_li_center">
              <NavLink to="/resources" data-toggle="collapse" data-target=".navbar-collapse.show" className="navText pb-1">Resources</NavLink>
            </li>
            <li className="nav-item dropdown nav_li_center">
              <NavLink to="/login" data-toggle="collapse" data-target=".navbar-collapse.show" className="navText pb-1">Login</NavLink>
            <span className="divider">|</span>
              <NavLink to="/register" data-toggle="collapse" data-target=".navbar-collapse.show" className="navText pb-1">Register</NavLink>
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
