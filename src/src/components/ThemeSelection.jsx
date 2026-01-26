import React from 'react';
import './ThemeSelection.css';

function ThemeSelection({ onSelectTheme }) {
  const themes = [
    { id: 'reisen', label: 'Reisen', description: 'Resa och turism' },
    { id: 'verben', label: 'Verben', description: 'Viktiga verb' }
  ];

  return (
    <div className="theme-selection">
      <h1>Deutsch sprechen</h1>
      <p className="subtitle">Välj tema</p>
      
      <div className="theme-buttons">
        {themes.map(theme => (
          <button
            key={theme.id}
            className={`theme-button ${theme.id}`}
            onClick={() => onSelectTheme(theme.id)}
          >
            <span className="theme-label">{theme.label}</span>
            <span className="theme-description">{theme.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemeSelection;