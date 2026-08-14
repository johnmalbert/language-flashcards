import { useState, useCallback, useMemo } from 'react';
import { romajiToHiragana, containsKanji } from '../utils/romajiToHiragana';
import './FlashCard.css';

export default function FlashCard({ card, mode = 'target-en', wordKey, pronKey, language }) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = useCallback(() => {
    setFlipped(f => !f);
  }, []);

  const word = card[wordKey];
  const pronunciation = card[pronKey];

  const reading = useMemo(() => {
    if (language !== 'japanese') return null;
    if (!containsKanji(word)) return null;
    return romajiToHiragana(pronunciation);
  }, [language, word, pronunciation]);

  const frontContent = mode === 'target-en' ? (
    <>
      <span className="card-label">{language.charAt(0).toUpperCase() + language.slice(1)}</span>
      <span className="card-japanese">{word}</span>
      {reading && <span className="card-reading">{reading}</span>}
    </>
  ) : (
    <>
      <span className="card-label">English</span>
      <span className="card-english-front">{card.english}</span>
    </>
  );

  const backContent = mode === 'target-en' ? (
    <>
      <span className="card-label">English</span>
      <span className="card-romaji">{pronunciation}</span>
      <span className="card-english">{card.english}</span>
      <span className="card-category-badge">{card.category}</span>
    </>
  ) : (
    <>
      <span className="card-label">{language.charAt(0).toUpperCase() + language.slice(1)}</span>
      <span className="card-japanese">{word}</span>
      {reading && <span className="card-reading-back">{reading}</span>}
      <span className="card-category-badge">{card.category}</span>
    </>
  );

  return (
    <div className="flashcard-container" onClick={handleFlip}>
      <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
        <div className="flashcard-face flashcard-front">
          {frontContent}
          <span className="card-hint">Tap to reveal</span>
        </div>
        <div className="flashcard-face flashcard-back">
          {backContent}
        </div>
      </div>
    </div>
  );
}
