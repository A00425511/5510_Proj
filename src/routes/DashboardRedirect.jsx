import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

const DASHBOARD_ROUTES = new Map([
  ['athlete', '/athlete/dashboard'],
  ['coach', '/coach/dashboard'],
  ['admin', '/admin/dashboard'],
])

export default function DashboardRedirect() {
  const {
    role,
    isAuthenticated,
    isLoading,
    busy,
  } = useAuth()

  if (isLoading || busy) {
    return (
      <main role="status">
        <p>Loading your dashboard...</p>
      </main>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  const dashboard = DASHBOARD_ROUTES.get(role)

  if (!dashboard) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Navigate to={dashboard} replace />
}