import { useEffect, useState } from 'react'

export default function Compare() {
  const [a, setA] = useState('New York')
  const [b, setB] = useState('London')
  const [data, setData] = useState(null)

  const load = async () => {
    const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const res = await fetch(`${base}/api/city/compare?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`)
    const j = await res.json()
    setData(j)
  }

  useEffect(() => {
    load()
  }, [])

  const Radar = ({ title, normalized }) => {
    if (!normalized?.normalized) return null
    const metrics = normalized.normalized
    return (
      <div className="bg-slate-800/60 border border-white/10 rounded-xl p-4 text-blue-100">
        <h3 className="text-white font-semibold mb-2">{title}</h3>
        <ul className="text-sm space-y-1">
          {Object.entries(metrics).map(([k, v]) => (
            <li key={k} className="flex items-center justify-between">
              <span className="capitalize">{k.replaceAll('_',' ')}</span>
              <span className="text-white font-semibold">{v}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-14">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-white mb-4">City Comparison</h1>
        <div className="flex gap-2 mb-6">
          <input value={a} onChange={(e)=>setA(e.target.value)} className="bg-slate-800 text-white px-3 py-2 rounded" />
          <input value={b} onChange={(e)=>setB(e.target.value)} className="bg-slate-800 text-white px-3 py-2 rounded" />
          <button onClick={load} className="bg-blue-600 hover:bg-blue-500 text-white px-4 rounded">Compare</button>
        </div>
        {data ? (
          <div className="grid sm:grid-cols-2 gap-4">
            <Radar title={a} normalized={data.a?.normalized} />
            <Radar title={b} normalized={data.b?.normalized} />
          </div>
        ) : (
          <p className="text-blue-200">Loading...</p>
        )}
      </div>
    </div>
  )
}
