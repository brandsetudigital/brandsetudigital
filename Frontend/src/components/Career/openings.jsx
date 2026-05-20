import React, { useState } from "react";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import ApplyJobModal from "../Career/contactmodal";
import CareerHero from "./careerHero";
import Culture from "./culture";

import "../../Style/Career.css";
import Seo from "../Seo";

const jobs = [
  {
    id: "1",
    title: "Senior Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description:
      "Own product design from idea to execution with the core team.",
  },
  {
    id: "2",
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Hybrid",
    type: "Full-time",
    description: "Build scalable systems that power real brands and users.",
  },
  {
    id: "3",
    title: "Marketing Manager",
    department: "Marketing",
    location: "On-site",
    type: "Full-time",
    description:
      "Lead growth strategy and brand storytelling across channels.",
  },
  {
    id: "4",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Design infrastructure that scales without chaos.",
  },
];

export default function JobListings() {
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");

  const handleApply = (jobTitle) => {
    setSelectedJob(jobTitle);
    setShowModal(true);
  };

  const floatingShapes = [...Array(30)].map(() => ({
    size: Math.floor(Math.random() * 120 + 30),
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <>
      <Seo
        title="Careers at BrandSetu Digital — Digital Marketing Jobs in Indore"
        description="Join BrandSetu Digital in Indore. Open roles in design, engineering, marketing, and DevOps. Build work that actually matters with a team that ships."
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
      <CareerHero />

      {/* ================= JOB LISTINGS ================= */}
      <section
        id="jobs"
        className="job-section hero-section position-relative overflow-hidden py-5"
      >
        {/* Floating Shapes */}
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
                y: [0, 40, 0],
                x: [0, -40, 0],
                scale: [1, 1.3, 1],
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
          <div className="row align-items-start g-5">
            {/* LEFT EDITORIAL */}
            <div className="col-lg-5 pt-5">
              <div className="jobs-editorial">
                <span className="jobs-eyebrow">CAREERS</span>

                <h2 className="jobs-heading">
                  Build Work <br />
                  That <span className="text-danger">Actually Matters</span>
                </h2>

                <p className="jobs-lead fs-medium">
                  We’re not hiring employees. We’re building a small, sharp team
                  that ships meaningful work.
                </p>

                <ul className="jobs-points fs-larger">
                  <li>Ownership over micromanagement</li>
                  <li>Fast decisions, zero politics</li>
                  <li>Direct impact on real brands</li>
                  <li>Learn by building, not meetings</li>
                </ul>

                <div className="jobs-stats">
                  <div>
                    <strong>15+</strong>
                    <span>Team Members</span>
                  </div>
                  <div>
                    <strong>40+</strong>
                    <span>Brands Built</span>
                  </div>
                  <div>
                    <strong>100%</strong>
                    <span>Real Work</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT JOB RAIL */}
            <div className="col-lg-7">
              <div className="job-rail">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="job-rail-item"
                    onClick={() => handleApply(job.title)}
                  >
                    <div className="job-rail-top">
                      <h3 className="fs-5 mb-0">{job.title}</h3>
                      <ArrowUpRight size={18} />
                    </div>

                    <p className="job-rail-desc">{job.description}</p>

                    <div className="job-rail-meta">
                      <span>
                        <MapPin size={14} /> {job.location}
                      </span>
                      <span>
                        <Clock size={14} /> {job.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GENERAL APPLICATION ================= */}
      <section className="general-apply-section">
        <div className="container">
          <div className="general-apply-box">
            <div className="general-apply-content">
              <h2>Don’t See Your Role?</h2>
              <p>
                We’re always looking for talented people. Send us your resume
                and let’s talk.
              </p>
            </div>

            <button
              className="general-apply-btn"
              onClick={() => handleApply("General Application")}
            >
              Send General Application
            </button>
          </div>
        </div>
      </section>

      {/* APPLY MODAL */}
      <ApplyJobModal
        show={showModal}
        onHide={() => setShowModal(false)}
        job={selectedJob}
      />

      <Culture />
    </>
  );
}
