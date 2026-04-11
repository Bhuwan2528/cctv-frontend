import React, { useEffect } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Home from './Pages/Home/Home';
import Products from './Pages/Products/Products';
import Installation from './Pages/Installation/Installation';
import Services from './Pages/Services/Services';
import About from './Pages/About/About';
import Gallery from './Pages/Gallery/Gallery';
import Contact from './Pages/Contact/Contact';

import AdminLogin from './Admin/AdminLogin/AdminLogin';
import AdminPanel from './Admin/AdminPanel/AdminPanel';
import AddProduct from './Admin/AdminForms/AddProducts';
import UpdateProduct from './Admin/AdminForms/UpdateProducts';
import ProductsList from './Admin/ProductsList/ProductsList';


// ✅ SCROLL TO TOP (inline)
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


// ✅ PUBLIC LAYOUT
const PublicLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <>
      <ScrollToTop /> {/* 🔥 YAHI ADD KARNA THA */}

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/installation" element={<Installation />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* ADMIN */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/update/:id" element={<UpdateProduct />} />
        <Route path="/products-list" element={<ProductsList />} />

      </Routes>
    </>
  );
}

export default App;