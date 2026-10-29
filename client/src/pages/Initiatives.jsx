import React from "react";
import { Link } from "react-router-dom";
import "../styles/initiatives.css";

export default function Initiatives() {
  return (
    <main className="culture-page">
      {/* Hero */}
      <section className="culture-hero">
        <img
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2000&q=90"
          alt="Natural landscape of the Jungle Mahal region"
          className="culture-hero-image"
        />

        <div className="culture-hero-overlay" />

        <div className="culture-hero-content">
          <span className="culture-label">Culture & Heritage</span>

          <p className="culture-location">
            WEST BENGAL, INDIA · JUNGLE MAHAL
          </p>

          <h1>Where Traditions Come Alive</h1>

          <p>
            Discover the cultural expressions, artistic traditions
            and community stories that give Jungle Mahal its
            distinctive identity.
          </p>

          <a href="#discover-culture" className="culture-hero-button">
            Discover the heritage <span>↓</span>
          </a>
        </div>

        <span className="culture-hero-number">01 / 03</span>
      </section>

      {/* Introduction */}
      <section className="culture-intro" id="discover-culture">
        <div className="culture-intro-heading">
          <p className="culture-eyebrow">A heritage worth discovering</p>
          <h2>
            A region shaped by
            <span> stories, art and tradition.</span>
          </h2>
        </div>

        <div className="culture-intro-copy">
          <p>
            Jungle Mahal refers to a cultural and geographical
            region of western West Bengal, associated with forested
            landscapes and diverse community traditions.
          </p>

          <p>
            Its cultural identity can be explored through folk
            performance, music, craft, festivals and the knowledge
            shared across generations. Every tradition tells a
            story about the people and places that sustain it.
          </p>
        </div>
      </section>

      {/* Cultural highlights */}
      <section className="culture-highlights">
        <div className="culture-section-heading">
          <div>
            <p className="culture-eyebrow">Explore the culture</p>
            <h2>Expressions of a living heritage</h2>
          </div>

          <p>
            Discover the artistic practices and traditions that
            make the region culturally distinctive.
          </p>
        </div>

        <div className="culture-highlight-grid">
          <article className="culture-feature culture-feature-large">
            <img
              src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=85"
              alt="Performers on a stage"
              loading="lazy"
            />

            <div className="culture-feature-overlay" />

            <div className="culture-feature-content">
              <span>01 · PERFORMANCE</span>
              <h3>Chhau Dance & Folk Performance</h3>
              <p>
                Explore the expressive movement, masks, music and
                storytelling associated with regional performance
                traditions, including Chhau.
              </p>
            </div>
          </article>

          <article className="culture-feature">
            <img
              src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1000&q=85"
              alt="A live musical performance"
              loading="lazy"
            />

            <div className="culture-feature-overlay" />

            <div className="culture-feature-content">
              <span>02 · MUSIC</span>
              <h3>Folk Music & Community</h3>
              <p>
                Discover the role of music, rhythm and oral
                storytelling in community gatherings and celebrations.
              </p>
            </div>
          </article>

          <article className="culture-feature">
            <img
              src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1000&q=85"
              alt="Handmade creative artwork"
              loading="lazy"
            />

            <div className="culture-feature-overlay" />

            <div className="culture-feature-content">
              <span>03 · CRAFT</span>
              <h3>Traditional Arts & Crafts</h3>
              <p>
                Learn about handmade art, local creative practices
                and the skills that artisans pass from one generation
                to another.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Community and festivals */}
      <section className="culture-community">
        <div className="culture-community-image">
          <img
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85"
            alt="People sharing a community gathering"
            loading="lazy"
          />
        </div>

        <div className="culture-community-text">
          <p className="culture-eyebrow">Tradition across generations</p>

          <h2>Culture lives through its people.</h2>

          <p>
            Cultural heritage is more than a performance or an
            object. It is the knowledge, creativity, celebrations
            and shared memories that communities keep alive.
          </p>

          <p>
            Respectful cultural exploration begins by listening to
            local voices, learning the context behind traditions and
            supporting the people who preserve them.
          </p>

          <div className="culture-values">
            <div>
              <strong>01</strong>
              <span>Local knowledge</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Living traditions</span>
            </div>

            <div>
              <strong>03</strong>
              <span>Community identity</span>
            </div>
          </div>
        </div>
      </section>

      {/* Responsible exploration */}
      <section className="culture-visit">
        <p className="culture-eyebrow">Explore respectfully</p>

        <h2>Be a thoughtful guest.</h2>

        <p>
          Ask permission before photographing people, respect local
          customs, support local artists where possible and follow
          community guidance when attending cultural events.
        </p>

        <Link to="/" className="culture-back-button">
          <span>←</span> Back to the home page
        </Link>
      </section>
    </main>
  );
}