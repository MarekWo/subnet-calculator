import { useState } from 'react';
import { calculateSubnet } from '../utils/ipCalculations';
import { validateIPAddress, validateCIDR } from '../utils/validation';
import { useCalculator } from '../contexts/CalculatorContext';

const useIPCalculator = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [cidr, setCidr] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToHistory } = useCalculator();

  const handleIpChange = (value) => {
    setIpAddress(value);
    setError('');
  };

  const handleCidrChange = (value) => {
    setCidr(value);
    setError('');
  };

  const calculateNetwork = () => {
    setLoading(true);
    setError('');

    try {
      // Walidacja danych wejściowych
      if (!validateIPAddress(ipAddress)) {
        throw new Error('Nieprawidłowy format adresu IP');
      }

      if (!validateCIDR(cidr)) {
        throw new Error('Nieprawidłowy format maski podsieci (CIDR)');
      }

      // Obliczenia
      const calculationResults = calculateSubnet(ipAddress, parseInt(cidr, 10));
      
      // Ustawienie wyników
      setResults(calculationResults);
      
      // Dodanie do historii
      addToHistory({
        id: Date.now(),
        ipAddress,
        cidr,
        results: calculationResults,
        timestamp: new Date().toISOString()
      });
      
    } catch (err) {
      setError(err.message);
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const resetCalculator = () => {
    setIpAddress('');
    setCidr('');
    setResults(null);
    setError('');
  };

  return {
    ipAddress,
    cidr,
    results,
    error,
    loading,
    handleIpChange,
    handleCidrChange,
    calculateNetwork,
    resetCalculator
  };
};

export default useIPCalculator;
