import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'

const adminFeatures = [
  {
    title: 'User Management',
    description: 'Manage platform user accounts.',
  },
  {
    title: 'Role Management',
    description: 'Manage user roles and permissions.',
  },
  {
    title: 'Coach Management',
    description: 'Oversee registered coaches.',
  },
  {
    title: 'Program Management',
    description: 'Oversee training programs.',
  },
  {
    title: 'Subscription Management',
    description: 'Monitor platform subscriptions.',
  },
  {
    title: 'Platform Analytics',
    description: 'Monitor platform activity and performance.',
  },
]

export default function AdminDashboard() {
  const { user, role } = useAuth()

  return (
    <main className="dashboard-page">

      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <h2>Welcome, {user?.username}!</h2>
        <p>Role: {role}</p>
      </header>

      <section className="dashboard-grid">
        {adminFeatures.map(feature => (
          <article
            key={feature.title}
            className="dashboard-card"
          >
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <small>Coming soon</small>
          </article>
        ))}

        <article className="dashboard-card">
          <h3>My Profile</h3>
          <p>View your account information.</p>
          <Link to="/profile">View Profile</Link>
        </article>
      </section>

    </main>
  )
}