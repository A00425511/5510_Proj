import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

export default function RoleRoute({ allowedRoles = [] }) {
  const {
    role,
    isAuthenticated,
    isLoading,
    busy,
  } = useAuth()

  if (isLoading || busy) {
    return (
      <main role="status">
        <p>Checking your permissions...</p>
      </main>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}