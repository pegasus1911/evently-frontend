import './App.css'
import NavBar from './components/NavBar/NavBar'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import EventDetails from './components/EventDetails/EventDetails.jsx';
import EventForm from './components/EventForm/EventForm.jsx';
import EventList from './components/EventList/EventList.jsx';
import * as authService from './services/authService.js';
import { Route, Routes } from 'react-router-dom'
import * as eventService from './services/eventService.js';
import { useState, useEffect } from 'react';

const App = () => {

  const initialState = authService.getUser()

  const [user, setUser] = useState(initialState);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAllEvents = async () => {
      const eventData = await eventService.index();
      setEvents(eventData);
    };

      fetchAllEvents();
  },[]);



  const handleSignUp = async (formData) => {
    try {
      const res = await authService.signUp(formData)
      setUser(res)
      // return success
      return { success: true }
    } catch(err){
      // return failure flag (then signup form can display message)
      // add message?
      return { success: false, message: err.message }
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const handleSignIn = async (formData) => {
    const res = await authService.signIn(formData)
    setUser(res)
  };

  const handleAddEvent = async(formData) => {
    await eventService.create(formData);
  };

  const handleDeleteEvent = async (eventId) => {
    await eventService.deleteEvent(eventId);
    setEvents(events.filter((event => event._id !== eventId)));
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

      {/* Public routes visible to everyone */}
      <Route path="/" element={<h1>Welcome to Evently</h1>} />
      <Route path="/events" element={<EventList events={events} />} />
      <Route path="/events/:eventId" element={<EventDetails user={user} handleDeleteEvent={handleDeleteEvent} />}/>
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  </>
)

}

export default App


