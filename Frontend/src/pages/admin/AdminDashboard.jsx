import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";
import {
  FileText,
  CheckCircle,
  FileEdit,
  Users,
  PlusCircle,
  ArrowRight,
  RefreshCw,
  ExternalLink,
  Clock,
  Mail,
  Phone,
  FolderOpen,
  Briefcase,
  Sparkles,
  MapPin,
} from "lucide-react";

export default function AdminDashboard() {
  const { authFetch, adminUser } = useAuth();
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    totalLeads: 0,
    totalApplications: 0,
    totalInfluencers: 0,
  });
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [recentLeads, setRecentLeads] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [recentInfluencers, setRecentInfluencers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await authFetch(`${API_BASE_URL}/api/admin/dashboard/stats`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setStats(data.stats || {});
          setRecentBlogs(data.recentBlogs || []);
          setRecentLeads(data.recentLeads || []);
          setRecentApplications(data.recentApplications || []);
          setRecentInfluencers(data.recentInfluencers || []);
        }
      } else {
        throw new Error("Failed to load dashboard statistics");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the backend server. Make sure the server is running.");
    } finally {
      setIsLoading(false);
    }
  }, [authFetch]);

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "Qualified":
      case "Hired":
      case "Approved":
        return {
          backgroundColor: "#dcfce7",
          color: "#15803d",
          border: "1px solid #86efac",
        };
      case "Contacted":
      case "Reviewed":
        return {
          backgroundColor: "#e0f2fe",
          color: "#0369a1",
          border: "1px solid #7dd3fc",
        };
      case "Shortlisted":
      case "In Talks":
        return {
          backgroundColor: "#e0e7ff",
          color: "#4338ca",
          border: "1px solid #a5b4fc",
        };
      case "Closed":
        return {
          backgroundColor: "#f1f5f9",
          color: "#475569",
          border: "1px solid #cbd5e1",
        };
      case "Rejected":
      case "Declined":
        return {
          backgroundColor: "#fee2e2",
          color: "#b91c1c",
          border: "1px solid #fca5a5",
        };
      case "New":
      default:
        return {
          backgroundColor: "#fef9c3",
          color: "#a16207",
          border: "1px solid #fde047",
        };
    }
  };

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const statCards = [
    {
      title: "Total Blogs",
      value: stats.totalBlogs,
      icon: FileText,
      color: "#b45309",
      bg: "#fef3c7",
      border: "#fde68a",
      link: "/admin/blogs",
    },
    {
      title: "Published Blogs",
      value: stats.publishedBlogs,
      icon: CheckCircle,
      color: "#15803d",
      bg: "#dcfce7",
      border: "#bbf7d0",
      link: "/admin/blogs?status=published",
    },
    {
      title: "Total Leads",
      value: stats.totalLeads,
      icon: Users,
      color: "#0369a1",
      bg: "#e0f2fe",
      border: "#bae6fd",
      link: "/admin/leads",
    },
    {
      title: "Job Applications",
      value: stats.totalApplications || 0,
      icon: Briefcase,
      color: "#c2410c",
      bg: "#ffedd5",
      border: "#fed7aa",
      link: "/admin/careers",
    },
    {
      title: "Creator Collabs",
      value: stats.totalInfluencers || 0,
      icon: Sparkles,
      color: "#be123c",
      bg: "#ffe4e6",
      border: "#fecdd3",
      link: "/admin/influencers",
    },
    {
      title: "Draft Blogs",
      value: stats.draftBlogs,
      icon: FileEdit,
      color: "#854d0e",
      bg: "#fef9c3",
      border: "#fde047",
      link: "/admin/blogs?status=draft",
    },
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4 pb-1">
        <div>
          <h1 className="h4 h3-md fw-bold mb-1" style={{ color: "#0f172a" }}>
            Welcome back, {adminUser?.name || "Admin"} 👋
          </h1>
          <p className="mb-0 small" style={{ color: "#64748b" }}>
            BrandSetu Digital Operations Console: blogs, inbound leads, job applications, and influencer campaigns.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            onClick={fetchStats}
            disabled={isLoading}
            className="btn btn-sm d-flex align-items-center gap-1.5"
            style={{
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              border: "1px solid #cbd5e1",
              color: "#334155",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            <RefreshCw size={14} className={isLoading ? "spin-animation" : ""} />
            <span>Refresh</span>
          </button>
          <Link
            to="/admin/blogs/new"
            className="btn btn-warning btn-sm fw-bold d-flex align-items-center gap-1.5 text-dark"
            style={{
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(245, 158, 11, 0.25)",
            }}
          >
            <PlusCircle size={15} />
            <span>New Blog</span>
          </Link>
        </div>
      </div>

      {error && (
        <div
          className="alert alert-warning border-0 rounded-3 p-3 mb-4 d-flex align-items-center justify-content-between"
          style={{ backgroundColor: "#fef3c7", color: "#92400e", border: "1px solid #fde68a" }}
        >
          <span>{error}</span>
          <button
            onClick={fetchStats}
            className="btn btn-sm btn-warning text-dark fw-semibold"
          >
            Retry
          </button>
        </div>
      )}

      {/* KPI STAT CARDS (6-CARD GRID) */}
      <div className="row g-3 mb-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="col-6 col-md-4 col-xl-2">
              <Link
                to={card.link}
                className="text-decoration-none d-block h-100"
              >
                <div
                  className="p-3 transition-all h-100 position-relative dashboard-stat-card d-flex flex-column justify-content-between"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                    borderRadius: "14px",
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
                    <span
                      className="fw-bold text-dark"
                      style={{
                        color: "#0f172a",
                        fontSize: "0.85rem",
                        lineHeight: "1.25",
                        minHeight: "2.4rem",
                        display: "flex",
                        alignItems: "center",
                      }}
                      title={card.title}
                    >
                      {card.title}
                    </span>
                    <div
                      className="d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "10px",
                        backgroundColor: card.bg,
                        color: card.color,
                        border: `1px solid ${card.border}`,
                      }}
                    >
                      <Icon size={17} />
                    </div>
                  </div>

                  <div className="d-flex align-items-baseline justify-content-between mt-auto pt-1">
                    <h3 className="fw-bold mb-0" style={{ color: "#0f172a", fontSize: "1.65rem", lineHeight: 1 }}>
                      {isLoading ? (
                        <span className="placeholder col-6"></span>
                      ) : (
                        card.value
                      )}
                    </h3>
                    <span
                      className="small fw-semibold d-inline-flex align-items-center gap-1"
                      style={{ color: card.color, fontSize: "0.75rem" }}
                    >
                      View all <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* RECENT ACTIVITY SECTION */}
      <div className="row g-4 mb-4">
        {/* RECENT BLOGS */}
        <div className="col-12 col-lg-7">
          <div
            className="p-3 p-sm-4 rounded-4 h-100 dashboard-main-card"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)",
              borderRadius: "20px",
            }}
          >
            <div
              className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom"
              style={{ borderColor: "#f1f5f9" }}
            >
              <div className="d-flex align-items-center gap-2">
                <FileText size={18} className="text-warning" />
                <h3 className="h6 fw-bold mb-0" style={{ color: "#0f172a" }}>Recent Blogs</h3>
              </div>
              <Link
                to="/admin/blogs"
                className="small text-decoration-none fw-semibold d-flex align-items-center gap-1"
                style={{ color: "#d97706" }}
              >
                View all blogs <ArrowRight size={13} />
              </Link>
            </div>

            {isLoading ? (
              <div className="text-center py-4 opacity-50 small" style={{ color: "#64748b" }}>
                Loading blogs...
              </div>
            ) : recentBlogs.length === 0 ? (
              <div className="text-center py-5">
                <FolderOpen size={36} className="text-secondary opacity-50 mb-2" />
                <p className="mb-2 small" style={{ color: "#64748b" }}>No blogs found in database.</p>
                <Link
                  to="/admin/blogs/new"
                  className="btn btn-sm btn-outline-warning rounded-pill px-3"
                >
                  Create Your First Blog
                </Link>
              </div>
            ) : (
              <div className="d-flex flex-column gap-2.5">
                {recentBlogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="p-3 rounded-3 transition-all dashboard-item-row"
                    style={{
                      backgroundColor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                    }}
                  >
                    {/* Top Meta Row: Badges on left, Action buttons on right */}
                    <div className="d-flex align-items-center justify-content-between gap-2 mb-2 flex-wrap">
                      <div className="d-flex align-items-center gap-1.5 flex-wrap">
                        {blog.status === "published" ? (
                          <span
                            className="badge rounded-pill px-2 py-0.5 fw-semibold"
                            style={{
                              fontSize: "0.7rem",
                              backgroundColor: "#dcfce7",
                              color: "#15803d",
                              border: "1px solid #86efac",
                            }}
                          >
                            Published
                          </span>
                        ) : blog.status === "draft" ? (
                          <span
                            className="badge rounded-pill px-2 py-0.5 fw-semibold"
                            style={{
                              fontSize: "0.7rem",
                              backgroundColor: "#ffedd5",
                              color: "#c2410c",
                              border: "1px solid #fdba74",
                            }}
                          >
                            Draft
                          </span>
                        ) : (
                          <span
                            className="badge rounded-pill px-2 py-0.5 fw-semibold"
                            style={{
                              fontSize: "0.7rem",
                              backgroundColor: "#f1f5f9",
                              color: "#475569",
                              border: "1px solid #cbd5e1",
                            }}
                          >
                            Unpublished
                          </span>
                        )}

                        <span
                          className="badge rounded-pill px-2 py-0.5 fw-medium text-truncate"
                          style={{
                            fontSize: "0.7rem",
                            maxWidth: "140px",
                            backgroundColor: "#f1f5f9",
                            color: "#334155",
                            border: "1px solid #e2e8f0",
                          }}
                        >
                          {blog.category || "General"}
                        </span>

                        <span
                          className="d-inline-flex align-items-center gap-1"
                          style={{ fontSize: "0.72rem", color: "#64748b" }}
                        >
                          <Clock size={11} />
                          {blog.publishedAt
                            ? new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "Unpublished"}
                        </span>
                      </div>

                      {/* Action buttons on the right */}
                      <div className="d-flex align-items-center gap-1.5 ms-auto">
                        <Link
                          to={`/admin/blogs/edit/${blog._id}`}
                          className="btn btn-sm py-1 px-2 d-inline-flex align-items-center gap-1"
                          title="Edit blog"
                          style={{
                            fontSize: "0.75rem",
                            borderRadius: "6px",
                            backgroundColor: "#ffffff",
                            border: "1px solid #cbd5e1",
                            color: "#334155",
                          }}
                        >
                          <FileEdit size={12} />
                          <span>Edit</span>
                        </Link>
                        {blog.status === "published" && (
                          <a
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm btn-outline-warning py-1 px-2 text-warning d-inline-flex align-items-center"
                            title="View live blog"
                            style={{ fontSize: "0.75rem", borderRadius: "6px" }}
                          >
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Blog Title */}
                    <div
                      className="fw-semibold text-truncate pt-0.5"
                      title={blog.title}
                      style={{ fontSize: "0.92rem", lineHeight: "1.35", color: "#0f172a" }}
                    >
                      {blog.title}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RECENT LEADS */}
        <div className="col-12 col-lg-5">
          <div
            className="p-3 p-sm-4 rounded-4 h-100 dashboard-main-card"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)",
              borderRadius: "20px",
            }}
          >
            <div
              className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom"
              style={{ borderColor: "#f1f5f9" }}
            >
              <div className="d-flex align-items-center gap-2">
                <Users size={18} style={{ color: "#0284c7" }} />
                <h3 className="h6 fw-bold mb-0" style={{ color: "#0f172a" }}>Recent Inquiries & Leads</h3>
              </div>
              <Link
                to="/admin/leads"
                className="small text-decoration-none fw-semibold d-flex align-items-center gap-1"
                style={{ color: "#0284c7" }}
              >
                View all leads <ArrowRight size={13} />
              </Link>
            </div>

            {isLoading ? (
              <div className="text-center py-4 opacity-50 small" style={{ color: "#64748b" }}>
                Loading leads...
              </div>
            ) : recentLeads.length === 0 ? (
              <div className="text-center py-5">
                <Users size={36} className="text-secondary opacity-50 mb-2" />
                <p className="mb-0 small" style={{ color: "#64748b" }}>No leads submitted yet.</p>
              </div>
            ) : (
              <div className="d-flex flex-column gap-2.5">
                {recentLeads.map((lead) => (
                  <div
                    key={lead._id}
                    className="p-3 rounded-3 transition-all dashboard-item-row"
                    style={{
                      backgroundColor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                    }}
                  >
                    <div className="d-flex align-items-start justify-content-between gap-2 mb-1">
                      <div className="fw-semibold small" style={{ color: "#0f172a" }}>
                        {lead.name || "Anonymous Prospect"}
                      </div>
                      <span
                        className="badge rounded-pill px-2 py-0.5 fw-bold"
                        style={{
                          ...getStatusBadgeStyle(lead.status || "New"),
                          fontSize: "0.68rem",
                        }}
                      >
                        {lead.status || "New"}
                      </span>
                    </div>

                    <div className="small mb-2" style={{ color: "#64748b" }}>
                      Service: <span className="fw-semibold" style={{ color: "#b45309" }}>{lead.service || "General Inquiry"}</span>
                    </div>

                    <div
                      className="d-flex align-items-center justify-content-between small pt-1 border-top flex-wrap gap-2"
                      style={{ fontSize: "0.75rem", borderColor: "#e2e8f0", color: "#64748b" }}
                    >
                      <span className="d-flex align-items-center gap-1 text-truncate" style={{ maxWidth: "160px" }}>
                        <Mail size={12} /> {lead.email || "No email"}
                      </span>
                      {lead.phone && (
                        <span className="d-flex align-items-center gap-1">
                          <Phone size={12} /> {lead.phone}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RECENT APPLICATIONS & INFLUENCER COLLABS ROW */}
      <div className="row g-3 g-lg-4 mb-4">
        {/* RECENT JOB APPLICATIONS */}
        <div className="col-12 col-lg-6">
          <div
            className="p-3 p-sm-4 rounded-4 h-100 dashboard-main-card"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)",
              borderRadius: "20px",
            }}
          >
            <div
              className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom"
              style={{ borderColor: "#f1f5f9" }}
            >
              <div className="d-flex align-items-center gap-2">
                <Briefcase size={18} style={{ color: "#ea580c" }} />
                <h3 className="h6 fw-bold mb-0" style={{ color: "#0f172a" }}>Recent Job Applications</h3>
              </div>
              <Link
                to="/admin/careers"
                className="small text-decoration-none fw-semibold d-flex align-items-center gap-1"
                style={{ color: "#ea580c" }}
              >
                View all applications <ArrowRight size={13} />
              </Link>
            </div>

            {isLoading ? (
              <div className="text-center py-4 opacity-50 small" style={{ color: "#64748b" }}>
                Loading applications...
              </div>
            ) : recentApplications.length === 0 ? (
              <div className="text-center py-5">
                <Briefcase size={36} className="text-secondary opacity-50 mb-2" />
                <p className="mb-0 small" style={{ color: "#64748b" }}>No job applications submitted yet.</p>
              </div>
            ) : (
              <div className="d-flex flex-column gap-2.5">
                {recentApplications.map((app) => (
                  <div
                    key={app._id}
                    className="p-3 rounded-3 transition-all dashboard-item-row"
                    style={{
                      backgroundColor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                    }}
                  >
                    <div className="d-flex align-items-start justify-content-between gap-2 mb-1">
                      <div>
                        <span className="fw-semibold small me-2" style={{ color: "#0f172a" }}>{app.name}</span>
                        <span
                          className="badge rounded-pill px-2 py-0.5 fw-bold"
                          style={{
                            backgroundColor: "#fef3c7",
                            color: "#b45309",
                            border: "1px solid #fde68a",
                            fontSize: "0.7rem",
                          }}
                        >
                          {app.jobTitle || "General"}
                        </span>
                      </div>
                      <span
                        className="badge rounded-pill px-2 py-0.5 fw-bold"
                        style={{
                          ...getStatusBadgeStyle(app.status || "New"),
                          fontSize: "0.68rem",
                        }}
                      >
                        {app.status || "New"}
                      </span>
                    </div>

                    <div
                      className="d-flex align-items-center justify-content-between small pt-1 border-top flex-wrap gap-2"
                      style={{ fontSize: "0.75rem", borderColor: "#e2e8f0", color: "#64748b" }}
                    >
                      <span className="d-flex align-items-center gap-1 text-truncate" style={{ maxWidth: "160px" }}>
                        <Mail size={12} /> {app.email}
                      </span>
                      {app.phone && (
                        <span className="d-flex align-items-center gap-1">
                          <Phone size={12} /> {app.phone}
                        </span>
                      )}
                      {app.location && (
                        <span className="d-flex align-items-center gap-1" style={{ color: "#64748b" }}>
                          <MapPin size={12} style={{ color: "#ea580c" }} /> {app.location}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RECENT INFLUENCER COLLABS */}
        <div className="col-12 col-lg-6">
          <div
            className="p-3 p-sm-4 rounded-4 h-100 dashboard-main-card"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)",
              borderRadius: "20px",
            }}
          >
            <div
              className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom"
              style={{ borderColor: "#f1f5f9" }}
            >
              <div className="d-flex align-items-center gap-2">
                <Sparkles size={18} style={{ color: "#e11d48" }} />
                <h3 className="h6 fw-bold mb-0" style={{ color: "#0f172a" }}>Recent Creator Collabs</h3>
              </div>
              <Link
                to="/admin/influencers"
                className="small text-decoration-none fw-semibold d-flex align-items-center gap-1"
                style={{ color: "#e11d48" }}
              >
                View all collabs <ArrowRight size={13} />
              </Link>
            </div>

            {isLoading ? (
              <div className="text-center py-4 opacity-50 small" style={{ color: "#64748b" }}>
                Loading collaborations...
              </div>
            ) : recentInfluencers.length === 0 ? (
              <div className="text-center py-5">
                <Sparkles size={36} className="text-secondary opacity-50 mb-2" />
                <p className="mb-0 small" style={{ color: "#64748b" }}>No influencer collabs submitted yet.</p>
              </div>
            ) : (
              <div className="d-flex flex-column gap-2.5">
                {recentInfluencers.map((collab) => (
                  <div
                    key={collab._id}
                    className="p-3 rounded-3 transition-all dashboard-item-row"
                    style={{
                      backgroundColor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                    }}
                  >
                    <div className="d-flex align-items-start justify-content-between gap-2 mb-1">
                      <div>
                        <span className="fw-semibold small me-2" style={{ color: "#0f172a" }}>{collab.name}</span>
                        <span className="small fw-semibold" style={{ color: "#e11d48" }}>
                          @{collab.socialHandle || collab.platform}
                        </span>
                      </div>
                      <span
                        className="badge rounded-pill px-2 py-0.5 fw-bold"
                        style={{
                          ...getStatusBadgeStyle(collab.status || "New"),
                          fontSize: "0.68rem",
                        }}
                      >
                        {collab.status || "New"}
                      </span>
                    </div>

                    <div
                      className="d-flex align-items-center justify-content-between small pt-1 border-top flex-wrap gap-2"
                      style={{ fontSize: "0.75rem", borderColor: "#e2e8f0", color: "#64748b" }}
                    >
                      <span
                        className="badge px-2 py-0.5 rounded-pill fw-medium"
                        style={{
                          backgroundColor: "#f1f5f9",
                          color: "#334155",
                          border: "1px solid #e2e8f0",
                        }}
                      >
                        {collab.platform} ({collab.followers || "N/A"})
                      </span>
                      <span className="text-truncate" style={{ maxWidth: "160px", color: "#64748b" }}>
                        Niche: {collab.niche || "General"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .spin-animation {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .dashboard-stat-card {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.2s ease;
        }
        .dashboard-stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px -4px rgba(0, 0, 0, 0.08), 0 6px 12px -2px rgba(0, 0, 0, 0.04) !important;
          border-color: #cbd5e1 !important;
        }
        .dashboard-main-card {
          transition: box-shadow 0.3s ease;
        }
        .dashboard-item-row {
          transition: all 0.2s ease;
        }
        .dashboard-item-row:hover {
          background-color: #f1f5f9 !important;
          border-color: #cbd5e1 !important;
          transform: translateX(3px);
        }
      `}</style>
    </div>
  );
}
