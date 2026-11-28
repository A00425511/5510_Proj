import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

// Route guards
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import RoleRoute from './routes/RoleRoute.jsx'
import DashboardRedirect from './routes/DashboardRedirect.jsx'

// Authentication pages
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'

// Role-specific dashboards
import AthleteDashboard from './pages/dashboards/AthleteDashboard.jsx'
import CoachDashboard from './pages/dashboards/CoachDashboard.jsx'
import AdminDashboard from './pages/dashboards/AdminDashboard.jsx'

// Shared layout
import DashboardLayout from './layouts/DashboardLayout.jsx'

// General pages
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import Unauthorized from './pages/Unauthorized.jsx'
import NotFound from './pages/NotFound.jsx'


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />


        {/* Authentication required */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/dashboard"
            element={<DashboardRedirect />}
          />


          {/* Shared authenticated layout */}

          <Route element={<DashboardLayout />}>

            <Route
              path="/profile"
              element={<Profile />}
            />


            {/* Athlete-only routes */}

            <Route element={
              <RoleRoute allowedRoles={['athlete']} />
            }>
              <Route
                path="/athlete/dashboard"
                element={<AthleteDashboard />}
              />
            </Route>


            {/* Coach-only routes */}

            <Route element={
              <RoleRoute allowedRoles={['coach']} />
            }>
              <Route
                path="/coach/dashboard"
                element={<CoachDashboard />}
              />
            </Route>


            {/* Admin-only routes */}

            <Route element={
              <RoleRoute allowedRoles={['admin']} />
            }>
              <Route
                path="/admin/dashboard"
                element={<AdminDashboard />}
              />
            </Route>

          </Route>

        </Route>


        {/* Fallback route */}

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App