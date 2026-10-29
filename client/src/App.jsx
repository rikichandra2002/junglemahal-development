
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  TreePine,
  Menu,
  X,
  Leaf,
  Droplets,
  Trees,
  Recycle,
  Sprout,
  MapPin,
  Heart,
  MoveUpRight,
  LockKeyhole,
} from "lucide-react";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Report from "./pages/Report.jsx";
import Issues from "./pages/Issues.jsx";
import Admin from "./pages/Admin.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminProtectedRoute from "./components/AdminProtectedRoute.jsx";
import Initiatives from "./pages/Initiatives";
import ForestConservation from "./pages/ForestConservation.jsx";
import CommunityLandscape from "./pages/CommunityLandscape.jsx";
import Donation from "./pages/Donation.jsx";


const issues = [
  {
    number: "01",
    title: "Deforestation",
    description:
      "Protecting forest cover, wildlife habitats and the natural balance of our region.",
    icon: Trees,
    color: "bg-[#e3ead8]",
    link: "/initiatives/forest-conservation",
    external: false,
  },
  {
    number: "02",
    title: "Water Conservation",
    description:
      "Supporting water conservation, watershed restoration and sustainable water access.",
    icon: Droplets,
    color: "bg-[#dcebe8]",
    link: "https://www.unwater.org/water-facts/water-scarcity",
    external: true,
  },
  {
    number: "03",
    title: "Waste Management",
    description:
      "Encouraging cleaner communities through responsible waste disposal and recycling.",
    icon: Recycle,
    color: "bg-[#eee6d5]",
    link: "https://cpcb.nic.in/solid-waste-management-rules/",
    external: true,
  },
];

const projects = [
  {
    category: "CULTURE & HERITAGE",
    title: "Celebrating Our Living Heritage",
    description:
      "Discover the cultural traditions, performances and natural landscapes that make the Jungle Mahal region distinctive.",
    image: "/images/cultural-performance.jpg",
    location: "Jungle Mahal region",
  },
  {
    category: "FOREST CONSERVATION",
    title: "Protecting Our Forest Landscapes",
    description:
      "Explore forest roads and the importance of protecting the natural environment for future generations.",
    image: "/images/forest-road.jpg",
    location: "Jungle Mahal region",
  },
  {
    category: "COMMUNITY & LANDSCAPE",
    title: "Communities Connected to Nature",
    description:
      "Explore the relationship between local communities, surrounding forests and sustainable regional development.",
    image: "/images/junglemahal-landscape.jpg",
    location: "Jungle Mahal region",
  },
];

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[#CFE49A] px-6 py-4 text-sm font-bold !text-[#173B2B] shadow-md transition-all duration-300 hover:bg-white hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#CFE49A]";

const darkButton =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[#24543D] px-6 py-4 text-sm font-bold !text-white shadow-md transition-all duration-300 hover:bg-[#183D2C] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#CFE49A]";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    ["About", "#about"],
    ["Environmental Issues", "#issues"],
    ["Our Projects", "#projects"],
    ["Resources", "#resources"],
    ["Report an Issue", "/report"],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E9DF] bg-[#FAFBF7]/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-10">
        <a
          href="/#home"
          className="flex min-w-0 shrink items-center rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8A9D58]"
          aria-label="JungleMahal home"
        >
          <img
            src="/images/junglemahal-logo.png"
            alt="JungleMahal — Nature, People, Progress"
            className="h-12 w-auto max-w-[210px] object-contain sm:h-14 sm:max-w-[260px]"
          />
        </a>

        <div className="hidden items-center gap-6 xl:gap-7 lg:flex">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="whitespace-nowrap text-sm font-semibold text-[#354C3B] transition-colors duration-200 hover:text-[#718A3D] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#718A3D]"
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href="#get-involved"
          className={`${darkButton} hidden shrink-0 px-6 py-3 sm:inline-flex`}
        >
          Get Involved <ArrowUpRight size={17} />
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#D9E2D3] bg-white text-[#244D36] transition hover:bg-[#EAF0E4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#718A3D] lg:hidden"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-[#E5E9DF] bg-[#FAFBF7] px-5 py-4 shadow-lg lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-[#354C3B] transition hover:bg-[#EAF0E4] hover:text-[#173B2B] focus-visible:outline-2 focus-visible:outline-[#718A3D]"
              >
                {label}
              </a>
            ))}

            <a
              href="#get-involved"
              onClick={() => setMenuOpen(false)}
              className={`${darkButton} mt-2 w-full`}
            >
              Get Involved <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[#173B2B]"
    >
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/forest-road.jpg')",
        }}
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#102D21]/95 via-[#173B2B]/80 to-[#173B2B]/45" />

      <div className="mx-auto grid min-h-[610px] max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#173B2B]/70 px-4 py-2 text-xs font-bold tracking-wide text-[#F0F5E5] backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#CFE49A]" />
            FOR A GREENER TOMORROW
          </div>

          <h1 className="text-5xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Where Nature
            <br />
            Meets{" "}
            <span className="font-serif italic text-[#CFE49A]">
              Progress.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-white/90 sm:text-lg">
            Understanding environmental challenges. Supporting local
            communities. Building a more sustainable future for the
            Jungle Mahal region of West Bengal.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#issues" className={primaryButton}>
              Explore the Mission <ArrowRight size={18} />
            </a>

            <Link
              to="/donate"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/70 bg-[#173B2B]/70 px-6 py-4 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:border-[#CFE49A] hover:bg-[#CFE49A] hover:text-[#173B2B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#CFE49A]"
            >
              Make a Difference <Heart size={18} />
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-3 text-sm text-white/85">
            <MapPin size={18} className="shrink-0 text-[#CFE49A]" />
            A regional environmental awareness initiative
          </div>
        </div>

        <div className="hidden justify-end lg:flex">
          <div className="max-w-[330px] rounded-3xl border border-white/30 bg-[#183D2C]/80 p-7 text-white shadow-2xl backdrop-blur-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#CFE49A] text-[#173B2B]">
              <Sprout size={27} />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[2px] text-[#D9E9B7]">
              Our shared responsibility
            </p>

            <h2 className="mt-3 text-2xl font-semibold leading-snug text-white">
              Protect the land. Empower the people.
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/90">
              Learn about local challenges and discover ways to contribute to
              environmental protection and community development.
            </p>

            <a
              href="#about"
              className="mt-5 inline-flex items-center gap-2 rounded-lg text-sm font-bold text-[#D9E9B7] transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#CFE49A]"
            >
              Discover our purpose <ArrowDownRight size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#CFE49A] via-[#77976B] to-transparent" />
    </section>
  );
}

function Introduction() {
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-[#FAFBF7] px-5 py-20 lg:px-10 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <p className="text-xs font-bold uppercase tracking-[3px] text-[#718A3D]">
            OUR PURPOSE
          </p>

          <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-tight text-[#244532] sm:text-5xl">
            A better future starts with understanding our surroundings.
          </h2>
        </div>

        <div>
          <p className="text-base leading-8 text-[#566657]">
            Jungle Mahal has a distinctive relationship between forests,
            rural livelihoods, natural resources and regional development.
            Understanding these connections helps communities make informed
            decisions about a more sustainable future.
          </p>

          <a
            href="#resources"
            className="mt-7 inline-flex items-center gap-2 border-b border-[#9BAA82] pb-2 text-sm font-bold text-[#244D36] transition hover:border-[#718A3D] hover:text-[#718A3D] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#718A3D]"
          >
            Learn about our mission <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Statistics() {
  const stats = [
    { value: "01", label: "Environmental awareness platform" },
    { value: "02", label: "Community-focused development" },
    { value: "03", label: "Conservation and sustainability" },
  ];

  return (
    <section className="bg-[#EAF0E4] px-5 py-12 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.value} className="flex items-start gap-4">
            <span className="text-3xl font-semibold text-[#617C48]">
              {stat.value}
            </span>

            <p className="max-w-[190px] pt-1 text-sm font-semibold leading-6 text-[#354F3B]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function EnvironmentalIssues() {
  return (
    <section
      id="issues"
      className="scroll-mt-24 bg-white px-5 py-20 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[3px] text-[#718A3D]">
              UNDERSTAND THE CHALLENGES
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#244532] sm:text-5xl">
              Our Environment, Our Future.
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-[#566657]">
              Explore important environmental concerns and learn why they
              matter to the region.
            </p>
          </div>

          <a
            href="#resources"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#244D36] transition hover:text-[#718A3D] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#718A3D]"
          >
            Explore resources <ArrowUpRight size={17} />
          </a>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {issues.map((issue) => {
            const Icon = issue.icon;

            return (
              <article
                key={issue.number}
                className="group rounded-3xl border border-[#E3E9DE] bg-[#FAFBF7] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#C7D7B7] hover:shadow-xl hover:shadow-[#244D36]/10 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#71806F]">
                    {issue.number}
                  </span>

                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${issue.color} text-[#345C3E]`}
                  >
                    <Icon size={27} strokeWidth={1.8} />
                  </span>
                </div>

                <h3 className="mt-9 text-2xl font-semibold text-[#244532]">
                  {issue.title}
                </h3>

                <p className="mt-3 min-h-[72px] text-sm leading-7 text-[#566657]">
                  {issue.description}
                </p>

                {issue.external ? (
                  <a
                    href={issue.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#244D36] transition hover:text-[#718A3D] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#718A3D]"
                  >
                    Learn more
                    <MoveUpRight
                      size={16}
                      className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </a>
                ) : (
                  <Link
                    to={issue.link}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#244D36] transition hover:text-[#718A3D] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#718A3D]"
                  >
                    Learn more
                    <MoveUpRight
                      size={16}
                      className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 bg-[#F1F3EC] px-5 py-20 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[3px] text-[#718A3D]">
          IDEAS INTO ACTION
        </p>

        <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <h2 className="max-w-xl text-4xl font-semibold tracking-tight text-[#244532] sm:text-5xl">
            Growing Together, Sustainably.
          </h2>

          <p className="max-w-md text-sm leading-7 text-[#566657]">
            Explore themes and initiatives that connect environmental
            conservation with community wellbeing.
          </p>
        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-3xl border border-[#E6EAE1] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#244D36]/10"
            >
              <div className="relative h-64 overflow-hidden sm:h-80">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-105"
                  onError={(event) => {
                    event.currentTarget.style.visibility = "hidden";
                  }}
                />

                <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-[10px] font-bold tracking-[1.5px] text-[#244D36] shadow-sm">
                  {project.category}
                </span>
              </div>

              <div className="p-7 sm:p-8">
                <div className="flex items-center gap-2 text-xs font-medium text-[#566657]">
                  <MapPin size={14} /> {project.location}
                </div>

                <h3 className="mt-4 text-2xl font-semibold text-[#244532]">
                  {project.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#566657]">
                  {project.description}
                </p>

                


{project.category === "CULTURE & HERITAGE" ? (
  <Link
    to="/initiatives/culture-heritage"
    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#244D36] transition hover:text-[#718A3D]"
  >
    Discover the initiative <ArrowRight size={16} />
  </Link>
) : project.category === "FOREST CONSERVATION" ? (
  <Link
    to="/initiatives/forest-conservation"
    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#244D36] transition hover:text-[#718A3D]"
  >
    Discover the initiative <ArrowRight size={16} />
  </Link>
) : project.category === "COMMUNITY & LANDSCAPE" ? (
  <Link
    to="/community-landscape"
    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#244D36] transition hover:text-[#718A3D]"
  >
    Explore Tourist Places <ArrowRight size={16} />
  </Link>
) : (
  <a
    href="#get-involved"
    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#244D36] transition hover:text-[#718A3D]"
  >
    Discover the initiative <ArrowRight size={16} />
  </a>
)}

              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Resources() {
  return (
    <section
      id="resources"
      className="scroll-mt-24 bg-white px-5 py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 rounded-[2rem] border border-[#DCE5D5] bg-[#EAF0E4] p-8 sm:p-12 lg:flex-row lg:items-center lg:p-16">
        <div className="max-w-2xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#345C3E] shadow-sm">
            <Leaf size={25} />
          </div>

          <h2 className="mt-6 text-3xl font-semibold leading-tight text-[#244532] sm:text-4xl">
            Knowledge is the first step towards change.
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[#566657]">
            Explore reliable environmental resources, learn about regional
            development and discover ways to participate in conservation.
          </p>
        </div>

        <a
          href="https://jhargram.gov.in/"
          target="_blank"
          rel="noreferrer"
          className={`${darkButton} shrink-0`}
        >
          Explore Official Resources <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      id="get-involved"
      className="scroll-mt-24 bg-[#173B2B] px-5 py-12 text-white lg:px-10"
    >
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 sm:flex-row sm:items-center">
        <a
          href="/#home"
          className="flex items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#CFE49A]"
          aria-label="JungleMahal home"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
            <TreePine size={24} />
          </span>

          <span>
            <span className="block text-lg font-bold text-white">
              JungleMahal
            </span>
            <span className="text-xs text-white/75">
              Nature · People · Progress
            </span>
          </span>
        </a>

        <p className="max-w-md text-sm leading-6 text-white/85">
          Building environmental awareness and exploring sustainable
          development opportunities for the Jungle Mahal region.
        </p>

        <div className="flex flex-wrap items-center gap-5">
          <a
            href="mailto:contact@example.com"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#D9E9B7] transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#CFE49A]"
          >
            Get in touch <ArrowUpRight size={16} />
          </a>

          <a
            href="/admin-login"
            className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/5 px-4 py-3 text-sm font-bold text-white transition hover:border-[#CFE49A] hover:bg-[#CFE49A] hover:text-[#173B2B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#CFE49A]"
          >
            <LockKeyhole size={16} />
            Admin Login
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/20 pt-6 text-xs text-white/75 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} JungleMahal. Environmental awareness
          and community development.
        </p>

        <p>Nature · Community · Sustainability</p>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAFBF7]">
      <Navbar />

      <main>
        <Hero />
        <Introduction />
        <Statistics />
        <EnvironmentalIssues />
        <Projects />
        <Resources />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/report" element={<Report />} />
      <Route path="/donate" element={<Donation />} />
      <Route path="/issues" element={<Issues />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route
  path="/initiatives/culture-heritage"
  element={<Initiatives />}
/>
<Route
  path="/initiatives/forest-conservation"
  element={<ForestConservation />}
/>
<Route
  path="/community-landscape"
  element={<CommunityLandscape />}
/>

      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<Admin />} />
      
      
      </Route>
    </Routes>
  );
}
