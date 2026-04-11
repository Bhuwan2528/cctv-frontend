import React, { useEffect, useRef } from 'react';
import Banner from '../../components/Banner/Banner';
import CTASection from '../../components/CTASection/CTASection';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import './Products.css';


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
      <Banner
        variant="products"
        title="Advanced CCTV Products"
        subtitle="Discover industry-leading surveillance cameras and systems engineered for crystal-clear clarity, unmatched durability, and complete peace of mind."
      />

      {/* 2. Products Section */}
      <section className="products-section-main">
        <div className="section-header-compact animate-on-scroll">
          <h2>Our Surveillance Range</h2>
          <p>Browse our catalog of sophisticated security tracking hardware designed to cater perfectly to residential spaces and large-scale enterprises.</p>
        </div>

        <ProductGrid variant="detailed" />
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

export default Products;
