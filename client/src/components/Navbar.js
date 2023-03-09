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
            <Link to="/createthread">
              +
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/profile">
              My Profile
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
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
