import React, { useEffect, useRef } from 'react';
import Banner from '../../components/Banner/Banner';
import CTASection from '../../components/CTASection/CTASection';
import './Services.css';

import { FiTool, FiSettings, FiSliders, FiShield, FiTrendingUp, FiLifeBuoy, FiCheck, FiAward, FiSmartphone, FiDollarSign, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const serviceCards = [
  {
    icon: <FiTool size={32} />,
    title: 'CCTV Installation',
    desc: 'Expert placement and wiring of advanced security camera networks for maximum visibility.',
    features: ['Blind-spot analysis', 'Concealed wiring', 'DVR/NVR integration']
  },
  {
    icon: <FiSettings size={32} />,
    title: 'System Maintenance',
    desc: 'Proactive upkeep, lens cleaning, and hardware replacement to prevent sudden system failures.',
    features: ['Bi-annual checkups', 'Lens calibration', 'Hardware diagnostics']
  },
  {
    icon: <FiSliders size={32} />,
    title: 'System Configuration',
    desc: 'Customizing DVR bounds, motion alert settings, and mobile app integrations for tailored use.',
    features: ['Mobile app pairing', 'Storage optimization', 'Alert bounding']
  },
  {
    icon: <FiShield size={32} />,
    title: 'Security Audit',
    desc: 'Deep vulnerability assessments of your current setup to highlight blindspots and firmware gaps.',
    features: ['Threat assessments', 'Firmware checks', 'Coverage mapping']
  },
  {
    icon: <FiTrendingUp size={32} />,
    title: 'System Upgrade',
    desc: 'Swap out legacy analog cameras for modern IP 4K cameras utilizing your existing cable lines.',
    features: ['Analog to IP transfer', 'Resolution boost', 'Smart-home syncing']
  },
  {
    icon: <FiLifeBuoy size={32} />,
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
      <Banner 
        variant="services"
        title="Our CCTV Services"
        subtitle="Comprehensive security solutions tailored to your unique architectural and operational needs."
      />

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
                  <span key={i} className="service-feature"><FiCheck className="feature-dot" size={16} /> {feat}</span>
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
              <div className="detail-feature"><FiCheck className="feature-dot" size={16} /> Employee theft deterrence</div>
              <div className="detail-feature"><FiCheck className="feature-dot" size={16} /> High-bandwidth centralized NVR routing</div>
              <div className="detail-feature"><FiCheck className="feature-dot" size={16} /> Liability & slip-and-fall protection tracking</div>
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
              <div className="detail-feature"><FiCheck className="feature-dot" size={16} /> Discreet aesthetic profiling</div>
              <div className="detail-feature"><FiCheck className="feature-dot" size={16} /> Front porch & perimeter alarms</div>
              <div className="detail-feature"><FiCheck className="feature-dot" size={16} /> Real-time mobile push notifications</div>
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
              <div className="detail-feature"><FiCheck className="feature-dot" size={16} /> Biometric retinal & fingerprint locks</div>
              <div className="detail-feature"><FiCheck className="feature-dot" size={16} /> Auto-logging arrival and departure times</div>
              <div className="detail-feature"><FiCheck className="feature-dot" size={16} /> Synchronized camera snap-on-entry</div>
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
            <div className="why-icon"><FiAward size={40} /></div>
            <h4>Certified Experts</h4>
          </div>
          <div className="why-item animate-on-scroll" style={{ transitionDelay: '0.1s' }}>
            <div className="why-icon"><FiShield size={40} /></div>
            <h4>Reliable Support</h4>
          </div>
          <div className="why-item animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
            <div className="why-icon"><FiSmartphone size={40} /></div>
            <h4>Advanced Technology</h4>
          </div>
          <div className="why-item animate-on-scroll" style={{ transitionDelay: '0.3s' }}>
            <div className="why-icon"><FiDollarSign size={40} /></div>
            <h4>Affordable Pricing</h4>
          </div>
        </div>
      </section>

      {/* 5. High-Conversion CTA Section */}
      <CTASection
        variant="services"
        title="Secure Your Property Today"
        description="Don't wait for an incident to occur. Consult with our expert engineers right now and let us design a hermetic security shell around what matters most to you."
        waText="WhatsApp Us"
        waMessage="Hello I want services"
      />

    </div>
  );
};

export default Services;
