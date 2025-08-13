
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import * as eventService from '../../services/eventService'
import * as attendanceService from '../../services/attendanceService'

const EventDetails = (props) => {

  const { eventId } = useParams()

  const [event, setEvent] = useState()
  const [attendees, setAttendees] = useState([])
  const [attending, setAttending] = useState(false)

  useEffect(() => {
    const fetchEvent = async () => {
      const eventData = await eventService.show(eventId)
      setEvent(eventData)
    }
    fetchEvent()
  }, [eventId])

  useEffect(() => {
   
      const fetchAttendees = async () => {
        const data = await attendanceService.list(eventId)
        if (data && data.attendees) {
          setAttendees(data.attendees)
        } else {
          setAttendees([])
        }
      }
      fetchAttendees()
      setAttending(false) 
  
      setAttendees([]) 
  
  }, [event, eventId, props.user])

  if (!event) return <main>Loading...</main>

  let isOwner = false
  if (props.user && event.owner && event.owner._id === props.user._id) {
    isOwner = true
  }

  const handleToggleAttend = async () => {
    if (!props.user) return
    if (isOwner) return 
    try {
      if (attending) {
        await attendanceService.leave(eventId)
        setAttending(false)
      } else {
        await attendanceService.join(eventId)
        setAttending(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main>
      <header>
        <h1>{event.title}</h1>
        <p>
          {event.owner && event.owner.username} posted on{" "}
          {event.date ? new Date(event.date).toLocaleDateString() : ""}
        </p>
        <p>{event.description}</p>

        {isOwner && (
          <>
            <Link className="edit-btn" to={`/events/${eventId}/edit`}>Edit</Link>
            <button onClick={() => props.handleDeleteEvent(eventId)}>Delete</button>
          </>
        )}
      </header>

      {props.user && !isOwner && (
        <button onClick={handleToggleAttend}>
          {attending ? 'Leave event' : 'Attend event'}
        </button>
      )}
      {!props.user && <p>Please sign in to attend.</p>}

      {isOwner && (
        <>
          <h2>Attendees ({attendees.length} out of {event.capacity})</h2>
          {!attendees.length && <p>No attendees yet.</p>}
          {attendees.map((attendant) => (
            <p key={attendant._id}>{attendant.username}</p>
          ))}
        </>
      )}
    </main>
  )
}

export default EventDetails
