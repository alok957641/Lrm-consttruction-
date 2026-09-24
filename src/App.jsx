import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Capabilities from './pages/Capabilities';
import Journey from './pages/Journey';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

// ⚡ Layout wrapper — hides Navbar/Footer on /admin
function Layout() {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <>
      {/* Navbar sirf non-admin pages pe */}
      {!isAdminPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/capabilities" element={<Capabilities />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />

        {/* 404 fallback */}
        <Route path="*" element={<Home />} />
      </Routes>

      {/* Footer sirf non-admin pages pe */}
      {!isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;