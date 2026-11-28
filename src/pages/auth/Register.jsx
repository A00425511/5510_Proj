import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'

export default function Register() {
  const {
    register,
    isAuthenticated,
    isLoading,
    busy,
  } = useAuth()

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (password1 !== password2) {
      setError('Passwords do not match.')
      return
    }

    try {
      const user = await register({
        username: username.trim(),
        email: email.trim(),
        password1,
        password2,
      })

      navigate(user ? '/dashboard' : '/login', {
        replace: true,
      })

    } catch (err) {
      const messages =
        err.data && typeof err.data === 'object'
          ? Object.values(err.data)
              .flat()
              .filter(value => typeof value === 'string')
          : []

      setError(
        messages.length
          ? messages.join(' ')
          : err.message || 'Registration failed.'
      )
    }
  }

  if (isLoading) {
    return (
      <main role="status">
        <p>Checking your session...</p>
      </main>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <main className="auth-page">
      <section className="auth-card">

        <h1>Create Your RepLab Account</h1>
        <p>Register to start your fitness journey.</p>

        {error && (
          <p role="alert" className="auth-error">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              disabled={busy}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={busy}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password1">Password</label>
            <input
              id="password1"
              name="password1"
              type="password"
              autoComplete="new-password"
              value={password1}
              onChange={e => setPassword1(e.target.value)}
              minLength={8}
              required
              disabled={busy}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password2">
              Confirm Password
            </label>
            <input
              id="password2"
              name="password2"
              type="password"
              autoComplete="new-password"
              value={password2}
              onChange={e => setPassword2(e.target.value)}
              minLength={8}
              required
              disabled={busy}
            />
          </div>

          <button type="submit" disabled={busy}>
            {busy ? 'Creating account...' : 'Register'}
          </button>

        </form>

        <p>
          Already have an account?{' '}
          <Link to="/login">Sign In</Link>
        </p>

        <Link to="/">Back to Home</Link>

      </section>
    </main>
  )
}