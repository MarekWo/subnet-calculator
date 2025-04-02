import React, { useState } from 'react';
import CalculatorForm from './CalculatorForm';
import SubnetTable from './SubnetTable';
import VisualRepresentation from './VisualRepresentation';
import { calculateSubnet } from '../../utils/ipCalculations';

const Calculator = () => {
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = (ipData) => {
    try {
      const calculationResults = calculateSubnet(ipData.ip, ipData.cidr);
      setResults(calculationResults);
      setError('');
    } catch (err) {
      setError(err.message);
      setResults(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Kalkulator Podsieci</h1>
      
      <CalculatorForm onCalculate={handleCalculate} />
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
          {error}
        </div>
      )}
      
      {results && (
        <>
          <SubnetTable results={results} />
          <VisualRepresentation results={results} />
        </>
      )}
    </div>
  );
};

export default Calculator;