import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Logo from "../assets/Logo.webp";
import { FaLinkedinIn, FaInstagram, FaFacebookF, FaWhatsapp, FaTwitter } from "react-icons/fa";
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
          className="particle"
          initial={{
            y: 0,
            x: Math.random() * 100 - 50,
            opacity: Math.random() * 0.5 + 0.2,
          }}
          animate={{
            y: [-20, -100],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{ pointerEvents: "none" }}
        />
      ))}

      <div className="container py-3 position-relative" style={{ zIndex: 2 }}>
        <div className="row gy-4 footer-main-row">
          {/* Brand */}
          <div className="col-lg-3 col-md-6 footer-brand-col">
            <div className="footer-brand d-flex align-items-center gap-2 mb-3">
              <img
                src={Logo}
                alt="BrandSetu Digital logo"
                className="footer-logo-img"
                width="48"
                height="48"
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
            className="col-lg-3 col-md-6 footer-links-col"
            aria-label="Footer quick links"
          >
            <h2 className="footer-title text-light mb-3 fs-6">Quick Links</h2>
            <ul className="list-unstyled footer-links footer-quick-links-grid">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/work">Portfolio</Link></li>
              <li><Link to="/about">Our Story</Link></li>
              <li className="d-md-none"><Link to="/career">Careers</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div
            className="col-lg-3 col-md-6 footer-services-col"
            aria-label="Footer services"
          >
            <h2 className="footer-title text-light mb-3 fs-6">Services</h2>
            <ul className="list-unstyled footer-links footer-services-grid">
              <li><Link to="/services/google-ads-agency-indore">Performance Marketing</Link></li>
              <li><Link to="/services/social-media-marketing-agency-indore">Social Media Management</Link></li>
              <li><Link to="/services/branding-strategy">Branding & Strategy</Link></li>
              <li><Link to="/services/product-photography-video-production-indore">Content Creation</Link></li>
              <li><Link to="/services/influencer-marketing-agency-indore">Influencer Marketing</Link></li>
              <li><Link to="/services/seo-services-indore">SEO & Outreach</Link></li>
              {/* Extra services visible on mobile 2-column view */}
              <li className="d-md-none"><Link to="/services/website-development-company-indore">Website Development</Link></li>
              <li className="d-md-none"><Link to="/services/app-development-company-indore">App Development</Link></li>
              <li className="d-md-none"><Link to="/services/graphic-design-services-indore">Graphic Design</Link></li>
              <li className="d-md-none"><Link to="/services/cgi-ads">CGI Ads</Link></li>
              <li className="d-md-none"><Link to="/services/crm-setup-business-automation">Business Automation</Link></li>
              <li className="d-md-none"><Link to="/services/website-maintenance-services-indore">Website Maintenance</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div
            className="col-lg-3 col-md-6 footer-contact-col"
            aria-label="Footer contact information"
          >
            <h2 className="footer-title text-light mb-3 fs-6">Get in Touch</h2>
            <p className="text-light-50 mb-2">📍 Indore, Madhya Pradesh</p>
            <p className="text-light-50 mb-2">
              ✉️{" "}
              <a href="mailto:Brandsetudigital@gmail.com" className="text-light text-decoration-none" aria-label="Email BrandSetu Digital">
                Brandsetudigital@gmail.com
              </a>
            </p>

            <p className="text-light-50 mb-3">
              📞{" "}
              <a href="tel:+917389824231" className="text-light text-decoration-none">
                +91 7389824231
              </a>
              {" "}|{" "}
              <a href="tel:+919669765911" className="text-light text-decoration-none">
                +91 96697 65911
              </a>
            </p>

            <div
              className="social-wrapper"
              aria-label="BrandSetu social media links"
            >
              <motion.a
                whileHover={{ scale: 1.2 }}
                className="social-btn"
                href="https://www.linkedin.com/in/brand-setu-digital-5361ab410/"
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

              <motion.a
                whileHover={{ scale: 1.2 }}
                className="social-btn"
                href="https://wa.me/917389824231"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BrandSetu on WhatsApp"
              >
                <FaWhatsapp aria-hidden="true" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.2 }}
                className="social-btn"
                href="https://x.com/brandsetudigita"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BrandSetu on Twitter"
              >
                <FaTwitter aria-hidden="true" />
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
