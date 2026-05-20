import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Star } from "lucide-react";
import { Link } from "react-router-dom"; // ✅ Import Link
import heroVideo from "../../assets/digital-marketing-agency.mp4";
import "../../App.css";
import "../../Style/Home.css";
import Services from "../../components/Home/HomeServices";
import Brands from "../../components/Home/brands";
import Reviews from "../../components/Home/review";
import WhySetu from "./whyus";
import FounderPage from "./founder";
import Seo from "../Seo";

export function Hero() {
  const stats = [
    { value: "500+", label: "Projects" },
    { value: "98%", label: "Success Rate" },
    { value: "350+", label: "Clients" },
  ];

  const stackedCards = [
    { color: "card-white", rotate: -6, z: 30, delay: 0 },
    { color: "card-dark", rotate: 3, z: 20, delay: 0.2 },
    { color: "card-white", rotate: -3, z: 10, delay: 0.4 },
  ];

  const floatingShapes = [...Array(30)].map(() => ({
    size: Math.floor(Math.random() * 120 + 30),
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <>
      <Seo
        title="Digital Marketing & SEO Agency in Indore"
        description="BrandSetu Digital is a top digital marketing agency in Indore offering SEO, branding, social media marketing, web development, and performance ads to help businesses grow online."
        path="/"
      />
      <section
        id="home"
        className="hero-section d-flex align-items-center position-relative overflow-hidden"
      >
        {/* Background Shapes */}
        <div className="hero-background position-absolute w-100 h-100">
          {floatingShapes.map((shape, i) => (
            <motion.div
              key={i}
              className="floating-shape position-absolute rounded-circle"
              style={{
                width: shape.size,
                height: shape.size,
                left: `${shape.left}%`,
                top: `${shape.top}%`,
              }}
              animate={{
                y: [0, Math.random() * 80 - 40, 0],
                x: [0, Math.random() * 80 - 40, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: shape.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: shape.delay,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="container position-relative z-1">
          <div className="row align-items-center">
            {/* LEFT */}
            <div className="col-lg-6 hero-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="badge-custom mb-4 d-inline-flex align-items-center gap-2"
              >
                <Star size={12} fill="#facc15" stroke="#facc15" />
                Award-Winning Marketing Agency
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-4"
              >
                <h1 className="hero-title">
                  <span className="d-block">BUILD</span>
                  <span className="d-block text-white">YOUR</span>
                  <span className="d-block">BRAND</span>
                  <span className="visually-hidden">With BrandSetu Digital</span>
                </h1>
                <p className="visually-hidden">
                  BrandSetu Digital — a digital marketing and SEO agency in
                  Indore helping businesses build their brand online.
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="hero-description ms-1"
              >
                We help businesses grow with result-driven digital marketing,
                branding, SEO, social media marketing, and performance-focused
                online strategies.
              </motion.p>

              {/* Navigation Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="hero-left-buttons"
              >
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-dark btn-lg fw-bold rounded-pill px-4 py-3"
                  >
                    Start Your Project <ArrowRight size={20} />
                  </motion.button>
                </Link>

                <Link to="/work#work-section">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-light btn-lg fw-bold rounded-pill px-4 py-3"
                  >
                    <Play size={20} /> View Our Work
                  </motion.button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="stats-bar ms-1 d-flex justify-content-between mt-5 p-4"
              >
                {stats.map((stat, i) => (
                  <div key={i} className="text-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + i * 0.1, type: "spring" }}
                      className="stat-value"
                    >
                      {stat.value}
                    </motion.div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT */}
            <div className="col-lg-5 d-none d-lg-block position-relative ms-5">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="position-relative h-100"
              >
                <div className="stacked-cards position-relative">
                  {stackedCards.map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 100, rotate: 0 }}
                      animate={{ opacity: 1, y: 0, rotate: card.rotate }}
                      transition={{
                        duration: 0.8,
                        delay: card.delay,
                        type: "spring",
                      }}
                      className={`stack-card ${card.color}`}
                      style={{ zIndex: card.z }}
                    >
                      {/* IMAGE ON FIRST CARD */}
                      {i === 0 && (
                        <div className="card-logo p-4">
                          <motion.video
                            src={heroVideo}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            aria-label="BrandSetu Digital marketing agency showreel"
                            width="500"
                            height="500"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "1.5rem",
                            }}
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                      )}
                    </motion.div>
                  ))}

                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="floating-elements fast-result"
                  >
                    ⚡ Fast Results
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    className="floating-elements roi"
                  >
                    🎯 100% ROI
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                    className="floating-elements rating"
                  >
                    ⭐ 4.5+ Rating
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Home Sections */}
          <Brands />
          <Services />
          <WhySetu />
          <FounderPage />
          <Reviews />
        </div>
      </section>
    </>
  );
}
