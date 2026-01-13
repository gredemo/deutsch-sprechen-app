import React, { useState, useEffect } from 'react';
import './ExerciseView.css';
import { travelTheme } from '../data/themes';

function ExerciseView({ level, onBack }) {
  const [currentWord, setCurrentWord] = useState(null);
  const [usedWords, setUsedWords] = useState([]);
  const [availableWords, setAvailableWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalWords, setTotalWords] = useState(0);
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('deutschSprechenFavorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error('Error loading favorites:', e);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem('deutschSprechenFavorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  useEffect(() => {
    // Initialize with all words for the selected level
    const words = travelTheme[level] || [];
    setAvailableWords([...words]);
    setTotalWords(words.length);
    setCurrentIndex(1);
    pickRandomWord([...words], []);
  }, [level]);

  const pickRandomWord = (available, used) => {
    if (available.length === 0) {
      // All words used - reset
      const allWords = travelTheme[level] || [];
      setAvailableWords([...allWords]);
      setUsedWords([]);
      setCurrentIndex(1);
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
    setCurrentIndex(currentIndex + 1);
    pickRandomWord(newAvailableWords, newUsedWords);
  };

  const toggleFavorite = () => {
    if (!currentWord) return;
    
    if (favorites.includes(currentWord.word)) {
      setFavorites(favorites.filter(w => w !== currentWord.word));
    } else {
      setFavorites([...favorites, currentWord.word]);
    }
  };

  const isFavorite = currentWord && favorites.includes(currentWord.word);

  if (!currentWord) {
    return <div className="exercise-view">Laddar...</div>;
  }

  return (
    <div className="exercise-view">
      <div className="header">
        <button className="back-button" onClick={onBack}>← Tillbaka</button>
        <div className="header-info">
          <span className="word-counter">Ord {currentIndex} av {totalWords}</span>
          <span className="level-badge">{level}</span>
        </div>
      </div>

      <div className="main-content">
        <div className="word-display">
          <div className="word-header">
            <h1 className="current-word">{currentWord.word}</h1>
            <button 
              className={`favorite-button ${isFavorite ? 'active' : ''}`}
              onClick={toggleFavorite}
              title={isFavorite ? "Ta bort från favoriter (svåra ord)" : "Markera som svårt ord att träna extra på"}
              aria-label={isFavorite ? "Ta bort från favoriter" : "Lägg till i favoriter"}
            >
              {isFavorite ? '★' : '☆'}
            </button>
          </div>
          <p className="favorite-hint">💡 Klicka på stjärnan för att markera svåra ord</p>
          {currentWord.translation && (
            <p className="translation-info">({currentWord.translation})</p>
          )}
          {currentWord.grammar && (
            <p className="grammar-info">{currentWord.grammar}</p>
          )}
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
              <span 
                key={index} 
                className={`cloud-word ${favorites.includes(word) ? 'favorite' : ''}`}
              >
                {word} {favorites.includes(word) && '★'}
              </span>
            ))}
          </div>
        </div>
      )}

      {favorites.length > 0 && (
        <div className="favorites-section">
          <p className="favorites-label">⭐ Favoriter ({favorites.length}):</p>
          <div className="favorites-list">
            {favorites.map((word, index) => (
              <span key={index} className="favorite-word">{word}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExerciseView;