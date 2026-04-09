import { useState, useRef } from 'react'
import { useMovieSearch } from '../hooks/useMovieSearch'
import { useFavorites }   from '../hooks/useFavorites'
import SectionTitle from '../components/SectionTitle'
import MovieGrid    from '../components/MovieGrid'
import ErrorBox     from '../components/ErrorBox'

export default function Finder() {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  const { results, loading, error, searched, searchMovies, clearResults } = useMovieSearch()
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  const doSearch = () => {
    if (!query.trim()) {
      inputRef.current?.focus()
      return
    }
    searchMovies(query)
  }

  const handleKey = (e) => { if (e.key === 'Enter') doSearch() }

  const handleClear = () => {
    setQuery('')
    clearResults()
    inputRef.current?.focus()
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20 px-5 sm:px-8 max-w-7xl mx-auto">
      <SectionTitle
        label="Discovery"
        title="Movie Finder"
        subtitle="Search across thousands of films. Press Enter or click Search."
      />

      {/* Search bar */}
      <div className="flex gap-0 mb-4 max-w-xl">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="e.g. Inception, Parasite, RRR…"
            aria-label="Search movies"
            className="cin-input border-r-0 pr-10"
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3a3a3a] hover:text-[#e8e4dc] transition-colors"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        <button
          onClick={doSearch}
          disabled={loading}
          className="btn-gold flex-shrink-0 px-6 border-l-0"
        >
          {loading ? '…' : 'Search'}
        </button>
      </div>

      {/* Result count */}
      {!loading && results.length > 0 && (
        <p className="text-[#3a3a3a] text-[10px] tracking-widest uppercase font-inter mb-6 fade-in">
          {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
        </p>
      )}

      {/* Error */}
      <ErrorBox message={error} onRetry={doSearch} />

      {/* Grid / skeletons */}
      <MovieGrid
        movies={results}
        loading={loading}
        isFav={isFavorite}
        onFav={addFavorite}
        onUnfav={removeFavorite}
      />

      {/* Empty / initial states */}
      {!loading && searched && results.length === 0 && !error && (
        <div className="text-center py-24 fade-in">
          <p className="font-playfair italic text-[#3a3a3a] text-2xl sm:text-3xl mb-2">No films found.</p>
          <p className="text-[#222] text-xs font-inter">Try a different title or check your spelling.</p>
        </div>
      )}

      {!searched && !loading && (
        <div className="text-center py-24 fade-in">
          <p className="font-playfair italic text-[#222] text-3xl sm:text-4xl">Begin your search.</p>
        </div>
      )}
    </div>
  )
}
