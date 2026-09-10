import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "../../Style/Home.css";
import "../../App.css";
import vision from "../../assets/vision.png";
import mission from "../../assets/mission.png";
import innovation from "../../assets/innovation.png";

const values = [
  {
    title: "VISION",
    img: vision,
    desc:
      "Our vision is to transform businesses into powerful brands by creating meaningful digital experiences that inspire trust, growth, and long term success.",
  },
  {
    title: "MISSION",
    img: mission,
    desc:
      "We empower businesses with result driven digital solutions, strategic marketing, and innovative technology to help them scale with confidence.",
  },
  {
    title: "INNOVATION",
    img: innovation,
    desc:
      "We continuously explore new technologies, creative ideas, and data-driven strategies to keep brands ahead in a fast changing digital world.",
  },
];

const MissionValues = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="pt-2 pb-5">
      <div className="container text-center">
        <h2 className="fw-bold mb-3 text-brand">
          Our Mission <span className="text-danger">&</span> Vision
        </h2>

        <p className="mb-4">
          At BrandSetu, we bridge the gap between businesses and branding through
          strategy, creativity, and technology driven solutions.
        </p>

        <div className="row g-4">
          {values.map((item, idx) => (
            <div
              key={idx}
              className={`col-12 col-sm-6 col-lg-4 d-flex flex-column align-items-center ${
                idx !== values.length - 1 ? "border-lg-end" : ""
              }`}
              style={{
                borderRight:
                  idx !== values.length - 1 ? "1px solid #000000ff" : "none",
              }}
            >
              <div
                className="rounded-10 shadow-md h-100 section uscard w-100"
                data-aos="zoom-in-up"
              >
                <img
                  src={item.img}
                  alt={`${item.title} — BrandSetu Digital`}
                  className="card-img-top p-3"
                  width="180"
                  height="180"
                  loading="lazy"
                  decoding="async"
                  style={{ height: "180px", objectFit: "contain" }}
                />

                <div className="card-body">
                  <h3 className="fw-bold fs-5">{item.title}</h3>
                  <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <Link to="/work">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-dark btn-lg fw-bold rounded-pill px-5 py-3 shadow"
            >
              Explore Full Portfolio <ArrowRight size={20} className="ms-1" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MissionValues;
