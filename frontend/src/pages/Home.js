import React from 'react';
import '../styles.css';
import heroBanner from '../assets/hero-banner.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext'; 

const Home = () => {
  const { user } = useAuth(); 

  return (
    <div className="home-hero-container">
      <img src={heroBanner} alt="QuantumGears Hero" className="hero-image" />

      <div className="hero-overlay">
        <h1 className="hero-title">Welcome to QuantumGears</h1>
        <p className="hero-subtitle">Elevate your tech experience with next-gen gadgets</p>
        <div className="hero-buttons">
          <Link to="/products" className="btn-primary">Shop Now</Link>

          {user ? (
            <Link to="/dashboard" className="btn-secondary">Go to Dashboard</Link>
          ) : (
            <Link to="/login" className="btn-secondary">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
