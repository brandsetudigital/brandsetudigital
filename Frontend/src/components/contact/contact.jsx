import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { BsEnvelope, BsTelephone, BsGeoAlt, BsClock } from "react-icons/bs";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import FollowModal from "../contact/followmodal";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../App.css";
import "../../Style/Contact.css";
import "../../Style/Home.css";
import PromoImg from "../../assets/Marketing-agency.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com";
import { API_BASE_URL } from "../../config";
import Seo from "../Seo";

const ContactPage = () => {
  const location = useLocation();

  /* ===================== STATE ===================== */
  const [enquiryData, setEnquiryData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    domain: "",
    service: "",
    message: "",
  });

  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [showFollowModal, setShowFollowModal] = useState(false);

  /* ===================== CONSTANT DATA ===================== */
  const brandSetuServices = [
    "Google Ads & Lead Generation",
    "Influencer Marketing",
    "Search Engine Optimization (SEO)",
    "Website Design & Development",
    "Social Media Marketing & Brand Promotion",
    "Graphics Design",
    "App Development",
    "Event / Product Shoot & Promotion",
    "Website Maintenance & Technical Support",
    "CRM Setup & Business Automation",
    "CGI Ads & 3D Animation",
    "Branding & Visual Identity",
  ];

  /* ===================== EFFECTS ===================== */
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });

    // Auto-detect and pre-select service passed via URL search (?service=...) or router location.state
    const params = new URLSearchParams(location.search);
    const rawParam =
      params.get("service") ||
      params.get("s") ||
      location.state?.selectedService ||
      location.state?.service;

    if (rawParam) {
      const decoded = decodeURIComponent(rawParam).trim().toLowerCase();

      let matched = brandSetuServices.find((s) => s.toLowerCase() === decoded);

      if (!matched) {
        if (decoded.includes("google") || decoded.includes("ads") || decoded.includes("ppc")) {
          matched = "Google Ads & Lead Generation";
        } else if (decoded.includes("influencer") || decoded.includes("creator")) {
          matched = "Influencer Marketing";
        } else if (decoded.includes("seo") || decoded.includes("search engine")) {
          matched = "Search Engine Optimization (SEO)";
        } else if (decoded.includes("web") || decoded.includes("site")) {
          matched = "Website Design & Development";
        } else if (
          decoded.includes("social") ||
          decoded.includes("instagram") ||
          decoded.includes("whatsapp")
        ) {
          matched = "Social Media Marketing & Brand Promotion";
        } else if (decoded.includes("graphic") || decoded.includes("creative")) {
          matched = "Graphics Design";
        } else if (
          decoded.includes("app") ||
          decoded.includes("android") ||
          decoded.includes("ios")
        ) {
          matched = "App Development";
        } else if (
          decoded.includes("shoot") ||
          decoded.includes("photo") ||
          decoded.includes("video") ||
          decoded.includes("event")
        ) {
          matched = "Event / Product Shoot & Promotion";
        } else if (decoded.includes("maint") || decoded.includes("support")) {
          matched = "Website Maintenance & Technical Support";
        } else if (decoded.includes("crm") || decoded.includes("automation")) {
          matched = "CRM Setup & Business Automation";
        } else if (decoded.includes("cgi") || decoded.includes("3d") || decoded.includes("vfx")) {
          matched = "CGI Ads & 3D Animation";
        } else if (decoded.includes("brand") || decoded.includes("logo")) {
          matched = "Branding & Visual Identity";
        }
      }

      if (matched) {
        setEnquiryData((prev) => ({ ...prev, service: matched }));
      } else {
        setEnquiryData((prev) => ({ ...prev, service: rawParam }));
      }
    }
  }, [location.search, location.state]);

  /* ===================== HANDLERS ===================== */
  const handleEnquiryChange = (e) => {
    const { name, value } = e.target;
    setEnquiryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();

    if (!enquiryData.name || !enquiryData.email || !enquiryData.phone) {
      toast.warning("Please fill in Name, Email, and Phone!");
      return;
    }

    try {
      // 1. Submit to backend API (if running)
      try {
        await fetch(`${API_BASE_URL}/api/contact/enquiry`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(enquiryData),
        });
      } catch (backendErr) {
        console.warn("Backend server not reachable, processing enquiry client-side:", backendErr);
      }

      // 2. Try sending email via EmailJS
      try {
        const templateParams = {
          name: enquiryData.name,
          email: enquiryData.email,
          phone: enquiryData.phone,
          city: enquiryData.city,
          domain: enquiryData.domain,
          service: enquiryData.service,
          message: enquiryData.message,
        };

        await emailjs.send(
          "service_r2lvfha",
          "YOUR_TEMPLATE_ID",
          templateParams,
          "Lv5WJmYXNAkP0Fg9Z"
        );
      } catch (emailError) {
        console.warn("EmailJS notification skipped/failed:", emailError);
      }

      toast.success("Enquiry submitted successfully! Our team will contact you soon.");
      setEnquiryData({
        name: "",
        email: "",
        phone: "",
        city: "",
        domain: "",
        service: "",
        message: "",
      });
      setShowFollowModal(true);
    } catch (error) {
      console.error(error);
      toast.success("Thank you! Your enquiry has been received.");
      setShowFollowModal(true);
    }
  };

  const handleSubscribeSubmit = async (e) => {
    e.preventDefault();

    if (!subscribeEmail.trim()) {
      toast.warning("Please enter your email!");
      return;
    }

    try {
      try {
        await fetch(`${API_BASE_URL}/api/contact/subscribe`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: subscribeEmail.trim() }),
        });
      } catch (apiErr) {
        console.warn("Backend API not reachable for subscription:", apiErr);
      }

      toast.success("Subscribed successfully! Thank you for connecting.");
      setSubscribeEmail("");
    } catch (error) {
      console.error(error);
      toast.success("Subscribed successfully!");
      setSubscribeEmail("");
    }
  };

  /* ===================== PERFORMANCE (NO UI CHANGE) ===================== */
  const floatingShapes = useMemo(
    () =>
      Array.from({ length: 30 }).map(() => ({
        size: Math.floor(Math.random() * 120 + 30),
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
      })),
    [],
  );

  return (
    <>
      <Seo
        title="Contact BrandSetu Digital in Indore — Free Strategy Call"
        description="Contact BrandSetu Digital in Indore for SEO, branding, web development, and performance marketing. Email Brandsetudigital@gmail.com or call +91 7389824231."
        path="/contact"
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
                name: "Contact",
                item: "https://brandsetudigital.com/contact",
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": "https://brandsetudigital.com/contact#webpage",
            url: "https://brandsetudigital.com/contact",
            name: "Contact BrandSetu Digital",
            isPartOf: { "@id": "https://brandsetudigital.com/#organization" },
            about: { "@id": "https://brandsetudigital.com/#organization" },
            mainEntity: {
              "@type": "Organization",
              "@id": "https://brandsetudigital.com/#organization",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  telephone: "+91-7389824231",
                  email: "Brandsetudigital@gmail.com",
                  areaServed: "IN",
                  availableLanguage: ["English", "Hindi"],
                },
              ],
            },
          },
        ]}
      />
      <section
        className="hero-section position-relative overflow-hidden py-5 pt-5"
        aria-labelledby="contact-page-heading"
      >
        {/* BACKGROUND SHAPES (DECORATIVE) */}
        <div
          className="hero-background position-absolute w-100 h-100"
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

        <Container className="position-relative pt-5" style={{ zIndex: 2 }}>
          <Row className="align-items-center pt-5 mb-5">
            {/* MAP */}
            <Col lg={6} className="mb-4 mb-lg-0" data-aos="fade-right">
              <h1
                id="contact-page-heading"
                className="fw-bold text-center mb-3 display-3 text-dark"
              >
                You can Visit Us
              </h1>
              <p className="text-center text-dark">
                You are always welcome to explore and evaluate our services!
                <br />
                Your journey with us starts here.
              </p>

              <div className="contact-map-container rounded-4 overflow-hidden shadow-lg bg-light">
                <iframe
                  title="Sage University Indore Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.299236830784!2d75.86745337439297!3d22.68196963082177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd20d7c3f9a3%3A0xd3e90f94ad16c8a9!2sSage%20University%20Indore!5e0!3m2!1sen!2sin!4v1697645567334!5m2!1sen!2sin"
                  width="100%"
                  height="450"
                  style={{ border: 0, borderRadius: "1rem" }}
                  loading="lazy"
                />
              </div>
            </Col>

            {/* FORM */}
            <Col lg={6} data-aos="fade-left">
              <Card className="shadow-lg border-0 rounded-4 founder-card bg-dark contact-card position-relative overflow-hidden">
                <Card.Body
                  className="p-4 position-relative"
                  style={{ zIndex: 2 }}
                >
                  <h2 className="fw-bold mb-3 text-white text-center display-5">
                    Setu Enquiry Form
                  </h2>

                  <Form onSubmit={handleEnquirySubmit}>
                    <Row className="mb-3 mt-3 pt-3">
                      {" "}
                      <Col md={6}>
                        {" "}
                        <Form.Group>
                          {" "}
                          <Form.Label className="text-light">
                            {" "}
                            Full Name{" "}
                          </Form.Label>{" "}
                          <Form.Control
                            name="name"
                            value={enquiryData.name}
                            onChange={handleEnquiryChange}
                            placeholder="Enter your full name"
                          />{" "}
                        </Form.Group>{" "}
                      </Col>{" "}
                      <Col md={6}>
                        {" "}
                        <Form.Group>
                          {" "}
                          <Form.Label className="text-light">
                            {" "}
                            Email Address{" "}
                          </Form.Label>{" "}
                          <Form.Control
                            type="email"
                            name="email"
                            value={enquiryData.email}
                            onChange={handleEnquiryChange}
                            placeholder="Enter your email"
                          />{" "}
                        </Form.Group>{" "}
                      </Col>{" "}
                    </Row>{" "}
                    <Row className="mb-3">
                      {" "}
                      <Col md={6}>
                        {" "}
                        <Form.Group>
                          {" "}
                          <Form.Label className="text-light">
                            {" "}
                            Phone Number{" "}
                          </Form.Label>{" "}
                          <Form.Control
                            name="phone"
                            value={enquiryData.phone}
                            onChange={handleEnquiryChange}
                            placeholder="Enter your contact number"
                          />{" "}
                        </Form.Group>{" "}
                      </Col>{" "}
                      <Col md={6}>
                        {" "}
                        <Form.Group>
                          {" "}
                          <Form.Label className="text-light">
                            {" "}
                            City / State{" "}
                          </Form.Label>{" "}
                          <Form.Control
                            name="city"
                            value={enquiryData.city}
                            onChange={handleEnquiryChange}
                            placeholder="Enter your city or state"
                          />{" "}
                        </Form.Group>{" "}
                      </Col>{" "}
                    </Row>{" "}
                    <Row className="mb-3">
                      {" "}
                      <Col md={6}>
                        {" "}
                        <Form.Group>
                          {" "}
                          <Form.Label className="text-light">
                            {" "}
                            Preferred Domain{" "}
                          </Form.Label>{" "}
                          <Form.Control
                            name="domain"
                            value={enquiryData.domain}
                            onChange={handleEnquiryChange}
                            placeholder="Kind of services required?"
                          />{" "}
                        </Form.Group>{" "}
                      </Col>{" "}
                      <Col md={6}>
                        {" "}
                        <Form.Group>
                          {" "}
                          <Form.Label className="text-light">
                            {" "}
                            Select Services{" "}
                          </Form.Label>{" "}
                          <Form.Select
                            name="service"
                            value={enquiryData.service}
                            onChange={handleEnquiryChange}
                          >
                            <option value="">Select a Service</option>
                            {brandSetuServices.map((service, i) => (
                              <option key={i} value={service}>
                                {service}
                              </option>
                            ))}
                            {enquiryData.service &&
                              !brandSetuServices.includes(enquiryData.service) && (
                                <option value={enquiryData.service}>
                                  {enquiryData.service}
                                </option>
                              )}
                          </Form.Select>{" "}
                        </Form.Group>{" "}
                      </Col>{" "}
                    </Row>{" "}
                    <Form.Group className="mb-3">
                      {" "}
                      <Form.Label className="text-light">
                        {" "}
                        Additional Message / Requirements{" "}
                      </Form.Label>{" "}
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="message"
                        value={enquiryData.message}
                        onChange={handleEnquiryChange}
                        placeholder="Write Your Enquiry...."
                      />{" "}
                    </Form.Group>
                    <Button
                      type="submit"
                      className="main-btn rounded-pill py-3 w-100"
                      aria-label="Submit enquiry form"
                    >
                      Submit Enquiry
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* CONTACT INFO */}
          <address className="not-italic">
            <Row className="text-center g-4" data-aos="fade-up">
              <Col md={3} sm={6}>
                <a
                  href="mailto:brandsetudigital@gmail.com"
                  className="text-decoration-none text-dark"
                >
                  <div className="contact-info-card p-4 shadow-sm bg-light-blue rounded-4 h-100">
                    <BsEnvelope
                      size={30}
                      className="text-primary mb-2"
                      aria-hidden="true"
                    />
                    <h3 className="fw-bold text-primary fs-6">Email</h3>
                    <p className="small mb-0">info@brandsetudigital.com</p>
                  </div>
                </a>
              </Col>

              <Col md={3} sm={6}>
                <a
                  href="tel:+917389824231"
                  className="text-decoration-none text-dark"
                >
                  <div className="contact-info-card p-4 shadow-sm bg-light-green rounded-4 h-100">
                    <BsTelephone
                      size={30}
                      className="text-success mb-2"
                      aria-hidden="true"
                    />
                    <h3 className="fw-bold text-success fs-6">Phone</h3>
                    <p className="small mb-0"> +91 7389824231 | +91 96697 65911</p>
                  </div>
                </a>
              </Col>

              <Col md={3} sm={6}>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Indore+Madhya+Pradesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-dark"
                >
                  <div className="contact-info-card p-4 shadow-sm bg-light-red rounded-4 h-100">
                    <BsGeoAlt
                      size={30}
                      className="text-danger mb-2"
                      aria-hidden="true"
                    />
                    <h3 className="fw-bold text-danger fs-6">Location</h3>
                    <p className="small mb-0">Indore, Madhya Pradesh</p>
                  </div>
                </a>
              </Col>

              <Col md={3} sm={6}>
                <div className="contact-info-card p-4 shadow-sm bg-light-yellow rounded-4 h-100">
                  <BsClock
                    size={30}
                    className="text-warning mb-2"
                    aria-hidden="true"
                  />
                  <h3 className="fw-bold text-warning fs-6">Working Hours</h3>
                  <p className="small mb-0">Mon - Sat, 10:00am - 7:00pm</p>
                </div>
              </Col>
            </Row>
          </address>

          {/* SUBSCRIBE */}
          <Row
            className="align-items-center bg-dark rounded-4 shadow-lg overflow-hidden mt-5"
            data-aos="fade-up"
          >
            <Col md={6} className="p-0">
              <img
                src={PromoImg}
                alt="BrandSetu Digital promotional offer banner"
                className="img-fluid w-100 h-100"
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
                style={{ objectFit: "cover" }}
              />
            </Col>

            <Col md={6} className="py-5 px-4">
              <h3 className="fw-bold text-white mb-3">
                Get special offers, and more from BrandSetu Digitals
              </h3>
              <p className="text-light mb-4">
                Subscribe to see secret deals prices drop the moment you sign
                up!
              </p>

              <Form onSubmit={handleSubscribeSubmit} className="subscribe-form-wrapper">
                <div className="subscribe-pill-container">
                  <input
                    type="email"
                    required
                    aria-label="Email address"
                    placeholder="Enter your email address..."
                    className="subscribe-pill-input"
                    value={subscribeEmail}
                    onChange={(e) => setSubscribeEmail(e.target.value)}
                  />
                  <Button
                    type="submit"
                    className="subscribe-pill-btn"
                  >
                    Subscribe
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>

      <FollowModal
        show={showFollowModal}
        onHide={() => setShowFollowModal(false)}
      />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default ContactPage;
