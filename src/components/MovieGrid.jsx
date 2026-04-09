import MovieCard from './MovieCard'

function SkeletonCard() {
  return (
    <div className="border border-[#1e1e1e] overflow-hidden">
      <div className="skeleton" style={{ aspectRatio: '2/3' }} />
      <div className="p-4 space-y-2">
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-2/3 rounded" />
      </div>
    </div>
  )
}

export default function MovieGrid({ movies, loading, isFav, onFav, onUnfav, skeletonCount = 10 }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {Array.from({ length: skeletonCount }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    )
  }

  if (!movies?.length) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
      {movies.map((movie, i) => (
        <MovieCard
          key={movie.imdbID || i}
          movie={movie}
          isFav={isFav(movie.imdbID)}
          onFav={onFav}
          onUnfav={onUnfav}
          delay={Math.min(i * 55, 500)}
        />
      ))}
    </div>
  )
}
