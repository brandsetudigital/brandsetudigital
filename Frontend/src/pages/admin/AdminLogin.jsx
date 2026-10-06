import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Lock, Mail, Eye, EyeOff, AlertCircle, ShieldCheck } from "lucide-react";
import logo from "../../assets/Logo.webp";
import Seo from "../../components/Seo";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      const target = location.state?.from?.pathname || "/admin/dashboard";
      navigate(target, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const validateForm = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = "Admin email address is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login(email.trim(), password);

      if (result.success) {
        const target = location.state?.from?.pathname || "/admin/dashboard";
        navigate(target, { replace: true });
      } else {
        setErrorMessage(
          result.message || "Invalid credentials. Please verify email and password."
        );
      }
    } catch (err) {
      setErrorMessage("Network error: Could not reach the authentication server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center px-3 py-5"
      style={{
        backgroundColor: "#f8fafc",
        backgroundImage:
          "radial-gradient(circle at 50% 20%, rgba(250, 204, 21, 0.08) 0%, #f8fafc 70%)",
      }}
    >
      <Seo
        title="Admin Login | BrandSetu Digital"
        description="BrandSetu Digital Internal Administration Portal"
        path="/admin/login"
        noindex={true}
      />

      <div
        className="w-100"
        style={{
          maxWidth: "440px",
        }}
      >
        {/* Brand Header */}
        <div className="text-center mb-4">
          <Link to="/" className="d-inline-flex align-items-center gap-2 text-decoration-none mb-3">
            <img
              src={logo}
              alt="BrandSetu Digital Logo"
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                border: "2px solid #facc15",
                objectFit: "contain",
                background: "#000",
              }}
            />
          </Link>
          <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
            <ShieldCheck size={18} className="text-warning" />
            <span
              className="badge rounded-pill px-3 py-1 text-uppercase fw-semibold"
              style={{
                fontSize: "0.75rem",
                letterSpacing: "1px",
                backgroundColor: "#fef3c7",
                color: "#92400e",
                border: "1px solid #fde68a",
              }}
            >
              Restricted Area
            </span>
          </div>
          <h1 className="h3 fw-bold mt-2 mb-1" style={{ color: "#0f172a" }}>BrandSetu Digital</h1>
          <p className="small mb-0" style={{ color: "#64748b" }}>Administrator Portal & Management System</p>
        </div>

        {/* Login Card */}
        <div
          className="p-4 p-sm-5 rounded-4 position-relative overflow-hidden"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
          }}
        >
          {/* Subtle Top Accent */}
          <div
            className="position-absolute top-0 start-0 end-0"
            style={{
              height: "4px",
              background: "linear-gradient(90deg, #ca8a04, #facc15, #ca8a04)",
            }}
          />

          {/* Error Alert */}
          {errorMessage && (
            <div
              className="alert alert-danger d-flex align-items-center gap-2 border-0 rounded-3 py-2 px-3 mb-4"
              style={{ backgroundColor: "#fee2e2", color: "#b91c1c", border: "1px solid #fecaca" }}
              role="alert"
            >
              <AlertCircle size={18} className="flex-shrink-0" />
              <div className="small fw-medium">{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Email Field */}
            <div className="mb-3">
              <label
                htmlFor="admin-email"
                className="form-label small fw-semibold d-flex align-items-center gap-2"
                style={{ color: "#334155" }}
              >
                <Mail size={14} className="text-warning" /> Email Address
              </label>
              <div className="position-relative">
                <input
                  id="admin-email"
                  type="email"
                  className={`form-control ${
                    fieldErrors.email ? "is-invalid" : ""
                  }`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: null });
                  }}
                  placeholder="admin@brandsetudigital.com"
                  autoComplete="email"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: "#f8fafc",
                    borderColor: fieldErrors.email ? "#ef4444" : "#cbd5e1",
                    color: "#0f172a",
                    padding: "0.75rem 1rem",
                    borderRadius: "10px",
                  }}
                />
                {fieldErrors.email && (
                  <div className="invalid-feedback small mt-1">{fieldErrors.email}</div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="admin-password"
                className="form-label small fw-semibold d-flex align-items-center gap-2"
                style={{ color: "#334155" }}
              >
                <Lock size={14} className="text-warning" /> Password
              </label>
              <div className="position-relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${
                    fieldErrors.password ? "is-invalid" : ""
                  }`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: null });
                  }}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: "#f8fafc",
                    borderColor: fieldErrors.password ? "#ef4444" : "#cbd5e1",
                    color: "#0f172a",
                    padding: "0.75rem 2.8rem 0.75rem 1rem",
                    borderRadius: "10px",
                  }}
                />
                <button
                  type="button"
                  className="btn btn-link position-absolute end-0 top-50 translate-middle-y p-2 pe-3"
                  style={{ color: "#64748b", textDecoration: "none" }}
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                {fieldErrors.password && (
                  <div className="invalid-feedback small mt-1">{fieldErrors.password}</div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn w-100 fw-bold py-3 rounded-3 d-flex align-items-center justify-content-center gap-2 transition-all shadow"
              style={{
                backgroundColor: "#facc15",
                color: "#111827",
                border: "none",
                fontWeight: "600",
                letterSpacing: "0.5px",
              }}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Lock size={16} />
                  <span>Login to Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-4 pt-3 border-top text-center" style={{ borderColor: "#e2e8f0" }}>
            <p className="small mb-0" style={{ fontSize: "0.78rem", color: "#64748b" }}>
              Authorized administrator access only. All login attempts and IP activity are monitored.
            </p>
          </div>
        </div>

        {/* Back to Public Site Link */}
        <div className="text-center mt-3">
          <Link
            to="/"
            className="text-decoration-none small"
            style={{ color: "#64748b" }}
          >
            ← Return to BrandSetu Digital Public Site
          </Link>
        </div>
      </div>
    </div>
  );
}
