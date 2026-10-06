import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config";
import ImageUploadField from "../../components/admin/ImageUploadField";
import {
  Key,
  User,
  CheckCircle2,
  AlertCircle,
  Lock,
} from "lucide-react";

export default function AdminSettings() {
  const { adminUser, authFetch } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState(
    () => localStorage.getItem("brandsetu_admin_avatar") || adminUser?.avatar || "/assets/brandsetu-avatar.png"
  );
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("All password fields are required.");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirmation password do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await authFetch(`${API_BASE_URL}/api/admin/auth/password`, {
        method: "PUT",
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage("Admin password updated successfully! Please use it on next login.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setErrorMessage(data.message || "Failed to update password.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Network error updating administrator credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px" }}>
      {/* Header */}
      <div className="mb-4">
        <h1 className="h3 fw-bold mb-1" style={{ color: "#0f172a" }}>Administrator Settings</h1>
        <p className="mb-0 small" style={{ color: "#64748b" }}>
          Manage your BrandSetu Digital administrator account credentials and security.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div
        className="p-4 rounded-4 mb-4"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)",
          borderRadius: "20px",
        }}
      >
        <h2 className="h6 fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: "#0f172a" }}>
          <User size={18} className="text-warning" />
          Administrator Account Profile
        </h2>

        <div className="row g-4 align-items-center">
          <div className="col-12 col-md-4">
            <ImageUploadField
              label="Admin Profile Picture"
              value={avatarUrl}
              onChange={(url) => {
                setAvatarUrl(url);
                localStorage.setItem("brandsetu_admin_avatar", url);
              }}
              helperText="Upload your official admin avatar photo"
            />
          </div>
          <div className="col-12 col-md-8">
            <div className="row g-3">
              <div className="col-12 col-sm-6">
                <label className="small d-block mb-1" style={{ color: "#64748b", fontWeight: 500 }}>Full Name</label>
                <div className="fw-semibold" style={{ color: "#0f172a" }}>{adminUser?.name || "BrandSetu Admin"}</div>
              </div>
              <div className="col-12 col-sm-6">
                <label className="small d-block mb-1" style={{ color: "#64748b", fontWeight: 500 }}>Email Address</label>
                <div className="fw-semibold" style={{ color: "#0f172a" }}>{adminUser?.email || "admin@brandsetudigital.com"}</div>
              </div>
              <div className="col-12 col-sm-6">
                <label className="small d-block mb-1" style={{ color: "#64748b", fontWeight: 500 }}>Role & Permissions</label>
                <span
                  className="d-inline-flex align-items-center gap-2 rounded-pill px-3 py-1 text-uppercase fw-bold"
                  style={{
                    fontSize: "0.78rem",
                    backgroundColor: "#fef3c7",
                    color: "#b45309",
                    border: "1px solid #fde68a",
                    letterSpacing: "0.5px",
                  }}
                >
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      backgroundColor: "#d97706",
                      display: "inline-block",
                    }}
                  />
                  {adminUser?.role || "ADMIN"}
                </span>
              </div>
              <div className="col-12 col-sm-6">
                <label className="small d-block mb-1" style={{ color: "#64748b", fontWeight: 500 }}>Security Status</label>
                <span
                  className="d-inline-flex align-items-center gap-2 rounded-pill px-3 py-1 fw-bold"
                  style={{
                    fontSize: "0.78rem",
                    backgroundColor: "#dcfce7",
                    color: "#15803d",
                    border: "1px solid #86efac",
                    letterSpacing: "0.3px",
                  }}
                >
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      backgroundColor: "#16a34a",
                      display: "inline-block",
                    }}
                  />
                  JWT Session Protected
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Card */}
      <div
        className="p-4 rounded-4"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)",
          borderRadius: "20px",
        }}
      >
        <h2 className="h6 fw-bold mb-1 d-flex align-items-center gap-2" style={{ color: "#0f172a" }}>
          <Key size={18} className="text-warning" />
          Change Admin Password
        </h2>
        <p className="small mb-4" style={{ color: "#64748b" }}>
          Ensure your account uses a strong, complex password. Passwords are encrypted with bcrypt.
        </p>

        {errorMessage && (
          <div
            className="alert d-flex align-items-center gap-2 rounded-3 p-3 mb-4"
            style={{ backgroundColor: "#fef2f2", color: "#b91c1c", border: "1px solid #fecaca" }}
          >
            <AlertCircle size={18} className="flex-shrink-0" />
            <div className="small fw-medium">{errorMessage}</div>
          </div>
        )}

        {successMessage && (
          <div
            className="alert d-flex align-items-center gap-2 rounded-3 p-3 mb-4"
            style={{ backgroundColor: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" }}
          >
            <CheckCircle2 size={18} className="flex-shrink-0" />
            <div className="small fw-medium">{successMessage}</div>
          </div>
        )}

        <form onSubmit={handlePasswordChange}>
          <div className="mb-3">
            <label className="form-label small fw-semibold" style={{ color: "#334155" }}>Current Password</label>
            <input
              type="password"
              className="form-control"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              disabled={isSubmitting}
              style={{
                backgroundColor: "#f8fafc",
                borderColor: "#cbd5e1",
                color: "#0f172a",
                borderRadius: "8px",
              }}
            />
          </div>

          <div className="row g-3 mb-4">
            <div className="col-12 col-sm-6">
              <label className="form-label small fw-semibold" style={{ color: "#334155" }}>New Password</label>
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                disabled={isSubmitting}
                style={{
                  backgroundColor: "#f8fafc",
                  borderColor: "#cbd5e1",
                  color: "#0f172a",
                  borderRadius: "8px",
                }}
              />
            </div>

            <div className="col-12 col-sm-6">
              <label className="form-label small fw-semibold" style={{ color: "#334155" }}>Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                disabled={isSubmitting}
                style={{
                  backgroundColor: "#f8fafc",
                  borderColor: "#cbd5e1",
                  color: "#0f172a",
                  borderRadius: "8px",
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-warning fw-bold text-dark rounded-3 px-4 py-2.5 small d-inline-flex align-items-center gap-2"
            style={{ boxShadow: "0 4px 12px rgba(245, 158, 11, 0.25)" }}
          >
            <Lock size={15} />
            <span>{isSubmitting ? "Updating Password..." : "Update Password"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
