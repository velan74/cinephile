import { useRef, useState } from 'react'
import SectionTitle from '../components/SectionTitle'

const ERAS = [
  {
    year: '1895',
    era: 'The Birth',
    title: 'Lumière Brothers',
    desc: 'The Cinématographe is unveiled in Paris. Workers leaving a factory, a train arriving at a station — the mundane becomes miraculous. Cinema is born in a basement café.',
    films: ['L\'Arrivée d\'un train', 'La Sortie de l\'usine'],
  },
  {
    year: '1902',
    era: 'Silent Wonder',
    title: 'A Trip to the Moon',
    desc: 'Georges Méliès transforms cinema into spectacle and fantasy. A rocket pierces the moon\'s eye. Film discovers it can dream beyond reality.',
    films: ['Le Voyage dans la Lune', 'The Great Train Robbery'],
  },
  {
    year: '1915',
    era: 'Narrative Grammar',
    title: 'D.W. Griffith',
    desc: 'The Birth of a Nation — morally troubling, technically revolutionary — establishes cinematic grammar: cross-cutting, close-up, parallel editing. Film learns to tell stories.',
    films: ['The Birth of a Nation', 'Intolerance'],
  },
  {
    year: '1920s',
    era: 'Expressionism',
    title: 'German Cinema',
    desc: 'Shadow, distortion and dread. Cinema becomes a landscape of the fractured psyche — angular sets, dramatic shadows, horror as inner life. The darkness has arrived.',
    films: ['Nosferatu', 'The Cabinet of Dr. Caligari', 'Metropolis'],
  },
  {
    year: '1941',
    era: 'Classic Hollywood',
    title: 'Citizen Kane',
    desc: 'Orson Welles, age 26, shatters every convention. Deep focus, non-linear time, the unreliable narrator. A debut film that reinvents the form entirely.',
    films: ['Citizen Kane', 'Casablanca', 'Double Indemnity'],
  },
  {
    year: '1950s',
    era: 'World Cinema',
    title: 'Global Voices',
    desc: 'Italian neorealism. Japanese cinema. Cinema becomes truly global — each culture finding its own poetic voice, its own language for the everyday and the universal.',
    films: ['Bicycle Thieves', 'Tokyo Story', 'Seven Samurai'],
  },
  {
    year: '1960',
    era: 'The New Wave',
    title: 'Nouvelle Vague',
    desc: 'Godard, Truffaut, Varda. Handheld cameras take to Paris streets. Jump cuts. Rules made to break. A revolution in feeling and form that shook cinema to its roots.',
    films: ['Breathless', 'The 400 Blows', 'Cléo from 5 to 7'],
  },
  {
    year: '1970s',
    era: 'New Hollywood',
    title: 'The American Renaissance',
    desc: 'Coppola, Kubrick, Spielberg, Scorsese. The blockbuster is born. The auteur thrives. A decade of contradictions that produced the most towering American films ever made.',
    films: ['The Godfather', 'Chinatown', 'Apocalypse Now'],
  },
  {
    year: '1990s',
    era: 'Independent Wave',
    title: 'Margins to Centre',
    desc: 'Tarantino revives non-linear storytelling. Wong Kar-wai redefines cinematic longing. Iranian, Taiwanese, and Hong Kong cinema astonish the world. The margins become the centre.',
    films: ['Pulp Fiction', 'Chungking Express', 'A Taste of Cherry'],
  },
  {
    year: '2000s',
    era: 'Digital Revolution',
    title: 'Pixels & Poetry',
    desc: 'Digital cameras democratise filmmaking. Ambition outpaces budget constraints for the first time. The Tree of Life, No Country for Old Men. Cinema becomes personal again.',
    films: ['No Country for Old Men', 'The Tree of Life', 'Pan\'s Labyrinth'],
  },
  {
    year: '2019',
    era: 'Global Cinema',
    title: 'Parasite',
    desc: 'Bong Joon-ho wins the Palme d\'Or and the Oscar for Best Picture. A South Korean film about class anxiety conquers the anglophone world. Cinema has no borders.',
    films: ['Parasite', 'Portrait of a Lady on Fire', 'Atlantics'],
  },
  {
    year: '2020s',
    era: 'Now',
    title: 'Enduring Magic',
    desc: 'Cinema survives pandemic, streaming upheaval, and platform wars. Audiences still flock to the dark room. Aftersun. Tár. The zone of interest. The story continues.',
    films: ['Tár', 'Aftersun', 'The Zone of Interest'],
  },
]

export default function History() {
  const trackRef = useRef(null)
  const isDragging = useRef(false)
  const startX    = useRef(0)
  const scrollL   = useRef(0)

  const onMouseDown = (e) => {
    isDragging.current = true
    startX.current  = e.pageX - trackRef.current.offsetLeft
    scrollL.current = trackRef.current.scrollLeft
    trackRef.current.style.cursor = 'grabbing'
  }
  const onMouseMove = (e) => {
    if (!isDragging.current) return
    e.preventDefault()
    const x    = e.pageX - trackRef.current.offsetLeft
    const walk = x - startX.current
    trackRef.current.scrollLeft = scrollL.current - walk
  }
  const onMouseUp = () => {
    isDragging.current = false
    if (trackRef.current) trackRef.current.style.cursor = 'grab'
  }

  const scroll = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20">
      <div className="px-5 sm:px-8 max-w-7xl mx-auto">
        <SectionTitle
          label="A Century of Film"
          title="Cinema History"
          subtitle="Drag or use arrows to travel through the milestones that shaped the moving image."
        />

        {/* Arrows */}
        <div className="flex gap-3 mb-8">
          <button onClick={() => scroll(-1)} className="btn-gold px-5" aria-label="Scroll left">←</button>
          <button onClick={() => scroll(1)}  className="btn-gold px-5" aria-label="Scroll right">→</button>
        </div>
      </div>

      {/* Timeline */}
      <div
        ref={trackRef}
        className="no-scrollbar overflow-x-auto px-5 sm:px-8 pb-8 select-none"
        style={{ cursor: 'grab' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div className="flex gap-0 min-w-max relative">
          {/* Horizontal rail */}
          <div className="absolute left-0 right-0 border-t border-[#1e1e1e]" style={{ top: '88px' }} />

          {ERAS.map((item, i) => (
            <div
              key={item.year}
              className="flex flex-col items-start w-64 sm:w-72 pr-6 sm:pr-8 fade-up"
              style={{ animationDelay: `${Math.min(i * 40, 400)}ms`, opacity: 0 }}
            >
              {/* Year */}
              <div className="mb-2">
                <span className="font-playfair text-3xl text-[#c9a84c]">{item.year}</span>
              </div>
              <span className="text-[10px] tracking-[3px] uppercase font-inter text-[#5a5a5a] mb-6">{item.era}</span>

              {/* Dot on rail */}
              <div className="relative mb-8 self-start ml-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#c9a84c] border-2 border-[#0b0b0b]" />
              </div>

              {/* Card */}
              <div className="border border-[#1e1e1e] p-5 w-full hover:border-[#c9a84c22] transition-colors duration-400 group">
                <h3 className="font-playfair text-base text-[#e8e4dc] mb-3 group-hover:text-[#c9a84c] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-[#5a5a5a] text-xs font-inter leading-relaxed mb-4">{item.desc}</p>
                <div className="border-t border-[#1e1e1e] pt-3 space-y-1">
                  {item.films.map(f => (
                    <p key={f} className="text-[10px] font-inter italic text-[#c9a84c66]">{f}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-[#1e1e1e] text-[10px] tracking-widest uppercase font-inter mt-2">
        Drag · Swipe · Explore
      </p>
    </div>
  )
}
