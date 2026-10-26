import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import StartImg from "../../assets/digital-marketing-services.jpg";
// import CEO from "../OurStory/ceo";
import Prblmsol from "../OurStory/prblmsol";

import Strategy from "../../assets/strategic-digital-growth-brandsetu.webp";
import Feature from "../../assets/trusted-digital-experience-brandsetu.png";
import innovation from "../../assets/Innovative-digital-solutions-brandsetu.png";
import StoryHero from "../../assets/Top-digital-marketing-company.mp4";

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
    alt: "Strategic Digital Growth — Best SEO Agency in Indore",
    desc: "BrandSetu helps businesses grow purposefully online by combining creativity, technology, and data-driven strategies. Every action is aligned with measurable results and long-term brand success.",
  },
  {
    title: "Innovative Solutions",
    img: innovation,
    alt: "Innovative Solutions — Best Digital Marketing Services in Indore",
    desc: "From branding, marketing automation, to cutting-edge web and app development, BrandSetu leverages innovative technologies to make brands stand out in a crowded digital landscape.",
  },
  {
    title: "Trusted & Impactful Experiences",
    img: Feature,
    alt: "Trusted & Impactful Experiences — Social Media Marketing Indore",
    desc: "They deliver authentic digital experiences that build trust, authority, and engagement. BrandSetu ensures that every client interaction translates into meaningful business growth.",
  },
];

const About = () => {
  const videoRef = useRef(null);
  const [audioOn, setAudioOn] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  /* ===== TRY INITIAL AUTOPLAY (BROWSER SAFE) ===== */
  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.userAgent === "ReactSnap") {
      return;
    }
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Video autoplay prevented:", err);
      });
    }
  }, []);

  /* ===== MUTE / UNMUTE TOGGLE ===== */
  const toggleAudio = () => {
    if (!videoRef.current) return;

    const newAudioState = !audioOn;
    videoRef.current.muted = !newAudioState;
    videoRef.current.volume = 1;
    videoRef.current.play().catch(() => { });
    setAudioOn(newAudioState);
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
        title="Best Digital Marketing Agency in Indore | SEO & Social Media Services"
        description="BrandSetu Digital is the best Digital Marketing Agency in Indore offering the best SEO agency in Indore, best digital marketing services in Indore, and social media marketing Indore to grow your business online."
        keywords="Digital marketing Agency in indore, best Digital marketing Agency in indore, Best SEO agency in indore, Best Digital marketing services in indore, social media marketing indore, digital marketing company Indore, BrandSetu Digital"
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
                name: "About Us",
                item: "https://brandsetudigital.com/about",
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "@id": "https://brandsetudigital.com/about#webpage",
            url: "https://brandsetudigital.com/about",
            name: "Best Digital Marketing Agency in Indore — BrandSetu Digital",
            description: "BrandSetu Digital is the best Digital Marketing Agency in Indore offering the best SEO agency in Indore, best digital marketing services in Indore, and social media marketing Indore.",
            isPartOf: { "@id": "https://brandsetudigital.com/#organization" },
            mainEntity: { "@id": "https://brandsetudigital.com/#organization" },
          },
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "BrandSetu Digital - Best Digital Marketing Agency in Indore",
            image: "https://brandsetudigital.com/favicon-512x512.png",
            url: "https://brandsetudigital.com/about",
            telephone: "+91-7389824231",
            priceRange: "₹₹",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Office No.103, Orange Business Park, Bhawarkua",
              addressLocality: "Indore",
              addressRegion: "Madhya Pradesh",
              postalCode: "452014",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 22.7196,
              longitude: 75.8577,
            },
            sameAs: [
              "https://www.instagram.com/brandsetudigital",
              "https://www.linkedin.com/company/brandsetudigital",
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Saumitra Bajpai",
            jobTitle: "Founder & CEO",
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
            title="Best Digital Marketing Agency in Indore - BrandSetu Digital"
            aria-label="Best Digital Marketing Agency in Indore - BrandSetu Digital"
            className="w-100 pt-0 mt-0 about-banner-img"
            src={typeof navigator !== "undefined" && navigator.userAgent === "ReactSnap" ? undefined : StoryHero}
            autoPlay={typeof navigator === "undefined" || navigator.userAgent !== "ReactSnap"}
            loop={typeof navigator === "undefined" || navigator.userAgent !== "ReactSnap"}
            muted
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
                <span>+91 7389824231</span>
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
                  alt="Digital Marketing Agency in Indore — Best Digital Marketing Agency in Indore BrandSetu Digital"
                  title="Digital Marketing Agency in Indore | Best Digital Marketing Agency in Indore"
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
                Your Trusted <span className="text-danger">Digital Marketing Agency</span> in Indore 
              </h1>

              <p className="text-dark text-justify" style={{ lineHeight: 1.8 }}>
                <span className="text-danger fw-bold fs-4">We Are Brandsetu Digital</span>, the <strong>Best Digital Marketing Agency in Indore</strong> dedicated to building a strong online presence, reaching the right audience, and achieving sustainable business growth. As the <strong>Best SEO Agency in Indore</strong>, we provide the <strong>Best Digital Marketing Services in Indore</strong> including Search Engine Optimization (SEO), Google Ads, Meta Ads, <strong>Social Media Marketing Indore</strong>, Influencer Marketing, Graphic Design, Website Development, App Development, Content Marketing, Branding, Video Production, and Website Maintenance.
              </p>

              <p
                className="fw-semibold fst-italic text-dark text-justify"
                style={{ lineHeight: 1.8 }}
              >
                Success that feels Real, Personal, and Unforgettable.
              </p>

              <div className="mt-4 pt-2 d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
                <Link to="/contact#setu-enquiry-form">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-dark btn-lg rounded-pill px-4 py-3 fw-bold shadow-sm d-inline-flex align-items-center gap-2"
                  >
                    Setu Enquiry Form <ArrowRight size={18} />
                  </motion.button>
                </Link>
                <Link to="/services">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-outline-dark btn-lg rounded-pill px-4 py-3 fw-bold d-inline-flex align-items-center gap-2"
                  >
                    Our Services
                  </motion.button>
                </Link>
              </div>
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
                          alt={item.alt || `${item.title} — BrandSetu Digital`}
                          title={item.alt || item.title}
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
