import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav>
      <NavLink to="/" className="brand">React Demo</NavLink>

      <NavLink to="/home"
        className={({ isActive }) => isActive ? 'active' : ''}>
        🏠 Home
      </NavLink>

      <NavLink to="/profile/1"
        className={({ isActive }) => isActive ? 'active' : ''}>
        👤 Profile
      </NavLink>

      {user && (
        <span className="user-info">สวัสดี {user.name}</span>
      )}

      <button className="logout-btn" onClick={handleLogout}>
        ออกจากระบบ
      </button>
    </nav>
  )
}

export default Navbar
