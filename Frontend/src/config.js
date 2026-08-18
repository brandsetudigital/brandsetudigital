// Centralized Frontend Configuration
// Reads from REACT_APP_API_URL environment variable at build time,
// with a fallback to local server for development.
export const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
