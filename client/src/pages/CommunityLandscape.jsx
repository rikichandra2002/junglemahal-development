
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  MapPin,
  Compass,
  Trees,
  TentTree,
  Landmark,
  BedDouble,
} from "lucide-react";

const categories = [
  { label: "All places", value: "All" },
  { label: "Nature", value: "Nature" },
  { label: "Hotels & stays", value: "Stay" },
  { label: "Adventure", value: "Adventure" },
  { label: "Culture", value: "Culture" },
];

const experiences = [
  {
    id: 1,
    name: "Forest & Nature Escapes",
    category: "Nature",
    description:
      "Explore forest landscapes, green surroundings and nature-focused experiences.",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=85",
    icon: Trees,
    location: "Jungle Mahal region",
  },
  {
    id: 2,
    name: "Hotels & Eco-Stays",
    category: "Stay",
    description:
      "Plan a comfortable stay and discover accommodation options around your destination.",
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1000&q=85",
    icon: BedDouble,
    location: "Explore local accommodation",
  },
  {
    id: 3,
    name: "Camps & Outdoor Experiences",
    category: "Adventure",
    description:
      "Discover outdoor experiences and check local rules before planning a forest visit.",
    image:
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1000&q=85",
    icon: TentTree,
    location: "Check local access",
  },
  {
    id: 4,
    name: "Culture & Heritage",
    category: "Culture",
    description:
      "Explore regional heritage, cultural attractions and community experiences.",
    image:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1000&q=85",
    icon: Landmark,
    location: "Jungle Mahal region",
  },
];

export default function CommunityLandscape() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredExperiences = useMemo(() => {
    const query = search.trim().toLowerCase();

    return experiences.filter((place) => {
      const matchesCategory =
        activeCategory === "All" ||
        place.category === activeCategory;

      const matchesSearch =
        !query ||
        `${place.name} ${place.description} ${place.location}`
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <main className="min-h-screen bg-[#F7F7EE] text-[#203D2D]">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#173B2B] text-white">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center opacity-35"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=85')",
          }}
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#10271D] via-[#173B2B]/85 to-[#173B2B]/45" />

        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm transition hover:border-[#D9F08A] hover:text-[#D9F08A]"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>

          <div className="mt-14 max-w-3xl sm:mt-20">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#D9F08A]/15 px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-[#D9F08A]">
              <Compass size={15} />
              Jungle Mahal travel explorer
            </p>

            <h1 className="mt-6 text-5xl font-semibold leading-tight tracking-tight sm:text-7xl">
              Find your next
              <span className="block font-serif italic text-[#D9F08A]">
                nature escape.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              Discover landscapes, accommodation ideas, outdoor
              experiences and cultural places across the Jungle Mahal
              region.
            </p>

            <a
              href="#discover"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D9F08A] px-6 py-4 font-bold text-[#203D2D] transition hover:-translate-y-1 hover:bg-white"
            >
              Start exploring <ArrowRight size={18} />
            </a>
          </div>
        </div>

        <div className="h-1.5 bg-gradient-to-r from-[#D9F08A] via-[#E8B94C] to-[#8FC99A]" />
      </section>

      {/* SEARCH AND FILTERS */}
      <section id="discover" className="px-5 pt-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[3px] text-[#718A3D]">
                YOUR NEXT EXPERIENCE
              </p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                Explore by interest
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-[#627064]">
              Search the available categories or select an experience
              that suits your trip.
            </p>
          </div>

          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-[#DCE3D2] bg-white px-4 py-3 shadow-sm focus-within:border-[#718A3D]">
            <Search className="shrink-0 text-[#718A3D]" size={21} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search experiences..."
              aria-label="Search experiences"
              className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-[#879184]"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                type="button"
                onClick={() => setActiveCategory(category.value)}
                aria-pressed={activeCategory === category.value}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  activeCategory === category.value
                    ? "bg-[#193C2B] text-white"
                    : "border border-[#DCE3D2] bg-white text-[#526552] hover:border-[#718A3D]"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE CARDS */}
      <section className="px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredExperiences.map((place) => {
            const Icon = place.icon;

            return (
              <article
                key={place.id}
                className="group overflow-hidden rounded-[1.75rem] border border-[#E0E6D8] bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-[#F7F7EE] px-4 py-2 text-xs font-bold text-[#244532]">
                    {place.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-[#71806F]">
                    <MapPin size={15} />
                    {place.location}
                  </div>

                  <div className="mt-4 flex items-start gap-3">
                    <div className="rounded-xl bg-[#EAEEDC] p-3 text-[#58723A]">
                      <Icon size={23} />
                    </div>
                    <h3 className="pt-1 text-xl font-semibold">
                      {place.name}
                    </h3>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-[#627064]">
                    {place.description}
                  </p>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      place.location === "Jungle Mahal region"
                        ? "Jungle Mahal, West Bengal, India"
                        : place.location === "Explore local accommodation"
                          ? "Hotels and homestays near Jhargram, West Bengal"
                          : "Nature camps and outdoor experiences near Jhargram, West Bengal"
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#244D36] transition hover:text-[#718A3D]"
                  >
                    Explore on map <ArrowRight size={16} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {filteredExperiences.length === 0 && (
          <div className="mx-auto max-w-xl rounded-2xl border border-[#DCE3D2] bg-white p-8 text-center">
            <Search className="mx-auto text-[#718A3D]" size={30} />
            <h3 className="mt-4 text-xl font-semibold">
              No matching experiences
            </h3>
            <p className="mt-2 text-sm text-[#627064]">
              Try another search or select a different category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-5 rounded-full bg-[#193C2B] px-5 py-3 text-sm font-bold text-white"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* MAP */}
      <section className="bg-[#EAEEDC] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[3px] text-[#718A3D]">
              PLAN YOUR JOURNEY
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Explore the region on a map.
            </h2>
            <p className="mt-4 text-sm leading-8 text-[#627064]">
              Find destinations around Jhargram and explore travel
              directions. Check local access rules and accommodation
              details before making plans.
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Jhargram%2C%20West%20Bengal%2C%20India"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#193C2B] px-6 py-3.5 font-bold text-white transition hover:bg-[#718A3D]"
            >
              Open Google Maps <ArrowRight size={17} />
            </a>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[#D6E0CE] bg-white p-2 shadow-lg">
            <iframe
              title="Jungle Mahal and Jhargram tourist map"
              src="https://maps.google.com/maps?q=Jhargram%2C%20West%20Bengal%2C%20India&z=10&output=embed"
              width="100%"
              height="420"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="bg-[#173B2B] px-5 py-16 text-center text-white sm:px-8 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <Compass className="mx-auto text-[#D9F08A]" size={35} />
          <h2 className="mt-5 text-3xl font-semibold sm:text-5xl">
            Travel thoughtfully.
            <span className="block font-serif italic text-[#D9F08A]">
              Leave a lighter footprint.
            </span>
          </h2>
          <p className="mt-5 text-sm leading-7 text-white/75">
            Respect local communities, protect natural habitats and
            follow responsible tourism practices wherever you go.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D9F08A] px-6 py-4 font-bold text-[#203D2D] transition hover:bg-white"
          >
            <ArrowLeft size={17} /> Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
