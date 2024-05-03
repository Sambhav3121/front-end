import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css'; 

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Delivery.intern</div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/menu">Menu</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cart">Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/order">Order</Link>
        </li>
      </ul>
      <div className="btn-group">
        <Link className="btn" to="/register">Register</Link>
        <Link className="btn" to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;