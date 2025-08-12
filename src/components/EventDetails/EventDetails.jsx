import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import * as eventService from '../../services/eventService'
import { Link } from 'react-router-dom'

const EventDetails = (props) => {

  const { eventId } = useParams()

  const [event, setEvent] = useState()
  
  useEffect(() => {
    // fetch a single event
    const fetchEvent = async () => {
      // call the event service
      const eventData = await eventService.show(eventId)
      console.log(eventData)
      setEvent(eventData)
    }
    fetchEvent()
  }, [eventId])


  


  if (!event) return <main>Loading...</main>

  return (
    <main>
      <header>
        {/* <p>{event.category.toUpperCase()}</p> */}
        <h1>{event.title}</h1>
        <p>
          {event.owner.username} posted on {event.data}
        </p>
        <p>{event.description}</p>
    
        {event.owner._id === props.user._id && (
          <>
            <Link to={`/events/${eventId}/edit`}>Edit</Link>
            <button onClick={() => props.handleDeleteEvent(eventId)}>Delete</button>
          </>
        )}
      </header>
    
    </main>
  )
}

export default EventDetails