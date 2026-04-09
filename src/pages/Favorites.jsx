import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites'
import SectionTitle from '../components/SectionTitle'
import MovieGrid    from '../components/MovieGrid'

export default function Favorites() {
  const { favorites, addFavorite, removeFavorite, clearFavorites, isFavorite } = useFavorites()
  const [confirming, setConfirming] = useState(false)

  const handleClear = () => {
    if (confirming) {
      clearFavorites()
      setConfirming(false)
    } else {
      setConfirming(true)
      setTimeout(() => setConfirming(false), 3000)
    }
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20 px-5 sm:px-8 max-w-7xl mx-auto">
      <SectionTitle
        label="Your Collection"
        title="Favourites"
        subtitle={
          favorites.length > 0
            ? `${favorites.length} film${favorites.length !== 1 ? 's' : ''} saved to your personal cinema.`
            : 'Your personal cinema. Empty for now.'
        }
      />

      {favorites.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-28 text-center fade-in">
          <div className="border border-[#1e1e1e] px-10 sm:px-16 py-14 max-w-sm w-full">
            <div className="text-[#2a2a2a] text-4xl mb-5">♡</div>
            <p className="font-playfair italic text-[#3a3a3a] text-2xl mb-3">No films yet.</p>
            <p className="text-[#2a2a2a] text-xs font-inter leading-relaxed mb-8">
              Browse films and tap the heart icon to save them here.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/finder"  className="btn-gold">Search Films</Link>
              <Link to="/genres"  className="btn-gold">Browse Genres</Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
            <p className="text-[#3a3a3a] text-[10px] tracking-widest uppercase font-inter">
              {favorites.length} saved
            </p>
            <button
              onClick={handleClear}
              className={`text-[10px] tracking-widest uppercase font-inter px-4 py-2 border
                transition-all duration-300 focus:outline-none
                ${confirming
                  ? 'border-[#8b1a1a] text-[#c0453a] bg-[#8b1a1a11]'
                  : 'border-[#1e1e1e] text-[#5a5a5a] hover:border-[#8b1a1a44] hover:text-[#c0453a]'
                }`}
            >
              {confirming ? 'Tap again to confirm' : 'Clear All'}
            </button>
          </div>

          <MovieGrid
            movies={favorites}
            loading={false}
            isFav={isFavorite}
            onFav={addFavorite}
            onUnfav={removeFavorite}
          />
        </>
      )}
    </div>
  )
}
