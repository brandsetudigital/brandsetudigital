import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Search, Compass, Zap, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Style/Home.css";

const steps = [
  {
    number: "01",
    title: "Discovery & Audit",
    icon: Search,
    description:
      "We analyze your business, competitors, audience, and existing digital presence to identify untapped opportunities.",
    theme: "cyan",
  },

  {
    number: "02",
    title: "Strategy & Planning",
    icon: Compass,
    description:
      "Our experts build a custom growth roadmap including SEO, Social Media, Performance Marketing and Branding.",
    theme: "purple",
  },

  {
    number: "03",
    title: "Execution & Launch",
    icon: Zap,
    description:
      "Creative production, paid campaigns, website optimization and brand assets are launched with precision.",
    theme: "orange",
  },

  {
    number: "04",
    title: "Optimization & Scaling",
    icon: TrendingUp,
    description:
      "We continuously analyze data, improve conversion rates and scale campaigns for maximum ROI.",
    theme: "green",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.6,
    },
  },
};

export default function ProcessSection() {
  return (
    <section className="process-section">
      <div className="blob blob-left"></div>
      <div className="blob blob-right"></div>

      <Container>
        <div className="section-title text-center">
          <span className="process-badge">OUR PROCESS</span>

          <h2>
            Turning Ideas Into
            <span> Growth Engine</span>
          </h2>

          <p>
            Our proven workflow combines research, creativity, technology and
            performance marketing to help your business grow consistently.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Row className="g-4 justify-content-center">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <Col lg={3} md={6} key={index}>
                  <motion.div
                    variants={item}
                    className={`process-card ${step.theme}`}
                  >
                    <span className="step-number">{step.number}</span>

                    <div className="icon-circle">
                      <Icon size={32} />
                    </div>

                    <h4>{step.title}</h4>

                    <p>{step.description}</p>
                  </motion.div>
                </Col>
              );
            })}
          </Row>
        </motion.div>
      </Container>
    </section>
  );
}
