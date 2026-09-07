import React from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Style/Home.css";
import "../../App.css";

export default function HomeCTA() {
  return (
    <section className="final-cta-section py-5 my-5 position-relative">
      <Container>
        <div className="cta-card rounded-5 p-4 p-md-5 text-center text-white position-relative overflow-hidden shadow-lg bg-dark">
          {/* Decorative Glowing Blobs */}
          <div className="bg-blob blob-1"></div>
          <div className="bg-blob blob-2"></div>

          <div className="position-relative z-2 py-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="d-inline-flex align-items-center gap-2 mb-3 px-3 py-1 rounded-pill bg-white text-dark fw-bold small"
            >
              <Sparkles size={16} className="text-danger" />
              <span>READY FOR REAL GROWTH?</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="display-3 fw-black mb-3"
            >
              Let’s Grow Your <span className="text-danger">Brand</span> Together
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="fs-5 text-light-50 fw-medium col-lg-8 mx-auto mb-4"
            >
              Partner with BrandSetu Digital for high-impact branding, SEO, performance marketing, and cutting-edge tech that drives revenue.
            </motion.p>

            <div className="d-flex flex-wrap justify-content-center gap-3 gap-md-4 mb-4 pb-2">
              <div className="d-flex align-items-center gap-2 text-light fw-semibold small">
                <CheckCircle2 size={18} className="text-warning" />
                <span>Custom Strategy</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-light fw-semibold small">
                <CheckCircle2 size={18} className="text-warning" />
                <span>Transparent Reporting</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-light fw-semibold small">
                <CheckCircle2 size={18} className="text-warning" />
                <span>Proven ROI</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="d-flex flex-wrap justify-content-center gap-3"
            >
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-light btn-lg fw-bold rounded-pill px-4 py-3 shadow text-dark d-inline-flex align-items-center gap-2"
                >
                  <span>Start Your Project</span>
                  <ArrowRight size={20} />
                </motion.button>
              </Link>

              <a href="tel:+917389824231">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline-light btn-lg fw-bold rounded-pill px-4 py-3 d-inline-flex align-items-center gap-2"
                >
                  <PhoneCall size={18} className="text-warning" />
                  <span>+91 7389824231</span>
                </motion.button>
              </a>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
