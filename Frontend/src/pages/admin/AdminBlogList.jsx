import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";
import {
  PlusCircle,
  Search,
  ExternalLink,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
  Clock,
  RefreshCw,
} from "lucide-react";

export default function AdminBlogList() {
  const { authFetch } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [actionInProgress, setActionInProgress] = useState(null);

  const fetchBlogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit: 15,
        status: statusFilter,
        category: selectedCategory,
        search: searchQuery.trim(),
      });

      const res = await authFetch(
        `${API_BASE_URL}/api/blogs/admin/list/all?${params.toString()}`
      );

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setBlogs(data.blogs || []);
          setPagination(data.pagination || { total: 0, totalPages: 1 });
          if (data.categories && data.categories.length > 0) {
            setCategories(data.categories);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  }, [authFetch, page, statusFilter, selectedCategory, searchQuery]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Handle Publish / Unpublish toggle
  const handleTogglePublish = async (blog) => {
    const isCurrentlyPublished = blog.status === "published";
    const endpoint = isCurrentlyPublished ? "unpublish" : "publish";
    const confirmMessage = isCurrentlyPublished
      ? `Unpublish "${blog.title}"? It will no longer be visible on the public website.`
      : `Publish "${blog.title}"? It will go live immediately on the public website.`;

    if (!window.confirm(confirmMessage)) return;

    setActionInProgress(blog._id);
    try {
      const res = await authFetch(
        `${API_BASE_URL}/api/blogs/admin/${blog._id}/${endpoint}`,
        { method: "POST" }
      );
      if (res.ok) {
        fetchBlogs();
      } else {
        alert("Failed to update blog publish status.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error updating status.");
    } finally {
      setActionInProgress(null);
    }
  };

  // Handle Delete blog
  const handleDelete = async (blog) => {
    if (
      !window.confirm(
        `Are you sure you want to permanently delete "${blog.title}"?\nThis action cannot be undone.`
      )
    ) {
      return;
    }

    setActionInProgress(blog._id);
    try {
      const res = await authFetch(`${API_BASE_URL}/api/blogs/admin/${blog._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchBlogs();
      } else {
        alert("Failed to delete blog.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error while deleting blog.");
    } finally {
      setActionInProgress(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1" style={{ color: "#0f172a" }}>Blog Management</h1>
          <p className="mb-0 small" style={{ color: "#64748b" }}>
            Create, edit, publish, or draft articles across all marketing categories.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            onClick={fetchBlogs}
            disabled={isLoading}
            className="btn btn-sm d-flex align-items-center gap-2 px-3 py-2 rounded-3"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #cbd5e1",
              color: "#334155",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            }}
            title="Refresh list"
          >
            <RefreshCw size={15} className={isLoading ? "spin-animation" : ""} />
            <span>Refresh</span>
          </button>

          <Link
            to="/admin/blogs/new"
            className="btn btn-warning fw-bold text-dark rounded-3 px-3.5 py-2 small d-flex align-items-center gap-2 shadow-sm"
          >
            <PlusCircle size={17} />
            <span>Add New Blog</span>
          </Link>
        </div>
      </div>

      {/* FILTER CONTROLS BAR */}
      <div
        className="p-3 rounded-4 mb-4"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.03)",
        }}
      >
        <div className="row g-3 align-items-center">
          {/* Status Tabs */}
          <div className="col-12 col-md-5">
            <div
              className="btn-group btn-group-sm w-100 p-1 rounded-3"
              style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}
              role="group"
            >
              {[
                { id: "all", label: "All" },
                { id: "published", label: "Published" },
                { id: "draft", label: "Drafts" },
                { id: "unpublished", label: "Unpublished" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setStatusFilter(tab.id);
                    setPage(1);
                  }}
                  className={`btn border-0 rounded-2 fw-semibold py-1.5 ${
                    statusFilter === tab.id
                      ? "btn-warning text-dark shadow-sm"
                      : "btn-transparent"
                  }`}
                  style={{
                    fontSize: "0.82rem",
                    color: statusFilter === tab.id ? "#000000" : "#64748b",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search input */}
          <div className="col-12 col-sm-6 col-md-4">
            <div className="position-relative">
              <Search
                size={16}
                className="position-absolute top-50 start-0 translate-middle-y ms-3"
                style={{ color: "#94a3b8" }}
              />
              <input
                type="text"
                className="form-control form-control-sm"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by title or slug..."
                style={{
                  backgroundColor: "#f8fafc",
                  border: "1px solid #cbd5e1",
                  color: "#0f172a",
                  paddingLeft: "2.4rem",
                  borderRadius: "10px",
                  fontSize: "0.88rem",
                }}
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="col-12 col-sm-6 col-md-3">
            <select
              className="form-select form-select-sm"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setPage(1);
              }}
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #cbd5e1",
                color: "#0f172a",
                borderRadius: "10px",
                fontSize: "0.88rem",
              }}
            >
              <option value="All" style={{ backgroundColor: "#ffffff", color: "#0f172a" }}>All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} style={{ backgroundColor: "#ffffff", color: "#0f172a" }}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* BLOGS DATA TABLE */}
      <div
        className="rounded-4 overflow-hidden"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
              <tr className="small" style={{ color: "#475569", fontWeight: 600 }}>
                <th scope="col" className="ps-4 py-3">ARTICLE</th>
                <th scope="col" className="py-3">CATEGORY</th>
                <th scope="col" className="py-3">STATUS</th>
                <th scope="col" className="py-3">DATE</th>
                <th scope="col" className="text-end pe-4 py-3">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="text-center py-5" style={{ color: "#64748b" }}>
                    <div className="spinner-border spinner-border-sm text-warning me-2" role="status" />
                    Loading articles...
                  </td>
                </tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5" style={{ color: "#64748b" }}>
                    No blogs found matching the selected filters.
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr
                    key={blog._id}
                    style={{ borderBottom: "1px solid #f1f5f9" }}
                  >
                    {/* Article Thumbnail + Title */}
                    <td className="ps-4 py-3" style={{ maxWidth: "340px" }}>
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="rounded-3 overflow-hidden flex-shrink-0 d-flex align-items-center justify-content-center"
                          style={{
                            width: "54px",
                            height: "42px",
                            backgroundColor: "#f8fafc",
                            border: "1px solid #e2e8f0",
                          }}
                        >
                          {blog.featuredImage ? (
                            <img
                              src={blog.featuredImage}
                              alt=""
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          ) : (
                            <span className="small fw-bold" style={{ color: "#94a3b8" }}>IMG</span>
                          )}
                        </div>

                        <div className="overflow-hidden">
                          <Link
                            to={`/admin/blogs/edit/${blog._id}`}
                            className="text-decoration-none fw-semibold text-truncate d-block"
                            style={{ color: "#0f172a" }}
                            title={blog.title}
                          >
                            {blog.title}
                          </Link>
                          <div
                            className="small text-truncate"
                            style={{ fontSize: "0.76rem", color: "#64748b" }}
                          >
                            /blog/{blog.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3">
                      <span
                        className="badge rounded-pill px-2.5 py-1 small fw-semibold"
                        style={{
                          backgroundColor: "#f1f5f9",
                          color: "#334155",
                          border: "1px solid #e2e8f0",
                        }}
                      >
                        {blog.category}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3">
                      {blog.status === "published" ? (
                        <span
                          className="badge rounded-pill px-2.5 py-1 small d-inline-flex align-items-center gap-1 fw-bold"
                          style={{
                            backgroundColor: "#dcfce7",
                            color: "#15803d",
                            border: "1px solid #bbf7d0",
                          }}
                        >
                          <span
                            className="rounded-circle"
                            style={{ width: "6px", height: "6px", backgroundColor: "#15803d" }}
                          />
                          Published
                        </span>
                      ) : blog.status === "draft" ? (
                        <span
                          className="badge rounded-pill px-2.5 py-1 small d-inline-flex align-items-center gap-1 fw-bold"
                          style={{
                            backgroundColor: "#fef3c7",
                            color: "#92400e",
                            border: "1px solid #fde68a",
                          }}
                        >
                          <span
                            className="rounded-circle"
                            style={{ width: "6px", height: "6px", backgroundColor: "#d97706" }}
                          />
                          Draft
                        </span>
                      ) : (
                        <span
                          className="badge rounded-pill px-2.5 py-1 small d-inline-flex align-items-center gap-1 fw-bold"
                          style={{
                            backgroundColor: "#f1f5f9",
                            color: "#64748b",
                            border: "1px solid #cbd5e1",
                          }}
                        >
                          <span
                            className="rounded-circle"
                            style={{ width: "6px", height: "6px", backgroundColor: "#94a3b8" }}
                          />
                          Unpublished
                        </span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="py-3">
                      <div className="small fw-semibold" style={{ color: "#0f172a" }}>
                        {blog.publishedAt
                          ? new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : new Date(blog.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                      </div>
                      <div
                        className="small d-flex align-items-center gap-1"
                        style={{ fontSize: "0.75rem", color: "#64748b" }}
                      >
                        <Clock size={11} /> {blog.readingTime || "5 min read"}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="text-end pe-4 py-3">
                      <div className="d-flex align-items-center justify-content-end gap-1.5">
                        {/* Edit */}
                        <Link
                          to={`/admin/blogs/edit/${blog._id}`}
                          className="btn btn-sm btn-outline-secondary p-1.5 rounded-2"
                          style={{ borderColor: "#cbd5e1", color: "#334155" }}
                          title="Edit Article"
                        >
                          <Edit size={15} />
                        </Link>

                        {/* View Public Live / Preview */}
                        {blog.status === "published" ? (
                          <a
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm btn-outline-warning p-1.5 rounded-2"
                            style={{ borderColor: "#fde68a", color: "#b45309", backgroundColor: "#fef3c7" }}
                            title="View Public Article"
                          >
                            <ExternalLink size={15} />
                          </a>
                        ) : (
                          <Link
                            to={`/admin/blogs/edit/${blog._id}?preview=true`}
                            className="btn btn-sm btn-outline-primary p-1.5 rounded-2"
                            style={{ borderColor: "#bae6fd", color: "#0284c7", backgroundColor: "#e0f2fe" }}
                            title="Preview Draft"
                          >
                            <Eye size={15} />
                          </Link>
                        )}

                        {/* Publish / Unpublish Toggle */}
                        <button
                          type="button"
                          disabled={actionInProgress === blog._id}
                          onClick={() => handleTogglePublish(blog)}
                          className={`btn btn-sm ${
                            blog.status === "published"
                              ? "btn-outline-secondary"
                              : "btn-outline-success"
                          } p-1.5 rounded-2`}
                          style={blog.status === "published" ? { borderColor: "#cbd5e1", color: "#64748b" } : {}}
                          title={blog.status === "published" ? "Unpublish" : "Publish"}
                        >
                          {blog.status === "published" ? (
                            <XCircle size={15} />
                          ) : (
                            <CheckCircle2 size={15} />
                          )}
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          disabled={actionInProgress === blog._id}
                          onClick={() => handleDelete(blog)}
                          className="btn btn-sm btn-outline-danger p-1.5 rounded-2"
                          title="Delete Article"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {pagination.totalPages > 1 && (
          <div
            className="p-3 border-top d-flex align-items-center justify-content-between flex-wrap gap-2"
            style={{ borderColor: "#e2e8f0" }}
          >
            <span className="small" style={{ color: "#64748b" }}>
              Showing page <strong style={{ color: "#0f172a" }}>{pagination.page}</strong> of{" "}
              <strong style={{ color: "#0f172a" }}>{pagination.totalPages}</strong> ({pagination.total} total blogs)
            </span>

            <div className="btn-group btn-group-sm">
              <button
                type="button"
                className="btn btn-outline-secondary"
                style={{ borderColor: "#cbd5e1", color: "#334155" }}
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                style={{ borderColor: "#cbd5e1", color: "#334155" }}
                disabled={page >= pagination.totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .spin-animation {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
