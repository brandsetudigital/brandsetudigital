import React, { useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
  User,
  PlusCircle,
  Briefcase,
  Sparkles,
} from "lucide-react";
import logo from "../../assets/Logo.webp";
import Seo from "../Seo";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { adminUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out of BrandSetu Admin?")) {
      logout();
      navigate("/admin/login", { replace: true });
    }
  };

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Blogs", path: "/admin/blogs", icon: FileText },
    { label: "Media Library", path: "/admin/media", icon: ImageIcon },
    { label: "Leads", path: "/admin/leads", icon: Users },
    { label: "Job Applications", path: "/admin/careers", icon: Briefcase },
    { label: "Influencer Collabs", path: "/admin/influencers", icon: Sparkles },
    { label: "Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <div
      className="d-flex min-vh-100"
      style={{ backgroundColor: "#f8fafc", color: "#0f172a" }}
    >
      <Seo
        title="Admin Portal | BrandSetu Digital"
        description="BrandSetu Digital Internal Administration Dashboard"
        path={location.pathname}
        noindex={true}
      />

      {/* MOBILE BACKDROP */}
      {isSidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-lg-none"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 1040,
          }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`admin-sidebar d-flex flex-column position-fixed top-0 bottom-0 start-0 transition-all ${
          isSidebarOpen ? "translate-middle-x-0" : ""
        }`}
        style={{
          width: "260px",
          backgroundColor: "#ffffff",
          borderRight: "1px solid #e2e8f0",
          boxShadow: "2px 0 16px rgba(0, 0, 0, 0.03)",
          zIndex: 1045,
          transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {/* Sidebar Header */}
        <div
          className="p-3 d-flex align-items-center justify-content-between border-bottom"
          style={{ borderColor: "#f1f5f9" }}
        >
          <Link
            to="/admin/dashboard"
            className="d-flex align-items-center gap-2 text-decoration-none"
            onClick={() => setIsSidebarOpen(false)}
          >
            <img
              src={logo}
              alt="BrandSetu Logo"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                border: "1.5px solid #f59e0b",
                background: "#000",
              }}
            />
            <div>
              <div className="fw-bold fs-6 lh-1" style={{ color: "#0f172a" }}>BrandSetu</div>
              <span
                className="d-inline-block px-2 py-0.5 mt-1 rounded fw-semibold"
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.5px",
                  backgroundColor: "#fef3c7",
                  color: "#b45309",
                  border: "1px solid #fde68a",
                }}
              >
                ADMIN CONSOLE
              </span>
            </div>
          </Link>

          <button
            type="button"
            className="btn btn-link text-secondary d-lg-none p-1"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick New Blog Button in Sidebar */}
        <div className="p-3">
          <Link
            to="/admin/blogs/new"
            onClick={() => setIsSidebarOpen(false)}
            className="btn btn-warning w-100 d-flex align-items-center justify-content-center gap-2 fw-bold text-dark py-2 rounded-3 shadow-sm"
            style={{
              fontSize: "0.88rem",
              boxShadow: "0 4px 12px rgba(245, 158, 11, 0.25)",
            }}
          >
            <PlusCircle size={17} />
            <span>Create New Blog</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow-1 px-3 py-2 d-flex flex-column gap-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/admin/dashboard" &&
                location.pathname.startsWith(item.path));

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className="d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 text-decoration-none transition-all admin-nav-link"
                style={{
                  fontSize: "0.92rem",
                  backgroundColor: isActive
                    ? "#fffbeb"
                    : "transparent",
                  color: isActive ? "#b45309" : "#64748b",
                  borderLeft: isActive
                    ? "3px solid #f59e0b"
                    : "3px solid transparent",
                  fontWeight: isActive ? 600 : 500,
                }}
              >
                <Icon size={18} style={{ color: isActive ? "#f59e0b" : "#94a3b8" }} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer: User Info & Logout */}
        <div
          className="p-3 border-top"
          style={{ borderColor: "#f1f5f9" }}
        >
          <div className="d-flex align-items-center justify-content-between mb-3 px-1">
            <div className="d-flex align-items-center gap-2 overflow-hidden">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: "#fffbeb",
                  border: "1px solid #fde68a",
                  color: "#d97706",
                }}
              >
                <User size={18} />
              </div>
              <div className="overflow-hidden">
                <div
                  className="small fw-bold text-truncate"
                  style={{ color: "#0f172a" }}
                  title={adminUser?.email}
                >
                  {adminUser?.name || "Admin"}
                </div>
                <div
                  className="small text-truncate"
                  style={{ fontSize: "0.75rem", color: "#64748b" }}
                >
                  {adminUser?.email}
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 py-2 rounded-3 small fw-semibold"
            style={{ fontSize: "0.85rem" }}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div
        className="admin-main-wrapper flex-grow-1 d-flex flex-column min-vh-100"
        style={{
          marginLeft: "0",
          width: "100%",
          overflowX: "hidden",
        }}
      >
        {/* TOP BAR */}
        <header
          className="sticky-top px-3 px-md-4 py-2.5 d-flex align-items-center justify-content-between border-bottom"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.94)",
            backdropFilter: "blur(12px)",
            borderColor: "#e2e8f0",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
            zIndex: 1020,
          }}
        >
          <div className="d-flex align-items-center gap-2 gap-sm-3">
            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="btn btn-light p-2 border rounded-3 d-lg-none text-dark"
              style={{ borderColor: "#cbd5e1", backgroundColor: "#ffffff" }}
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>

            <div>
              <h2
                className="h6 mb-0 fw-bold d-flex align-items-center gap-2"
                style={{ letterSpacing: "0.3px", color: "#0f172a" }}
              >
                <Shield size={16} className="text-warning flex-shrink-0" />
                <span className="d-none d-sm-inline">BrandSetu Digital Admin</span>
                <span className="d-inline d-sm-none">BrandSetu Admin</span>
              </h2>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-secondary rounded-pill px-2.5 px-sm-3 py-1.5 d-inline-flex align-items-center gap-1.5 small"
              style={{
                fontSize: "0.82rem",
                borderColor: "#cbd5e1",
                backgroundColor: "#ffffff",
                color: "#475569",
              }}
            >
              <span className="d-none d-sm-inline">View Public Site</span>
              <span className="d-inline d-sm-none">Live Site</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </header>

        {/* PAGE OUTLET CONTAINER */}
        <main
          className="flex-grow-1 p-2.5 p-sm-3 p-md-4"
          style={{
            maxWidth: "1400px",
            width: "100%",
            margin: "0 auto",
            overflowX: "hidden",
          }}
        >
          <Outlet />
        </main>
      </div>

      {/* Global CSS adjustment for lg screens to offset sidebar */}
      <style>{`
        @media (min-width: 992px) {
          aside.admin-sidebar {
            transform: translateX(0) !important;
          }
          .admin-main-wrapper {
            margin-left: 260px !important;
            width: calc(100% - 260px) !important;
          }
        }
        .admin-nav-link:hover {
          background-color: #f8fafc !important;
          color: #0f172a !important;
        }
      `}</style>
    </div>
  );
}
