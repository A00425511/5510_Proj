import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

const dashboardRoutes = new Map([
  ['athlete', '/athlete/dashboard'],
  ['coach', '/coach/dashboard'],
  ['admin', '/admin/dashboard'],
])

export default function DashboardLayout() {
  const {
    user,
    role,
    logout,
    busy,
  } = useAuth()

  const dashboardPath =
    dashboardRoutes.get(role) || '/dashboard'

  async function handleLogout() {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error.message)
    }
  }

  return (
    <div className="dashboard-layout">

      <header className="app-header">

        <Link to="/" className="app-brand">
          RepLab
        </Link>

        <nav
          className="app-navigation"
          aria-label="Main navigation"
        >
          <NavLink to={dashboardPath}>
            Dashboard
          </NavLink>

          <NavLink to="/profile">
            My Profile
          </NavLink>
        </nav>

        <div className="app-user">
          <span>{user?.username}</span>
          <span>Role: {role}</span>

          <button
            type="button"
            onClick={handleLogout}
            disabled={busy}
          >
            {busy ? 'Signing out...' : 'Logout'}
          </button>
        </div>

      </header>

      <div className="app-content">
        <Outlet />
      </div>

    </div>
  )
}