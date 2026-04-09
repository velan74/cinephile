import { useState } from 'react'
import SectionTitle from '../components/SectionTitle'

const DIRECTORS = [
  {
    name: 'Christopher Nolan',
    period: '1970 —',
    nation: 'British-American',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Christopher_Nolan_Cannes_2018.jpg/400px-Christopher_Nolan_Cannes_2018.jpg',
    bio: 'A master of non-linear narrative and practical spectacle. Nolan constructs labyrinthine architectures of time and memory — from the fragmented consciousness of Memento to the dream-within-dream cosmology of Inception. His cinema trusts its audience completely, demanding active engagement and rewarding it with genuine revelation.',
    works: ['Memento', 'The Dark Knight', 'Inception', 'Interstellar', 'Oppenheimer'],
    style: 'Non-linear · Practical VFX · Time & Memory',
  },
  {
    name: 'Martin Scorsese',
    period: '1942 —',
    nation: 'American',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Martin_Scorsese_2010.jpg/400px-Martin_Scorsese_2010.jpg',
    bio: 'The poet laureate of American cinema. Scorsese channels the restless energy of New York\'s streets into operatic moral dramas. Every frame pulses with Catholic guilt, masculine anxiety, and jazz-fuelled longing. His camera is the most expressive in Hollywood history — never still, always alive.',
    works: ['Taxi Driver', 'Raging Bull', 'Goodfellas', 'The Departed', 'Killers of the Flower Moon'],
    style: 'Urban Realism · Voice-over · Moral Drama',
  },
  {
    name: 'Quentin Tarantino',
    period: '1963 —',
    nation: 'American',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Quentin_Tarantino_by_Gage_Skidmore.jpg/400px-Quentin_Tarantino_by_Gage_Skidmore.jpg',
    bio: 'A cinephile\'s cinephile. Tarantino remixes genre with scholarly precision and anarchic glee. His films are love letters to exploitation cinema, spaghetti westerns, and Hong Kong action — shot through with unforgettable dialogue, structural audacity, and volcanic set-pieces that lodge permanently in memory.',
    works: ['Pulp Fiction', 'Kill Bill', 'Inglourious Basterds', 'Django Unchained', 'Once Upon a Time in Hollywood'],
    style: 'Genre Remix · Non-linear · Dialogue as Music',
  },
  {
    name: 'Satyajit Ray',
    period: '1921 — 1992',
    nation: 'Indian',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Satyajit_Ray.jpg/400px-Satyajit_Ray.jpg',
    bio: 'The conscience of Indian cinema. Ray brought a humanist gaze to Bengal\'s landscapes and its people. His Apu Trilogy remains among the most tender and luminous work in film history. A polymath — writer, illustrator, composer — and one of cinema\'s supreme artists, recognised by Kurosawa as a genius.',
    works: ['Pather Panchali', 'Aparajito', 'Charulata', 'Aranyer Din Raat', 'Agantuk'],
    style: 'Humanist · Poetic Realism · Literary Adaptation',
  },
  {
    name: 'Bong Joon-ho',
    period: '1969 —',
    nation: 'South Korean',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Bong_Joon-ho_2019_%28cropped%29.jpg/400px-Bong_Joon-ho_2019_%28cropped%29.jpg',
    bio: 'Genre alchemist and social satirist. Bong weaves class anxiety, dark comedy, and visceral genre thrills into films of extraordinary formal intelligence. Parasite\'s sweep at the Oscars marked global recognition of a director who had been redefining cinema for two decades from Seoul.',
    works: ['Memories of Murder', 'The Host', 'Mother', 'Snowpiercer', 'Parasite'],
    style: 'Genre Hybrid · Social Satire · Dark Comedy',
  },
]

export default function Directors() {
  const [expanded, setExpanded] = useState(null)
  const [imgErrors, setImgErrors] = useState({})

  const toggle = (name) => setExpanded(e => e === name ? null : name)

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20 px-5 sm:px-8 max-w-7xl mx-auto">
      <SectionTitle
        label="Auteurs"
        title="The Directors"
        subtitle="Five visionaries who bent cinema to their singular will."
      />

      <div className="flex flex-col gap-5">
        {DIRECTORS.map((dir, i) => {
          const isOpen = expanded === dir.name
          const imgSrc = imgErrors[dir.name]
            ? `https://placehold.co/200x240/111111/c9a84c?text=${encodeURIComponent(dir.name.split(' ').pop())}`
            : dir.img

          return (
            <div
              key={dir.name}
              className="border border-[#1e1e1e] hover:border-[#c9a84c22] transition-all duration-500 overflow-hidden fade-up"
              style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
            >
              {/* Header row — always visible */}
              <div className="flex items-center gap-0 cursor-pointer" onClick={() => toggle(dir.name)}>
                {/* Photo */}
                <div className="w-20 sm:w-28 md:w-36 flex-shrink-0 overflow-hidden self-stretch">
                  <img
                    src={imgSrc}
                    alt={dir.name}
                    className={`w-full h-full object-cover object-top transition-all duration-700
                      ${isOpen ? 'grayscale-0' : 'grayscale hover:grayscale-0'}`}
                    style={{ minHeight: '80px' }}
                    onError={() => setImgErrors(e => ({ ...e, [dir.name]: true }))}
                  />
                </div>

                {/* Summary */}
                <div className="flex-1 px-5 sm:px-8 py-5 sm:py-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[#c9a84c] text-[10px] tracking-[3px] uppercase font-inter mb-1">
                      {dir.nation} · {dir.period}
                    </p>
                    <h3 className="font-playfair text-xl sm:text-2xl text-[#e8e4dc]">{dir.name}</h3>
                    <p className="text-[#3a3a3a] text-[10px] font-inter italic mt-1 hidden sm:block">{dir.style}</p>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <button className="btn-gold hidden sm:block" onClick={(e) => { e.stopPropagation(); toggle(dir.name) }}>
                      {isOpen ? 'Close' : 'Profile'}
                    </button>
                    <span className={`text-[#c9a84c] text-lg transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      ↓
                    </span>
                  </div>
                </div>
              </div>

              {/* Expanded content */}
              {isOpen && (
                <div className="border-t border-[#1e1e1e] px-5 sm:px-8 py-6 sm:py-8 fade-up">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                      <p className="text-[#8a8a8a] text-sm font-inter leading-relaxed">{dir.bio}</p>
                    </div>
                    <div>
                      <p className="text-[#5a5a5a] text-[10px] tracking-[3px] uppercase font-inter mb-3">Key Films</p>
                      <ul className="space-y-2">
                        {dir.works.map(w => (
                          <li key={w} className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-[#c9a84c] rounded-full flex-shrink-0" />
                            <span className="text-[#c9a84c] text-xs font-inter italic">{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
