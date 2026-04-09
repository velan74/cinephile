import { useState, useEffect } from 'react'

const KEY = 'cinephile_favs'

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(favorites))
    } catch {
      // storage quota exceeded — silently ignore
    }
  }, [favorites])

  const addFavorite = (movie) => {
    setFavorites(prev =>
      prev.find(m => m.imdbID === movie.imdbID) ? prev : [movie, ...prev]
    )
  }

  const removeFavorite = (imdbID) => {
    setFavorites(prev => prev.filter(m => m.imdbID !== imdbID))
  }

  const clearFavorites = () => setFavorites([])

  const isFavorite = (imdbID) => favorites.some(m => m.imdbID === imdbID)

  return { favorites, addFavorite, removeFavorite, clearFavorites, isFavorite }
}
