
import { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowLeft,
  RefreshCw,
  Leaf,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  MapPin,
  LogOut,
  ClipboardCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/reports";
const ADMIN_API_URL = "http://localhost:5000/api/admin";

const Admin = () => {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [actionError, setActionError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  // Fetch all public report details for the admin dashboard.
  const fetchReports = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_URL, {
        withCredentials: true,
      });

      setReports(response.data.reports || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load reports. Check your backend connection."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Update the report status in MongoDB through the protected API.
  const updateReportStatus = async (reportId, status) => {
    setUpdatingId(reportId);
    setActionMessage("");
    setActionError("");

    try {
      const response = await axios.patch(
        `${API_URL}/${reportId}/status`,
        { status },
        { withCredentials: true }
      );

      const updatedReport = response.data.report;

      setReports((currentReports) =>
        currentReports.map((report) =>
          report._id === reportId ? updatedReport : report
        )
      );

      setActionMessage(
        `Report "${updatedReport.title}" updated to ${status}.`
      );
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        setActionError(
          "Your admin session is invalid or expired. Please sign in again."
        );
      } else {
        setActionError(
          err.response?.data?.message ||
            "Unable to update the report status. Please try again."
        );
      }
    } finally {
      setUpdatingId("");
    }
  };

  // Clear the authentication cookie and return to login.
  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await axios.post(
        `${ADMIN_API_URL}/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout request failed:", err.message);
    } finally {
      navigate("/admin-login", { replace: true });
    }
  };

  const stats = [
    {
      label: "Total Reports",
      value: reports.length,
      icon: FileText,
    },
    {
      label: "Pending",
      value: reports.filter((report) => report.status === "Pending").length,
      icon: Clock,
    },
    {
      label: "In Progress",
      value: reports.filter((report) => report.status === "In Progress")
        .length,
      icon: AlertCircle,
    },
    {
      label: "Resolved",
      value: reports.filter((report) => report.status === "Resolved").length,
      icon: CheckCircle2,
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Verified":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-amber-100 text-amber-800";
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7f0] text-[#203b2c]">
      {/* Header */}
      <header className="border-b border-[#dce5d8] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 md:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="rounded-xl bg-[#e5efe3] p-2.5 text-[#276749]">
              <Leaf size={24} />
            </div>

            <div>
              <h1 className="text-lg font-bold sm:text-xl">
                Environment Monitor
              </h1>
              <p className="text-xs text-gray-500">
                Jungle Mahal · Admin Dashboard
              </p>
            </div>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={fetchReports}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl border border-[#dce5d8] bg-white px-3 py-2.5 text-sm font-semibold transition hover:bg-[#f0f5ed] disabled:opacity-50 sm:px-4"
            >
              <RefreshCw
                size={16}
                className={loading ? "animate-spin" : ""}
              />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <Link
              to="/issues"
              className="hidden rounded-xl bg-[#276749] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1f5139] sm:inline-flex"
            >
              Public Reports
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 rounded-xl border border-red-200 px-3 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-50 sm:px-4"
            >
              <LogOut size={16} />
              <span>{loggingOut ? "Logging out..." : "Logout"}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#52715b] transition hover:text-[#203b2c]"
        >
          <ArrowLeft size={16} />
          Back to homepage
        </Link>

        {/* Dashboard heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#56805d]">
            Administration
          </p>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Environmental Reports
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 md:text-base">
            Review community-submitted environmental observations and manage
            their progress through the reporting workflow.
          </p>
        </div>

        {/* Dashboard statistics */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl border border-[#e0e8dc] bg-white p-5 shadow-sm"
            >
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-600">{label}</p>

                <div className="rounded-xl bg-[#edf4e9] p-2.5 text-[#276749]">
                  <Icon size={20} />
                </div>
              </div>

              <p className="text-3xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        {/* Status update feedback */}
        {actionMessage && (
          <div
            role="status"
            className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
          >
            {actionMessage}
          </div>
        )}

        {actionError && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <p>{actionError}</p>

            {(actionError.includes("session") ||
              actionError.includes("sign in")) && (
              <button
                type="button"
                onClick={() => navigate("/admin-login", { replace: true })}
                className="mt-3 rounded-lg bg-red-700 px-4 py-2 font-semibold text-white hover:bg-red-800"
              >
                Go to Login
              </button>
            )}
          </div>
        )}

        {/* Reports section */}
        <section className="overflow-hidden rounded-2xl border border-[#e0e8dc] bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-[#e8eee5] p-5 sm:flex-row sm:items-center md:p-6">
            <div>
              <h3 className="text-lg font-bold">Submitted Reports</h3>
              <p className="mt-1 text-sm text-gray-500">
                Review reports and update their current status.
              </p>
            </div>

            <span className="w-fit rounded-full bg-[#edf4e9] px-3 py-1.5 text-xs font-semibold text-[#276749]">
              {reports.length} report{reports.length === 1 ? "" : "s"}
            </span>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="p-12 text-center">
              <RefreshCw
                className="mx-auto mb-3 animate-spin text-[#276749]"
                size={30}
              />
              <p className="text-sm text-gray-500">Loading reports...</p>
            </div>
          ) : error ? (
            /* Error */
            <div className="p-8 text-center">
              <p className="mb-4 text-sm text-red-600">{error}</p>

              <button
                type="button"
                onClick={fetchReports}
                className="rounded-xl bg-[#276749] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1f5139]"
              >
                Try Again
              </button>
            </div>
          ) : reports.length === 0 ? (
            /* Empty state */
            <div className="p-12 text-center">
              <FileText
                className="mx-auto mb-3 text-gray-400"
                size={36}
              />
              <p className="font-semibold">No reports yet</p>
              <p className="mt-2 text-sm text-gray-500">
                Reports submitted through the website will appear here.
              </p>
              <Link
                to="/report"
                className="mt-5 inline-flex rounded-xl bg-[#276749] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1f5139]"
              >
                Submit a Test Report
              </Link>
            </div>
          ) : (
            /* Report cards */
            <div className="divide-y divide-[#edf1e9]">
              {reports.map((report) => (
                <article
                  key={report._id}
                  className="p-5 transition hover:bg-[#fafcf8] md:p-6"
                >
                  <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                    <div className="min-w-0 flex-1">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#edf4e9] px-3 py-1 text-xs font-semibold text-[#276749]">
                          {report.category}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                            report.status
                          )}`}
                        >
                          {report.status}
                        </span>
                      </div>

                      <h4 className="break-words text-lg font-bold">
                        {report.title}
                      </h4>

                      <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-gray-600">
                        {report.description}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={14} />
                          {report.location}, {report.district}
                        </span>

                        <span>
                          {report.createdAt
                            ? new Date(report.createdAt).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "Date unavailable"}
                        </span>

                        <span className="font-mono">
                          ID: {report._id?.slice(-8)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Admin report management */}
                  <div className="mt-5 flex flex-col gap-4 border-t border-[#edf1e9] pt-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="w-full sm:max-w-xs">
                      <label
                        htmlFor={`status-${report._id}`}
                        className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#203b2c]"
                      >
                        <ClipboardCheck size={17} />
                        Manage Report Status
                      </label>

                      <select
                        id={`status-${report._id}`}
                        value={report.status}
                        disabled={updatingId === report._id}
                        onChange={(event) =>
                          updateReportStatus(
                            report._id,
                            event.target.value
                          )
                        }
                        className="w-full rounded-xl border border-[#dce5d8] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#276749] focus:ring-2 focus:ring-[#276749]/10 disabled:cursor-wait disabled:opacity-60"
                      >
                        <option value="Pending">Pending Review</option>
                        <option value="Verified">Verified</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved / Completed</option>
                      </select>

                      <p className="mt-2 text-xs leading-5 text-gray-500">
                        Changes are saved to the database when the server
                        confirms the update.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={
                          updatingId === report._id ||
                          report.status === "Verified"
                        }
                        onClick={() =>
                          updateReportStatus(report._id, "Verified")
                        }
                        className="rounded-lg border border-purple-200 px-3 py-2.5 text-sm font-semibold text-purple-700 transition hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Verify
                      </button>

                      <button
                        type="button"
                        disabled={
                          updatingId === report._id ||
                          report.status === "In Progress"
                        }
                        onClick={() =>
                          updateReportStatus(report._id, "In Progress")
                        }
                        className="rounded-lg border border-blue-200 px-3 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Start Work
                      </button>

                      <button
                        type="button"
                        disabled={
                          updatingId === report._id ||
                          report.status === "Resolved"
                        }
                        onClick={() =>
                          updateReportStatus(report._id, "Resolved")
                        }
                        className="rounded-lg bg-[#276749] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1f5139] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {updatingId === report._id
                          ? "Saving..."
                          : "Mark Completed"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <p className="mt-6 text-xs leading-5 text-gray-500">
          Community-submitted reports require independent review. Marking a
          report as resolved records an administrative status and does not
          independently confirm that the environmental issue has been fixed.
        </p>
      </main>
    </div>
  );
};

export default Admin;
