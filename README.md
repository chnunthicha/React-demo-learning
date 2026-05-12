# React Demo — Learning Project

โปรเจ็คตัวอย่างสำหรับเรียนรู้ React concepts บทที่ 1-6

## วิธีรัน

```bash
npm install
npm run dev
```

เปิด http://localhost:5173

## บัญชีทดสอบ

| Email | Password | Role |
|-------|----------|------|
| alice@demo.com | 1234 | admin |
| bob@demo.com | 1234 | user |

---

## สิ่งที่เรียนรู้ในแต่ละไฟล์

| ไฟล์ | บทที่ | Concept |
|------|-------|---------|
| `src/App.jsx` | 4 | BrowserRouter, Routes, Route, Navigate, ProtectedRoute |
| `src/context/AuthContext.jsx` | 1-3, 6 | createContext, useState, useEffect, useContext, JWT token |
| `src/services/api.js` | 6 | Axios, Bearer token, Request/Response Interceptor |
| `src/store/todoStore.js` | 5 | Zustand — global state, actions |
| `src/components/ProtectedRoute.jsx` | 4 | Protected Route pattern |
| `src/components/Navbar.jsx` | 4 | NavLink, active class, useNavigate |
| `src/components/TodoList.jsx` | 1-3, 5 | useState, Zustand, Props |
| `src/pages/LoginPage.jsx` | 1-3, 4, 6 | Controlled Component, useNavigate, login API |
| `src/pages/HomePage.jsx` | 1-3, 4, 5 | useEffect API fetch, Context, Link, Zustand |
| `src/pages/ProfilePage.jsx` | 4, 5 | useParams, Zustand cross-page state |

---

## Concepts สรุป

### บทที่ 1-3: Core Fundamentals
- **useState** — จัดการ local state (form input, loading)
- **useEffect `[]`** — โหลดข้อมูลจาก API ตอน mount ครั้งเดียว
- **Props** — ส่งข้อมูลลง Component (title ใน TodoList)
- **Controlled Component** — input ผูกกับ state เสมอ

### บทที่ 4: React Router
- **BrowserRouter** — เปิดระบบ routing ครอบ App
- **Routes + Route** — กำหนด path → component
- **Link / NavLink** — เปลี่ยนหน้าไม่ reload (NavLink มี active class)
- **useParams** — ดึงค่า dynamic segment จาก URL เช่น `:userId`
- **useNavigate** — เปลี่ยนหน้าด้วย JavaScript
- **Protected Route** — ตรวจ token ก่อน render

### บทที่ 5: State Management
- **Context API** — เก็บ user + token (เปลี่ยนไม่บ่อย)
- **Zustand** — เก็บ todo list (เปลี่ยนบ่อย, ใช้ข้ามหน้า)
- เห็นความต่าง: Context vs Zustand ควรใช้เมื่อไหร่

### บทที่ 6: JWT (ส่วนหลัก)
- **Login API** — เรียก API แล้วเก็บ token ใน state (memory)
- **Axios instance** — ตั้ง base URL ที่เดียว
- **Request Interceptor** — ใส่ Authorization header อัตโนมัติ
- **Response Interceptor** — ดัก 401 แล้ว logout ทันที
