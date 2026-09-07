import React from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Style/Home.css";
import "../../Style/Founder.css";
import "../../App.css";

import Founder1Img from "../../assets/Founder-brandsetu-digital.webp";

import {
  FaGraduationCap,
  FaChartBar,
  FaBullseye,
  FaUsers,
  FaLightbulb,
  FaHeart,
  FaRocket,
} from "react-icons/fa";

const FounderPage = () => {
  return (
    <div className="founder-page position-relative overflow-hidden">
      {/* ===== FOUNDER & CEO SECTION ===== */}
      <section className="founder-section-wrapper">
        <Container>
          {/* Header Top Tag with Lines */}
          <div className="founder-header-tag">
            <span className="tag-line"></span>
            <span className="tag-text">Leadership That Drives Growth</span>
            <span className="tag-line"></span>
          </div>

          {/* Main Heading */}
          <h2 className="founder-heading text-center">
            Meet Our <span className="text-red-highlight">Founder &amp; CEO</span>
          </h2>

          {/* Subheading */}
          <p className="founder-subtitle text-center">
            The vision behind BrandSetu Digital — to make digital marketing simple, effective, and business-focused for every brand.
          </p>

          {/* Main Charcoal/Dark Card */}
          <div className="founder-premium-card position-relative overflow-hidden">
            {/* Blobs behind card content */}
            <div className="bg-blob blob-1"></div>
            <div className="bg-blob blob-2"></div>

            <div className="founder-card-main-row position-relative z-2">
              {/* Left Side: Avatar + Bio + Quote */}
              <div className="founder-left-container">
                {/* Avatar */}
                <div className="founder-avatar-box">
                  <img
                    src={Founder1Img}
                    alt="Saumitra Bajpai, Founder & CEO of BrandSetu Digital"
                    className="founder-avatar-img"
                    width="200"
                    height="200"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Content & Quote */}
                <div className="founder-bio-box">
                  <h3 className="founder-name">Saumitra Bajpai</h3>
                  <h4 className="founder-designation">
                    Founder &amp; CEO, BrandSetu Digital
                  </h4>

                  <p className="founder-bio-text">
                    I founded BrandSetu Digital with a simple belief — every business, big or small, deserves strategic, result-driven marketing. With 15+ years of experience in marketing and an MBA in Marketing, I help brands build a strong digital presence, generate quality leads, and achieve measurable growth through clear strategy, creativity, and consistent execution.
                  </p>

                  {/* Quote Box */}
                  <div className="founder-quote-card">
                    <span className="quote-symbol">“</span>
                    <div className="quote-inner-content">
                      <p className="quote-statement">
                        We don’t just run campaigns, we build brands that create real business value.
                      </p>
                      <span className="quote-sign">— Saumitra Bajpai</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="founder-divider d-none d-xl-block"></div>

              {/* Right Side: 2x2 Feature Highlights */}
              <div className="founder-right-grid">
                {/* 1: MBA */}
                <div className="founder-highlight-item">
                  <div className="highlight-circle-icon">
                    <FaGraduationCap />
                  </div>
                  <h5 className="highlight-title">MBA in Marketing</h5>
                  <p className="highlight-desc">Strong academic foundation</p>
                </div>

                {/* 2: 15+ Years */}
                <div className="founder-highlight-item">
                  <div className="highlight-circle-icon">
                    <FaChartBar />
                  </div>
                  <h5 className="highlight-title">15+ Years Experience</h5>
                  <p className="highlight-desc">Across digital marketing and brand growth</p>
                </div>

                {/* 3: Brand Strategy */}
                <div className="founder-highlight-item">
                  <div className="highlight-circle-icon">
                    <FaBullseye />
                  </div>
                  <h5 className="highlight-title">Brand Strategy &amp; Growth</h5>
                  <p className="highlight-desc">Focus on measurable results</p>
                </div>

                {/* 4: Business-First */}
                <div className="founder-highlight-item">
                  <div className="highlight-circle-icon">
                    <FaUsers />
                  </div>
                  <h5 className="highlight-title">Business-First Approach</h5>
                  <p className="highlight-desc">Helping brands grow with purpose</p>
                </div>
              </div>
            </div>

            {/* Bottom Row: Skill & Value Badges / Pills */}
            <div className="founder-pills-row">
              <div className="founder-skill-pill">
                <FaLightbulb className="pill-icon text-warning" />
                <span>Strategic Thinking</span>
              </div>
              <div className="founder-skill-pill">
                <FaChartBar className="pill-icon text-warning" />
                <span>Growth Mindset</span>
              </div>
              <div className="founder-skill-pill">
                <FaUsers className="pill-icon text-warning" />
                <span>Team Leadership</span>
              </div>
              <div className="founder-skill-pill">
                <FaHeart className="pill-icon text-warning" />
                <span>Client Success</span>
              </div>
              <div className="founder-skill-pill">
                <FaRocket className="pill-icon text-light" />
                <span>Innovation in Marketing</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default FounderPage;
