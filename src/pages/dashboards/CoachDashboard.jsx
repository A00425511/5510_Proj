import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'

const coachFeatures = [
  {
    title: 'My Athletes',
    description: 'View and manage your assigned athletes.',
  },
  {
    title: 'Workout Builder',
    description: 'Create and manage workout routines.',
  },
  {
    title: 'Program Management',
    description: 'Create and assign training programs.',
  },
  {
    title: 'Workout Scheduling',
    description: 'Schedule training sessions for athletes.',
  },
  {
    title: 'Athlete Performance',
    description: 'Monitor athlete progress and personal records.',
  },
  {
    title: 'Subscription Management',
    description: 'Manage your training program offerings.',
  },
]

export default function CoachDashboard() {
  const { user, role } = useAuth()

  return (
    <main className="dashboard-page">

      <header className="dashboard-header">
        <h1>Coach Dashboard</h1>
        <h2>Welcome, {user?.username}!</h2>
        <p>Role: {role}</p>
      </header>

      <section className="dashboard-grid">
        {coachFeatures.map(feature => (
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