import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import api from '../lib/axios'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const forgotMut = useMutation({
    mutationFn: (email) => api.post('/auth/forgot-password', { email }),
    onSuccess: (res) => { setMessage(res.data.message); setError('') },
    onError: (err) => setError(err.response?.data?.error || 'Request failed')
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    forgotMut.mutate(email)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
        {message && <p className="text-green-600 mb-2">{message}</p>}
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-2 mb-2 rounded" required />
          <button type="submit" disabled={forgotMut.isLoading} className="w-full bg-blue-600 text-white p-2 rounded">
            {forgotMut.isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <p className="mt-2 text-sm"><Link to="/login" className="text-blue-500">Back to Login</Link></p>
      </div>
    </div>
  )
}
