import { useState } from 'react'
import useTodoStore from '../store/todoStore'

const FILTERS = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'active', label: 'ยังไม่เสร็จ' },
  { value: 'done', label: 'เสร็จแล้ว' }
]

function TodoList({ title }) {
  const [inputText, setInputText] = useState('')

  const { todos, filter, addTodo, toggleTodo, deleteTodo, setFilter } = useTodoStore()

  const filtered = todos.filter(todo => {
    if (filter === 'active') return !todo.done
    if (filter === 'done')   return todo.done
    return true
  })

  const handleAdd = () => {
    if (!inputText.trim()) return
    addTodo(inputText.trim())
    setInputText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd()
  }

  const doneCount   = todos.filter(t => t.done).length
  const activeCount = todos.filter(t => !t.done).length

  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="stats">
        <span className="stat-chip">ทั้งหมด <b>{todos.length}</b></span>
        <span className="stat-chip">ค้างอยู่ <b>{activeCount}</b></span>
        <span className="stat-chip">เสร็จแล้ว <b>{doneCount}</b></span>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: '0.75rem' }}>
        {FILTERS.map(f => (
          <button
            key={`filter-btn-${f.value}`}
            className={`btn btn-sm ${filter === f.value ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="todo-input-row">
        <input
          type="text"
          placeholder="เพิ่ม todo ใหม่..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn btn-primary" onClick={handleAdd}>
          + เพิ่ม
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="todo-empty">
          {todos.length === 0 ? 'ยังไม่มี Todo — เพิ่มได้เลย!' : 'ไม่มีรายการในหมวดนี้'}
        </div>
      ) : (
        filtered.map(todo => (
          <div key={todo.id} className={`todo-item ${todo.done ? 'done' : ''}`}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className="todo-text">{todo.text}</span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteTodo(todo.id)}
            >
              ลบ
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default TodoList
