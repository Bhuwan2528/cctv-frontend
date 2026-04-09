import React, { useState } from 'react';
import './GalleryGrid.css';

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const GalleryGrid = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Requirement: exactly 4 images per row, max 2 rows -> so 8 images total
  const displayImages = images.slice(0, 8);

  return (
    <>
      <div className="unified-gallery-grid">
        {displayImages.map((item, index) => (
          <div
            key={item.id || index}
            className="unified-gallery-item animate-on-scroll"
            style={{ transitionDelay: `${(index % 4) * 0.1}s` }}
            onClick={() => setSelectedImage(item)}
          >
            <img src={item.image || item.img} alt={item.title || "gallery img"} loading="lazy" />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <div 
        className={`unified-lightbox-modal ${selectedImage ? 'active' : ''}`} 
        onClick={() => setSelectedImage(null)}
      >
        {selectedImage && (
          <div className="unified-lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="unified-lightbox-close" onClick={() => setSelectedImage(null)}>
              <CloseIcon />
            </button>
            <img src={selectedImage.image || selectedImage.img} alt={selectedImage.title || "preview"} />
          </div>
        )}
      </div>
    </>
  );
};

export default GalleryGrid;
