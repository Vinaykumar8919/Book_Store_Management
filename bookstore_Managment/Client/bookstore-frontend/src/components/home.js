import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css"

const NavBar = () => {
  return (
    <div className=''>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
    </div>
  );
};

export default NavBar;
