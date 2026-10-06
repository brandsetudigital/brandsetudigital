import React, { Suspense, lazy } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import ProtectedRoute from "./ProtectedRoute";

// Lazy load public routes
const Hero = lazy(() => import("../components/Home/Hero"));
const Services = lazy(() => import("../components/Servive/servicepage"));
const ServiceDetail = lazy(() => import("../components/Servive/ServiceDetail"));
const ContactPage = lazy(() => import("../components/contact/contact"));
const OurStory = lazy(() => import("../components/OurStory/storymain"));
const Portfolio = lazy(() => import("../components/Testimonials/whowe"));
const Career = lazy(() => import("../components/Career/openings"));
const BlogList = lazy(() => import("../components/blog/BlogList"));
const ServiceBlogLanding = lazy(() => import("../components/blog/ServiceBlogLanding"));
const BlogDetail = lazy(() => import("../components/blog/BlogDetail"));
const NotFound = lazy(() => import("../components/NotFound"));

// Lazy load admin routes
const AdminLogin = lazy(() => import("../pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("../components/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const AdminBlogList = lazy(() => import("../pages/admin/AdminBlogList"));
const AdminBlogEditor = lazy(() => import("../pages/admin/AdminBlogEditor"));
const AdminMedia = lazy(() => import("../pages/admin/AdminMedia"));
const AdminLeads = lazy(() => import("../pages/admin/AdminLeads"));
const AdminCareers = lazy(() => import("../pages/admin/AdminCareers"));
const AdminInfluencers = lazy(() => import("../pages/admin/AdminInfluencers"));
const AdminSettings = lazy(() => import("../pages/admin/AdminSettings"));

const RouteLoader = () => (
  <div
    className="d-flex align-items-center justify-content-center"
    style={{ minHeight: "55vh" }}
  >
    <div
      className="spinner-border text-warning"
      role="status"
      style={{ width: "2.5rem", height: "2.5rem" }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

const MainLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        {/* Public Routes with BrandSetu MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Hero />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<OurStory />} />
          <Route path="/work" element={<Portfolio />} />
          <Route path="/career" element={<Career />} />
          {/* Blog System Routes */}
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:serviceSlug" element={<ServiceBlogLanding />} />
          <Route path="/blog/:serviceSlug/:articleSlug" element={<BlogDetail />} />
        </Route>

        {/* Admin Login Route (Stand-alone, secure, no public navbar/footer) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="blogs" element={<AdminBlogList />} />
            <Route path="blogs/new" element={<AdminBlogEditor />} />
            <Route path="blogs/edit/:id" element={<AdminBlogEditor />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="careers" element={<AdminCareers />} />
            <Route path="influencers" element={<AdminInfluencers />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
