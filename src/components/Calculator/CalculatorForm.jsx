import React, { useState } from 'react';
import Card from '../Common/Card';
import Button from '../Common/Button';
import Alert from '../Common/Alert';
import IPInput from './IPInput';
import useIPCalculator from '../../hooks/useIPCalculator';

const CalculatorForm = ({ onCalculate }) => {
  const {
    ipAddress,
    cidr,
    error,
    loading,
    handleIpChange,
    handleCidrChange,
    calculateNetwork,
    resetCalculator
  } = useIPCalculator();

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateNetwork();
    
    if (onCalculate) {
      onCalculate({ ip: ipAddress, cidr: parseInt(cidr, 10) });
    }
  };

  return (
    <Card title="Wprowadź dane sieci" className="mb-6">
      <form onSubmit={handleSubmit}>
        {error && (
          <Alert type="error" className="mb-4">
            {error}
          </Alert>
        )}
        
        <div className="mb-4">
          <label htmlFor="ip-address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Adres IP
          </label>
          <IPInput
            id="ip-address"
            value={ipAddress}
            onChange={handleIpChange}
            placeholder="np. 192.168.1.1"
            required
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Wprowadź adres IPv4 w formacie dziesiętnym (np. 192.168.1.1)
          </p>
        </div>
        
        <div className="mb-6">
          <label htmlFor="cidr" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Maska podsieci (CIDR)
          </label>
          <div className="flex items-center">
            <span className="mr-2 text-gray-700 dark:text-gray-300">/</span>
            <input
              type="number"
              id="cidr"
              value={cidr}
              onChange={(e) => handleCidrChange(e.target.value)}
              min="0"
              max="32"
              className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Wprowadź wartość CIDR od 0 do 32
          </p>
        </div>
        
        <div className="flex space-x-4">
          <Button 
            type="submit" 
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Obliczanie...' : 'Oblicz'}
          </Button>
          
          <Button 
            type="button" 
            variant="secondary"
            onClick={resetCalculator}
          >
            Wyczyść
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CalculatorForm;
