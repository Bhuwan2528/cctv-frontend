import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import GalleryGrid from '../../components/GalleryGrid/GalleryGrid';
import './Home.css';
// Reuse highly optimized SVGs to meet premium styling
const Icons = {
  Shield: () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  Wrench: () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>,
  Eye: () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>,
  Zap: () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  Checklist: () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" /><path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" /></svg>,
  Users: () => <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  Phone: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  WhatsApp: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>,
  Play: () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3l14 9-14 9V3z" /></svg>
};

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
);
// --- DATA BLOCKS ---
const productsData = [
  {
    id: 1,
    name: "Smart AI Dome Node",
    desc: "4K resolution mapped with human-tracking logic.",
    tag: "AI Enabled",
    img: "https://5.imimg.com/data5/SELLER/Default/2026/2/586511182/DY/PQ/KX/25857244/ip-camera-4mp-ai-dome-smart-night-vision-for-home-office-250x250.png"
  },
  {
    id: 2,
    name: "Thermal Bullet V2",
    desc: "Heat-signature tracking for complete darkness.",
    tag: "Night Vision",
    img: "https://5.imimg.com/data5/SELLER/Default/2025/1/477923297/QS/IU/RD/3709953/hikvision-ds-2td2637-15-p-thermal-amp-optical-bi-spectrum-network-bullet-camera-500x500.png"
  },
  {
    id: 3,
    name: "Omni PTZ 360",
    desc: "Vast zoom range covering huge facility perimeters.",
    tag: "Commercial",
    img: "https://www.shutterstock.com/shutterstock/videos/3633606935/thumb/1.jpg?ip=x480"
  },
  {
    id: 4,
    name: "NVR Storage Tower",
    desc: "Centralized massive storage hub for up to 64 streams.",
    tag: "Storage",
    img: "https://www.shutterstock.com/image-photo/network-video-recorder-nvr-recording-260nw-2386960267.jpg"
  },
  {
    id: 5,
    name: "Stealth Micro Sensor",
    desc: "Easily concealable lenses for strict indoor monitoring.",
    tag: "Indoor",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf47olCCQacyCmliPFrck9bULFaLDnQKA7Eg&s"
  },
  {
    id: 6,
    name: "Keypad Biometric Hub",
    desc: "Integrates cameras natively with retinal unlocking.",
    tag: "Access Control",
    img: "https://m.media-amazon.com/images/I/71Xk8h-rMiL._AC_UF350,350_QL80_.jpg"
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

const whyChooseUsData = [
  { icon: <Icons.Shield />, title: "Bank-Grade Security", desc: "Encrypted feeds protecting against external breaches and physical wire cuts." },
  { icon: <Icons.Wrench />, title: "Precision Install", desc: "Clean, zero-trace wiring done by heavily vetted, certified field agents." },
  { icon: <Icons.Eye />, title: "Total Site Audits", desc: "Acoustic and spatial mapping to completely eliminate blindspots." },
  { icon: <Icons.Zap />, title: "Instant Response", desc: "Our 24/7 technical hotline roots operators directly to your system." },
  { icon: <Icons.Checklist />, title: "Annual Compliance", desc: "Scheduled lens calibrations and firmware overhauls included." },
  { icon: <Icons.Users />, title: "Trusted Partners", desc: "Servicing over 500+ residential sanctuaries and massive retail entities." }
];

// Reusable standard Indian face placeholders (using Unsplash IDs)
const faceUrls = [
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80", // standard portrait
  "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=150&q=80"
];

// Generate sets for the 3 marquee rows
const generateRow = (offset) => {
  const arr = [];
  const names = ["Rajesh Kumar", "Priya Sharma", "Amit Patel", "Neha Gupta", "Vikram Singh"];
  const comments = [
    "Flawless installation. Wiring is completely invisible. Highly highly recommended.",
    "The 4K clarity on the night vision setups completely changed how we secure our warehouse.",
    "Very professional team. They audited our office and placed cameras perfectly.",
    "App integration is seamless. I check on my house from my phone instantly.",
    "Zero downtime. Top tier corporate surveillance service."
  ];
  for (let i = 0; i < 5; i++) {
    arr.push({ id: Math.random(), name: names[(i + offset) % 5], text: comments[(i + offset) % 5], img: faceUrls[(i + offset) % 5] });
  }
  return arr;
};

const row1 = generateRow(0);
const row2 = generateRow(2);
const row3 = generateRow(4);

const phoneParams = { number: "9999999999", waNumber: "919999999999", waText: "Hello I want to enquire about CCTV." };

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
          <p>We source only the most rigorously tested lenses and sensors, mapping perfectly to residential perimeters and expansive industrial complexes alike.</p>
        </div>
        <div className="hp-products-grid">
          {productsData.map((prod, idx) => (
            <div key={prod.id} className="hp-product-card animate-on-scroll" style={{ transitionDelay: `${Math.min(idx * 0.1, 0.4)}s` }}>
              <div className="hp-card-img">
                <span className="hp-pill">{prod.tag}</span>
                <img src={prod.img} alt={prod.name} loading="lazy" className='hm-img' />
              </div>
              <div className="hp-card-content">
                <h3 className="hp-card-title">{prod.name}</h3>
                <p className="hp-card-desc">{prod.desc}</p>
                <div className="hp-card-actions">
                  <a href={`tel:${phoneParams.number}`} className="hp-btn hp-call-btn">
                    <Icons.Phone /> Call Now
                  </a>
                  <a href={`https://wa.me/${phoneParams.waNumber}?text=${encodeURIComponent(phoneParams.waText)}`} target="_blank" rel="noopener noreferrer" className="hp-btn hp-wa-btn">
                    <Icons.WhatsApp /> Enquire
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="hp-view-all-wrapper animate-on-scroll">
          <Link to="/products" className="hp-view-all-btn">View All Products &rarr;</Link>
        </div>
      </section>

      {/* 3. Advanced Installation Gallery */}
      <section className="sec-padding">
        <div className="sec-header animate-on-scroll">
          <h2>Installation Excellence</h2>
          <p>See our real CCTV installations across different locations.</p>
        </div>

        <GalleryGrid images={galleryData} />
      </section>

      {/* 4. Why Choose Us */}
      <section className="sec-padding hp-why">
        <div className="sec-header animate-on-scroll">
          <h2>Why Choose Bhuwan Suneja</h2>
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
      <section className="hp-testimonials">
        <div className="sec-header animate-on-scroll">
          <h2>Trusted By Hundreds</h2>
          <p>We've secured over 500 premises across the region. Here is what our partners have to say.</p>
        </div>

        <div className="marquee-container">
          {/* Row 1: Scroll Left */}
          <div className="marquee-row scroll-left">
            {[...row1, ...row1].map((test, idx) => (
              <div key={idx} className="test-card">
                <div className="test-user">
                  <img src={test.img} alt={test.name} loading="lazy" />
                  <div className="test-info">
                    <h4>{test.name}</h4>
                    <div className="test-stars">★★★★★</div>
                  </div>
                </div>
                <p className="test-body">"{test.text}"</p>
              </div>
            ))}
          </div>

          {/* Row 2: Scroll Right */}
          <div className="marquee-row scroll-right">
            {[...row2, ...row2].map((test, idx) => (
              <div key={idx} className="test-card">
                <div className="test-user">
                  <img src={test.img} alt={test.name} loading="lazy" />
                  <div className="test-info">
                    <h4>{test.name}</h4>
                    <div className="test-stars">★★★★★</div>
                  </div>
                </div>
                <p className="test-body">"{test.text}"</p>
              </div>
            ))}
          </div>

          {/* Row 3: Scroll Left */}
          <div className="marquee-row scroll-left">
            {[...row3, ...row3].map((test, idx) => (
              <div key={idx} className="test-card">
                <div className="test-user">
                  <img src={test.img} alt={test.name} loading="lazy" />
                  <div className="test-info">
                    <h4>{test.name}</h4>
                    <div className="test-stars">★★★★★</div>
                  </div>
                </div>
                <p className="test-body">"{test.text}"</p>
              </div>
            ))}
          </div>
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

export default Home;
