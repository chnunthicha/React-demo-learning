import { create } from 'zustand'

// ── สร้าง store ───────────────────────────────────────────────
const useTodoStore = create((set) => ({
  // State
  todos: [],
  filter: 'all',

  addTodo: (text) => set((state) => ({
    todos: [
      ...state.todos,
      { id: Date.now(), text, done: false }
    ]
  })),

  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    )
  })),

  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter(todo => todo.id !== id)
  })),

  setFilter: (filter) => set({ filter }),

  setTodos: (todos) => set({ todos }),
}))

export default useTodoStore
