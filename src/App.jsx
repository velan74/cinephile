import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar    from './components/Navbar'
import Footer    from './components/Footer'
import Home      from './pages/Home'
import Finder    from './pages/Finder'
import Directors from './pages/Directors'
import History   from './pages/History'
import Genres    from './pages/Genres'
import Favorites from './pages/Favorites'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 text-center grain">
      <p className="text-[#c9a84c] text-[10px] tracking-[5px] uppercase font-inter mb-4">404</p>
      <h1 className="font-playfair text-4xl sm:text-5xl text-[#e8e4dc] mb-4">Page not found.</h1>
      <div className="gold-line mx-auto mb-6" />
      <p className="text-[#5a5a5a] text-sm font-inter mb-10">
        The reel has run out. Let's find you something to watch.
      </p>
      <Link to="/" className="btn-gold">Back to Home</Link>
    </div>
  )
}

function Layout() {
  return (
    <div className="min-h-screen flex flex-col grain">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/"          element={<Home />}      />
          <Route path="/finder"    element={<Finder />}    />
          <Route path="/directors" element={<Directors />} />
          <Route path="/history"   element={<History />}   />
          <Route path="/genres"    element={<Genres />}    />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*"          element={<NotFound />}  />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Layout />
    </BrowserRouter>
  )
}
