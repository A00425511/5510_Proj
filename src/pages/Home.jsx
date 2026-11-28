import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

export default function Home() {
  const {
    user,
    isAuthenticated,
    isLoading,
  } = useAuth()

  return (
    <main className="home-page">

      <h1>RepLab</h1>

      <h2>Strength & Conditioning Platform</h2>

      <p>
        Manage workout programs, training schedules,
        performance tracking and subscriptions.
      </p>

      {isLoading ? (
        <p role="status">Checking your session...</p>
      ) : isAuthenticated ? (
        <section>
          <h3>Welcome back, {user?.username}!</h3>

          <Link to="/dashboard">
            Go to My Dashboard
          </Link>
        </section>
      ) : (
        <nav aria-label="Account navigation">
          <p>
            <Link to="/login">Sign In</Link>
          </p>

          <p>
            <Link to="/register">Create Account</Link>
          </p>
        </nav>
      )}

    </main>
  )
}