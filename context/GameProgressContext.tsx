'use client';
import { createContext, useContext, useEffect, useState } from 'react';

export const GameProgressContext = createContext(undefined);

export const GameProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    
  }, []);

  const value = {
    progress, setProgress,
  }

  return (
    <GameProgressContext.Provider value={value}>
     {children}
    </GameProgressContext.Provider>
  );
};

export const useGameProgress = () => {
  const context = useContext(GameProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
