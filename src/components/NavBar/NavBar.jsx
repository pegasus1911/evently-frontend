import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png';

const NavBar = (props) => {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link to="/" className="nav-brand">
        
          Evently
        </Link>
        {/* <Link to="/" className="nav-brand">Evently</Link> */}

        <div className="nav-links">
          {/* <Link to="/">Home</Link> */}
          <Link to="/events">Explore the events</Link>
          {props.user && <Link to="/events/new">New Event</Link>}

          {props.user ? (
            <>
              <span className="nav-user">Signed in by: {props.user.username}</span>
              <Link to="/" onClick={props.handleSignOut} className="nav-cta">Sign Out</Link>
            </>
          ) : (
            <>
              <Link to="/sign-up">Sign Up</Link>
              <Link to="/sign-in" className="nav-cta">Sign In</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
