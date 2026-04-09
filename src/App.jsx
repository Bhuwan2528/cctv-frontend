import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Home from './Pages/Home/Home'
import Products from './Pages/Products/Products';
import Installation from './Pages/Installation/Installation';
import Services from './Pages/Services/Services';
import About from './Pages/About/About';
import Gallery from './Pages/Gallery/Gallery';
import Contact from './Pages/Contact/Contact';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/installation" element={<Installation />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
