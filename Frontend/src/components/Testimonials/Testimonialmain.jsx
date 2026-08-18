import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Style/portfolio.css";
import Portfolio from "../../assets/Brandsetu-company-values.mp4";
import "../../App.css";

export default function HeroSection() {
  return (
    <section className="pf-hero position-relative overflow-hidden vh-100">
      {/* DIAGONAL SHAPE */}
      <div className="pf-diagonal"></div>

      <Container fluid className="h-100">
        <Row className="h-100 align-items-center">
          {/* LEFT CONTENT */}
          <Col
            lg={6}
            className="pf-left d-flex flex-column justify-content-center px-5"
          >
            <span className="pf-badge mb-4">WELCOME TO INNOVATION</span>

            <h1 className="display-2 fw-bold lh-1 mb-4">
              We Build The <br />
              <span className="text-dark">Future Today</span>
            </h1>

            <p className="fs-5 text-dark opacity-90 text-justify mb-5 col-lg-9">
              A forward-thinking company driven by innovation, creativity, and
              excellence. We transform bold ideas into exceptional realities
              that shape tomorrow&apos;s world.
            </p>

            <div className="d-flex gap-3">
              <a href="#work-section" className="btn pf-btn-primary px-5 py-3">
                Explore Our Work
              </a>
              <a
                href="#team-section"
                className="btn pf-btn-secondary px-5 py-3"
              >
                Meet The Team
              </a>
            </div>
          </Col>

          {/* RIGHT SIDE */}
          <Col
            lg={6}
            className="pf-right d-flex justify-content-center align-items-center position-relative h-100"
          >
            {/* GRID OVERLAY */}
            <div className="pf-grid"></div>

            <div className="pf-image-card shadow-lg rounded-4 p-3 pt-5">
              <video
                className="img-fluid rounded-3 pf-hero-video"
                src={Portfolio} 
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
