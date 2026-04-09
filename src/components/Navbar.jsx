import { useState, useEffect, useCallback } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const NAV = [
  { to: '/',          label: 'Home'       },
  { to: '/finder',    label: 'Finder'     },
  { to: '/directors', label: 'Directors'  },
  { to: '/history',   label: 'History'    },
  { to: '/genres',    label: 'Genres'     },
  { to: '/favorites', label: 'Favourites' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [location.pathname])

  // Close menu on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const linkClass = ({ isActive }) =>
    `text-[11px] tracking-[2.5px] uppercase font-inter transition-colors duration-300
     ${isActive ? 'text-[#c9a84c]' : 'text-[#5a5a5a] hover:text-[#e8e4dc]'}`

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled ? 'bg-[#0b0b0bee] backdrop-blur-md border-b border-[#1e1e1e]' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="font-playfair text-lg sm:text-xl tracking-[4px] text-[#c9a84c] flex-shrink-0">
            CINEPHILE
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7 lg:gap-10">
            {NAV.map(({ to, label }) => (
              <NavLink key={to} to={to} className={linkClass}>{label}</NavLink>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 focus:outline-none"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <span className={`block h-px bg-[#c9a84c] transition-all duration-300 origin-center
              ${open ? 'w-6 rotate-45 translate-y-[7px]' : 'w-6'}`} />
            <span className={`block h-px bg-[#c9a84c] transition-all duration-300
              ${open ? 'w-0 opacity-0' : 'w-4'}`} />
            <span className={`block h-px bg-[#c9a84c] transition-all duration-300 origin-center
              ${open ? 'w-6 -rotate-45 -translate-y-[7px]' : 'w-5'}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-400
        ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-[#0b0b0bf5]" onClick={() => setOpen(false)} />
        <div className={`absolute top-16 left-0 right-0 border-b border-[#1e1e1e]
          bg-[#0b0b0b] transition-all duration-400
          ${open ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
          <div className="flex flex-col px-6 py-6 gap-6">
            {NAV.map(({ to, label }) => (
              <NavLink key={to} to={to} className={linkClass} onClick={() => setOpen(false)}>
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
