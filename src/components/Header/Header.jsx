import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header__container">
        
        <div className="header__logo">
          <span className="logo-box">BS</span>
          <span className="logo-text">Bhuwan Suneja</span>
        </div>

        <nav className="header__nav">
          <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
          <NavLink to="/products" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Products</NavLink>
          <NavLink to="/installation" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Installation</NavLink>
          <NavLink to="/services" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Services</NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>About</NavLink>
          <NavLink to="/gallery" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Gallery</NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>Contact</NavLink>
        </nav>

        <div className="header__actions">
          <a href="tel:9999999999" className="call-btn">
            Call Now
          </a>
        </div>

      </div>
    </header>
  );
};

export default Header;