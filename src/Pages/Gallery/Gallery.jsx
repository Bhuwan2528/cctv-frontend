import React, { useState, useEffect, useRef } from 'react';
import GalleryGrid from '../../components/GalleryGrid/GalleryGrid';
import './Gallery.css';

// Component Icons
const Icons = {
  Eye: () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Close: () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Phone: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  WhatsApp: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
};

// Gallery Data Base
const galleryData = [
  { id: 1, title: 'Commercial Perimeter Setup', category: 'Outdoor', size: 'size-large', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200' },
  { id: 2, title: 'Server Room Wiring', category: 'Installation', size: 'size-tall', image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Central Monitoring Hub', category: 'Monitoring', size: 'size-square', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Retail Tech Layout', category: 'Indoor', size: 'size-square', image: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&q=80&w=800' },
  { id: 5, title: 'NVR Panel Expansion', category: 'Installation', size: 'size-wide', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1600' },
  { id: 6, title: 'Hardware Diagnostics', category: 'Installation', size: 'size-square', image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=800' },
  { id: 7, title: 'Residential Wall Mount', category: 'Outdoor', size: 'size-tall', image: 'https://images.unsplash.com/photo-1541888002621-0260464f15d2?auto=format&fit=crop&q=80&w=800' },
  { id: 8, title: 'Tool Calibration', category: 'Installation', size: 'size-square', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800' }
];

const filters = ['All', 'Installation', 'Indoor', 'Outdoor', 'Monitoring'];

const Gallery = () => {
  const containerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredData, setFilteredData] = useState(galleryData);

  // Intersection Observer for scroll animations
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

  // Filter effect
  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredData(galleryData);
    } else {
      setFilteredData(galleryData.filter(item => item.category === activeFilter));
    }
  }, [activeFilter]);

  return (
    <div className="gallery-page" ref={containerRef}>
      
      {/* 1. Hero Section */}
      <section className="gallery-hero">
        <div className="gallery-hero-overlay"></div>
        <div className="gallery-hero-content animate-fade-in">
          <h1 className="gallery-hero-title">Our Work Gallery</h1>
          <p className="gallery-hero-subtitle">
            Explore our precision-engineered CCTV installations and highly advanced monitoring setups.
          </p>
        </div>
      </section>

      {/* 2 & 3. Main Gallery and Filters */}
      <section className="gallery-section-main">
        <div className="gallery-wrapper">
          
          {/* Filters */}
          <div className="gallery-filters animate-on-scroll">
            {filters.map(filter => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <GalleryGrid images={filteredData} />
        </div>
      </section>

      {/* 4. Contact / CTA Bottom */}
      <section className="gallery-cta">
        <div className="gallery-cta-wrapper animate-on-scroll">
          <div className="gallery-cta-overlay"></div>
          <div className="gallery-cta-content">
            <div className="cta-left">
              <h2>Want a Setup Like This?</h2>
              <p>Achieve unparalleled surveillance and peace of mind. Get in touch with our security engineers today for a tailored installation blueprint.</p>
            </div>
            <div className="cta-right">
              <a href="tel:9999999999" className="gal-btn gal-call-btn">
                <Icons.Phone /> Call Now
              </a>
              <a href="https://wa.me/919999999999?text=Hello%20I%20want%20CCTV%20installation" target="_blank" rel="noopener noreferrer" className="gal-btn gal-wa-btn">
                <Icons.WhatsApp /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Gallery;
