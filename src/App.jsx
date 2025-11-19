import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TopCities from './components/TopCities'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <Hero />
      <TopCities />
    </div>
  )
}

export default App