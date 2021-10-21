import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

    return(
        <header>
        <nav class="navbar navbar-expand-lg navbar-dark mynavbar">
        <div class="container">
        <NavLink to="/">
          <img src="https://www.avanse.com/blog/wp-content/uploads/2014/08/5.jpg" alt="" width="30" height="24"/>
          MsDreamers
        </NavLink>
      </div>
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <NavLink to="/about">About</NavLink>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Forum</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Resources</a>
            </li>
            <li style={{color: '#ffffff'}}>|</li>
            <li class="nav-item dropdown">
              <button type="button" class="btn btn-secondary">Login</button>
            </li>
            <li class="nav-item dropdown">
              <button type="button" class="btn btn-secondary">Register</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </header>
    )
}

export default Navbar;