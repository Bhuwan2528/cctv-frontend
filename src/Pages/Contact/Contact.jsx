import React, { useState, useEffect, useRef } from 'react';
import './Contact.css';

// SVG Icons
const Icons = {
  Location: () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  Mail: () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  PhoneLg: () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Clock: () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Send: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Pin: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  Phone: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  WhatsApp: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
};

const Contact = () => {
  const containerRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Convert submission to WhatsApp Redirect
  const handleWhatsAppRedirect = (e) => {
    e.preventDefault();
    
    // Format message string
    const text = `Hello! I would like to make an inquiry.%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Requirements:* ${formData.message}`;
    
    // Target base number (example)
    const waNumber = '918708455707';
    const waURL = `https://wa.me/${waNumber}?text=${text}`;
    
    // Redirect
    window.open(waURL, '_blank');
  };

  // Setup animations on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="contact-page" ref={containerRef}>
      
      {/* 1. Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-overlay"></div>
        <div className="contact-hero-content animate-fade-in">
          <h1 className="contact-hero-title">Get In Touch</h1>
          <p className="contact-hero-subtitle">
            We’re here to help you architect and secure your space immediately.
          </p>
        </div>
      </section>

      {/* 2. Contact Info Grid */}
      <section className="contact-info-section">
        <div className="info-cards-grid">
          <div className="info-card animate-on-scroll">
            <div className="info-icon"><Icons.PhoneLg /></div>
            <h4>Phone Support</h4>
            <p>+91 99999 99999</p>
            <p>+91 88888 88888</p>
          </div>
          
          <div className="info-card animate-on-scroll" style={{ transitionDelay: '0.1s' }}>
            <div className="info-icon"><Icons.Mail /></div>
            <h4>Email Inquiry</h4>
            <p>sales@bhuwansunejacctv.com</p>
            <p>support@bhuwansunejacctv.com</p>
          </div>
          
          <div className="info-card animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
            <div className="info-icon"><Icons.Location /></div>
            <h4>Headquarters</h4>
            <p>123 Security Avenue,</p>
            <p>Tech Park, New Delhi, India</p>
          </div>
          
          <div className="info-card animate-on-scroll" style={{ transitionDelay: '0.3s' }}>
            <div className="info-icon"><Icons.Clock /></div>
            <h4>Working Hours</h4>
            <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
            <p>24/7 Priority Remote Support</p>
          </div>
        </div>
      </section>

      {/* 3 & 4. Split Form and Map Image Section */}
      <section className="contact-form-section">
        <div className="section-header-modern animate-on-scroll">
          <h2>Send Us A Message</h2>
          <p>Fill out your requirements below and our team will get back to you instantly via WhatsApp or Call.</p>
        </div>

        <div className="form-split-wrapper animate-on-scroll">
          
          {/* Left Form */}
          <div className="form-left">
            <h3>Contact Form</h3>
            <form onSubmit={handleWhatsAppRedirect} className="contact-form">
              
              <div className="input-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="contact-input" 
                  placeholder="John Doe" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  className="contact-input" 
                  placeholder="+91 00000 00000" 
                  required 
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="message">Your Requirements</label>
                <textarea 
                  id="message" 
                  name="message" 
                  className="contact-textarea" 
                  placeholder="Tell us about the property you need to secure..." 
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="form-submit-btn">
                Send to WhatsApp <Icons.Send />
              </button>

            </form>
          </div>

          {/* Right Image/Map Base */}
          <div className="form-right">
            {/* Visual aesthetic map placeholder using Unsplash city map photo overhead */}
            <img src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1400" alt="Corporate Map Location View" loading="lazy" />
            
            {/* Overlay interactive styled badging overlay */}
            <div className="map-badge">
              <h4><Icons.Pin /> Prime Service Location</h4>
              <p>We deploy directly from our central routing hub, servicing all local and extended enterprise districts.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Final Bottom CTA */}
      <section className="contact-cta">
        <div className="contact-cta-wrapper animate-on-scroll">
          <div className="contact-cta-overlay"></div>
          <div className="contact-cta-content">
            <div className="cta-left">
              <h2>Ready to Secure Your Property?</h2>
              <p>Get a completely free, zero-obligation floorpan architecture assessment directly from our top engineers today.</p>
            </div>
            <div className="cta-right">
              <a href="tel:8708455707" className="ct-btn ct-call-btn">
                <Icons.Phone /> Call Now
              </a>
              <a href="https://wa.me/918708455707?text=Hello%20I%20want%20CCTV%20consultation" target="_blank" rel="noopener noreferrer" className="ct-btn ct-wa-btn">
                <Icons.WhatsApp /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
