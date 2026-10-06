import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Link2,
  Image as ImageIcon,
  Code,
  Heading2,
  Heading3,
  Pilcrow,
  Undo,
  Redo,
  RemoveFormatting,
  UploadCloud,
  X,
  AlertCircle,
  Link as LinkIcon,
} from "lucide-react";

export default function RichTextEditor({ value = "", onChange, placeholder = "Write your article content here..." }) {
  const { authFetch } = useAuth();
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [htmlContent, setHtmlContent] = useState(value);

  // Image Upload Dialog State
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalTab, setModalTab] = useState("upload"); // 'upload' | 'url'
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [imageAltInput, setImageAltInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  // Sync incoming value
  useEffect(() => {
    if (editorRef.current && !isHtmlMode && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
    setHtmlContent(value || "");
  }, [value, isHtmlMode]);

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setHtmlContent(html);
      if (onChange) onChange(html);
    }
  };

  const handleHtmlChange = (e) => {
    const val = e.target.value;
    setHtmlContent(val);
    if (onChange) onChange(val);
  };

  const format = (command, val = null) => {
    if (isHtmlMode) return;
    editorRef.current?.focus();
    document.execCommand(command, false, val);
    handleInput();
  };

  const handleFormatBlock = (tag) => {
    if (isHtmlMode) return;
    editorRef.current?.focus();
    document.execCommand("formatBlock", false, `<${tag}>`);
    handleInput();
  };

  const handleCreateLink = () => {
    if (isHtmlMode) return;
    const url = prompt("Enter the destination URL (e.g. https://... or /services/seo):");
    if (url) {
      format("createLink", url);
    }
  };

  const insertImageHtml = (url, alt) => {
    const altText = alt || "BrandSetu Digital Article Image";
    if (isHtmlMode) {
      const imgTag = `\n<img src="${url}" alt="${altText}" class="img-fluid rounded-3 my-3 shadow-sm" />\n`;
      const nextContent = htmlContent + imgTag;
      setHtmlContent(nextContent);
      if (onChange) onChange(nextContent);
      return;
    }

    editorRef.current?.focus();
    const imgHtml = `<p><img src="${url}" alt="${altText}" class="img-fluid rounded-3 my-3 shadow-sm" /></p><p><br></p>`;
    document.execCommand("insertHTML", false, imgHtml);
    handleInput();
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image file size must be under 5MB.");
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setImageError("Only JPG, JPEG, PNG, and WEBP images are supported.");
      return;
    }

    setIsUploading(true);
    setImageError("");

    const formData = new FormData();
    formData.append("image", file);
    if (imageAltInput.trim()) {
      formData.append("altText", imageAltInput.trim());
    }

    try {
      const res = await authFetch(`${API_BASE_URL}/api/admin/media/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const fullUrl = data.media.url.startsWith("http")
          ? data.media.url
          : `${API_BASE_URL}${data.media.url}`;

        insertImageHtml(fullUrl, imageAltInput.trim() || file.name.split(".")[0]);
        setShowImageModal(false);
        setImageUrlInput("");
        setImageAltInput("");
      } else {
        setImageError(data.message || "Failed to upload image.");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      setImageError("Network error while uploading image.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleInsertManualUrl = (e) => {
    e.preventDefault();
    if (!imageUrlInput.trim()) {
      setImageError("Please enter a valid image URL.");
      return;
    }
    insertImageHtml(imageUrlInput.trim(), imageAltInput.trim());
    setShowImageModal(false);
    setImageUrlInput("");
    setImageAltInput("");
  };

  const handleInsertImage = () => {
    setImageError("");
    setShowImageModal(true);
  };

  return (
    <div
      className="rounded-3 overflow-hidden shadow-sm"
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #cbd5e1",
      }}
    >
      {/* TOOLBAR */}
      <div
        className="d-flex flex-wrap align-items-center gap-1 p-2 border-bottom"
        style={{
          backgroundColor: "#f8fafc",
          borderColor: "#e2e8f0",
        }}
      >
        {/* Headings */}
        <div className="btn-group btn-group-sm me-1">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary py-1 px-2"
            style={{ backgroundColor: "#ffffff", borderColor: "#cbd5e1", color: "#334155" }}
            onClick={() => handleFormatBlock("p")}
            title="Paragraph"
          >
            <Pilcrow size={14} />
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary py-1 px-2 fw-bold"
            style={{ backgroundColor: "#ffffff", borderColor: "#cbd5e1", color: "#334155" }}
            onClick={() => handleFormatBlock("h2")}
            title="Heading 2 (H2)"
          >
            <Heading2 size={15} />
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary py-1 px-2 fw-bold"
            style={{ backgroundColor: "#ffffff", borderColor: "#cbd5e1", color: "#334155" }}
            onClick={() => handleFormatBlock("h3")}
            title="Heading 3 (H3)"
          >
            <Heading3 size={15} />
          </button>
        </div>

        {/* Text styling */}
        <div className="btn-group btn-group-sm me-1">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary py-1 px-2"
            style={{ backgroundColor: "#ffffff", borderColor: "#cbd5e1", color: "#334155" }}
            onClick={() => format("bold")}
            title="Bold (Ctrl+B)"
          >
            <Bold size={14} />
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary py-1 px-2"
            style={{ backgroundColor: "#ffffff", borderColor: "#cbd5e1", color: "#334155" }}
            onClick={() => format("italic")}
            title="Italic (Ctrl+I)"
          >
            <Italic size={14} />
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary py-1 px-2"
            style={{ backgroundColor: "#ffffff", borderColor: "#cbd5e1", color: "#334155" }}
            onClick={() => format("underline")}
            title="Underline"
          >
            <Underline size={14} />
          </button>
        </div>

        {/* Lists */}
        <div className="btn-group btn-group-sm me-1">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary py-1 px-2"
            style={{ backgroundColor: "#ffffff", borderColor: "#cbd5e1", color: "#334155" }}
            onClick={() => format("insertUnorderedList")}
            title="Bullet List"
          >
            <List size={14} />
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary py-1 px-2"
            style={{ backgroundColor: "#ffffff", borderColor: "#cbd5e1", color: "#334155" }}
            onClick={() => format("insertOrderedList")}
            title="Numbered List"
          >
            <ListOrdered size={14} />
          </button>
        </div>

        {/* Elements */}
        <div className="btn-group btn-group-sm me-1">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary py-1 px-2"
            style={{ backgroundColor: "#ffffff", borderColor: "#cbd5e1", color: "#334155" }}
            onClick={() => handleFormatBlock("blockquote")}
            title="Blockquote"
          >
            <Quote size={14} />
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary py-1 px-2"
            style={{ backgroundColor: "#ffffff", borderColor: "#cbd5e1", color: "#334155" }}
            onClick={handleCreateLink}
            title="Insert Link"
          >
            <Link2 size={14} />
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary py-1 px-2"
            style={{ backgroundColor: "#ffffff", borderColor: "#cbd5e1", color: "#334155" }}
            onClick={handleInsertImage}
            title="Insert Image URL"
          >
            <ImageIcon size={14} />
          </button>
        </div>

        {/* Utilities */}
        <div className="btn-group btn-group-sm me-1">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary py-1 px-2"
            style={{ backgroundColor: "#ffffff", borderColor: "#cbd5e1", color: "#334155" }}
            onClick={() => format("removeFormat")}
            title="Clear Formatting"
          >
            <RemoveFormatting size={14} />
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary py-1 px-2"
            style={{ backgroundColor: "#ffffff", borderColor: "#cbd5e1", color: "#334155" }}
            onClick={() => format("undo")}
            title="Undo"
          >
            <Undo size={14} />
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary py-1 px-2"
            style={{ backgroundColor: "#ffffff", borderColor: "#cbd5e1", color: "#334155" }}
            onClick={() => format("redo")}
            title="Redo"
          >
            <Redo size={14} />
          </button>
        </div>

        {/* Toggle HTML Code mode */}
        <button
          type="button"
          className={`btn btn-sm ms-auto ${
            isHtmlMode
              ? "btn-warning text-dark fw-bold"
              : "btn-outline-secondary"
          } py-1 px-2.5 small d-flex align-items-center gap-1.5`}
          style={!isHtmlMode ? { backgroundColor: "#ffffff", borderColor: "#cbd5e1", color: "#334155" } : {}}
          onClick={() => {
            if (isHtmlMode) {
              // Exiting HTML mode, apply text to editorRef
              if (editorRef.current) {
                editorRef.current.innerHTML = htmlContent;
              }
            }
            setIsHtmlMode(!isHtmlMode);
          }}
          title="Toggle Raw HTML mode"
        >
          <Code size={14} />
          <span style={{ fontSize: "0.78rem" }}>
            {isHtmlMode ? "Visual Editor" : "HTML Source"}
          </span>
        </button>
      </div>

      {/* EDITOR AREA */}
      {isHtmlMode ? (
        <textarea
          value={htmlContent}
          onChange={handleHtmlChange}
          rows={14}
          className="form-control font-monospace border-0 rounded-0 p-3"
          placeholder="Paste or write raw semantic HTML here..."
          style={{
            backgroundColor: "#f8fafc",
            color: "#0f172a",
            fontSize: "0.9rem",
            lineHeight: "1.6",
            resize: "vertical",
          }}
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          className="p-3 rich-editor-content"
          style={{
            backgroundColor: "#ffffff",
            color: "#0f172a",
            minHeight: "320px",
            outline: "none",
            fontSize: "1rem",
            lineHeight: "1.8",
          }}
          data-placeholder={placeholder}
        />
      )}

      {/* Editor Styles */}
      <style>{`
        .rich-editor-content:empty:before {
          content: attr(data-placeholder);
          color: #94a3b8;
          pointer-events: none;
        }
        .rich-editor-content h2 {
          color: #b45309;
          font-weight: 700;
          font-size: 1.5rem;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .rich-editor-content h3 {
          color: #0f172a;
          font-weight: 600;
          font-size: 1.25rem;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .rich-editor-content p {
          color: #334155;
          margin-bottom: 1rem;
        }
        .rich-editor-content ul, .rich-editor-content ol {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
          color: #334155;
        }
        .rich-editor-content blockquote {
          border-left: 4px solid #f59e0b;
          padding-left: 1rem;
          margin: 1.25rem 0;
          font-style: italic;
          color: #92400e;
          background: #fef3c7;
          padding: 0.75rem 1rem;
          border-radius: 0 8px 8px 0;
        }
        .rich-editor-content a {
          color: #2563eb;
          text-decoration: underline;
        }
        .rich-editor-content img {
          max-width: 100%;
          border-radius: 8px;
          margin: 1rem 0;
        }
      `}</style>

      {/* INSERT IMAGE MODAL */}
      {showImageModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 1070,
          }}
        >
          <div
            className="rounded-4 overflow-hidden d-flex flex-column w-100 shadow-2xl"
            style={{
              maxWidth: "500px",
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
            }}
          >
            {/* Modal Header */}
            <div className="d-flex align-items-center justify-content-between p-3 border-bottom" style={{ borderColor: "#e2e8f0" }}>
              <div className="d-flex align-items-center gap-2">
                <ImageIcon size={18} className="text-warning" />
                <h5 className="h6 fw-bold mb-0" style={{ color: "#0f172a" }}>Insert Image into Article</h5>
              </div>
              <button
                type="button"
                className="btn btn-link p-1"
                style={{ color: "#64748b" }}
                onClick={() => setShowImageModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-3">
              {/* Tab Selector */}
              <div className="d-flex gap-2 mb-3 p-1 rounded-pill" style={{ backgroundColor: "#f1f5f9", border: "1px solid #e2e8f0" }}>
                <button
                  type="button"
                  className={`btn btn-sm flex-grow-1 rounded-pill ${
                    modalTab === "upload" ? "bg-warning text-dark fw-bold shadow-sm" : "text-secondary"
                  }`}
                  onClick={() => setModalTab("upload")}
                >
                  <UploadCloud size={14} className="me-1" /> Upload Image
                </button>
                <button
                  type="button"
                  className={`btn btn-sm flex-grow-1 rounded-pill ${
                    modalTab === "url" ? "bg-warning text-dark fw-bold shadow-sm" : "text-secondary"
                  }`}
                  onClick={() => setModalTab("url")}
                >
                  <LinkIcon size={14} className="me-1" /> Image URL
                </button>
              </div>

              {/* Alt text field */}
              <div className="mb-3">
                <label className="form-label small fw-semibold" style={{ color: "#334155" }}>
                  Alt Text / Description (for SEO)
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={imageAltInput}
                  onChange={(e) => setImageAltInput(e.target.value)}
                  placeholder="e.g. SEO Performance Growth Chart"
                  style={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #cbd5e1",
                    color: "#0f172a",
                  }}
                />
              </div>

              {imageError && (
                <div
                  className="alert alert-danger d-flex align-items-center gap-2 py-2 px-3 rounded-3 mb-3 small"
                  style={{ backgroundColor: "#fee2e2", color: "#b91c1c", border: "1px solid #fecaca" }}
                >
                  <AlertCircle size={14} className="flex-shrink-0" />
                  <span>{imageError}</span>
                </div>
              )}

              {modalTab === "upload" ? (
                /* UPLOAD DROPZONE */
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/webp, image/jpg"
                    className="d-none"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                  />
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragOver(true);
                    }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragOver(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleFileUpload(e.dataTransfer.files[0]);
                      }
                    }}
                    onClick={() => !isUploading && fileInputRef.current?.click()}
                    className="p-4 text-center rounded-3 cursor-pointer"
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
                      <div>
                        <UploadCloud size={28} className="text-warning mb-2" />
                        <div className="small fw-semibold mb-1" style={{ color: "#0f172a" }}>
                          Click to browse image or drag & drop here
                        </div>
                        <div className="small" style={{ fontSize: "0.75rem", color: "#64748b" }}>
                          Supports WEBP, PNG, JPG, JPEG (Max 5MB)
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* PASTE URL FORM */
                <form onSubmit={handleInsertManualUrl}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold" style={{ color: "#334155" }}>
                      Image URL <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      style={{
                        backgroundColor: "#f8fafc",
                        border: "1px solid #cbd5e1",
                        color: "#0f172a",
                      }}
                    />
                  </div>
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      style={{ borderColor: "#cbd5e1", color: "#334155" }}
                      onClick={() => setShowImageModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-sm btn-warning text-dark fw-bold px-3"
                    >
                      Insert Image
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
