import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import {
  MapPin,
  Clock,
  Briefcase,
  CheckCircle2,
  Sparkles,
  Mail,
  ArrowRight,
  X,
  Share2,
  Check,
} from "lucide-react";
import "../../Style/Career.css";

export default function JobDetailModal({ show, onHide, job, onApply }) {
  const [copiedShare, setCopiedShare] = useState(false);

  if (!job) return null;

  const mailSubject = encodeURIComponent(
    job.isCollab
      ? `Creator Collaboration Inquiry: ${job.title} - BrandSetu Digital`
      : `Job Application: ${job.title} - BrandSetu Digital`
  );
  const mailBody = encodeURIComponent(
    job.isCollab
      ? `Hi BrandSetu Team,\n\nI want to collaborate with BrandSetu Digital for paid brand campaigns, sponsored reels, and ambassador deals.\n\nMy Details:\n- Name: \n- Phone: \n- Instagram / YouTube / LinkedIn Handle: \n- Follower / Subscriber Count: \n- Primary Content Niche: \n- Average Views / Reach: \n\nLooking forward to partnering with your client brands!\n\nBest regards,\n`
      : `Hi BrandSetu Team,\n\nI am excited to apply for the ${job.title} role in Indore.\n\nMy Details:\n- Name: \n- Phone: \n- Current Location: \n- Total Experience: \n- Portfolio / LinkedIn URL: \n\nPlease find my resume attached.\n\nBest regards,\n`
  );
  const mailtoLink = `mailto:brandsetudigital@gmail.com?subject=${mailSubject}&body=${mailBody}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${job.title} at BrandSetu Digital`,
          text: `Check out the ${job.title} opening at BrandSetu Digital in Indore!`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      className="jd-modal-container"
      backdrop="static"
    >
      <div className="jd-modal-wrapper position-relative">
        {/* Top Action Buttons (Share & Close) */}
        <div className="position-absolute d-flex align-items-center gap-2" style={{ top: "18px", right: "18px", zIndex: 10 }}>
          <button
            className="jd-close-btn position-static"
            onClick={handleShare}
            aria-label="Share Job"
            title="Share Job Opening"
          >
            {copiedShare ? <Check size={16} className="text-success" /> : <Share2 size={16} />}
          </button>
          <button
            className="jd-close-btn position-static"
            onClick={onHide}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Header */}
        <div className="jd-modal-header p-4 p-md-5 pb-3">
          <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
            <span className="jd-dept-badge">{job.department}</span>
            <span className="jd-pill jd-type-pill">
              <Clock size={12} className="me-1 text-warning" /> {job.type}
            </span>
            <span className="jd-pill">
              <Briefcase size={12} className="me-1 text-warning" /> {job.experience}
            </span>
            <span className="jd-pill">
              <MapPin size={12} className="me-1 text-warning" /> {job.location}
            </span>
          </div>

          <h2 className="jd-title fw-bold text-white mb-2">{job.title}</h2>
          <p className="jd-short-desc text-muted mb-3">{job.shortDescription}</p>

          {/* Highlights / Skills Tags */}
          {job.highlights && (
            <div className="d-flex flex-wrap gap-2 pt-1">
              {job.highlights.map((tag, i) => (
                <span key={i} className="jd-skill-chip">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <hr className="jd-divider my-0" />

        {/* Modal Body / JD Details */}
        <div className="jd-modal-body p-4 p-md-5 py-4">
          {/* About Role */}
          <div className="jd-section mb-4 pb-2">
            <h5 className="jd-section-title d-flex align-items-center gap-2">
              <Sparkles size={18} className="text-warning" /> About The Role
            </h5>
            <p className="jd-text">{job.aboutRole}</p>
          </div>

          {/* Key Responsibilities */}
          {job.responsibilities && (
            <div className="jd-section mb-4 pb-2">
              <h5 className="jd-section-title d-flex align-items-center gap-2">
                <CheckCircle2 size={18} className="text-warning" /> Key Responsibilities
              </h5>
              <ul className="jd-list">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="jd-list-item">
                    <span className="jd-bullet">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {job.requirements && (
            <div className="jd-section mb-4 pb-2">
              <h5 className="jd-section-title d-flex align-items-center gap-2">
                <Briefcase size={18} className="text-warning" /> What We're Looking For
              </h5>
              <ul className="jd-list">
                {job.requirements.map((req, i) => (
                  <li key={i} className="jd-list-item">
                    <span className="jd-bullet">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Perks */}
          {job.perks && (
            <div className="jd-section mb-2">
              <h5 className="jd-section-title d-flex align-items-center gap-2">
                <Sparkles size={18} className="text-warning" /> Why BrandSetu Digital?
              </h5>
              <ul className="jd-list">
                {job.perks.map((perk, i) => (
                  <li key={i} className="jd-list-item">
                    <span className="jd-bullet">•</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer / Action CTA */}
        <div className="jd-modal-footer p-4 p-md-4 border-top border-dark-subtle d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-2 text-muted small">
            <span>Got questions?</span>
            <a
              href="mailto:brandsetudigital@gmail.com"
              className="text-warning text-decoration-none fw-semibold"
            >
              brandsetudigital@gmail.com
            </a>
          </div>

          <div className="d-flex align-items-center gap-2 w-100 w-md-auto justify-content-end">
            {/* Direct Email Apply Button */}
            <a
              href={mailtoLink}
              className="btn btn-outline-warning btn-md rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2 jd-action-mail"
              title="Apply directly using your email app"
            >
              <Mail size={16} />
              <span>{job.isCollab ? "Collab via Email" : "Apply via Email"}</span>
            </a>

            {/* Online Form Apply Button */}
            <button
              className="btn btn-warning btn-md rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2 jd-action-apply"
              onClick={() => {
                onHide();
                if (onApply) onApply(job.title, job.isCollab ? "collab" : "form");
              }}
            >
              <span>{job.isCollab ? "Apply for Collab" : "Apply with Form"}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
