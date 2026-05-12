import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')

  const { login, loading, error } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const success = await login(email, password)
    if (success) {
      navigate('/home')
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-box">
        <h1>เข้าสู่ระบบ</h1>
        <p className="subtitle">React Demo — Learning Project</p>

        {error && <div className="alert alert-error">❌ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">อีเมล</label>
            <input
              id="email"
              type="email"
              placeholder="alice@demo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">รหัสผ่าน</label>
            <input
              id="password"
              type="password"
              placeholder="••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            disabled={loading}
          >
            {loading ? '⏳ กำลังเข้าสู่ระบบ...' : '🔐 เข้าสู่ระบบ'}
          </button>
        </form>

        <div className="login-hint">
          <b>บัญชีทดสอบ:</b><br />
          📧 alice@demo.com / 1234 (admin)<br />
          📧 bob@demo.com / 1234 (user)
        </div>
      </div>
    </div>
  )
}

export default LoginPage
