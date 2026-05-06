import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import GalleryGrid from '../../components/GalleryGrid/GalleryGrid';
import CTASection from '../../components/CTASection/CTASection';
import Testimonials from '../../components/Testimonials/Testimonials';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import './Home.css';
import { FiShield, FiTool, FiEye, FiZap, FiList, FiUsers, FiPhone, FiPlay } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const whyChooseUsData = [
  { icon: <FiShield size={36} />, title: "Bank-Grade Security", desc: "Encrypted feeds protecting against external breaches and physical wire cuts." },
  { icon: <FiTool size={36} />, title: "Precision Install", desc: "Clean, zero-trace wiring done by heavily vetted, certified field agents." },
  { icon: <FiEye size={36} />, title: "Total Site Audits", desc: "Acoustic and spatial mapping to completely eliminate blindspots." },
  { icon: <FiZap size={36} />, title: "Instant Response", desc: "Our 24/7 technical hotline roots operators directly to your system." },
  { icon: <FiList size={36} />, title: "Annual Compliance", desc: "Scheduled lens calibrations and firmware overhauls included." },
  { icon: <FiUsers size={36} />, title: "Trusted Partners", desc: "Servicing over 500+ residential sanctuaries and massive retail entities." }
];

// Phone params
const phoneParams = { number: "8708455707", waNumber: "918708455707", waText: "Hello I want to enquire about CCTV." };

const Home = () => {
  const containerRef = useRef(null);

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
    <div className="home-page" ref={containerRef}>

      {/* 1. Hero Section */}
      <section className="hero-modern">
        <div className="hero-container">

          <div className="hero-badge">
            Advanced CCTV Security
          </div>

          <h1 className="hero-heading">
            Next-Gen Surveillance for <br />
            <span className="hero-highlight">Smart Protection</span>
          </h1>

          <p className="hero-text">
            AI-powered CCTV systems with crystal-clear monitoring, real-time alerts,
            and secure cloud storage for complete peace of mind.
          </p>

          <div className="hero-buttons">
            <Link to="/products" className="btn-main">
              Explore Products
            </Link>

            <a
              href={`https://wa.me/${phoneParams.waNumber}?text=Need%20CCTV%20Setup`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass"
            >
              Get Quote
            </a>
          </div>

        </div>

        {/* Floating Stats */}
        <div className="hero-stats-modern">
          <div className="stat-box">
            <h3>500+</h3>
            <p>Installations</p>
          </div>
          <div className="stat-box">
            <h3>4.9★</h3>
            <p>Rating</p>
          </div>
          <div className="stat-box">
            <h3>24/7</h3>
            <p>Support</p>
          </div>
        </div>
      </section>

      {/* 2. Products Section (Compact UI) */}
      <section className="sec-padding hp-products">
        <div className="sec-header animate-on-scroll">
          <h2>Premium Hardware Catalog</h2>
          <p>
            We source only the most rigorously tested lenses and sensors, mapping perfectly
            to residential perimeters and expansive industrial complexes alike.
          </p>
        </div>

        {/* ✅ Loading / Error Handling handled in component */}
        <ProductGrid
          variant="compact"
        />

        <div className="hp-view-all-wrapper animate-on-scroll">
          <Link to="/products" className="hp-view-all-btn">
            View All Products →
          </Link>
        </div>
      </section>

      {/* 3. Advanced Installation Gallery */}
      <section className="sec-padding">
        <div className="sec-header animate-on-scroll">
          <h2>Installation Excellence</h2>
          <p>See our real CCTV installations across different locations.</p>
        </div>

        <GalleryGrid />
      </section>


      {/* 4. Why Choose Us */}
      <section className="sec-padding hp-why">
        <div className="sec-header animate-on-scroll">
          <h2>Why Choose A Square Hub</h2>
          <p>Don't gamble on security. Work with veterans entirely dedicated to building impenetrable private infrastructures.</p>
        </div>
        <div className="hp-why-grid">
          {whyChooseUsData.map((item, idx) => (
            <div key={idx} className="hp-why-card animate-on-scroll" style={{ transitionDelay: `${(idx % 3) * 0.1}s` }}>
              <div className="hw-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Infinite Scroll Testimonials */}
      <Testimonials />

      {/* 4. CTA Bottom Section */}
      <CTASection
        variant="install"
        title="Book Your Installation Today"
        description="Secure your premises instantly. Connect with our technical directors for customized mapping and same-week installation schedules."
        waMessage="Hello I want installation"
      />

    </div>
  );
};

export default Home;
