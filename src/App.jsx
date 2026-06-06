import { useState, useMemo, useCallback, useEffect } from 'react'
import FlashCard from './components/FlashCard'
import FilterBar from './components/FilterBar'
import vocabulary from './data/vocabulary'
import './App.css'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function App() {
  const [filter, setFilter] = useState('all')
  const [shuffled, setShuffled] = useState(() => shuffle(vocabulary))
  const [index, setIndex] = useState(0)
  const [mode, setMode] = useState('jp-en') // 'jp-en' or 'en-jp'

  const filtered = useMemo(
    () => (filter === 'all' ? shuffled : shuffled.filter(w => w.category === filter)),
    [filter, shuffled]
  )

  const card = filtered.length > 0 ? filtered[index % filtered.length] : null

  const handleNext = useCallback(() => {
    setIndex(i => i + 1)
  }, [])

  const handlePrev = useCallback(() => {
    setIndex(i => (i > 0 ? i - 1 : filtered.length - 1))
  }, [filtered.length])

  const handleShuffle = useCallback(() => {
    setShuffled(shuffle(vocabulary))
    setIndex(0)
  }, [])

  const handleFilterChange = useCallback((cat) => {
    setFilter(cat)
    setIndex(0)
  }, [])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleNext, handlePrev])

  const currentNum = filtered.length > 0 ? (index % filtered.length) + 1 : 0

  return (
    <div className="app">
      <header className="app-header">
        <h1>日本語 Flash Cards</h1>
        <p className="subtitle">1000 Most Common Japanese Words</p>
      </header>

      <FilterBar active={filter} onChange={handleFilterChange} />

      <div className="mode-toggle">
        <button
          className={`mode-btn ${mode === 'jp-en' ? 'active' : ''}`}
          onClick={() => setMode('jp-en')}
        >
          🇯🇵 → EN
        </button>
        <button
          className={`mode-btn ${mode === 'en-jp' ? 'active' : ''}`}
          onClick={() => setMode('en-jp')}
        >
          EN → 🇯🇵
        </button>
      </div>

      <div className="card-section">
        {card ? (
          <>
            <FlashCard key={`${filter}-${index % filtered.length}-${mode}`} card={card} mode={mode} />
            <div className="card-counter">
              {currentNum} / {filtered.length}
            </div>
          </>
        ) : (
          <p className="no-cards">No cards match this filter.</p>
        )}
      </div>

      <div className="controls">
        <button className="nav-btn" onClick={handlePrev}>← Prev</button>
        <button className="nav-btn shuffle-btn" onClick={handleShuffle}>🔀 Shuffle</button>
        <button className="nav-btn" onClick={handleNext}>Next →</button>
      </div>

      <div className="keyboard-hint">
        Use ← → arrow keys or click the card to flip
      </div>
    </div>
  )
}
