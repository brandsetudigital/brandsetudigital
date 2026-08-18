import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { BsHeart, BsLightbulb, BsPeople } from "react-icons/bs";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../App.css";

import customBoyImage from "../../assets/founder-brandsetu.webp";
import customGirlImage from "../../assets/ceo-brandsetu.webp";

const VisionariesPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section className="container-fluid page-background position-relative overflow-hidden py-5">
      {/* Soft blobs – already in your theme */}
      <div className="blobss blobss1"></div>
      <div className="blobss blobss4"></div>
      <div className="blobss blobss5"></div>

      <Container className="position-relative">
        {/* Heading */}
        <div className="text-center mb-5">
          <h2
            className="display-4 fw-bold gradient-text mb-3"
            data-aos="fade-down"
          >
            Meet the Visionaries
          </h2>
          <p
            className="lead text-muted fw-semibold mx-auto"
            style={{ maxWidth: "720px" }}
            data-aos="fade-up"
          >
            Built by two passionate professionals who believe in honest work, smart digital strategy, and long-term business growth.

          </p>
        </div>

        {/* Founder Cards */}
        <Row className="justify-content-center g-4 mb-5">
          {/* Founder 1 */}
          <Col md={6} lg={5} data-aos="fade-right">
            <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden visionary-card">
              <div className="visionary-image-container">
                <img
                  src={customBoyImage}
                  alt="Soumitra Bajpai, Co-Founder of BrandSetu Digital"
                  className="img-fluid w-100"
                  width="600"
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <Card.Body className="p-4">
                <h3 className="fw-bold mb-1 fs-5">SOUMITRA BAJPAI</h3>
                <p className="text-warning  fw-semibold mb-3">
                  Co-Founder & Visionary
                </p>
                <p className="text-white text-justify mb-0">
                  At Brand Setu Digital, I bring over 15 years of experience to
                  help businesses grow with confidence and clarity. I understand
                  the frustration of putting in effort without seeing real
                  progress. That’s why my focus is on building trust, long-term
                  growth, and results that truly matter. My goal is to support
                  brands not just in growing faster, but in growing smarter and
                  stronger.
                </p>
              </Card.Body>
            </Card>
          </Col>

          {/* Founder 2 */}
          <Col md={6} lg={5} data-aos="fade-left">
            <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden visionary-card">
              <div className="visionary-image-container">
                <img
                  src={customGirlImage}
                  alt="Devesh Jain, Co-Founder of BrandSetu Digital"
                  className="img-fluid w-100"
                  width="600"
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <Card.Body className="p-4">
                <h3 className="fw-bold mb-1 fs-5">DEVESH JAIN</h3>
                <p className="text-warning fw-semibold mb-3">
                  Co-Founder & Strategist
                </p>
                <p className="text-white text-justify mb-0">
                  At BrandSetu Digital, I bring 5+ years of experience working
                  closely with growing businesses and understanding their real
                  challenges. I believe growth is not about shortcuts, but about
                  patience, right decisions, and consistent effort. My focus is
                  on helping brands move forward with confidence, clear
                  direction, and a strong long-term vision they can truly
                  believe in.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Core Values */}
        <Row className="text-center g-4 mt-4">
          <Col md={4} data-aos="fade-up">
            <div className="icon-circle bg-success bg-opacity-75 mb-3 mx-auto">
              <BsHeart size={26} className="text-white" />
            </div>
            <h3 className="fw-bold fs-5">Friendship First</h3>
            <p className="text-dark px-3">
              Built on trust, respect, and years of friendship that transformed
              into a shared mission.
            </p>
          </Col>

          <Col md={4} data-aos="fade-up" data-aos-delay="150">
            <div className="icon-circle bg-dark bg-opacity-75 mb-3 mx-auto">
              <BsLightbulb size={26} className="text-white" />
            </div>
            <h3 className="fw-bold fs-5">Purpose-Driven Innovation</h3>
            <p className="text-dark px-3">
              Every feature is designed to solve real Businesses problems with
              simplicity and clarity.
            </p>
          </Col>

          <Col md={4} data-aos="fade-up" data-aos-delay="300">
            <div className="icon-circle bg-danger bg-opacity-75 mb-3 mx-auto">
              <BsPeople size={26} className="text-white" />
            </div>
            <h3 className="fw-bold fs-5">People-Centric Thinking</h3>
            <p className="text-dark px-3">
              designing strategies and digital experiences that prioritize real
              human needs.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default VisionariesPage;
