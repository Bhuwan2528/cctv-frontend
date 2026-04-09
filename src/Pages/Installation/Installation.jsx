import React, { useEffect, useRef } from 'react';
import GalleryGrid from '../../components/GalleryGrid/GalleryGrid';
import './Installation.css';

const StepIcons = {
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Pen: () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  Cable: () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 9a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2v12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9H4z"/><path d="M10 2v7"/><path d="M14 2v7"/></svg>,
  Tool: () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  Server: () => <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
};

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
);

const ViewIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
);

const timelineSteps = [
  {
    id: '01',
    title: 'Site Inspection',
    description: 'Our certified experts conduct a thorough visit to identify blind spots, measure cable lengths, and determine optimal camera placement strategies.',
    icon: <StepIcons.Search />
  },
  {
    id: '02',
    title: 'Planning & Layout',
    description: 'We draft a comprehensive coverage blueprint, ensuring every entryway, sensitive area, and perimeter is mapped for flawless security overlap.',
    icon: <StepIcons.Pen />
  },
  {
    id: '03',
    title: 'Cable Setup',
    description: 'Concealed and weather-guarded fiber/Ethernet routing is laid down. We prioritize aesthetic cleanly-routed cables that prevent tampering.',
    icon: <StepIcons.Cable />
  },
  {
    id: '04',
    title: 'Device Installation',
    description: 'Cameras are securely mounted, power grids are connected, and NVRs are physically installed in safe, ventilated storage locales.',
    icon: <StepIcons.Tool />
  },
  {
    id: '05',
    title: 'Testing & Configuration',
    description: 'Final system boot-up. We configure IP addresses, set up mobile app access, customize motion alerts, and ensure 100% uptime stability.',
    icon: <StepIcons.Server />
  }
];

const galleryData = [
  {
    id: 1,
    size: 'hm-size-1',
    img: 'https://static.vecteezy.com/system/resources/thumbnails/029/624/737/small/technician-installing-cctv-camera-for-security-ai-generative-photo.jpg'
  },
  {
    id: 2,
    size: 'hm-size-2',
    img: 'https://static.vecteezy.com/system/resources/thumbnails/029/624/737/small/technician-installing-cctv-camera-for-security-ai-generative-photo.jpg'
  },
  {
    id: 3,
    size: 'hm-size-3',
    img: 'https://aquatechindia.com/wp-content/uploads/2023/08/1.jpg'
  },
  {
    id: 4,
    size: 'hm-size-3',
    img: 'https://media.istockphoto.com/id/1192103258/photo/close-up-of-surveillance-camera-installation-male-hand-holds-cctv-camera.jpg?s=612x612&w=0&k=20&c=zOBgLFkcX9Wddbo1gHEOg2HCKiWc05PyqJ9xBjM3MOE='
  },
  {
    id: 5,
    size: 'hm-size-4',
    img: 'https://4.imimg.com/data4/IE/JM/MY-26272392/office-cctv-camera-500x500.jpg'
  },
  
  {
    id: 6,
    size: 'hm-size-4',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZntGP4Jar3EYG-5b77_lCu7si5jC-WG5vXQ&s'
  },
  
  {
    id: 7,
    size: 'hm-size-4',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK_rwpfC44yLRiRNb0hr7PXIsp1CuARJNFNw&s'
  },
  
  {
    id: 8,
    size: 'hm-size-4',
    img: 'https://www.shutterstock.com/image-photo/installation-maintenance-outdoor-cctv-cameras-260nw-2466156457.jpg'
  },
  
  {
    id: 9,
    size: 'hm-size-4',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0vnw7FuY5TtGytExSTEkbF5Ro8Mrlkxdp9w&s'
  },
  
  {
    id: 10,
    size: 'hm-size-4',
    img: 'https://media.istockphoto.com/id/1330512185/photo/technician-installing-cctv-camera-for-security.jpg?s=612x612&w=0&k=20&c=uS2-J8l8VLyCKS01FU89Oy4XbezUhyOU4jWwtHMOfpk='
  },
  
  {
    id: 11,
    size: 'hm-size-4',
    img: 'https://t3.ftcdn.net/jpg/03/78/15/80/360_F_378158018_uY4COf39PfKLLqfVtDQ6jdC2Q6yraodL.jpg'
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
        <GalleryGrid images={galleryData} />
      </section>

      {/* 4. CTA Bottom Section */}
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

export default Installation;
