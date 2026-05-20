import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../Style/Home.css";
import "../../Style/Services.css";
import "../../App.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import DetailedServices from "../Servive/detailedservices";
import Brands from "../Home/brands";
import WhatOurBrandsSay from "../Servive/BrandSays";
import HeroImg from "../../assets/Performance-marketing-agency.jpg";
import Seo from "../Seo";

const Services = () => {
  const isPrerender = typeof navigator !== "undefined" && navigator.userAgent === "ReactSnap";

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  /* ================= FLOATING SHAPES (BLACK ONLY) ================= */
  const floatingShapes = [...Array(30)].map(() => ({
    size: Math.floor(Math.random() * 90 + 30),
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 18 + 12,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.1 + 0.04,
  }));

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
    <section className="hero-section position-relative overflow-hidden py-3 pt-5">
      {/* ================= FLOATING SHAPES ================= */}
      <div className="hero-background">
        {floatingShapes.map((shape, i) => (
          <motion.div
            key={i}
            className="floating-shape"
            style={{
              width: shape.size,
              height: shape.size,
              left: `${shape.left}%`,
              top: `${shape.top}%`,
              background: `rgba(0, 0, 0, ${shape.opacity})`,
            }}
            animate={{
              y: [0, Math.random() * 80 - 40, 0],
              x: [0, Math.random() * 80 - 40, 0],
              scale: [1, 1.25, 1],
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

      {/* ================= HERO IMAGE ================= */}
      <Container className="position-relative pt-5">
        <section
          className="bg-image-section position-relative text-white text-center py-5 mt-5 rounded-4 overflow-hidden"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="image-overlay"></div>

          <Container className="py-5 hero-content">
            <h1 className="display-2 fw-bold mb-3">
              Meet Our Services And <br /> Partners
            </h1>

            <p className="fs-2 w-75 mx-auto mb-3">
              We Don’t Grow Businesses. We Build Brands.
            </p>

            <p className="fs-5 w-75 mx-auto">Business → Brand</p>
          </Container>
        </section>

        {/* ================= STATS ================= */}
        <section className="highlight-stats my-5">
          <Row className="justify-content-center text-center g-5">
            <Col md={3} sm={6}>
              <div className="highlight-stat">
                <span className="stat-number d-block">
                  {isPrerender ? "500" : <CountUp end={500} duration={2.5} />}+
                </span>
                <div className="stat-line"></div>
                <p>Successful Projects</p>
              </div>
            </Col>

            <Col md={3} sm={6}>
              <div className="highlight-stat">
                <span className="stat-number d-block">
                  {isPrerender ? "350" : <CountUp end={350} duration={2.8} />}+
                </span>
                <div className="stat-line"></div>
                <p>Happy Clients</p>
              </div>
            </Col>

            <Col md={3} sm={6}>
              <div className="highlight-stat">
                <span className="stat-number d-block">
                  {isPrerender ? "4.5" : <CountUp end={4.5} decimals={1} duration={2.3} />}+
                </span>
                <div className="stat-line"></div>
                <p>Average Rating</p>
              </div>
            </Col>

            <Col md={3} sm={6}>
              <div className="highlight-stat">
                <span className="stat-number d-block">
                  {isPrerender ? "20" : <CountUp end={20} duration={2.2} />}+
                </span>
                <div className="stat-line"></div>
                <p>Cities Covered</p>
              </div>
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
