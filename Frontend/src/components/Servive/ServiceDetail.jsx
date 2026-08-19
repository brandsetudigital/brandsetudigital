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
  AlertTriangle,
  ArrowUpRight,
  Phone,
  Building2
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

const ServiceDetail = () => {
  const { slug } = useParams();
  const [openFaq, setOpenFaq] = useState(0);

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
          {/* Breadcrumbs */}
          <div className="service-breadcrumbs" data-aos="fade-down">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <Link to="/services">Services</Link>
            <span className="separator">/</span>
            <span className="current">{service.title}</span>
          </div>

          <Row className="align-items-center g-5">
            <Col lg={7} data-aos="fade-right">
              <div className="service-badge">
                <Sparkles size={14} /> {service.category} Service
              </div>

              <h1 className="service-hero-title">
                {service.seo.h1 || service.title}
              </h1>

              <p className="service-hero-subtitle">
                {service.seo.subHeading || service.shortDesc}
              </p>

              <div className="d-flex flex-wrap gap-3 mt-4">
                <Button
                  as={Link}
                  to="/contact"
                  className="main-btn rounded-pill px-5 py-3 d-inline-flex align-items-center gap-2"
                >
                  {service.heroCTA || "Get Free Consultation"} <ArrowRight size={18} />
                </Button>

                <Button
                  variant="dark"
                  className="rounded-pill px-4 py-3 d-inline-flex align-items-center gap-2 fw-bold shadow-sm"
                  onClick={() =>
                    window.open(
                      `https://wa.me/916232363639?text=${encodeURIComponent(
                        `Hi BrandSetu Digital, I would like to enquire about your ${service.title} services.`
                      )}`,
                      "_blank"
                    )
                  }
                >
                  <Phone size={18} className="text-success" /> Chat on WhatsApp
                </Button>
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

            <Col lg={5} data-aos="fade-left">
              <div className="service-hero-img-box">
                <img
                  src={service.img}
                  alt={service.seo.h1 || service.title}
                  className="service-hero-img"
                  loading="eager"
                  width="600"
                  height="400"
                />
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
              {service.challenges.items.map((item, idx) => (
                <Col md={6} lg={idx < 4 ? 3 : 6} key={idx} data-aos="fade-up" data-aos-delay={idx * 80}>
                  <div className="challenge-card">
                    <div className="challenge-icon">
                      <AlertTriangle size={22} />
                    </div>
                    <h3 className="challenge-title">{item.title}</h3>
                    <p className="challenge-desc">{item.desc}</p>
                  </div>
                </Col>
              ))}
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
                    to="/contact"
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
        <section className="py-5 my-4 position-relative" style={{ zIndex: 2 }}>
          <Container fluid className="px-3 px-md-5 px-xl-5">
            <div className="text-center mb-5" data-aos="fade-up">
              <span className="section-tag">Got Questions?</span>
              <h2 className="section-main-title">Frequently Asked Questions</h2>
              <p className="section-desc max-w-700 mx-auto">
                Everything you need to know about our {service.title} services.
              </p>
            </div>

            <Row className="justify-content-center">
              <Col lg={9}>
                {service.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className={`faq-item-custom ${openFaq === idx ? "active" : ""}`}
                    data-aos="fade-up"
                    data-aos-delay={idx * 60}
                  >
                    <button
                      className="faq-header-btn"
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      aria-expanded={openFaq === idx}
                    >
                      <span>{faq.question}</span>
                      <span className="faq-icon-arrow">
                        {openFaq === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </span>
                    </button>
                    <AnimatePresence>
                      {openFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="faq-body-content">{faq.answer}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
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
                to="/contact"
                className="main-btn rounded-pill px-5 py-3 d-inline-flex align-items-center gap-2"
              >
                {service.bottomCTA?.btnText || "Get Started Today"} <ArrowRight size={18} />
              </Button>
              <Button
                variant="dark"
                className="rounded-pill px-4 py-3 d-inline-flex align-items-center gap-2 fw-bold border border-secondary"
                onClick={() =>
                  window.open(
                    `https://wa.me/916232363639?text=${encodeURIComponent(
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
