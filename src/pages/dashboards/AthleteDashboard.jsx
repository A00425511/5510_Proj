import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'

const athleteFeatures = [
  {
    title: 'My Programs',
    description: 'View your assigned workout programs.',
  },
  {
    title: 'Workout Schedule',
    description: 'View your upcoming training sessions.',
  },
  {
    title: 'Performance Tracking',
    description: 'Track your fitness progress.',
  },
  {
    title: 'Personal Records',
    description: 'View and manage your personal records.',
  },
  {
    title: 'My Subscriptions',
    description: 'Manage your program subscriptions.',
  },
]

export default function AthleteDashboard() {
  const { user, role } = useAuth()

  return (
    <main className="dashboard-page">

      <header className="dashboard-header">
        <h1>Athlete Dashboard</h1>
        <h2>Welcome, {user?.username}!</h2>
        <p>Role: {role}</p>
      </header>

      <section className="dashboard-grid">
        {athleteFeatures.map(feature => (
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