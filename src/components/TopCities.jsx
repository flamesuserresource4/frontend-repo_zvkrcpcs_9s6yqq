import { useEffect, useState } from 'react'

export default function TopCities() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/top-cities`)
        const data = await res.json()
        setItems(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-white mb-6">Top Cities</h2>
      {loading ? (
        <p className="text-blue-200">Loading...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((c) => (
            <div key={`${c.country_code}-${c.city}`} className="bg-slate-800/60 border border-white/10 rounded-xl p-4 text-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">{c.city}</p>
                  <p className="text-xs text-blue-300/70">{c.country_code}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-white">{c.score?.toFixed(1)}</p>
                  <p className="text-xs text-blue-300/70">Composite</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
