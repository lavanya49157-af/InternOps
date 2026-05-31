import { useQuery } from '@tanstack/react-query'
import api from '../../lib/axios'

export default function AuditLog() {
  const { data: logs, isLoading } = useQuery({
    queryKey: ['auditLogs'],
    queryFn: () => api.get('/audit').then(res => res.data),
    refetchInterval: 60000,
  })

  if (isLoading) return <p>Loading audit logs...</p>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Audit Log</h2>
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Timestamp</th>
              <th className="p-2 border">User ID</th>
              <th className="p-2 border">Action</th>
              <th className="p-2 border">Resource</th>
              <th className="p-2 border">Details</th>
            </tr>
          </thead>
          <tbody>
            {logs?.map(log => (
              <tr key={log.id}>
                <td className="p-2 border text-sm">{new Date(log.created_at).toLocaleString()}</td>
                <td className="p-2 border text-sm">{log.user_id ? log.user_id.substring(0,8) + '...' : 'system'}</td>
                <td className="p-2 border text-sm">{log.action}</td>
                <td className="p-2 border text-sm">{log.resource_type}/{log.resource_id}</td>
                <td className="p-2 border text-sm">{JSON.stringify(log.details)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
