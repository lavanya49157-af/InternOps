import { useState } from 'react'
import api from '../../lib/axios'

export default function Exports() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const download = (endpoint) => {
    const url = `/api/reports/export/${endpoint}?from=${from}&to=${to}`
    window.open(url, '_blank')
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Export Reports</h2>
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block text-sm">From</label>
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">To</label>
          <input type="date" value={to} onChange={e => setTo(e.target.value)} className="border p-2 rounded" />
        </div>
      </div>
      <div className="space-x-2">
        <button onClick={() => download('attendance-csv')} className="bg-blue-500 text-white px-4 py-2 rounded">
          Export Attendance CSV
        </button>
        <button onClick={() => download('ratings-csv')} className="bg-green-500 text-white px-4 py-2 rounded">
          Export Ratings CSV
        </button>
        <button onClick={() => download('tasks-csv')} className="bg-purple-500 text-white px-4 py-2 rounded">
          Export Tasks CSV
        </button>
      </div>
    </div>
  )
}
