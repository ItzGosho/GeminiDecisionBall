import './ModeSelector.css';

export default function ModeSelector({ selectedMode, onModeChange, disabled }) {
  const modes = [
    { id: 'normal', label: 'Normal', description: 'Mystical & Cosmic' },
    { id: 'crazy', label: 'Crazy', description: 'Absurdist & Hilarious' },
    { id: 'bombastic', label: 'Bombastic', description: 'Shakespearean Drama' },
  ];

  return (
    <div className="mode-selector">
      <h3>Choose Personality Mode</h3>
      <div className="mode-buttons">
        {modes.map((mode) => (
          <button
            key={mode.id}
            className={`mode-button ${selectedMode === mode.id ? 'active' : ''}`}
            onClick={() => onModeChange(mode.id)}
            disabled={disabled}
            title={mode.description}
          >
            <span className="mode-label">{mode.label}</span>
            <span className="mode-description">{mode.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
