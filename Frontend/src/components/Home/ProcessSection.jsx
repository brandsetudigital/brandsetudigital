import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Search, Compass, Zap, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import "../../Style/Home.css";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Audit",
    description:
      "We dive deep into your brand's metrics, audit competitor strategies, and identify clear digital growth opportunities.",
    color: "#06b6d4", // Teal/Cyan
    bg: "rgba(6, 182, 212, 0.12)",
  },
  {
    number: "02",
    icon: Compass,
    title: "Strategy & Planning",
    description:
      "Our team designs a bespoke marketing roadmap, selecting high-impact channels and setting clear measurable KPIs.",
    color: "#a855f7", // Purple
    bg: "rgba(168, 85, 247, 0.12)",
  },
  {
    number: "03",
    icon: Zap,
    title: "Execution & Launch",
    description:
      "We bring plans to life by launching hyper-targeted ads, building SEO authority, and creating standout brand campaigns.",
    color: "#f59e0b", // Amber/Gold
    bg: "rgba(245, 158, 11, 0.12)",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Optimize & Scale",
    description:
      "Using real-time performance analytics and rigorous A/B testing, we refine campaigns to maximize your ROI and scale growth.",
    color: "#10b981", // Emerald
    bg: "rgba(16, 185, 129, 0.12)",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function ProcessSection() {
  return (
    <section className="process-section py-5">
      {/* Visual Blob Blobs */}
      <div className="bg-blob blob-1" style={{ opacity: 0.2 }}></div>
      <div className="bg-blob blob-2" style={{ opacity: 0.2 }}></div>

      <Container className="position-relative z-3">
        {/* Header */}
        <div className="text-center mb-5 header-section">
          <div className="process-badge">OUR WORKFLOW</div>
          <h2 className="display-2 fw-bold text-white">
            Our <span className="text-warning">Execution PROCESS</span>
          </h2>
          <p className="process-subtitle lead fw-semibold text-warning">
            How we transform your business goals into digital reality
          </p>
        </div>

        {/* Stepper Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Row className="g-4">
            {steps.map((step, idx) => (
              <Col key={idx} md={6} lg={3}>
                <motion.div variants={cardVariants} className="h-100">
                  <div className="process-card h-100">
                    <div className="process-number">{step.number}</div>

                    <div
                      className="process-icon-wrapper"
                      style={{
                        backgroundColor: step.bg,
                        color: step.color,
                      }}
                    >
                      <step.icon size={28} />
                    </div>

                    <h3 className="process-step-title fs-5">{step.title}</h3>
                    <p className="process-step-desc mb-0">{step.description}</p>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </Container>
    </section>
  );
}
