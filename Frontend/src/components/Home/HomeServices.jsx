import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Search,
  Share2,
  BarChart3,
  Palette,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import "../../Style/Home.css";
import "../../App.css";
import websitedevelopmentcompany from "../../assets/website-development-company.webp";
import automationandmaintainance from "../../assets/autimationandmaintainance.jpg";
import shootandvideo from "../../assets/shootandvideo.jpg";
import WhatsappMarketing from "../../assets/whatsapp-marketing-services.avif";

const services = [
  {
    slug: "website-development-company-indore",
    title: "Website/App Design & Development",
    desc: "We craft high-performing, visually stunning websites that convert visitors into customers. Our focus is speed, UX, SEO readiness, and scalability.",
    points: [
      "Custom UI/UX Design",
      "Fast & SEO Optimized",
      "Mobile-first Approach",
      "Conversion Focused",
      "Graphics Design & E-commerce",
    ],
    icon: Monitor,
    image: websitedevelopmentcompany,
    subtitle: "Design • Performance • Conversion",
  },
  {
    slug: "crm-setup-business-automation",
    title: "Automation & Maintenance",
    desc: "We provide reliable maintenance to keep your digital assets running smoothly. This includes updates, security monitoring, and performance optimization.",
    points: [
      "Workflow automation solutions",
      "API & tool integrations",
      "Performance optimization",
      "Ongoing technical support",
      "CRM setup & Business Automation",
    ],
    icon: Monitor,
    image: automationandmaintainance,
    subtitle: "Automation • Stability • Support",
  },
  {
    slug: "product-photography-video-production-indore",
    title: "Shoots & Video Editing",
    desc: "Build a strong brand presence with engaging content, reels, campaigns, and data-driven growth strategies.",
    points: [
      "Reels, shorts & social videos",
      "Promotional & ad video editing",
      "Product & brand shoots",
      "High-quality visual assets",
      "Event & Product Shoot/Promotion",
    ],
    icon: Monitor,
    image: shootandvideo,
    subtitle: "Creativity • Storytelling • Impact",
  },
  {
    slug: "social-media-marketing-agency-indore",
    title: "WhatsApp/Instagram Marketing",
    desc: "We create meaningful connections that drive engagement, growth, and results.",
    points: [
      "Instant Communication & High Engagement",
      "Cost-Effective & Interactive Features",
      "Customer Support",
      "Broadcast & Group",
    ],
    icon: Monitor,
    image: WhatsappMarketing,
    subtitle: "Engagement • Reach • Conversations",
  },
  {
    slug: "seo-services-indore",
    title: "SEO (Search Engine Optimization) & Local Visibility",
    desc: "Rank higher on Google and dominate your local market with proven SEO strategies that bring consistent organic traffic.",
    points: [
      "Keyword Research",
      "On-Page SEO",
      "Google My Business",
      "Local Ranking Boost",
    ],
    icon: Search,
    image:
      "https://img.freepik.com/premium-vector/seo-search-engine-optimization-concept-vector-illustration_185038-486.jpg",
    subtitle: "Ranking • Visibility • Traffic",
  },
  {
    slug: "social-media-marketing-agency-indore",
    title: "Social Media Marketing",
    desc: "Build a strong brand presence with engaging content, reels, campaigns, and data-driven growth strategies.",
    points: [
      "Content Strategy",
      "Reels & Creatives",
      "Audience Growth",
      "Brand Engagement",
    ],
    icon: Share2,
    image:
      "https://gosharpener.com/content/uploads/photos/2024/09/sngine_554b7fb4220580094ff96ca152962eb8.jpg",
    subtitle: "Content • Engagement • Growth",
  },
  {
    slug: "google-ads-agency-indore",
    title: "Google & Meta Ads",
    desc: "ROI-focused paid campaigns that generate leads, sales, and measurable business growth.",
    points: [
      "Lead Generation",
      "Performance Ads",
      "A/B Testing",
      "High ROI Campaigns",
      "CGI Ads",
    ],
    icon: BarChart3,
    image:
      "https://img.freepik.com/free-vector/pop-ups-concept-illustrated_23-2149121840.jpg",
    subtitle: "Targeting • ROI • Performance",
  },
  {
    slug: "branding-strategy",
    title: "Branding & Graphic Design",
    desc: "Designs that communicate your brand story with clarity, creativity, and consistency.",
    points: [
      "Brand Identity",
      "Logo Design",
      "Social Creatives",
      "Marketing Collaterals",
    ],
    icon: Palette,
    image:
      "https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2024/01/9_types_graphic_design.jpg",
    subtitle: "Identity • Consistency • Recognition",
  },
];

export default function Services() {
  const [activeService, setActiveService] = useState(services[0]);
  const previewRef = useRef(null);
  const navigate = useNavigate();

  const handleServiceHover = (service) => {
    setActiveService(service);
  };

  const handleServiceClick = (service) => {
    navigate(`/services/${service.slug}`);
  };

  return (
    <section className="services-section py-5 mt-5 pt-5" id="services-section">
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      <div className="container services-inner mt-4">
        {/* HEADER */}
        <div className="text-center mb-5">
          <span className="services-badge d-inline-flex align-items-center gap-1">
            <Sparkles size={14} /> OUR SERVICES
          </span>
          <h2 className="display-3 fw-bold text-white mt-3">
            Powerful Digital Solutions
          </h2>
          <p className="text-light opacity-75 fs-5 mt-2">
            Everything your brand needs to grow digitally • Hover to preview, Click to explore
          </p>
        </div>

        <div className="row align-items-center">
          {/* LEFT — PREVIEW */}
          <div className="col-lg-6 mb-4 mb-lg-0" ref={previewRef}>
            <div className="service-preview glass-card p-4 p-md-5 rounded-4 shadow-lg position-relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  <div
                    className="preview-img-container mb-4 rounded-4 overflow-hidden position-relative"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleServiceClick(activeService)}
                  >
                    <img
                      src={activeService.image}
                      alt={`${activeService.title} — BrandSetu Digital service preview`}
                      className="img-fluid preview-image w-100 rounded-4"
                      width="800"
                      height="500"
                      loading="lazy"
                      decoding="async"
                      style={{ height: "260px", objectFit: "cover" }}
                    />
                    <div className="position-absolute bottom-0 end-0 p-3">
                      <span className="badge bg-dark text-warning border border-warning px-3 py-2 rounded-pill fw-bold">
                        Click to View Details →
                      </span>
                    </div>
                  </div>

                  <h3 className="fw-bold text-white display-6 mb-2">{activeService.title}</h3>

                  <p className="preview-desc mt-2 text-light opacity-90 fs-6 lh-base">{activeService.desc}</p>

                  <ul className="service-points mt-3 d-flex flex-wrap gap-2 list-unstyled">
                    {activeService.points.map((point, i) => (
                      <li
                        key={i}
                        className="badge bg-dark bg-opacity-75 text-warning border border-secondary px-3 py-2 rounded-pill fw-normal"
                      >
                        ✓ {point}
                      </li>
                    ))}
                  </ul>

                  <button
                    className="btn btn-warning rounded-pill px-4 py-3 fw-bold mt-4 d-inline-flex align-items-center gap-2 shadow"
                    onClick={() => handleServiceClick(activeService)}
                  >
                    Explore {activeService.title} <ArrowRight size={18} />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT — LIST */}
          <div className="col-lg-6">
            <div className="service-list d-flex flex-column gap-3">
              {services.map((service, i) => {
                const Icon = service.icon;
                const isActive = activeService.title === service.title;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02, x: 6 }}
                    whileTap={{ scale: 0.98 }}
                    className={`service-item ${isActive ? "active" : ""}`}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => handleServiceHover(service)}
                    onClick={() => handleServiceClick(service)}
                  >
                    <div className="service-icon">
                      <Icon size={26} />
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-center">
                        <h3 className="fw-bold mb-1 fs-5">{service.title}</h3>
                        <ArrowRight
                          size={18}
                          className={`transition-all ${
                            isActive ? "text-warning translate-x-1" : "opacity-50"
                          }`}
                        />
                      </div>
                      <p className="mb-0 text-secondary small">{service.subtitle}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
