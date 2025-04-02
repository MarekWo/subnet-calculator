import React, { createContext, useState, useContext } from 'react';

const CalculatorContext = createContext();

export const useCalculator = () => useContext(CalculatorContext);

export const CalculatorProvider = ({ children }) => {
  const [calculationHistory, setCalculationHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const addToHistory = (calculation) => {
    setCalculationHistory(prev => [calculation, ...prev]);
  };

  const clearHistory = () => {
    setCalculationHistory([]);
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <CalculatorContext.Provider 
      value={{
        calculationHistory,
        addToHistory,
        clearHistory,
        darkMode,
        toggleDarkMode
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

export default CalculatorContext;
