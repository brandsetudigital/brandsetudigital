import React from "react";
import { Link } from "react-router-dom";
import Seo from "./Seo";

export default function NotFound() {
  return (
    <>
      <Seo
        title="404 - Page Not Found"
        description="The page you were looking for could not be found."
        path="/404"
        noindex
      />
      <main
        className="d-flex flex-column align-items-center justify-content-center text-center"
        style={{ minHeight: "70vh", padding: "4rem 1rem" }}
      >
        <h1 style={{ fontSize: "4rem", marginBottom: "0.5rem" }}>404</h1>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          Page not found
        </h2>
        <p style={{ maxWidth: "32rem", marginBottom: "2rem" }}>
          The page you were looking for doesn't exist or has been moved. Let's
          get you back to something useful.
        </p>
        <Link
          to="/"
          className="btn btn-dark btn-lg fw-bold rounded-pill px-4 py-3"
        >
          Back to Home
        </Link>
      </main>
    </>
  );
}
