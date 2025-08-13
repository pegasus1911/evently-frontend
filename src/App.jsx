import './App.css'
import NavBar from './components/NavBar/NavBar'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import EventDetails from './components/EventDetails/EventDetails.jsx';
import EventForm from './components/EventForm/EventForm.jsx';
import EventList from './components/EventList/EventList.jsx';
import * as authService from './services/authService.js';
import * as eventService from './services/eventService.js';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'


const App = () => {
  const navigate = useNavigate()


  const initialState = authService.getUser()

  const [user, setUser] = useState(initialState);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAllEvents = async () => {
      const eventData = await eventService.index();
      setEvents(eventData);
    };

    fetchAllEvents();
  }, []);



  const handleSignUp = async (formData) => {
    try {
      const res = await authService.signUp(formData)
      setUser(res)
      return { success: true }
    } catch (err) {
      return { success: false, message: err.message }
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    setUser(null)
  }
  const handleSignIn = async (formData) => {
    try {
      const res = await authService.signIn(formData) // too set internal token
      setUser(res)                                   // now res is the decodedd user
      return { success: true }
    } catch (err) {
      return { success: false, message: 'Username or password is incorrect' }
    }
  }


  const handleAddEvent = async (formData) => {
    const newEvent = await eventService.create(formData);
    setEvents([...events, newEvent]);
    navigate('/events')
  };

  const handleDeleteEvent = async (eventId) => {
    await eventService.deleteEvent(eventId);
    setEvents(events.filter((event => event._id !== eventId)));
    navigate('/events')

  }
  const handleUpdateEvent = async (formData, eventId) => {
    const updatedEvent = await eventService.update(formData, eventId);
    setEvents([...events, updatedEvent])
    navigate(`/events/${eventId}`)
  }

  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <Routes>

        {user ? (
          // Protected Routes
          <>
            <Route
              path="/events/new"
              element={<EventForm handleAddEvent={handleAddEvent} />}
            />
            <Route
              path="/events/:eventId/edit"
              element={<EventForm mode="edit" handleUpdateEvent={handleUpdateEvent} />}
            />

          </>
        ) : (
          // Public Routes
          <>
            <Route
              path="/sign-up"
              element={<SignUp handleSignUp={handleSignUp} user={user} />}
            />
            <Route
              path="/sign-in"
              element={<SignIn handleSignIn={handleSignIn} user={user} />}
            />

          </>
        )}

        <Route path="/" element={<h1>Welcome to Evently</h1>} />
        <Route path="/events" element={<EventList events={events} />} />
        <Route path="/events/:eventId" element={<EventDetails user={user} handleDeleteEvent={handleDeleteEvent} />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </>
  )

}

export default App


