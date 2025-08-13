const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/events`;

const index = async () => {
  try{
    const res = await fetch(BASE_URL);
    return  res.json();
  } catch(error){
    console.log(error);
  }
};

const show = async (eventId) => {
  try{
    const res = await fetch(`${BASE_URL}/${eventId}`);
    return res.json();

  } catch(error){
    console.log(error);
  }
};

const create = async (formData) => {
  try{
    const token = localStorage.getItem('token');

     const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        // since we're sending multi-part/formdata also, the content type isn't JUST JSON
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      // don't stringify the formData
      body: formData,
    });

    const data = await res.json()
    if (!res.ok) throw new Error(data?.message || data || 'Create failed')
    return data
  } catch (error) {
    console.error('Create event error:', error)
    throw error
  }
}

const update = async (formData, eventId) => {
  try{
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/${eventId}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    return res.json();

  } catch(error){
    console.log(error);
  }
};



const deleteEvent = async (eventId) => {
  try{
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/${eventId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.json();

  } catch(error){
    console.log(error);
  }
}

export {
  index,
  show,
  create,
  update,
  deleteEvent
}