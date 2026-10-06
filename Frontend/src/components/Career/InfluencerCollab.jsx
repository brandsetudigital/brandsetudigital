import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  Sparkles,
  Users,
  CheckCircle2,
  Video,
  DollarSign,
  HeartHandshake,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";
import InfluencerModal from "./InfluencerModal";
import "../../Style/Career.css";

export default function InfluencerCollab() {
  const [showCollabModal, setShowCollabModal] = useState(false);

  const benefits = [
    {
      icon: <DollarSign size={24} className="text-warning" />,
      title: "Paid Brand Campaigns",
      desc: "Get sponsored collaborations with top brands across industries with competitive payouts.",
    },
    {
      icon: <Users size={24} className="text-warning" />,
      title: "Targeted Audience Match",
      desc: "Collaborate on campaigns that truly resonate with your audience and enhance your engagement.",
    },
    {
      icon: <Video size={24} className="text-warning" />,
      title: "Creative Freedom",
      desc: "Deliver content in your authentic voice with full creative autonomy and dedicated agency support.",
    },
    {
      icon: <HeartHandshake size={24} className="text-warning" />,
      title: "Long-Term Partnerships",
      desc: "Turn one-off brand deals into recurring ambassador programs and reliable growth streams.",
    },
  ];

  return (
    <section
      id="influencer-collab"
      className="influencer-section py-5 position-relative overflow-hidden"
    >
      {/* Background Glow Blobs */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      <Container className="position-relative z-2">
        {/* Section Header */}
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill collab-badge mb-3">
            <Sparkles size={16} className="text-warning" />
            <span className="text-warning fw-semibold small">
              CREATOR & INFLUENCER NETWORK
            </span>
          </div>

          <h2 className="display-5 fw-bold text-white mb-3 collab-title">
            Influencer & Creator <span className="text-warning">Collaboration</span>
          </h2>

          <p className="lead text-light-50 mx-auto collab-subtitle">
            We’d love to know a little more about you and your content before taking
            the collaboration forward.
          </p>
        </div>

        {/* Benefits Grid */}
        <Row className="g-4 mb-5">
          {benefits.map((b, idx) => (
            <Col md={6} lg={3} key={idx}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="h-100"
              >
                <Card className="collab-feature-card h-100 p-3">
                  <Card.Body className="d-flex flex-column text-start">
                    <div className="feature-icon-wrapper mb-3">{b.icon}</div>
                    <h3 className="fs-5 text-white fw-bold mb-2">{b.title}</h3>
                    <p
                      className="collab-feature-desc mb-0"
                      style={{ color: "#e2e8f0", fontSize: "0.92rem", lineHeight: "1.6" }}
                    >
                      {b.desc}
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Main Collaboration Action Card */}
        <div className="collab-main-card p-4 p-md-5 mx-auto">
          <Row className="align-items-center g-4">
            <Col lg={7}>
              <div className="collab-card-content text-start">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="collab-step-num">Step 1</span>
                  <span className="text-warning fw-bold small text-uppercase">
                    Get Onboarded
                  </span>
                </div>
                <h3 className="text-white fw-bold mb-3 fs-2">
                  Join Our Creator Roster
                </h3>
                <p className="collab-desc-text mb-4">
                  Please fill out this short form with your basic details, social
                  media profile, audience insights &amp; collaboration information:
                </p>

                {/* Checklist */}
                <div className="collab-checklist mb-4">
                  <div className="check-item d-flex align-items-center gap-2 mb-2">
                    <CheckCircle2 size={18} className="text-warning flex-shrink-0" />
                    <span>Basic Details &amp; Contact Info</span>
                  </div>
                  <div className="check-item d-flex align-items-center gap-2 mb-2">
                    <CheckCircle2 size={18} className="text-warning flex-shrink-0" />
                    <span>Social Media Handles (Instagram, YouTube, etc.)</span>
                  </div>
                  <div className="check-item d-flex align-items-center gap-2 mb-2">
                    <CheckCircle2 size={18} className="text-warning flex-shrink-0" />
                    <span>Audience Demographics &amp; Average Insights</span>
                  </div>
                  <div className="check-item d-flex align-items-center gap-2">
                    <CheckCircle2 size={18} className="text-warning flex-shrink-0" />
                    <span>Collaboration Preferences &amp; Commercials</span>
                  </div>
                </div>

                {/* Submission Note */}
                <div className="collab-note-box p-3 rounded-3 mb-4">
                  <p className="mb-0 small text-light">
                    🤝 <strong>What happens next:</strong> Once you submit the form,
                    our team will review your profile and get back to you if your
                    profile matches our collaboration requirements.
                  </p>
                </div>

                {/* Slogan */}
                <p className="fw-semibold text-warning mb-0 fs-6">
                  🚀 Looking forward to creating something amazing together!
                </p>
              </div>
            </Col>

            <Col lg={5}>
              <div className="collab-cta-box text-center p-4 rounded-4">
                <div className="cta-icon-badge mb-3">
                  <Sparkles size={32} className="text-warning" />
                </div>
                <h4 className="text-white fw-bold mb-2">Ready to Collab?</h4>
                <p className="small mb-4" style={{ color: "#cbd5e1" }}>
                  Fill out our quick collaboration application right here. Takes under 2 minutes!
                </p>

                {/* Primary On-Site Modal Form Button */}
                <Button
                  className="btn btn-warning w-100 py-3 fw-bold rounded-pill d-flex align-items-center justify-content-center gap-2 collab-cta-btn"
                  onClick={() => setShowCollabModal(true)}
                >
                  <span>Apply for Collaboration</span>
                  <Send size={18} />
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        {/* NATIVE INFLUENCER COLLAB MODAL */}
        <InfluencerModal
          show={showCollabModal}
          onHide={() => setShowCollabModal(false)}
        />
      </Container>
    </section>
  );
}
