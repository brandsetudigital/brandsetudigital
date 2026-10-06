import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";
import RichTextEditor from "../../components/admin/RichTextEditor";
import ImageUploadField from "../../components/admin/ImageUploadField";
import {
  ArrowLeft,
  Save,
  Send,
  Eye,
  Globe,
  HelpCircle,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Layers,
  AlertCircle,
  X,
} from "lucide-react";

const PRESET_CATEGORIES = [
  "SEO",
  "Google Ads",
  "Social Media Marketing",
  "Website Development",
  "Branding",
  "Digital Marketing",
  "Business Growth",
  "Automation",
  "Performance Marketing",
  "Content Marketing",
  "Product Shoot",
  "WhatsApp Marketing",
];

export default function AdminBlogEditor() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { authFetch, adminUser } = useAuth();

  // Blog Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    serviceSlug: "general",
    category: "SEO",
    excerpt: "",
    content: "",
    featuredImage: "",
    authorName: adminUser?.name || "BrandSetu Team",
    authorRole: "Digital Marketing Strategist",
    authorAvatar: "/assets/brandsetu-avatar.png",
    readingTime: "5 min read",
    status: "draft",
    // SEO fields
    metaTitle: "",
    metaDescription: "",
    focusKeyword: "",
    canonicalUrl: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    // FAQs
    faqs: [],
    tags: "",
    serviceLink: "",
    serviceName: "",
  });

  const [isSlugManual, setIsSlugManual] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPreviewModal, setShowPreviewModal] = useState(
    searchParams.get("preview") === "true"
  );

  // Auto-generate slug from title
  const generateSlug = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Handle title change with auto slug & meta title
  const handleTitleChange = (e) => {
    const title = e.target.value;
    const newSlug = !isSlugManual ? generateSlug(title) : formData.slug;

    setFormData((prev) => ({
      ...prev,
      title,
      slug: newSlug,
      canonicalUrl: `/blog/${newSlug}`,
      metaTitle: prev.metaTitle === prev.title || !prev.metaTitle ? title : prev.metaTitle,
      ogTitle: prev.ogTitle === prev.title || !prev.ogTitle ? title : prev.ogTitle,
    }));
  };

  // Handle excerpt change with auto meta description
  const handleExcerptChange = (e) => {
    const excerpt = e.target.value;
    setFormData((prev) => ({
      ...prev,
      excerpt,
      metaDescription:
        prev.metaDescription === prev.excerpt || !prev.metaDescription
          ? excerpt
          : prev.metaDescription,
      ogDescription:
        prev.ogDescription === prev.excerpt || !prev.ogDescription
          ? excerpt
          : prev.ogDescription,
    }));
  };

  // Fetch blog data if in edit mode
  useEffect(() => {
    if (!isEditMode) return;

    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        const res = await authFetch(`${API_BASE_URL}/api/blogs/admin/detail/${id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.blog) {
            const b = data.blog;
            setFormData({
              title: b.title || "",
              slug: b.slug || "",
              serviceSlug: b.serviceSlug || "general",
              category: b.category || "SEO",
              excerpt: b.excerpt || "",
              content: b.content || "",
              featuredImage: b.featuredImage || "",
              authorName: b.author?.name || "BrandSetu Team",
              authorRole: b.author?.role || "Digital Marketing Strategist",
              authorAvatar:
                b.author?.avatar && !b.author.avatar.includes("Founder-brandsetu")
                  ? b.author.avatar
                  : "/assets/brandsetu-avatar.png",
              readingTime: b.readingTime || "5 min read",
              status: b.status || "draft",
              metaTitle: b.metaTitle || "",
              metaDescription: b.metaDescription || "",
              focusKeyword: b.focusKeyword || "",
              canonicalUrl: b.canonicalUrl || `/blog/${b.slug}`,
              ogTitle: b.ogTitle || "",
              ogDescription: b.ogDescription || "",
              ogImage: b.ogImage || "",
              faqs: b.faqs || [],
              tags: Array.isArray(b.tags) ? b.tags.join(", ") : b.tags || "",
              serviceLink: b.serviceLink || "",
              serviceName: b.serviceName || "",
            });
            setIsSlugManual(true);
          }
        } else {
          setErrorMessage("Failed to load article from database.");
        }
      } catch (err) {
        console.error(err);
        setErrorMessage("Network error fetching article details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id, isEditMode, authFetch]);

  // FAQ management
  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  };

  const updateFaq = (index, field, value) => {
    const updated = [...formData.faqs];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, faqs: updated }));
  };

  const removeFaq = (index) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  // Submit Handler
  const handleSubmit = async (targetStatus) => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!formData.title.trim()) {
      setErrorMessage("Please enter a blog title.");
      return;
    }
    if (!formData.category.trim()) {
      setErrorMessage("Please select or specify a category.");
      return;
    }
    if (!formData.content.trim()) {
      setErrorMessage("Blog content cannot be empty.");
      return;
    }

    setIsSaving(true);

    const payload = {
      title: formData.title.trim(),
      slug: formData.slug.trim() || generateSlug(formData.title),
      serviceSlug: formData.serviceSlug.trim() || "general",
      category: formData.category.trim(),
      excerpt: formData.excerpt.trim() || formData.title.trim(),
      content: formData.content,
      featuredImage: formData.featuredImage.trim() || "/assets/SEO.jpg",
      author: {
        name: formData.authorName.trim(),
        role: formData.authorRole.trim(),
        avatar: formData.authorAvatar.trim() || "/assets/brandsetu-avatar.png",
      },
      status: targetStatus,
      readingTime: formData.readingTime.trim(),
      metaTitle: formData.metaTitle.trim() || formData.title.trim(),
      metaDescription: formData.metaDescription.trim() || formData.excerpt.trim(),
      focusKeyword: formData.focusKeyword.trim(),
      canonicalUrl: formData.canonicalUrl.trim() || `/blog/${formData.slug}`,
      ogTitle: formData.ogTitle.trim() || formData.metaTitle.trim() || formData.title.trim(),
      ogDescription: formData.ogDescription.trim() || formData.metaDescription.trim() || formData.excerpt.trim(),
      ogImage: formData.ogImage.trim() || formData.featuredImage.trim(),
      faqs: formData.faqs.filter((f) => f.question.trim() && f.answer.trim()),
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      serviceLink: formData.serviceLink.trim(),
      serviceName: formData.serviceName.trim(),
    };

    try {
      const url = isEditMode
        ? `${API_BASE_URL}/api/blogs/admin/${id}`
        : `${API_BASE_URL}/api/blogs/admin`;

      const method = isEditMode ? "PUT" : "POST";

      const res = await authFetch(url, {
        method,
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMessage(
          targetStatus === "published"
            ? "Blog published successfully!"
            : "Draft saved successfully!"
        );
        setTimeout(() => {
          navigate("/admin/blogs");
        }, 1200);
      } else {
        setErrorMessage(data.message || "Failed to save blog.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Network error occurred while saving article.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-5 text-light opacity-60">
        <div className="spinner-border text-warning mb-2" role="status" />
        <div>Loading article editor...</div>
      </div>
    );
  }

  return (
    <div className="pb-5">
      {/* Top Action Bar */}
      <div
        className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4 sticky-top py-2"
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          zIndex: 1010,
          margin: "-1rem -1rem 1.5rem -1rem",
          padding: "0.75rem 1rem",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.02)",
        }}
      >
        <div className="d-flex align-items-center gap-2">
          <Link
            to="/admin/blogs"
            className="btn btn-sm p-2 rounded-3"
            style={{ backgroundColor: "#ffffff", border: "1px solid #cbd5e1", color: "#334155" }}
            title="Back to blogs"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="h4 fw-bold mb-0" style={{ color: "#0f172a" }}>
              {isEditMode ? "Edit Blog Article" : "Create New Blog"}
            </h1>
            <span className="small" style={{ color: "#64748b" }}>
              Status: <strong className="text-uppercase" style={{ color: "#b45309" }}>{formData.status}</strong>
            </span>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn btn-sm d-flex align-items-center gap-2 rounded-3 px-3 py-2"
            style={{ backgroundColor: "#ffffff", border: "1px solid #cbd5e1", color: "#334155" }}
            onClick={() => setShowPreviewModal(true)}
            disabled={isSaving}
          >
            <Eye size={15} />
            <span>Preview</span>
          </button>

          <button
            type="button"
            className="btn btn-sm fw-semibold d-flex align-items-center gap-2 rounded-3 px-3 py-2"
            style={{ backgroundColor: "#fef3c7", border: "1px solid #fde68a", color: "#92400e" }}
            onClick={() => handleSubmit("draft")}
            disabled={isSaving}
          >
            <Save size={15} />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            className="btn btn-warning fw-bold text-dark d-flex align-items-center gap-2 rounded-3 px-3.5 py-2 small shadow-sm"
            onClick={() => handleSubmit("published")}
            disabled={isSaving}
          >
            <Send size={15} />
            <span>{isSaving ? "Publishing..." : "Publish Blog"}</span>
          </button>
        </div>
      </div>

      {/* Notification Alerts */}
      {errorMessage && (
        <div
          className="alert alert-danger d-flex align-items-center gap-2 border-0 rounded-3 p-3 mb-4"
          style={{ backgroundColor: "#fee2e2", color: "#b91c1c", border: "1px solid #fecaca" }}
        >
          <AlertCircle size={18} className="flex-shrink-0" />
          <div className="small fw-medium">{errorMessage}</div>
        </div>
      )}

      {successMessage && (
        <div
          className="alert alert-success d-flex align-items-center gap-2 border-0 rounded-3 p-3 mb-4"
          style={{ backgroundColor: "#dcfce7", color: "#15803d", border: "1px solid #bbf7d0" }}
        >
          <CheckCircle2 size={18} className="flex-shrink-0" />
          <div className="small fw-medium">{successMessage} Redirecting to blog list...</div>
        </div>
      )}

      <div className="row g-4">
        {/* LEFT COLUMN: MAIN CONTENT & DETAILS */}
        <div className="col-12 col-lg-8">
          {/* Main Card */}
          <div
            className="p-4 rounded-4 mb-4"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            }}
          >
            {/* Title */}
            <div className="mb-3">
              <label className="form-label small fw-bold" style={{ color: "#334155" }}>
                Article Title <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="e.g. The Complete SEO Guide for Small Businesses in India"
                style={{
                  backgroundColor: "#f8fafc",
                  borderColor: "#cbd5e1",
                  color: "#0f172a",
                  fontSize: "1.1rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "10px",
                }}
              />
            </div>

            {/* Slug */}
            <div className="mb-3">
              <div className="d-flex align-items-center justify-content-between mb-1">
                <label className="form-label small fw-bold mb-0" style={{ color: "#334155" }}>
                  URL Slug <span className="text-danger">*</span>
                </label>
                <div className="form-check form-switch small">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="manualSlugSwitch"
                    checked={isSlugManual}
                    onChange={(e) => setIsSlugManual(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="manualSlugSwitch" style={{ fontSize: "0.75rem", color: "#64748b" }}>
                    Manual Edit
                  </label>
                </div>
              </div>
              <div className="input-group">
                <span
                  className="input-group-text small"
                  style={{ backgroundColor: "#f8fafc", borderColor: "#cbd5e1", color: "#64748b" }}
                >
                  /blog/
                </span>
                <input
                  type="text"
                  className="form-control"
                  value={formData.slug}
                  disabled={!isSlugManual}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slug: generateSlug(e.target.value),
                      canonicalUrl: `/blog/${generateSlug(e.target.value)}`,
                    })
                  }
                  placeholder="article-slug"
                  style={{
                    backgroundColor: isSlugManual ? "#ffffff" : "#f1f5f9",
                    borderColor: "#cbd5e1",
                    color: "#0f172a",
                  }}
                />
              </div>
            </div>

            {/* Excerpt */}
            <div className="mb-4">
              <label className="form-label small fw-bold" style={{ color: "#334155" }}>
                Article Excerpt / Summary <span className="text-danger">*</span>
              </label>
              <textarea
                rows={3}
                className="form-control"
                value={formData.excerpt}
                onChange={handleExcerptChange}
                placeholder="A compelling 2-3 sentence overview that appears in blog listings and search engine summaries..."
                style={{
                  backgroundColor: "#f8fafc",
                  borderColor: "#cbd5e1",
                  color: "#0f172a",
                  borderRadius: "10px",
                  fontSize: "0.92rem",
                }}
              />
            </div>

            {/* Content Rich-Text Editor */}
            <div className="mb-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <label className="form-label small fw-bold mb-0" style={{ color: "#334155" }}>
                  Article Body Content <span className="text-danger">*</span>
                </label>
                <span className="small fw-semibold" style={{ fontSize: "0.75rem", color: "#b45309" }}>
                  Semantic HTML • Primary H1 is Page Title
                </span>
              </div>
              <RichTextEditor
                value={formData.content}
                onChange={(html) => setFormData((prev) => ({ ...prev, content: html }))}
                placeholder="Write your article sections, insights, lists, blockquotes, and internal links..."
              />
            </div>
          </div>

          {/* FAQs Accordion Builder */}
          <div
            className="p-4 rounded-4 mb-4"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom" style={{ borderColor: "#e2e8f0" }}>
              <div className="d-flex align-items-center gap-2">
                <HelpCircle size={18} className="text-warning" />
                <h3 className="h6 fw-bold mb-0" style={{ color: "#0f172a" }}>Frequently Asked Questions (FAQs)</h3>
              </div>
              <button
                type="button"
                onClick={addFaq}
                className="btn btn-sm btn-outline-warning rounded-pill px-3 py-1 d-flex align-items-center gap-1.5"
                style={{ fontSize: "0.8rem", color: "#b45309", borderColor: "#fde68a" }}
              >
                <Plus size={14} /> Add FAQ
              </button>
            </div>

            <p className="small mb-3" style={{ color: "#64748b" }}>
              FAQs enhance user engagement and automatically output Google FAQPage structured schema!
            </p>

            {formData.faqs.length === 0 ? (
              <div className="text-center py-3 small" style={{ color: "#64748b" }}>
                No FAQs added yet. Click "+ Add FAQ" above to add common client questions.
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {formData.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-3 position-relative"
                    style={{
                      backgroundColor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => removeFaq(idx)}
                      className="btn btn-link text-danger p-1 position-absolute top-0 end-0 mt-2 me-2"
                      title="Remove FAQ"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="mb-2 pe-4">
                      <label className="form-label small mb-1 fw-semibold" style={{ color: "#334155" }}>
                        Question #{idx + 1}
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={faq.question}
                        onChange={(e) => updateFaq(idx, "question", e.target.value)}
                        placeholder="e.g. How long does it realistically take to see SEO results?"
                        style={{
                          backgroundColor: "#ffffff",
                          borderColor: "#cbd5e1",
                          color: "#0f172a",
                        }}
                      />
                    </div>

                    <div>
                      <label className="form-label small mb-1 fw-semibold" style={{ color: "#334155" }}>Answer</label>
                      <textarea
                        rows={2}
                        className="form-control form-control-sm"
                        value={faq.answer}
                        onChange={(e) => updateFaq(idx, "answer", e.target.value)}
                        placeholder="Detailed, direct answer explaining the timeline or process..."
                        style={{
                          backgroundColor: "#ffffff",
                          borderColor: "#cbd5e1",
                          color: "#0f172a",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: TAXONOMY, MEDIA, SEO METADATA */}
        <div className="col-12 col-lg-4">
          {/* Publishing & Category Settings */}
          <div
            className="p-4 rounded-4 mb-4"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            }}
          >
            <h3 className="h6 fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: "#0f172a" }}>
              <Layers size={16} className="text-warning" />
              Categorization & Metadata
            </h3>

            {/* Category */}
            <div className="mb-3">
              <label className="form-label small fw-semibold" style={{ color: "#334155" }}>
                Category <span className="text-danger">*</span>
              </label>
              <select
                className="form-select form-select-sm"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{
                  backgroundColor: "#f8fafc",
                  borderColor: "#cbd5e1",
                  color: "#0f172a",
                }}
              >
                {PRESET_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} style={{ backgroundColor: "#ffffff", color: "#0f172a" }}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Reading Time */}
            <div className="mb-3">
              <label className="form-label small fw-semibold" style={{ color: "#334155" }}>
                Estimated Reading Time
              </label>
              <div className="input-group input-group-sm">
                <span
                  className="input-group-text"
                  style={{ backgroundColor: "#f8fafc", borderColor: "#cbd5e1", color: "#64748b" }}
                >
                  <Clock size={14} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  value={formData.readingTime}
                  onChange={(e) => setFormData({ ...formData, readingTime: e.target.value })}
                  placeholder="e.g. 6 min read"
                  style={{
                    backgroundColor: "#f8fafc",
                    borderColor: "#cbd5e1",
                    color: "#0f172a",
                  }}
                />
              </div>
            </div>

            {/* Tags */}
            <div className="mb-3">
              <label className="form-label small fw-semibold" style={{ color: "#334155" }}>
                Tags (comma separated)
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="SEO, Google Ads, ROAS, Indore"
                style={{
                  backgroundColor: "#f8fafc",
                  borderColor: "#cbd5e1",
                  color: "#0f172a",
                }}
              />
            </div>

            {/* Featured Image Upload */}
            <ImageUploadField
              label="Featured Article Image"
              value={formData.featuredImage}
              onChange={(url) => setFormData((prev) => ({ ...prev, featuredImage: url }))}
              helperText="Upload an engaging header image (WEBP, PNG, JPG up to 5MB)"
            />

            {/* Related Service */}
            <div className="mb-0">
              <label className="form-label small fw-semibold" style={{ color: "#334155" }}>
                Related Service Link (CTA)
              </label>
              <input
                type="text"
                className="form-control form-control-sm mb-1"
                value={formData.serviceLink}
                onChange={(e) => setFormData({ ...formData, serviceLink: e.target.value })}
                placeholder="/services/seo-services-indore"
                style={{
                  backgroundColor: "#f8fafc",
                  borderColor: "#cbd5e1",
                  color: "#0f172a",
                }}
              />
              <input
                type="text"
                className="form-control form-control-sm"
                value={formData.serviceName}
                onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                placeholder="Service Display Name (e.g. SEO Services)"
                style={{
                  backgroundColor: "#f8fafc",
                  borderColor: "#cbd5e1",
                  color: "#0f172a",
                }}
              />
            </div>
          </div>

          {/* Author Details */}
          <div
            className="p-4 rounded-4 mb-4"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            }}
          >
            <h3 className="h6 fw-bold mb-3" style={{ color: "#0f172a" }}>Author Profile</h3>
            <div className="mb-2">
              <label className="form-label small fw-semibold" style={{ color: "#334155" }}>Author Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                style={{
                  backgroundColor: "#f8fafc",
                  borderColor: "#cbd5e1",
                  color: "#0f172a",
                }}
              />
            </div>
            <div className="mb-0">
              <label className="form-label small fw-semibold" style={{ color: "#334155" }}>Author Role</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={formData.authorRole}
                onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                style={{
                  backgroundColor: "#f8fafc",
                  borderColor: "#cbd5e1",
                  color: "#0f172a",
                }}
              />
            </div>
          </div>

          {/* SEO & SERP Preview Card */}
          <div
            className="p-4 rounded-4"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
            }}
          >
            <h3 className="h6 fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: "#0f172a" }}>
              <Globe size={16} className="text-info" />
              SEO & Social Metadata
            </h3>

            {/* Focus Keyword */}
            <div className="mb-3">
              <label className="form-label small fw-semibold" style={{ color: "#334155" }}>
                Focus Keyword
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={formData.focusKeyword}
                onChange={(e) => setFormData({ ...formData, focusKeyword: e.target.value })}
                placeholder="e.g. SEO services Indore"
                style={{
                  backgroundColor: "#f8fafc",
                  borderColor: "#cbd5e1",
                  color: "#0f172a",
                }}
              />
            </div>

            {/* Meta Title */}
            <div className="mb-3">
              <label className="form-label small fw-semibold" style={{ color: "#334155" }}>
                Meta Title
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                placeholder="Defaults to Title | BrandSetu Digital"
                style={{
                  backgroundColor: "#f8fafc",
                  borderColor: "#cbd5e1",
                  color: "#0f172a",
                }}
              />
            </div>

            {/* Meta Description */}
            <div className="mb-3">
              <label className="form-label small fw-semibold" style={{ color: "#334155" }}>
                Meta Description
              </label>
              <textarea
                rows={3}
                className="form-control form-control-sm"
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                placeholder="Defaults to Excerpt"
                style={{
                  backgroundColor: "#f8fafc",
                  borderColor: "#cbd5e1",
                  color: "#0f172a",
                }}
              />
            </div>

            {/* Google SERP Preview */}
            <div className="mt-3 pt-3 border-top" style={{ borderColor: "#e2e8f0" }}>
              <span className="small fw-semibold d-block mb-2" style={{ color: "#64748b" }}>
                Google Search Result Preview:
              </span>
              <div
                className="p-3 rounded-3"
                style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}
              >
                <div className="small mb-0.5" style={{ fontSize: "0.75rem", color: "#64748b" }}>
                  https://brandsetudigital.com/blog/{formData.slug || "article-slug"}
                </div>
                <div
                  className="fw-semibold text-truncate"
                  style={{ color: "#1d4ed8", fontSize: "0.95rem" }}
                >
                  {formData.metaTitle || formData.title || "Blog Post Title"} | BrandSetu Digital
                </div>
                <div
                  className="small mt-1"
                  style={{
                    fontSize: "0.8rem",
                    color: "#475569",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {formData.metaDescription || formData.excerpt || "Enter an excerpt or meta description to see how your article snippet will appear on Google."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PREVIEW MODAL */}
      {showPreviewModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(6px)",
            zIndex: 1060,
          }}
        >
          <div
            className="rounded-4 overflow-hidden d-flex flex-column w-100 shadow-2xl"
            style={{
              maxWidth: "900px",
              maxHeight: "90vh",
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
            }}
          >
            {/* Modal Header */}
            <div
              className="p-3 px-4 d-flex align-items-center justify-content-between border-bottom"
              style={{ borderColor: "#e2e8f0" }}
            >
              <div className="d-flex align-items-center gap-2">
                <Eye size={18} className="text-warning" />
                <h4 className="h6 fw-bold mb-0" style={{ color: "#0f172a" }}>BrandSetu Live Article Preview</h4>
                <span className="badge bg-warning text-dark rounded-pill px-2 py-0.5 small fw-bold">
                  {formData.status.toUpperCase()}
                </span>
              </div>
              <button
                type="button"
                className="btn btn-link p-1"
                style={{ color: "#64748b" }}
                onClick={() => setShowPreviewModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 p-md-5 overflow-y-auto" style={{ color: "#0f172a" }}>
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="badge bg-warning text-dark fw-bold rounded-pill px-3 py-1">
                  {formData.category}
                </span>
                <span className="small d-flex align-items-center gap-1" style={{ color: "#64748b" }}>
                  <Clock size={13} /> {formData.readingTime}
                </span>
              </div>

              <h1 className="h2 fw-bold mb-3" style={{ color: "#0f172a" }}>{formData.title || "Untitled Blog Post"}</h1>

              <div className="d-flex align-items-center gap-2 small mb-4 pb-3 border-bottom" style={{ color: "#64748b", borderColor: "#e2e8f0" }}>
                <span>By {formData.authorName}</span>
                <span>•</span>
                <span>{new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
              </div>

              {formData.featuredImage && (
                <div className="rounded-4 overflow-hidden mb-4 border" style={{ maxHeight: "400px", borderColor: "#e2e8f0" }}>
                  <img
                    src={formData.featuredImage}
                    alt={formData.title}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}

              {formData.excerpt && (
                <p className="lead fw-semibold mb-4" style={{ color: "#b45309" }}>{formData.excerpt}</p>
              )}

              {/* Rendered HTML */}
              <div
                className="rich-preview-body"
                dangerouslySetInnerHTML={{ __html: formData.content || "<p>No content written yet.</p>" }}
              />

              {/* FAQs in Preview */}
              {formData.faqs.length > 0 && (
                <div className="mt-5 p-4 rounded-4" style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                  <h3 className="h5 fw-bold mb-3" style={{ color: "#b45309" }}>Frequently Asked Questions</h3>
                  <div className="d-flex flex-column gap-3">
                    {formData.faqs.map((faq, i) => (
                      <div key={i} className="border-bottom pb-2" style={{ borderColor: "#e2e8f0" }}>
                        <div className="fw-bold small mb-1" style={{ color: "#0f172a" }}>{faq.question}</div>
                        <div className="small" style={{ color: "#475569" }}>{faq.answer}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div
              className="p-3 px-4 d-flex justify-content-end gap-2 border-top"
              style={{ borderColor: "#e2e8f0" }}
            >
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill px-4"
                style={{ borderColor: "#cbd5e1", color: "#334155" }}
                onClick={() => setShowPreviewModal(false)}
              >
                Close Preview
              </button>
              <button
                type="button"
                className="btn btn-warning fw-bold text-dark rounded-pill px-4"
                onClick={() => {
                  setShowPreviewModal(false);
                  handleSubmit("published");
                }}
              >
                Publish Now
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .rich-preview-body h2 {
          color: #b45309;
          font-weight: 700;
          font-size: 1.4rem;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .rich-preview-body h3 {
          color: #0f172a;
          font-weight: 600;
          font-size: 1.2rem;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .rich-preview-body p {
          color: #334155;
          line-height: 1.8;
          margin-bottom: 1rem;
        }
        .rich-preview-body ul, .rich-preview-body ol {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
          color: #334155;
        }
        .rich-preview-body blockquote {
          border-left: 4px solid #f59e0b;
          padding: 0.75rem 1rem;
          background: #fef3c7;
          font-style: italic;
          color: #92400e;
          border-radius: 0 8px 8px 0;
          margin: 1.25rem 0;
        }
        .rich-preview-body a {
          color: #2563eb;
        }
      `}</style>
    </div>
  );
}
