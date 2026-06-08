import { useState, useMemo, useCallback, useEffect } from 'react'
import FlashCard from './components/FlashCard'
import FilterBar from './components/FilterBar'
import LanguagePicker from './components/LanguagePicker'
import japaneseVocab from './data/vocabulary'
import portugueseVocab from './data/portuguese'
import germanVocab from './data/german'
import latinVocab from './data/latin'
import './App.css'

const LANGUAGES = {
  japanese: { label: '日本語 Japanese', vocab: japaneseVocab, flag: '🇯🇵', wordKey: 'japanese', pronKey: 'romaji' },
  portuguese: { label: '🇧🇷 Portuguese', vocab: portugueseVocab, flag: '🇧🇷', wordKey: 'portuguese', pronKey: 'pronunciation' },
  german: { label: '🇩🇪 German', vocab: germanVocab, flag: '🇩🇪', wordKey: 'german', pronKey: 'pronunciation' },
  latin: { label: '🏛️ Latin', vocab: latinVocab, flag: '🏛️', wordKey: 'latin', pronKey: 'pronunciation' },
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function App() {
  const [language, setLanguage] = useState('japanese')
  const [filter, setFilter] = useState('all')
  const [shuffled, setShuffled] = useState(() => shuffle(LANGUAGES.japanese.vocab))
  const [index, setIndex] = useState(0)
  const [mode, setMode] = useState('target-en') // 'target-en' or 'en-target'

  const lang = LANGUAGES[language]

  const handleLanguageChange = useCallback((newLang) => {
    setLanguage(newLang)
    setShuffled(shuffle(LANGUAGES[newLang].vocab))
    setIndex(0)
    setFilter('all')
  }, [])

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
    setShuffled(shuffle(lang.vocab))
    setIndex(0)
  }, [lang.vocab])

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
        <h1>Flash Cards</h1>
        <p className="subtitle">1000 Most Common Words</p>
      </header>

      <LanguagePicker languages={LANGUAGES} active={language} onChange={handleLanguageChange} />

      <FilterBar active={filter} onChange={handleFilterChange} />

      <div className="mode-toggle">
        <button
          className={`mode-btn ${mode === 'target-en' ? 'active' : ''}`}
          onClick={() => setMode('target-en')}
        >
          {lang.flag} → EN
        </button>
        <button
          className={`mode-btn ${mode === 'en-target' ? 'active' : ''}`}
          onClick={() => setMode('en-target')}
        >
          EN → {lang.flag}
        </button>
      </div>

      <div className="card-section">
        {card ? (
          <>
            <FlashCard
              key={`${language}-${filter}-${index % filtered.length}-${mode}`}
              card={card}
              mode={mode}
              wordKey={lang.wordKey}
              pronKey={lang.pronKey}
              language={language}
            />
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
