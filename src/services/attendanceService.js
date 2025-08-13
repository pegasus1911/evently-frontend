const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/events`

const join = async (eventId) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/${eventId}/attend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

const leave = async (eventId) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/${eventId}/attend`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

const list = async (eventId) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/${eventId}/attendees`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

const status = async (eventId) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/${eventId}/attending`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export {
  join,
  leave,
  list,
  status,
}
