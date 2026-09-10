import React, { useState, useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  BookOpen,
  Home,
  BookMarked,
  Award,
  Zap,
} from "lucide-react";
import { serviceHubsData, blogsData } from "../../data/blogsData";
import Seo from "../Seo";
import "../../Style/Blog.css";
import "../../Style/Home.css";

export default function ServiceBlogLanding() {
  const { serviceSlug } = useParams();
  const service = serviceHubsData[serviceSlug];

  const [selectedFunnel, setSelectedFunnel] = useState("All");
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Filter articles belonging to this specific service
  const serviceArticles = useMemo(() => {
    if (!service) return [];
    return blogsData.filter(
      (b) => b.serviceSlug === serviceSlug || b.category.toLowerCase().includes(serviceSlug.replace(/-/g, " "))
    );
  }, [service, serviceSlug]);

  // Funnel-filtered articles
  const displayedArticles = useMemo(() => {
    if (selectedFunnel === "All") return serviceArticles;
    return serviceArticles.filter((b) => b.funnelStage === selectedFunnel);
  }, [serviceArticles, selectedFunnel]);

  // Featured article for this service
  const featuredArticle = useMemo(() => {
    return serviceArticles.find((b) => b.featured) || serviceArticles[0];
  }, [serviceArticles]);

  // Ambient floating background particles
  const floatingShapes = useMemo(
    () =>
      Array.from({ length: 25 }).map(() => ({
        size: Math.floor(Math.random() * 90 + 30),
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 14 + 10,
        delay: Math.random() * 4,
      })),
    []
  );

  // If service doesn't exist in registry, check if it's an article slug for backward compatibility
  if (!service) {
    const legacyArticle = blogsData.find((b) => b.slug === serviceSlug);
    if (legacyArticle) {
      return (
        <Navigate
          to={`/blog/${legacyArticle.serviceSlug || "seo"}/${legacyArticle.slug}`}
          replace
        />
      );
    }
    return <Navigate to="/blog" replace />;
  }

  // Generate FAQ Schema for Google Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": (service.faqs || []).map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://brandsetudigital.com/",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://brandsetudigital.com/blog",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.name,
        "item": `https://brandsetudigital.com/blog/${service.slug}`,
      },
    ],
  };

  return (
    <div className="blog-page-wrapper position-relative">
      <Seo
        title={`${service.heroTitle} | BrandSetu Digital`}
        description={service.heroSubtitle}
        path={`/blog/${service.slug}`}
        jsonLd={[faqSchema, breadcrumbsSchema]}
      />

      {/* Background Blobs */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      {/* ================= 02. HERO SECTION ================= */}
      <section className="blog-hero-section position-relative overflow-hidden text-center">
        {/* Ambient Floating Shapes */}
        <div className="position-absolute w-100 h-100 top-0 start-0 pointer-events-none" style={{ zIndex: 0 }}>
          {floatingShapes.map((shape, i) => (
            <motion.div
              key={i}
              className="blog-floating-shape"
              style={{
                width: shape.size,
                height: shape.size,
                left: `${shape.left}%`,
                top: `${shape.top}%`,
              }}
              animate={{
                y: [0, Math.random() * 50 - 25, 0],
                x: [0, Math.random() * 50 - 25, 0],
                scale: [1, 1.2, 1],
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

        <Container className="position-relative z-2">
          {/* Breadcrumbs on Yellow */}
          <div className="d-flex justify-content-center mb-4">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 py-2 px-4 rounded-pill d-inline-flex align-items-center shadow-sm" style={{ background: "#111827", border: "1px solid rgba(0,0,0,0.2)" }}>
                <li className="breadcrumb-item">
                  <Link to="/" className="text-light opacity-75 text-decoration-none d-inline-flex align-items-center gap-1 hover-warning">
                    <Home size={13} className="text-warning" /> Home
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/blog" className="text-light opacity-75 text-decoration-none hover-warning">
                    Blog
                  </Link>
                </li>
                <li className="breadcrumb-item active text-warning fw-semibold" aria-current="page">
                  {service.name}
                </li>
              </ol>
            </nav>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="blog-hero-badge"
          >
            <span className="pulse-indicator"></span>
            <Sparkles size={14} className="text-warning" />
            <span>{service.badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="blog-hero-title"
          >
            {service.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="blog-hero-subtitle mx-auto"
          >
            {service.heroSubtitle}
          </motion.p>

          {/* Micro-Stats Strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="blog-stats-strip mb-4"
          >
            <div className="blog-stat-badge">
              <BookMarked size={14} className="blog-stat-icon" />
              <span><strong>{serviceArticles.length}</strong> Specialized Guides</span>
            </div>
            <div className="blog-stat-badge">
              <Zap size={14} className="blog-stat-icon" />
              <span><strong>Actionable</strong> Execution Frameworks</span>
            </div>
            <div className="blog-stat-badge">
              <Award size={14} className="blog-stat-icon" />
              <span><strong>100% Free</strong> Tactical Knowledge</span>
            </div>
          </motion.div>

          {/* Quick Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="d-flex flex-wrap justify-content-center gap-3 mt-3"
          >
            <Link to={service.servicePageUrl}>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-dark btn-lg fw-bold rounded-pill px-4 py-3 d-inline-flex align-items-center gap-2"
              >
                {service.ctaBtnText} <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-light btn-lg fw-bold rounded-pill px-4 py-3 d-inline-flex align-items-center gap-2"
              >
                Book Free Consultation
              </motion.button>
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* ================= 03. INTRODUCTION & WHY IT MATTERS ================= */}
      <section className="py-5 position-relative z-2 border-top border-dark border-opacity-10">
        <Container>
          <Row className="g-4 align-items-stretch">
            <Col lg={6}>
              <div
                className="h-100 p-4 p-md-5 rounded-4 text-white"
                style={{
                  background: "#111827",
                  border: "1px solid rgba(0, 0, 0, 0.2)",
                  boxShadow: "0 15px 35px rgba(0, 0, 0, 0.22)",
                }}
              >
                <div className="d-flex align-items-center gap-2 text-warning mb-3">
                  <BookOpen size={20} />
                  <span className="small fw-bold text-uppercase letter-spacing-1">
                    Understanding {service.name}
                  </span>
                </div>
                <h2 className="h3 fw-bold text-white mb-3">The Strategic Foundation</h2>
                <p className="text-light opacity-90 fs-6 lh-lg mb-0">{service.intro}</p>
              </div>
            </Col>

            <Col lg={6}>
              <div
                className="h-100 p-4 p-md-5 rounded-4 text-white"
                style={{
                  background: "#111827",
                  border: "1px solid rgba(0, 0, 0, 0.2)",
                  boxShadow: "0 15px 35px rgba(0, 0, 0, 0.22)",
                }}
              >
                <div className="d-flex align-items-center gap-2 text-warning mb-3">
                  <CheckCircle2 size={20} />
                  <span className="small fw-bold text-uppercase letter-spacing-1">
                    Why It Matters
                  </span>
                </div>
                <h2 className="h3 fw-bold text-white mb-3">Driving Sustainable ROI</h2>
                <p className="text-light opacity-90 fs-6 lh-lg mb-0">{service.whyItMatters}</p>
              </div>
            </Col>
          </Row>

          {/* Subtopics Pills Ribbon */}
          {service.subCategories && service.subCategories.length > 0 && (
            <div className="mt-4 pt-3 text-center">
              <span className="text-dark fw-bold small me-2 d-inline-block mb-2">
                Core Topics Covered:
              </span>
              <div className="d-inline-flex flex-wrap gap-2 justify-content-center">
                {service.subCategories.map((topic, i) => (
                  <span
                    key={i}
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      background: "#111827",
                      color: "#facc15",
                      border: "1px solid rgba(0, 0, 0, 0.2)",
                      fontSize: "0.85rem",
                    }}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* ================= 04. FEATURED ARTICLE (IF AVAILABLE) ================= */}
      {featuredArticle && (
        <section className="py-4 position-relative z-2">
          <Container>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <span className="text-dark small fw-bold text-uppercase letter-spacing-1">
                  Spotlight Insight
                </span>
                <h2 className="h3 fw-bold text-dark mb-0">Featured {service.name} Guide</h2>
              </div>
            </div>

            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="featured-blog-card"
            >
              <Row className="g-0 align-items-center">
                <Col lg={7} className="featured-blog-img-box">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="featured-blog-img"
                    loading="lazy"
                  />
                  <div className="featured-badge-overlay">
                    <Sparkles size={14} /> FEATURED PLAYBOOK
                  </div>
                </Col>

                <Col lg={5} className="p-4 p-md-5">
                  <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
                    <span className="blog-category-badge">{featuredArticle.category}</span>
                    <span className="text-light opacity-75 small d-flex align-items-center gap-1">
                      <Clock size={14} /> {featuredArticle.readTime}
                    </span>
                    <span className="badge bg-warning bg-opacity-25 text-warning px-2 py-1 small rounded-pill">
                      {featuredArticle.funnelStage || "Pillar"}
                    </span>
                  </div>

                  <h3 className="h4 fw-bold text-white mb-3 lh-base">
                    <Link
                      to={`/blog/${featuredArticle.serviceSlug || service.slug}/${featuredArticle.slug}`}
                      className="text-white text-decoration-none transition-all hover-warning"
                    >
                      {featuredArticle.title}
                    </Link>
                  </h3>

                  <p className="text-light opacity-75 mb-4 line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>

                  <Link
                    to={`/blog/${featuredArticle.serviceSlug || service.slug}/${featuredArticle.slug}`}
                    className="btn btn-warning rounded-pill px-4 py-2 fw-bold text-dark d-inline-flex align-items-center gap-2"
                  >
                    Read Full Playbook <ArrowRight size={16} />
                  </Link>
                </Col>
              </Row>
            </motion.div>
          </Container>
        </section>
      )}

      {/* ================= 05. CONTENT FUNNEL TABS & ARTICLES GRID ================= */}
      <section className="py-5 position-relative z-2">
        <Container>
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 gap-3">
            <div>
              <span className="text-dark small fw-bold text-uppercase letter-spacing-1">
                Content Funnel
              </span>
              <h2 className="h3 fw-bold text-dark mb-1">
                Explore {service.name} Articles
              </h2>
              <p className="text-dark opacity-75 small mb-0">
                Filter articles by buyer journey and strategic intent.
              </p>
            </div>

            {/* Funnel Stage Filter Buttons */}
            <div className="d-flex flex-wrap gap-2">
              {[
                { label: "All Topics", value: "All" },
                { label: "Awareness (TOFU)", value: "TOFU" },
                { label: "Strategy & Evaluation (MOFU)", value: "MOFU" },
                { label: "Decision & ROI (BOFU)", value: "BOFU" },
              ].map((stage) => (
                <button
                  key={stage.value}
                  onClick={() => setSelectedFunnel(stage.value)}
                  className={`btn blog-funnel-btn ${
                    selectedFunnel === stage.value ? "active" : ""
                  }`}
                >
                  {stage.label}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <Row className="g-4">
            {displayedArticles.length > 0 ? (
              displayedArticles.map((blog, idx) => (
                <Col key={blog.id || idx} md={6} lg={4}>
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (idx % 3) * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="blog-card h-100 d-flex flex-column"
                  >
                    <div className="blog-card-img-box position-relative">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="blog-card-img"
                        loading="lazy"
                      />
                      {blog.funnelStage && (
                        <span
                          className="position-absolute top-0 end-0 m-3 badge rounded-pill px-2 py-1 small fw-bold"
                          style={{
                            background: "rgba(0,0,0,0.75)",
                            color: "#ffd000",
                            border: "1px solid rgba(250,204,21,0.5)",
                          }}
                        >
                          {blog.funnelStage}
                        </span>
                      )}
                    </div>

                    <div className="p-4 d-flex flex-column flex-grow-1">
                      <div className="d-flex align-items-center gap-3 text-light opacity-75 small mb-3">
                        <span className="d-flex align-items-center gap-1">
                          <Clock size={13} /> {blog.readTime}
                        </span>
                        <span>•</span>
                        <span>{blog.publishDate}</span>
                      </div>

                      <h3 className="h5 fw-bold text-white mb-2 lh-base">
                        <Link
                          to={`/blog/${blog.serviceSlug || service.slug}/${blog.slug}`}
                          className="text-white text-decoration-none transition-all hover-warning"
                        >
                          {blog.title}
                        </Link>
                      </h3>

                      <p className="text-light opacity-75 small mb-4 flex-grow-1 line-clamp-3">
                        {blog.excerpt}
                      </p>

                      <div className="d-flex align-items-center justify-content-between pt-3 border-top border-secondary border-opacity-25 mt-auto">
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={blog.author?.avatar}
                            alt={blog.author?.name}
                            className="rounded-circle border border-warning"
                            width="28"
                            height="28"
                          />
                          <span className="small text-light opacity-90 fw-semibold">
                            {blog.author?.name}
                          </span>
                        </div>

                        <Link
                          to={`/blog/${blog.serviceSlug || service.slug}/${blog.slug}`}
                          className="text-warning text-decoration-none small fw-bold d-inline-flex align-items-center gap-1"
                        >
                          Read <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </Col>
              ))
            ) : (
              <Col xs={12} className="text-center py-5">
                <p className="text-light opacity-75 mb-3 fs-5">
                  No articles found under this funnel stage for {service.name}.
                </p>
                <button
                  onClick={() => setSelectedFunnel("All")}
                  className="btn btn-outline-warning rounded-pill px-4 py-2"
                >
                  View All {service.name} Articles
                </button>
              </Col>
            )}
          </Row>
        </Container>
      </section>

      {/* ================= 06. SERVICE-SPECIFIC FAQS ACCORDION ================= */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-5 position-relative z-2 border-top border-dark border-opacity-10">
          <Container>
            <div className="text-center mb-5">
              <span className="badge bg-dark text-warning fw-bold rounded-pill px-3 py-1 mb-3">
                COMMON QUESTIONS
              </span>
              <h2 className="display-6 fw-bold text-dark mb-2">
                Frequently Asked <span className="text-dark">Questions</span>
              </h2>
              <p className="text-dark opacity-75 col-lg-8 mx-auto">
                Realistic answers to queries business owners ask before investing in {service.name}.
              </p>
            </div>

            <Row className="justify-content-center">
              <Col lg={10}>
                <div className="d-flex flex-column gap-3">
                  {service.faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="rounded-4 overflow-hidden transition-all"
                        style={{
                          background: isOpen ? "#0b0f19" : "#111827",
                          border: isOpen
                            ? "1.5px solid rgba(250, 204, 21, 0.5)"
                            : "1px solid rgba(0, 0, 0, 0.2)",
                          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                        }}
                      >
                        <button
                          className="w-100 p-4 d-flex justify-content-between align-items-center text-start border-0 bg-transparent"
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          aria-expanded={isOpen}
                        >
                          <span className="fw-bold text-white fs-5 pe-3">
                            {faq.question}
                          </span>
                          <span
                            className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 ${
                              isOpen ? "bg-warning text-dark" : "bg-dark text-white"
                            }`}
                            style={{ width: "36px", height: "36px" }}
                          >
                            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </span>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                            >
                              <div className="px-4 pb-4 text-light opacity-90 fs-6 lh-lg border-top border-secondary border-opacity-25 pt-3">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* ================= 07. HIGH-CONVERTING SERVICE CTA BANNER ================= */}
      <section className="py-5 position-relative z-2">
        <Container>
          <div
            className="p-4 p-md-5 rounded-4 text-center text-white position-relative overflow-hidden"
            style={{
              background:
                "radial-gradient(circle at center, rgba(250,204,21,0.18) 0%, rgba(30,31,26,0.98) 75%)",
              border: "1.5px solid rgba(250, 204, 21, 0.4)",
            }}
          >
            <span className="badge bg-warning text-dark fw-bold rounded-pill px-3 py-1 mb-3">
              PARTNER WITH BRANDSETU DIGITAL
            </span>
            <h2 className="display-5 fw-bold mb-3">{service.ctaHeading}</h2>
            <p className="text-light opacity-85 col-md-9 mx-auto mb-4 fs-5">
              {service.ctaText}
            </p>

            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link to={service.servicePageUrl}>
                <button className="btn btn-warning rounded-pill px-5 py-3 fw-bold text-dark fs-5 d-inline-flex align-items-center gap-2 shadow-sm">
                  {service.ctaBtnText} <ArrowRight size={20} />
                </button>
              </Link>
              <button
                className="btn btn-outline-light rounded-pill px-4 py-3 fw-bold fs-5 d-inline-flex align-items-center gap-2"
                onClick={() =>
                  window.open(
                    "https://wa.me/917389824231?text=" +
                      encodeURIComponent(
                        `Hi BrandSetu Digital, I would like to discuss ${service.name} for my brand.`
                      ),
                    "_blank"
                  )
                }
              >
                <MessageCircle size={20} className="text-success" /> WhatsApp Strategist
              </button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
