import React, { useEffect, useRef } from 'react';
import './Products.css';

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
);

const CheckIcon = () => (
  <svg className="feature-check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);

const CameraPlaceholderIcon = () => (
  <svg className="product-icon-fallback" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
);

const productsData = [
  {
    id: 1,
    name: "Lumina Dome V2 Ultra",
    description: "Premium indoor/outdoor low-profile dome camera with advanced recording logic.",
    tag: "4K HD",
    // Optional fallback image. Commenting out to show the icon scaling fallback gracefully.
    // image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600",
    features: [
      "Pristine 4K Ultra HD video",
      "Vandal-proof & weatherproof",
      "Up to 100ft active night vision"
    ]
  },
  {
    id: 2,
    name: "Sentinel Bullet Pro",
    description: "Built for extreme conditions with long-range monitoring and robust heat resistance.",
    tag: "Night Vision",
    features: [
      "Long-range thermal detection",
      "Advanced perimeter security",
      "Corrosion resistant casing"
    ]
  },
  {
    id: 3,
    name: "OmniView PTZ Hub",
    description: "Capture detailed footage from remote distances with deep pan-tilt-zoom controls.",
    tag: "AI Enabled",
    features: [
      "360-degree continuous pan",
      "30x rapid optical zoom",
      "Auto-tracking AI module"
    ]
  },
  {
    id: 4,
    name: "Aegis Smart Doorbell",
    description: "Secure your front door with two-way audio and immediate motion alerts.",
    tag: "Smart Home",
    features: [
      "1080p wide-angle lens",
      "Two-way noise canceling audio",
      "Mobile app alert integration"
    ]
  },
  {
    id: 5,
    name: "Lumina NVR Enterprise",
    description: "Centralized 16-channel video recorder acting as the brain for your cameras.",
    tag: "Storage",
    features: [
      "16-channel PoE ports integrated",
      "Massive 4TB failover storage",
      "Real-time backup sync"
    ]
  },
  {
    id: 6,
    name: "MicroCam Stealth Logic",
    description: "Ultra-compact profile for sensitive areas requiring discreet monitoring.",
    tag: "Stealth",
    features: [
      "Virtually undetectable frame",
      "Pin-hole low light sensor",
      "Silent operational noise"
    ]
  }
];

const phoneNumber = "9999999999";
const waNumber = "919999999999";
const waText = "Hello I want to enquire";

const Products = () => {
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
    <div className="products-page-container" ref={containerRef}>
      
      {/* 1. Banner Section (Top) */}
      <section className="products-banner">
        <div className="products-banner-overlay"></div>
        <div className="products-banner-content animate-fade-in">
          <h1 className="products-banner-title">Advanced CCTV Products</h1>
          <p className="products-banner-subtitle">
            Discover industry-leading surveillance cameras and systems engineered for crystal-clear clarity, unmatched durability, and complete peace of mind.
          </p>
        </div>
      </section>

      {/* 2. Products Section */}
      <section className="products-section-main">
        <div className="section-header-compact animate-on-scroll">
          <h2>Our Surveillance Range</h2>
          <p>Browse our catalog of sophisticated security tracking hardware designed to cater perfectly to residential spaces and large-scale enterprises.</p>
        </div>

        <div className="products-grid-new">
          {productsData.map((product, index) => (
            <div 
              key={product.id} 
              className="product-card-modern animate-on-scroll"
              style={{ transitionDelay: `${Math.min(index * 0.1, 0.4)}s` }}
            >
              <div className="product-card-img-wrapper">
                <span className="pill-badge">{product.tag}</span>
                {product.image ? (
                  <img src={product.image} alt={product.name} loading="lazy" />
                ) : (
                  <CameraPlaceholderIcon />
                )}
              </div>
              
              <div className="product-card-content">
                <h3 className="product-card-title">{product.name}</h3>
                <p className="product-card-desc">{product.description}</p>
                
                <div className="product-features-list">
                  {product.features.map((feature, i) => (
                    <div key={i} className="product-feature-item">
                      <CheckIcon />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="product-card-actions">
                  <a href={`tel:${phoneNumber}`} className="btn-card call-btn">
                    <PhoneIcon /> Call Now
                  </a>
                  <a href={`https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noopener noreferrer" className="btn-card wa-btn">
                    <WhatsAppIcon /> Enquire
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CTA Bottom Section from INstallation.css */}
      <section className="install-cta">
        <div className="install-cta-wrapper animate-on-scroll">
          <div className="install-cta-overlay"></div>
          <div className="install-cta-content">
            <div className="cta-left">
              <h2>Book Your Installation Today</h2>
              <p>Secure your premises instantly. Connect with our technical directors for customized mapping and same-week installation schedules.</p>
            </div>
            <div className="cta-right">
              <a href="tel:9999999999" className="install-btn install-call-btn">
                <PhoneIcon /> Call Now
              </a>
              <a href="https://wa.me/919999999999?text=Hello%20I%20want%20installation" target="_blank" rel="noopener noreferrer" className="install-btn install-wa-btn">
                <WhatsAppIcon /> WhatsApp Message
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Products;
