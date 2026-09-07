import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../Style/Home.css";
import "../../App.css";
import "../../Style/Services.css";
import { servicesData } from "../../data/servicesData";

const DetailedServices = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visiblePosts, setVisiblePosts] = useState(servicesData);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  useEffect(() => {
    setVisiblePosts(
      activeCategory === "All"
        ? servicesData
        : servicesData.filter((p) => p.category === activeCategory)
    );
  }, [activeCategory]);

  const categories = [
    "All",
    "Marketing",
    "Development",
    "Creative",
    "Media",
    "Advertising",
    "Branding",
    "Support",
    "Automation",
  ];

  const handleCardClick = (slug) => {
    navigate(`/services/${slug}`);
  };

  return (
    <section className="detailed-services-section py-5 position-relative">
      <div className="container text-center mb-5">
        <span className="brands-pill fw-bold">OUR SERVICE PORTFOLIO</span>

        <h2 className="display-3 fw-bold text-dark mb-3">
          High-Impact Digital <span className="text-danger">Marketing & Tech</span> Services
        </h2>
        <p className="fs-5 text-dark fw-semibold opacity-85 col-lg-8 mx-auto">
          Result-oriented digital solutions engineered to scale your audience, authority, and revenue.
        </p>

        {/* Categories Navigation Bar */}
        <div className="services-filter-container d-flex justify-content-center gap-2 gap-md-3 mt-4 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`service-filter-btn ${
                activeCategory === cat ? "active" : ""
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="container px-3 px-md-4">
        <motion.div layout className="row g-4 g-lg-5">
          <AnimatePresence>
            {visiblePosts.map((post, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="col-12 col-lg-6 mb-3"
                key={post.id || post.slug || index}
              >
                <div
                  className="service-card"
                  onClick={() => handleCardClick(post.slug)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Left Side: Rounded Image Box */}
                  <div className="service-img-box">
                    <img
                      src={post.img}
                      alt={`${post.title} — BrandSetu Digital service`}
                      className="service-img"
                      width="250"
                      height="150"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Right Side: Title, Description, Read More */}
                  <div className="service-card-info">
                    <h3 className="fw-bold fs-4 mb-2 text-dark">
                      {post.title}
                    </h3>
                    <p className="mb-3 text-dark opacity-90" style={{ lineHeight: 1.55 }}>
                      {post.shortDesc || post.desc}
                    </p>
                    <Link
                      to={`/services/${post.slug}`}
                      className="read-more-link fw-bold"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>→ Read More</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default DetailedServices;
