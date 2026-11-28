import {
  Navigate,
  Outlet,
  useLocation,
  Link,
} from 'react-router-dom'

import { useAuth } from '../hooks/useAuth.js'

export default function ProtectedRoute() {
  const {
    status,
    isAuthenticated,
    isLoading,
    busy,
    refreshUser,
  } = useAuth()

  const location = useLocation()

  if (isLoading || busy) {
    return (
      <main role="status">
        <p>Verifying your session...</p>
      </main>
    )
  }

  if (status === 'error') {
    return (
      <main>
        <h1>Authentication Error</h1>
        <p>Unable to verify your session.</p>

        <button
          type="button"
          onClick={() => {
            refreshUser().catch(() => {})
          }}
        >
          Try Again
        </button>

        <p>
          <Link to="/login">Go to Login</Link>
        </p>
      </main>
    )
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    )
  }

  return <Outlet />
}