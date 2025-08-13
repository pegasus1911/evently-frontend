import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import * as eventService from "../../services/eventService"
import MapComponent from '../MapComponent/MapComponent';
const EventForm = (props) => {
    const { eventId } = useParams()

 const initialState = {
  title: "",
  image: "",
  description: "",
  date: "",
  location: { lat: null, lng: null },
  locationName: "",
  capacity: "0",
  isPublic: true,
};


    const [formData, setFormData] = useState(initialState)

    useEffect(() => {
        const fetchEvent = async () => {
            const data = await eventService.show(eventId)
            setFormData(data)
        }
        if (eventId) fetchEvent()
    }, [eventId])

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()

        if (eventId) {
            props.handleUpdateEvent(formData, eventId)
        } else {
            props.handleAddEvent(formData)
        }
    }

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <h1>{eventId ? 'Edit Event' : 'New Event'}</h1>
                <br></br>
                <label htmlFor="title-input">Title: </label>
                <input
                    required
                    type="text"
                    name="title"
                    id="title-input"
                    value={formData.title}
                    onChange={handleChange}
                />
                <br></br>
                <label htmlFor="description-input">Description: </label>
                <textarea
                    required
                    name="description"
                    id="description-input"
                    value={formData.description}
                    onChange={handleChange}
                />
                <br></br>
                <label htmlFor="date-input">Date & Time: </label>
                <input
                    required
                    type="datetime-local"
                    name="date"
                    id="date-input"
                    value={formData.date}
                    onChange={handleChange}
                />
                <br></br>
               <label>Pick a Location:</label>
<MapComponent
  initialPosition={formData.location}
  onLocationChange={({ lat, lng, locationName }) =>
    setFormData((f) => ({
      ...f,
      location: { lat, lng },
      locationName: locationName || f.locationName,
    }))
  }
/>
{formData.locationName && (
  <p>
    <strong>Selected Location:</strong> {formData.locationName}
  </p>
)}
                <label htmlFor="isPublic-input">Public event? </label>
                <input
                    type="checkbox"
                    name="isPublic"
                    id="isPublic-input"
                    checked={!!formData.isPublic}
                    onChange={(e) => setFormData(f => ({ ...f, isPublic: e.target.checked }))}
                />
                <br></br>
                <label htmlFor="capacity-input">Capacity: </label>
                <input
                    required
                    type="text"
                    name="capacity"
                    id="capacity-input"
                    value={formData.capacity}
                    onChange={handleChange}
                />
                <br></br>
                <button type="submit">SUBMIT</button>
            </form>
        </main>
    )
}

export default EventForm



