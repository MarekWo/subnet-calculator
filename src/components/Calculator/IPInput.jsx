import React, { useState, useEffect } from 'react';
import { validateIPAddress } from '../../utils/validation';

const IPInput = ({ 
  value, 
  onChange, 
  placeholder = 'np. 192.168.1.1', 
  required = false,
  className = '',
  ...props 
}) => {
  const [isValid, setIsValid] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  
  // Walidacja adresu IP przy zmianie wartości
  useEffect(() => {
    if (value && !isFocused) {
      setIsValid(validateIPAddress(value));
    } else {
      setIsValid(true);
    }
  }, [value, isFocused]);
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    
    // Akceptuj tylko cyfry, kropki i backspace
    if (/^[0-9.]*$/.test(newValue) || newValue === '') {
      onChange(newValue);
    }
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    
    // Sprawdź poprawność przy utracie fokusu
    if (value) {
      setIsValid(validateIPAddress(value));
    }
  };
  
  const handleFocus = () => {
    setIsFocused(true);
    setIsValid(true);
  };
  
  // Formatowanie adresu IP podczas wpisywania
  const formatIP = (input) => {
    // Implementacja formatowania w czasie rzeczywistym
    // Można dodać automatyczne dodawanie kropek itp.
    return input;
  };
  
  const baseClasses = 'block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white';
  const validationClasses = !isValid 
    ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-600 dark:text-red-400'
    : 'border-gray-300';
  
  return (
    <div>
      <input
        type="text"
        value={formatIP(value)}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholder}
        required={required}
        className={`${baseClasses} ${validationClasses} ${className}`}
        aria-invalid={!isValid}
        {...props}
      />
      
      {!isValid && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          Wprowadź poprawny adres IPv4 (np. 192.168.1.1)
        </p>
      )}
    </div>
  );
};

export default IPInput;
