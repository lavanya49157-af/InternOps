import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useSearchParams, Link } from 'react-router-dom'
import api from '../lib/axios'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const tokenFromUrl = searchParams.get('token') || ''
  const [token, setToken] = useState(tokenFromUrl)
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const resetMut = useMutation({
    mutationFn: (data) => api.post('/auth/reset-password', data),
    onSuccess: (res) => { setMessage(res.data.message); setError('') },
    onError: (err) => setError(err.response?.data?.error || 'Reset failed')
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    resetMut.mutate({ token, newPassword })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        {message && <p className="text-green-600 mb-2">{message}</p>}
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Reset token" value={token} onChange={e => setToken(e.target.value)} className="w-full border p-2 mb-2 rounded" required />
          <input type="password" placeholder="New password (min 8 chars)" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full border p-2 mb-4 rounded" required />
          <button type="submit" disabled={resetMut.isLoading} className="w-full bg-green-600 text-white p-2 rounded">
            {resetMut.isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        <p className="mt-2 text-sm"><Link to="/login" className="text-blue-500">Back to Login</Link></p>
      </div>
    </div>
  )
}
