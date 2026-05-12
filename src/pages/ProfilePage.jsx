import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import useTodoStore from '../store/todoStore'

function ProfilePage() {
  const { userId } = useParams()

  // ข้อมูลจาก Context
  const { user, token } = useAuth()

  // ข้อมูลจาก Zustand store
  const todos  = useTodoStore(state => state.todos)
  const doneCount   = todos.filter(t => t.done).length
  const activeCount = todos.filter(t => !t.done).length

  return (
    <div className="page">
      <p className="page-title">= โปรไฟล์ =</p>
      <p className="page-sub">กำลังดู User ID: <b>{userId}</b></p>
      <div className="card">
        <h2>สิ่งที่เรียนรู้ในหน้านี้</h2>

        <div className="concept-box">
          <b>useParams()</b> — ดึงค่าจาก URL parameter<br />
          URL ปัจจุบัน: <b>/profile/{userId}</b> → useParams() คืน{' '}
          <code style={{background:'#f1f5f9',padding:'1px 6px',borderRadius:4}}>
            {'{ userId: "' + userId + '" }'}
          </code>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link to="/profile/1" className="btn btn-ghost btn-sm">User 1</Link>
          <Link to="/profile/2" className="btn btn-ghost btn-sm">User 2</Link>
          <Link to="/profile/3" className="btn btn-ghost btn-sm">User 3</Link>
        </div>
        <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: 6 }}>
          ลองกดเปลี่ยน User — userId ใน URL และ component จะอัปเดตอัตโนมัติ
        </p>
      </div>

      {/* ── Profile Info (Context) ────────────────────── */}
      <div className="card">
        <h2>ข้อมูลที่กำลัง login อยู่</h2>
        <div className="concept-box" style={{ marginBottom: '1rem' }}>
          <b>useAuth (Context API)</b> — ข้อมูลนี้มาจาก AuthContext ไม่ต้องส่ง props
        </div>

        <div className="profile-avatar">
          {user?.name?.[0] ?? '?'}
        </div>

        {[
          ['ชื่อ', user?.name],
          ['อีเมล', user?.email],
          ['Role', user?.role],
          ['User ID', user?.id],
          ['Token', token ? token.slice(0, 30) + '...' : '-'],
        ].map(([label, value]) => (
          <div key={label} className="profile-row">
            <span className="label">{label}</span>
            <span className="value">{value ?? '-'}</span>
          </div>
        ))}
      </div>

      {/* ── to do Stats (Zustand) ─────────────────────── */}
      <div className="card">
        <h2>สถิติ Todo list</h2>
        <div className="concept-box" style={{ marginBottom: '1rem' }}>
          <b>Zustand</b> — ข้อมูลเดียวกับ HomePage เพราะใช้ global store ร่วมกัน
          ไม่ต้องส่ง props ข้ามหน้า
        </div>

        <div className="stats">
          <div className="stat-chip">ทั้งหมด <b>{todos.length}</b> รายการ</div>
          <div className="stat-chip">เสร็จแล้ว <b>{doneCount}</b> รายการ</div>
          <div className="stat-chip">ค้างอยู่ <b>{activeCount}</b> รายการ</div>
        </div>

        <Link to="/home" className="btn btn-ghost btn-sm">
          ← กลับไปจัดการ Todo
        </Link>
      </div>
    </div>
  )
}

export default ProfilePage
