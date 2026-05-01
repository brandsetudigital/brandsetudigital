import React, { useEffect, useState, useMemo } from "react";
import { BsEnvelope, BsTelephone, BsGeoAlt, BsClock } from "react-icons/bs";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  InputGroup,
  FormControl,
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
import Seo from "../Seo";

const ContactPage = () => {
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

  /* ===================== EFFECTS ===================== */
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  /* ===================== CONSTANT DATA ===================== */
  const brandSetuServices = [
    "Website Design",
    "SEO",
    "Google Ads & Meta Ads",
    "Social Media Marketing",
    "Branding",
    "App Development",
    "Automation",
    "Maintenance",
    "Video Editing",
    "Photo Shoot",
  ];

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
      const res = await fetch("http://localhost:5000/api/contact/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiryData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Enquiry submitted successfully!");
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
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch {
      toast.error("Server error! Please try again later.");
    }
  };

  const handleSubscribeSubmit = async (e) => {
    e.preventDefault();

    if (!subscribeEmail.trim()) {
      toast.warning("Please enter your email!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/contact/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: subscribeEmail.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Subscribed successfully!");
        setSubscribeEmail("");
      } else {
        toast.error(data.message || "Subscription failed!");
      }
    } catch {
      toast.error("Server error! Please try again later.");
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
        description="Contact BrandSetu Digital in Indore for SEO, branding, web development, and performance marketing. Email Brandsetudigital@gmail.com or call +91 6232363639."
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
                  telephone: "+91-6232363639",
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.299236830784!2d75.86745337439297!3d22.68196963082177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd20d7c3f9a3%3A0xd3e90f94ad16c8a9!2sSage%20University%20Indore!5e0!3m2!1sen!2sin!4v1697645567334!5m2!1sen!2sin&t=k"
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
                            {" "}
                            <option value="">Select a Service</option>{" "}
                            {brandSetuServices.map((service, i) => (
                              <option key={i}>{service}</option>
                            ))}{" "}
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
                  href="tel:+916232363639"
                  className="text-decoration-none text-dark"
                >
                  <div className="contact-info-card p-4 shadow-sm bg-light-green rounded-4 h-100">
                    <BsTelephone
                      size={30}
                      className="text-success mb-2"
                      aria-hidden="true"
                    />
                    <h3 className="fw-bold text-success fs-6">Phone</h3>
                    <p className="small mb-0">+91 6232363639</p>
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

              <Form onSubmit={handleSubscribeSubmit}>
                <InputGroup>
                  <FormControl
                    type="email"
                    required
                    aria-label="Email address"
                    placeholder="Enter Your Email Address..."
                    className="rounded-pill me-3"
                    value={subscribeEmail}
                    onChange={(e) => setSubscribeEmail(e.target.value)}
                  />
                  <Button
                    type="submit"
                    className="main-btn rounded-pill px-5 py-3"
                  >
                    Subscribe
                  </Button>
                </InputGroup>
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
