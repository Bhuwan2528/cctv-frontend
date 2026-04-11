import React from 'react';

const Banner = ({ variant, title, subtitle }) => {
  // Map variant to the correct class prefix to maintain CSS structure
  const getPrefix = () => {
    switch (variant) {
      case 'products':
        return 'products-banner';
      case 'services':
        return 'services-hero';
      case 'about':
        return 'about-hero';
      default:
        return 'hero';
    }
  };

  const prefix = getPrefix();

  return (
    <section className={prefix}>
      <div className={`${prefix}-overlay`}></div>
      <div className={`${prefix}-content animate-fade-in`}>
        <h1 className={`${prefix}-title`}>{title}</h1>
        <p className={`${prefix}-subtitle`}>{subtitle}</p>
      </div>
    </section>
  );
};

export default Banner;
