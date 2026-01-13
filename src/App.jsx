import React, { useState } from 'react';
import LevelSelection from './components/LevelSelection';
import ExerciseView from './components/ExerciseView';
import './App.css';

function App() {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  const handleBackToLevels = () => {
    setSelectedLevel(null);
  };

  return (
    <div className="App">
      {!selectedLevel ? (
        <LevelSelection onSelectLevel={handleLevelSelect} />
      ) : (
        <ExerciseView level={selectedLevel} onBack={handleBackToLevels} />
      )}
    </div>
  );
}

export default App;