import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { Hero } from "../components/Home/Hero";
import Services from "../components/Servive/servicepage";
import ContactPage from "../components/contact/contact";
import OurStory from "../components/OurStory/storymain";
import Portfolio from "../components/Testimonials/whowe";
import Career from "../components/Career/openings";
import NotFound from "../components/NotFound";

const MainLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Hero />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<OurStory />} />
        <Route path="/work" element={<Portfolio />} />
        <Route path="/career" element={<Career />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
