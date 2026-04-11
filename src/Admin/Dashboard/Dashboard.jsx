import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { FaBox } from "react-icons/fa";

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 FETCH DATA
  const fetchDashboardData = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        "http://localhost:3000/api/products"
      );

      setTotalProducts(res.data.length);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-page page-animate">
      <div className="page-header">
        <h1>Dashboard Overview</h1>
        <p>Monitor your CCTV product catalog.</p>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card premium-glass-card">
          
          <div className="stat-icon-wrapper">
            <FaBox />
          </div>

          <div className="stat-info">
            <h3>Total Products</h3>

            {loading ? (
              <p className="stat-value">Loading...</p>
            ) : error ? (
              <p className="stat-value error-text">Error</p>
            ) : (
              <p className="stat-value">{totalProducts}</p>
            )}

          </div>

          <div className="stat-blob"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;