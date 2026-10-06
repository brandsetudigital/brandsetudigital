import React, { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";
import {
  UploadCloud,
  Image as ImageIcon,
  Trash2,
  Link as LinkIcon,
  RefreshCw,
  AlertCircle,
  Check,
} from "lucide-react";

export default function ImageUploadField({
  label = "Image",
  value = "",
  onChange,
  required = false,
  helperText = "Recommended: WEBP, PNG, JPG under 5MB (1200x630 for best social sharing)",
}) {
  const { authFetch } = useAuth();
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState("upload"); // 'upload' | 'url'
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  // Handle actual file upload
  const handleFile = async (file) => {
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File exceeds 5MB limit. Please choose a smaller image.");
      return;
    }

    // Validate type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setUploadError("Only JPG, JPEG, PNG, and WEBP images are supported.");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await authFetch(`${API_BASE_URL}/api/admin/media/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Build image URL
        const imageUrl = data.media.url.startsWith("http")
          ? data.media.url
          : `${API_BASE_URL}${data.media.url}`;

        if (onChange) {
          onChange(imageUrl);
        }
      } else {
        setUploadError(data.message || "Failed to upload image. Please try again.");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      setUploadError("Network error while uploading image.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClear = () => {
    if (onChange) onChange("");
  };

  return (
    <div className="mb-3">
      {/* Label and Mode Switcher */}
      <div className="d-flex align-items-center justify-content-between mb-2">
        <label className="form-label small fw-semibold mb-0" style={{ color: "#334155" }}>
          {label} {required && <span className="text-danger">*</span>}
        </label>
        <div
          className="btn-group btn-group-sm p-0.5 rounded-pill"
          style={{ backgroundColor: "#f1f5f9", border: "1px solid #e2e8f0" }}
        >
          <button
            type="button"
            className={`btn btn-xs rounded-pill px-2.5 py-0.5 ${
              activeTab === "upload" ? "bg-warning text-dark fw-bold shadow-sm" : "text-secondary"
            }`}
            style={{ fontSize: "0.72rem" }}
            onClick={() => setActiveTab("upload")}
          >
            <UploadCloud size={12} className="me-1" />
            Upload File
          </button>
          <button
            type="button"
            className={`btn btn-xs rounded-pill px-2.5 py-0.5 ${
              activeTab === "url" ? "bg-warning text-dark fw-bold shadow-sm" : "text-secondary"
            }`}
            style={{ fontSize: "0.72rem" }}
            onClick={() => setActiveTab("url")}
          >
            <LinkIcon size={12} className="me-1" />
            Paste URL
          </button>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp, image/jpg"
        className="d-none"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      {/* ERROR ALERT */}
      {uploadError && (
        <div
          className="alert alert-danger d-flex align-items-center gap-2 py-2 px-3 rounded-3 mb-2 small"
          style={{ backgroundColor: "#fee2e2", color: "#b91c1c", border: "1px solid #fecaca" }}
        >
          <AlertCircle size={14} className="flex-shrink-0" />
          <span className="flex-grow-1">{uploadError}</span>
          <button
            type="button"
            className="btn-close small p-1"
            onClick={() => setUploadError("")}
          />
        </div>
      )}

      {/* IF VALUE EXISTS -> PREVIEW BOX */}
      {value ? (
        <div
          className="rounded-3 overflow-hidden p-2 position-relative"
          style={{
            backgroundColor: "#f8fafc",
            border: "1px solid #cbd5e1",
          }}
        >
          <div
            className="rounded-2 overflow-hidden position-relative"
            style={{ height: "150px", backgroundColor: "#f1f5f9" }}
          >
            <img
              src={value}
              alt="Selected"
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div
              className="position-absolute top-0 end-0 p-2 d-flex gap-1"
              style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)" }}
            >
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn btn-sm rounded-pill p-1.5 px-2.5 d-flex align-items-center gap-1 shadow"
                style={{ fontSize: "0.75rem", backgroundColor: "#ffffff", color: "#0f172a", border: "1px solid #cbd5e1" }}
                title="Change Image"
              >
                <RefreshCw size={12} /> Replace
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="btn btn-danger btn-sm rounded-pill p-1.5 px-2.5 d-flex align-items-center gap-1 shadow"
                style={{ fontSize: "0.75rem" }}
                title="Remove Image"
              >
                <Trash2 size={12} /> Remove
              </button>
            </div>
            <div className="position-absolute bottom-0 start-0 p-2 w-100">
              <span
                className="badge bg-success text-white rounded-pill px-2 py-1 small d-inline-flex align-items-center gap-1"
                style={{ fontSize: "0.68rem" }}
              >
                <Check size={10} /> Image Ready
              </span>
            </div>
          </div>

          <div className="mt-2 px-1 d-flex align-items-center justify-content-between">
            <span
              className="small text-truncate me-2 font-monospace"
              style={{ fontSize: "0.72rem", maxWidth: "250px", color: "#64748b" }}
              title={value}
            >
              {value}
            </span>
            <button
              type="button"
              className="btn btn-link p-0 text-decoration-none small fw-semibold"
              style={{ fontSize: "0.72rem", color: "#b45309" }}
              onClick={() => {
                navigator.clipboard.writeText(value);
              }}
            >
              Copy Link
            </button>
          </div>
        </div>
      ) : activeTab === "upload" ? (
        /* UPLOAD DROPZONE */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className="rounded-3 p-3 text-center cursor-pointer transition-all"
          style={{
            backgroundColor: isDragOver ? "#fef3c7" : "#f8fafc",
            border: isDragOver
              ? "2px dashed #f59e0b"
              : "2px dashed #cbd5e1",
            cursor: isUploading ? "wait" : "pointer",
          }}
        >
          {isUploading ? (
            <div className="py-2">
              <div className="spinner-border spinner-border-sm text-warning mb-2" role="status" />
              <div className="small" style={{ color: "#334155" }}>Uploading image to server...</div>
            </div>
          ) : (
            <div className="py-1">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle mb-2"
                style={{
                  width: "42px",
                  height: "42px",
                  backgroundColor: "#fef3c7",
                  color: "#d97706",
                  border: "1px solid #fde68a",
                }}
              >
                <UploadCloud size={20} />
              </div>
              <div className="small fw-semibold mb-0.5" style={{ color: "#0f172a" }}>
                Click to upload or drag & drop
              </div>
              <div className="small" style={{ fontSize: "0.75rem", color: "#64748b" }}>
                WEBP, PNG, JPG or JPEG (Max 5MB)
              </div>
            </div>
          )}
        </div>
      ) : (
        /* MANUAL URL INPUT */
        <div>
          <div className="input-group input-group-sm">
            <span
              className="input-group-text"
              style={{ backgroundColor: "#f8fafc", borderColor: "#cbd5e1", color: "#64748b" }}
            >
              <ImageIcon size={14} />
            </span>
            <input
              type="text"
              className="form-control form-control-sm"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="/assets/SEO.jpg or https://..."
              style={{
                backgroundColor: "#f8fafc",
                borderColor: "#cbd5e1",
                color: "#0f172a",
              }}
            />
          </div>
          <div className="mt-1" style={{ fontSize: "0.72rem", color: "#64748b" }}>
            Paste a public URL or asset path
          </div>
        </div>
      )}

      {helperText && !value && (
        <div className="mt-1" style={{ fontSize: "0.72rem", color: "#64748b" }}>
          {helperText}
        </div>
      )}
    </div>
  );
}
