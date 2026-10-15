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
             Digital  Marketing <span className="text-danger">Agency</span>
          </h2>
          <p
            className="lead text-muted fw-semibold mx-auto"
            style={{ maxWidth: 700 }}
          >
            The <strong> Best Digital Marketing  Agency in Indore</strong>, our goal is to help businesses improve search engine rankings, generate quality leads, increase brand awareness, and boost conversions through effective digital strategies. From creating professional websites and engaging visual content to managing targeted advertising campaigns, we deliver solutions tailored to your business goals.
          </p>
        </div>

        {/* SCATTERED JOURNEY */}
        <Row className="align-items-center mb-5">
          <Col lg={6} className="text-center mb-4 mb-lg-0">
            <img
              src={scatteredJourneyImage}
              alt="Best Digital Marketing Services in Indore — Digital Marketing Agency in Indore BrandSetu Digital"
              title="Best Digital Marketing Services in Indore"
              className="img-fluid rounded-4"
              width="800"
              height="600"
              loading="lazy"
              decoding="async"
            />
          </Col>
          <Col lg={6}>
            <h3 className="fw-bold mb-3 text-brand">
              Why is Digital Marketing Important? 
            </h3>
            <p className="text-muted text-justify fs-5 fw-semibold">
             <strong>At BrandSetu Digital</strong>, we help businesses strengthen their online presence, connect with potential customers, and achieve sustainable growth. The right digital marketing strategy allows businesses to build brand awareness, generate quality leads, improve customer engagement, and stay ahead of competitors
            </p>
            <p className="fw-bold fs-4 mb-1"> Best Digital Marketing Services</p>
            <p className="text-muted fs-5 text-justify fw-semibold">
              With the <strong>Best Digital Marketing Services in Indore</strong>, businesses can reach their target audience more effectively, measure marketing performance, and turn potential customers into loyal clients. <strong>At BrandSetu Digital</strong>, our focus is on creating result-oriented strategies that support your business goals and help your brand grow in today's competitive digital world.
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
          Why Choose Digital Marketing for Your Business <span className="text-danger"> Growth?</span>
          </h2>
          <p
            className="lead text-muted fw-semibold mx-auto"
            style={{ maxWidth: 700 }}
          >
          <strong>At BrandSetu Digital</strong>, we help businesses build a strong social media presence, connect with their target audience, and increase brand awareness. Our <strong>Social Media Marketing in Indore</strong> strategies focus on creating engaging content, improving audience interaction, and attracting potential customers. We help your brand stand out, build customer trust, and achieve long-term business growth through effective social media promotion.   Looking to Grow Your Brand with Digital Marketing?
          </p>
        </div>

        <Row className="align-items-center">
          <Col lg={6}>
            <h3 className="fw-bold mb-3 text-brand">Looking to Grow Your Brand with Digital Marketing?</h3>

            <p className="text-muted fs-5 text-justify fw-semibold mb-3">
              <strong>At BrandSetu Digital</strong>, we provide complete digital solutions to help businesses strengthen their online presence and achieve growth. As a <strong>Best SEO Agency in Indore</strong>, we focus on improving search engine rankings, increasing website traffic, and helping businesses reach their target audience.
            </p>

            <p className="text-muted fs-5 text-justify fw-semibold mb-3">
            Our SEO services include On-Page SEO, Off-Page SEO, Link Building, Guest Posting, Business Submission, and Local SEO to improve online visibility and support better search rankings.
            </p>

            <p className="fw-semibold fs-5 text-justify fw-semibold text-muted">
              We also provide Social Media Optimization (SMO) for platforms like Facebook, Instagram, YouTube, and LinkedIn. Our strategies focus on increasing reach, improving impressions, boosting engagement, generating quality leads, and building a strong social media presence.
            </p>
          </Col>

          <Col lg={6} className="text-center">
            <img
              src={solutionPlatformImage}
              alt="Best SEO Agency in Indore & Social Media Marketing Indore — BrandSetu Digital Platform"
              title="Best SEO Agency in Indore & Social Media Marketing Indore"
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
