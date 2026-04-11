import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminForm.css";

const UpdateProducts = () => {
  const { id } = useParams(); // 🔥 id from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    point1: "",
    point2: "",
    point3: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 FETCH EXISTING DATA
  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/products`
      );

      const product = res.data.find((p) => p._id === id);

      if (!product) return;

      setFormData({
        title: product.title,
        description: product.description,
        point1: product.points[0] || "",
        point2: product.points[1] || "",
        point3: product.points[2] || "",
      });

      // 🔥 old image preview
      setPreview(`http://localhost:3000/${product.image}`);
    } catch (err) {
      setError("Failed to load product");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // IMAGE CHANGE
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // 🔥 UPDATE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);

      const points = [
        formData.point1,
        formData.point2,
        formData.point3,
      ];

      data.append("points", JSON.stringify(points));

      if (image) {
        data.append("image", image);
      }

      await axios.put(
        `http://localhost:3000/api/products/${id}`,
        data,
        { withCredentials: true }
      );

      alert("✅ Product Updated");

      navigate("/products"); // back to list
    } catch (err) {
      console.error(err);
      setError("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page page-animate">
      <div className="page-header">
        <h1>Update Product</h1>
        <p>Edit existing product details</p>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-grid">

            {/* IMAGE */}
            <div className="form-column">
              <div className="form-group full-width">
                <label>Product Image</label>

                <div className="upload-box">
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="preview-image"
                    />
                  ) : (
                    <p>Upload Image</p>
                  )}

                  <input
                    type="file"
                    className="file-input"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>

            {/* DETAILS */}
            <div className="form-column">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Product Title"
                required
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
              />

              <input
                name="point1"
                value={formData.point1}
                onChange={handleChange}
                placeholder="Point 1"
                required
              />

              <input
                name="point2"
                value={formData.point2}
                onChange={handleChange}
                placeholder="Point 2"
                required
              />

              <input
                name="point3"
                value={formData.point3}
                onChange={handleChange}
                placeholder="Point 3"
                required
              />
            </div>
          </div>

          {/* ERROR */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProducts;