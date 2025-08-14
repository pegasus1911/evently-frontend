import { Link, useNavigate } from 'react-router-dom';

export default function Home({ user, events = [] }) {
  const navigate = useNavigate();
  const onSearch = (e) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get('q')?.trim();
    if (q) navigate(`/events?search=${encodeURIComponent(q)}`);
  };

  const categories = ['Tech', 'Sports', 'Music', 'Food', 'Meetups', 'Workshops'];

  return (
    <section className="home-hero">
      {/* background video */}
      <video className="home-video" autoPlay loop muted playsInline preload="metadata">
        <source src="/Bg.mp4" type="video/mp4" />
      </video>
      <div className="home-overlay" />

      {/* HERO CONTENT */}
      <div className="home-content">
        <h1>Welcome to Evently</h1>
        <p className="home-tagline">
          Plan, share, and discover events with friends and communities. Create an event in seconds,
          invite with one link, and track who’s coming.
        </p>
        <div className="home-cta">
          <Link to="/events" className="btn primary">Explore the events</Link>
          {user ? <Link to="/events/new" className="btn ghost">Create an event</Link>
                : <Link to="/sign-up" className="btn ghost">Get started</Link>}
        </div>

        {/* QUICK SEARCH */}
        <form className="search" onSubmit={onSearch}>
          <input name="q" placeholder="Search events by title, place, or date…" aria-label="Search events" />
          <button className="btn primary" type="submit">Search</button>
        </form>

        {/* CATEGORY CHIPS */}
        <div className="chips">
          {categories.map(c => (
            <button key={c} className="chip" onClick={() => navigate(`/events?category=${encodeURIComponent(c)}`)}>
              {c}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}