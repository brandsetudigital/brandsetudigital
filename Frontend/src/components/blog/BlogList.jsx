import React, { useState, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search,
  Clock,
  ArrowRight,
  Sparkles,
  Send,
  BookOpen,
  CheckCircle2,
  X,
  Flame,
  Zap,
  Target,
  Globe,
  Share2,
  TrendingUp,
  Code,
  BarChart2,
  Terminal,
  Activity,
  Camera,
  MessageSquare,
} from "lucide-react";
import { blogsData, blogCategories, serviceHubsData } from "../../data/blogsData";
import Seo from "../Seo";
import "../../Style/Blog.css";
import "../../Style/Home.css";

const trendingSearches = [
  "Local SEO Indore",
  "Google Ads ROAS",
  "Meta Ads Scaling",
  "AI Marketing",
  "Brand Identity",
  "Website Speed",
];

const consoleStrategies = {
  seo: {
    filename: "seo_growth_engine.sh",
    command: "brandsetu.execute_topical_audit()",
    logs: [
      { tag: "[OK]", text: "Google AI Overviews Indexing & AEO: Optimized" },
      { tag: "[OK]", text: "High-Intent Keyword Footprint: 450+ Commercial Queries" },
      { tag: "[ROI]", text: "Organic Inbound Lead Velocity: Scaled" },
    ],
    metric: "Compounding Traffic",
    link: "/blog/seo/seo-kya-hai-business-growth-ke-liye-kyon-zaroori-hai",
    actionText: "Read SEO Playbook",
    sparkline: "M 0 35 Q 70 30 140 22 T 280 12 T 400 4",
    sparkArea: "M 0 35 Q 70 30 140 22 T 280 12 T 400 4 L 400 44 L 0 44 Z",
  },
  ads: {
    filename: "paid_acquisition_roas.py",
    command: "meta_google.optimize_roas()",
    logs: [
      { tag: "[OK]", text: "3:2:2 Dynamic Creative Testing Method: Active" },
      { tag: "[OK]", text: "Meta Conversions API (CAPI) Server Sync: 100%" },
      { tag: "[ROI]", text: "Average Blended Portfolio Return: High ROAS" },
    ],
    metric: "Healthy ROAS",
    link: "/blog/meta-ads/meta-ads-roas-improve-kaise-kare",
    actionText: "Read Ads Playbook",
    sparkline: "M 0 38 Q 60 28 150 18 T 300 10 T 400 4",
    sparkArea: "M 0 38 Q 60 28 150 18 T 300 10 T 400 4 L 400 44 L 0 44 Z",
  },
  ai: {
    filename: "ai_business_automation.json",
    command: "whatsapp_crm.stream_leads()",
    logs: [
      { tag: "[OK]", text: "WhatsApp Cloud API Greeting Trigger: Instant" },
      { tag: "[OK]", text: "Automated Lead Qualification & CRM Sync: Enabled" },
      { tag: "[ROI]", text: "Pipeline Lead-to-Call Conversion: Higher Uplift" },
    ],
    metric: "Fast Response",
    link: "/blog/whatsapp-marketing/whatsapp-business-api-guide",
    actionText: "Read WhatsApp Playbook",
    sparkline: "M 0 40 Q 90 32 180 20 T 310 8 T 400 2",
    sparkArea: "M 0 40 Q 90 32 180 20 T 310 8 T 400 2 L 400 44 L 0 44 Z",
  },
};

const getServiceIcon = (slug) => {
  switch (slug) {
    case "seo":
      return <Search size={14} className="service-hub-chip-icon" />;
    case "google-ads":
      return <Target size={14} className="service-hub-chip-icon" />;
    case "meta-ads":
      return <TrendingUp size={14} className="service-hub-chip-icon" />;
    case "social-media-marketing":
      return <Share2 size={14} className="service-hub-chip-icon" />;
    case "branding":
      return <Sparkles size={14} className="service-hub-chip-icon" />;
    case "web-development":
      return <Code size={14} className="service-hub-chip-icon" />;
    case "ai-automation":
      return <Zap size={14} className="service-hub-chip-icon" />;
    case "local-seo":
      return <Globe size={14} className="service-hub-chip-icon" />;
    case "performance-marketing":
      return <BarChart2 size={14} className="service-hub-chip-icon" />;
    case "content-marketing":
      return <BookOpen size={14} className="service-hub-chip-icon" />;
    case "product-shoot":
      return <Camera size={14} className="service-hub-chip-icon" />;
    case "whatsapp-marketing":
      return <MessageSquare size={14} className="service-hub-chip-icon" />;
    default:
      return <Sparkles size={14} className="service-hub-chip-icon" />;
  }
};

export default function BlogList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeConsoleTab, setActiveConsoleTab] = useState("seo");
  const [visibleCount, setVisibleCount] = useState(9);

  // Filter blogs based on category & search query
  const filteredBlogs = useMemo(() => {
    return blogsData.filter((blog) => {
      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        blog.title.toLowerCase().includes(query) ||
        blog.excerpt.toLowerCase().includes(query) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Featured article (first featured or first item)
  const featuredBlog = useMemo(() => {
    return blogsData.find((b) => b.featured) || blogsData[0];
  }, []);

  const floatingShapes = useMemo(
    () =>
      [...Array(14)].map(() => ({
        size: Math.floor(Math.random() * 90 + 35),
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 4,
      })),
    []
  );

  const heroStats = [
    { value: "50+", label: "Growth Playbooks" },
    { value: "15k+", label: "Monthly Readers" },
    { value: "100%", label: "Actionable ROI" },
    { value: "4.9★", label: "Industry Rated" },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleTrendingClick = (topic) => {
    setSearchQuery(topic);
    setSelectedCategory("All");
  };

  return (
    <div className="blog-page-wrapper position-relative">
      <Seo
        title="Digital Marketing, SEO & Branding Blog | BrandSetu Digital"
        description="Read actionable digital marketing strategies, SEO growth hacks, performance marketing blueprints, and branding guides from the BrandSetu Digital team."
        path="/blog"
      />

      {/* Website Background Blobs */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      {/* HERO HEADER - AGENCY SPLIT STYLE */}
      <section className="blog-hero-section position-relative overflow-hidden">
        {/* Ambient Floating Shapes */}
        <div className="position-absolute w-100 h-100 top-0 start-0 pointer-events-none" style={{ zIndex: 0 }}>
          {floatingShapes.map((shape, i) => (
            <motion.div
              key={i}
              className="blog-floating-shape"
              style={{
                width: shape.size,
                height: shape.size,
                left: `${shape.left}%`,
                top: `${shape.top}%`,
              }}
              animate={{
                y: [0, Math.random() * 50 - 25, 0],
                x: [0, Math.random() * 50 - 25, 0],
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
          <Row className="align-items-center g-5 mb-5">
            {/* LEFT COLUMN */}
            <Col lg={7} className="blog-hero-left">
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="blog-hero-badge"
              >
                <span className="pulse-indicator"></span>
                <Sparkles size={14} className="text-warning" />
                <span>Knowledge Hub & Growth Playbooks</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="blog-hero-split-title"
              >
                <span>DIGITAL MARKETING</span>{" "}
                <span className="blog-title-highlight">INSIGHTS</span>
                <span className="d-block text-dark-title">FOR BUSINESS GROWTH</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="blog-hero-subtitle"
              >
                Data-backed SEO blueprints, high-ROAS advertising frameworks, conversion psychology, and AI automation insights engineered by BrandSetu Digital.
              </motion.p>

              {/* COMMAND-CENTER SEARCH BAR */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="blog-search-box mb-3"
              >
                <div className="blog-search-inner">
                  <Search size={18} className="blog-search-icon" />
                  <input
                    type="text"
                    placeholder="Search articles, tactics, keywords or tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="blog-search-input"
                    aria-label="Search articles"
                  />
                  <div className="blog-search-actions">
                    {searchQuery && (
                      <>
                        <span className="blog-search-count-pill">
                          {filteredBlogs.length} {filteredBlogs.length === 1 ? "result" : "results"}
                        </span>
                        <button
                          type="button"
                          className="blog-search-clear"
                          onClick={() => setSearchQuery("")}
                          title="Clear search"
                          aria-label="Clear search"
                        >
                          <X size={14} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* TRENDING SEARCHES BAR */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="blog-trending-searches justify-content-start"
              >
                <span className="trending-label">
                  <Flame size={14} /> Trending:
                </span>
                {trendingSearches.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    className="trending-pill"
                    onClick={() => handleTrendingClick(topic)}
                  >
                    {topic}
                  </button>
                ))}
              </motion.div>

              {/* STATS ROW (Strictly Single Horizontal Line) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="blog-stats-grid"
                style={{ display: "flex", flexWrap: "nowrap" }}
              >
                {heroStats.map((stat, idx) => (
                  <div key={idx} className="blog-stat-item">
                    <span className="blog-stat-number">{stat.value}</span>
                    <span className="blog-stat-desc">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </Col>

            {/* RIGHT COLUMN - INTERACTIVE STRATEGY CONSOLE HUD (CARD-FREE MODERN HERO) */}
            <Col lg={5} className="d-none d-lg-block">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="strategy-console-window"
              >
                {/* Titlebar */}
                <div className="console-titlebar">
                  <div className="console-dots">
                    <span className="console-dot dot-red"></span>
                    <span className="console-dot dot-yellow"></span>
                    <span className="console-dot dot-green"></span>
                  </div>
                  <span className="console-filename">
                    {consoleStrategies[activeConsoleTab].filename}
                  </span>
                  <span className="console-live-badge">
                    <Activity size={10} className="me-1" /> LIVE HUD
                  </span>
                </div>

                {/* Tabs */}
                <div className="console-tabs-strip">
                  <button
                    type="button"
                    className={`console-tab-btn ${activeConsoleTab === "seo" ? "active" : ""}`}
                    onClick={() => setActiveConsoleTab("seo")}
                  >
                    <Search size={12} /> SEO_Growth
                  </button>
                  <button
                    type="button"
                    className={`console-tab-btn ${activeConsoleTab === "ads" ? "active" : ""}`}
                    onClick={() => setActiveConsoleTab("ads")}
                  >
                    <Target size={12} /> Paid_ROAS
                  </button>
                  <button
                    type="button"
                    className={`console-tab-btn ${activeConsoleTab === "ai" ? "active" : ""}`}
                    onClick={() => setActiveConsoleTab("ai")}
                  >
                    <Zap size={12} /> AI_Workflows
                  </button>
                </div>

                {/* Content Box */}
                <div className="console-content-box">
                  <div className="console-cmd-line">
                    <Terminal size={14} />
                    <span>&gt; {consoleStrategies[activeConsoleTab].command}</span>
                    <span className="console-cursor"></span>
                  </div>

                  <div className="console-logs-list">
                    {consoleStrategies[activeConsoleTab].logs.map((log, idx) => (
                      <div key={idx} className="console-log-item">
                        <span className="console-log-tag">{log.tag}</span>
                        <span>{log.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* SVG Growth Sparkline Chart */}
                  <div className="console-chart-wrapper">
                    <div className="chart-header">
                      <span className="chart-title">Real-Time Performance Trajectory</span>
                      <span className="chart-metric-peak">
                        {consoleStrategies[activeConsoleTab].metric}
                      </span>
                    </div>
                    <svg
                      viewBox="0 0 400 44"
                      className="console-svg-chart"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ffd000" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#ffd000" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d={consoleStrategies[activeConsoleTab].sparkArea}
                        fill="url(#chartGrad)"
                      />
                      <path
                        d={consoleStrategies[activeConsoleTab].sparkline}
                        fill="none"
                        stroke="#ffd000"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <div className="console-action-cta">
                    <span className="console-cta-hint">
                      Verified Agency Playbook
                    </span>
                    <Link
                      to={consoleStrategies[activeConsoleTab].link}
                      className="console-execute-btn"
                    >
                      {consoleStrategies[activeConsoleTab].actionText} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>

          {/* LIVE CONTINUOUS MARQUEE TICKER STRIP */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="blog-live-ticker-strip"
          >
            <div className="ticker-label-badge">
              <Sparkles size={12} /> INSIGHT FEED
            </div>
            <div className="ticker-text-marquee-wrap">
              <div className="ticker-text-marquee">
                ⚡ 2026 Google SGE &amp; AI Overviews Dominance Framework • Meta Advantage+ 3:2:2 Creative Testing Matrix • WhatsApp Cloud API CRM 5-Second Response Workflows • Sub-Second React Core Web Vitals • Hyper-Local Google Maps 3-Pack Rankings • 100% Free Strategy Guides by BrandSetu Digital •&nbsp;&nbsp;&nbsp;&nbsp;⚡ 2026 Google SGE &amp; AI Overviews Dominance Framework • Meta Advantage+ 3:2:2 Creative Testing Matrix • WhatsApp Cloud API CRM 5-Second Response Workflows • Sub-Second React Core Web Vitals
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* DEDICATED SERVICE HUBS & CATEGORIES CONTAINER */}
      <Container className="position-relative z-2 pt-4">
        {/* DEDICATED SERVICE HUBS STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="service-hubs-wrapper"
        >
          <div className="service-hubs-title-row">
            <div className="service-hubs-divider"></div>
            <span className="text-warning small fw-bold text-uppercase letter-spacing-1">
              Explore Dedicated Service Blogs
            </span>
            <div className="service-hubs-divider"></div>
          </div>
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
            {Object.values(serviceHubsData).map((service) => (
              <Link
                key={service.slug}
                to={`/blog/${service.slug}`}
                className="service-hub-chip"
              >
                {getServiceIcon(service.slug)}
                <span>{service.name}</span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* TOPIC CATEGORY TABS */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="blog-categories-wrap"
        >
          {blogCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`blog-cat-tab ${selectedCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
        {/* FEATURED POST (Shown when looking at "All" without search) */}
        {selectedCategory === "All" && !searchQuery && featuredBlog && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to={`/blog/${featuredBlog.serviceSlug || 'seo'}/${featuredBlog.slug}`}
              className="text-decoration-none"
            >
              <div className="featured-blog-card">
                <Row className="g-0 align-items-center">
                  <Col lg={6}>
                    <div className="featured-img-wrap">
                      <img
                        src={featuredBlog.image}
                        alt={featuredBlog.title}
                        className="featured-img"
                        loading="eager"
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="featured-content">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span className="featured-pill-tag">
                          Featured Guide
                        </span>
                        <span className="text-light-50 small">
                          • {featuredBlog.category}
                        </span>
                      </div>

                      <h2 className="featured-title">{featuredBlog.title}</h2>
                      <p className="featured-excerpt">
                        {featuredBlog.excerpt}
                      </p>

                      <div className="blog-meta-row">
                        <div className="blog-author-info">
                          <img
                            src={featuredBlog.author.avatar}
                            alt={featuredBlog.author.name}
                            className="blog-author-img"
                          />
                          <div>
                            <div className="blog-author-name">
                              {featuredBlog.author.name}
                            </div>
                            <div className="blog-author-role">
                              {featuredBlog.publishDate}
                            </div>
                          </div>
                        </div>

                        <span className="blog-read-time">
                          <Clock size={14} />
                          {featuredBlog.readTime}
                        </span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Link>
          </motion.div>
        )}

        {/* ARTICLES GRID */}
        {filteredBlogs.length > 0 ? (
          <>
            <Row className="g-4">
              <AnimatePresence>
                {filteredBlogs.slice(0, visibleCount).map((blog, idx) => (
                  <Col key={blog.id} lg={4} md={6}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: (idx % 9) * 0.06 }}
                      className="h-100"
                    >
                      <Link
                        to={`/blog/${blog.serviceSlug || 'seo'}/${blog.slug}`}
                        className="text-decoration-none d-block h-100"
                      >
                        <article className="blog-grid-card">
                          <div className="card-img-container">
                            <img
                              src={blog.image}
                              alt={blog.title}
                              className="card-post-img"
                              loading="lazy"
                            />
                          </div>

                          <div className="card-content-area">
                            <h3 className="card-post-title">{blog.title}</h3>
                            <p className="card-post-excerpt">{blog.excerpt}</p>

                            <div className="card-footer-meta">
                              <span className="blog-read-time">
                                <Clock size={13} /> {blog.readTime}
                              </span>
                              <span className="card-read-link">
                                Read Article <ArrowRight size={14} />
                              </span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    </motion.div>
                  </Col>
                ))}
              </AnimatePresence>
            </Row>

            {/* LOAD MORE BUTTON */}
            {visibleCount < filteredBlogs.length && (
              <div className="text-center mt-5">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 9)}
                  className="btn btn-warning rounded-pill px-5 py-3 fw-bold text-dark fs-6 d-inline-flex align-items-center gap-2 shadow"
                >
                  Load More Articles ({filteredBlogs.length - visibleCount} Remaining)
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-5 my-4 text-white">
            <BookOpen size={48} className="text-warning mb-3 opacity-75" />
            <h3 className="fw-bold mb-2">No Articles Found</h3>
            <p className="text-light opacity-75 mb-4">
              We couldn't find any articles matching "{searchQuery}". Try selecting a
              different category or clearing your search.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="btn btn-outline-warning rounded-pill px-4 py-2 fw-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* NEWSLETTER / INSIGHTS CTA BOX */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="blog-newsletter-section"
        >
          <div className="newsletter-badge">
            <Sparkles size={13} />
            <span>GROWTH DISPATCH</span>
          </div>
          <h2 className="newsletter-title">
            Get High-ROI Growth Strategies in Your Inbox
          </h2>
          <p className="newsletter-subtitle">
            Join 3,500+ founders and digital marketers receiving our weekly breakdowns of
            what's genuinely working in SEO, Meta Ads, and AI automation.
          </p>

          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              required
              placeholder="Enter your work email address..."
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-btn">
              <span>Subscribe Free</span>
              <Send size={15} />
            </button>
          </form>

          {subscribed && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-warning fw-semibold small d-inline-flex align-items-center gap-1"
            >
              <CheckCircle2 size={16} /> Thank you! You've joined the BrandSetu Growth Dispatch.
            </motion.div>
          )}
        </motion.div>
      </Container>
    </div>
  );
}
