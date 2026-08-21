import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Style/Home.css";
import "../../App.css";

import Founder1Img from "../../assets/Founder-brandsetu-digital.webp";
import MissionValues from "../Home/mission";

const FounderPage = () => {
  return (
    <div className="founder-page position-relative overflow-hidden py-3">
      <MissionValues />

      {/* ===== HERO ===== */}
      <section className="founder-hero text-center d-flex align-items-center py-4">
        <Container>
          <h2 className="display-4 fw-bold text-dark mb-3">
            Meet Our <span className="text-danger">Founder & CEO</span>
          </h2>

          <p className="lead text-dark fw-bold mx-auto col-lg-8 mb-4">
            The visionary behind BRANDSETU who made exploring the market
            seamless, authentic, and meaningful.
          </p>
        </Container>
      </section>

      {/* ===== FOUNDER CARD (FULL SIZE & BALANCED) ===== */}
      <section className="founder-bio py-3 pb-5">
        <Container>
          <Row className="g-0 justify-content-center">
            <Col xs={12}>
              <div className="founder-card position-relative overflow-hidden p-4 p-md-5 d-flex flex-column flex-lg-row align-items-center gap-4 gap-lg-5 rounded-4 shadow w-100">
                {/* Theme Blobs */}
                <div className="bg-blob blob-1"></div>
                <div className="bg-blob blob-2"></div>

                {/* Left: Avatar */}
                <div className="position-relative z-2 text-center flex-shrink-0">
                  <img
                    src={Founder1Img}
                    alt="Saumitra Bajpai, Founder & CEO of BrandSetu Digital"
                    className="rounded-circle shadow founder-img"
                    width="240"
                    height="240"
                    loading="lazy"
                    decoding="async"
                    style={{ width: "240px", height: "240px", objectFit: "cover" }}
                  />
                </div>

                {/* Right: Content */}
                <div className="position-relative z-2 flex-grow-1 text-center text-lg-start">
                  <h3 className="fw-bold text-white mb-1 display-6">
                    Saumitra Bajpai
                  </h3>
                  <p className="text-warning fw-semibold mb-3 fs-5">
                    Founder & CEO
                  </p>
                  <p className="text-light text-justify mb-4 lh-lg" style={{ fontSize: "1.05rem" }}>
                    I am the Founder of BrandSetu Digital, a digital marketing agency focused on smart, practical marketing that drives real business growth. With 15+ years of experience in marketing and an MBA in Marketing, I help businesses build strong brand presence, generate quality leads, and achieve measurable growth through clear strategy and consistent execution.
                  </p>

                  {/* Highlights / Badges */}
                  <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-lg-start">
                    <span className="badge bg-dark bg-opacity-75 border border-secondary text-warning px-3 py-2 rounded-pill fw-semibold">
                      🎓 MBA in Marketing
                    </span>
                    <span className="badge bg-dark bg-opacity-75 border border-secondary text-light px-3 py-2 rounded-pill fw-semibold">
                      💼 15+ Years Industry Mastery
                    </span>
                    <span className="badge bg-dark bg-opacity-75 border border-secondary text-light px-3 py-2 rounded-pill fw-semibold">
                      🚀 Brand Strategy & Growth
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default FounderPage;
