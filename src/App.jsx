import './App.css'
import NavBar from './components/NavBar/NavBar'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import { Route, Routes } from 'react-router-dom'
import * as authService from './services/authService.js';
import EventForm from './components/EventForm/EventForm.jsx';
import * as eventService from './services/eventService.js';
import { useEffect, useState } from 'react';

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

  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <Routes>
          <Route path='/' element={<h1>Hello world!</h1>} />
          <Route path='/events/new' element={<EventForm handleAddEvent={handleAddEvent} />}/>
          <Route path='/sign-up' element={<SignUp handleSignUp={handleSignUp} user={user} />} />
          <Route path='/sign-in' element={<SignIn handleSignIn={handleSignIn} user={user} />} />
          <Route path='*' element={<h1>404</h1>} />
    </Routes>
    </>

    
  )
}

export default App


