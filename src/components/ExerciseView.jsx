import React, { useState, useEffect } from 'react';
import './ExerciseView.css';
import { travelTheme } from '../data/themes';

function ExerciseView({ level, onBack }) {
  const [currentWord, setCurrentWord] = useState(null);
  const [usedWords, setUsedWords] = useState([]);
  const [availableWords, setAvailableWords] = useState([]);

  useEffect(() => {
    // Initialize with all words for the selected level
    const words = travelTheme[level] || [];
    setAvailableWords([...words]);
    pickRandomWord([...words], []);
  }, [level]);

  const pickRandomWord = (available, used) => {
    if (available.length === 0) {
      // All words used - reset
      const allWords = travelTheme[level] || [];
      setAvailableWords([...allWords]);
      setUsedWords([]);
      pickRandomWord([...allWords], []);
      return;
    }

    const randomIndex = Math.floor(Math.random() * available.length);
    const selectedWord = available[randomIndex];
    setCurrentWord(selectedWord);
  };

  const handleNext = () => {
    if (!currentWord) return;

    // Move current word to used words
    const newUsedWords = [...usedWords, currentWord.word];
    const newAvailableWords = availableWords.filter(w => w.word !== currentWord.word);
    
    setUsedWords(newUsedWords);
    setAvailableWords(newAvailableWords);
    pickRandomWord(newAvailableWords, newUsedWords);
  };

  if (!currentWord) {
    return <div className="exercise-view">Laddar...</div>;
  }

  return (
    <div className="exercise-view">
      <div className="header">
        <button className="back-button" onClick={onBack}>← Tillbaka</button>
        <span className="level-badge">{level}</span>
      </div>

      <div className="main-content">
        <div className="word-display">
          <h1 className="current-word">{currentWord.word}</h1>
        </div>

        <div className="phrases-section">
          <h3>Hjälpfraser:</h3>
          <ul className="phrases-list">
            {currentWord.phrases.map((phrase, index) => (
              <li key={index} className="phrase-item">{phrase}</li>
            ))}
          </ul>
        </div>

        <button className="next-button" onClick={handleNext}>
          Nästa ord →
        </button>
      </div>

      {usedWords.length > 0 && (
        <div className="word-cloud">
          <p className="cloud-label">Använda ord:</p>
          <div className="cloud-words">
            {usedWords.map((word, index) => (
              <span key={index} className="cloud-word">{word}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExerciseView;
