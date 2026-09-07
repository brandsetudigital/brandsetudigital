import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../App.css";
import "../../Style/Home.css";

import BlueLeaf from "../../assets/Sage.png";
import BrightPath from "../../assets/brightpath.png";
import UrbanSpice from "../../assets/urbanspices.png";
import SparkLab from "../../assets/sparklab.png";
import GreenBasket from "../../assets/greenbasket.png";
import HillView from "../../assets/hillview.png";
import Craftory from "../../assets/craftory.png";
import LocalRoot from "../../assets/localroot.png";
import PixelNest from "../../assets/PixelNest.png";
import MotionFit from "../../assets/motionfit.png";
import NextWave from "../../assets/nextwave.png";
import Bakery24 from "../../assets/bakery24.png";

export const reviews = [
  {
    name: "Aarav Mehta",
    role: "Founder, Sage University",
    review:
      "BrandSetu transformed our online identity. Clean, creative, and premium work that truly stands out.",
    image: BlueLeaf,
    color: "#E0F7F4",
  },
  {
    name: "Ritika Sharma",
    role: "Owner, BrightPath Academy",
    review:
      "Their strategy and design solutions are top-notch. They helped elevate our brand to a new level.",
    image: BrightPath,
    color: "#F3F0FF",
  },
  {
    name: "Nikhil Verma",
    role: "Owner, Urban Spice Kitchen",
    review:
      "Excellent communication and creative execution. Highly recommend their marketing services.",
    image: UrbanSpice,
    color: "#FFF3E6",
  },
  {
    name: "Pooja Jain",
    role: "Director, Spark Digital Lab",
    review:
      "Professional and reliable team. They helped us achieve measurable results quickly.",
    image: SparkLab,
    color: "#F4F7FF",
  },
  {
    name: "Karan Singh",
    role: "Manager, GreenBasket Mart",
    review:
      "Creative solutions and attention to detail. Our online presence improved dramatically.",
    image: GreenBasket,
    color: "#EDF8F0",
  },
  {
    name: "Ananya Kapoor",
    role: "Founder, HillView Stays",
    review:
      "Seamless execution and excellent branding insights. A very dependable team.",
    image: HillView,
    color: "#EEF6FF",
  },
  {
    name: "Rohan Mehta",
    role: "CEO, Craftory Co.",
    review:
      "Innovative ideas and creative strategy. BrandSetu truly understands our business needs.",
    image: Craftory,
    color: "#FFF6ED",
  },
  {
    name: "Siddharth Iyer",
    role: "Owner, LocalRoots Organics",
    review:
      "High-quality branding and marketing services. They delivered beyond our expectations.",
    image: LocalRoot,
    color: "#F0FAF3",
  },
  {
    name: "Priya Malhotra",
    role: "Co-Founder, PixelNest Studio",
    review:
      "From ideation to execution, everything was smooth. Highly recommended for startups.",
    image: PixelNest,
    color: "#EEF2FF",
  },
  {
    name: "Vikram Desai",
    role: "Director, MotionFit Studio",
    review:
      "Creative and innovative solutions with measurable results. Great experience overall.",
    image: MotionFit,
    color: "#F1F5F9",
  },
  {
    name: "Neha Sharma",
    role: "Founder, NextWave Solutions",
    review:
      "Professional team delivering exactly what they promise. Our brand has never looked better.",
    image: NextWave,
    color: "#EDF3FF",
  },
  {
    name: "Raghav Bansal",
    role: "CEO, BakeHouse 24",
    review:
      "Excellent branding and marketing support. Fast delivery and amazing results.",
    image: Bakery24,
    color: "#FFF1E6",
  },
];

export default function Reviews() {
  const [page, setPage] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [pageSize, setPageSize] = useState(3);

  /* 🔑 RESPONSIVE PAGE SIZE (NO UI CHANGE) */
  useEffect(() => {
    const updatePageSize = () => {
      if (window.innerWidth < 576) setPageSize(1);
      else if (window.innerWidth < 992) setPageSize(2);
      else setPageSize(3);
    };

    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  const totalPages = Math.ceil(reviews.length / pageSize);

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.userAgent === "ReactSnap") {
      return;
    }
    if (hovered) return;
    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 3000);
    return () => clearInterval(interval);
  }, [hovered, totalPages]);

  const currentReviews = reviews.slice(
    page * pageSize,
    page * pageSize + pageSize
  );

  return (
    <section className="reviews-modern-section">
      <div className="container">
        <motion.div
          className="text-center mb-5 header-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="brands-pill fw-bold">
            CLIENT LOVE
          </span>
          <h2 className="display-2 fw-bold">
            What <span className="text-danger">Our Clients </span>
            <span className="gradient-text">Say</span>
          </h2>
          <p className="lead text-muted fw-semibold">
            Real feedback from real clients
          </p>
        </motion.div>

        <div
          className="reviews-modern-carousel p-2"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              className="reviews-modern-wrapper"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              {currentReviews.map((item, index) => (
                <motion.div
                  key={index}
                  className="review-card-modern"
                  style={{ backgroundColor: item.color }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="review-top">
                    <img
                      src={item.image}
                      alt={`${item.name} — ${item.role}`}
                      className="review-logo"
                      width="64"
                      height="64"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="quote-icon">“</span>
                  </div>
                  <p className="review-text">{item.review}</p>
                  <div className="reviewer-info">
                    <p className="fw-bold mb-0">{item.name}</p>
                    <span>{item.role}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
