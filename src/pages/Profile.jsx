import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

export default function Profile() {
  const { user, role } = useAuth()

  return (
    <main className="profile-page">

      <header>
        <h1>My Profile</h1>
        <p>View your RepLab account information.</p>
      </header>

      <section className="profile-card">

        <h2>Account Information</h2>

        <dl>
          <dt>User ID</dt>
          <dd>{user?.pk}</dd>

          <dt>Username</dt>
          <dd>{user?.username}</dd>

          <dt>Email</dt>
          <dd>{user?.email}</dd>

          <dt>First Name</dt>
          <dd>{user?.first_name || 'Not provided'}</dd>

          <dt>Last Name</dt>
          <dd>{user?.last_name || 'Not provided'}</dd>

          <dt>Account Role</dt>
          <dd>{role}</dd>

          <dt>Biography</dt>
          <dd>{user?.bio || 'Not provided'}</dd>
        </dl>

      </section>

      <Link to="/dashboard">
        Back to Dashboard
      </Link>

    </main>
  )
}