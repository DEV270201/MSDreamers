import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from "../Icons/logo_gre.png";
import { UserContext } from '../context/UserContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const Navbar = () => {

  const { status,changeLoginStatus } = useContext(UserContext);
  let history = useHistory();
  
  const logout = async () => {
    try {
       console.log("button clicked...");
        let response = await axios.get("/users/logout");
        changeLoginStatus(false);
        if (response.data.status === 'success') {
            Swal.fire({
                icon: 'success',
                title: 'Yayy...',
                text: response.data.msg
            });
            history.push("/");
            return;
        }
    } catch (err) {
        console.log("logout err : ", err.stack);
    }
}

  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark mynavbar">
        <div className="container-fluid mycont">
          <div className="divider">
            <NavLink to="/">
              <img src={Logo} alt="" width="130" height="35" />
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
            <ul className="navbar-nav mb-2 mb-lg-0 myul ml-auto">
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
              {
                !status ?
                  <li className="nav-item dropdown nav_li_center">
                    <NavLink to="/login" data-toggle="collapse" data-target=".navbar-collapse.show" className="navText pb-1">Login</NavLink>
                    <span className="divider">|</span>
                    <NavLink to="/register" data-toggle="collapse" data-target=".navbar-collapse.show" className="navText pb-1">Register</NavLink>
                  </li>
                  :
                  <div className="dropdown mx-2">
                    <div className="dropdown-toggle d-flex align-items-center justify-content-center p-1" role="button" data-toggle="dropdown" aria-expanded="false">
                      <img className="img-fluid rounded" alt="Profile" style={{height:'20px',width:'20px'}} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
                    </div>
                    <div className="dropdown-menu">
                      <div className="drop_list">
                        <NavLink to="/profile" className="text-dark" style={{ textDecoration: 'none' }}>
                          <FontAwesomeIcon icon={faUser} />  Profile
                        </NavLink>
                      </div>  
                      <div className="drop_list text-dark" onClick={logout}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />  Logout
                      </div>
                    </div>
                  </div>
              }
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
