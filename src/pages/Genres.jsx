import { useState } from 'react'
import { useMovieSearch } from '../hooks/useMovieSearch'
import { useFavorites }   from '../hooks/useFavorites'
import SectionTitle from '../components/SectionTitle'
import MovieGrid    from '../components/MovieGrid'
import ErrorBox     from '../components/ErrorBox'

const GENRES = [
  { label: 'Drama',       query: 'drama',        icon: '◎', desc: 'The soul laid bare'    },
  { label: 'Crime',       query: 'crime',         icon: '◈', desc: 'Vice & consequence'    },
  { label: 'Sci-Fi',      query: 'space',         icon: '◇', desc: 'Beyond the known'      },
  { label: 'Horror',      query: 'horror',        icon: '✦', desc: 'Fear made visible'     },
  { label: 'Romance',     query: 'love',          icon: '◉', desc: "The heart's compass"   },
  { label: 'Thriller',    query: 'thriller',      icon: '◐', desc: 'Edge of perception'    },
  { label: 'War',         query: 'war',           icon: '◑', desc: 'Conflict & courage'    },
  { label: 'Animation',   query: 'animated',      icon: '◒', desc: 'Imagination unbound'   },
  { label: 'Documentary', query: 'documentary',   icon: '◓', desc: 'Truth in motion'       },
  { label: 'Comedy',      query: 'comedy',        icon: '◔', desc: 'Laughter as art'       },
  { label: 'Adventure',   query: 'adventure',     icon: '◕', desc: 'The great beyond'      },
  { label: 'Fantasy',     query: 'fantasy',       icon: '◖', desc: 'Worlds made whole'     },
]

export default function Genres() {
  const [active, setActive] = useState(null)
  const { results, loading, error, searched, searchByGenre, clearResults } = useMovieSearch()
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  const handleGenre = (genre) => {
    if (active === genre.label) {
      setActive(null)
      clearResults()
      return
    }
    setActive(genre.label)
    searchByGenre(genre.query)
  }

  const activeGenre = GENRES.find(g => g.label === active)

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20 px-5 sm:px-8 max-w-7xl mx-auto">
      <SectionTitle
        label="Browse"
        title="Genre Explorer"
        subtitle="Select a genre to explore its cinematic landscape. Click again to deselect."
      />

      {/* Genre grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-14">
        {GENRES.map((genre, i) => {
          const isActive = active === genre.label
          return (
            <button
              key={genre.label}
              onClick={() => handleGenre(genre)}
              className={`group p-4 sm:p-5 border text-left transition-all duration-400 focus:outline-none
                focus-visible:ring-1 focus-visible:ring-[#c9a84c] fade-up
                ${isActive
                  ? 'border-[#c9a84c] bg-[#c9a84c0d]'
                  : 'border-[#1e1e1e] hover:border-[#c9a84c33] hover:bg-[#c9a84c05]'
                }`}
              style={{ animationDelay: `${i * 35}ms`, opacity: 0 }}
              aria-pressed={isActive}
            >
              <div className={`text-xl mb-3 transition-colors duration-300
                ${isActive ? 'text-[#c9a84c]' : 'text-[#3a3a3a] group-hover:text-[#c9a84c88]'}`}>
                {genre.icon}
              </div>
              <p className={`text-xs font-inter font-medium tracking-wider transition-colors duration-300
                ${isActive ? 'text-[#c9a84c]' : 'text-[#e8e4dc]'}`}>
                {genre.label}
              </p>
              <p className="text-[10px] text-[#3a3a3a] font-inter mt-0.5 italic">{genre.desc}</p>
            </button>
          )
        })}
      </div>

      {/* Active label */}
      {active && !loading && (
        <div className="flex items-center gap-4 mb-8 fade-in">
          <div className="gold-line" />
          <p className="text-[#c9a84c] text-[10px] tracking-[4px] uppercase font-inter">{active}</p>
          {results.length > 0 && (
            <p className="text-[#3a3a3a] text-[10px] font-inter">· {results.length} films</p>
          )}
        </div>
      )}

      {/* Error */}
      <ErrorBox
        message={error}
        onRetry={() => activeGenre && searchByGenre(activeGenre.query)}
      />

      {/* Grid / skeletons */}
      <MovieGrid
        movies={results}
        loading={loading}
        isFav={isFavorite}
        onFav={addFavorite}
        onUnfav={removeFavorite}
      />

      {/* Empty */}
      {!loading && searched && results.length === 0 && !error && (
        <div className="text-center py-20 fade-in">
          <p className="font-playfair italic text-[#3a3a3a] text-2xl sm:text-3xl">No films found.</p>
          <p className="text-[#222] text-xs font-inter mt-2">Try another genre.</p>
        </div>
      )}

      {/* Initial */}
      {!searched && !loading && (
        <div className="text-center py-20 fade-in">
          <p className="font-playfair italic text-[#1e1e1e] text-3xl sm:text-4xl">Select a genre above.</p>
        </div>
      )}
    </div>
  )
}