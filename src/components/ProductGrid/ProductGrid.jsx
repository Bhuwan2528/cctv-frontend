import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiPhone, FiCamera, FiCheckCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import "./ProductGrid.css";

const phoneNumber = "9999999999";
const waNumber = "919999999999";
const waText = "Hello I want to enquire";

const ProductGrid = ({ limit, variant = "compact" }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔥 FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://cctv-backend-1fno.onrender.com/api/products");
        setProducts(res.data || []);
      } catch (err) {
        console.log("ERROR:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔥 STATES
  if (loading)
    return <p className="pg-center-text">Loading products...</p>;

  if (error)
    return <p className="pg-error-text">{error}</p>;

  if (!products.length)
    return <p className="pg-center-text">No products found</p>;

  const displayProducts = limit
    ? products.slice(0, limit)
    : products;

  // ================= COMMON CARD =================
  const renderCard = (prod, idx, detailed = false) => {
    const image = prod?.image
      ? `https://cctv-backend-1fno.onrender.com/${prod.image}`
      : null;

    return (
      <div
        key={prod._id}
        className={detailed ? "product-card-modern" : "hp-product-card"}
      >
        {/* IMAGE */}
        <div className={detailed ? "product-card-img-wrapper" : "hp-card-img"}>
          <span className={detailed ? "pill-badge" : "hp-pill"}>
            Product
          </span>

          {image ? (
            <img src={image} alt={prod.title} />
          ) : (
            <FiCamera className="product-icon-fallback" size={70} />
          )}
        </div>

        {/* CONTENT */}
        <div className={detailed ? "product-card-content" : "hp-card-content"}>
          <h3 className={detailed ? "product-card-title" : "hp-card-title"}>
            {prod.title}
          </h3>

          <p className={detailed ? "product-card-desc" : "hp-card-desc"}>
            {prod.description}
          </p>

          {/* FEATURES */}
          {prod?.points?.length > 0 && (
            <div className="product-features-list">
              {prod.points.slice(0, 3).map((point, i) => (
                <div key={i} className="product-feature-item">
                  <FiCheckCircle size={16} />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          )}

          {/* BUTTONS */}
          <div className={detailed ? "product-card-actions" : "hp-card-actions"}>
            <a
              href={`tel:${phoneNumber}`}
              className={detailed ? "btn-card call-btn" : "hp-btn hp-call-btn"}
            >
              <FiPhone size={18} /> Call
            </a>

            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                waText
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={detailed ? "btn-card wa-btn" : "hp-btn hp-wa-btn"}
            >
              <FaWhatsapp size={18} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  };

  // ================= RENDER =================
  return variant === "compact" ? (
    <div className="hp-products-grid">
      {displayProducts.map((prod, idx) => renderCard(prod, idx, false))}
    </div>
  ) : (
    <div className="products-grid-new">
      {displayProducts.map((prod, idx) => renderCard(prod, idx, true))}
    </div>
  );
};

export default ProductGrid;