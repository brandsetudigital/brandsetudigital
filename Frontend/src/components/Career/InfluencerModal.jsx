import React, { useState } from "react";
import {
  Modal,
  Row,
  Col,
  Form,
  Button,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import emailjs from "emailjs-com";
import { CheckCircle2, Send } from "lucide-react";
import { API_BASE_URL } from "../../config";
import "../../Style/Career.css";

export default function InfluencerModal({ show, onHide }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    platform: "Instagram",
    socialHandle: "",
    followers: "10k - 50k",
    niche: "Marketing & Business",
    about: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Send to dedicated backend database endpoint (/api/influencers)
      try {
        await fetch(`${API_BASE_URL}/api/influencers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } catch (err) {
        console.warn("Backend save warning:", err);
      }

      // 2. Send instant Email Notification via EmailJS (Target: brandsetudigital@gmail.com)
      try {
        const emailParams = {
          to_email: "brandsetudigital@gmail.com",
          recipient_email: "brandsetudigital@gmail.com",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          platform: formData.platform,
          socialHandle: formData.socialHandle,
          followers: formData.followers,
          niche: formData.niche,
          location: `${formData.platform} - ${formData.socialHandle}`,
          experience: `Niche: ${formData.niche} | Followers: ${formData.followers}`,
          profile: `${formData.platform} / ${formData.socialHandle}`,
          about: formData.about || "Interested in creator collaboration & brand deals.",
          jobTitle: `Influencer Collab: ${formData.platform} (${formData.followers})`,
          resumeName: `Handle: @${formData.socialHandle}`,
        };

        await emailjs.send(
          "service_r2lvfha",
          "template_dsktag9",
          emailParams,
          "Lv5WJmYXNAkP0Fg9Z"
        );
      } catch (emailErr) {
        console.warn("EmailJS notification error:", emailErr);
      }

      setToast({
        show: true,
        message: "Collaboration details submitted! We will contact you soon.",
        bg: "success",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        platform: "Instagram",
        socialHandle: "",
        followers: "10k - 50k",
        niche: "Marketing & Business",
        about: "",
      });

      setTimeout(() => {
        onHide();
      }, 1500);
    } catch (error) {
      console.error("Submission error:", error);
      setToast({
        show: true,
        message: "Submission received! Our team will contact you shortly.",
        bg: "success",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered
        backdrop="static"
        dialogClassName="apply-clean-modal"
      >
        <Modal.Body className="p-0 overflow-hidden rounded-4 apply-clean-body position-relative">
          <button
            type="button"
            className="btn-close position-absolute top-0 end-0 m-3 z-3"
            aria-label="Close"
            onClick={onHide}
          ></button>

          <Row className="g-0">
            {/* LEFT BRAND PANEL */}
            <Col
              lg={4}
              className="d-none d-lg-flex flex-column justify-content-between p-4 text-white bg-dark border-end border-secondary"
            >
              <div>
                <div className="d-inline-flex align-items-center gap-1 px-2.5 py-1 rounded-pill bg-warning text-dark fw-bold small mb-3">
                  <span>CREATOR HUB</span>
                </div>
                <h4 className="fw-bold mb-2">Create &amp; Grow With Us</h4>
                <p className="text-secondary small mb-4">
                  Partner with BrandSetu Digital to unlock high-paying brand campaigns, production assistance, and dedicated management.
                </p>

                <div className="d-flex flex-column gap-2 small">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <CheckCircle2 size={16} className="text-warning" />
                    <span>Paid Brand Campaigns</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <CheckCircle2 size={16} className="text-warning" />
                    <span>Creative Freedom</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <CheckCircle2 size={16} className="text-warning" />
                    <span>Fast &amp; Transparent Payouts</span>
                  </div>
                </div>
              </div>
            </Col>

            {/* RIGHT FORM PANEL */}
            <Col lg={8} className="p-4 p-md-5">
              <div className="mb-4">
                <h4 className="fw-bold text-dark mb-1">Creator Collaboration Form</h4>
                <p className="text-muted small mb-0">
                  Please fill your details below. Submissions go straight to our talent team!
                </p>
              </div>

              <Form onSubmit={handleSubmit} className="apply-form">
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Label>Full Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Col>

                  <Col md={6}>
                    <Form.Label>Email Address *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="you@creator.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Col>

                  <Col md={6}>
                    <Form.Label>WhatsApp / Phone Number *</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </Col>

                  <Col md={6}>
                    <Form.Label>Primary Platform *</Form.Label>
                    <Form.Select
                      name="platform"
                      value={formData.platform}
                      onChange={handleChange}
                    >
                      <option value="Instagram">Instagram</option>
                      <option value="YouTube">YouTube</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="X (Twitter)">X (Twitter)</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Col>

                  <Col md={6}>
                    <Form.Label>Profile Handle / Channel Link *</Form.Label>
                    <Form.Control
                      type="text"
                      name="socialHandle"
                      placeholder="@handle or channel link"
                      value={formData.socialHandle}
                      onChange={handleChange}
                      required
                    />
                  </Col>

                  <Col md={6}>
                    <Form.Label>Audience Reach / Followers *</Form.Label>
                    <Form.Select
                      name="followers"
                      value={formData.followers}
                      onChange={handleChange}
                    >
                      <option value="Under 10k">Under 10K</option>
                      <option value="10k - 50k">10K - 50K</option>
                      <option value="50k - 200k">50K - 200K</option>
                      <option value="200k - 500k">200K - 500K</option>
                      <option value="500k+">500K+</option>
                    </Form.Select>
                  </Col>

                  <Col md={12}>
                    <Form.Label>Content Niche / Category</Form.Label>
                    <Form.Select
                      name="niche"
                      value={formData.niche}
                      onChange={handleChange}
                    >
                      <option value="Marketing & Business">Marketing &amp; Business</option>
                      <option value="Tech & Coding">Tech &amp; AI</option>
                      <option value="Fashion & Lifestyle">Fashion &amp; Lifestyle</option>
                      <option value="Fitness & Health">Fitness &amp; Health</option>
                      <option value="Comedy & Entertainment">Comedy &amp; Entertainment</option>
                      <option value="Food & Travel">Food &amp; Travel</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Col>

                  <Col md={12}>
                    <Form.Label>Audience Insights &amp; Collaboration Info</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="about"
                      placeholder="Tell us about your audience demographics, average views/engagement, or commercial preferences..."
                      value={formData.about}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col md={12} className="mt-4">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="btn apply-btn w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          <span>Submitting Application...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Collaboration Details</span>
                          <Send size={16} />
                        </>
                      )}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      {/* TOAST NOTIFICATION */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={toast.show}
          bg={toast.bg}
          onClose={() => setToast((prev) => ({ ...prev, show: false }))}
          delay={4000}
          autohide
        >
          <Toast.Body className="text-white fw-medium">
            {toast.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
