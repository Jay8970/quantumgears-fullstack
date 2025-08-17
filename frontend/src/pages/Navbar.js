import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Navbar = () => (
  <div className="navbar">
    <div className="logo">QuantumGears</div>
    <div>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/products">Products</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/checkout">Checkout</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/admin">Admin</Link>
       <Link to="/logout">Log out</Link>
    </div>
  </div>
);

export default Navbar;
