import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../lib/axios'
import useAuthStore from '../store/auth'

export default function Profile() {
  const queryClient = useQueryClient()
  const { user, setAuth } = useAuthStore()
  const [fullName, setFullName] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [avatarFile, setAvatarFile] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const { data: profile, isLoading } = useQuery({
    queryKey: ['myProfile'],
    queryFn: () => api.get('/users/me').then(res => res.data),
    onSuccess: (data) => {
      if (data) setFullName(data.full_name || '')
    }
  })

  const updateProfileMut = useMutation({
    mutationFn: (data) => api.patch('/users/me', data),
    onSuccess: () => { setMessage('Profile updated'); queryClient.invalidateQueries('myProfile') },
    onError: (err) => setError(err.response?.data?.error || 'Failed')
  })

  const changePasswordMut = useMutation({
    mutationFn: (data) => api.patch('/users/me/password', data),
    onSuccess: () => { setMessage('Password changed'); setOldPassword(''); setNewPassword('') },
    onError: (err) => setError(err.response?.data?.error || 'Failed')
  })

  const avatarMut = useMutation({
    mutationFn: (file) => {
      const form = new FormData()
      form.append('file', file)
      return api.post('/uploads/avatar', form, { headers: { 'Content-Type': 'multipart/form-data' } })
    },
    onSuccess: (res) => {
      setMessage('Avatar updated')
      queryClient.invalidateQueries('myProfile')
    },
    onError: (err) => setError(err.response?.data?.error || 'Upload failed')
  })

  const handleAvatar = (e) => {
    const file = e.target.files[0]
    if (file) avatarMut.mutate(file)
  }

  if (isLoading) return <p>Loading profile...</p>

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>
      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={profile?.avatar_url || '/default-avatar.png'}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div>
            <input type="file" accept="image/*" onChange={handleAvatar} className="text-sm" />
          </div>
        </div>
        <p><strong>Email:</strong> {profile?.email}</p>
        <p><strong>Role:</strong> {profile?.role}</p>
        <p><strong>Status:</strong> {profile?.suspended ? 'Suspended' : 'Active'}</p>
        <p><strong>Member since:</strong> {new Date(profile?.created_at).toLocaleDateString()}</p>
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="font-semibold mb-2">Update Name</h3>
        <input
          type="text"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          className="border p-2 w-full mb-2"
          placeholder="Full Name"
        />
        <button
          onClick={() => updateProfileMut.mutate({ full_name: fullName })}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Save
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Change Password</h3>
        <input
          type="password"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
          className="border p-2 w-full mb-2"
          placeholder="Current password"
        />
        <input
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          className="border p-2 w-full mb-2"
          placeholder="New password (min 8 chars)"
        />
        <button
          onClick={() => changePasswordMut.mutate({ oldPassword, newPassword })}
          className="bg-green-500 text-white px-4 py-1 rounded"
        >
          Change Password
        </button>
      </div>
    </div>
  )
}
