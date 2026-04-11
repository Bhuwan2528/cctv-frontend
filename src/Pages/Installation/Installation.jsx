import React, { useEffect, useRef } from 'react';
import GalleryGrid from '../../components/GalleryGrid/GalleryGrid';
import './Installation.css';

import { FiSearch, FiEdit2, FiTool, FiServer, FiPhone, FiEye } from 'react-icons/fi';
import { FaWhatsapp, FaNetworkWired } from 'react-icons/fa';
import CTASection from '../../components/CTASection/CTASection';

const timelineSteps = [
  {
    id: '01',
    title: 'Site Inspection',
    description: 'Our certified experts conduct a thorough visit to identify blind spots, measure cable lengths, and determine optimal camera placement strategies.',
    icon: <FiSearch size={28} />
  },
  {
    id: '02',
    title: 'Planning & Layout',
    description: 'We draft a comprehensive coverage blueprint, ensuring every entryway, sensitive area, and perimeter is mapped for flawless security overlap.',
    icon: <FiEdit2 size={28} />
  },
  {
    id: '03',
    title: 'Cable Setup',
    description: 'Concealed and weather-guarded fiber/Ethernet routing is laid down. We prioritize aesthetic cleanly-routed cables that prevent tampering.',
    icon: <FaNetworkWired size={28} />
  },
  {
    id: '04',
    title: 'Device Installation',
    description: 'Cameras are securely mounted, power grids are connected, and NVRs are physically installed in safe, ventilated storage locales.',
    icon: <FiTool size={28} />
  },
  {
    id: '05',
    title: 'Testing & Configuration',
    description: 'Final system boot-up. We configure IP addresses, set up mobile app access, customize motion alerts, and ensure 100% uptime stability.',
    icon: <FiServer size={28} />
  }
];


const Installation = () => {
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
    <div className="installation-page" ref={containerRef}>

      {/* 1. Hero Section */}
      <section className="install-hero">
        <div className="install-hero-overlay"></div>
        <div className="install-hero-content animate-fade-in">
          <h1 className="install-hero-title">Professional CCTV Installation</h1>
          <p className="install-hero-subtitle">
            From meticulous planning to seamless deployment, we ensure your security infrastructure is flawlessly integrated.
          </p>
        </div>
      </section>

      {/* 2. Process Section (Timeline) */}
      <section className="process-section">
        <div className="section-header-modern animate-on-scroll">
          <h2>How We Work</h2>
          <p>Our guaranteed 5-step deployment framework ensures rapid installation with zero disruptions to your daily operations.</p>
        </div>

        <div className="timeline-container">
          {timelineSteps.map((step, index) => (
            <div key={index} className="timeline-item animate-on-scroll" style={{ transitionDelay: `${index * 0.15}s` }}>
              <div className="timeline-card">
                <span className="step-number">{step.id}</span>
                <div className="step-icon">
                  {step.icon}
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Installation Gallery Section */}
      <section className="gallery-section">
        <div className="section-header-modern animate-on-scroll">
          <h2>Installation Gallery</h2>
          <p>See our technicians in action, deploying high-grade security technology.</p>
        </div>
        <GalleryGrid />
      </section>

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

export default Installation;
