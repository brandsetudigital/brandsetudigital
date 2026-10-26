import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppButton.css";

const WHATSAPP_NUMBER = "917389824231";
const DEFAULT_MESSAGE = "Hi BrandSetu Digital, I want to know more about your digital marketing services.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="whatsapp-float-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={`whatsapp-tooltip ${isHovered ? "show" : ""}`}>
        Chat with us on WhatsApp
      </span>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float-btn"
        aria-label="Chat directly on WhatsApp with BrandSetu Digital"
        title="Chat with us on WhatsApp"
      >
        <span className="whatsapp-pulse-ring" aria-hidden="true" />
        <FaWhatsapp className="whatsapp-icon" />
      </a>
    </div>
  );
}
