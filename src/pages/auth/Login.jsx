import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'

export default function Login() {
  const {
    login,
    isAuthenticated,
    isLoading,
    busy,
  } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    try {
      await login({
        username: username.trim(),
        password,
      })
    } catch (err) {
      const message = err.data?.non_field_errors

      setError(
        Array.isArray(message)
          ? message.join(' ')
          : err.message || 'Unable to sign in.'
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
        <h1>Welcome to RepLab</h1>
        <p>Sign in to your account.</p>

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
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={busy}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={busy}
            />
          </div>

          <button type="submit" disabled={busy}>
            {busy ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p>
          Don't have an account?{' '}
          <Link to="/register">Register</Link>
        </p>

        <Link to="/">Back to Home</Link>
      </section>
    </main>
  )
}