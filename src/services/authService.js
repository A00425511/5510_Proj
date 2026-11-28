import { apiRequest, ApiError } from './api.js'

const VALID_ROLES = ['athlete', 'coach', 'admin']

export async function getCsrfToken() {
  const data = await apiRequest('/api/auth/csrf/')

  if (typeof data?.csrfToken !== 'string' || !data.csrfToken) {
    throw new Error('Unable to retrieve CSRF token')
  }

  return data.csrfToken
}

export async function getCurrentUser() {
  let user

  try {
    user = await apiRequest('/api/auth/user/')
  } catch (error) {
    if (
      error instanceof ApiError &&
      [401, 403].includes(error.status)
    ) {
      return null
    }

    throw error
  }

  const profile = await apiRequest('/api/profiles/me/')

  if (!VALID_ROLES.includes(profile?.role)) {
    throw new Error('Invalid or missing user role')
  }

  return {
    ...user,
    profileId: profile.id,
    role: profile.role,
    bio: profile.bio,
  }
}

export async function login({ username, password }) {
  const csrfToken = await getCsrfToken()

  await apiRequest('/api/auth/login/', {
    method: 'POST',
    body: { username, password },
    csrfToken,
  })

  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Unable to establish login session')
  }

  return user
}

export async function register({
  username,
  email,
  password1,
  password2,
}) {
  const csrfToken = await getCsrfToken()

  await apiRequest('/api/auth/registration/', {
    method: 'POST',
    body: {
      username,
      email,
      password1,
      password2,
    },
    csrfToken,
  })

  return getCurrentUser()
}

export async function logout() {
  const csrfToken = await getCsrfToken()

  await apiRequest('/api/auth/logout/', {
    method: 'POST',
    csrfToken,
  })
}