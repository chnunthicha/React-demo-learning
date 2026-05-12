import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { loginAPI } from '../services/api'

// ── สร้าง Context ─────────────────────────────────────────
const AuthContext = createContext(null)

// ── Provider — ครอบ App ทั้งหมด ───────────────────────────
export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [init, setInit] = useState(false)

  useEffect(() => {
    const savedUser = sessionStorage.getItem('demo_user')
    if (savedUser) {
      const parsed = JSON.parse(savedUser)
      setUser(parsed.user)
      setToken(parsed.token)
    }
    setInit(true)
  }, [])

  // ── Login ─────────────────────────────────────────────────
  const login = async (email, password) => {
    setLoading(true)
    setError('')
    try {
      const data = await loginAPI(email, password)
      setUser(data.user)
      setToken(data.token)
      sessionStorage.setItem('demo_user', JSON.stringify(data))
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  // ── Logout ────────────────────────────────────────────────
  const logout = () => {
    setUser(null)
    setToken(null)
    sessionStorage.removeItem('demo_user')
  }

  const value = useMemo(
    () => ({ user, token, loading, error, login, logout }),
    [user, token, loading, error, login, logout]
  )

  if (!init) return null
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// ── Custom Hook —───────────────────────
export function useAuth() {
  return useContext(AuthContext)
}
