import React from "react";
import { Container, Button } from "react-bootstrap";
import { ArrowRight, Sparkles } from "lucide-react";
import "../../Style/Career.css";

export default function CareerHero() {
  const keywords = [
    "🚀 Innovation",
    "💡 Creativity",
    "🌍 Remote-First",
    "🎯 Impact-Driven",
    "⚡ Fast-Paced",
    "🤝 Collaborative",
    "📈 Growth Mindset",
    "🎨 Design Thinking",
    "🚀 Innovation",
    "💡 Creativity",
    "🌍 Remote-First",
    "🎯 Impact-Driven",
  ];

  return (
    <>
      <section className="services-section py-5">
        <div className="bg-blob blob-1"></div>
        <div className="bg-blob blob-2"></div>

        <Container className="text-center position-relative z-1 py-5 pt-5">
          {/* Hiring Badge */}
          <div className="d-inline-flex align-items-center gap-2 px-4 py-2 mt-3 badge-hiring mb-4">
            <Sparkles className="text-warning" size={16} />
            <span className="text-warning small">We're Hiring!</span>
          </div>

          {/* Hero Title */}
          <h1 className="career-hero-title text-white fw-bold display-2 mb-3">
            Build Your <span className="text-warning d-block mt-2">Career</span>
            <span className="d-block text-white mt-2">
              With Brand Setu
            </span>
          </h1>

          {/* Subtitle */}
          <p className="career-hero-subtitle mx-auto mb-4">
            Join a team of innovators, creators, and problem-solvers shaping the
            future of digital experiences.
          </p>

          {/* CTA Button — FIXED */}
          <div className="d-flex justify-content-center mt-4">
            <Button href="#culture"
              className="main-btn rounded-pill d-flex align-items-center gap-2 px-5 py-3"
              onClick={() =>
                document
                  .getElementById("/#culture")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="fw-bold fs-5">View Setu's Culture</span>
              <ArrowRight className="arrow-icon" size={22} />
            </Button>
          </div>

          {/* Keywords Marquee */}
          <div className="keywords-marquee-wrapper mt-5">
            <div className="keywords-marquee text-white d-flex gap-3">
              {keywords.map((item, index) => (
                <div key={index} className="keyword-item px-3 py-2">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
