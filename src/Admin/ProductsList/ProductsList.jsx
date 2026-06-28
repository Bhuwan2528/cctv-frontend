import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductsList.css";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 🔥 FETCH PRODUCTS
  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get("https://cctv-backend-dhz9.onrender.com/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔥 DELETE PRODUCT
  const confirmDelete = async () => {
    try {
      await axios.delete(
        `https://cctv-backend-dhz9.onrender.com/api/products/${deleteId}`,
        { withCredentials: true }
      );

      setProducts((prev) => prev.filter((p) => p._id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error(err);
      alert("❌ Delete failed");
    }
  };

  return (
    <div className="product-list-page page-animate">
      {/* HEADER */}
      <div className="list-header">
        <div className="header-left">
          <h1>Products List</h1>
          <span className="total-badge">
            Total Products: {products.length}
          </span>
        </div>

        <button
          className="add-new-btn"
          onClick={() => navigate("/admin/add-product")}
        >
          <FaPlus /> Add New
        </button>
      </div>

      {/* ERROR */}
      {error && <p className="error-text">{error}</p>}

      {/* LOADING */}
      {loading ? (
        <div className="loading-state">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <p>No products found 🚫</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="modern-table">
            <thead>
              <tr>
                <th>S No.</th>
                <th>Image</th>
                <th>Product Title</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p, index) => (
                <tr key={p._id}>
                  <td>{index + 1}</td>

                  {/* IMAGE */}
                  <td>
                    <img
                      src={`https://cctv-backend-dhz9.onrender.com/${p.image}`}
                      alt={p.title}
                      className="table-img"
                    />
                  </td>

                  {/* TITLE */}
                  <td className="product-title">{p.title}</td>

                  {/* ACTIONS */}
                  <td>
                    <div className="action-buttons">

                      {/* VIEW */}
                      <button
                        className="action-btn view-btn"
                        title="View"
                        onClick={() => navigate("/products")}
                      >
                        <FaEye />
                      </button>

                      {/* EDIT */}
                      <button
                        className="action-btn edit-btn"
                        title="Edit"
                        onClick={() => navigate(`/update/${p._id}`)}
                      >
                        <FaEdit />
                      </button>

                      {/* DELETE */}
                      <button
                        className="action-btn delete-btn"
                        title="Delete"
                        onClick={() => setDeleteId(p._id)}
                      >
                        <FaTrash />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🔥 DELETE MODAL */}
      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Delete Product?</h3>
            <p>This action cannot be undone.</p>

            <div className="modal-actions">
              <button
                className="modal-btn cancel-btn"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>

              <button
                className="modal-btn confirm-btn"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsList;