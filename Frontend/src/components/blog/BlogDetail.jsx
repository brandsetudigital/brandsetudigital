import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  Clock,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  PhoneCall,
  List,
  HelpCircle,
} from "lucide-react";
import { FaLinkedinIn, FaTwitter, FaWhatsapp, FaFacebookF } from "react-icons/fa";
import { blogsData, serviceHubsData } from "../../data/blogsData";
import Seo from "../Seo";
import "../../Style/Blog.css";
import "../../Style/Home.css";

export default function BlogDetail() {
  const { articleSlug, slug } = useParams();
  const activeSlug = articleSlug || slug;
  const [openFaq, setOpenFaq] = useState(null);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSlug]);

  // Find article by slug
  const blog = useMemo(() => {
    return blogsData.find((item) => item.slug === activeSlug);
  }, [activeSlug]);

  // Related articles (matching same service first)
  const relatedBlogs = useMemo(() => {
    if (!blog) return [];
    const sameService = blogsData.filter(
      (item) => item.id !== blog.id && item.serviceSlug === blog.serviceSlug
    );
    if (sameService.length >= 3) return sameService.slice(0, 3);
    const otherBlogs = blogsData.filter(
      (item) => item.id !== blog.id && item.serviceSlug !== blog.serviceSlug
    );
    return [...sameService, ...otherBlogs].slice(0, 3);
  }, [blog]);

  // Frequently asked questions relevant to this service hub
  const serviceFaqs = useMemo(() => {
    if (!blog || !blog.serviceSlug) return [];
    return serviceHubsData[blog.serviceSlug]?.faqs || [];
  }, [blog]);

  // Ambient floating background particles
  const floatingShapes = useMemo(
    () =>
      Array.from({ length: 25 }).map(() => ({
        size: Math.floor(Math.random() * 90 + 30),
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 14 + 10,
        delay: Math.random() * 4,
      })),
    []
  );

  if (!blog) {
    return (
      <div className="blog-detail-wrapper text-center py-5">
        <Container className="py-5">
          <h2 className="display-5 fw-bold text-dark mb-3">Article Not Found</h2>
          <p className="text-dark opacity-75 mb-4">
            The article you are looking for does not exist or has been relocated.
          </p>
          <Link to="/blog" className="btn btn-dark text-warning rounded-pill px-4 py-2 fw-bold">
            ← Back to Blog
          </Link>
        </Container>
      </div>
    );
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = (platform) => {
    const title = encodeURIComponent(blog.title);
    const url = encodeURIComponent(currentUrl);

    let shareUrl = "";
    if (platform === "twitter") {
      shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
    } else if (platform === "linkedin") {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    } else if (platform === "whatsapp") {
      shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
    } else if (platform === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    }
    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  // Structured Data Schema for Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.excerpt,
    "image": blog.image,
    "datePublished": blog.publishDate,
    "author": {
      "@type": "Person",
      "name": blog.author.name,
    },
    "publisher": {
      "@type": "Organization",
      "name": "BrandSetu Digital",
      "logo": {
        "@type": "ImageObject",
        "url": "https://brandsetudigital.com/favicon-512x512.png",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl,
    },
  };

  return (
    <div className="blog-detail-wrapper position-relative">
      <Seo
        title={blog.metaTitle || blog.title}
        description={blog.metaDescription || blog.excerpt}
        path={`/blog/${blog.slug}`}
        jsonLd={articleSchema}
      />

      {/* Ambient Floating Shapes (translucent on yellow) */}
      <div className="position-absolute w-100 h-100 overflow-hidden" style={{ top: 0, left: 0, pointerEvents: "none", zIndex: 0 }}>
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
              y: [0, Math.random() * 60 - 30, 0],
              x: [0, Math.random() * 60 - 30, 0],
              scale: [1, 1.2, 1],
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

      <Container className="position-relative z-2">
        {/* BREADCRUMBS */}
        <nav aria-label="breadcrumb" className="blog-breadcrumbs">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/blog">Blog</Link>
          <ChevronRight size={14} />
          {blog.serviceSlug && serviceHubsData[blog.serviceSlug] ? (
            <>
              <Link to={`/blog/${blog.serviceSlug}`} className="text-warning text-decoration-none">
                {serviceHubsData[blog.serviceSlug].name}
              </Link>
              <ChevronRight size={14} />
            </>
          ) : (
            <>
              <span className="text-warning">{blog.category}</span>
              <ChevronRight size={14} />
            </>
          )}
          <span className="active text-truncate" style={{ maxWidth: "250px" }}>
            {blog.title}
          </span>
        </nav>

        {/* ARTICLE HEADER */}
        <header className="article-header">
          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="featured-pill-tag">{blog.category}</span>
            <span className="text-dark opacity-50 small">•</span>
            <span className="blog-read-time">
              <Clock size={13} /> {blog.readTime}
            </span>
          </div>

          <h1 className="article-title">{blog.title}</h1>

          {/* META BAR & SHARING */}
          <div className="article-meta-bar">
            <div className="blog-author-info">
              <img
                src={blog.author.avatar}
                alt={blog.author.name}
                className="blog-author-img"
              />
              <div>
                <div className="blog-author-name">{blog.author.name}</div>
                <div className="blog-author-role d-flex align-items-center flex-wrap gap-2">
                  <span>{blog.author.role}</span>
                  <span className="opacity-50">•</span>
                  <span>Published: {blog.publishDate}</span>
                  {blog.updatedDate && (
                    <span className="badge bg-dark text-warning border border-warning border-opacity-25 rounded-pill px-2 py-0.5">
                      Updated: {blog.updatedDate}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Social Share buttons */}
            <div className="share-links-wrap">
              <span className="text-dark fw-bold small me-2 d-none d-sm-inline">
                Share:
              </span>
              <button
                type="button"
                className="share-btn"
                onClick={() => handleShare("whatsapp")}
                aria-label="Share on WhatsApp"
              >
                <FaWhatsapp size={15} />
              </button>
              <button
                type="button"
                className="share-btn"
                onClick={() => handleShare("linkedin")}
                aria-label="Share on LinkedIn"
              >
                <FaLinkedinIn size={14} />
              </button>
              <button
                type="button"
                className="share-btn"
                onClick={() => handleShare("twitter")}
                aria-label="Share on Twitter"
              >
                <FaTwitter size={14} />
              </button>
              <button
                type="button"
                className="share-btn"
                onClick={() => handleShare("facebook")}
                aria-label="Share on Facebook"
              >
                <FaFacebookF size={13} />
              </button>
            </div>
          </div>
        </header>

        {/* HERO FEATURED IMAGE */}
        <div className="article-featured-media">
          <img
            src={blog.image}
            alt={blog.title}
            className="article-hero-img"
            loading="eager"
          />
        </div>

        {/* CONTENT ROW */}
        <Row className="justify-content-center">
          <Col lg={10}>
            {/* KEY TAKEAWAYS BOX */}
            {blog.content?.keyTakeaways && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="key-takeaways-card"
              >
                <div className="takeaways-title">
                  <Sparkles size={18} />
                  <span>Key Executive Takeaways</span>
                </div>
                <ul className="takeaways-list">
                  {blog.content.keyTakeaways.map((item, idx) => (
                    <li key={idx} className="takeaways-item">
                      <CheckCircle2 size={16} className="takeaways-check" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* TABLE OF CONTENTS */}
            {blog.content?.sections && blog.content.sections.length > 0 && (
              <div
                className="blog-toc-card mb-4 p-4 rounded-4"
                style={{
                  background: "rgba(17, 24, 39, 0.75)",
                  border: "1px solid rgba(250, 204, 21, 0.25)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="d-flex align-items-center gap-2 text-warning mb-3">
                  <List size={18} />
                  <span className="fw-bold text-uppercase letter-spacing-1 small">
                    Table of Contents
                  </span>
                </div>
                <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                  {blog.content.sections.map((sec, idx) => (
                    <li key={idx}>
                      <a
                        href={`#section-${idx}`}
                        className="text-light opacity-85 text-decoration-none small d-inline-flex align-items-center gap-2"
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById(`section-${idx}`);
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth", block: "start" });
                          }
                        }}
                      >
                        <span
                          className="badge rounded-pill px-2 py-0.5"
                          style={{ background: "rgba(250, 204, 21, 0.15)", color: "#facc15" }}
                        >
                          {idx + 1}
                        </span>
                        <span className="hover-warning">{sec.heading}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ARTICLE BODY */}
            <article className="article-content-body">
              <p className="lead fw-bold text-dark mb-4">
                {blog.content?.intro}
              </p>

              {blog.content?.sections?.map((sec, idx) => (
                <section key={idx} id={`section-${idx}`} className="mb-4 pt-2">
                  <h2 className="article-section-title">{sec.heading}</h2>
                  <p style={{ color: "#1f2937", lineHeight: "1.85", fontSize: "1.08rem" }}>{sec.body}</p>
                </section>
              ))}

              {blog.content?.conclusion && (
                <div className="mt-5 p-4 p-md-5 rounded-4 bg-dark text-white border border-warning border-opacity-40 shadow-lg">
                  <h3 className="h5 fw-bold text-warning mb-2">Final Verdict</h3>
                  <p className="mb-0 text-light opacity-90">
                    {blog.content.conclusion}
                  </p>
                </div>
              )}

              {/* TAGS */}
              {blog.tags && (
                <div className="article-tags-cloud">
                  <span className="text-dark fw-bold small me-2">Tags:</span>
                  {blog.tags.map((tag) => (
                    <span key={tag} className="article-tag-chip">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* AUTHOR BIO CARD */}
              <div className="article-author-card">
                <img
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  className="rounded-circle border border-warning"
                  width="70"
                  height="70"
                />
                <div>
                  <h3 className="h6 fw-bold text-white mb-1">
                    Written by {blog.author.name}
                  </h3>
                  <p className="small text-light opacity-75 mb-2">
                    {blog.author.role} at BrandSetu Digital. Driving performance marketing,
                    high-converting web architectures, and strategic branding for high-growth brands.
                  </p>
                  <Link
                    to="/about"
                    className="text-warning text-decoration-none small fw-semibold d-inline-flex align-items-center gap-1"
                  >
                    Learn more about our agency <ArrowRight size={13} />
                  </Link>
                </div>
              </div>

              {/* FAQ ACCORDION SECTION */}
              {serviceFaqs && serviceFaqs.length > 0 && (
                <div
                  className="blog-faq-section my-5 p-4 p-md-5 rounded-4"
                  style={{
                    background: "rgba(17, 24, 39, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                  }}
                >
                  <div className="d-flex align-items-center gap-2 text-warning mb-2">
                    <HelpCircle size={20} />
                    <span className="small fw-bold text-uppercase letter-spacing-1">
                      Frequently Asked Questions
                    </span>
                  </div>
                  <h3 className="h4 fw-bold text-white mb-4">
                    Common Questions About {blog.category}
                  </h3>
                  <div className="d-flex flex-column gap-3">
                    {serviceFaqs.map((faq, idx) => {
                      const isOpen = openFaq === idx;
                      return (
                        <div
                          key={idx}
                          className="rounded-3 overflow-hidden transition-all"
                          style={{
                            background: isOpen ? "#1f2937" : "#111827",
                            border: isOpen
                              ? "1px solid rgba(250, 204, 21, 0.6)"
                              : "1px solid rgba(255, 255, 255, 0.08)",
                          }}
                        >
                          <button
                            type="button"
                            className="w-100 p-3 text-start bg-transparent border-0 text-white fw-bold d-flex justify-content-between align-items-center"
                            onClick={() => setOpenFaq(isOpen ? null : idx)}
                            style={{ cursor: "pointer" }}
                          >
                            <span className="fs-6 pe-2">{faq.question}</span>
                            {isOpen ? (
                              <ChevronUp size={18} className="text-warning flex-shrink-0" />
                            ) : (
                              <ChevronDown size={18} className="text-light opacity-50 flex-shrink-0" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="p-3 pt-0 text-light opacity-90 small lh-lg border-top border-secondary border-opacity-10">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </article>

            {/* IN-ARTICLE CTA BOX */}
            <div className="p-4 p-md-5 my-5 rounded-4 text-center text-white position-relative overflow-hidden"
                 style={{ background: "radial-gradient(circle, rgba(250,204,21,0.18) 0%, rgba(30,31,26,0.95) 70%)", border: "1.5px solid rgba(250,204,21,0.35)" }}>
              <span className="badge bg-warning text-dark fw-bold rounded-pill px-3 py-1 mb-3">
                READY TO SCALE YOUR BRAND?
              </span>
              <h2 className="display-6 fw-bold mb-3">
                Turn These Insights Into Revenue For Your Business
              </h2>
              <p className="text-light opacity-80 col-md-10 mx-auto mb-4">
                Partner with BrandSetu Digital for full-funnel digital marketing, data-driven SEO, and cutting-edge web design.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                {blog.serviceLink && (
                  <Link to={blog.serviceLink}>
                    <button className="btn btn-warning rounded-pill px-4 py-3 fw-bold text-dark d-inline-flex align-items-center gap-2">
                      Explore {blog.serviceName || "Related Service"} <ArrowRight size={18} />
                    </button>
                  </Link>
                )}
                <Link to="/contact">
                  <button className="btn btn-outline-warning rounded-pill px-4 py-3 fw-bold text-white d-inline-flex align-items-center gap-2">
                    Book Free Consultation <ArrowRight size={18} />
                  </button>
                </Link>
                <a href="tel:+917389824231">
                  <button className="btn btn-outline-light rounded-pill px-4 py-3 fw-bold d-inline-flex align-items-center gap-2">
                    <PhoneCall size={16} className="text-warning" /> +91 7389824231
                  </button>
                </a>
              </div>
            </div>
          </Col>
        </Row>

        {/* RELATED ARTICLES */}
        {relatedBlogs.length > 0 && (
          <div className="mt-5 pt-4 border-top border-dark border-opacity-15">
            <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
              <div>
                <span className="text-dark small fw-bold text-uppercase letter-spacing-1">
                  Keep Reading
                </span>
                <h2 className="h3 fw-bold text-dark mb-0">Related Articles</h2>
              </div>
              <Link
                to="/blog"
                className="btn btn-dark text-warning rounded-pill px-4 py-2 fw-bold text-decoration-none small d-inline-flex align-items-center gap-1 shadow-sm"
              >
                View all articles <ArrowRight size={14} />
              </Link>
            </div>

            <Row className="g-4">
              {relatedBlogs.map((item) => (
                <Col key={item.id} lg={4} md={6}>
                  <Link to={`/blog/${item.serviceSlug || 'seo'}/${item.slug}`} className="text-decoration-none d-block h-100">
                    <article className="blog-grid-card">
                      <div className="card-img-container">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="card-post-img"
                          loading="lazy"
                        />
                      </div>
                      <div className="card-content-area">
                        <h3 className="card-post-title">{item.title}</h3>
                        <p className="card-post-excerpt">{item.excerpt}</p>
                        <div className="card-footer-meta">
                          <span className="blog-read-time">
                            <Clock size={13} /> {item.readTime}
                          </span>
                          <span className="card-read-link">
                            Read <ArrowRight size={13} />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
}
