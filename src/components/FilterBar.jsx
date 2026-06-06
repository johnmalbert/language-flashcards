import './FilterBar.css';

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'noun', label: 'Nouns' },
  { key: 'verb', label: 'Verbs' },
  { key: 'adjective', label: 'Adjectives' },
  { key: 'adverb', label: 'Adverbs' },
  { key: 'particle', label: 'Particles' },
  { key: 'pronoun', label: 'Pronouns' },
  { key: 'conjunction', label: 'Conjunctions' },
  { key: 'expression', label: 'Expressions' },
  { key: 'number', label: 'Numbers' },
];

export default function FilterBar({ active, onChange }) {
  return (
    <div className="filter-bar">
      {CATEGORIES.map(cat => (
        <button
          key={cat.key}
          className={`filter-btn ${active === cat.key ? 'active' : ''}`}
          onClick={() => onChange(cat.key)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
