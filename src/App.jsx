import React from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Calculator from './components/Calculator/Calculator';
import { CalculatorProvider } from './contexts/CalculatorContext';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <CalculatorProvider>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Calculator />
        </main>
        <Footer />
      </CalculatorProvider>
    </div>
  );
}

export default App;
