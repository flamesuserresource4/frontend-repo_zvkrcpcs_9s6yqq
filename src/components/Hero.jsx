import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] pt-14 overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/hGDm7Foxug7C6E8s/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-6xl font-black leading-tight text-white drop-shadow">Global City Intelligence Platform</h1>
          <p className="mt-6 text-blue-100 text-lg sm:text-xl">Compare cities across countries using normalized data on population, income, education, unemployment, crime, and cost of living.</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/40 to-slate-900"></div>
    </section>
  )
}
