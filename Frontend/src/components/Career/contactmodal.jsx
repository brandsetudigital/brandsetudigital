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
import { API_BASE_URL } from "../../config";
import "../../Style/Career.css";

export default function ApplyModal({ show, onHide, job }) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send to backend first
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      data.append("jobTitle", job);

      const response = await fetch(`${API_BASE_URL}/api/careers`, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit application");
      }

      // Send email via EmailJS
      const emailParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        experience: formData.experience,
        profile: formData.profile,
        about: formData.about,
        jobTitle: job,
        // Note: EmailJS cannot send file attachments directly from FormData
        // You can include resume name or a download link
        resumeName: formData.resume ? formData.resume.name : "No file attached",
      };

      await emailjs.send(
        "service_r2lvfha", // Your Service ID
        "template_dsktag9", // Your Career Template ID
        emailParams,
        "Lv5WJmYXNAkP0Fg9Z" // Your Public Key
      );

      setToast({
        show: true,
        message: "Application submitted successfully!",
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
    } catch (error) {
      console.error(error);
      setToast({
        show: true,
        message: error.message,
        bg: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Body className="apply-clean-body p-0">
        <Row className="g-0">
          {/* LEFT PANEL */}
          <Col
            md={5}
            className="apply-left text-light d-flex align-items-center"
          >
            <div className="p-4 p-md-5">
              <span className="badge theme-badge mb-3">CAREERS</span>
              <h2 className="fw-bold mb-3">
                Apply for <br /> {job}
              </h2>
              <p className="opacity-75 mb-4">
                We look for people who think clearly, take ownership, and want
                to grow with the brand.
              </p>
              <ul className="small ps-3 opacity-75">
                <li>No automated rejection</li>
                <li>Every profile is reviewed</li>
                <li>Clear & transparent process</li>
              </ul>
            </div>
          </Col>

          {/* RIGHT FORM */}
          <Col md={7} className="bg-white">
            <div className="p-4 p-md-5 apply-form">
              <h5 className="fw-semibold mb-4">Candidate Information</h5>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    placeholder="John Doe"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="john@email.com"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        placeholder="+91 XXXXX XXXXX"
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
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        placeholder="Indore, India"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Experience</Form.Label>
                      <Form.Select
                        className="theme-select"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                      >
                        <option>Select experience</option>
                        <option>Fresher</option>
                        <option>0–1 Year</option>
                        <option>1–3 Years</option>
                        <option>3–5 Years</option>
                        <option>5+ Years</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Resume</Form.Label>
                  <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Profile</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    placeholder="Which Domain are you looking for?"
                    name="profile"
                    value={formData.profile}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>About You</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Tell us about your skills, experience, and goals"
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 py-2 apply-btn"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>

        {/* WORKING TOAST */}
        <ToastContainer position="top-center" className="p-3">
          <Toast
            show={toast.show}
            bg={toast.bg}
            onClose={() => setToast({ ...toast, show: false })}
            delay={3000}
            autohide
            className="black-yellow-toast"
          >
            <Toast.Body className="text-white">{toast.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Modal.Body>
    </Modal>
  );
}
