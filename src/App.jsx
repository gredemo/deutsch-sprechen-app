import React, { useState } from 'react';
import ThemeSelection from './components/ThemeSelection';
import LevelSelection from './components/LevelSelection';
import ExerciseView from './components/ExerciseView';
import './App.css';

function App() {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  const handleBackToLevels = () => {
    setSelectedLevel(null);
  };

  const handleBackToThemes = () => {
    setSelectedTheme(null);
    setSelectedLevel(null);
  };

  return (
    <div className="App">
      {!selectedTheme ? (
        <ThemeSelection onSelectTheme={handleThemeSelect} />
      ) : !selectedLevel ? (
        <LevelSelection onSelectLevel={handleLevelSelect} onBack={handleBackToThemes} />
      ) : (
        <ExerciseView 
          theme={selectedTheme}
          level={selectedLevel} 
          onBack={handleBackToLevels} 
        />
      )}
    </div>
  );
}

export default App;