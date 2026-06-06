import './LanguagePicker.css';

export default function LanguagePicker({ languages, active, onChange }) {
  return (
    <div className="language-picker">
      {Object.entries(languages).map(([key, lang]) => (
        <button
          key={key}
          className={`lang-btn ${active === key ? 'active' : ''}`}
          onClick={() => onChange(key)}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
