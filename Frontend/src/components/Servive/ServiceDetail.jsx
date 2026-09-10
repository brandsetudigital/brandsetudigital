import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowUpRight,
  Phone,
  Building2,
  UserX,
  ShieldAlert,
  TrendingDown,
  Clock,
  ZapOff,
  DollarSign,
  HelpCircle,
  MessageCircle,
  Star,
  Zap,
  ShieldCheck,
  Award,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../Style/ServiceDetail.css";
import "../../App.css";
import "../../Style/Home.css";
import { getServiceBySlug, servicesData } from "../../data/servicesData";
import Seo from "../Seo";
import Brands from "../Home/brands";
import WhatOurBrandsSay from "./BrandSays";

const challengeConfig = [
  { icon: UserX, color: "#f87171", bg: "rgba(239, 68, 68, 0.15)", border: "rgba(239, 68, 68, 0.35)", tag: "Problem 01" },
  { icon: ShieldAlert, color: "#fbbf24", bg: "rgba(245, 158, 11, 0.15)", border: "rgba(245, 158, 11, 0.35)", tag: "Problem 02" },
  { icon: TrendingDown, color: "#c084fc", bg: "rgba(168, 85, 247, 0.15)", border: "rgba(168, 85, 247, 0.35)", tag: "Problem 03" },
  { icon: Clock, color: "#38bdf8", bg: "rgba(6, 182, 212, 0.15)", border: "rgba(6, 182, 212, 0.35)", tag: "Problem 04" },
  { icon: DollarSign, color: "#f472b6", bg: "rgba(244, 114, 182, 0.15)", border: "rgba(244, 114, 182, 0.35)", tag: "Problem 05" },
  { icon: ZapOff, color: "#34d399", bg: "rgba(52, 211, 153, 0.15)", border: "rgba(52, 211, 153, 0.35)", tag: "Problem 06" },
];

const ServiceDetail = () => {
  const { slug } = useParams();
  const [openFaq, setOpenFaq] = useState(0);
  const [activeStageTab, setActiveStageTab] = useState("specs");

  const service = getServiceBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    AOS.init({ duration: 900, once: true });
  }, [slug]);

  /* ================= FLOATING SHAPES ================= */
  const floatingShapes = useMemo(
    () =>
      Array.from({ length: 50 }).map(() => ({
        size: Math.floor(Math.random() * 130 + 40),
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
      })),
    []
  );

  // Dynamic capabilities tailored specifically to this service
  const keyCapabilities = useMemo(() => {
    if (!service?.servicesOffered?.items) return [];
    return service.servicesOffered.items.slice(0, 4).map((item) => item.title);
  }, [service]);

  // Service-specific stage HUD live readout data
  const serviceStageData = useMemo(() => {
    if (!service) return { specs: "", focus: "", roi: "" };
    const firstDeliverable =
      service.servicesOffered?.items?.[0]?.desc || service.shortDesc || "Comprehensive high-velocity digital execution.";
    const keyFocus = service.whyChooseUs?.points?.[0]?.title
      ? `${service.whyChooseUs.points[0].title}: ${service.whyChooseUs.points[0].desc}`
      : `Tailored ${service.category} execution calibrated for high conversion and brand retention.`;
    const targetROI = service.stats?.[0]
      ? `${service.stats[0].value} ${service.stats[0].label} achieved on average.`
      : "Average 3.4x organic & paid customer acquisition boost across active campaigns.";

    return {
      specs: firstDeliverable,
      focus: keyFocus,
      roi: targetROI,
    };
  }, [service]);

  if (!service) {
    return (
      <div className="service-detail-page d-flex align-items-center justify-content-center py-5 text-center" style={{ minHeight: "80vh" }}>
        <Container className="py-5">
          <h1 className="display-4 fw-bold text-dark mb-3">Service Not Found</h1>
          <p className="text-dark lead mb-4">
            The service you're looking for does not exist or has been moved.
          </p>
          <Button
            as={Link}
            to="/services"
            className="main-btn rounded-pill px-5 py-3 d-inline-flex align-items-center gap-2"
          >
            Explore All Services <ArrowRight size={18} />
          </Button>
        </Container>
      </div>
    );
  }

  // Related other services (excluding current)
  const relatedServices = servicesData.filter((s) => s.id !== service.id).slice(0, 4);

  // Generate structured FAQ schema
  const faqSchema = service.faqs?.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })) || [];

  const jsonLdData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://brandsetudigital.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: "https://brandsetudigital.com/services",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: service.title,
          item: `https://brandsetudigital.com/services/${service.slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.seo.h1 || service.title,
      description: service.seo.metaDescription,
      provider: {
        "@type": "Organization",
        name: "BrandSetu Digital",
        url: "https://brandsetudigital.com",
      },
      serviceType: service.category,
      areaServed: {
        "@type": "Country",
        name: "India",
      },
    },
  ];

  if (faqSchema.length > 0) {
    jsonLdData.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqSchema,
    });
  }

  return (
    <div className="service-detail-page hero-section position-relative overflow-hidden pt-5">
      <Seo
        title={service.seo.metaTitle}
        description={service.seo.metaDescription}
        path={`/services/${service.slug}`}
        jsonLd={jsonLdData}
      />

      {/* ================= FLOATING PARTICLES ================= */}
      <div className="hero-background position-absolute w-100 h-100" style={{ top: 0, left: 0, zIndex: 0, pointerEvents: "none" }} aria-hidden="true">
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

      {/* ================= HERO SECTION ================= */}
      <section className="service-detail-hero">
        <Container fluid className="px-3 px-md-5 px-xl-5 position-relative" style={{ zIndex: 2 }}>
          {/* Top Row: Breadcrumbs Pill + Service Tier Badge */}
          <div className="service-hero-top-row" data-aos="fade-down">
            <div className="service-breadcrumbs-pill">
              <Link to="/">Home</Link>
              <span className="separator">/</span>
              <Link to="/services">Services</Link>
              <span className="separator">/</span>
              <span className="current">{service.title}</span>
            </div>

            <div className="service-tier-badge">
              <span className="pulse-indicator" />
              {service.category} • Enterprise Grade
            </div>
          </div>

          <Row className="align-items-center g-5">
            {/* Left Column: Title, Subtitle, Dynamic Deliverables & CTAs */}
            <Col lg={7} data-aos="fade-right">
              <h1 className="service-hero-title">
                {service.seo.h1 || service.title}
              </h1>

              <p className="service-hero-subtitle">
                {service.seo.subHeading || service.shortDesc}
              </p>

              {/* Dynamic Service Deliverables (Pill Matrix, Not Cards) */}
              {keyCapabilities.length > 0 && (
                <div className="service-capabilities-matrix">
                  <div className="matrix-label">
                    <Sparkles size={13} /> Included Scope & Key Deliverables
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    {keyCapabilities.map((cap, idx) => (
                      <span key={idx} className="capability-pill">
                        <CheckCircle2 size={14} className="capability-check" />
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="d-flex flex-wrap gap-3 mt-4 mb-3">
                <Button
                  as={Link}
                  to={{
                    pathname: "/contact",
                    search: `?service=${encodeURIComponent(service.title)}`,
                    state: { selectedService: service.title },
                  }}
                  className="main-btn rounded-pill px-5 py-3 d-inline-flex align-items-center gap-2 shadow"
                >
                  {service.heroCTA || "Get Free Consultation"} <ArrowRight size={18} />
                </Button>

                <Button
                  variant="dark"
                  className="rounded-pill px-4 py-3 d-inline-flex align-items-center gap-2 fw-bold shadow-sm"
                  onClick={() =>
                    window.open(
                      `https://wa.me/917389824231?text=${encodeURIComponent(
                        `Hi BrandSetu Digital, I would like to enquire about your ${service.title} services.`
                      )}`,
                      "_blank"
                    )
                  }
                >
                  <MessageCircle size={18} className="text-success" /> Chat on WhatsApp
                </Button>
              </div>

              {/* Reassurance Trust Strip */}
              <div className="service-trust-strip d-flex flex-wrap align-items-center gap-3 pt-2">
                <span className="trust-item">
                  <ShieldCheck size={16} /> 100% Tailored Roadmap
                </span>
                <span>•</span>
                <span className="trust-item">
                  <Zap size={16} /> 24-Hr Kickoff
                </span>
                <span>•</span>
                <span className="trust-item">
                  <Award size={16} /> 350+ Scaled Brands
                </span>
              </div>

              {/* Keyword tags */}
              {service.seo.secondaryKeywords && (
                <div className="keyword-tags">
                  {service.seo.secondaryKeywords.map((kw, i) => (
                    <span key={i} className="keyword-tag">
                      #{kw}
                    </span>
                  ))}
                </div>
              )}
            </Col>

            {/* Right Column: Interactive Service Visual Stage & Capability Switcher */}
            <Col lg={5} data-aos="fade-left">
              <div className="service-stage-container">
                <div className="service-stage-visual-wrap">
                  <img
                    src={service.img}
                    alt={service.seo.h1 || service.title}
                    className="service-stage-img"
                    loading="eager"
                    width="600"
                    height="400"
                  />
                  <div className="service-stage-overlay-glow" />

                  {/* Top Floating Badge */}
                  <div className="service-stage-badge-top">
                    <span className="stage-live-dot" /> Live {service.title} Framework
                  </div>

                  {/* Floating Metric Pill */}
                  <div className="service-stage-metric-pill">
                    <div className="metric-pill-icon">
                      <Star size={16} className="text-warning fill-warning" />
                    </div>
                    <div className="metric-pill-text">
                      <span className="metric-val">4.9 / 5.0</span>
                      <span className="metric-lbl">Client Satisfaction Rate</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Capability Switcher HUD Bar */}
                <div className="service-stage-hud-bar">
                  <div className="stage-hud-tabs">
                    <button
                      type="button"
                      className={`stage-hud-tab-btn ${activeStageTab === "specs" ? "active" : ""}`}
                      onClick={() => setActiveStageTab("specs")}
                    >
                      ⚡ Quick Specs
                    </button>
                    <button
                      type="button"
                      className={`stage-hud-tab-btn ${activeStageTab === "focus" ? "active" : ""}`}
                      onClick={() => setActiveStageTab("focus")}
                    >
                      🎯 Key Objective
                    </button>
                    <button
                      type="button"
                      className={`stage-hud-tab-btn ${activeStageTab === "roi" ? "active" : ""}`}
                      onClick={() => setActiveStageTab("roi")}
                    >
                      📈 Target Impact
                    </button>
                  </div>

                  <div className="stage-hud-readout">
                    <span className="stage-readout-tag">
                      {activeStageTab === "specs" && "SPECS:"}
                      {activeStageTab === "focus" && "FOCUS:"}
                      {activeStageTab === "roi" && "IMPACT:"}
                    </span>
                    <span className="stage-readout-text">
                      {activeStageTab === "specs" && serviceStageData.specs}
                      {activeStageTab === "focus" && serviceStageData.focus}
                      {activeStageTab === "roi" && serviceStageData.roi}
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= OVERVIEW / WHAT IS THIS SERVICE ================= */}
      {service.overview && (
        <section className="py-5 my-4 position-relative" style={{ zIndex: 2 }}>
          <Container fluid className="px-3 px-md-5 px-xl-5">
            <Row className="g-4">
              <Col lg={6} data-aos="fade-up">
                <div className="overview-card">
                  <span className="section-tag">Understanding The Value</span>
                  <h2 className="section-main-title">{service.overview.title}</h2>
                  <p className="section-desc mb-0">{service.overview.description}</p>
                </div>
              </Col>
              <Col lg={6} data-aos="fade-up" data-aos-delay="100">
                <div className="overview-card accent">
                  <span className="section-tag">Business Impact</span>
                  <h2 className="section-main-title">Why Your Business Needs This</h2>
                  <p className="section-desc mb-0">{service.overview.whyNeeded}</p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* ================= COMMON CHALLENGES ================= */}
      {service.challenges && service.challenges.items && (
        <section className="py-5 position-relative" style={{ zIndex: 2 }}>
          <Container fluid className="px-3 px-md-5 px-xl-5">
            <div className="text-center mb-5" data-aos="fade-up">
              <span className="section-tag">Real Challenges We Solve</span>
              <h2 className="section-main-title">{service.challenges.title}</h2>
              <p className="section-desc max-w-700 mx-auto">
                {service.challenges.description}
              </p>
            </div>

            <Row className="g-4">
              {service.challenges.items.map((item, idx) => {
                const conf = challengeConfig[idx % challengeConfig.length];
                const IconComponent = conf.icon;
                return (
                  <Col md={6} lg={idx < 4 ? 3 : 6} key={idx} data-aos="fade-up" data-aos-delay={idx * 80}>
                    <div className="challenge-card" style={{ borderTop: `3px solid ${conf.color}` }}>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div
                          className="challenge-icon"
                          style={{
                            backgroundColor: conf.bg,
                            borderColor: conf.border,
                            color: conf.color,
                          }}
                        >
                          <IconComponent size={22} />
                        </div>
                        <span
                          className="badge rounded-pill px-2 py-1 fw-bold"
                          style={{
                            backgroundColor: conf.bg,
                            color: conf.color,
                            fontSize: "0.72rem",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {conf.tag}
                        </span>
                      </div>
                      <h3 className="challenge-title">{item.title}</h3>
                      <p className="challenge-desc">{item.desc}</p>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </section>
      )}

      {/* ================= SERVICES OFFERED ================= */}
      {service.servicesOffered && service.servicesOffered.items && (
        <section className="py-5 my-4 position-relative" style={{ zIndex: 2 }}>
          <Container fluid className="px-3 px-md-5 px-xl-5">
            <div className="text-center mb-5" data-aos="fade-up">
              <span className="section-tag">Comprehensive Capabilities</span>
              <h2 className="section-main-title">{service.servicesOffered.title}</h2>
              <p className="section-desc max-w-700 mx-auto">
                Engineered for maximum ROI, consistency, and brand elevation.
              </p>
            </div>

            <Row className="g-4">
              {service.servicesOffered.items.map((offer, idx) => (
                <Col md={6} lg={4} key={idx} data-aos="fade-up" data-aos-delay={idx * 80}>
                  <div className="service-offer-card">
                    <div className="offer-number">0{idx + 1}</div>
                    <h3 className="offer-title">{offer.title}</h3>
                    <p className="offer-desc">{offer.desc}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* ================= STEP-BY-STEP PROCESS ================= */}
      {service.process && (
        <section className="py-5 position-relative" style={{ zIndex: 2 }}>
          <Container fluid className="px-3 px-md-5 px-xl-5">
            <div className="text-center mb-5" data-aos="fade-up">
              <span className="section-tag">Our Execution Framework</span>
              <h2 className="section-main-title">How We Deliver Results</h2>
              <p className="section-desc max-w-700 mx-auto">
                A structured, data-informed methodology from inception to post-launch optimization.
              </p>
            </div>

            <Row className="g-4">
              {service.process.map((step, idx) => (
                <Col md={6} lg={3} key={idx} data-aos="fade-up" data-aos-delay={idx * 100}>
                  <div className="process-card">
                    <div className="process-step-badge">{step.step}</div>
                    <h3 className="process-title">{step.title}</h3>
                    <p className="process-desc">{step.desc}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* ================= WHY CHOOSE US ================= */}
      {service.whyChooseUs && (
        <section className="py-5 my-4 position-relative" style={{ zIndex: 2 }}>
          <Container fluid className="px-3 px-md-5 px-xl-5">
            <div className="why-choose-box" data-aos="zoom-in">
              <Row className="align-items-center g-5">
                <Col lg={5}>
                  <span className="section-tag">The BrandSetu Advantage</span>
                  <h2 className="section-main-title">{service.whyChooseUs.title}</h2>
                  <p className="section-desc mb-4">{service.whyChooseUs.desc}</p>
                  <Button
                    as={Link}
                    to={{
                      pathname: "/contact",
                      search: `?service=${encodeURIComponent(service.title)}`,
                      state: { selectedService: service.title },
                    }}
                    className="main-btn rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2"
                  >
                    Partner With Us <ArrowRight size={16} />
                  </Button>
                </Col>

                <Col lg={7}>
                  <Row className="g-3">
                    {service.whyChooseUs.points.map((point, idx) => (
                      <Col sm={6} key={idx}>
                        <div className="why-point-item">
                          <div className="why-point-icon">
                            <CheckCircle2 size={16} />
                          </div>
                          <span className="why-point-text">{point}</span>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      )}

      {/* ================= INDUSTRIES WE SERVE ================= */}
      {service.industries && (
        <section className="py-5 position-relative" style={{ zIndex: 2 }}>
          <Container fluid className="px-3 px-md-5 px-xl-5 text-center" data-aos="fade-up">
            <span className="section-tag">Market Expertise</span>
            <h2 className="section-main-title mb-4">Industries We Serve</h2>
            <div className="d-flex flex-wrap justify-content-center gap-3 max-w-900 mx-auto">
              {service.industries.map((ind, idx) => (
                <div key={idx} className="industry-chip">
                  <Building2 size={16} className="text-warning" /> {ind}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ================= FAQS ACCORDION ================= */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="home-faq-section py-5 my-4 position-relative z-1" id="faq-section">
          <Container>
            {/* SECTION HEADER */}
            <div className="text-center mb-5" data-aos="fade-up">
              <div className="badge-custom mb-3 d-inline-flex align-items-center gap-2">
                <HelpCircle size={14} /> GOT QUESTIONS?
              </div>

              <h2 className="display-4 fw-black text-dark mb-3">
                Frequently Asked <span className="text-danger">Questions</span>
              </h2>

              <p className="lead text-dark fw-semibold mx-auto col-lg-8">
                Everything you need to know about our {service.title} services.
              </p>
            </div>

            {/* ACCORDION CONTENT */}
            <Row className="justify-content-center">
              <Col lg={10}>
                <div className="faq-list-wrapper d-flex flex-column gap-3">
                  {service.faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    const num = String(idx + 1).padStart(2, "0");
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className={`home-faq-item rounded-4 transition-all shadow-sm ${
                          isOpen ? "faq-open" : ""
                        }`}
                        style={{
                          backgroundColor: isOpen ? "#111827" : "rgba(255, 255, 255, 0.75)",
                          border: isOpen
                            ? "1px solid rgba(250, 204, 21, 0.4)"
                            : "1px solid rgba(0, 0, 0, 0.08)",
                          backdropFilter: "blur(10px)",
                          overflow: "hidden",
                        }}
                      >
                        <button
                          className="w-100 p-4 d-flex justify-content-between align-items-center text-start border-0 bg-transparent"
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          aria-expanded={isOpen}
                        >
                          <div className="d-flex align-items-center gap-3 pe-3">
                            <span
                              className={`fw-bold px-2 py-1 rounded-3 fs-6 ${
                                isOpen
                              ? "bg-warning text-dark"
                              : "bg-dark bg-opacity-10 text-dark"
                              }`}
                              style={{ minWidth: "36px", textAlign: "center" }}
                            >
                              {num}
                            </span>
                            <span
                              className={`fw-bold fs-5 mb-0 ${
                                isOpen ? "text-white" : "text-dark"
                              }`}
                            >
                              {faq.question}
                            </span>
                          </div>
                          <span
                            className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 ${
                              isOpen
                                ? "bg-warning text-dark"
                                : "bg-dark text-white"
                            }`}
                            style={{ width: "36px", height: "36px" }}
                          >
                            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </span>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="px-4 pb-4 text-light opacity-90 fs-6 lh-lg border-top border-secondary pt-3">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>

                {/* BOTTOM HELP BANNER */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mt-5 p-4 rounded-4 bg-dark text-white text-center d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 shadow-lg"
                >
                  <div className="text-md-start">
                    <h4 className="fw-bold mb-1 text-warning">Have a specific question about {service.title}?</h4>
                    <p className="mb-0 text-light opacity-75">
                      Talk directly to our marketing strategists and get a custom roadmap.
                    </p>
                  </div>
                  <div className="d-flex gap-2 flex-wrap">
                    <Link
                      to={{
                        pathname: "/contact",
                        search: `?service=${encodeURIComponent(service.title)}`,
                        state: { selectedService: service.title },
                      }}
                    >
                      <button className="btn btn-warning rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2">
                        Contact Us <ArrowRight size={16} />
                      </button>
                    </Link>
                    <button
                      className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2"
                      onClick={() =>
                        window.open(
                          `https://wa.me/917389824231?text=${encodeURIComponent(
                            `Hi BrandSetu Digital, I have a question regarding your ${service.title} services.`
                          )}`,
                          "_blank"
                        )
                      }
                    >
                      <MessageCircle size={16} className="text-success" /> WhatsApp
                    </button>
                  </div>
                </motion.div>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* ================= BOTTOM CTA BANNER ================= */}
      <section className="py-5 position-relative" style={{ zIndex: 2 }}>
        <Container fluid className="px-3 px-md-5 px-xl-5">
          <div className="service-cta-banner" data-aos="zoom-in">
            <h2>{service.bottomCTA?.title || `Ready to Scale with ${service.title}?`}</h2>
            <p>{service.bottomCTA?.desc || "Let's build marketing and technology solutions that deliver measurable business growth."}</p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Button
                as={Link}
                to={{
                  pathname: "/contact",
                  search: `?service=${encodeURIComponent(service.title)}`,
                  state: { selectedService: service.title },
                }}
                className="main-btn rounded-pill px-5 py-3 d-inline-flex align-items-center gap-2"
              >
                {service.bottomCTA?.btnText || "Get Started Today"} <ArrowRight size={18} />
              </Button>
              <Button
                variant="dark"
                className="rounded-pill px-4 py-3 d-inline-flex align-items-center gap-2 fw-bold border border-secondary"
                onClick={() =>
                  window.open(
                    `https://wa.me/917389824231?text=${encodeURIComponent(
                      `Hi BrandSetu Digital, I would like to enquire about your ${service.title} services.`
                    )}`,
                    "_blank"
                  )
                }
              >
                <Phone size={18} className="text-success" /> WhatsApp Us
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ================= RELATED SERVICES ================= */}
      <section className="py-5 position-relative" style={{ zIndex: 2 }}>
        <Container fluid className="px-3 px-md-5 px-xl-5">
          <div className="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-2">
            <div>
              <span className="section-tag">Explore More</span>
              <h3 className="section-main-title mb-0">Other Services You Might Need</h3>
            </div>
            <Link to="/services" className="text-dark d-inline-flex align-items-center gap-1 fw-bold">
              View All Services <ArrowRight size={16} />
            </Link>
          </div>

          <Row className="g-4">
            {relatedServices.map((rel, i) => (
              <Col md={6} lg={3} key={i} data-aos="fade-up" data-aos-delay={i * 80}>
                <Link to={`/services/${rel.slug}`} className="related-service-card">
                  <img src={rel.img} alt={rel.title} className="related-img" />
                  <div>
                    <div className="related-cat">{rel.category}</div>
                    <div className="related-title">{rel.title}</div>
                  </div>
                  <ArrowUpRight size={18} className="ms-auto text-warning flex-shrink-0" />
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Brand Trust and Testimonials */}
      <WhatOurBrandsSay />
      <Brands />
    </div>
  );
};

export default ServiceDetail;
