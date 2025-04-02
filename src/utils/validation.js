/**
 * Walidacja adresu IP w formacie IPv4
 * @param {string} ip - Adres IP do walidacji
 * @returns {boolean} - Czy adres IP jest poprawny
 */
export const validateIPAddress = (ip) => {
  if (!ip) return false;
  
  // Regex dla adresu IPv4
  const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  
  return ipv4Regex.test(ip);
};

/**
 * Walidacja maski podsieci w notacji CIDR
 * @param {string|number} cidr - Maska podsieci w notacji CIDR
 * @returns {boolean} - Czy maska jest poprawna
 */
export const validateCIDR = (cidr) => {
  if (!cidr && cidr !== 0) return false;
  
  const cidrNum = parseInt(cidr, 10);
  
  // CIDR dla IPv4 musi być liczbą od 0 do 32
  return !isNaN(cidrNum) && cidrNum >= 0 && cidrNum <= 32;
};

/**
 * Walidacja maski podsieci w notacji dziesiętnej
 * @param {string} mask - Maska podsieci w notacji dziesiętnej (np. 255.255.255.0)
 * @returns {boolean} - Czy maska jest poprawna
 */
export const validateSubnetMask = (mask) => {
  if (!mask) return false;
  
  // Sprawdzenie formatu
  const parts = mask.split('.');
  if (parts.length !== 4) return false;
  
  // Konwersja na liczby
  const nums = parts.map(part => parseInt(part, 10));
  
  // Sprawdzenie czy każda część jest liczbą od 0 do 255
  if (nums.some(num => isNaN(num) || num < 0 || num > 255)) return false;
  
  // Sprawdzenie czy maska jest poprawna (ciągły ciąg jedynek, a następnie zer w reprezentacji binarnej)
  let binary = '';
  nums.forEach(num => {
    binary += num.toString(2).padStart(8, '0');
  });
  
  // Sprawdzenie czy jest ciągły ciąg jedynek, a następnie zer
  return /^1*0*$/.test(binary);
};

/**
 * Konwersja maski podsieci z notacji dziesiętnej na CIDR
 * @param {string} mask - Maska podsieci w notacji dziesiętnej (np. 255.255.255.0)
 * @returns {number|null} - Maska w notacji CIDR lub null jeśli maska jest niepoprawna
 */
export const maskToCIDR = (mask) => {
  if (!validateSubnetMask(mask)) return null;
  
  const parts = mask.split('.');
  const binary = parts
    .map(part => parseInt(part, 10).toString(2).padStart(8, '0'))
    .join('');
  
  return binary.split('1').length - 1;
};

/**
 * Konwersja maski podsieci z notacji CIDR na dziesiętną
 * @param {number|string} cidr - Maska podsieci w notacji CIDR
 * @returns {string|null} - Maska w notacji dziesiętnej lub null jeśli CIDR jest niepoprawny
 */
export const cidrToMask = (cidr) => {
  if (!validateCIDR(cidr)) return null;
  
  const cidrNum = parseInt(cidr, 10);
  const binary = '1'.repeat(cidrNum) + '0'.repeat(32 - cidrNum);
  
  const parts = [];
  for (let i = 0; i < 4; i++) {
    parts.push(parseInt(binary.substr(i * 8, 8), 2));
  }
  
  return parts.join('.');
};
