import { Link } from 'react-router-dom';

export default function Home({ user }) {
  return (
    <section className="home-hero">
      <video
        className="home-video"
        src ="/Bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"

        aria-hidden="true"
      >
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="home-overlay" />

      <div className="home-content">
        <h1>Welcome to Evently</h1>
        <p className="home-tagline">
          Plan, share, and discover events with friends and communities.
          Create an event in seconds, invite with one link, and track who’s coming.
        </p>

        <div className="home-cta">
          <Link to="/events" className="btn primary">Explore the events</Link>
          {user
            ? <Link to="/events/new" className="btn ghost">Create an event</Link>
            : <Link to="/sign-up" className="btn ghost">Get started</Link>}
        </div>
      </div>
    </section>
  );
}
