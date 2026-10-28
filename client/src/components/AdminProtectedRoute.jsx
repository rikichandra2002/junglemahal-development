
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { Leaf } from "lucide-react";

const API_URL = "http://localhost:5000/api/admin";

export default function AdminProtectedRoute() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;

    axios
      .get(`${API_URL}/me`, { withCredentials: true })
      .then((response) => {
        if (active && response.data.success) {
          setAuthenticated(true);
        }
      })
      .catch(() => {
        if (active) setAuthenticated(false);
      })
      .finally(() => {
        if (active) setChecking(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f7f0]">
        <div className="text-center">
          <Leaf className="mx-auto mb-3 animate-pulse text-[#276749]" size={36} />
          <p className="text-sm text-gray-600">Verifying admin session...</p>
        </div>
      </div>
    );
  }

  return authenticated ? <Outlet /> : <Navigate to="/admin-login" replace />;
}
