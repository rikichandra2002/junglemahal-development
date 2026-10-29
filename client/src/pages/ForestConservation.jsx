
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Leaf,
  TreePine,
  ShieldCheck,
  PawPrint,
  MapPin,
  Bird,
  Heart,
  Compass,
  ExternalLink,
} from "lucide-react";

const wildlife = [
  {
    name: "Asian Elephants",
    tag: "FOREST CORRIDORS",
    image:
      "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1000&q=85",
    description:
      "Connected forest habitats give elephants the space they need to move, forage and survive.",
    accent: "bg-[#E9F5A8]",
  },
  {
    name: "Deer & Woodland Life",
    tag: "HABITAT PROTECTION",
    image:
      "https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=1000&q=85",
    description:
      "Healthy woodland ecosystems support the food, shelter and natural balance wildlife depends on.",
    accent: "bg-[#F5D58B]",
  },
  {
    name: "Forest Birdlife",
    tag: "BIODIVERSITY",
    image:
      "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=1000&q=85",
    description:
      "Protecting trees and native vegetation helps preserve nesting places and feeding grounds for birds.",
    accent: "bg-[#C6E8D0]",
  },
];

const priorities = [
  {
    number: "01",
    icon: TreePine,
    title: "Protect Forests",
    description:
      "Safeguard forest cover, protect native vegetation and help maintain healthy natural habitats.",
    color: "text-[#D9F08A]",
  },
  {
    number: "02",
    icon: PawPrint,
    title: "Respect Wildlife",
    description:
      "Protect animal habitats, keep a safe distance from wildlife and never disturb wild animals.",
    color: "text-[#F5D58B]",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Support Communities",
    description:
      "Encourage responsible tourism and conservation practices that respect local livelihoods.",
    color: "text-[#A9E5BE]",
  },
];

export default function ForestConservation() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F7EE] text-[#203D2D]">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#142F23] text-white">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center opacity-35"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=90')",
          }}
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#10271D] via-[#142F23]/90 to-[#142F23]/45" />

        <div className="pointer-events-none absolute -right-24 -top-28 h-96 w-96 rounded-full bg-[#C5E875]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-[#E8B94C]/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8 sm:pb-28 lg:px-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/90 backdrop-blur transition hover:border-[#D9F08A]/60 hover:bg-white/10"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>

          <div className="grid items-center gap-12 pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pt-24">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D9F08A]/30 bg-[#D9F08A]/10 px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-[#D9F08A]">
                <Leaf size={15} />
                Jungle Mahal · Conservation
              </div>

              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                Where the wild
                <span className="block font-serif italic text-[#D9F08A]">
                  belongs.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
                Every forest has a story. Every species has a place.
                Discover why protecting Jungle Mahal&apos;s natural
                landscapes matters for wildlife, communities and the future.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#wildlife"
                  className="inline-flex items-center gap-2 rounded-full bg-[#D9F08A] px-6 py-3.5 font-bold text-[#203D2D] transition duration-300 hover:-translate-y-1 hover:bg-white"
                >
                  Meet the wildlife
                  <ArrowRight size={18} />
                </a>

                <a
                  href="#forest-map"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white transition hover:border-[#D9F08A] hover:text-[#D9F08A]"
                >
                  <MapPin size={17} />
                  Explore the map
                </a>
              </div>

              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/15 pt-6">
                <div>
                  <p className="text-xs uppercase tracking-[2px] text-white/50">
                    Our focus
                  </p>
                  <p className="mt-2 font-semibold">Habitats & biodiversity</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[2px] text-white/50">
                    Our approach
                  </p>
                  <p className="mt-2 font-semibold">People & nature together</p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:ml-auto">
              <div className="absolute -inset-3 rotate-3 rounded-[2rem] border border-[#D9F08A]/30" />

              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/20 bg-[#234333] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1100&q=90"
                  alt="Wild elephant in a natural environment"
                  className="h-[360px] w-full object-cover sm:h-[440px]"
                  fetchPriority="high"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#10271D] via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#D9F08A] px-3 py-1.5 text-xs font-bold text-[#203D2D]">
                    <PawPrint size={14} />
                    WILDLIFE FIRST
                  </div>
                  <h2 className="text-2xl font-semibold sm:text-3xl">
                    A home worth protecting.
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-white/75">
                    Conservation begins with understanding the life around us.
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl border border-[#E1E8D7] bg-[#F7F7EE] p-4 text-[#203D2D] shadow-xl sm:-left-7">
                <div className="rounded-xl bg-[#D9F08A] p-3">
                  <Heart size={23} />
                </div>
                <div>
                  <p className="font-bold">Protect their home</p>
                  <p className="mt-1 text-xs text-[#68776A]">
                    Respect · Restore · Preserve
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-2 bg-gradient-to-r from-[#D9F08A] via-[#E8B94C] to-[#8FC99A]" />
      </section>

      {/* CONSERVATION PRIORITIES */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[3px] text-[#718A3D]">
                THE BIGGER PICTURE
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
                A healthier forest means a{" "}
                <span className="font-serif italic text-[#718A3D]">
                  richer future.
                </span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#627064]">
              Forests are living ecosystems. Their protection benefits
              wildlife, strengthens ecological balance and supports people
              who live alongside nature.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {priorities.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.number}
                  className="group relative overflow-hidden rounded-[1.75rem] bg-[#193C2B] p-7 text-white transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#203D2D]/15 sm:p-9"
                >
                  <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/5 transition duration-500 group-hover:scale-150" />

                  <div className="relative flex items-start justify-between">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <Icon size={28} className={item.color} />
                    </div>
                    <span className="font-mono text-sm text-white/35">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="relative mt-8 text-2xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="relative mt-4 text-sm leading-7 text-white/65">
                    {item.description}
                  </p>

                  <div className="relative mt-8 h-1 w-12 rounded-full bg-[#D9F08A] transition-all duration-300 group-hover:w-24" />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* WILDLIFE GALLERY */}
      <section
        id="wildlife"
        className="relative overflow-hidden bg-[#EAEEDC] px-5 py-20 sm:px-8 lg:px-12 lg:py-24"
      >
        <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-[#D5E99A]/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-[#58723A]">
                <PawPrint size={15} />
                Wildlife of Jungle Mahal
              </div>

              <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
                Meet the neighbours
                <span className="block font-serif italic text-[#718A3D]">
                  of the forest.
                </span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-[#627064]">
              Explore some of the wildlife and natural habitats worth
              protecting. Each species depends on a healthy, connected
              ecosystem.
            </p>
          </div>

          <div className="mt-11 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {wildlife.map((animal) => (
              <article
                key={animal.name}
                className="group overflow-hidden rounded-[1.75rem] border border-[#DCE3D2] bg-[#FBFCF6] shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={animal.image}
                    alt={animal.name}
                    loading="lazy"
                    className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#10271D]/75 via-transparent to-transparent opacity-80" />

                  <span
                    className={`absolute left-5 top-5 rounded-full px-3 py-2 text-[10px] font-extrabold tracking-[1.5px] text-[#203D2D] ${animal.accent}`}
                  >
                    {animal.tag}
                  </span>

                  <h3 className="absolute bottom-5 left-5 right-5 text-2xl font-semibold text-white">
                    {animal.name}
                  </h3>
                </div>

                <div className="p-6">
                  <p className="text-sm leading-7 text-[#627064]">
                    {animal.description}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[1.5px] text-[#718A3D]">
                    <Leaf size={15} />
                    Preserve their habitat
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 text-xs leading-6 text-[#71806F]">
            Illustrative wildlife photography. These images do not confirm
            current sightings or the presence of each species at a specific
            location.
          </p>
        </div>
      </section>

      {/* MAP */}
      <section
        id="forest-map"
        className="bg-[#F7F7EE] px-5 py-20 sm:px-8 lg:px-12 lg:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EAEEDC] px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-[#58723A]">
              <Compass size={15} />
              Explore the region
            </div>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              Nature has a place on the map.
            </h2>

            <p className="mt-5 text-sm leading-8 text-[#627064]">
              Explore Jhargram, West Bengal, and its surrounding landscape
              through the interactive map. Confirm access, local guidance
              and visitor rules before entering any forest area.
            </p>

            <div className="mt-7 flex items-start gap-4 rounded-2xl border border-[#E0E6D8] bg-white p-5">
              <div className="rounded-xl bg-[#EAEEDC] p-3 text-[#58723A]">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="font-semibold">Jhargram, West Bengal</h3>
                <p className="mt-1 text-sm leading-6 text-[#627064]">
                  Explore the wider Jungle Mahal region and nearby places.
                </p>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Jhargram%2C%20West%20Bengal%2C%20India"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#193C2B] px-6 py-3.5 font-bold text-white transition hover:bg-[#718A3D]"
            >
              Open Google Maps
              <ExternalLink size={17} />
            </a>

            <p className="mt-4 text-xs leading-6 text-[#71806F]">
              The map shows geographic information, not live animal
              tracking or verified wildlife sightings.
            </p>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-[#DCE3D2] bg-white p-2 shadow-xl shadow-[#203D2D]/10">
            <iframe
              title="Interactive Google Map of Jhargram, West Bengal"
              src="https://maps.google.com/maps?q=Jhargram%2C%20West%20Bengal%2C%20India&z=10&output=embed"
              width="100%"
              height="480"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="relative overflow-hidden bg-[#193C2B] px-5 py-20 text-center text-white sm:px-8 lg:py-24">
        <div className="pointer-events-none absolute -left-20 -top-28 h-72 w-72 rounded-full bg-[#D9F08A]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-[#E8B94C]/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D9F08A] text-[#203D2D]">
            <Bird size={30} />
          </div>

          <p className="mt-7 text-xs font-bold uppercase tracking-[3px] text-[#D9F08A]">
            Every action matters
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
            Let the wild
            <span className="block font-serif italic text-[#D9F08A]">
              stay wild.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-white/70 sm:text-base">
            Respect wildlife. Reduce waste. Protect natural habitats.
            Small, responsible choices can help build a better future
            for people and nature.
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D9F08A] px-7 py-4 font-bold text-[#203D2D] transition duration-300 hover:-translate-y-1 hover:bg-white"
          >
            <ArrowLeft size={18} />
            Explore our initiatives
          </Link>
        </div>

        <div className="relative mx-auto mt-16 max-w-7xl border-t border-white/15 pt-6 text-xs text-white/45">
          Jungle Mahal Development · Forests, wildlife & communities
        </div>
      </section>
    </main>
  );
}
