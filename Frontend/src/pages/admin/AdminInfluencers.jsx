import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";
import {
  Sparkles,
  Search,
  RefreshCw,
  Mail,
  Phone,
  Eye,
  Trash2,
  X,
  ExternalLink,
  Calendar,
  Instagram,
  Youtube,
  Share2,
  Users,
} from "lucide-react";

export default function AdminInfluencers() {
  const { authFetch } = useAuth();
  const [collabs, setCollabs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const [statusCounts, setStatusCounts] = useState({
    all: 0,
    new: 0,
    contacted: 0,
    inTalks: 0,
    approved: 0,
    declined: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCollab, setSelectedCollab] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  const fetchCollabs = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit: 15,
        status: statusFilter,
        search: searchQuery.trim(),
      });
      const res = await authFetch(
        `${API_BASE_URL}/api/influencers/admin?${params.toString()}`
      );
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setCollabs(data.collabs || []);
          setPagination(data.pagination || { total: 0, totalPages: 1 });
          if (data.statusCounts) {
            setStatusCounts(data.statusCounts);
          }
        }
      }
    } catch (err) {
      console.error("fetchCollabs error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [authFetch, page, statusFilter, searchQuery]);

  useEffect(() => {
    fetchCollabs();
  }, [fetchCollabs]);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await authFetch(
        `${API_BASE_URL}/api/influencers/admin/${id}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (res.ok) {
        setCollabs((prev) =>
          prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
        );
        if (selectedCollab && selectedCollab._id === id) {
          setSelectedCollab((prev) => ({ ...prev, status: newStatus }));
        }
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error("Error updating collab status:", err);
      alert("Network error updating status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedCollab) return;
    setSavingNotes(true);
    try {
      const res = await authFetch(
        `${API_BASE_URL}/api/influencers/admin/${selectedCollab._id}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ notes: adminNotes }),
        }
      );
      if (res.ok) {
        setSelectedCollab((prev) => ({ ...prev, notes: adminNotes }));
        setCollabs((prev) =>
          prev.map((c) =>
            c._id === selectedCollab._id ? { ...c, notes: adminNotes } : c
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

  const handleDelete = async (id, creatorName) => {
    if (
      !window.confirm(
        `Are you sure you want to delete the collaboration record for "${creatorName || "Creator"}"?`
      )
    ) {
      return;
    }

    try {
      const res = await authFetch(
        `${API_BASE_URL}/api/influencers/admin/${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        fetchCollabs();
        if (selectedCollab && selectedCollab._id === id) {
          setSelectedCollab(null);
        }
      } else {
        alert("Failed to delete record");
      }
    } catch (err) {
      console.error("Error deleting collab:", err);
      alert("Network error deleting record");
    }
  };

  const openDetailModal = (collab) => {
    setSelectedCollab(collab);
    setAdminNotes(collab.notes || "");
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "New":
        return {
          backgroundColor: "#fef3c7",
          color: "#92400e",
          border: "1px solid #fde68a",
        };
      case "Contacted":
        return {
          backgroundColor: "#e0f2fe",
          color: "#0369a1",
          border: "1px solid #bae6fd",
        };
      case "In Talks":
        return {
          backgroundColor: "#e0e7ff",
          color: "#4338ca",
          border: "1px solid #c7d2fe",
        };
      case "Approved":
        return {
          backgroundColor: "#dcfce7",
          color: "#15803d",
          border: "1px solid #bbf7d0",
        };
      case "Declined":
        return {
          backgroundColor: "#fee2e2",
          color: "#b91c1c",
          border: "1px solid #fecaca",
        };
      default:
        return {
          backgroundColor: "#f1f5f9",
          color: "#475569",
          border: "1px solid #cbd5e1",
        };
    }
  };

  const getPlatformIcon = (platform = "") => {
    const p = platform.toLowerCase();
    if (p.includes("instagram")) return <Instagram size={14} className="text-danger" />;
    if (p.includes("youtube")) return <Youtube size={14} className="text-danger" />;
    return <Share2 size={14} className="text-warning" />;
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
                color: "#d97706",
                border: "1px solid #fde68a",
              }}
            >
              <Sparkles size={20} />
            </div>
            <h2 className="fs-4 fw-bold mb-0" style={{ color: "#0f172a" }}>Influencer Collaborations</h2>
          </div>
          <p className="small mb-0" style={{ color: "#64748b" }}>
            Manage creator and influencer applications for sponsored brand campaigns and partnerships.
          </p>
        </div>

        <button
          onClick={fetchCollabs}
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
          { label: "Total Creators", value: statusCounts.all, filter: "all", color: "#b45309" },
          { label: "New Submissions", value: statusCounts.new, filter: "New", color: "#a16207" },
          { label: "Contacted", value: statusCounts.contacted, filter: "Contacted", color: "#0369a1" },
          { label: "In Talks", value: statusCounts.inTalks, filter: "In Talks", color: "#4338ca" },
          { label: "Approved Deals", value: statusCounts.approved, filter: "Approved", color: "#15803d" },
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
                boxShadow: statusFilter === kpi.filter ? "0 4px 12px rgba(245, 158, 11, 0.15)" : "0 2px 6px rgba(0, 0, 0, 0.03)",
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
        className="p-3 rounded-3 mb-4 d-flex flex-column flex-md-row align-items-stretch align-items-md-center justify-content-between gap-3"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.03)",
        }}
      >
        {/* Status Filter Buttons */}
        <div className="d-flex align-items-center gap-1 overflow-x-auto pb-1 pb-md-0">
          {["all", "New", "Contacted", "In Talks", "Approved", "Declined"].map((st) => (
            <button
              key={st}
              onClick={() => {
                setStatusFilter(st);
                setPage(1);
              }}
              className={`btn btn-sm px-3 py-1.5 rounded-pill text-nowrap fw-semibold ${
                statusFilter === st
                  ? "btn-warning text-dark shadow-sm"
                  : "btn-outline-secondary border-0"
              }`}
              style={{
                fontSize: "0.82rem",
                color: statusFilter === st ? "#000" : "#64748b",
              }}
            >
              {st === "all" ? "All" : st}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="position-relative" style={{ minWidth: "260px" }}>
          <Search
            size={16}
            className="position-absolute top-50 start-0 translate-middle-y ms-3"
            style={{ color: "#94a3b8" }}
          />
          <input
            type="text"
            className="form-control form-control-sm ps-5 rounded-pill"
            placeholder="Search creator, handle, niche..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            style={{
              fontSize: "0.85rem",
              padding: "8px 16px 8px 36px",
              backgroundColor: "#f8fafc",
              border: "1px solid #cbd5e1",
              color: "#0f172a",
            }}
          />
        </div>
      </div>

      {/* COLLABORATIONS TABLE */}
      <div
        className="rounded-3 overflow-hidden mb-4"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", fontSize: "0.78rem", letterSpacing: "0.5px" }}>
              <tr>
                <th className="py-3 px-3 text-uppercase" style={{ color: "#475569", fontWeight: 600 }}>Creator</th>
                <th className="py-3 px-3 text-uppercase" style={{ color: "#475569", fontWeight: 600 }}>Platform & Handle</th>
                <th className="py-3 px-3 text-uppercase" style={{ color: "#475569", fontWeight: 600 }}>Followers</th>
                <th className="py-3 px-3 text-uppercase" style={{ color: "#475569", fontWeight: 600 }}>Niche</th>
                <th className="py-3 px-3 text-uppercase" style={{ color: "#475569", fontWeight: 600 }}>Status</th>
                <th className="py-3 px-3 text-uppercase" style={{ color: "#475569", fontWeight: 600 }}>Date</th>
                <th className="py-3 px-3 text-uppercase text-end" style={{ color: "#475569", fontWeight: 600 }}>Actions</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "0.88rem" }}>
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-secondary">
                    <RefreshCw size={22} className="spin mb-2 d-block mx-auto text-warning" />
                    Loading collaboration requests...
                  </td>
                </tr>
              ) : collabs.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-5" style={{ color: "#64748b" }}>
                    <Sparkles size={36} className="mb-2 opacity-30 d-block mx-auto" />
                    No influencer applications found.
                  </td>
                </tr>
              ) : (
                collabs.map((collab) => (
                  <tr key={collab._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    {/* Creator */}
                    <td className="py-3 px-3">
                      <div className="fw-bold mb-0.5" style={{ color: "#0f172a" }}>{collab.name}</div>
                      <div className="small d-flex align-items-center gap-1" style={{ color: "#64748b" }}>
                        <Mail size={12} />
                        <span>{collab.email}</span>
                      </div>
                      <div className="small d-flex align-items-center gap-1 mt-0.5" style={{ color: "#64748b" }}>
                        <Phone size={12} />
                        <span>{collab.phone}</span>
                      </div>
                    </td>

                    {/* Platform & Handle */}
                    <td className="py-3 px-3">
                      <div className="d-flex align-items-center gap-1.5 fw-semibold" style={{ color: "#0f172a" }}>
                        {getPlatformIcon(collab.platform)}
                        <span>{collab.platform}</span>
                      </div>
                      <div className="small fw-semibold mt-0.5" style={{ color: "#b45309" }}>
                        @{collab.socialHandle || "not-specified"}
                      </div>
                    </td>

                    {/* Followers */}
                    <td className="py-3 px-3">
                      <span
                        className="badge px-2.5 py-1 rounded-pill fw-bold"
                        style={{
                          backgroundColor: "#f1f5f9",
                          color: "#334155",
                          border: "1px solid #e2e8f0",
                        }}
                      >
                        {collab.followers || "Not specified"}
                      </span>
                    </td>

                    {/* Niche */}
                    <td className="py-3 px-3">
                      <span
                        className="badge rounded-pill px-3 py-1.5 fw-bold"
                        style={{
                          backgroundColor: "#fef3c7",
                          color: "#92400e",
                          border: "1px solid #fde68a",
                          fontSize: "0.8rem",
                          display: "inline-block",
                        }}
                      >
                        {collab.niche || "General"}
                      </span>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3 px-3">
                      <select
                        value={collab.status || "New"}
                        disabled={updatingId === collab._id}
                        onChange={(e) => handleStatusChange(collab._id, e.target.value)}
                        className="form-select form-select-sm rounded-pill fw-bold"
                        style={{
                          ...getStatusStyle(collab.status || "New"),
                          fontSize: "0.78rem",
                          width: "135px",
                          cursor: "pointer",
                          paddingLeft: "12px",
                          paddingRight: "28px",
                        }}
                      >
                        <option value="New" style={{ backgroundColor: "#ffffff", color: "#92400e" }}>New</option>
                        <option value="Contacted" style={{ backgroundColor: "#ffffff", color: "#0369a1" }}>Contacted</option>
                        <option value="In Talks" style={{ backgroundColor: "#ffffff", color: "#4338ca" }}>In Talks</option>
                        <option value="Approved" style={{ backgroundColor: "#ffffff", color: "#15803d" }}>Approved</option>
                        <option value="Declined" style={{ backgroundColor: "#ffffff", color: "#b91c1c" }}>Declined</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="py-3 px-3 small" style={{ color: "#64748b" }}>
                      {new Date(collab.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-end">
                      <div className="d-inline-flex align-items-center gap-1">
                        <button
                          onClick={() => openDetailModal(collab)}
                          className="btn btn-sm btn-outline-secondary p-1.5 rounded-2"
                          style={{ borderColor: "#cbd5e1", color: "#334155" }}
                          title="View Details"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(collab._id, collab.name)}
                          className="btn btn-sm btn-outline-danger p-1.5 rounded-2"
                          title="Delete Record"
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
            style={{ borderColor: "#e2e8f0" }}
          >
            <div className="small" style={{ color: "#64748b" }}>
              Showing page <strong style={{ color: "#0f172a" }}>{pagination.page}</strong> of{" "}
              <strong style={{ color: "#0f172a" }}>{pagination.totalPages}</strong> ({pagination.total} total)
            </div>
            <div className="d-flex align-items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="btn btn-sm btn-outline-secondary rounded-pill px-3"
                style={{ borderColor: "#cbd5e1", color: "#334155" }}
              >
                Previous
              </button>
              <button
                disabled={page >= pagination.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="btn btn-sm btn-outline-secondary rounded-pill px-3"
                style={{ borderColor: "#cbd5e1", color: "#334155" }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* DETAIL MODAL */}
      {selectedCollab && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 1060,
          }}
          onClick={() => setSelectedCollab(null)}
        >
          <div
            className="rounded-4 p-4 p-md-5 overflow-y-auto"
            style={{
              backgroundColor: "#ffffff",
              maxWidth: "680px",
              width: "90%",
              maxHeight: "90vh",
              border: "1px solid #e2e8f0",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="d-flex align-items-start justify-content-between pb-3 border-bottom mb-4" style={{ borderColor: "#e2e8f0" }}>
              <div>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <h4 className="fw-bold mb-0" style={{ color: "#0f172a" }}>{selectedCollab.name}</h4>
                  <span
                    className="badge rounded-pill px-3 py-1.5 fw-bold"
                    style={{
                      ...getStatusStyle(selectedCollab.status || "New"),
                      fontSize: "0.82rem",
                    }}
                  >
                    {selectedCollab.status || "New"}
                  </span>
                </div>
                <div className="fw-semibold small d-flex align-items-center gap-1" style={{ color: "#b45309" }}>
                  {getPlatformIcon(selectedCollab.platform)}
                  <span>
                    {selectedCollab.platform} — @{selectedCollab.socialHandle}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-link p-1"
                style={{ color: "#64748b" }}
                onClick={() => setSelectedCollab(null)}
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
                    <small className="d-block mb-1 fw-semibold" style={{ color: "#64748b" }}>Email Address</small>
                    <a
                      href={`mailto:${selectedCollab.email}`}
                      className="text-decoration-none fw-semibold d-flex align-items-center gap-1"
                      style={{ color: "#0284c7" }}
                    >
                      <Mail size={14} />
                      <span>{selectedCollab.email}</span>
                    </a>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="p-3 rounded-3" style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                    <small className="d-block mb-1 fw-semibold" style={{ color: "#64748b" }}>Phone / WhatsApp</small>
                    <a
                      href={`tel:${selectedCollab.phone}`}
                      className="text-decoration-none fw-semibold d-flex align-items-center gap-1"
                      style={{ color: "#0284c7" }}
                    >
                      <Phone size={14} />
                      <span>{selectedCollab.phone}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Platform Metrics */}
              <div className="row g-3">
                <div className="col-sm-6">
                  <div className="p-3 rounded-3" style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                    <small className="d-block mb-1 fw-semibold" style={{ color: "#64748b" }}>Audience Size / Followers</small>
                    <span className="fw-bold fs-6" style={{ color: "#0f172a" }}>
                      {selectedCollab.followers || "Not specified"}
                    </span>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="p-3 rounded-3" style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                    <small className="d-block mb-1 fw-semibold" style={{ color: "#64748b" }}>Primary Content Niche</small>
                    <span className="fw-bold fs-6" style={{ color: "#b45309" }}>
                      {selectedCollab.niche || "Not specified"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Creator Handle Link */}
              {selectedCollab.socialHandle && (
                <div className="p-3 rounded-3" style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                  <small className="d-block mb-1 fw-semibold" style={{ color: "#64748b" }}>Social Profile / Handle</small>
                  <a
                    href={
                      selectedCollab.socialHandle.startsWith("http")
                        ? selectedCollab.socialHandle
                        : selectedCollab.platform === "Instagram"
                        ? `https://instagram.com/${selectedCollab.socialHandle.replace("@", "")}`
                        : selectedCollab.platform === "YouTube"
                        ? `https://youtube.com/@${selectedCollab.socialHandle.replace("@", "")}`
                        : `https://${selectedCollab.socialHandle}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none d-inline-flex align-items-center gap-1 fw-semibold"
                    style={{ color: "#2563eb" }}
                  >
                    <span>View @{selectedCollab.socialHandle}</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              )}

              {/* Creator About / Pitch */}
              {selectedCollab.about && (
                <div className="p-3 rounded-3" style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                  <small className="d-block mb-1 fw-semibold" style={{ color: "#64748b" }}>About Creator & Collaboration Goals</small>
                  <p className="mb-0 small lh-base" style={{ whiteSpace: "pre-wrap", color: "#334155" }}>
                    {selectedCollab.about}
                  </p>
                </div>
              )}

              {/* Admin Internal Notes */}
              <div className="p-3 rounded-3" style={{ border: "1px solid #e2e8f0", backgroundColor: "#ffffff" }}>
                <small className="fw-bold d-block mb-2" style={{ color: "#b45309" }}>Internal Campaign Notes & Commercials</small>
                <textarea
                  rows="3"
                  className="form-control form-control-sm mb-2"
                  placeholder="Add campaign budget, deliverables agreed, brand match, or negotiation notes..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  style={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #cbd5e1",
                    color: "#0f172a",
                  }}
                />
                <button
                  onClick={handleSaveNotes}
                  disabled={savingNotes}
                  className="btn btn-warning btn-sm fw-bold text-dark px-3 rounded-pill"
                >
                  {savingNotes ? "Saving..." : "Save Admin Notes"}
                </button>
              </div>

              {/* Date Metadata */}
              <div className="small d-flex align-items-center gap-2 pt-2" style={{ color: "#64748b" }}>
                <Calendar size={14} />
                <span>
                  Submitted on{" "}
                  {new Date(selectedCollab.createdAt).toLocaleString("en-IN", {
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
