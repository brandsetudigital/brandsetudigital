import React, { useEffect } from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../Style/portfolio.css";
import "../../App.css";
import "../../Style/Home.css";

import Founder1 from "../../assets/founder-brandsetu.webp";
import Dipesh from "../../assets/dipesh-brandsetu.webp";
import yuvraj from "../../assets/yuvraj-brandsetu.JPG";
import mansi from "../../assets/mansi-brandsetu.webp";
import shivani from "../../assets/shivani-brandsetu.webp";
import Founder2 from "../../assets/ceo-brandsetu.webp";
import ProblemImg from "../../assets/top-web-development-company.png";
import StrategyImg from "../../assets/best-Video-editor-agency.png";
import SolutionImg from "../../assets/Ai-automation-services.png";
import HeroSection from "./Testimonialmain";
import Brandsetu from "../../assets/Brandsetu-digital-agency-about-us.jpg";
import Seo from "../Seo";

export default function WhoAreWe() {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const floatingShapes = [...Array(30)].map(() => ({
    size: Math.floor(Math.random() * 120 + 30),
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <>
      <Seo
        title="Our Work — Portfolio of Brands by BrandSetu Digital, Indore"
        description="See the brands BrandSetu Digital (Indore) has helped grow with branding, SEO, web development, and performance marketing — plus meet the team behind the work."
        path="/work"
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
                name: "Our Work",
                item: "https://brandsetudigital.com/work",
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://brandsetudigital.com/work#webpage",
            url: "https://brandsetudigital.com/work",
            name: "Portfolio — BrandSetu Digital",
            isPartOf: { "@id": "https://brandsetudigital.com/#organization" },
            mainEntity: {
              "@type": "ItemList",
              name: "BrandSetu Digital Portfolio",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Blue Tokai Studio", url: "https://bluetokaicoffee.com" },
                { "@type": "ListItem", position: 2, name: "Cafe Peter" },
                { "@type": "ListItem", position: 3, name: "Chaayos" },
                { "@type": "ListItem", position: 4, name: "Zouk" },
                { "@type": "ListItem", position: 5, name: "Suta" },
                { "@type": "ListItem", position: 6, name: "Slurrp Farm", url: "https://slurrpfarm.com" },
              ],
            },
          },
        ]}
      />
      <HeroSection />
      <section className="hero-section position-relative overflow-hidden py-5">
        {/* Floating shapes */}
        <div
          className="hero-background position-absolute w-100 h-100"
          style={{ zIndex: 1 }}
        >
          {floatingShapes.map((shape, i) => (
            <motion.div
              key={i}
              className="floating-shape position-absolute rounded-circle opacity-75"
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

        <Container className="position-relative py-5" style={{ zIndex: 2 }}>
          {/* Header */}
          <Row className="mb-5 text-center">
            <Col>
              <h2 className="display-2 fw-bold mb-3 text-dark">
                <span className="text-danger">Who</span> Are We?
              </h2>
              <p className="fs-5 text-dark fw-semibold opacity-85 mx-auto col-lg-8">
                We are a forward-thinking top marketing company driven by
                innovation, creativity, and excellence.
              </p>
            </Col>
          </Row>

          {/* About */}
          <Row className="mb-5 align-items-center">
            <Col lg={6}>
              <img
                src={Brandsetu}
                alt="The BrandSetu Digital team at our agency office in Indore"
                className="img-fluid rounded-4 shadow-lg"
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
              />
            </Col>
            <Col lg={6}>
              <h2 className="fw-bold mb-3 text-dark">Why<span className="text-danger"> We </span>Exist!!!</h2>
              <p className="fs-5 text-dark text-justify fw-semibold opacity-85">
                We help brands grow through clear strategy, smart execution, and
                measurable results. Our focus is on building long-term value by
                understanding your business goals and delivering solutions that
               truly work.  <br /> 
               Founded with the goal of transforming bold
                ideas into reality, we are a passionate team committed to
                innovation.
              </p>
            </Col>
          </Row>

          {/* Problem, Strategy, Solution */}
          <Row className="mb-5 text-center justify-content-center">
            {[
              {
                img: ProblemImg,
                title: "Problem",
                text: "Many businesses struggle with low online visibility, inconsistent branding, and poor digital engagement. Limited technical knowledge and ineffective marketing strategies prevent them from reaching the right audience. Manual processes slow growth and increase operational costs.",
              },
              {
                img: StrategyImg,
                title: "Strategy",
                text: "BrandSetu adopts a research-driven and customer-centric digital strategy tailored to each business. We analyze market trends, audience behavior, and competitors to create impactful brand positioning. Our approach combines creative design, performance marketing, and automation.",
              },
              {
                img: SolutionImg,
                title: "Solution",
                text: "BrandSetu delivers end-to-end digital solutions including branding, websites, SEO, paid ads, and automation. We leverage modern tools and technologies to build a strong online presence for businesses. Our solutions improve visibility, lead generation, and brand credibility.",
              },
            ].map((item, index) => (
              <Col lg={4} md={6} className="mb-5" key={index}>
                <div className="mvv-modern-container position-relative overflow-hidden">
                  <div className="mvv-circle-bg"></div>
                  <motion.img
                    src={item.img}
                    alt={`${item.title} — BrandSetu Digital approach`}
                    className="mvv-modern-icon"
                    width="200"
                    height="200"
                    loading="lazy"
                    decoding="async"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  />
                  <h3 className="fw-bold mt-4 text-dark display-6">
                    {item.title}
                  </h3>
                  <p className="text-dark opacity-85  mt-2">{item.text}</p>
                </div>
              </Col>
            ))}
          </Row>

          {/* Team Section */}
          <Row className="team-section">
            <Row className="mb-3 text-center">
              <Col>
                <h2 className="fw-bold text-dark display-3">
                  The <span className="text-danger">Minds</span> Behind{" "}
                  <span className="text-danger">BrandSetu</span>
                </h2>
                <p className="text-dark fs-5 fw-semibold opacity-85">
                  Passionate people shaping powerful brands.
                </p>
              </Col>
            </Row>

            {/* Founders */}
            <Row id="team-section" className="justify-content-center mb-5">
              <Col xs={12} className="text-center mb-4">
                <h3 className="fw-bold text-danger display-5">Founders</h3>
              </Col>
              {[
                {
                  name: "Soumitra Bajpai",
                  role: "Co-Founder",
                  img: Founder1,
                },
                {
                  name: "Devesh Jain",
                  role: "Co-Founder",
                  img: Founder2,
                },
              ].map((founder, i) => (
                <Col lg={4} md={6} className="mb-4" key={i}>
                  <div className="team-member founder">
                    <div className="team-image">
                      <img src={founder.img} alt={`${founder.name}, ${founder.role} at BrandSetu Digital`} width="400" height="500" loading="lazy" decoding="async" />
                    </div>
                    <div className="team-info">
                      <h4 className="fs-5">{founder.name}</h4>
                      <span className="text-danger fw-semibold">
                        {founder.role}
                      </span>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

            {/* Core Team */}
            <Row>
              <Col xs={12} className="text-center mb-5 mt-3">
                <h3 className="fw-bold display-6 text-danger">
                  Pillars Of <span className="text-dark">BrandSetu</span>
                </h3>
              </Col>
              {[
                {
                  name: "Garvit Jain",
                  role: "Media Handler",
                  img: yuvraj,
                },
                {
                  name: "Shivani Kushwah",
                  role: "Growth Strategist",
                  img: shivani,
                },
                {
                  name: "Mansi Gupta",
                  role: "Analytics & Operations",
                  img: mansi,
                },
                {
                  name: "Dipesh Bundele",
                  role: "Creative Lead",
                  img: Dipesh,
                },
              ].map((member, i) => (
                <Col lg={3} md={6} className="mb-4" key={i}>
                  <div className="team-member">
                    <div className="team-image">
                      <img src={member.img} alt={`${member.name}, ${member.role} at BrandSetu Digital`} width="400" height="500" loading="lazy" decoding="async" />
                    </div>
                    <div className="team-info">
                      <h4 className="fs-5">{member.name}</h4>
                      <span className="text-danger fw-semibold">
                        {member.role}
                      </span>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Row>

          {/* Explore Work */}
          <Row id="work-section" className="work-section my-5 pt-3   mt-5">
            <Row className="text-center mb-5">
              <Col>
                <h2 className="fw-bold display-4">
                  Our <span className="text-danger">Work</span>
                </h2>
                <p className="text-muted fs-5 col-lg-7 mx-auto">
                  We collaborate with businesses, restaurants, and fashion
                  brands to create impactful digital experiences.
                </p>
              </Col>
            </Row>

            <Carousel
              interval={6000}
              pause={false}
              indicators={false}
              controls={false}
            >
              {[
                [
                  {
                    title: "Blue Tokai Studio",
                    tag: "Specialty Café",
                    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
                    desc: "Specialty coffee cafés focused on quality and community.",
                    link: "https://bluetokaicoffee.com",
                  },
                  {
                    title: "Cafe Peter",
                    tag: "Restaurant & Café",
                    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
                    desc: "Modern café chain with strong youth-focused branding.",
                    link: "https://cafepeter.com",
                  },
                  {
                    title: "Chaayos",
                    tag: "Food & Beverage",
                    img: "https://images.unsplash.com/photo-1511920170033-f8396924c348",
                    desc: "Indian tea café brand with digital-first growth.",
                    link: "https://www.chaayos.com",
                  },
                ],
                [
                  {
                    title: "Zouk",
                    tag: "Lifestyle Brand",
                    img: "https://images.unsplash.com/photo-1585386959984-a41552262f3b",
                    desc: "Vegan lifestyle bags with strong D2C presence.",
                    link: "https://zouk.co.in",
                  },
                  {
                    title: "Suta",
                    tag: "Fashion & Textiles",
                    img: "https://images.unsplash.com/photo-1520974735194-6c9f63c45e91",
                    desc: "Handwoven saree brand with community storytelling.",
                    link: "https://suta.in",
                  },
                  {
                    title: "Okhai",
                    tag: "Ethical Fashion",
                    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
                    desc: "Artisan-led fashion rooted in Indian crafts.",
                    link: "https://okhai.org",
                  },
                ],
                [
                  {
                    title: "Bombay Shaving Co.",
                    tag: "Men’s Grooming",
                    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
                    desc: "Modern grooming brand with digital-first strategy.",
                    link: "https://bombayshavingcompany.com",
                  },
                  {
                    title: "Bare Anatomy",
                    tag: "Personal Care",
                    img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908",
                    desc: "Customized hair and skincare solutions.",
                    link: "https://bareanatomy.com",
                  },
                  {
                    title: "The Whole Truth",
                    tag: "Clean Nutrition",
                    img: "https://images.unsplash.com/photo-1551024709-8f23befc6cf7",
                    desc: "Clean-label food brand with transparent ingredients.",
                    link: "https://thewholetruthfoods.com",
                  },
                ],
                [
                  {
                    title: "Vahdam",
                    tag: "D2C Wellness",
                    img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574",
                    desc: "Tea and wellness brand exporting globally.",
                    link: "https://www.vahdamteas.com",
                  },
                  {
                    title: "Country Delight",
                    tag: "Dairy & FMCG",
                    img: "https://images.unsplash.com/photo-1589927986089-35812388d1f4",
                    desc: "Farm-to-home dairy brand using tech-led delivery.",
                    link: "https://countrydelight.in",
                  },
                  {
                    title: "Slurrp Farm",
                    tag: "Kids Nutrition",
                    img: "https://images.unsplash.com/photo-1604908177522-402f07c7f3a4",
                    desc: "Wholesome nutrition brand for children.",
                    link: "https://slurrpfarm.com",
                  },
                ],
              ].map((slide, idx) => (
                <Carousel.Item key={idx}>
                  <Row className="g-4">
                    {slide.map((item, i) => (
                      <Col lg={4} md={6} key={i}>
                        <div className="work-card">
                          <div className="work-card-img">
                            <img src={item.img} alt={`${item.title} — ${item.tag}`} width="600" height="450" loading="lazy" decoding="async" />
                          </div>
                          <div className="work-card-content">
                            <span className="work-tag">{item.tag}</span>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="work-link"
                            >
                              View more →
                            </a>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          </Row>
        </Container>
      </section>
    </>
  );
}
