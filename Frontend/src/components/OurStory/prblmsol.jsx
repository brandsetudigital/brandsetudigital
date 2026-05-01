import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../../Style/OurStory.css";
import "../../App.css";

import scatteredJourneyImage from "../../assets/digital-growth-solutions.jpg";
import solutionPlatformImage from "../../assets/digital-marketing-company.webp";

function TravelSolutionPage() {
  return (
    <div className="travel-solution-page position-relative">
      <Container>
        {/* HEADER */}
        <div className="text-center mb-5">
          <span className="badge bg-danger-subtle text-danger px-3 py-2 rounded-pill mb-3">
            The Real Problem
          </span>
          <h2 className="display-4 fw-bold mb-3 gradient-text">
            Plan Should be <span className="text-danger">Simple</span>.
            <br />
            But It&apos;s Not.
          </h2>
          <p
            className="lead text-muted fw-semibold mx-auto"
            style={{ maxWidth: 700 }}
          >
            Millions of Businessman face the same frustration every day - a
            fragmented experience that turns planning a Business into a
            stressful puzzle.
          </p>
        </div>

        {/* SCATTERED JOURNEY */}
        <Row className="align-items-center mb-5">
          <Col lg={6} className="text-center mb-4 mb-lg-0">
            <img
              src={scatteredJourneyImage}
              alt="Fragmented Brand Journey — illustration of disconnected branding tools"
              className="img-fluid rounded-4"
              width="800"
              height="600"
              loading="lazy"
              decoding="async"
            />
          </Col>
          <Col lg={6}>
            <h3 className="fw-bold mb-3 text-brand">
              The Incomplete Brand Journey
            </h3>
            <p className="text-muted text-justify fs-5 fw-semibold">
              Today’s businesses struggle to manage branding, marketing,
              automation, and digital growth across multiple disconnected
              agencies, tools, and platforms.
            </p>
            <p className="fw-bold fs-4 mb-1">The result?</p>
            <p className="text-muted fs-5 text-justify fw-semibold">
              Inconsistent brand identity, higher costs, delayed execution, and
              the constant uncertainty of whether efforts are actually driving
              growth.
            </p>
          </Col>
        </Row>

        {/* PROBLEM CARDS */}
        <Row className="text-center g-4 mb-5">
          {[
            {
              title: "Disconnected Brand Strategy",
              desc: "Branding, marketing, and technology operate without a unified direction.",
              icon: "bi-diagram-3",
            },
            {
              title: "Slow Execution",
              desc: "Manual processes and multiple handoffs delay campaigns and growth significantly, overall, business.",
              icon: "bi-clock",
            },
            {
              title: "Unclear Performance",
              desc: "Businesses lack visibility into return on investment and campaign effectiveness.",
              icon: "bi-bar-chart-line",
            },
            {
              title: "Inconsistent Brand Presence",
              desc: "Different agencies create fragmented and diluted brand messaging.",
              icon: "bi-puzzle",
            },
          ].map((item, i) => (
            <Col sm={6} md={3} key={i}>
              <Card className="h-100 cards bg-light-red rounded-4 p-3">
                <Card.Body>
                  <i
                    className={`bi ${item.icon} text-danger`}
                    style={{ fontSize: 34 }}
                  ></i>
                  <Card.Title as="h4" className="fw-bold mt-2 fs-6">{item.title}</Card.Title>
                  <Card.Text className="text-muted  small">
                    {item.desc}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* SOLUTION */}
        <div className="text-center pt-5 my-5 mt-5">
          <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill mb-3">
            Our Solution
          </span>
          <h2 className="display-4 fw-bold gradient-text">
            One Beautiful <span className="text-danger"> Platform</span>.
          </h2>
          <p
            className="lead text-muted fw-semibold mx-auto"
            style={{ maxWidth: 700 }}
          >
            Everything you need for Business - unified, intelligent, and simple.
          </p>
        </div>

        <Row className="align-items-center">
          <Col lg={6}>
            <h3 className="fw-bold mb-3 text-brand">Simplicity at Scale</h3>

            <p className="text-muted fs-5 text-justify fw-semibold mb-3">
              Growing a brand shouldn’t mean managing multiple agencies,
              scattered tools, or disconnected strategies. BrandSetu brings
              everything together into one unified digital ecosystem.
            </p>

            <p className="text-muted fs-5 text-justify fw-semibold mb-3">
              From brand identity and creative design to performance marketing,
              automation, and technology, every service works in alignment to
              deliver clarity, consistency, and measurable growth.
            </p>

            <p className="fw-semibold fs-5 text-justify fw-semibold text-muted">
              As your business scales, BrandSetu scales with you - ensuring your
              brand stays strong, your messaging stays consistent, and your
              growth stays sustainable.
            </p>
          </Col>

          <Col lg={6} className="text-center">
            <img
              src={solutionPlatformImage}
              alt="BrandSetu Digital growth platform — unified branding, marketing, and automation"
              className="img-fluid rounded-4"
              width="800"
              height="600"
              loading="lazy"
              decoding="async"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TravelSolutionPage;
