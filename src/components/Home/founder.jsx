import React from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Style/Home.css";
import "../../App.css";

import Founder1Img from "../../assets/Founder-brandsetu-digital.webp";
import Founder2Img from "../../assets/ceo-brandsetu-digital.webp";
import MissionValues from "../Home/mission";

const FounderPage = () => {
  const founders = [
    {
      name: "Saumitra Bajpai",
      role: "Founder & CEO",
      img: Founder1Img,
      bio: "I am the Founder of BrandSetu Digital, a digital marketing agency focused on smart, practical marketing that drives real business growth. With 15+ years of experience in marketing and an MBA in Marketing, I help businesses build strong brand presence, generate quality leads, and achieve measurable growth through clear strategy and consistent execution.",
    },
    {
      name: "Devesh Jain",
      role: "Co-Founder & COO",
      img: Founder2Img,
      bio: "Marketing professional and COO of Brandsetu digital,  with over 5 years of experience and an MBA in Marketing. I support businesses in improving market positioning, reaching the right audience, and converting opportunities into growth. My approach combines strategic thinking with hands-on execution to deliver practical, measurable outcomes.",
    },
  ];

  return (
    <div className="founder-page">
      <MissionValues />
      {/* ===== HERO ===== */}
      <section className="founder-hero text-center d-flex align-items-center">
        <div className="container-fluid px-3 px-md-5">
          <h2 className="display-3 fw-bold text-dark mb-4">
            Meet Our <span className="text-danger">Founders</span>
          </h2>

          <p className="lead text-dark fw-bold mx-auto col-lg-8 mb-4">
            The visionaries behind BRANDSETU who made exploring the market
            seamless, authentic, and meaningful.
          </p>
        </div>
      </section>

      {/* ===== FOUNDERS ===== */}
      <section className="founder-bio py-5">
        <div className="container-fluid px-4 px-md-5">
          <Row className="g-5">
            {founders.map((founder, idx) => (
              <Col xl={6} key={idx}>
                <div className="founder-card position-relative overflow-hidden p-4 d-flex flex-column flex-md-row align-items-center gap-4">
                  <div className="bg-blob blob-1"></div>
                  <div className="bg-blob blob-2"></div>

                  <div className="position-relative z-2">
                    <img
                      src={founder.img}
                      alt={`${founder.name}, ${founder.role} of BrandSetu Digital`}
                      className="rounded-circle shadow founder-img"
                      width="320"
                      height="320"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="position-relative z-2">
                    <h3 className="fw-bold text-white mb-1">{founder.name}</h3>
                    <p className="text-warning fw-semibold mb-2">
                      {founder.role}
                    </p>
                    <p className="text-light text-justify mb-3 lh-lg">
                      {founder.bio}
                    </p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>
    </div>
  );
};

export default FounderPage;
