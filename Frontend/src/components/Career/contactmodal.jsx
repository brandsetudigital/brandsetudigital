import React, { useState, useEffect } from "react";
import {
  Modal,
  Row,
  Col,
  Form,
  Button,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import {
  Mail,
  FileText,
  Copy,
  Check,
  Send,
  ExternalLink,
  Sparkles,
  Briefcase,
  AlertCircle,
  X,
} from "lucide-react";
import emailjs from "emailjs-com";
import { API_BASE_URL } from "../../config";
import "../../Style/Career.css";

export default function ApplyModal({ show, onHide, job, initialMode = "form" }) {
  const [activeTab, setActiveTab] = useState(initialMode); // "form" | "mail"
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    profile: "",
    about: "",
    resume: null,
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "success",
  });

  useEffect(() => {
    if (initialMode) {
      setActiveTab(initialMode);
    }
  }, [initialMode, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("brandsetudigital@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const jobTitle = typeof job === "string" ? job : job?.title || "General Application";

  const mailSubject = encodeURIComponent(
    `Job Application: ${jobTitle} - BrandSetu Digital`
  );
  const mailBody = encodeURIComponent(
    `Hi BrandSetu Team,\n\nI am applying for the ${jobTitle} position at BrandSetu Digital.\n\nHere are my details:\n- Full Name: \n- Phone Number: \n- Current City/Location: \n- Relevant Experience: \n- Portfolio / Work Links / LinkedIn: \n- Notice Period: \n\nPlease find my updated resume attached.\n\nLooking forward to hearing from you!\n\nBest regards,\n`
  );
  const mailtoUrl = `mailto:brandsetudigital@gmail.com?subject=${mailSubject}&body=${mailBody}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send to backend
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          data.append(key, formData[key]);
        }
      });
      data.append("jobTitle", jobTitle);

      const response = await fetch(`${API_BASE_URL}/api/careers`, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit application");
      }

      // EmailJS notification
      try {
        const emailParams = {
          to_email: "brandsetudigital@gmail.com",
          recipient_email: "brandsetudigital@gmail.com",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          experience: formData.experience,
          profile: formData.profile,
          about: formData.about,
          jobTitle: jobTitle,
          resumeName: formData.resume ? formData.resume.name : "No file attached",
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
        message: "Application submitted successfully! Our talent team will review your profile.",
        bg: "success",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        experience: "",
        profile: "",
        about: "",
        resume: null,
      });

      setTimeout(() => {
        onHide();
      }, 2000);
    } catch (error) {
      console.error(error);
      setToast({
        show: true,
        message: error.message || "Failed to submit. Please try again or apply via email.",
        bg: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      className="career-apply-modal-wrapper"
    >
      <Modal.Body className="apply-clean-body p-0 position-relative overflow-hidden">
        {/* Close Button */}
        <button
          className="apply-modal-close-btn"
          onClick={onHide}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <Row className="g-0">
          {/* LEFT PANEL */}
          <Col md={5} className="apply-left text-light d-flex flex-column justify-content-between p-4 p-md-5">
            <div>
              <span className="badge theme-badge mb-3">CAREERS AT BRANDSETU</span>
              <h3 className="fw-bold mb-2 text-white">
                Apply for <br />
                <span className="text-warning">{jobTitle}</span>
              </h3>
              <p className="opacity-75 small mb-4">
                We're always excited to welcome passionate builders, creators, and marketers to our team in Indore.
              </p>

              <div className="apply-usp-box mb-4">
                <div className="d-flex align-items-start gap-2 mb-2.5">
                  <Sparkles size={16} className="text-warning flex-shrink-0 mt-1" />
                  <span className="small opacity-90">Every profile is reviewed by our core hiring team</span>
                </div>
                <div className="d-flex align-items-start gap-2 mb-2.5">
                  <Briefcase size={16} className="text-warning flex-shrink-0 mt-1" />
                  <span className="small opacity-90">Competitive pay + growth incentives</span>
                </div>
                <div className="d-flex align-items-start gap-2">
                  <Check size={16} className="text-warning flex-shrink-0 mt-1" />
                  <span className="small opacity-90">Direct feedback within 48–72 hours</span>
                </div>
              </div>
            </div>

            <div className="border-top border-secondary pt-3 mt-3">
              <span className="text-muted small d-block mb-1">Direct HR Support</span>
              <a
                href="mailto:brandsetudigital@gmail.com"
                className="text-warning text-decoration-none small fw-semibold"
              >
                brandsetudigital@gmail.com
              </a>
            </div>
          </Col>

          {/* RIGHT PANEL: DUAL MODE TABS (FORM & EMAIL) */}
          <Col md={7} className="bg-white">
            <div className="p-4 p-md-5 apply-form">
              {/* MODE SWITCHER TABS */}
              <div className="apply-mode-switcher d-flex p-1 rounded-pill bg-light mb-4">
                <button
                  type="button"
                  className={`btn btn-sm flex-fill rounded-pill fw-semibold py-2 d-flex align-items-center justify-content-center gap-1.5 transition-all ${
                    activeTab === "form"
                      ? "btn-dark shadow-sm text-warning"
                      : "text-secondary"
                  }`}
                  onClick={() => setActiveTab("form")}
                >
                  <FileText size={15} />
                  <span>Online Form</span>
                </button>
                <button
                  type="button"
                  className={`btn btn-sm flex-fill rounded-pill fw-semibold py-2 d-flex align-items-center justify-content-center gap-1.5 transition-all ${
                    activeTab === "mail"
                      ? "btn-dark shadow-sm text-warning"
                      : "text-secondary"
                  }`}
                  onClick={() => setActiveTab("mail")}
                >
                  <Mail size={15} />
                  <span>Direct Email</span>
                </button>
              </div>

              {/* TAB 1: ONLINE APPLICATION FORM */}
              {activeTab === "form" ? (
                <Form onSubmit={handleSubmit}>
                  <h5 className="fw-bold mb-3 text-dark">Candidate Information</h5>

                  <Form.Group className="mb-3">
                    <Form.Label>Full Name *</Form.Label>
                    <Form.Control
                      placeholder="e.g. Rahul Sharma"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email Address *</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="rahul@example.com"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number *</Form.Label>
                        <Form.Control
                          placeholder="+91 98765 43210"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Current City / Location</Form.Label>
                        <Form.Control
                          placeholder="Indore, MP"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Experience Level</Form.Label>
                        <Form.Select
                          className="theme-select"
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                        >
                          <option value="">Select experience</option>
                          <option value="Fresher">Fresher / Intern</option>
                          <option value="0–1 Year">0–1 Year</option>
                          <option value="1–3 Years">1–3 Years</option>
                          <option value="3–5 Years">3–5 Years</option>
                          <option value="5+ Years">5+ Years</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Portfolio / LinkedIn / Work Link</Form.Label>
                    <Form.Control
                      placeholder="https://linkedin.com/in/you or behance.net/you"
                      name="profile"
                      value={formData.profile}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Upload Resume (PDF / DOC)</Form.Label>
                    <Form.Control
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                    <Form.Text className="text-muted" style={{ fontSize: "0.75rem" }}>
                      Max 5MB (PDF format recommended)
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>About You / Note to Hiring Team</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Briefly highlight what you bring to BrandSetu..."
                      name="about"
                      value={formData.about}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100 py-2.5 apply-btn fw-bold d-flex align-items-center justify-content-center gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <span>Submitting Application...</span>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <Send size={16} />
                      </>
                    )}
                  </Button>
                </Form>
              ) : (
                /* TAB 2: DIRECT EMAIL APPLICATION */
                <div className="mail-apply-view">
                  <div className="text-center mb-4">
                    <div className="mail-icon-badge mx-auto mb-2.5">
                      <Mail size={26} className="text-dark" />
                    </div>
                    <h5 className="fw-bold text-dark mb-1">Apply Directly via Email</h5>
                    <p className="text-muted small">
                      Prefer applying directly from your Gmail, Outlook, or Apple Mail? Simply send your resume to our careers inbox.
                    </p>
                  </div>

                  {/* Email Box with Copy */}
                  <div className="mail-copy-box p-3 rounded-3 mb-4 d-flex align-items-center justify-content-between">
                    <div>
                      <span className="small text-muted d-block" style={{ fontSize: "0.75rem" }}>
                        OFFICIAL HIRING EMAIL
                      </span>
                      <strong className="text-dark">brandsetudigital@gmail.com</strong>
                    </div>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-dark rounded-pill px-3 py-1.5 d-flex align-items-center gap-1.5"
                      onClick={handleCopyEmail}
                    >
                      {copied ? (
                        <>
                          <Check size={14} className="text-success" />
                          <span className="text-success fw-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Checklist of what to include in email */}
                  <div className="mail-checklist-box p-3 rounded-3 mb-4">
                    <h6 className="fw-bold text-dark small mb-2 d-flex align-items-center gap-1.5">
                      <AlertCircle size={15} className="text-warning" /> What to include in your email:
                    </h6>
                    <ul className="small text-secondary ps-3 mb-0" style={{ lineHeight: "1.6" }}>
                      <li>Subject: <strong>Application: {jobTitle} - [Your Name]</strong></li>
                      <li>Attach your updated Resume (PDF preferred)</li>
                      <li>Links to your Portfolio, Behance, GitHub, or LinkedIn</li>
                      <li>Current City & Notice Period / Joining availability</li>
                    </ul>
                  </div>

                  {/* Mailto Launch CTA */}
                  <a
                    href={mailtoUrl}
                    className="btn btn-warning w-100 py-2.5 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2 text-decoration-none shadow-sm"
                  >
                    <ExternalLink size={17} />
                    <span>Open in Email App</span>
                  </a>

                  <p className="text-center text-muted mt-3 mb-0" style={{ fontSize: "0.78rem" }}>
                    Our team reviews emails daily and will reply within 48–72 hours.
                  </p>
                </div>
              )}
            </div>
          </Col>
        </Row>

        {/* WORKING TOAST */}
        <ToastContainer position="top-center" className="p-3" style={{ zIndex: 9999 }}>
          <Toast
            show={toast.show}
            bg={toast.bg}
            onClose={() => setToast({ ...toast, show: false })}
            delay={3500}
            autohide
            className="black-yellow-toast"
          >
            <Toast.Body className="text-white fw-semibold">{toast.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Modal.Body>
    </Modal>
  );
}
