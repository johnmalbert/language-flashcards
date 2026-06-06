import { useState, useCallback, useMemo } from 'react';
import { romajiToHiragana, containsKanji } from '../utils/romajiToHiragana';
import './FlashCard.css';

export default function FlashCard({ card, mode = 'jp-en' }) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = useCallback(() => {
    setFlipped(f => !f);
  }, []);

  const reading = useMemo(() => {
    if (!containsKanji(card.japanese)) return null;
    return romajiToHiragana(card.romaji);
  }, [card.japanese, card.romaji]);

  const frontContent = mode === 'jp-en' ? (
    <>
      <span className="card-label">Japanese</span>
      <span className="card-japanese">{card.japanese}</span>
      {reading && <span className="card-reading">{reading}</span>}
    </>
  ) : (
    <>
      <span className="card-label">English</span>
      <span className="card-english-front">{card.english}</span>
      <span className="card-romaji-hint">{card.romaji}</span>
    </>
  );

  const backContent = mode === 'jp-en' ? (
    <>
      <span className="card-label">English</span>
      <span className="card-romaji">{card.romaji}</span>
      <span className="card-english">{card.english}</span>
      <span className="card-category-badge">{card.category}</span>
    </>
  ) : (
    <>
      <span className="card-label">Japanese</span>
      <span className="card-japanese">{card.japanese}</span>
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
