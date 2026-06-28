import React, { useState } from "react";
import axios from "axios";
import "./AdminForm.css";

const AddProducts = () => {
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

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // IMAGE CHANGE + PREVIEW
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // size check (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setError("");
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      if (!image) {
        throw new Error("Please upload an image");
      }

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);

      const points = [
        formData.point1,
        formData.point2,
        formData.point3,
      ];

      data.append("points", JSON.stringify(points));
      data.append("image", image);

      await axios.post(
        "https://cctv-backend-dhz9.onrender.com/api/products/create",
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("✅ Product Added Successfully");

      // RESET
      setFormData({
        title: "",
        description: "",
        point1: "",
        point2: "",
        point3: "",
      });
      setImage(null);
      setPreview(null);

    } catch (err) {
      console.log(err);

      // 🔥 PRO ERROR HANDLING
      if (err.response) {
        setError(err.response.data.message || "Server error");
      } else if (err.request) {
        setError("Server not responding");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page page-animate">
      <div className="page-header">
        <h1>Add New Product</h1>
        <p>Add new security equipment to your catalog.</p>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-grid">
            
            {/* LEFT - IMAGE */}
            <div className="form-column">
              <div className="form-group full-width">
                <label>Product Image</label>

                <div className="upload-box">
                  
                  {/* 🔥 PREVIEW */}
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="preview-image"
                    />
                  ) : (
                    <div className="upload-content">
                      <h4>Click to upload</h4>
                      <p>PNG, JPG (max 5MB)</p>
                    </div>
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

            {/* RIGHT */}
            <div className="form-column">
              <div className="form-group">
                <label>Product Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="HD Night Vision CCTV Camera"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter product details..."
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="points-group">
                <label>Key Features</label>

                <input
                  name="point1"
                  value={formData.point1}
                  onChange={handleChange}
                  placeholder="24/7 Surveillance"
                  required
                />
                <input
                  name="point2"
                  value={formData.point2}
                  onChange={handleChange}
                  placeholder="Motion Detection"
                  required
                />
                <input
                  name="point3"
                  value={formData.point3}
                  onChange={handleChange}
                  placeholder="Mobile Access"
                  required
                />
              </div>
            </div>
          </div>

          {/* 🔥 ERROR MESSAGE */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="form-submit-wrapper">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Uploading..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;




//heelloo