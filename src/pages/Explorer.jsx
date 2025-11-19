import { useEffect, useState } from 'react'

export default function Explorer() {
  const [code, setCode] = useState('USA')
  const [rows, setRows] = useState([])

  const load = async () => {
    const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const res = await fetch(`${base}/api/country/${code}/cities`)
    const j = await res.json()
    setRows(j)
  }

  useEffect(() => { load() }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-14">
      <div className="max-w-6xl mx-auto px-6 py-8 text-blue-100">
        <h1 className="text-3xl font-bold text-white mb-4">Country Explorer</h1>
        <div className="flex gap-2 mb-6">
          <select value={code} onChange={(e)=>setCode(e.target.value)} className="bg-slate-800 text-white px-3 py-2 rounded">
            {['USA','CAN','GBR','AUS','DEU','NLD'].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={load} className="bg-blue-600 hover:bg-blue-500 text-white px-4 rounded">Load</button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-800 text-blue-200">
              <tr>
                <th className="text-left p-3">City</th>
                <th className="text-right p-3">Score</th>
                <th className="text-right p-3">Income</th>
                <th className="text-right p-3">Education</th>
                <th className="text-right p-3">Unemployment</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.city} className="border-t border-white/10">
                  <td className="p-3 text-white">{r.city}</td>
                  <td className="p-3 text-right text-white font-semibold">{r.score?.toFixed(1)}</td>
                  <td className="p-3 text-right">{r.normalized?.median_income}</td>
                  <td className="p-3 text-right">{r.normalized?.education_level}</td>
                  <td className="p-3 text-right">{r.normalized?.unemployment_rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
