import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { Layers } from "lucide-react";
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
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="d-inline-flex align-items-center gap-2 mb-3 services-pill-badge"
        >
          <Layers size={16} className="text-warning" />
          <span>OUR SERVICE PORTFOLIO</span>
        </motion.div>

        <h2 className="display-4 fw-black text-white mb-3 detailed-services-heading">
          High-Impact Digital <span className="text-warning">Marketing & Tech</span> Services
        </h2>
        <p className="detailed-services-subtitle lead fw-medium mx-auto">
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
        <motion.div layout className="row g-4 g-lg-4">
          <AnimatePresence>
            {visiblePosts.map((post, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="col-12 col-md-6 col-lg-4 d-flex"
                key={post.id || post.slug || index}
              >
                <div
                  className="modern-service-item-card w-100 d-flex flex-column"
                  onClick={() => handleCardClick(post.slug)}
                >
                  {/* IMAGE CONTAINER WITH CATEGORY TAG */}
                  <div className="modern-service-img-wrapper position-relative">
                    <img
                      src={post.img}
                      alt={`${post.title} — BrandSetu Digital service`}
                      className="modern-service-img"
                      width="400"
                      height="240"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="service-card-tag">
                      {post.category || "Service"}
                    </div>
                  </div>

                  {/* CARD BODY */}
                  <div className="service-card-body d-flex flex-column justify-content-between flex-grow-1 p-4">
                    <div>
                      <h3 className="service-card-title text-white fs-5 fw-bold mb-2">
                        {post.title}
                      </h3>
                      <p className="service-card-description mb-3">
                        {post.shortDesc || post.desc}
                      </p>
                    </div>

                    <div className="service-card-action pt-3 mt-auto border-top border-dark-subtle d-flex align-items-center justify-content-between">
                      <Link
                        to={`/services/${post.slug}`}
                        className="service-explore-link d-inline-flex align-items-center gap-2 fw-bold text-decoration-none"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Explore Service</span>
                        <BsArrowRight className="explore-arrow" />
                      </Link>
                    </div>
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
