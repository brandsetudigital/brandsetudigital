import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import "../../Style/Home.css";

const homeFaqs = [
  {
    number: "01",
    question: "What services does BrandSetu Digital offer?",
    answer: (
      <>
        <p className="mb-3 fs-5">
          BrandSetu Digital provides end-to-end digital solutions to help businesses build, scale, and transform their brands. Our core services include:
        </p>
        <ul className="ps-4 mb-0 d-flex flex-column gap-2 fs-5">
          <li>Website & App Development</li>
          <li>SEO (Search Engine Optimization)</li>
          <li>Google & Meta Ads</li>
          <li>Social Media Marketing</li>
          <li>Branding & Graphic Design</li>
          <li>Marketing Automation</li>
        </ul>
      </>
    ),
  },
  {
    number: "02",
    question: "Who do you typically work with?",
    answer: (
      <>
        <p className="mb-3 fs-5">
          We partner with startups, local businesses, D2C brands, entrepreneurs, and established companies looking to:
        </p>
        <ul className="ps-4 mb-0 d-flex flex-column gap-2 fs-5">
          <li>Strengthen their online presence</li>
          <li>Attract quality leads and customers</li>
          <li>Leverage digital channels and modern technology for sustainable growth</li>
        </ul>
      </>
    ),
  },
  {
    number: "03",
    question: "How do you create strategies for your clients?",
    answer: (
      <>
        <p className="mb-3 fs-5">
          We don't believe in one-size-fits-all solutions. Our process starts with deeply understanding your:
        </p>
        <ul className="ps-4 mb-3 d-flex flex-column gap-2 fs-5">
          <li>Target audience</li>
          <li>Market and competition</li>
          <li>Business goals and KPIs</li>
        </ul>
        <p className="mb-0 fs-5">
          We then craft a data-driven strategy focused on the channels and activities that will yield the highest ROI for your specific objectives.
        </p>
      </>
    ),
  },
  {
    number: "04",
    question: "Can you manage multiple aspects of our digital presence?",
    answer: (
      <p className="mb-0 fs-5">
        Absolutely. Think of us as your extended digital team. We bring technology, creative design, marketing, and automation expertise together under one roof. This makes it seamless to manage your entire digital ecosystem without the hassle of coordinating with multiple freelancers or agencies.
      </p>
    ),
  },
  {
    number: "05",
    question: "Do you provide complete branding and creative design?",
    answer: (
      <>
        <p className="mb-3 fs-5">
          Yes, our branding and creative services help establish a clear, memorable, and consistent identity across all customer touchpoints. These include:
        </p>
        <ul className="ps-4 mb-0 d-flex flex-column gap-2 fs-5">
          <li>Logo Design</li>
          <li>Visual Identity & Brand Guidelines</li>
          <li>Brand Strategy</li>
          <li>Social Media Creatives</li>
          <li>Marketing Collateral (brochures, pitch decks, banners)</li>
          <li>Custom Brand Assets as needed</li>
        </ul>
      </>
    ),
  },
  {
    number: "06",
    question: "How long does it take to see results, and what does it cost?",
    answer: (
      <>
        <p className="mb-3 fs-5">
          Timelines and costs vary depending on the service, industry, competition, scope, and objectives.
        </p>
        <ul className="ps-4 mb-3 d-flex flex-column gap-2 fs-5">
          <li>
            <strong>Paid Ads:</strong> Campaigns can begin generating performance data and potential leads soon after launch, depending on targeting, budget, and market conditions.
          </li>
          <li>
            <strong>SEO & Organic Brand Building:</strong> These typically require consistent effort over 3 to 6 months to build meaningful and sustainable traction.
          </li>
        </ul>
        <p className="mb-0 fs-5">
          After an initial discovery call, we provide a customized plan with clear deliverables, timelines, and transparent pricing.
        </p>
      </>
    ),
  },
  {
    number: "07",
    question: "Do you work with clients outside Indore?",
    answer: (
      <p className="mb-0 fs-5">
        Yes. While we're proudly based in Indore, we work with businesses across India and international markets. Strategy, communication, and project execution are seamlessly managed remotely using video meetings, email, WhatsApp, and robust project management tools.
      </p>
    ),
  },
  {
    number: "08",
    question: "Why should I choose BrandSetu Digital?",
    answer: (
      <p className="mb-0 fs-5">
        Unlike traditional agencies, we don't just deliver isolated services. We focus on solving core business challenges through the perfect combination of technology, branding, creativity, marketing, and automation. Our solutions are tailor-made for your specific business needs rather than forcing you into rigid, one-size-fits-all packages.
      </p>
    ),
  },
  {
    number: "09",
    question: "How do I get started?",
    answer: (
      <p className="mb-0 fs-5">
        Getting started is simple. Share your business details and requirements through our contact form, email, or WhatsApp. We'll set up a quick discovery conversation to understand your current situation, challenges, and objectives. From there, we'll recommend the most relevant approach and share a clear, customized proposal outlining the next steps.
      </p>
    ),
  },
];

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const INITIAL_COUNT = 5;
  const visibleFaqs = showAll ? homeFaqs : homeFaqs.slice(0, INITIAL_COUNT);

  return (
    <section className="home-faq-section py-5 pt-5 mt-5 position-relative z-1" id="faq-section">
        <Container>
        {/* SECTION HEADER - MATCHED WITH WHY CHOOSE / PROCESS HEADERS */}
        <div className="text-center mb-5 header-section">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="brands-pill fw-bold">GOT QUESTIONS?</span>
          </motion.div>

          <h2 className="display-2 fw-bold">
            Frequently Asked <span className="text-danger">Questions</span>
          </h2>

          <p className="lead text-muted fw-semibold mx-auto col-lg-8">
            Everything you need to know before building, growing or scaling your brand.
          </p>
        </div>

        {/* ACCORDION CONTENT - FULL MATCHED WIDTH (12 COLUMNS) */}
        <Row className="justify-content-center">
          <Col lg={12}>
            <div className="faq-list-wrapper d-flex flex-column gap-3 mb-4">
              {visibleFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <motion.div
                    key={faq.number}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: (idx % INITIAL_COUNT) * 0.05 }}
                    className={`home-faq-item rounded-4 transition-all shadow-sm ${
                      isOpen ? "faq-open" : ""
                    }`}
                    style={{
                      backgroundColor: isOpen ? "#000000" : "rgba(255, 255, 255, 0.95)",
                      border: isOpen
                        ? "1px solid rgba(250, 204, 21, 0.5)"
                        : "1px solid rgba(0, 0, 0, 0.1)",
                      backdropFilter: "blur(10px)",
                      overflow: "hidden",
                    }}
                  >
                    <button
                      className="w-100 p-4 px-md-5 d-flex justify-content-between align-items-center text-start border-0 bg-transparent"
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                    >
                      <div className="d-flex align-items-center gap-3 pe-3">
                        <span
                          className={`fw-bold px-3 py-2 rounded-3 fs-5 ${
                            isOpen
                              ? "bg-warning text-dark"
                              : "bg-dark bg-opacity-10 text-dark"
                          }`}
                          style={{ minWidth: "46px", textAlign: "center" }}
                        >
                          {faq.number}
                        </span>
                        <span
                          className={`fw-bold fs-4 mb-0 ${
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
                        style={{ width: "42px", height: "42px" }}
                      >
                        {isOpen ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
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
                          <div className="px-4 px-md-5 pb-4 text-light opacity-95 fs-5 lh-lg border-top border-secondary pt-3">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* VIEW MORE / VIEW LESS BUTTON */}
            {homeFaqs.length > INITIAL_COUNT && (
              <div className="text-center mt-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setShowAll((prev) => !prev);
                  }}
                  className="btn btn-outline-dark rounded-pill px-5 py-3 fw-bold fs-5 d-inline-flex align-items-center gap-2 shadow-sm"
                  style={{ borderWidth: "2px" }}
                >
                  {showAll ? (
                    <>
                      Show Less FAQs <ChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      View More FAQs ({homeFaqs.length - INITIAL_COUNT} More) <ChevronDown size={20} />
                    </>
                  )}
                </motion.button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}
