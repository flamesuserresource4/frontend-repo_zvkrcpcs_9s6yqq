import { useEffect, useState } from 'react'

export default function Admin() {
  const [health, setHealth] = useState(null)
  const [logs, setLogs] = useState([])
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    const h = await fetch(`${base}/api/health`).then(r=>r.json()).catch(()=>null)
    setHealth(h)
    const l = await fetch(`${base}/api/admin/etl-logs`).then(r=>r.json()).catch(()=>[])
    setLogs(l)
  }

  const run = async () => {
    await fetch(`${base}/api/admin/run-etl`, { method: 'POST' }).catch(()=>{})
    setTimeout(load, 500)
  }

  useEffect(()=>{ load() }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-14">
      <div className="max-w-6xl mx-auto px-6 py-8 text-blue-100">
        <h1 className="text-3xl font-bold text-white mb-4">Admin Dashboard</h1>
        <div className="flex items-center gap-3 mb-6">
          <span className={`px-2 py-1 rounded text-xs ${health?.database ? 'bg-emerald-600' : 'bg-red-600'}`}>{health?.database ? 'DB Connected' : 'DB Not Connected'}</span>
          <button onClick={run} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded">Run ETL</button>
          <button onClick={load} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded">Refresh</button>
        </div>

        <div className="bg-slate-800/60 border border-white/10 rounded-xl p-4">
          <h2 className="text-white font-semibold mb-3">Recent ETL Logs</h2>
          <ul className="text-sm space-y-2">
            {logs.map((l, i) => (
              <li key={i} className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-blue-200">{l.stage} - {l.status}</span>
                <span className="text-blue-300/70">{l.started_at || l.finished_at}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
