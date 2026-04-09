import React, { useEffect, useRef } from 'react';
import './Services.css';

// Reusable SVG Icons
const Icons = {
  Install: () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  Maintenance: () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, // placeholder
  Config: () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Audit: () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  Upgrade: () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 11 12 6 7 11"/><line x1="12" y1="18" x2="12" y2="6"/></svg>,
  Support: () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Check: () => <svg className="feature-dot" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  ShieldCheck: () => <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
  Badge: () => <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>,
  Tech: () => <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
  Piggy: () => <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  Phone: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  WhatsApp: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
};

const serviceCards = [
  {
    icon: <Icons.Install />,
    title: 'CCTV Installation',
    desc: 'Expert placement and wiring of advanced security camera networks for maximum visibility.',
    features: ['Blind-spot analysis', 'Concealed wiring', 'DVR/NVR integration']
  },
  {
    icon: <Icons.Maintenance />,
    title: 'System Maintenance',
    desc: 'Proactive upkeep, lens cleaning, and hardware replacement to prevent sudden system failures.',
    features: ['Bi-annual checkups', 'Lens calibration', 'Hardware diagnostics']
  },
  {
    icon: <Icons.Config />,
    title: 'System Configuration',
    desc: 'Customizing DVR bounds, motion alert settings, and mobile app integrations for tailored use.',
    features: ['Mobile app pairing', 'Storage optimization', 'Alert bounding']
  },
  {
    icon: <Icons.Audit />,
    title: 'Security Audit',
    desc: 'Deep vulnerability assessments of your current setup to highlight blindspots and firmware gaps.',
    features: ['Threat assessments', 'Firmware checks', 'Coverage mapping']
  },
  {
    icon: <Icons.Upgrade />,
    title: 'System Upgrade',
    desc: 'Swap out legacy analog cameras for modern IP 4K cameras utilizing your existing cable lines.',
    features: ['Analog to IP transfer', 'Resolution boost', 'Smart-home syncing']
  },
  {
    icon: <Icons.Support />,
    title: '24/7 Support',
    desc: 'Round-the-clock technical troubleshooting ready to resolve any anomalies via remote access.',
    features: ['Instant remote fixes', 'Live operator routing', 'Priority dispatches']
  }
];

const Services = () => {
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
    <div className="services-page" ref={containerRef}>
      
      {/* 1. Hero / Banner Component */}
      <section className="services-hero">
        <div className="services-hero-overlay"></div>
        <div className="services-hero-content animate-fade-in">
          <h1 className="services-hero-title">Our CCTV Services</h1>
          <p className="services-hero-subtitle">
            Comprehensive security solutions tailored to your unique architectural and operational needs.
          </p>
        </div>
      </section>

      {/* 2. Services Overview Grid */}
      <section className="services-overview">
        <div className="section-header-centered animate-on-scroll">
          <h2>What We Offer</h2>
          <p>We deliver an end-to-end security lifecycle—from initial architectural auditing down to long-term preventative maintenance—securing your absolute peace of mind.</p>
        </div>
        
        <div className="services-grid">
          {serviceCards.map((srv, idx) => (
            <div key={idx} className="service-card-modern animate-on-scroll" style={{ transitionDelay: `${Math.min(idx * 0.1, 0.4)}s` }}>
              <div className="service-icon-box">{srv.icon}</div>
              <h3 className="service-card-title">{srv.title}</h3>
              <p className="service-card-desc">{srv.desc}</p>
              <div className="service-features">
                {srv.features.map((feat, i) => (
                  <span key={i} className="service-feature"><Icons.Check /> {feat}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Service Detail Highlight Blocks */}
      <section className="service-details-wrapper">
        {/* Block 1 */}
        <div className="split-section animate-on-scroll">
          <div className="split-content">
            <h3>Commercial CCTV Infrastructure</h3>
            <p>Safeguard your business assets with scalable setups. We install vast matrices of cameras optimized for low-light warehouses, busy retail floors, and sensitive server rooms, all networked back to a centralized management interface.</p>
            <div className="detail-features">
              <div className="detail-feature"><Icons.Check /> Employee theft deterrence</div>
              <div className="detail-feature"><Icons.Check /> High-bandwidth centralized NVR routing</div>
              <div className="detail-feature"><Icons.Check /> Liability & slip-and-fall protection tracking</div>
            </div>
          </div>
          <div className="split-image">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" alt="Commercial Setup" loading="lazy" />
          </div>
        </div>
        
        {/* Block 2 (Reversed) */}
        <div className="split-section split-reverse animate-on-scroll">
          <div className="split-content">
            <h3>Home Security Ecosystems</h3>
            <p>Your family's safety is non-negotiable. Our residential installs are aesthetically discreet, running seamlessly behind walls, and directly hook into your smartphone so you're always connected, whether you're at work or on vacation.</p>
            <div className="detail-features">
              <div className="detail-feature"><Icons.Check /> Discreet aesthetic profiling</div>
              <div className="detail-feature"><Icons.Check /> Front porch & perimeter alarms</div>
              <div className="detail-feature"><Icons.Check /> Real-time mobile push notifications</div>
            </div>
          </div>
          <div className="split-image">
            <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1000" alt="Home Setup" loading="lazy" />
          </div>
        </div>

        {/* Block 3 */}
        <div className="split-section animate-on-scroll">
          <div className="split-content">
            <h3>Access Control Systems</h3>
            <p>Upgrade beyond traditional keys. Manage who enters your property and when, through biometric scanners, encrypted keycards, and smartphone authenticators smoothly communicating with your CCTV feeds.</p>
            <div className="detail-features">
              <div className="detail-feature"><Icons.Check /> Biometric retinal & fingerprint locks</div>
              <div className="detail-feature"><Icons.Check /> Auto-logging arrival and departure times</div>
              <div className="detail-feature"><Icons.Check /> Synchronized camera snap-on-entry</div>
            </div>
          </div>
          <div className="split-image">
            <img src="https://images.unsplash.com/photo-1555626906-fcf10d6851b4?auto=format&fit=crop&q=80&w=1000" alt="Access Control" loading="lazy" />
          </div>
        </div>
      </section>

      {/* 4. Why Our Services */}
      <section className="why-services">
        <div className="section-header-centered animate-on-scroll">
          <h2>Why Choose Our Services</h2>
          <p>We don't settle for "good enough". Our workflows establish industry dominance through ruthless reliability and technological superiority.</p>
        </div>
        <div className="why-grid">
          <div className="why-item animate-on-scroll" style={{ transitionDelay: '0s' }}>
            <div className="why-icon"><Icons.Badge /></div>
            <h4>Certified Experts</h4>
          </div>
          <div className="why-item animate-on-scroll" style={{ transitionDelay: '0.1s' }}>
            <div className="why-icon"><Icons.ShieldCheck /></div>
            <h4>Reliable Support</h4>
          </div>
          <div className="why-item animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
            <div className="why-icon"><Icons.Tech /></div>
            <h4>Advanced Technology</h4>
          </div>
          <div className="why-item animate-on-scroll" style={{ transitionDelay: '0.3s' }}>
            <div className="why-icon"><Icons.Piggy /></div>
            <h4>Affordable Pricing</h4>
          </div>
        </div>
      </section>

      {/* 5. High-Conversion CTA Section */}
      <section className="services-cta">
        <div className="services-cta-wrapper animate-on-scroll">
          <div className="services-cta-overlay"></div>
          <div className="services-cta-content">
            <div className="cta-left">
              <h2>Secure Your Property Today</h2>
              <p>Don't wait for an incident to occur. Consult with our expert engineers right now and let us design a hermetic security shell around what matters most to you.</p>
            </div>
            <div className="cta-right">
              <a href="tel:9999999999" className="srv-btn srv-call-btn">
                <Icons.Phone /> Call Now
              </a>
              <a href="https://wa.me/919999999999?text=Hello%20I%20want%20services" target="_blank" rel="noopener noreferrer" className="srv-btn srv-wa-btn">
                <Icons.WhatsApp /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;
