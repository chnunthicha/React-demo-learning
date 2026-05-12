import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import TodoList from '../components/TodoList'
import useTodoStore from '../store/todoStore'
import { fetchTodos } from '../services/api'

function HomePage() {
  const { user, token } = useAuth()

  const setTodos = useTodoStore(state => state.setTodos)

  const [apiLoading, setApiLoading] = useState(false)
  const [apiLoaded, setApiLoaded]   = useState(false)

  useEffect(() => {
    const loadTodos = async () => {
      setApiLoading(true)
      try {
        const data = await fetchTodos()
        const mapped = data.map(t => ({
          id: t.id,
          text: t.title,
          done: t.completed,
        }))
        setTodos(mapped)
        setApiLoaded(true)
      } catch {
        setTodos([])
        setApiLoaded(true)
      } finally {
        setApiLoading(false)
      }
    }
    loadTodos()
  }, [setTodos])

  return (
    <div className="page">
      <p className="page-title">🏠 หน้าหลัก</p>
      <p className="page-sub">ยินดีต้อนรับ {user?.name} — role: {user?.role}</p>

      <div className="card">
        <h2>สิ่งที่เรียนรู้ในหน้านี้</h2>

        <div className="concept-box">
          <b>useEffect + useState</b> — โหลด todos จาก API ตอน mount<br />
          {apiLoading && 'กำลังโหลดจาก API...'}
          {apiLoaded  && 'โหลดข้อมูลจาก JSONPlaceholder API เรียบร้อย'}
        </div>

        <div className="concept-box">
          <b>Context API (useAuth)</b> — อ่าน user จาก AuthContext<br />
          ชื่อ: <b>{user?.name}</b> | Role: <b>{user?.role}</b> | Token: <b>{token ? token.slice(0, 20) + '...' : 'ไม่มี'}</b>
        </div>

        <div className="concept-box">
          <b>Link</b> — เปลี่ยนหน้าโดยไม่ reload:{' '}
          <Link to="/profile/1" style={{ color: '#0d9488' }}>Go to Profile user 1</Link> | <Link to="/profile/2" style={{ color: '#0d9488' }}>Go to Profile user 2</Link>
        </div>

        <div className="concept-box">
          <b>Zustand</b> — TodoList ด้านล่างใช้ global store
          ลองเพิ่ม todo แล้วไปดูที่หน้า Profile — ข้อมูลยังอยู่ครบ
        </div>
      </div>

      <TodoList title="Todo List (Zustand Store)" />
    </div>
  )
}

export default HomePage
