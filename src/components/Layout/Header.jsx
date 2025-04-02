import React from 'react';
import Navigation from './Navigation';
import { useCalculator } from '../../contexts/CalculatorContext';

const Header = () => {
  const { darkMode, toggleDarkMode } = useCalculator();

  return (
    <header className="bg-blue-600 dark:bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <svg 
            className="h-8 w-8 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" 
            />
          </svg>
          <h1 className="text-xl font-bold">Subnet Calculator</h1>
        </div>
        
        <div className="flex items-center">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-800 mr-4"
            aria-label={darkMode ? "Przełącz na tryb jasny" : "Przełącz na tryb ciemny"}
          >
            {darkMode ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
          
          <Navigation />
        </div>
      </div>
    </header>
  );
};

export default Header;
