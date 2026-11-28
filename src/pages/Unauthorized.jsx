import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

export default function Unauthorized() {
  const { isAuthenticated } = useAuth()

  return (
    <main className="error-page">

      <h1>403</h1>
      <h2>Access Denied</h2>

      <p>
        You do not have permission to access this page.
      </p>

      <p>
        Please contact an administrator if you believe
        you should have access.
      </p>

      {isAuthenticated ? (
        <Link to="/dashboard">
          Return to My Dashboard
        </Link>
      ) : (
        <Link to="/login">
          Sign In
        </Link>
      )}

      <p>
        <Link to="/">Back to Home</Link>
      </p>

    </main>
  )
}