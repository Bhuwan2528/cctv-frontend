import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

import Dashboard from '../Dashboard/Dashboard';
import ProductsList from '../ProductsList/ProductsList';
import AddProducts from '../AdminForms/AddProducts';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  // 🔐 CHECK AUTH
const [checkingAuth, setCheckingAuth] = useState(true);

useEffect(() => {
  fetch("https://cctv-backend-dhz9.onrender.com/api/auth/check-auth", {
    credentials: "include",
  })
    .then(res => res.json())
    .then(data => {
      setIsAuthorized(data.isAuth);
    })
    .catch(() => setIsAuthorized(false))
    .finally(() => setCheckingAuth(false));
}, []);

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "products":
        return <ProductsList />;
      case "add":
        return <AddProducts />;
      default:
        return <Dashboard />;
    }
  };

  // ❌ NOT AUTHORIZED UI
  if (!isAuthorized) {
    return (
      <div className="not-auth-container">
        <h1>🚫 Not Authorized</h1>
        <p>You must login as admin to access this panel.</p>
      </div>
    );
  }

  // ✅ ADMIN PANEL
  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isMobileOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>

        <nav className="sidebar-nav">

          <div
            className={`nav-item ${activePage === "dashboard" ? "active" : ""}`}
            onClick={() => setActivePage("dashboard")}
          >
            Dashboard
          </div>

          <div
            className={`nav-item ${activePage === "products" ? "active" : ""}`}
            onClick={() => setActivePage("products")}
          >
            Products List
          </div>

          <div
            className={`nav-item ${activePage === "add" ? "active" : ""}`}
            onClick={() => setActivePage("add")}
          >
            Add Product
          </div>

        </nav>
        <div className="sidebar-footer">
        <button
          className="logout-btn"
          onClick={async () => {
            await fetch("https://cctv-backend-dhz9.onrender.com/api/auth/logout", {
              method: "POST",
              credentials: "include",
            });

            setIsAuthorized(false);
            navigate('/admin')

          }}
        >
          Logout
        </button>
</div>
      </aside>

      {/* Content */}
      <main className="admin-content">
        <div className="admin-content-wrapper">
          {renderPage()}
        </div>
      </main>

    </div>
  );
};

export default AdminPanel;