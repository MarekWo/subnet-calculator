import React, { useState } from 'react';
import Card from '../Common/Card';
import Button from '../Common/Button';
import { ipToBinary } from '../../utils/formatters';
import { resultsToCSV, resultsToJSON } from '../../utils/formatters';

const SubnetTable = ({ results }) => {
  const [showBinary, setShowBinary] = useState(false);
  
  if (!results) return null;
  
  const downloadCSV = () => {
    const csvContent = resultsToCSV(results);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'subnet_results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const downloadJSON = () => {
    const jsonContent = resultsToJSON(results);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'subnet_results.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const renderValue = (value) => {
    if (typeof value === 'number') {
      return value.toLocaleString('pl-PL');
    }
    
    if (showBinary && typeof value === 'string' && value.includes('.')) {
      return (
        <div>
          <div>{value}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">
            {ipToBinary(value)}
          </div>
        </div>
      );
    }
    
    return value;
  };
  
  return (
    <Card 
      title="Wyniki obliczeń" 
      className="mb-6"
      footer={
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowBinary(!showBinary)}
          >
            {showBinary ? 'Ukryj format binarny' : 'Pokaż format binarny'}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={downloadCSV}
          >
            Eksportuj CSV
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={downloadJSON}
          >
            Eksportuj JSON
          </Button>
        </div>
      }
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Parametr
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Wartość
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                Adres sieci
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {renderValue(results.networkAddress)}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                Adres rozgłoszeniowy
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {renderValue(results.broadcastAddress)}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                Pierwszy użyteczny adres
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {renderValue(results.firstUsable)}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                Ostatni użyteczny adres
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {renderValue(results.lastUsable)}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                Liczba dostępnych hostów
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {renderValue(results.totalHosts)}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                Maska podsieci
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {renderValue(results.subnetMask)}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                CIDR
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                /{results.cidr}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default SubnetTable;
