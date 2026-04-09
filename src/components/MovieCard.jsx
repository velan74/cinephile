import { useState } from 'react'

const PLACEHOLDER = (title) =>
  `https://placehold.co/300x450/111111/c9a84c?text=${encodeURIComponent(title?.slice(0, 12) || 'No Poster')}`

function HeartIcon({ filled }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

export default function MovieCard({ movie, isFav, onFav, onUnfav, delay = 0 }) {
  const [imgErr, setImgErr] = useState(false)

  const poster =
    !imgErr && movie?.Poster && movie.Poster !== 'N/A'
      ? movie.Poster
      : PLACEHOLDER(movie?.Title)

  if (!movie) return null

  return (
    <div
      className="card-hover group relative bg-[#111111] border border-[#1e1e1e] overflow-hidden fade-up flex flex-col"
      style={{ animationDelay: `${delay}ms`, opacity: 0 }}
    >
      {/* Poster */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '2/3' }}>
        <img
          src={poster}
          alt={movie.Title || 'Movie poster'}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={() => setImgErr(true)}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-transparent opacity-80" />

        {/* Favourite button */}
        <button
          onClick={() => isFav ? onUnfav(movie.imdbID) : onFav(movie)}
          aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
          className={`absolute top-2 right-2 w-8 h-8 flex items-center justify-center border
            transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c]
            ${isFav
              ? 'bg-[#c9a84c] border-[#c9a84c] text-[#0b0b0b]'
              : 'bg-[#0b0b0baa] border-[#3a3a3a] text-[#5a5a5a] hover:border-[#c9a84c] hover:text-[#c9a84c]'
            }`}
        >
          <HeartIcon filled={isFav} />
        </button>

        {/* Year badge */}
        {movie.Year && (
          <span className="absolute bottom-2 left-2 text-[9px] tracking-widest uppercase font-inter
            text-[#c9a84c] bg-[#0b0b0bcc] border border-[#c9a84c33] px-2 py-0.5">
            {movie.Year}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1 flex-1">
        <h3 className="font-playfair text-[#e8e4dc] text-sm leading-snug line-clamp-2">
          {movie.Title || 'Unknown Title'}
        </h3>
        {movie.Type && (
          <span className="text-[9px] tracking-widest uppercase text-[#3a3a3a] font-inter">
            {movie.Type}
          </span>
        )}
      </div>
    </div>
  )
}
