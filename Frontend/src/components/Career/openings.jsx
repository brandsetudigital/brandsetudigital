import React, { useState, useMemo } from "react";
import {
  MapPin,
  Clock,
  Briefcase,
  ArrowUpRight,
  FileText,
  Search,
  Sparkles,
  Mail,
  HelpCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import ApplyJobModal from "./contactmodal";
import JobDetailModal from "./JobDetailModal";
import InfluencerModal from "./InfluencerModal";
import InfluencerCollab from "./InfluencerCollab";
import CareerHero from "./careerHero";
import Culture from "./culture";
import { jobsData, jobCategories } from "../../data/jobsData";

import "../../Style/Home.css";
import "../../Style/Career.css";
import Seo from "../Seo";

export default function JobListings() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [showJDModal, setShowJDModal] = useState(false);
  const [selectedJobForJD, setSelectedJobForJD] = useState(null);

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJobForApply, setSelectedJobForApply] = useState("");
  const [applyInitialMode, setApplyInitialMode] = useState("form");

  const [showInfluencerModal, setShowInfluencerModal] = useState(false);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: jobsData.length };
    jobsData.forEach((j) => {
      counts[j.category] = (counts[j.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Handlers
  const handleOpenJD = (job) => {
    setSelectedJobForJD(job);
    setShowJDModal(true);
  };

  const handleOpenApply = (jobTitle, mode = "form") => {
    setSelectedJobForApply(jobTitle);
    setApplyInitialMode(mode);
    setShowApplyModal(true);
  };

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return jobsData.filter((job) => {
      const matchesCategory =
        selectedCategory === "all" || job.category === selectedCategory;

      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.highlights.some((h) =>
          h.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const floatingShapes = useMemo(
    () =>
      [...Array(20)].map(() => ({
        size: Math.floor(Math.random() * 100 + 40),
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 4,
      })),
    []
  );

  return (
    <>
      <Seo
        title="Careers at BrandSetu Digital — Digital Marketing & Tech Jobs in Indore"
        description="Explore open positions in SEO, Performance Marketing, Influencer Partnerships, Video Editing, Graphic Design, and Web Dev at BrandSetu Digital in Indore. View detailed JDs and apply today."
        path="/career"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://brandsetudigital.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Careers",
              item: "https://brandsetudigital.com/career",
            },
          ],
        }}
      />

      {/* Hero section */}
      <CareerHero />

      {/* ================= OPENINGS MAIN SECTION ================= */}
      <section
        id="jobs"
        className="job-section hero-section position-relative overflow-hidden py-5"
      >
        {/* Floating Background Shapes */}
        <div className="hero-background position-absolute w-100 h-100">
          {floatingShapes.map((shape, i) => (
            <motion.div
              key={i}
              className="floating-shape position-absolute rounded-circle"
              style={{
                width: shape.size,
                height: shape.size,
                left: `${shape.left}%`,
                top: `${shape.top}%`,
              }}
              animate={{
                y: [0, 35, 0],
                x: [0, -35, 0],
                scale: [1, 1.25, 1],
              }}
              transition={{
                duration: shape.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: shape.delay,
              }}
            />
          ))}
        </div>

        <div className="container position-relative z-2">
          {/* SECTION HEADER */}
          <div className="text-center mb-5">
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill bg-dark mb-3 shadow-sm">
              <Sparkles size={16} className="text-warning" />
              <span className="text-warning fw-bold small">
                CAREERS AT BRANDSETU DIGITAL
              </span>
            </div>
            <h2 className="display-5 fw-bold text-dark mb-3">
              Build Work That <span className="text-black fst-italic">Actually Matters</span>
            </h2>
            <p
              className="text-dark mx-auto mb-4"
              style={{ maxWidth: "660px", fontSize: "1.05rem", fontWeight: "500", opacity: 0.88 }}
            >
              We’re not hiring cogs in a wheel. We’re building an agile, ambitious team
              of digital craftsmen, creators, and marketers in Indore who take pride
              in shipping high-impact work.
            </p>

            {/* Executive Hiring Stats Banner */}
            <div
              className="hiring-stats-banner mx-auto p-3 p-md-3.5 bg-white rounded-4 shadow-sm border border-light-subtle"
              style={{ maxWidth: "680px" }}
            >
              <div className="row g-0 align-items-center text-center">
                <div className="col-4">
                  <div className="hiring-stat-box border-end border-light-subtle">
                    <div className="hiring-stat-num">15+</div>
                    <div className="hiring-stat-label">Team Members</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="hiring-stat-box border-end border-light-subtle">
                    <div className="hiring-stat-num">40+</div>
                    <div className="hiring-stat-label">Brands Built</div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="hiring-stat-box">
                    <div className="hiring-stat-num">100%</div>
                    <div className="hiring-stat-label">Real Work</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FILTER BAR & SEARCH */}
          <div
            className="openings-filter-bar mb-4 p-3 rounded-4"
            style={{
              background: "rgba(0, 0, 0, 0.04)",
              border: "1px solid rgba(0, 0, 0, 0.08)",
            }}
          >
            <div className="row align-items-center g-3">
              {/* Category Pills with Dynamic Role Counts */}
              <div className="col-lg-8 col-md-12">
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  {jobCategories.map((cat) => (
                    <button
                      key={cat.key}
                      type="button"
                      className={`job-filter-pill d-inline-flex align-items-center gap-1.5 ${
                        selectedCategory === cat.key ? "active" : ""
                      }`}
                      onClick={() => setSelectedCategory(cat.key)}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`badge rounded-pill ${
                          selectedCategory === cat.key
                            ? "bg-warning text-dark"
                            : "bg-light text-secondary border border-light-subtle"
                        }`}
                        style={{ fontSize: "0.72rem" }}
                      >
                        {categoryCounts[cat.key] || 0}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Input */}
              <div className="col-lg-4 col-md-12">
                <div className="job-search-box position-relative">
                  <Search
                    size={17}
                    className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                  />
                  <input
                    type="text"
                    className="form-control rounded-pill ps-5 pe-4 py-2 border-0 bg-white"
                    placeholder="Search roles (e.g. SEO, Ads, Video, Dev)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      className="btn btn-sm btn-link position-absolute top-50 end-0 translate-middle-y me-2 text-muted text-decoration-none"
                      onClick={() => setSearchQuery("")}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 3-COLUMN COMPACT JOB CARDS GRID */}
          {filteredJobs.length === 0 ? (
            <div className="text-center py-5 bg-dark rounded-4 p-4 p-md-5 border border-secondary border-opacity-25 shadow-sm text-light">
              <Briefcase size={44} className="text-warning mb-3 mx-auto" />
              <h4 className="fw-bold text-white mb-2">No matching positions found</h4>
              <p className="text-muted small mb-4">
                Try searching for another keyword or browse all open categories.
              </p>
              <button
                className="btn btn-warning rounded-pill px-4 fw-bold"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="row g-4">
              <AnimatePresence>
                {filteredJobs.map((job) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="col-lg-4 col-md-6 col-12"
                    key={job.id}
                  >
                    <div
                      className="job-card-modern h-100 d-flex flex-column justify-content-between"
                      onClick={() => handleOpenJD(job)}
                    >
                      <div>
                        {/* Top Meta Bar */}
                        <div className="d-flex align-items-center justify-content-between gap-2 mb-2.5">
                          <span
                            className={`job-badge-dept ${
                              job.isCollab
                                ? "bg-warning text-dark fw-bold border-warning"
                                : ""
                            }`}
                          >
                            {job.isCollab ? "★ CREATOR NETWORK" : job.department}
                          </span>
                          <span className="job-badge-type">
                            <Clock size={11} className="me-1 text-warning" /> {job.type}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="job-card-title mb-2">{job.title}</h4>

                        {/* Location & Experience Micro-pills */}
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <span className="job-micro-pill">
                            <MapPin size={12} className="text-warning" /> {job.location}
                          </span>
                          <span className="job-micro-pill">
                            <Briefcase size={12} className="text-warning" /> {job.experience}
                          </span>
                        </div>

                        {/* Short Description (2 Lines max) */}
                        <p className="job-card-desc mb-3">
                          {job.shortDescription}
                        </p>

                        {/* Skill Tags */}
                        <div className="d-flex flex-wrap gap-1.5 mb-3">
                          {job.highlights.slice(0, 3).map((tag, i) => (
                            <span key={i} className="job-tag-chip">
                              #{tag}
                            </span>
                          ))}
                          {job.highlights.length > 3 && (
                            <span className="job-tag-chip text-warning opacity-75">
                              +{job.highlights.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div
                        className="pt-3 border-top border-light-subtle d-flex align-items-center justify-content-between gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          className="btn btn-sm btn-view-jd d-flex align-items-center gap-1.5"
                          onClick={() => handleOpenJD(job)}
                        >
                          <FileText size={13} />
                          <span>{job.isCollab ? "Collab Details" : "View JD"}</span>
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-quick-apply d-flex align-items-center gap-1.5"
                          onClick={() => {
                            if (job.isCollab) {
                              setShowInfluencerModal(true);
                            } else {
                              handleOpenApply(job.title, "form");
                            }
                          }}
                        >
                          <span>{job.isCollab ? "Join Collab" : "Apply"}</span>
                          <ArrowUpRight size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* 9th Grid Card: Don't See Your Role */}
              {selectedCategory === "all" && !searchQuery && (
                <div className="col-lg-4 col-md-6 col-12">
                  <div
                    className="job-card-general-grid h-100"
                    onClick={() => handleOpenApply("General Application", "form")}
                  >
                    <div className="general-grid-icon">
                      <HelpCircle size={24} className="text-dark" />
                    </div>
                    <h4 className="fw-bold text-dark mb-2" style={{ fontSize: "1.18rem" }}>
                      Don’t See Your Role?
                    </h4>
                    <p className="text-secondary small mb-4 px-2" style={{ lineHeight: "1.55" }}>
                      We are always hunting for creative minds, builders, and marketers.
                      Drop your resume and portfolio with us!
                    </p>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-quick-apply px-3 py-1.5"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenApply("General Application", "form");
                        }}
                      >
                        General Apply
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-view-jd px-3 py-1.5"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenApply("General Application", "mail");
                        }}
                      >
                        Direct Mail
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ================= MODALS ================= */}

      {/* 1. Job Description Detail Modal */}
      <JobDetailModal
        show={showJDModal}
        onHide={() => setShowJDModal(false)}
        job={selectedJobForJD}
        onApply={(title, mode) => {
          if (mode === "collab" || selectedJobForJD?.isCollab) {
            setShowInfluencerModal(true);
          } else {
            handleOpenApply(title, mode || "form");
          }
        }}
      />

      {/* 2. Application Modal (Dual Form + Email) */}
      <ApplyJobModal
        show={showApplyModal}
        onHide={() => setShowApplyModal(false)}
        job={selectedJobForApply}
        initialMode={applyInitialMode}
      />

      {/* 3. Dedicated Influencer & Creator Collaboration Showcase Section */}
      <InfluencerCollab />

      {/* 4. Influencer Collab Application Modal */}
      <InfluencerModal
        show={showInfluencerModal}
        onHide={() => setShowInfluencerModal(false)}
      />

      {/* Culture Section */}
      <Culture />
    </>
  );
}
