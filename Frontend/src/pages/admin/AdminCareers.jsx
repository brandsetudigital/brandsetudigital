import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";
import {
  Briefcase,
  Search,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  Eye,
  Trash2,
  X,
  FileText,
  Download,
  ExternalLink,
  Calendar,
  CheckCircle,
  Clock,
  User,
} from "lucide-react";

export default function AdminCareers() {
  const { authFetch } = useAuth();
  const [applications, setApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const [statusCounts, setStatusCounts] = useState({
    all: 0,
    new: 0,
    reviewed: 0,
    shortlisted: 0,
    hired: 0,
    rejected: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  const fetchApplications = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit: 15,
        status: statusFilter,
        search: searchQuery.trim(),
      });
      const res = await authFetch(
        `${API_BASE_URL}/api/careers/admin?${params.toString()}`
      );
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setApplications(data.applications || []);
          setPagination(data.pagination || { total: 0, totalPages: 1 });
          if (data.statusCounts) {
            setStatusCounts(data.statusCounts);
          }
        }
      }
    } catch (err) {
      console.error("fetchApplications error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [authFetch, page, statusFilter, searchQuery]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await authFetch(
        `${API_BASE_URL}/api/careers/admin/${id}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) =>
            app._id === id ? { ...app, status: newStatus } : app
          )
        );
        if (selectedApp && selectedApp._id === id) {
          setSelectedApp((prev) => ({ ...prev, status: newStatus }));
        }
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Network error updating status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedApp) return;
    setSavingNotes(true);
    try {
      const res = await authFetch(
        `${API_BASE_URL}/api/careers/admin/${selectedApp._id}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ notes: adminNotes }),
        }
      );
      if (res.ok) {
        setSelectedApp((prev) => ({ ...prev, notes: adminNotes }));
        setApplications((prev) =>
          prev.map((app) =>
            app._id === selectedApp._id ? { ...app, notes: adminNotes } : app
          )
        );
        alert("Notes saved successfully!");
      }
    } catch (err) {
      console.error("Error saving notes:", err);
      alert("Failed to save notes");
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = async (id, candidateName) => {
    if (
      !window.confirm(
        `Are you sure you want to delete the job application from "${candidateName || "Candidate"}"?`
      )
    ) {
      return;
    }

    try {
      const res = await authFetch(
        `${API_BASE_URL}/api/careers/admin/${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        fetchApplications();
        if (selectedApp && selectedApp._id === id) {
          setSelectedApp(null);
        }
      } else {
        alert("Failed to delete application");
      }
    } catch (err) {
      console.error("Error deleting application:", err);
      alert("Network error deleting application");
    }
  };

  const openDetailModal = (app) => {
    setSelectedApp(app);
    setAdminNotes(app.notes || "");
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "New":
        return {
          backgroundColor: "#292209",
          color: "#fde047",
          border: "1.5px solid #eab308",
        };
      case "Reviewed":
        return {
          backgroundColor: "#e0f2fe",
          color: "#0369a1",
          border: "1.5px solid #7dd3fc",
        };
      case "Shortlisted":
        return {
          backgroundColor: "#e0e7ff",
          color: "#4338ca",
          border: "1.5px solid #a5b4fc",
        };
      case "Hired":
        return {
          backgroundColor: "#dcfce7",
          color: "#15803d",
          border: "1.5px solid #86efac",
        };
      case "Rejected":
        return {
          backgroundColor: "#fee2e2",
          color: "#b91c1c",
          border: "1.5px solid #fca5a5",
        };
      default:
        return {
          backgroundColor: "#fef9c3",
          color: "#a16207",
          border: "1.5px solid #fde047",
        };
    }
  };

  return (
    <div className="container-fluid px-0">
      {/* PAGE HEADER */}
      <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <div
              className="d-flex align-items-center justify-content-center rounded-3"
              style={{
                width: "36px",
                height: "36px",
                backgroundColor: "#fef3c7",
                color: "#b45309",
              }}
            >
              <Briefcase size={20} />
            </div>
            <h2 className="fs-4 fw-bold mb-0" style={{ color: "#0f172a" }}>Job Applications</h2>
          </div>
          <p className="small mb-0" style={{ color: "#64748b" }}>
            Review and manage incoming candidate applications for open roles at BrandSetu Digital.
          </p>
        </div>

        <button
          onClick={fetchApplications}
          disabled={isLoading}
          className="btn btn-sm d-flex align-items-center gap-2 align-self-start align-self-md-center px-3 py-2 rounded-3"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #cbd5e1",
            color: "#334155",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
          }}
        >
          <RefreshCw size={14} className={isLoading ? "spin" : ""} />
          <span>Refresh</span>
        </button>
      </div>

      {/* KPI STATS CARDS */}
      <div className="row g-3 mb-4">
        {[
          { label: "Total Applications", value: statusCounts.all, filter: "all", color: "#b45309" },
          { label: "New Unreviewed", value: statusCounts.new, filter: "New", color: "#a16207" },
          { label: "Reviewed", value: statusCounts.reviewed, filter: "Reviewed", color: "#0369a1" },
          { label: "Shortlisted", value: statusCounts.shortlisted, filter: "Shortlisted", color: "#4338ca" },
          { label: "Hired", value: statusCounts.hired, filter: "Hired", color: "#15803d" },
        ].map((kpi, idx) => (
          <div className="col-6 col-md" key={idx}>
            <div
              onClick={() => {
                setStatusFilter(kpi.filter);
                setPage(1);
              }}
              className="p-3 rounded-3 cursor-pointer transition-all h-100"
              style={{
                backgroundColor: "#ffffff",
                border:
                  statusFilter === kpi.filter
                    ? `1.5px solid ${kpi.color}`
                    : "1px solid #e2e8f0",
                boxShadow:
                  statusFilter === kpi.filter
                    ? "0 4px 12px rgba(245, 158, 11, 0.15)"
                    : "0 2px 6px rgba(0, 0, 0, 0.03)",
                borderRadius: "14px",
              }}
            >
              <div className="small mb-1 fw-semibold" style={{ fontSize: "0.8rem", color: "#334155" }}>
                {kpi.label}
              </div>
              <div className="fs-4 fw-bold" style={{ color: kpi.color }}>
                {kpi.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FILTER & SEARCH TOOLBAR */}
      <div
        className="p-3 rounded-4 mb-4 d-flex flex-column flex-md-row align-items-stretch align-items-md-center justify-content-between gap-3"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
          borderRadius: "16px",
        }}
      >
        {/* Status Filter Buttons */}
        <div className="d-flex align-items-center gap-1 overflow-x-auto pb-1 pb-md-0">
          {["all", "New", "Reviewed", "Shortlisted", "Hired", "Rejected"].map((st) => (
            <button
              key={st}
              onClick={() => {
                setStatusFilter(st);
                setPage(1);
              }}
              className={`btn btn-sm px-3 py-1.5 rounded-pill text-nowrap fw-semibold ${
                statusFilter === st
                  ? "btn-warning text-dark shadow-sm"
                  : "btn-light border text-secondary"
              }`}
              style={{ fontSize: "0.82rem", borderColor: "#cbd5e1" }}
            >
              {st === "all" ? "All" : st}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="position-relative" style={{ minWidth: "260px" }}>
          <Search
            size={16}
            className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"
          />
          <input
            type="text"
            className="form-control form-control-sm ps-5 rounded-pill"
            placeholder="Search candidate, role, email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            style={{
              fontSize: "0.85rem",
              padding: "8px 16px 8px 36px",
              backgroundColor: "#ffffff",
              borderColor: "#cbd5e1",
              color: "#0f172a",
            }}
          />
        </div>
      </div>

      {/* APPLICATIONS TABLE */}
      <div
        className="rounded-4 overflow-hidden mb-4"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)",
          borderRadius: "20px",
        }}
      >
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle bg-transparent">
            <thead style={{ fontSize: "0.8rem", letterSpacing: "0.5px" }}>
              <tr className="border-bottom" style={{ borderColor: "#f1f5f9", color: "#64748b" }}>
                <th className="py-3 px-3 text-uppercase">Candidate</th>
                <th className="py-3 px-3 text-uppercase">Role Applied</th>
                <th className="py-3 px-3 text-uppercase">Experience / Location</th>
                <th className="py-3 px-3 text-uppercase">Resume</th>
                <th className="py-3 px-3 text-uppercase">Status</th>
                <th className="py-3 px-3 text-uppercase">Date</th>
                <th className="py-3 px-3 text-uppercase text-end">Actions</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "0.88rem" }}>
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="text-center py-5 opacity-50" style={{ color: "#64748b" }}>
                    <RefreshCw size={22} className="spin mb-2 d-block mx-auto text-warning" />
                    Loading applications...
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-5" style={{ color: "#64748b" }}>
                    <Briefcase size={36} className="mb-2 opacity-30 d-block mx-auto" />
                    No applications found matching your criteria.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    {/* Candidate */}
                    <td className="py-3 px-3">
                      <div className="fw-bold mb-0.5" style={{ color: "#0f172a" }}>{app.name}</div>
                      <div className="small d-flex align-items-center gap-1" style={{ color: "#64748b" }}>
                        <Mail size={12} />
                        <span>{app.email}</span>
                      </div>
                      <div className="small d-flex align-items-center gap-1 mt-0.5" style={{ color: "#64748b" }}>
                        <Phone size={12} />
                        <span>{app.phone}</span>
                      </div>
                    </td>

                    {/* Role Applied */}
                    <td className="py-3 px-3">
                      <span
                        className="badge rounded-pill px-3 py-1.5 fw-bold"
                        style={{
                          backgroundColor: "#fef3c7",
                          color: "#b45309",
                          border: "1px solid #fde68a",
                          fontSize: "0.82rem",
                          letterSpacing: "0.2px",
                          display: "inline-block",
                        }}
                      >
                        {app.jobTitle || "General Application"}
                      </span>
                    </td>

                    {/* Experience & Location */}
                    <td className="py-3 px-3">
                      <div className="small fw-medium" style={{ color: "#334155" }}>{app.experience || "Not specified"}</div>
                      {app.location && (
                        <div className="small d-flex align-items-center gap-1 mt-1" style={{ color: "#64748b" }}>
                          <MapPin size={12} style={{ color: "#ea580c" }} />
                          <span>{app.location}</span>
                        </div>
                      )}
                    </td>

                    {/* Resume */}
                    <td className="py-3 px-3">
                      {app.resume ? (
                        <a
                          href={`${API_BASE_URL}/uploads/${app.resume}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm d-inline-flex align-items-center gap-1 px-2.5 py-1 rounded-pill fw-semibold"
                          style={{
                            fontSize: "0.75rem",
                            backgroundColor: "#fef3c7",
                            color: "#b45309",
                            border: "1px solid #fde68a",
                          }}
                        >
                          <Download size={12} />
                          <span>Resume</span>
                        </a>
                      ) : (
                        <span className="small" style={{ color: "#94a3b8" }}>None</span>
                      )}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3 px-3">
                      <select
                        value={app.status || "New"}
                        disabled={updatingId === app._id}
                        onChange={(e) => handleStatusChange(app._id, e.target.value)}
                        className="form-select form-select-sm rounded-pill fw-bold"
                        style={{
                          ...getStatusStyle(app.status || "New"),
                          fontSize: "0.78rem",
                          width: "135px",
                          cursor: "pointer",
                          paddingLeft: "12px",
                          paddingRight: "28px",
                        }}
                      >
                        <option value="New" style={{ backgroundColor: "#ffffff", color: "#a16207" }}>New</option>
                        <option value="Reviewed" style={{ backgroundColor: "#ffffff", color: "#0369a1" }}>Reviewed</option>
                        <option value="Shortlisted" style={{ backgroundColor: "#ffffff", color: "#4338ca" }}>Shortlisted</option>
                        <option value="Hired" style={{ backgroundColor: "#ffffff", color: "#15803d" }}>Hired</option>
                        <option value="Rejected" style={{ backgroundColor: "#ffffff", color: "#b91c1c" }}>Rejected</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="py-3 px-3 small" style={{ color: "#64748b" }}>
                      {new Date(app.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-end">
                      <div className="d-inline-flex align-items-center gap-1">
                        <button
                          onClick={() => openDetailModal(app)}
                          className="btn btn-sm btn-light border p-1.5 rounded-2 text-warning"
                          title="View Full Profile"
                          style={{ borderColor: "#cbd5e1" }}
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(app._id, app.name)}
                          className="btn btn-sm btn-outline-danger p-1.5 rounded-2"
                          title="Delete Application"
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

        {/* PAGINATION */}
        {pagination.totalPages > 1 && (
          <div
            className="p-3 d-flex align-items-center justify-content-between border-top"
            style={{ borderColor: "#f1f5f9" }}
          >
            <div className="small" style={{ color: "#64748b" }}>
              Showing page <strong>{pagination.page}</strong> of{" "}
              <strong>{pagination.totalPages}</strong> ({pagination.total} total)
            </div>
            <div className="d-flex align-items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="btn btn-sm btn-light border rounded-pill px-3"
                style={{ borderColor: "#cbd5e1" }}
              >
                Previous
              </button>
              <button
                disabled={page >= pagination.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="btn btn-sm btn-light border rounded-pill px-3"
                style={{ borderColor: "#cbd5e1" }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* DETAIL MODAL */}
      {selectedApp && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.5)",
            backdropFilter: "blur(6px)",
            zIndex: 1060,
          }}
          onClick={() => setSelectedApp(null)}
        >
          <div
            className="rounded-4 p-4 p-md-5 overflow-y-auto"
            style={{
              maxWidth: "680px",
              width: "100%",
              maxHeight: "90vh",
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="d-flex align-items-start justify-content-between pb-3 border-bottom mb-4" style={{ borderColor: "#f1f5f9" }}>
              <div>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <h4 className="fw-bold mb-0" style={{ color: "#0f172a" }}>{selectedApp.name}</h4>
                  <span
                    className="badge rounded-pill px-3 py-1.5 fw-bold"
                    style={{
                      ...getStatusStyle(selectedApp.status || "New"),
                      fontSize: "0.82rem",
                    }}
                  >
                    {selectedApp.status || "New"}
                  </span>
                </div>
                <div className="fw-semibold small" style={{ color: "#b45309" }}>
                  {selectedApp.jobTitle || "General Application"}
                </div>
              </div>

              <button
                type="button"
                className="btn btn-link text-secondary p-1"
                onClick={() => setSelectedApp(null)}
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="d-flex flex-column gap-3">
              {/* Contact Info Grid */}
              <div className="row g-3">
                <div className="col-sm-6">
                  <div className="p-3 rounded-3" style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                    <small className="d-block mb-1" style={{ color: "#64748b" }}>Email Address</small>
                    <a
                      href={`mailto:${selectedApp.email}`}
                      className="text-decoration-none fw-semibold d-flex align-items-center gap-1"
                      style={{ color: "#0284c7" }}
                    >
                      <Mail size={14} />
                      <span>{selectedApp.email}</span>
                    </a>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="p-3 rounded-3" style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                    <small className="d-block mb-1" style={{ color: "#64748b" }}>Phone / WhatsApp</small>
                    <a
                      href={`tel:${selectedApp.phone}`}
                      className="text-decoration-none fw-semibold d-flex align-items-center gap-1"
                      style={{ color: "#b45309" }}
                    >
                      <Phone size={14} />
                      <span>{selectedApp.phone}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Location & Experience */}
              <div className="row g-3">
                <div className="col-sm-6">
                  <div className="p-3 rounded-3" style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                    <small className="d-block mb-1" style={{ color: "#64748b" }}>Current Location</small>
                    <span className="fw-semibold" style={{ color: "#0f172a" }}>
                      {selectedApp.location || "Not specified"}
                    </span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="p-3 rounded-3" style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                    <small className="d-block mb-1" style={{ color: "#64748b" }}>Years of Experience</small>
                    <span className="fw-semibold" style={{ color: "#0f172a" }}>
                      {selectedApp.experience || "Not specified"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Portfolio / Profile URL */}
              {selectedApp.profile && (
                <div className="p-3 rounded-3" style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                  <small className="d-block mb-1" style={{ color: "#64748b" }}>Portfolio / LinkedIn Profile</small>
                  <a
                    href={
                      selectedApp.profile.startsWith("http")
                        ? selectedApp.profile
                        : `https://${selectedApp.profile}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none d-inline-flex align-items-center gap-1 fw-semibold text-break"
                    style={{ color: "#0284c7" }}
                  >
                    <span>{selectedApp.profile}</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              )}

              {/* Resume File */}
              <div className="p-3 rounded-3 d-flex align-items-center justify-content-between" style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <div>
                  <small className="d-block" style={{ color: "#64748b" }}>Candidate Resume</small>
                  <span className="small fw-medium" style={{ color: "#0f172a" }}>
                    {selectedApp.resume ? selectedApp.resume : "No resume file uploaded"}
                  </span>
                </div>
                {selectedApp.resume && (
                  <a
                    href={`${API_BASE_URL}/uploads/${selectedApp.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-warning btn-sm d-flex align-items-center gap-1.5 fw-bold text-dark rounded-pill px-3 py-1.5"
                    style={{ boxShadow: "0 2px 8px rgba(245, 158, 11, 0.25)" }}
                  >
                    <Download size={14} />
                    <span>Download CV</span>
                  </a>
                )}
              </div>

              {/* Cover Note / About */}
              {selectedApp.about && (
                <div className="p-3 rounded-3" style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                  <small className="d-block mb-1" style={{ color: "#64748b" }}>Candidate Note / Cover Pitch</small>
                  <p className="mb-0 small lh-base" style={{ color: "#0f172a", whiteSpace: "pre-wrap" }}>
                    {selectedApp.about}
                  </p>
                </div>
              )}

              {/* Admin Internal Notes */}
              <div className="p-3 rounded-3" style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }}>
                <small className="fw-bold d-block mb-2" style={{ color: "#b45309" }}>Admin Notes & Remarks</small>
                <textarea
                  rows="3"
                  className="form-control form-control-sm mb-2"
                  placeholder="Add internal notes about candidate interview, rating, or next steps..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  style={{ backgroundColor: "#f8fafc", borderColor: "#cbd5e1", color: "#0f172a" }}
                />
                <button
                  onClick={handleSaveNotes}
                  disabled={savingNotes}
                  className="btn btn-warning btn-sm fw-bold text-dark px-3 rounded-pill"
                  style={{ boxShadow: "0 2px 8px rgba(245, 158, 11, 0.25)" }}
                >
                  {savingNotes ? "Saving..." : "Save Admin Notes"}
                </button>
              </div>

              {/* Date Metadata */}
              <div className="small d-flex align-items-center gap-2 pt-2" style={{ color: "#64748b" }}>
                <Calendar size={14} />
                <span>
                  Applied on{" "}
                  {new Date(selectedApp.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
