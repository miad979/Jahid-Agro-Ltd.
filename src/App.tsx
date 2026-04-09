/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Products from "@/pages/Products";
import TechHub from "@/pages/TechHub";
import Contact from "@/pages/Contact";
import PromoGenerator from "@/pages/PromoGenerator";

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-green-100 selection:text-green-900">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/tech-hub" element={<TechHub />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/promo-generator" element={<PromoGenerator />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}
