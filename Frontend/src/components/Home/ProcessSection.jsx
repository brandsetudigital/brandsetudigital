import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Search, Compass, Zap, TrendingUp } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import "../../Style/Home.css";

const steps = [
  {
    icon: Search,
    title: "Discovery & Audit",
    description:
      "We dive deep into your brand's metrics, audit competitor strategies, and identify clear digital growth opportunities.",
    color: "primary",
    bg: "bg-light-blue",
  },
  {
    icon: Compass,
    title: "Strategy & Planning",
    description:
      "Our team designs a bespoke marketing roadmap, selecting high-impact channels and setting clear measurable KPIs.",
    color: "danger",
    bg: "bg-light-red",
  },
  {
    icon: Zap,
    title: "Execution & Launch",
    description:
      "We bring plans to life by launching hyper-targeted ads, building SEO authority, and creating standout brand campaigns.",
    color: "warning",
    bg: "bg-light-yellow",
  },
  {
    icon: TrendingUp,
    title: "Optimize & Scale",
    description:
      "Using real-time performance analytics and rigorous A/B testing, we refine campaigns to maximize your ROI and scale growth.",
    color: "success",
    bg: "bg-light-green",
  },
];

const ProcessSection = () => {
  return (
    <section className="why-travelbuff py-5 pt-5 mt-5">
      <Container>
        <div className="text-center mb-5 header-section">
          <h2 className="display-2 fw-bold">
            Our <span className="text-danger">Execution </span>
            <span className="gradient-text">PROCESS</span>
          </h2>
          <p className="lead text-muted fw-semibold">
            How we transform your business goals into digital reality
          </p>
        </div>

        <Row className="g-4 mb-5 features-grid">
          {steps.map((step, idx) => (
            <Col key={idx} md={6} lg={3}>
              <Card className="text-center bg-dark h-100 rounded-4 border-0 feature-card position-relative overflow-hidden">
                {/* Blobs behind card content */}
                <div className="bg-blob blob-1"></div>
                <div className="bg-blob blob-2"></div>

                <Card.Body className="position-relative z-2">
                  <div
                    className={`feature-icon rounded-circle d-flex justify-content-center align-items-center text-${step.color} ${step.bg}`}
                  >
                    <step.icon size={32} />
                  </div>
                  <Card.Title as="h3" className="text-white mt-3 fs-5">
                    {step.title}
                  </Card.Title>
                  <Card.Text className="text-white">
                    {step.description}
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

export default ProcessSection;
