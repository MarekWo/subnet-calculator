/**
 * Konwertuje adres IP na format binarny
 * @param {string} ip - Adres IP w formacie dziesiętnym (np. 192.168.1.1)
 * @returns {string} - Adres IP w formacie binarnym z separatorami
 */
export const ipToBinary = (ip) => {
  if (!ip) return '';
  
  return ip
    .split('.')
    .map(octet => parseInt(octet, 10).toString(2).padStart(8, '0'))
    .join('.');
};

/**
 * Konwertuje adres IP z formatu binarnego na dziesiętny
 * @param {string} binary - Adres IP w formacie binarnym (z lub bez separatorów)
 * @returns {string} - Adres IP w formacie dziesiętnym
 */
export const binaryToIp = (binary) => {
  if (!binary) return '';
  
  // Usuń separatory, jeśli istnieją
  const cleanBinary = binary.replace(/\./g, '');
  
  if (cleanBinary.length !== 32) return '';
  
  const octets = [];
  for (let i = 0; i < 4; i++) {
    const octet = cleanBinary.substr(i * 8, 8);
    octets.push(parseInt(octet, 2));
  }
  
  return octets.join('.');
};

/**
 * Formatuje liczbę hostów z separatorem tysięcy
 * @param {number} hosts - Liczba hostów
 * @returns {string} - Sformatowana liczba hostów
 */
export const formatHostCount = (hosts) => {
  return hosts.toLocaleString('pl-PL');
};

/**
 * Konwertuje wyniki obliczeń do formatu CSV
 * @param {Object} results - Wyniki obliczeń
 * @returns {string} - Dane w formacie CSV
 */
export const resultsToCSV = (results) => {
  if (!results) return '';
  
  const headers = [
    'Parametr',
    'Wartość'
  ].join(',');
  
  const rows = [
    ['Adres sieci', results.networkAddress],
    ['Adres rozgłoszeniowy', results.broadcastAddress],
    ['Pierwszy użyteczny adres', results.firstUsable],
    ['Ostatni użyteczny adres', results.lastUsable],
    ['Liczba dostępnych hostów', results.totalHosts],
    ['Maska podsieci', results.subnetMask],
    ['CIDR', `/${results.cidr}`]
  ].map(row => row.join(','));
  
  return [headers, ...rows].join('\n');
};

/**
 * Konwertuje wyniki obliczeń do formatu JSON
 * @param {Object} results - Wyniki obliczeń
 * @returns {string} - Dane w formacie JSON
 */
export const resultsToJSON = (results) => {
  if (!results) return '';
  
  return JSON.stringify(results, null, 2);
};

/**
 * Formatuje datę i czas do czytelnego formatu
 * @param {string} isoDate - Data w formacie ISO
 * @returns {string} - Sformatowana data i czas
 */
export const formatDateTime = (isoDate) => {
  if (!isoDate) return '';
  
  const date = new Date(isoDate);
  return date.toLocaleString('pl-PL');
};
