import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SignIn = (props) => {
  const navigate = useNavigate()

  const initialState = {
    username: '',
    password: '',
  }

  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState('') // for the error message

  useEffect(() => {
    if (props.user) {
      navigate('/')
    }
  }, [props.user])

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    const result = await props.handleSignIn(formData)

    if (result && result.success) {
      navigate('/')
    } else {
      
      setError(result?.message || 'Username or password is incorrect')
    }
  }

  return (
    <main>
      <h1>Sign In Form</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" name='username' onChange={handleChange} />
        <br />
        <label>Password:</label>
        <input type="password" name='password' onChange={handleChange} />
        <br />
        <button type="submit">Sign In</button>
      </form>
    </main>
  )
}

export default SignIn
