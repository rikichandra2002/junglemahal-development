
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Leaf, LockKeyhole, Mail, ArrowLeft } from "lucide-react";

const API_URL = "http://localhost:5000/api/admin";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        navigate("/admin", { replace: true });
      }
    
} catch (err) {
  console.error("Admin login error:", err);

  if (err.response) {
    setError(
      err.response.data?.message ||
        `Login failed with status ${err.response.status}.`
    );
  } else if (err.request) {
    setError(
      "The server did not respond. Check the backend terminal and browser Console."
    );
  } else {
    setError(err.message || "An unexpected login error occurred.");
  }
} finally {
  setLoading(false);
}

  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f7f0] px-4 py-10">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#52715b] hover:text-[#203b2c]"
        >
          <ArrowLeft size={16} />
          Back to homepage
        </Link>

        <div className="rounded-3xl border border-[#e0e8dc] bg-white p-7 shadow-lg sm:p-9">
          <div className="mb-7 flex justify-center">
            <div className="rounded-2xl bg-[#e5efe3] p-4 text-[#276749]">
              <Leaf size={34} />
            </div>
          </div>

          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-[#203b2c]">
              Admin Login
            </h1>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Sign in to manage Jungle Mahal environmental reports.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="admin-email"
                className="mb-2 block text-sm font-semibold text-[#203b2c]"
              >
                Email address
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-[#dce5d8] px-4 focus-within:border-[#276749]">
                <Mail size={18} className="text-gray-400" />

                <input
                  id="admin-email"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter admin email"
                  className="w-full bg-transparent py-3.5 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block text-sm font-semibold text-[#203b2c]"
              >
                Password
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-[#dce5d8] px-4 focus-within:border-[#276749]">
                <LockKeyhole size={18} className="text-gray-400" />

                <input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter admin password"
                  className="w-full bg-transparent py-3.5 text-sm outline-none"
                />
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#276749] py-3.5 font-semibold text-white transition hover:bg-[#1f5139] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in securely"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs leading-5 text-gray-500">
            Authorized administrators only.
          </p>
        </div>
      </div>
    </main>
  );
}
