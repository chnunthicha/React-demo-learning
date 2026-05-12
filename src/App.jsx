import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import Navbar       from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

import LoginPage    from './pages/LoginPage'
import HomePage     from './pages/HomePage'
import ProfilePage  from './pages/ProfilePage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={
            <ProtectedRoute>
              <Navbar />
              <HomePage />
            </ProtectedRoute>
          } />

          <Route path="/profile/:userId" element={
            <ProtectedRoute>
              <Navbar />
              <ProfilePage />
            </ProtectedRoute>
          } />

          <Route path="/" element={<Navigate to="/home" replace />} />

          <Route path="*" element={
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <h2>404 — ไม่พบหน้าที่ต้องการ</h2>
              <Link to="/home">กลับหน้าหลัก</Link>
            </div>
          } />
        </Routes>

      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
