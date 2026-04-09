import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="logo-box">BS</span>
            <span className="logo-text">Bhuwan Suneja</span>
          </div>
          <p className="footer__desc">
            Setting the gold standard in modern surveillance and security infrastructure. Precision, safety, and reliability in every frame.
          </p>
        </div>
        
        <div className="footer__links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/installation">Installation</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>

        <div className="footer__links">
          <h4>Customer Care</h4>
          <ul>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>

        <div className="footer__contact">
          <h4>Stay Connected</h4>
          <p>Email: security@bhuwansuneja.com</p>
          <p>Phone: +91 99999 99999</p>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} Bhuwan Suneja CCTV. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
