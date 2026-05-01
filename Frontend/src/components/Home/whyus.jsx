import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Shield, Heart, MapPin, Gem, Users, Award } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import "../../Style/Home.css";

const features = [
  {
    icon: Shield,
    title: "Trusted & Transparent",
    description:
      "We follow ethical practices, clear communication, and honest strategies so your brand grows with complete confidence.",
    color: "primary",
    bg: "bg-light-blue",
  },
  {
    icon: Heart,
    title: "Brand Centric Approach",
    description:
      "Every strategy is designed around your brand’s vision, audience, and goals to create a strong emotional connection.",
    color: "danger",
    bg: "bg-light-red",
  },
  {
    icon: MapPin,
    title: "Result-Driven Strategies",
    description:
      "We focus on measurable outcomes like leads, reach, and conversions, not just likes and impressions.",
    color: "success",
    bg: "bg-light-green",
  },
  {
    icon: Gem,
    title: "Affordable & Scalable",
    description:
      "High quality digital solutions that fit your budget and scale smoothly as your business grows.",
    color: "warning",
    bg: "bg-light-yellow",
  },
];

const WhySetu = () => {
  return (
    <section className="why-travelbuff py-5 pt-5 mt-5">
      <Container>
        <div className="text-center mb-5 header-section">
          <h2 className="display-2 fw-bold">
            Why <span className="text-danger">Choose </span>
            <span className="gradient-text">BRANDSETU?</span>
          </h2>
          <p className="lead text-muted fw-semibold">
            Because we focus on real growth, not just marketing
          </p>
        </div>

        <Row className="g-4 mb-5 features-grid">
          {features.map((feature, idx) => (
            <Col key={idx} md={6} lg={3}>
              <Card className="text-center bg-dark  h-100 rounded-4 border-0 feature-card position-relative overflow-hidden">
                {/* Blobs behind card content */}
                <div className="bg-blob blob-1"></div>
                <div className="bg-blob blob-2"></div>

                <Card.Body className="position-relative z-2">
                  <div
                    className={`feature-icon rounded-circle d-flex justify-content-center align-items-center text-${feature.color} ${feature.bg}`}
                  >
                    <feature.icon size={32} />
                  </div>
                  <Card.Title as="h3" className="text-white mt-3 fs-5">
                    {feature.title}
                  </Card.Title>
                  <Card.Text className="text-white">
                    {feature.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default WhySetu;
