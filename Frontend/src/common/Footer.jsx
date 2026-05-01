import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Logo from "../assets/Logo.png";
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const particles = Array.from({ length: 15 });

  return (
    <footer
      className="footer-modern position-relative overflow-hidden"
      role="contentinfo"
      aria-label="Website footer"
    >
      {/* Floating Particles */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="footer-particle"
          aria-hidden="true"
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, Math.random() + 0.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ pointerEvents: "none" }}
        />
      ))}

      <div className="container py-3 position-relative" style={{ zIndex: 2 }}>
        <div className="row gy-4">
          {/* Brand */}
          <div className="col-lg-3 col-md-6">
            <div className="footer-brand d-flex align-items-center gap-2 mb-3">
              <img
                src={Logo}
                alt="BrandSetu Digital logo"
                width="232"
                height="70"
                loading="lazy"
                decoding="async"
              />
              <div className="logo-text d-flex flex-column">
                <div className="logo-title">BRANDSETU</div>
                <div className="logo-subtitle">DIGITAL</div>
              </div>
            </div>
            <p className="text-light-50 glow-text">
              Driving digital growth with creative strategies, modern design,
              and measurable results.
            </p>
          </div>

          {/* Quick Links */}
          <div
            className="col-lg-3 col-md-6"
            aria-label="Footer quick links"
          >
            <h2 className="footer-title text-light mb-3 fs-6">Quick Links</h2>
            <ul className="list-unstyled footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/work">Portfolio</Link></li>
              <li><Link to="/about">Our Story</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div
            className="col-lg-3 col-md-6"
            aria-label="Footer services"
          >
            <h2 className="footer-title text-light mb-3 fs-6">Services</h2>
            <ul className="list-unstyled footer-links">
              <li><Link to="/services#web">Web Design & Development</Link></li>
              <li><Link to="/services#seo">SEO & Marketing</Link></li>
              <li><Link to="/services#branding">Brand Strategy</Link></li>
              <li><Link to="/services#social">Social Media Marketing</Link></li>
              <li><Link to="/services#social">Shoots & Editing</Link></li>
            </ul>
          </div>

          {/* Contact & Social (UI UNCHANGED) */}
          <div className="col-lg-3 col-md-6">
            <h2 className="footer-title text-light mb-3 fs-6">Contact Us</h2>

            <p className="text-light-50 mb-2">
              📧{" "}
              <span aria-label="Email BrandSetu Digital">
                Brandsetudigital@gmail.com
              </span>
            </p>

            <p className="text-light-50 mb-3">
              📞{" "}
              <span aria-label="Phone number">
                +91 6232363639
              </span>
            </p>

            <div
              className="social-wrapper"
              aria-label="BrandSetu social media links"
            >
              <motion.a
                whileHover={{ scale: 1.2 }}
                className="social-btn"
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BrandSetu on LinkedIn"
              >
                <FaLinkedinIn aria-hidden="true" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.2 }}
                className="social-btn"
                href="https://www.instagram.com/brandsetudigital?igsh=NDMyNzc4aHkxOW02"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BrandSetu on Instagram"
              >
                <FaInstagram aria-hidden="true" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.2 }}
                className="social-btn"
                href="https://www.facebook.com/share/1GsguCpjJq/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BrandSetu on Facebook"
              >
                <FaFacebookF aria-hidden="true" />
              </motion.a>
            </div>
          </div>
        </div>

        <hr className="footer-divider my-2" aria-hidden="true" />

        <motion.div
          className="d-flex justify-content-between flex-column flex-md-row text-light-50 small"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span>
            © {new Date().getFullYear()} BrandSetu Digitals. All rights reserved.
          </span>
          <span>Designed & Developed by BrandSetu Team</span>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
