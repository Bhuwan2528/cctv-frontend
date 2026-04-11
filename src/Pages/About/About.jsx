import React, { useEffect, useRef } from 'react';
import Banner from '../../components/Banner/Banner';
import CTASection from '../../components/CTASection/CTASection';
import './About.css';

// SVG Icons
const Icons = {
  Mission: () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Vision: () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Quality: () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Trust: () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
  Innovation: () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>,
  Customer: () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  CheckCircle: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  Phone: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  WhatsApp: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
};

const valueData = [
  { icon: <Icons.Quality />, title: 'Premium Quality', text: 'We rely exclusively on industry-leading, thoroughly stress-tested hardware.' },
  { icon: <Icons.Trust />, title: 'Absolute Trust', text: 'Your privacy and operational security are treated as our highest mandate.' },
  { icon: <Icons.Innovation />, title: 'Tech Innovation', text: 'Deploying state-of-the-art AI analytics and 4K optical resolutions.' },
  { icon: <Icons.Customer />, title: 'Customer First', text: 'Rapid dispatch response times with highly personalized consulting.' }
];

const expertiseData = [
  { title: "Skilled Technicians", desc: "Every member of our field team is rigorously assessed and certified in high-tension installations and network topologies." },
  { title: "Certified Architecture", desc: "We adhere strictly to international electrical guidelines, ensuring all wiring is concealed, clean, and tamper-resistant." },
  { title: "Years of Local Experience", desc: "We possess deep geographic knowledge of local security challenges, enabling us to predict and eliminate blindspots accurately." }
];

const About = () => {
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
    <div className="about-page" ref={containerRef}>
      
      {/* 1. Hero / Banner Component */}
      <Banner 
        variant="about"
        title="About Bhuwan Suneja CCTV"
        subtitle="Delivering advanced, battle-tested security solutions with unparalleled precision and unshakeable trust."
      />

      {/* 2. Intro / Story Section */}
      <section className="about-story">
        <div className="story-wrapper animate-on-scroll">
          <div className="story-content">
            <h2>Securing What Matters Most to You.</h2>
            <p>
              Bhuwan Suneja CCTV was founded on a singular premise: to entirely bridge the gap between complex security matrices and accessible user safety. Over our extensive journey, we have migrated from simple analog setups to architecting massive IP-driven surveillance systems running across enormous corporate facilities.
            </p>
            <p>
              We treat your physical safety and data privacy as critical assets. Our team operates cleanly, quickly, and respectfully—ensuring your daily life or workflow is entirely uninterrupted during our installations.
            </p>
            
            <div className="story-highlights">
              <div className="highlight-item">
                <span className="highlight-title">500+</span>
                <span className="highlight-desc">Projects Secured</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-title">100%</span>
                <span className="highlight-desc">Client Privacy</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-title">24/7</span>
                <span className="highlight-desc">Support Network</span>
              </div>
            </div>
          </div>
          <div className="story-image">
            <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000" alt="Team Blueprinting Security" loading="lazy" />
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="mission-vision">
        <div className="mv-grid">
          <div className="mv-card animate-on-scroll">
            <div className="mv-icon"><Icons.Mission /></div>
            <h3>Our Mission</h3>
            <p>
              To eliminate vulnerability by providing top-tier, robust, and flawlessly architectured surveillance grids to commercial operations and residential sanctuaries alike—delivering peace of mind down to the very last pixel.
            </p>
          </div>
          <div className="mv-card animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
            <div className="mv-icon"><Icons.Vision /></div>
            <h3>Our Vision</h3>
            <p>
              To remain the most technologically adaptive security vanguard in the perimeter defense domain, continually pivoting to the latest AI developments while maintaining accessible, human-first pricing and client relations.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Core Values Section */}
      <section className="core-values">
        <div className="section-header-modern animate-on-scroll">
          <h2>Our Core Values</h2>
          <p>The foundational principles guiding every consultation, wire laid, and camera mounted.</p>
        </div>
        <div className="values-grid">
          {valueData.map((val, idx) => (
            <div key={idx} className="value-card animate-on-scroll" style={{ transitionDelay: `${idx * 0.1}s` }}>
              <div className="value-icon">{val.icon}</div>
              <h4>{val.title}</h4>
              <p>{val.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Team / Expertise Section */}
      <section className="expertise-section">
        <div className="section-header-modern animate-on-scroll">
          <h2>Our Expertise</h2>
          <p>We deploy rigorous operational standards enforced by dedicated specialists.</p>
        </div>
        <div className="expertise-grid">
          {expertiseData.map((exp, idx) => (
            <div key={idx} className="expertise-item animate-on-scroll" style={{ transitionDelay: `${idx * 0.15}s` }}>
              <h3><Icons.CheckCircle /> {exp.title}</h3>
              <p>{exp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CTA / Action Block  */}
      <CTASection
        variant="about"
        title="Let’s Secure Your Space"
        description="Ready to deploy uncompromising security? Contact us immediately to arrange an on-site architectural strategy and detailed quotation from our directors."
        waMessage="Hello I want to know more"
      />

    </div>
  );
};

export default About;
