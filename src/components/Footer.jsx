import { Link } from 'react-router-dom'

const LINKS = [
  { to: '/finder',    label: 'Finder'    },
  { to: '/directors', label: 'Directors' },
  { to: '/history',   label: 'History'   },
  { to: '/genres',    label: 'Genres'    },
  { to: '/favorites', label: 'Favourites'},
]

export default function Footer() {
  return (
    <footer className="border-t border-[#1e1e1e] mt-24 pt-12 pb-8 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between gap-8 mb-10">
          {/* Brand */}
          <div>
            <Link to="/" className="font-playfair text-xl tracking-[4px] text-[#c9a84c]">
              CINEPHILE
            </Link>
            <p className="text-[#3a3a3a] text-xs font-inter italic mt-2 max-w-xs leading-relaxed">
              "Cinema is not just entertainment. It's an experience."
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {LINKS.map(({ to, label }) => (
              <Link
                key={to} to={to}
                className="text-[10px] tracking-[2px] uppercase font-inter text-[#3a3a3a] hover:text-[#c9a84c] transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-[#1e1e1e] pt-6 flex flex-col sm:flex-row justify-between gap-2">
          <p className="text-[#222] text-[10px] font-inter tracking-wider">© {new Date().getFullYear()} Cinephile</p>
          <p className="text-[#222] text-[10px] font-inter">Powered by OMDb API</p>
        </div>
      </div>
    </footer>
  )
}
