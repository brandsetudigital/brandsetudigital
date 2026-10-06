import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { API_BASE_URL } from "../config";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(() =>
    localStorage.getItem("brandsetu_admin_token")
  );
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem("brandsetu_admin_user");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  // Logout handler
  const logout = useCallback(() => {
    localStorage.removeItem("brandsetu_admin_token");
    localStorage.removeItem("brandsetu_admin_user");
    setAdminToken(null);
    setAdminUser(null);
  }, []);

  // Verify token on initial mount
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("brandsetu_admin_token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.admin) {
            setAdminUser(data.admin);
            localStorage.setItem(
              "brandsetu_admin_user",
              JSON.stringify(data.admin)
            );
          }
        } else {
          // Token invalid or expired
          logout();
        }
      } catch (error) {
        console.error("Token verification network error:", error);
        // If server is unreachable in dev, keep local session if valid format
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [logout]);

  // Login handler
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid admin credentials");
      }

      localStorage.setItem("brandsetu_admin_token", data.token);
      localStorage.setItem(
        "brandsetu_admin_user",
        JSON.stringify(data.admin)
      );

      setAdminToken(data.token);
      setAdminUser(data.admin);

      return { success: true, admin: data.admin };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Helper for authenticated fetch
  const authFetch = useCallback(
    async (url, options = {}) => {
      const headers = {
        ...(options.headers || {}),
        Authorization: `Bearer ${adminToken}`,
      };

      // Don't override Content-Type if uploading FormData
      if (!(options.body instanceof FormData) && !headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
      }

      const res = await fetch(url, {
        ...options,
        headers,
      });

      if (res.status === 401) {
        logout();
      }

      return res;
    },
    [adminToken, logout]
  );

  const value = {
    adminToken,
    adminUser,
    isAuthenticated: !!adminToken,
    isLoading,
    login,
    logout,
    authFetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
