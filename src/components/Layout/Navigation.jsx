import React, { useState } from 'react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative">
      <button
        onClick={toggleMenu}
        className="p-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none"
        aria-expanded={isOpen}
        aria-label="Menu główne"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
          <a
            href="#"
            className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
            }}
          >
            Kalkulator
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              // Tutaj można dodać logikę otwierania historii
            }}
          >
            Historia obliczeń
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            GitHub
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
