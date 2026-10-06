// Centralized Frontend Configuration
// Reads from REACT_APP_API_URL environment variable at build time,
// with a fallback to local server for development.
const rawUrl = process.env.REACT_APP_API_URL || "https://api.brandsetudigital.com";
export const API_BASE_URL = rawUrl.replace(/\/+$/, "");

