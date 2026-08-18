import React from "react";
import { Modal, Row, Col, Button } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
  FaPinterestP,
  FaTiktok,
} from "react-icons/fa";
import "../../Style/Contact.css";

const socialMedia = [
  {
    name: "Facebook",
    icon: <FaFacebookF />,
    link: "https://www.facebook.com/profile.php?id=61584792899210",
    color: "#1877F2",
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    link: "https://www.instagram.com/brandsetudigital?igsh=NDMyNzc4aHkxOW02",
    color: "#d7183b",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedinIn />,
    link: "https://linkedin.com",
    color: "#0A66C2",
  },
  {
    name: "Twitter",
    icon: <FaTwitter />,
    link: "https://twitter.com",
    color: "#1DA1F2",
  },
  {
    name: "YouTube",
    icon: <FaYoutube />,
    link: "https://youtube.com",
    color: "#FF0000",
  },
  {
    name: "TikTok",
    icon: <FaTiktok />,
    link: "https://tiktok.com",
    color: "#69C9D0",
  },
];

export default function FollowModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered size="md">
      <Modal.Header
        closeButton
        className="border-0 bg-dark custom-close position-relative"
      >
        <Modal.Title className="fw-bold display-6 text-warning">
          Follow Us:
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-dark position-relative overflow-hidden">
        {/* Background blobs */}
        <div className="bg-blob blob-1"></div>
        <div className="bg-blob blob-2"></div>

        <h5 className="text-center text-warning mb-4 position-relative">
          Connect with us on social media and stay updated!
        </h5>

        <Row className="social-grid g-3 justify-content-center position-relative">
          {socialMedia.map((social) => (
            <Col xs={4} sm={3} key={social.name} className="text-center">
              <a
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                style={{ "--social-color": social.color }}
              >
                {social.icon}
              </a>
              <div className="mt-1 small text-light">{social.name}</div>
            </Col>
          ))}
        </Row>
      </Modal.Body>
    </Modal>
  );
}
