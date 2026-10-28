
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/api";

const ADMIN_API_URL = `${API_URL}/api/admin`;

export default function AdminProtectedRoute() {
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function checkAdmin() {
      try {
        await axios.get(`${ADMIN_API_URL}/me`, {
          withCredentials: true,
        });

        if (!cancelled) setAuthorized(true);
      } catch (error) {
        if (!cancelled) setAuthorized(false);
        console.error(
          "Admin authentication check failed:",
          error.response?.status || error.message
        );
      } finally {
        if (!cancelled) setChecking(false);
      }
    }

    checkAdmin();

    return () => {
      cancelled = true;
    };
  }, []);

  if (checking) {
    return <div className="p-8 text-center">Checking admin access...</div>;
  }

  return authorized ? <Outlet /> : <Navigate to="/admin-login" replace />;
}
