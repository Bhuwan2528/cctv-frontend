import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header__container">

        <div className="header__logo">
          <span className="logo-box">BS</span>
          <span className="logo-text">Bhuwan Suneja</span>
        </div>

        <div className="header__desktop-right">
          <nav className="header__nav">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/products" className="nav-link">Products</NavLink>
            <NavLink to="/installation" className="nav-link">Installation</NavLink>
            <NavLink to="/services" className="nav-link">Services</NavLink>
            <NavLink to="/about" className="nav-link">About</NavLink>
            <NavLink to="/gallery" className="nav-link">Gallery</NavLink>
            <NavLink to="/contact" className="nav-link">Contact</NavLink>
          </nav>
          
          <a href="tel:9999999999" className="header__call-btn">
            Call Now
          </a>
        </div>
      </div>



        {/* BUTTON */}
        <button 
          className={`menu-toggle ${menuOpen ? 'open' : ''}`} 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
        </button>

      {/* BACKGROUND CIRCLE */}
      <div className={`menu-bg ${menuOpen ? 'active' : ''}`}></div>

      {/* MOBILE MENU */}
      <nav className={`mobile-nav ${menuOpen ? 'active' : ''}`}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/installation">Installation</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/gallery">Gallery</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </header>
  );
};

export default Header;