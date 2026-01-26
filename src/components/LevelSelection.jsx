import React from 'react';
import './LevelSelection.css';

function LevelSelection({ onSelectLevel, onBack }) {
  const levels = [
    { id: 'leicht', label: 'Leicht', description: 'Enkla ord och fraser' },
    { id: 'mittel', label: 'Mittel', description: 'Mellan nivå' },
    { id: 'schwer', label: 'Schwer', description: 'Avancerad nivå' }
  ];

  return (
    <div className="level-selection">
      <h1>Deutsch sprechen</h1>
      <p className="subtitle">Välj din nivå</p>
      
      <div className="level-buttons">
        {levels.map(level => (
          <button
            key={level.id}
            className={`level-button ${level.id}`}
            onClick={() => onSelectLevel(level.id)}
          >
            <span className="level-label">{level.label}</span>
            <span className="level-description">{level.description}</span>
          </button>
        ))}
      </div>

      <button className="back-button" onClick={onBack}>
        ← Tillbaka till teman
      </button>
    </div>
  );
}

export default LevelSelection;