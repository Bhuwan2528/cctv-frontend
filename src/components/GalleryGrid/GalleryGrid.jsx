import React, { useState } from 'react';
import './GalleryGrid.css';

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

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

const GalleryGrid = ({ images = galleryData }) => {
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
