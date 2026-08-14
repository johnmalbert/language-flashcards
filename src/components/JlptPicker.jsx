import './JlptPicker.css';

// N5 is populated today; the rest are placeholders for future decks.
const JLPT_LEVELS = [
  { key: 'all', label: 'Common 1000', ready: true },
  { key: 'N5', label: 'JLPT N5', ready: true },
  { key: 'N4', label: 'JLPT N4', ready: true },
  { key: 'N3', label: 'N3', ready: false },
  { key: 'N2', label: 'N2', ready: false },
  { key: 'N1', label: 'N1', ready: false },
];

export default function JlptPicker({ active, onChange }) {
  return (
    <div className="jlpt-picker" role="group" aria-label="JLPT level">
      <span className="jlpt-picker__caption">Deck</span>
      {JLPT_LEVELS.map((lvl) => (
        <button
          key={lvl.key}
          className={`jlpt-btn ${active === lvl.key ? 'active' : ''} ${lvl.ready ? '' : 'soon'}`}
          onClick={() => lvl.ready && onChange(lvl.key)}
          disabled={!lvl.ready}
          title={lvl.ready ? lvl.label : `${lvl.label} — coming soon`}
        >
          {lvl.label}
          {!lvl.ready && <span className="jlpt-soon-tag">soon</span>}
        </button>
      ))}
    </div>
  );
}
