import React, { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";
import {
  UploadCloud,
  Copy,
  Check,
  Trash2,
  Search,
  RefreshCw,
  FolderOpen,
  AlertCircle,
} from "lucide-react";

export default function AdminMedia() {
  const { authFetch } = useAuth();
  const [mediaList, setMediaList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef(null);

  const fetchMedia = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit: 20,
        search: searchQuery.trim(),
      });
      const res = await authFetch(`${API_BASE_URL}/api/admin/media?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setMediaList(data.media || []);
          setPagination(data.pagination || { total: 0, totalPages: 1 });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [authFetch, page, searchQuery]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  // Handle file upload
  const handleFileUpload = async (file) => {
    if (!file) return;

    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowed.includes(file.type.toLowerCase())) {
      setErrorMessage("Invalid file type. Please upload JPG, JPEG, PNG, or WEBP images.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("File size exceeds 5MB limit. Please compress the image first.");
      return;
    }

    setIsUploading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await authFetch(`${API_BASE_URL}/api/admin/media/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMessage(`"${file.name}" uploaded successfully!`);
        fetchMedia();
      } else {
        setErrorMessage(data.message || "Failed to upload image.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Network error during file upload.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleCopyUrl = (item) => {
    const fullUrl = item.url.startsWith("http")
      ? item.url
      : `${API_BASE_URL}${item.url}`;

    navigator.clipboard.writeText(fullUrl);
    setCopiedId(item._id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete image "${item.filename}" permanently?`)) return;

    try {
      const res = await authFetch(`${API_BASE_URL}/api/admin/media/${item._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchMedia();
      } else {
        alert("Failed to delete image.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error deleting image.");
    }
  };

  const formatBytes = (bytes) => {
    if (!bytes) return "0 KB";
    const k = 1024;
    const dm = 1;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
        <div>
          <h1 className="h3 fw-bold mb-1" style={{ color: "#0f172a" }}>Media Management</h1>
          <p className="mb-0 small" style={{ color: "#64748b" }}>
            Upload, preview, and manage high-performance visual assets (WEBP, PNG, JPG).
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            onClick={fetchMedia}
            disabled={isLoading}
            className="btn btn-sm d-flex align-items-center gap-2 px-3 py-2 rounded-3"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #cbd5e1",
              color: "#334155",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            <RefreshCw size={15} className={isLoading ? "spin-animation" : ""} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Alerts */}
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
          <div className="small fw-medium">{successMessage}</div>
        </div>
      )}

      {/* UPLOAD DROPZONE */}
      <div
        className="p-4 p-md-5 rounded-4 mb-4 text-center transition-all cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          backgroundColor: "#ffffff",
          border: "2px dashed #cbd5e1",
          borderRadius: "16px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
          cursor: "pointer",
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept=".jpg,.jpeg,.png,.webp"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileUpload(e.target.files[0]);
            }
          }}
        />

        <div
          className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
          style={{
            width: "56px",
            height: "56px",
            backgroundColor: "#fef3c7",
            color: "#d97706",
            border: "1px solid #fde68a",
          }}
        >
          {isUploading ? (
            <div className="spinner-border text-warning spinner-border-sm" role="status" />
          ) : (
            <UploadCloud size={28} />
          )}
        </div>

        <h3 className="h6 fw-bold mb-1" style={{ color: "#0f172a" }}>
          {isUploading ? "Uploading Image to Server..." : "Click or Drag & Drop Image Here to Upload"}
        </h3>
        <p className="small mb-2" style={{ color: "#64748b" }}>
          Supports <strong style={{ color: "#0f172a" }}>WEBP (Recommended)</strong>, PNG, JPG, and JPEG up to 5MB.
        </p>
        <span
          className="badge rounded-pill px-3 py-1 small"
          style={{
            backgroundColor: "#f8fafc",
            color: "#475569",
            border: "1px solid #e2e8f0",
          }}
        >
          Max file size: 5 MB
        </span>
      </div>

      {/* SEARCH AND ASSET STATS */}
      <div
        className="p-3 rounded-4 mb-4 d-flex align-items-center justify-content-between flex-wrap gap-3"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.03)",
          borderRadius: "12px",
        }}
      >
        <div className="position-relative" style={{ maxWidth: "340px", width: "100%" }}>
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
            placeholder="Search images by filename..."
            style={{
              backgroundColor: "#f8fafc",
              border: "1px solid #cbd5e1",
              color: "#0f172a",
              paddingLeft: "2.3rem",
              borderRadius: "8px",
            }}
          />
        </div>

        <span className="small" style={{ color: "#64748b" }}>
          Total Media Assets: <strong style={{ color: "#b45309" }}>{pagination.total}</strong>
        </span>
      </div>

      {/* MEDIA GALLERY GRID */}
      {isLoading ? (
        <div className="text-center py-5 small" style={{ color: "#64748b" }}>
          <div className="spinner-border spinner-border-sm text-warning me-2" role="status" />
          Loading media library...
        </div>
      ) : mediaList.length === 0 ? (
        <div
          className="p-5 rounded-4 text-center"
          style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}
        >
          <FolderOpen size={42} className="mb-3" style={{ color: "#94a3b8" }} />
          <h4 className="h6 fw-bold mb-1" style={{ color: "#0f172a" }}>No media files found</h4>
          <p className="small mb-0" style={{ color: "#64748b" }}>
            Use the upload area above to add your first article image or banner.
          </p>
        </div>
      ) : (
        <div className="row g-3">
          {mediaList.map((item) => {
            const fullUrl = item.url.startsWith("http")
              ? item.url
              : `${API_BASE_URL}${item.url}`;
            const isCopied = copiedId === item._id;

            return (
              <div key={item._id} className="col-6 col-sm-4 col-md-3 col-xl-2">
                <div
                  className="rounded-3 overflow-hidden h-100 d-flex flex-column transition-all"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    className="position-relative d-flex align-items-center justify-content-center overflow-hidden"
                    style={{ aspectRatio: "4 / 3", backgroundColor: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}
                  >
                    <img
                      src={fullUrl}
                      alt={item.altText || item.filename}
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>

                  {/* Info & Action */}
                  <div className="p-2.5 d-flex flex-column justify-content-between flex-grow-1">
                    <div className="mb-2">
                      <div
                        className="small fw-semibold text-truncate"
                        title={item.filename}
                        style={{ fontSize: "0.8rem", color: "#0f172a" }}
                      >
                        {item.filename}
                      </div>
                      <div className="small" style={{ fontSize: "0.72rem", color: "#64748b" }}>
                        {formatBytes(item.size)}
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-1.5 pt-2 border-top" style={{ borderColor: "#f1f5f9" }}>
                      <button
                        type="button"
                        onClick={() => handleCopyUrl(item)}
                        className="btn btn-sm w-100 py-1 px-2 d-flex align-items-center justify-content-center gap-1 small fw-semibold"
                        style={{
                          fontSize: "0.75rem",
                          backgroundColor: isCopied ? "#16a34a" : "#ffffff",
                          border: isCopied ? "none" : "1px solid #cbd5e1",
                          color: isCopied ? "#ffffff" : "#334155",
                        }}
                        title="Copy image URL to clipboard"
                      >
                        {isCopied ? <Check size={12} /> : <Copy size={12} />}
                        <span>{isCopied ? "Copied!" : "Copy URL"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(item)}
                        className="btn btn-sm btn-outline-danger p-1 rounded-2"
                        title="Delete image"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
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
            <span
              className="btn disabled fw-semibold"
              style={{
                backgroundColor: "#f8fafc",
                borderColor: "#cbd5e1",
                color: "#0f172a",
              }}
            >
              Page {page} of {pagination.totalPages}
            </span>
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
