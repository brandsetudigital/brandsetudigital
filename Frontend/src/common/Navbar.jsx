import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar as BSNavbar, Nav, Button } from "react-bootstrap";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Logo.webp";
import "../App.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Work ", path: "/work" },
    { name: "Enquiry", path: "/contact" },
    { name: "Our Story", path: "/about" },
    { name: "Future", path: "/career" },
  ];

  // Lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // Close mobile menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const toggleMenu = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen((prev) => !prev);
  };

  const handleLinkClick = (path) => {
    setIsOpen(false);
    if (location.pathname !== path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <div className="navbar-container">
        <motion.div
          className="navbar-wrapper"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <BSNavbar
            className="navbar-custom rounded-pill"
            role="navigation"
            aria-label="Main navigation"
          >
            {/* BRAND */}
            <Link to="/" className="brand-wrapper ms-3">
              <img
                src={logo}
                alt="BrandSetu Digital logo"
                className="logo-img"
                width="48"
                height="48"
                loading="eager"
                fetchpriority="high"
                decoding="async"
              />
              <div className="logo-text">
                <div className="logo-title">BRANDSETU</div>
                <div className="logo-subtitle">DIGITAL</div>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <Nav className="d-none d-lg-flex nav-links-wrapper ms-auto me-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="nav-link-custom"
                  aria-current={
                    location.pathname === link.path ? "page" : undefined
                  }
                >
                  {link.name}
                </Link>
              ))}

              <Button
                type="button"
                className="main-btn rounded-pill px-4 d-flex align-items-center gap-2"
                onClick={() =>
                  window.open("https://wa.me/917389824231", "_blank")
                }
                aria-label="Let's Talk on WhatsApp"
              >
                Let's Talk{" "}
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </Nav>

            {/* MOBILE TOGGLE */}
            <div className="d-lg-none ms-auto me-3">
              <Button
                type="button"
                variant="link"
                className="text-white p-0"
                onClick={toggleMenu}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                {isOpen ? (
                  <X size={28} aria-hidden="true" />
                ) : (
                  <Menu size={28} aria-hidden="true" />
                )}
              </Button>
            </div>
          </BSNavbar>
        </motion.div>
      </div>

      {/* FULLSCREEN MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu-full"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            tabIndex="-1"
            initial={{ opacity: 0, y: "-10%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-10%" }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            <div className="mobile-menu-content">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07 }}
                >
                  <Link
                    to={link.path}
                    className="mobile-link-modern"
                    onClick={() => handleLinkClick(link.path)}
                    aria-current={
                      location.pathname === link.path ? "page" : undefined
                    }
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <Button
                type="button"
                className="main-btn rounded-pill mt-4 px-5 py-2 d-flex align-items-center justify-content-center gap-2"
                onClick={() =>
                  window.open("https://wa.me/917389824231", "_blank")
                }
                aria-label="Let's Talk on WhatsApp"
              >
                Let's Talk{" "}
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
