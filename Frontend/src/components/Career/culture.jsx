import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import "../../Style/Career.css";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Designer",
    quote:
      "Best decision I ever made. The team is supportive and the work pushes you to grow.",
  },
  {
    name: "Marcus Johnson",
    role: "Full Stack Developer",
    quote:
      "Finally found a place where learning, ownership, and respect actually exist.",
  },
  {
    name: "Priya Sharma",
    role: "Marketing Lead",
    quote: "A culture that values people first. That’s rare — and powerful.",
  },
];

export default function Culture() {
  const floatingShapes = [...Array(30)].map(() => ({
    size: Math.floor(Math.random() * 120 + 30),
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <>
      {/* ================= LIFE AT BRAND SETU ================= */}
      <section id="culture" className="services-section py-5 position-relative overflow-hidden">
        <div className="bg-blob blob-1"></div>
        <div className="bg-blob blob-2"></div>

        <Container>
          {/* Heading */}
          <div className="text-center mb-5">
            <h2 className="culture-title text-white">
              Life at <span>Brand Setu</span>
            </h2>
            <p className="culture-subtitle">
              Not just a workplace — a place where people grow together
            </p>
          </div>

          {/* IMAGE GRID */}
          <Row className="g-4 mb-5">
            <Col md={8}>
              <div className="culture-image large">
                <img
                  src="https://images.unsplash.com/photo-1662469567531-9ae8356d3788?auto=format&fit=crop&w=800&q=75"
                  alt="BrandSetu team collaborating in a modern Indore office"
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
                <div className="image-overlay">
                  <h3 className="fs-5">We Build Together</h3>
                  <p>Collaboration over hierarchy</p>
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div className="culture-image small">
                <img
                  src="https://images.unsplash.com/photo-1716703370285-d7ff2960abb4?auto=format&fit=crop&w=600&q=75"
                  alt="BrandSetu office culture and creative workspace"
                  width="400"
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
                <div className="image-overlay">
                  <h3 className="fs-5">We Enjoy the Process</h3>
                  <p>Work with purpose & fun</p>
                </div>
              </div>
            </Col>
          </Row>

          {/* VALUES */}
          <Row className="g-4 mb-5">
            {[
              { title: "Ownership", desc: "You own your work & impact" },
              { title: "Transparency", desc: "Clear goals, honest feedback" },
              { title: "Growth", desc: "Learning is non-negotiable" },
              { title: "Respect", desc: "People over processes" },
            ].map((item, i) => (
              <Col md={3} key={i}>
                <Card className="culture-card text-center h-100">
                  <Card.Body>
                    <h3 className="fs-5">{item.title}</h3>
                    <p>{item.desc}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* TESTIMONIALS */}
          <Row className="g-4">
            {testimonials.map((t, i) => (
              <Col md={4} key={i}>
                <Card className="testimonial-card h-100">
                  <Card.Body>
                    <Quote size={28} className="quote-icon" />
                    <p className="testimonial-text">"{t.quote}"</p>
                    <p className="mt-3 mb-0 fw-bold">{t.name}</p>
                    <small>{t.role}</small>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ================= LIFE PERKS SECTION ================= */}
      <section className="hero-section position-relative overflow-hidden py-5">
        {/* Floating Shapes */}
        <div className="hero-background position-absolute w-100 h-100">
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
                y: [0, 40, 0],
                x: [0, -40, 0],
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

        <Container className="position-relative z-2">
          <div className="life-box mt-5">
            <Row className="g-4 justify-content-center">
              <Col xs={12} sm={6} md={4}>
                <div className="life-item text-center">
                  <div className="life-icon">☕</div>
                  <h3 className="text-warning fs-5">Unlimited Coffee</h3>
                  <p>Fuel your creativity, anytime</p>
                </div>
              </Col>

              <Col xs={12} sm={6} md={4}>
                <div className="life-item text-center">
                  <div className="life-icon">🎮</div>
                  <h3 className="text-warning fs-5">Game Fridays</h3>
                  <p>Unwind with friendly competition</p>
                </div>
              </Col>

              <Col xs={12} sm={6} md={4}>
                <div className="life-item text-center">
                  <div className="life-icon">✈️</div>
                  <h3 className="text-warning fs-5">Team Retreats</h3>
                  <p>Build bonds beyond work</p>
                </div>
              </Col>
            </Row>

            <div className="meme-box text-center mt-5 mx-auto">
              <p className="old mb-1">Corporate Culture</p>
              <p className="new mb-0">✨ Human Culture ✨</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
