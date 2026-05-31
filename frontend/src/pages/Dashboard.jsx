import { Link, Routes, Route, useLocation } from 'react-router-dom'
import Home from './Home'
import Attendance from './Attendance'
import Ratings from './Ratings'
import Tasks from './Tasks'
import Meetings from './Meetings'
import Notifications from './Notifications'
import Profile from './Profile'
import Sessions from './Sessions'
import Reports from './admin/Reports'
import Analytics from './admin/Analytics'
import AdminDashboard from './admin/AdminDashboard'
import AuditLog from './admin/AuditLog'
import Exports from './admin/Exports'

const nav = [
  { path:'/', label:'Dashboard' },
  { path:'/attendance', label:'Attendance' },
  { path:'/ratings', label:'Ratings' },
  { path:'/tasks', label:'Tasks' },
  { path:'/meetings', label:'Meetings' },
  { path:'/notifications', label:'Notifications' },
  { path:'/profile', label:'Profile' },
  { path:'/sessions', label:'Sessions' },
  { path:'/reports', label:'Reports' },
]

const adminNav = [
  { path:'/admin', label:'Admin Panel' },
  { path:'/analytics', label:'Analytics' },
  { path:'/audit', label:'Audit Log' },
  { path:'/exports', label:'Exports' },
]

export default function Dashboard() {
  const loc = useLocation()
  const isAdmin = JSON.parse(localStorage.getItem('user')||'{}').role === 'ADMIN'

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">InternOps</h2>
        <nav className="flex flex-col gap-2">
          {nav.map(n => (
            <Link key={n.path} to={n.path} className={`p-2 rounded hover:bg-gray-700 ${loc.pathname===n.path?'bg-gray-700':''}`}>
              {n.label}
            </Link>
          ))}
          {isAdmin && (
            <>
              <hr className="border-gray-600 my-2" />
              {adminNav.map(n => (
                <Link key={n.path} to={n.path} className={`p-2 rounded hover:bg-gray-700 ${loc.pathname===n.path?'bg-gray-700':''}`}>
                  {n.label}
                </Link>
              ))}
            </>
          )}
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        <Routes>
          <Route index element={<Home />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="ratings" element={<Ratings />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="meetings" element={<Meetings />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="reports" element={<Reports />} />
          {isAdmin && (
            <>
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="audit" element={<AuditLog />} />
              <Route path="exports" element={<Exports />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  )
}
