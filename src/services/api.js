import axios from 'axios'

// ── Mock users ──────────────────────────────
const MOCK_USERS = [
  { id: 1, email: 'alice@demo.com', password: '1234', name: 'Alice', role: 'admin' },
  { id: 2, email: 'bob@demo.com',   password: '1234', name: 'Bob',   role: 'user'  },
]

// ── Mock JWT token (จำลองเท่านั้น) ───────────────────────────
function makeMockToken(user) {
  const payload = { userId: user.id, role: user.role, exp: Date.now() + 3600000 }
  return 'mock-jwt.' + btoa(JSON.stringify(payload))
}

// ── Login API (mock) ────────────────────────────────
export async function loginAPI(email, password) {
  // หน่วงเวลา 600ms จำลอง network request
  await new Promise(r => setTimeout(r, 600))

  const found = MOCK_USERS.find(
    u => u.email === email && u.password === password
  )
  if (!found) throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง')

  const { password: _, ...user } = found
  return { user, token: makeMockToken(user) }
}

// ── Axios instance ──────────────────────────────────
export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // mock REST API ฟรี
  timeout: 5000,
})

// ── Request Interceptor ────────────────────────────
api.interceptors.request.use((config) => {
  const saved = sessionStorage.getItem('demo_user')
  if (saved) {
    const { token } = JSON.parse(saved)
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ── Response Interceptor ───────────────────────────
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('demo_user')
      globalThis.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ── API functions ────────────────────────────────────────
export const fetchTodos = () =>
  api.get('/todos?_limit=5').then(r => r.data)
