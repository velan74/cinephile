import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const SLIDES = [
  { url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&q=80', credit: 'Unsplash' },
  { url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&q=80', credit: 'Unsplash' },
  { url: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1600&q=80', credit: 'Unsplash' },
  { url: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=1600&q=80', credit: 'Unsplash' },
]

const FEATURES = [
  { to: '/finder',    icon: '◎', label: 'Movie Finder',   desc: 'Search across thousands of films instantly.' },
  { to: '/directors', icon: '✦', label: 'Auteurs',        desc: 'The directors who redefined cinema forever.' },
  { to: '/history',   icon: '◈', label: 'Cinema History', desc: 'A century of milestones, movements, and magic.' },
  { to: '/genres',    icon: '◇', label: 'Genre Explorer', desc: 'Browse film by mood, era, and form.' },
]

const QUOTES = [
  { text: 'Cinema is a mirror by which we often see ourselves.', attr: '— Roger Ebert' },
  { text: 'Film is never really good unless the camera is an eye in the head of a poet.', attr: '— Orson Welles' },
  { text: "A film is — or should be — more like music than like fiction.", attr: '— Stanley Kubrick' },
]

export default function Home() {
  const [current,  setCurrent]  = useState(0)
  const [fading,   setFading]   = useState(false)
  const [quoteIdx, setQuoteIdx] = useState(0)
  const [imgLoaded, setImgLoaded] = useState({})

  // Slideshow
  useEffect(() => {
    const t = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setCurrent(c => (c + 1) % SLIDES.length)
        setFading(false)
      }, 700)
    }, 5500)
    return () => clearInterval(t)
  }, [])

  // Quote rotate
  useEffect(() => {
    const t = setInterval(() => setQuoteIdx(q => (q + 1) % QUOTES.length), 6000)
    return () => clearInterval(t)
  }, [])

  const q = QUOTES[quoteIdx]

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative h-screen min-h-[560px] flex items-center justify-center overflow-hidden">
        {/* Background slides */}
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
            style={{
              backgroundImage: `url(${slide.url})`,
              opacity: i === current ? (fading ? 0 : 1) : 0,
            }}
          />
        ))}
        {/* Overlays */}
        <div className="absolute inset-0 bg-[#0b0b0b88]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0b55] via-transparent to-[#0b0b0b]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0b55] via-transparent to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 text-center px-5 sm:px-8 max-w-4xl mx-auto">
          <p className="text-[#c9a84c] text-[10px] sm:text-[11px] tracking-[5px] sm:tracking-[7px] uppercase font-inter mb-6 fade-in">
            Est. 1895 · The Art of Moving Images
          </p>
          <h1 className="font-playfair text-4xl sm:text-6xl md:text-7xl text-[#e8e4dc] leading-tight mb-4 fade-up d-200">
            Cinema is not just<br />
            <em className="text-[#c9a84c] not-italic font-playfair">entertainment.</em>
          </h1>
          <p className="font-playfair italic text-lg sm:text-2xl text-[#e8e4dc88] mb-10 fade-up d-300">
            It's an experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center fade-up d-400">
            <Link to="/finder"    className="btn-gold">Explore Films</Link>
            <Link to="/directors" className="btn-gold">Meet the Auteurs</Link>
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-400 h-px ${i === current ? 'w-8 bg-[#c9a84c]' : 'w-3 bg-[#5a5a5a55]'}`}
            />
          ))}
        </div>
      </section>

      {/* ── Rotating quote bar ── */}
      <section className="border-y border-[#1e1e1e] py-5 px-5 sm:px-8 overflow-hidden">
        <div key={quoteIdx} className="fade-in text-center">
          <p className="font-playfair italic text-[#5a5a5a] text-sm sm:text-base">
            "{q.text}"
          </p>
          <p className="text-[#3a3a3a] text-[10px] tracking-widest uppercase font-inter mt-2">{q.attr}</p>
        </div>
      </section>

      {/* ── Feature cards ── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <p className="text-[#c9a84c] text-[10px] tracking-[4px] uppercase font-inter mb-3 fade-in">
          Explore
        </p>
        <h2 className="font-playfair text-3xl sm:text-4xl text-[#e8e4dc] mb-4 fade-up">
          The Cinephile Universe
        </h2>
        <div className="gold-line mb-12" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map(({ to, icon, label, desc }, i) => (
            <Link
              key={to}
              to={to}
              className="group block border border-[#1e1e1e] p-7 sm:p-8
                hover:border-[#c9a84c33] hover:bg-[#c9a84c05]
                transition-all duration-500 fade-up"
              style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
            >
              <div className="text-[#c9a84c] text-2xl mb-6 transition-transform duration-300 group-hover:scale-110">
                {icon}
              </div>
              <h3 className="font-playfair text-lg text-[#e8e4dc] mb-2">{label}</h3>
              <p className="text-[#5a5a5a] text-xs font-inter leading-relaxed">{desc}</p>
              <div className="mt-6 text-[#c9a84c] text-[10px] tracking-widest uppercase font-inter
                opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Enter →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="border-t border-[#1e1e1e] py-12 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { n: '130+', l: 'Years of Cinema'   },
            { n: '5',    l: 'Master Directors'  },
            { n: '12',   l: 'Genre Categories'  },
            { n: '∞',    l: 'Films to Discover' },
          ].map(({ n, l }) => (
            <div key={l}>
              <p className="font-playfair text-3xl sm:text-4xl text-[#c9a84c] mb-1">{n}</p>
              <p className="text-[#3a3a3a] text-[10px] tracking-widest uppercase font-inter">{l}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
