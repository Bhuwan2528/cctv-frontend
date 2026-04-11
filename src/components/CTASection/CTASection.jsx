import React from 'react';
import { FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const CTASection = ({ variant = 'install', title, description, phoneText = "Call Now", waText = "WhatsApp Message", waMessage = "Hello" }) => {
  const getPrefix = () => {
    switch (variant) {
      case 'services': return 'services-cta';
      case 'about': return 'about-cta';
      case 'install':
      default: return 'install-cta';
    }
  };

  const getBtnPrefix = () => {
    switch (variant) {
      case 'services': return 'srv';
      case 'about': return 'ab';
      case 'install':
      default: return 'install';
    }
  };

  const prefix = getPrefix();
  const btnPrefix = getBtnPrefix();

  return (
    <section className={prefix}>
      <div className={`${prefix}-wrapper animate-on-scroll`}>
        <div className={`${prefix}-overlay`}></div>
        <div className={`${prefix}-content`}>
          <div className="cta-left">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <div className="cta-right">
            <a href="tel:9999999999" className={`${btnPrefix}-btn ${btnPrefix}-call-btn`}>
              <FiPhone size={20} /> {phoneText}
            </a>
            <a 
              href={`https://wa.me/919999999999?text=${encodeURIComponent(waMessage)}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`${btnPrefix}-btn ${btnPrefix}-wa-btn`}
            >
              <FaWhatsapp size={20} /> {waText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
