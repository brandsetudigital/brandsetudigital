import React, { useEffect, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../Style/Home.css";
import "../../Style/Services.css";
import "../../App.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Sparkles, Trophy, Users, Star, MapPin } from "lucide-react";
import DetailedServices from "../Servive/detailedservices";
import Brands from "../Home/brands";
import WhatOurBrandsSay from "../Servive/BrandSays";
import HeroImg from "../../assets/Performance-marketing-agency.jpg";
import Seo from "../Seo";

const Services = () => {
  const isPrerender = typeof navigator !== "undefined" && navigator.userAgent === "ReactSnap";

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  /* ================= FLOATING SHAPES ================= */
  const floatingShapes = useMemo(
    () =>
      Array.from({ length: 30 }).map(() => ({
        size: Math.floor(Math.random() * 120 + 40),
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
      })),
    []
  );

  const heroImage = HeroImg;

  return (
    <>
      <Seo
        title="Digital Marketing Services in Indore — SEO, Branding, Web & Social"
        description="Explore BrandSetu Digital's services in Indore: SEO, branding, social media marketing, web design & development, performance ads, content production, and shoot/editing."
        path="/services"
        jsonLd={[
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
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://brandsetudigital.com/services#webpage",
            name: "Digital Marketing Services in Indore",
            url: "https://brandsetudigital.com/services",
            isPartOf: { "@id": "https://brandsetudigital.com/#organization" },
            about: { "@id": "https://brandsetudigital.com/#organization" },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "Service",
                  position: 1,
                  name: "SEO Services",
                  description:
                    "On-page, technical, and local SEO to rank higher on Google and bring consistent organic traffic.",
                  provider: { "@id": "https://brandsetudigital.com/#organization" },
                  areaServed: { "@type": "Country", name: "India" },
                },
                {
                  "@type": "Service",
                  position: 2,
                  name: "Branding & Brand Strategy",
                  description:
                    "Brand identity, logo design, and creative collateral that communicate your brand story with clarity and consistency.",
                  provider: { "@id": "https://brandsetudigital.com/#organization" },
                },
                {
                  "@type": "Service",
                  position: 3,
                  name: "Social Media Marketing",
                  description:
                    "Content strategy, reels, creatives, and audience growth campaigns across Instagram, Facebook, LinkedIn, and YouTube.",
                  provider: { "@id": "https://brandsetudigital.com/#organization" },
                },
                {
                  "@type": "Service",
                  position: 4,
                  name: "Web Design & Development",
                  description:
                    "High-performing, mobile-first websites and apps built for speed, UX, SEO readiness, and conversion.",
                  provider: { "@id": "https://brandsetudigital.com/#organization" },
                },
                {
                  "@type": "Service",
                  position: 5,
                  name: "Performance Marketing (Google & Meta Ads)",
                  description:
                    "ROI-focused paid campaigns on Google and Meta that generate qualified leads and measurable revenue.",
                  provider: { "@id": "https://brandsetudigital.com/#organization" },
                },
                {
                  "@type": "Service",
                  position: 6,
                  name: "Content, Shoots & Editing",
                  description:
                    "Reels, product shoots, ad video editing, and CGI ads built for engagement on social platforms.",
                  provider: { "@id": "https://brandsetudigital.com/#organization" },
                },
              ],
            },
          },
        ]}
      />
      <section className="services-main-hero position-relative overflow-hidden py-4 pt-5">
        {/* ================= FLOATING SHAPES ================= */}
        <div
          className="hero-background position-absolute w-100 h-100"
          style={{ top: 0, left: 0, zIndex: 0, pointerEvents: "none" }}
          aria-hidden="true"
        >
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

        {/* ================= HERO IMAGE BANNER ================= */}
        <Container className="position-relative pt-4 z-2">
          <section
            className="services-hero-banner position-relative text-white text-center py-5 mt-4 rounded-4 overflow-hidden shadow-lg"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="services-image-overlay"></div>

            <Container className="py-5 hero-content position-relative z-2">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="d-inline-flex align-items-center gap-2 mb-3 services-pill-badge"
              >
                <Sparkles size={16} className="text-warning" />
                <span>WHAT WE EXCEL AT</span>
              </motion.div>

              <motion.h1
                className="display-3 fw-black mb-3 services-hero-title"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                Strategic Digital Services & <br className="d-none d-md-block" />
                <span className="text-warning">Growth Solutions</span>
              </motion.h1>

              <motion.p
                className="fs-4 mx-auto mb-2 text-light-50 fw-semibold services-hero-tagline"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                We Don’t Just Grow Businesses. We Build Memorable Brands.
              </motion.p>

              <motion.div
                className="services-journey-pill d-inline-block mt-2 px-3 py-1 rounded-pill"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="text-warning fw-bold">Business</span> →{" "}
                <span className="text-white fw-bold">Brand</span>
              </motion.div>
            </Container>
          </section>

          {/* ================= MODERN STATS SECTION ================= */}
          <section className="services-modern-stats my-4 my-md-5 w-100">
            <Row className="g-3 g-md-4">
              <Col xs={6} md={3}>
                <motion.div
                  className="modern-stat-card text-center p-3 p-md-4 rounded-4"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="stat-icon-wrapper mb-2">
                    <Trophy size={24} className="text-warning" />
                  </div>
                  <span className="stat-number d-block fw-black">
                    {isPrerender ? "500" : <CountUp end={500} duration={2.5} />}+
                  </span>
                  <p className="stat-label mb-0 fw-semibold">Successful Projects</p>
                </motion.div>
              </Col>

              <Col xs={6} md={3}>
                <motion.div
                  className="modern-stat-card text-center p-3 p-md-4 rounded-4"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="stat-icon-wrapper mb-2">
                    <Users size={24} className="text-warning" />
                  </div>
                  <span className="stat-number d-block fw-black">
                    {isPrerender ? "350" : <CountUp end={350} duration={2.8} />}+
                  </span>
                  <p className="stat-label mb-0 fw-semibold">Happy Clients</p>
                </motion.div>
              </Col>

              <Col xs={6} md={3}>
                <motion.div
                  className="modern-stat-card text-center p-3 p-md-4 rounded-4"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="stat-icon-wrapper mb-2">
                    <Star size={24} className="text-warning" />
                  </div>
                  <span className="stat-number d-block fw-black">
                    {isPrerender ? "4.5" : <CountUp end={4.5} decimals={1} duration={2.3} />}+
                  </span>
                  <p className="stat-label mb-0 fw-semibold">Average Rating</p>
                </motion.div>
              </Col>

              <Col xs={6} md={3}>
                <motion.div
                  className="modern-stat-card text-center p-3 p-md-4 rounded-4"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="stat-icon-wrapper mb-2">
                    <MapPin size={24} className="text-warning" />
                  </div>
                  <span className="stat-number d-block fw-black">
                    {isPrerender ? "20" : <CountUp end={20} duration={2.2} />}+
                  </span>
                  <p className="stat-label mb-0 fw-semibold">Cities Covered</p>
                </motion.div>
              </Col>
            </Row>
          </section>
        </Container>

        {/* ================= OTHER SECTIONS ================= */}
        <DetailedServices />
        <WhatOurBrandsSay />
        <Brands />
      </section>
    </>
  );
};

export default Services;
