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
            Driven by passion, strategic vision, and 15+ years of digital excellence to turn ambitious businesses into market leaders.
          </p>
        </div>

        {/* Founder Card */}
        <Row className="justify-content-center mb-5">
          <Col md={10} lg={8} data-aos="fade-up">
            <Card className="h-100 border-0 shadow-lg rounded-4 overflow-hidden visionary-card">
              <Row className="g-0 align-items-center">
                <Col md={5}>
                  <div className="visionary-image-container h-100">
                    <img
                      src={customBoyImage}
                      alt="Saumitra Bajpai, Founder & CEO of BrandSetu Digital"
                      className="img-fluid w-100 h-100 object-fit-cover"
                      width="600"
                      height="600"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </Col>
                <Col md={7}>
                  <Card.Body className="p-4 p-lg-5">
                    <span className="badge bg-danger mb-2 px-3 py-2 text-uppercase fw-bold">Leadership</span>
                    <h3 className="fw-bold mb-1 fs-3">SAUMITRA BAJPAI</h3>
                    <p className="text-warning fw-semibold mb-3 fs-5">
                      Founder & CEO
                    </p>
                    <p className="text-white text-justify mb-0 lh-lg">
                      At BrandSetu Digital, I bring over 15 years of experience to
                      help businesses grow with confidence and clarity. I understand
                      the frustration of putting in effort without seeing real
                      progress. That’s why my focus is on building trust, long-term
                      growth, and results that truly matter. My goal is to support
                      brands not just in growing faster, but in growing smarter and
                      stronger.
                    </p>
                  </Card.Body>
                </Col>
              </Row>
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
