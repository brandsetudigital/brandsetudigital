import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
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
    <section className="py-5">
      <div className="container text-center mb-5">
        <h2 className="text-brand display-3 fw-bold mb-3">
          BrandSetu<span className="text-danger"> Marketing</span> Services
        </h2>
        <p className="text-dark opacity-75 fw-semibold lead">
          Best Digital marketing services that help your brand grow
        </p>

        <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn ${
                activeCategory === cat ? "btn-dark" : "btn-outline-dark"
              } rounded-pill px-4`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="container-fluid px-3 px-md-5 px-xl-5">
        <div className="row g-4 g-lg-5">
          {visiblePosts.map((post, index) => (
            <div className="col-md-6 d-flex" key={post.id || index} data-aos="fade-up">
              <div
                className="service-card d-flex gap-4 align-items-start w-100"
                style={{ cursor: "pointer" }}
                onClick={() => handleCardClick(post.slug)}
              >
                {/* IMAGE */}
                <div className="service-img-box shadow flex-shrink-0">
                  <img
                    src={post.img}
                    alt={`${post.title} — BrandSetu Digital service`}
                    className="service-img"
                    width="400"
                    height="300"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* TEXT */}
                <div className="d-flex flex-column justify-content-between w-100">
                  <div>
                    <h3 className="fw-bold fs-5 text-dark mb-2">{post.title}</h3>
                    <p className="text-dark fw-semibold mb-3">{post.shortDesc || post.desc}</p>
                  </div>

                  <div className="mt-auto">
                    <Link
                      to={`/services/${post.slug}`}
                      className="read-more-link d-inline-flex align-items-center fw-bold text-decoration-none"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <BsArrowRight className="me-2" />
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DetailedServices;
