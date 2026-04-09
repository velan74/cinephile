import { useState, useCallback, useRef } from 'react'
import axios from 'axios'

const API_KEY = '8d1b8653'
const BASE    = 'https://www.omdbapi.com'

const ERR = {
  NETWORK : 'Network error — check your internet connection.',
  EMPTY   : 'Please enter a search term.',
  NONE    : 'No movies found. Try a different title.',
  API     : 'API limit reached. Please try again later.',
  UNKNOWN : 'Something went wrong. Please try again.',
}

export function useMovieSearch() {
  const [results,  setResults]  = useState([])
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [searched, setSearched] = useState(false)
  const abortRef = useRef(null)

  const _fetch = useCallback(async (params) => {
    // Cancel any in-flight request
    if (abortRef.current) abortRef.current.abort()
    abortRef.current = new AbortController()

    setLoading(true)
    setError('')
    setResults([])
    setSearched(true)

    try {
      const res = await axios.get(BASE, {
        params: { apikey: API_KEY, type: 'movie', ...params },
        signal: abortRef.current.signal,
        timeout: 10000,
      })

      const data = res.data

      if (data.Response === 'True') {
        setResults(data.Search || [])
      } else {
        const msg = data.Error || ''
        if (msg.toLowerCase().includes('limit')) setError(ERR.API)
        else if (msg.toLowerCase().includes('not found') || msg.toLowerCase().includes('too many')) setError(ERR.NONE)
        else setError(msg || ERR.NONE)
        setResults([])
      }
    } catch (err) {
      if (axios.isCancel(err) || err.name === 'CanceledError') return
      if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
        setError('Request timed out. Check your connection.')
      } else if (!navigator.onLine) {
        setError(ERR.NETWORK)
      } else {
        setError(ERR.UNKNOWN)
      }
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  const searchMovies = useCallback((query) => {
    if (!query?.trim()) { setError(ERR.EMPTY); return }
    _fetch({ s: query.trim() })
  }, [_fetch])

  const searchByGenre = useCallback((query) => {
    if (!query?.trim()) return
    _fetch({ s: query.trim() })
  }, [_fetch])

  const clearResults = () => { setResults([]); setError(''); setSearched(false) }

  return { results, loading, error, searched, searchMovies, searchByGenre, clearResults }
}
