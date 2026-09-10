import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ctaBanner from "../../assets/cta-growth-banner-matched.png";
import "../../Style/Home.css";

export default function HomeCTA() {
  return (
    <section className="final-cta-section py-5 my-5 position-relative overflow-hidden">
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      <Container className="position-relative z-2">
        <div className="cta-banner-wrapper position-relative mx-auto">
          <img
            src={ctaBanner}
            alt="BrandSetu Digital - Let's Grow Your Brand Together"
            className="cta-banner-img w-100 h-auto d-block"
            loading="lazy"
          />

          {/* Clickable Action Hitboxes */}
          <Link
            to="/contact"
            className="cta-hitbox-start"
            title="Start Your Project"
            aria-label="Start Your Project"
          />

          <a
            href="tel:+917389824231"
            className="cta-hitbox-call"
            title="Call +91 7389824231"
            aria-label="Call +91 7389824231"
          />
        </div>
      </Container>
    </section>
  );
}
