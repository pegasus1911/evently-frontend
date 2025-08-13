// src/components/Home/Home.jsx
import { Link } from 'react-router-dom';

export default function Home({ user }) {
  return (
    <main className="home">
      <h1>Welcome to Evently</h1>
      <p className="home__tagline">
        Plan, share, and discover events with friends and communities.
        Create an event in seconds, invite with one link, and track who’s coming.
      </p>

      <ul className="home__points">
        <li>Create events with date, time, and location</li>
        <li>Invite anyone—no app required</li>
        <li>Manage RSVPs and edit details anytime</li>
      </ul>

      <div className="home__cta">
        <Link to="/events" className="btn primary">Explore the events</Link>
        {user
          ? <Link to="/events/new" className="btn ghost">Create an event</Link>
          : <Link to="/sign-up" className="btn ghost">Get started</Link>}
      </div>
    </main>
  );
}
