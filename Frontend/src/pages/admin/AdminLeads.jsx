import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";
import {
  Users,
  Search,
  RefreshCw,
  Mail,
  Phone,
  Eye,
  Trash2,
  X,
} from "lucide-react";

export default function AdminLeads() {
  const { authFetch } = useAuth();
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const [statusCounts, setStatusCounts] = useState({
    all: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    closed: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit: 15,
        status: statusFilter,
        search: searchQuery.trim(),
      });
      const res = await authFetch(`${API_BASE_URL}/api/admin/leads?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setLeads(data.leads || []);
          setPagination(data.pagination || { total: 0, totalPages: 1 });
          if (data.statusCounts) {
            setStatusCounts(data.statusCounts);
          }
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [authFetch, page, statusFilter, searchQuery]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Update lead status
  const handleStatusChange = async (leadId, newStatus) => {
    setUpdatingId(leadId);
    try {
      const res = await authFetch(`${API_BASE_URL}/api/admin/leads/${leadId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l._id === leadId ? { ...l, status: newStatus } : l))
        );
        if (selectedLead && selectedLead._id === leadId) {
          setSelectedLead((prev) => ({ ...prev, status: newStatus }));
        }
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      alert("Network error updating status");
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete lead
  const handleDelete = async (leadId, name) => {
    if (!window.confirm(`Delete lead enquiry from "${name || 'Prospect'}"?`)) return;

    try {
      const res = await authFetch(`${API_BASE_URL}/api/admin/leads/${leadId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchLeads();
        if (selectedLead && selectedLead._id === leadId) {
          setSelectedLead(null);
        }
      } else {
        alert("Failed to delete lead");
      }
    } catch (err) {
      console.error(err);
      alert("Network error deleting lead");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Qualified":
        return {
          backgroundColor: "#dcfce7",
          color: "#15803d",
          border: "1.5px solid #86efac",
        };
      case "Contacted":
        return {
          backgroundColor: "#e0f2fe",
          color: "#0369a1",
          border: "1.5px solid #7dd3fc",
        };
      case "Closed":
        return {
          backgroundColor: "#f1f5f9",
          color: "#475569",
          border: "1.5px solid #cbd5e1",
        };
      case "New":
      default:
        return {
          backgroundColor: "#fef9c3",
          color: "#a16207",
          border: "1.5px solid #fde047",
        };
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1" style={{ color: "#0f172a" }}>Inquiries & Leads</h1>
          <p className="mb-0 small" style={{ color: "#64748b" }}>
            Track and manage prospect submissions from the BrandSetu contact form.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            onClick={fetchLeads}
            disabled={isLoading}
            className="btn btn-sm d-flex align-items-center gap-2"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #cbd5e1",
              color: "#334155",
              borderRadius: "8px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            <RefreshCw size={15} className={isLoading ? "spin-animation" : ""} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* FILTER CONTROLS */}
      <div
        className="p-3 rounded-4 mb-4"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
        }}
      >
        <div className="row g-3 align-items-center">
          {/* Status Tabs */}
          <div className="col-12 col-md-7">
            <div
              className="btn-group btn-group-sm w-100 p-1 rounded-3 flex-wrap"
              style={{ backgroundColor: "#f1f5f9" }}
              role="group"
            >
              {[
                { id: "all", label: "All Leads", count: statusCounts.all },
                { id: "New", label: "New", count: statusCounts.new },
                { id: "Contacted", label: "Contacted", count: statusCounts.contacted },
                { id: "Qualified", label: "Qualified", count: statusCounts.qualified },
                { id: "Closed", label: "Closed", count: statusCounts.closed },
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
                      : "btn-transparent text-secondary"
                  }`}
                  style={{ fontSize: "0.8rem" }}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>

          {/* Search input */}
          <div className="col-12 col-md-5">
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
                placeholder="Search by name, email, phone, service..."
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#cbd5e1",
                  color: "#0f172a",
                  paddingLeft: "2.3rem",
                  borderRadius: "8px",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* LEADS DATA TABLE */}
      <div
        className="rounded-4 overflow-hidden"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)",
          borderRadius: "20px",
        }}
      >
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 bg-transparent">
            <thead>
              <tr className="small border-bottom" style={{ borderColor: "#f1f5f9", color: "#64748b" }}>
                <th scope="col" className="bg-transparent ps-4 py-3">PROSPECT</th>
                <th scope="col" className="bg-transparent py-3">SERVICE REQUESTED</th>
                <th scope="col" className="bg-transparent py-3">STATUS</th>
                <th scope="col" className="bg-transparent py-3">DATE</th>
                <th scope="col" className="bg-transparent text-end pe-4 py-3">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="text-center py-5 opacity-50 bg-transparent" style={{ color: "#64748b" }}>
                    <div className="spinner-border spinner-border-sm text-warning me-2" role="status" />
                    Loading leads...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5 bg-transparent" style={{ color: "#64748b" }}>
                    No leads found matching current filters.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr
                    key={lead._id}
                    className="transition-all"
                    style={{ borderBottom: "1px solid #f1f5f9" }}
                  >
                    {/* Prospect Info */}
                    <td className="bg-transparent ps-4 py-3">
                      <div className="fw-bold" style={{ color: "#0f172a" }}>
                        {lead.name || "Anonymous Prospect"}
                      </div>
                      <div className="small d-flex align-items-center gap-2 flex-wrap" style={{ color: "#64748b" }}>
                        {lead.email && (
                          <span className="d-inline-flex align-items-center gap-1">
                            <Mail size={12} /> {lead.email}
                          </span>
                        )}
                        {lead.phone && (
                          <span className="d-inline-flex align-items-center gap-1">
                            <Phone size={12} /> {lead.phone}
                          </span>
                        )}
                      </div>
                      {(lead.domain || lead.city) && (
                        <div className="small mt-0.5" style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                          {lead.domain ? `Company: ${lead.domain}` : ""} {lead.city ? `• City: ${lead.city}` : ""}
                        </div>
                      )}
                    </td>

                    {/* Service */}
                    <td className="bg-transparent py-3">
                      <span
                        className="badge rounded-pill px-2.5 py-1 small fw-semibold"
                        style={{
                          backgroundColor: "#fef3c7",
                          color: "#b45309",
                          border: "1px solid #fde68a",
                        }}
                      >
                        {lead.service || "General Inquiry"}
                      </span>
                    </td>

                    {/* Status Dropdown */}
                    <td className="bg-transparent py-3">
                      <select
                        className="form-select form-select-sm rounded-pill fw-bold"
                        style={{
                          ...getStatusStyle(lead.status || "New"),
                          width: "135px",
                          cursor: "pointer",
                          fontSize: "0.78rem",
                          paddingLeft: "12px",
                          paddingRight: "28px",
                        }}
                        disabled={updatingId === lead._id}
                        value={lead.status || "New"}
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                      >
                        <option value="New" style={{ backgroundColor: "#ffffff", color: "#a16207" }}>New</option>
                        <option value="Contacted" style={{ backgroundColor: "#ffffff", color: "#0369a1" }}>Contacted</option>
                        <option value="Qualified" style={{ backgroundColor: "#ffffff", color: "#15803d" }}>Qualified</option>
                        <option value="Closed" style={{ backgroundColor: "#ffffff", color: "#475569" }}>Closed</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="bg-transparent py-3 small" style={{ color: "#475569" }}>
                      {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                      <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                        {new Date(lead.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="bg-transparent text-end pe-4 py-3">
                      <div className="d-flex align-items-center justify-content-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedLead(lead)}
                          className="btn btn-sm btn-light border p-1.5 rounded-2 text-warning"
                          title="View Lead Details & Message"
                          style={{ borderColor: "#cbd5e1" }}
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(lead._id, lead.name)}
                          className="btn btn-sm btn-outline-danger p-1.5 rounded-2"
                          title="Delete Lead"
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

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div
            className="p-3 border-top d-flex align-items-center justify-content-between"
            style={{ borderColor: "#f1f5f9" }}
          >
            <span className="small" style={{ color: "#64748b" }}>
              Page {pagination.page} of {pagination.totalPages} ({pagination.total} total leads)
            </span>
            <div className="btn-group btn-group-sm">
              <button
                type="button"
                className="btn btn-light border text-dark"
                style={{ borderColor: "#cbd5e1" }}
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
              <button
                type="button"
                className="btn btn-light border text-dark"
                style={{ borderColor: "#cbd5e1" }}
                disabled={page >= pagination.totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* LEAD DETAIL MODAL */}
      {selectedLead && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.5)",
            backdropFilter: "blur(6px)",
            zIndex: 1060,
          }}
        >
          <div
            className="rounded-4 overflow-hidden w-100 shadow-2xl"
            style={{
              maxWidth: "600px",
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
          >
            {/* Header */}
            <div
              className="p-3 px-4 d-flex align-items-center justify-content-between border-bottom"
              style={{ borderColor: "#f1f5f9" }}
            >
              <div className="d-flex align-items-center gap-2">
                <Users size={18} className="text-warning" />
                <h4 className="h6 fw-bold mb-0" style={{ color: "#0f172a" }}>Prospect Inquiry Details</h4>
              </div>
              <button
                type="button"
                className="btn btn-link text-secondary p-1"
                onClick={() => setSelectedLead(null)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                <div>
                  <h3 className="h5 fw-bold mb-1" style={{ color: "#0f172a" }}>{selectedLead.name}</h3>
                  <div className="small fw-semibold" style={{ color: "#b45309" }}>
                    Service: {selectedLead.service || "General Inquiry"}
                  </div>
                </div>
                <span
                  className="badge rounded-pill px-3 py-1.5 fw-bold"
                  style={{
                    ...getStatusStyle(selectedLead.status || "New"),
                    fontSize: "0.82rem",
                  }}
                >
                  {selectedLead.status || "New"}
                </span>
              </div>

              {/* Info Grid */}
              <div
                className="p-3 rounded-3 mb-3"
                style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}
              >
                <div className="row g-2 small">
                  <div className="col-12 col-sm-6">
                    <span className="d-block mb-0.5" style={{ color: "#64748b" }}>Email:</span>
                    {selectedLead.email ? (
                      <a
                        href={`mailto:${selectedLead.email}`}
                        className="text-decoration-none fw-semibold"
                        style={{ color: "#0284c7" }}
                      >
                        {selectedLead.email}
                      </a>
                    ) : (
                      <span style={{ color: "#94a3b8" }}>None</span>
                    )}
                  </div>

                  <div className="col-12 col-sm-6">
                    <span className="d-block mb-0.5" style={{ color: "#64748b" }}>Phone:</span>
                    {selectedLead.phone ? (
                      <a
                        href={`tel:${selectedLead.phone}`}
                        className="text-decoration-none fw-semibold"
                        style={{ color: "#b45309" }}
                      >
                        {selectedLead.phone}
                      </a>
                    ) : (
                      <span style={{ color: "#94a3b8" }}>None</span>
                    )}
                  </div>

                  {selectedLead.domain && (
                    <div className="col-12 col-sm-6 mt-2">
                      <span className="d-block mb-0.5" style={{ color: "#64748b" }}>Company / Domain:</span>
                      <span className="fw-medium" style={{ color: "#0f172a" }}>{selectedLead.domain}</span>
                    </div>
                  )}

                  {selectedLead.city && (
                    <div className="col-12 col-sm-6 mt-2">
                      <span className="d-block mb-0.5" style={{ color: "#64748b" }}>City:</span>
                      <span className="fw-medium" style={{ color: "#0f172a" }}>{selectedLead.city}</span>
                    </div>
                  )}

                  <div className="col-12 mt-2 pt-2 border-top" style={{ borderColor: "#e2e8f0" }}>
                    <span className="d-block mb-0.5" style={{ color: "#64748b" }}>Submitted:</span>
                    <span style={{ color: "#334155" }}>
                      {new Date(selectedLead.createdAt).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="mb-3">
                <label className="small fw-semibold mb-1 d-block" style={{ color: "#334155" }}>
                  Message / Requirements:
                </label>
                <div
                  className="p-3 rounded-3 small"
                  style={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    color: "#0f172a",
                    lineHeight: "1.7",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {selectedLead.message || "No message provided."}
                </div>
              </div>

              {/* Quick Status Bar */}
              <div className="d-flex align-items-center justify-content-between gap-2 pt-2 border-top" style={{ borderColor: "#f1f5f9" }}>
                <span className="small" style={{ color: "#64748b" }}>Update Status:</span>
                <div className="btn-group btn-group-sm">
                  {["New", "Contacted", "Qualified", "Closed"].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(selectedLead._id, st)}
                      className={`btn ${
                        selectedLead.status === st
                          ? "btn-warning text-dark fw-bold shadow-sm"
                          : "btn-light border text-secondary"
                      }`}
                      style={{ fontSize: "0.75rem", borderColor: "#cbd5e1" }}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
