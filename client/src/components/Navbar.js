import React from 'react'
import { Link } from "react-router-dom";
import '../styles/Navbar.css'
import logo from '../assets/uforumitlogo.png';

function Navbar({placeholder, data}) {
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

        <div className='rightSide'>
            <Link to='/signup'>Sign-up</Link>
            <Link to='/login'>Login</Link>
        </div>

      
    </div>
  )
}

export default Navbar
