
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  Leaf,
  MapPin,
  RefreshCw,
  Trees,
  Droplets,
  Recycle,
  PawPrint,
  Factory,
  Filter,
  AlertCircle,
  CalendarDays,
  Plus,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/reports";

const categories = [
  "Deforestation",
  "Water Pollution",
  "Waste Dumping",
  "Wildlife & Habitat",
  "Air Pollution",
  "Other Environmental Issue",
];

const statuses = ["Pending", "Verified", "In Progress", "Resolved"];

const categoryIcons = {
  Deforestation: Trees,
  "Water Pollution": Droplets,
  "Waste Dumping": Recycle,
  "Wildlife & Habitat": PawPrint,
  "Air Pollution": Factory,
  "Other Environmental Issue": Leaf,
};

const statusStyles = {
  Pending: "bg-amber-50 text-amber-800 border-amber-200",
  Verified: "bg-blue-50 text-blue-800 border-blue-200",
  "In Progress": "bg-violet-50 text-violet-800 border-violet-200",
  Resolved: "bg-green-50 text-green-800 border-green-200",
};

function formatDate(date) {
  if (!date) return "Date unavailable";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Date unavailable";
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ReportCard({ report }) {
  const Icon = categoryIcons[report.category] || Leaf;
  const status = statuses.includes(report.status)
    ? report.status
    : "Pending";

  return (
    <article className="flex h-full flex-col rounded-3xl border border-[#e4e9df] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#244d36]/5 sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e8efe2] text-[#345c3e]">
          <Icon size={23} strokeWidth={1.7} />
        </span>

        <span
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyles[status]}`}
        >
          {status}
        </span>
      </div>

      <p className="mt-6 text-xs font-bold uppercase tracking-[1.5px] text-[#84945d]">
        {report.category}
      </p>

      <h2 className="mt-2 break-words text-xl font-semibold leading-snug text-[#244532]">
        {report.title}
      </h2>

      <p className="mt-3 line-clamp-4 flex-1 whitespace-pre-wrap break-words text-sm leading-7 text-[#758175]">
        {report.description}
      </p>

      <div className="mt-6 space-y-3 border-t border-[#edf0e9] pt-5">
        <p className="flex items-start gap-2 text-sm text-[#536456]">
          <MapPin size={17} className="mt-0.5 shrink-0 text-[#84945d]" />
          <span className="break-words">
            {report.location}, {report.district}
          </span>
        </p>

        <p className="flex items-center gap-2 text-xs text-[#849084]">
          <CalendarDays size={15} />
          Reported {formatDate(report.createdAt)}
        </p>
      </div>
    </article>
  );
}

export default function Issues() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [status, setStatus] = useState("All statuses");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadReports() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load reports.");
      }

      setReports(Array.isArray(data.reports) ? data.reports : []);
    } catch (err) {
      setError(
        err instanceof TypeError
          ? "Cannot connect to the JungleMahal API. Make sure your backend is running."
          : err.message || "Something went wrong while loading reports."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReports();
  }, []);

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesSearch = [
        report.title,
        report.description,
        report.location,
        report.district,
        report.category,
      ].some((value) => String(value || "").toLowerCase().includes(query));

      const matchesCategory =
        category === "All categories" || report.category === category;

      const matchesStatus =
        status === "All statuses" || report.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [reports, search, category, status]);

  return (
    <main className="min-h-screen bg-[#f7f8f3]">
      <header className="border-b border-[#e5e9df] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 lg:px-10">
          <a href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#244d36] text-white">
              <Leaf size={24} />
            </span>

            <span>
              <span className="block text-lg font-bold text-[#244d36]">
                Jungle<span className="text-[#8a9d58]">Mahal</span>
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[2px] text-[#788476]">
                Nature · People · Progress
              </span>
            </span>
          </a>

          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#536456] hover:text-[#244d36]"
          >
            <ArrowLeft size={17} />
            Home
          </a>
        </div>
      </header>

      <section className="bg-[#eaf0e4] px-5 py-14 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-[#345c3e]">
            <Leaf size={14} />
            Community environmental reports
          </span>

          <div className="mt-6 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#244532] sm:text-6xl">
                Our Environment,
                <br />
                <span className="font-serif italic text-[#84945d]">
                  Our Responsibility.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-[#687669]">
                Explore environmental concerns reported by the community.
                Search local observations and learn about the challenges
                facing our surroundings.
              </p>
            </div>

            <a
              href="/report"
              className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-[#244d36] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#183b29] lg:self-auto"
            >
              <Plus size={18} />
              Report an Issue
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-10 lg:py-16">
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[2px] text-[#84945d]">
              EXPLORE REPORTS
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#244532]">
              Environmental Issues
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_auto]">
            <div className="relative">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#849084]"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search reports or locations..."
                aria-label="Search reports"
                className="w-full rounded-xl border border-[#dfe5da] bg-white py-3.5 pl-11 pr-4 text-sm outline-none focus:border-[#6f936c] focus:ring-2 focus:ring-[#dce9d7]"
              />
            </div>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              aria-label="Filter by category"
              className="w-full rounded-xl border border-[#dfe5da] bg-white px-4 py-3.5 text-sm text-[#536456] outline-none focus:border-[#6f936c]"
            >
              <option>All categories</option>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              aria-label="Filter by status"
              className="w-full rounded-xl border border-[#dfe5da] bg-white px-4 py-3.5 text-sm text-[#536456] outline-none focus:border-[#6f936c]"
            >
              <option>All statuses</option>
              {statuses.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All categories");
                setStatus("All statuses");
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#dfe5da] bg-white px-4 py-3.5 text-sm font-semibold text-[#536456] transition hover:bg-[#edf1e8]"
            >
              <Filter size={17} />
              Reset
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e2e8db] pb-5">
            <p className="text-sm text-[#758175]">
              {loading
                ? "Loading reports..."
                : `${filteredReports.length} report${filteredReports.length === 1 ? "" : "s"} found`}
            </p>

            <button
              type="button"
              onClick={loadReports}
              disabled={loading}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#345c3e] hover:text-[#244532] disabled:opacity-50"
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
              Refresh reports
            </button>
          </div>
        </div>

        {loading && (
          <div
            className="grid gap-5 py-8 sm:grid-cols-2 lg:grid-cols-3"
            aria-label="Loading reports"
          >
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-72 animate-pulse rounded-3xl border border-[#e4e9df] bg-white p-6"
              >
                <div className="h-12 w-12 rounded-2xl bg-[#e8efe2]" />
                <div className="mt-7 h-3 w-1/3 rounded bg-[#e8efe2]" />
                <div className="mt-4 h-5 w-3/4 rounded bg-[#e8efe2]" />
                <div className="mt-4 h-3 w-full rounded bg-[#f0f2ec]" />
                <div className="mt-3 h-3 w-2/3 rounded bg-[#f0f2ec]" />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="mt-8 rounded-3xl border border-red-200 bg-white p-8 text-center">
            <AlertCircle size={34} className="mx-auto text-red-600" />
            <h3 className="mt-4 text-xl font-semibold text-[#244532]">
              We couldn't load the reports
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#758175]">{error}</p>
            <button
              type="button"
              onClick={loadReports}
              className="mt-5 rounded-full bg-[#244d36] px-5 py-3 text-sm font-semibold text-white hover:bg-[#183b29]"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && filteredReports.length > 0 && (
          <div className="mt-8 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredReports.map((report) => (
              <ReportCard key={report._id} report={report} />
            ))}
          </div>
        )}

        {!loading && !error && filteredReports.length === 0 && (
          <div className="mt-8 rounded-3xl border border-dashed border-[#cbd7c3] bg-white px-6 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8efe2] text-[#345c3e]">
              <Search size={25} />
            </div>

            <h3 className="mt-5 text-xl font-semibold text-[#244532]">
              No reports found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#758175]">
              Try a different search term or clear the filters to see more
              environmental reports.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All categories");
                setStatus("All statuses");
              }}
              className="mt-5 inline-flex items-center gap-2 font-semibold text-[#345c3e] hover:text-[#244532]"
            >
              Clear filters <ArrowRight size={16} />
            </button>
          </div>
        )}

        <div className="mt-12 rounded-3xl bg-[#244d36] p-7 text-white sm:p-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-semibold">
                Observed an environmental concern?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-7 text-white/70">
                Help raise awareness by documenting an issue in your
                community.
              </p>
            </div>

            <a
              href="/report"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#c7db9b] px-6 py-4 text-sm font-bold text-[#193b29] transition hover:bg-white"
            >
              Submit a Report <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[#173b2b] px-5 py-8 text-white lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <a href="/" className="font-bold">
            Jungle<span className="text-[#c7db9b]">Mahal</span>
          </a>
          <p className="text-xs text-white/60">
            Nature · People · Progress
          </p>
          <a
            href="/"
            className="text-sm font-medium text-[#c7db9b] hover:text-white"
          >
            Back to home
          </a>
        </div>
      </footer>
    </main>
  );
}
