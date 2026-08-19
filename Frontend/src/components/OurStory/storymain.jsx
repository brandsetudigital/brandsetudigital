import React, { useEffect, useMemo, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import StartImg from "../../assets/digital-marketing-services.jpg";
// import CEO from "../OurStory/ceo";
import Prblmsol from "../OurStory/prblmsol";

import Strategy from "../../assets/strategic-digital-growth-brandsetu.png";
import Feature from "../../assets/trusted-digital-experience-brandsetu.png";
import innovation from "../../assets/Innovative-digital-solutions-brandsetu.png";
import StoryHero from "../../assets/Top-digital-marketing-company.mov";

import AOS from "aos";
import "aos/dist/aos.css";
import "../../Style/OurStory.css";
import "../../App.css";
import "../../Style/Contact.css";
import "../../Style/Home.css";
import Seo from "../Seo";

const values = [
  {
    title: "Strategic Digital Growth",
    img: Strategy,
    desc: "BrandSetu helps businesses grow purposefully online by combining creativity, technology, and data-driven strategies. Every action is aligned with measurable results and long-term brand success.",
  },
  {
    title: "Innovative Solutions",
    img: Feature,
    desc: "From branding, marketing automation, to cutting-edge web and app development, BrandSetu leverages innovative technologies to make brands stand out in a crowded digital landscape.",
  },
  {
    title: "Trusted & Impactful Experiences",
    img: innovation,
    desc: "They deliver authentic digital experiences that build trust, authority, and engagement. BrandSetu ensures that every client interaction translates into meaningful business growth.",
  },
];

const About = () => {
  const videoRef = useRef(null);
  const [audioOn, setAudioOn] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  /* ===== TRY INITIAL UNMUTED PLAY (BROWSER SAFE) ===== */
  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.userAgent === "ReactSnap") {
      return;
    }
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        video.muted = false;
        setAudioOn(true);
      });
    }
  }, []);

  /* ===== MUTE / UNMUTE TOGGLE ===== */
  const toggleAudio = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = audioOn;
    videoRef.current.volume = 1;
    videoRef.current.play();
    setAudioOn(!audioOn);
  };

  /* ===== AUTO MUTE ON SCROLL ===== */
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80 && videoRef.current) {
        videoRef.current.muted = true;
        setAudioOn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ===== Floating Shapes ===== */
  const floatingShapes = useMemo(
    () =>
      Array.from({ length: 35 }).map(() => ({
        size: Math.floor(Math.random() * 130 + 40),
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
      })),
    [],
  );

  return (
    <>
    <Seo
      title="About BrandSetu Digital — Digital Marketing Experts in Indore"
      description="Learn the BrandSetu Digital story: an Indore-based digital marketing agency. Our mission, vision, leadership, and the values driving our work in branding and SEO."
      path="/about"
      jsonLd={[
        {
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
              name: "Our Story",
              item: "https://brandsetudigital.com/about",
            },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "@id": "https://brandsetudigital.com/about#webpage",
          url: "https://brandsetudigital.com/about",
          name: "About BrandSetu Digital",
          isPartOf: { "@id": "https://brandsetudigital.com/#organization" },
          mainEntity: { "@id": "https://brandsetudigital.com/#organization" },
        },
        {
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Soumitra Bajpai",
          jobTitle: "Founder & CEO",
          worksFor: { "@id": "https://brandsetudigital.com/#organization" },
          url: "https://brandsetudigital.com/about",
        },
        {
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Devesh Jain",
          jobTitle: "Co-Founder & COO",
          worksFor: { "@id": "https://brandsetudigital.com/#organization" },
          url: "https://brandsetudigital.com/about",
        },
      ]}
    />
    <section className="hero-section position-relative overflow-hidden hero-full">
      {/* FLOATING BACKGROUND */}
      <div className="hero-background position-absolute w-100 h-100" style={{ top: 0, left: 0, zIndex: 0, pointerEvents: "none" }} aria-hidden="true">
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
              y: [0, Math.random() * 80 - 40, 0],
              x: [0, Math.random() * 80 - 40, 0],
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

      {/* HERO */}
      <div className="about-hero position-relative z-2">
        <video
          ref={videoRef}
          className="w-100 pt-0 mt-0 about-banner-img"
          src={typeof navigator !== "undefined" && navigator.userAgent === "ReactSnap" ? undefined : StoryHero}
          autoPlay={typeof navigator === "undefined" || navigator.userAgent !== "ReactSnap"}
          loop={typeof navigator === "undefined" || navigator.userAgent !== "ReactSnap"}
          playsInline
          preload={typeof navigator !== "undefined" && navigator.userAgent === "ReactSnap" ? "none" : "metadata"}
        />

        <div className="about-banner-overlay" />

        {/* AUDIO BUTTON — ONLY Z-INDEX FIX */}
        <div className="video-audio-wrapper">
          <button className="video-audio-btn" onClick={toggleAudio}>
            {audioOn ? "🔊" : "🔇"}
          </button>
        </div>

        {/* CONTACT BOX */}
        <div className="position-absolute bottom-0 end-0 pe-3 pb-4">
          <div className="about-contact-box text-white rounded-4 shadow">
            <div className="d-flex align-items-center mb-3">
              <FaPhoneAlt className="me-3" />
              <span>+91 6232363639</span>
            </div>
            <div className="d-flex align-items-center mb-3">
              <FaEnvelope className="me-3" />
              <span>Brandsetudigital@gmail.com</span>
            </div>
            <div className="d-flex align-items-start">
              <FaMapMarkerAlt className="me-3 mt-1" />
              <span>
                Office No.103, Orange Business Park, Bhawarkua, Indore – 452014
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT — 100% ORIGINAL */}
      <div className="container py-5 position-relative z-2 py-5 mb-5 pt-5 mt-5">
        <div className="row align-items-center mb-5">
          <div className="col-md-6 mb-4" data-aos="fade-right">
            <div className="about-img-wrap rounded-4 shadow overflow-hidden">
              <img
                src={StartImg}
                alt="BrandSetu Digital — building digital brands in Indore"
                className="w-100"
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div className="col-md-6 ps-md-5" data-aos="fade-left">
            <h1 className="fw-bold display-6 mb-4 text-center text-md-start">
              Building <span className="text-danger"> BEST </span>Digital Brands
            </h1>

            <p className="text-dark text-justify" style={{ lineHeight: 1.8 }}>
              <span className="text-danger fw-bold fs-4">BrandSetu</span> is a Top digital growth partner that helps brands
              establish a powerful and purposeful online presence. We blend
              creativity, strategy, and technology to craft digital solutions
              that are visually compelling, performance-driven, and built for
              long-term impact. With a sharp focus on innovation and excellence,
              BrandSetu connects ideas with results and brands with their true
              potential.
            </p>

            <p
              className="text-dark text-justify mb-3"
              style={{ lineHeight: 1.8 }}
            >
              BrandSetu is a strategic digital agency transforming ideas into
              impactful brand experiences through design, technology, and
              growth-focused marketing.
            </p>

            <p
              className="fw-semibold fst-italic text-dark text-justify"
              style={{ lineHeight: 1.8 }}
            >
              Success that feels Real, Personal, and Unforgettable.
            </p>
          </div>
        </div>
        <div className="pt-4 mt-4">
          <section className="bg-dark position-relative services-section py-5 pt-5 mt-5">
            <div className="bg-layer position-absolute top-0 start-0 w-100 h-100 mt-5 pt-5">
              <div className="bg-blob blob-1"></div>
              <div className="bg-blob blob-2"></div>
            </div>

            <div className="container position-relative" style={{ zIndex: 1 }}>
              <h2
                className="text-center text-white fw-bold display-4 mb-5"
                data-aos="fade-up"
              >
                Our <span className="text-danger">Features</span>
              </h2>

              <div className="row g-4">
                {values.map((item, idx) => (
                  <div
                    key={idx}
                    className="col-12 col-sm-6 col-lg-4 d-flex align-items-stretch"
                  >
                    <div
                      className="rounded-10 shadow-md section uscard w-100"
                      data-aos="zoom-in-up"
                    >
                      <img
                        src={item.img}
                        alt={`${item.title} — BrandSetu Digital`}
                        className="card-img-top p-3"
                        width="180"
                        height="180"
                        loading="lazy"
                        decoding="async"
                        style={{ height: "180px", objectFit: "contain" }}
                      />
                      <div className="card-body text-center">
                        <h3 className="fw-bold text-white fs-5">{item.title}</h3>
                        <p className="text-white" style={{ lineHeight: 1.7 }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* <CEO /> */}
      <Prblmsol />
    </section>
    </>
  );
};

export default About;
