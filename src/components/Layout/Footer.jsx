import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-4 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; {currentYear} Subnet Calculator. Wszelkie prawa zastrzeżone.</p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="#" 
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Dokumentacja"
            >
              Dokumentacja
            </a>
            <a 
              href="#" 
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Polityka prywatności"
            >
              Polityka prywatności
            </a>
            <a 
              href="#" 
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Kontakt"
            >
              Kontakt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
