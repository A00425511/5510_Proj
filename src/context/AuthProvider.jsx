import { useEffect, useRef, useState } from 'react'
import { AuthContext } from './AuthContext.js'
import * as authService from '../services/authService.js'

export default function AuthProvider({ children }) {
  const [session, setSession] = useState({
    user: null,
    status: 'loading',
    error: null,
  })

  const [busy, setBusy] = useState(false)
  const inFlight = useRef(false)

  useEffect(() => {
    let active = true

    authService.getCurrentUser()
      .then((user) => {
        if (active) {
          setSession({
            user,
            status: user ? 'authenticated' : 'anonymous',
            error: null,
          })
        }
      })
      .catch((error) => {
        if (active) {
          setSession({
            user: null,
            status: 'error',
            error,
          })
        }
      })

    return () => {
      active = false
    }
  }, [])

  async function runAuthAction(action) {
    if (session.status === 'loading' || inFlight.current) {
      throw new Error('Authentication operation in progress')
    }

    inFlight.current = true
    setBusy(true)

    try {
      const user = await action()

      setSession({
        user,
        status: user ? 'authenticated' : 'anonymous',
        error: null,
      })

      return user
    } catch (error) {
      setSession({
        user: null,
        status: 'error',
        error,
      })

      throw error
    } finally {
      inFlight.current = false
      setBusy(false)
    }
  }

  function login(credentials) {
    return runAuthAction(
      () => authService.login(credentials)
    )
  }

  function register(details) {
    return runAuthAction(
      () => authService.register(details)
    )
  }

  function logout() {
    return runAuthAction(async () => {
      await authService.logout()
      return null
    })
  }

  function refreshUser() {
    return runAuthAction(
      () => authService.getCurrentUser()
    )
  }

  const value = {
    user: session.user,
    role: session.user?.role ?? null,
    status: session.status,
    error: session.error,
    isAuthenticated: session.status === 'authenticated',
    isLoading: session.status === 'loading',
    busy,
    login,
    register,
    logout,
    refreshUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}