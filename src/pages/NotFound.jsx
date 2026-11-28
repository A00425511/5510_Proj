import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

export default function NotFound() {
  const { isAuthenticated } = useAuth()

  return (
    <main className="error-page">

      <h1>404</h1>
      <h2>Page Not Found</h2>

      <p>
        The page you are looking for does not exist
        or may have been moved.
      </p>

      <p>
        <Link to="/">Back to Home</Link>
      </p>

      {isAuthenticated && (
        <Link to="/dashboard">
          Return to My Dashboard
        </Link>
      )}

    </main>
  )
}