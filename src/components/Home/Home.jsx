import { Link, useNavigate } from 'react-router-dom';

function EventCardLite({ ev }) {
  const date = new Date(ev.date || ev.timing || ev.when || ev.createdAt);
  return (
    <article className="card-lite">
      <div className="card-lite__meta">
        <span className="meta-pill">
          {date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
        </span>
        <span className="meta-dot">•</span>
        <span className="muted">{ev.location || ev.city || '—'}</span>
      </div>
      <h3 className="card-lite__title">{ev.title}</h3>
      <p className="card-lite__desc">{ev.description?.slice(0, 90) || 'Join us for an awesome event.'}</p>
      <Link className="btn tiny" to={`/events/${ev._id}`}>View</Link>
    </article>
  );
}

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

      {/* HOW IT WORKS */}
      <div className="section container features">
        <div className="feature">
          <div className="f-badge">1</div>
          <h3>Create</h3>
          <p>Set title, time, and location. Add a cover if you want.</p>
        </div>
        <div className="feature">
          <div className="f-badge">2</div>
          <h3>Share</h3>
          <p>Send one link. Guests can RSVP without an account.</p>
        </div>
        <div className="feature">
          <div className="f-badge">3</div>
          <h3>Track</h3>
          <p>See who’s coming and update details anytime.</p>
        </div>
      </div>

      {/* FOOTER CTA */}
      <div className="section container final-cta">
        <h2>Ready to host your next event?</h2>
        <div className="home-cta">
          {user ? <Link to="/events/new" className="btn primary">Create an event</Link>
                : <Link to="/sign-up" className="btn primary">Get started free</Link>}
        </div>
      </div>
    </section>
  );
}