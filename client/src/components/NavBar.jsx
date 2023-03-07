import React from 'react'

const NavBar = () => {
  return (
    <div>
        <div class="ui pointing menu">
        <a class="item">
            Home
        </a>
        <a class="item">
            Threads
        </a>
        <a class="item">
            Profile
        </a>
        <div class="right menu">
            <div class="item">
                <div class="ui transparent icon input">
                    <input type="text" placeholder="Search..."/>
                    <i class="search link icon"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui segment">
            <p></p>
        </div>
    </div>
  )
}

export default NavBar