import React from 'react'
import { Link } from "react-router-dom";
import '../styles/Navbar.css'
import logo from '../assets/uforumitlogo.png';

import Auth from "../utils/auth";
function Navbar({placeholder, data}) {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className='mx-1'>
            <Link id='link' to="/createthread">
              +
            </Link>
          </li>
          <li className="mx-1">
            <Link id='link' to="/me">
              My Profile
            </Link>
          </li>
          <line className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a id='link' href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </line>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="signup">
            <Link id='link' to="/signup">
              Signup
            </Link>
          </li>
          <li className="signup">
            <Link id='link' to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <div className='navbar'>

        <div className='leftSide'>
            <Link to="/">
            <img src={logo} alt="logo" width="200px" heigth="100"/>
            </Link>
        </div>

        <div className='search'>
          <div className='searchInputs'>
            <input type='text' placeholder={placeholder}/>
            <div className='searchIcon'></div>
          </div>
          <div className='dataResults'></div>
        </div>
        <nav className='rightSide'>
            {showNavigation()}
        </nav>
    </div>
  )
}

export default Navbar
