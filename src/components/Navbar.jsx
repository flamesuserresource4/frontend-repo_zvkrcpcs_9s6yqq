import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const navLinkClass = ({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? 'bg-blue-600 text-white' : 'text-blue-200 hover:text-white hover:bg-blue-600/30'
  }`

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-slate-900/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white font-semibold">
          <img src="/flame-icon.svg" className="w-6 h-6" />
          <span>GCIP</span>
        </Link>
        <nav className="flex items-center gap-2">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/compare" className={navLinkClass}>
            Compare
          </NavLink>
          <NavLink to="/explorer" className={navLinkClass}>
            Explorer
          </NavLink>
          <NavLink to="/admin" className={navLinkClass}>
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
