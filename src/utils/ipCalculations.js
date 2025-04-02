import { Address4 } from 'ip-address';
import { validateIPAddress, validateCIDR } from './validation';

export function calculateSubnet(ipAddress, cidr) {
  try {
    // Walidacja adresu IP i maski podsieci
    if (!validateIPAddress(ipAddress) || !validateCIDR(cidr)) {
      throw new Error('Nieprawidłowy adres IP lub maska podsieci');
    }
    
    const addr = new Address4(`${ipAddress}/${cidr}`);
    
    const networkAddress = addr.startAddress().address;
    const broadcastAddress = addr.endAddress().address;
    const firstUsable = getNextIP(networkAddress);
    const lastUsable = getPreviousIP(broadcastAddress);
    const totalHosts = Math.pow(2, 32 - cidr) - 2;
    const subnetMask = cidrToMask(cidr);
    
    return {
      networkAddress,
      broadcastAddress,
      firstUsable,
      lastUsable,
      totalHosts: totalHosts > 0 ? totalHosts : 0,
      subnetMask,
      cidr
    };
  } catch (error) {
    throw new Error(`Błąd podczas obliczania podsieci: ${error.message}`);
  }
}

function cidrToMask(cidr) {
  const mask = [];
  let n = cidr;
  
  for (let i = 0; i < 4; i++) {
    if (n >= 8) {
      mask.push(255);
      n -= 8;
    } else if (n > 0) {
      mask.push(256 - Math.pow(2, 8 - n));
      n = 0;
    } else {
      mask.push(0);
    }
  }
  
  return mask.join('.');
}

function getNextIP(ip) {
  const parts = ip.split('.').map(Number);
  parts[3]++;
  
  for (let i = 3; i > 0; i--) {
    if (parts[i] > 255) {
      parts[i] = 0;
      parts[i-1]++;
    }
  }
  
  return parts.join('.');
}

function getPreviousIP(ip) {
  const parts = ip.split('.').map(Number);
  parts[3]--;
  
  for (let i = 3; i > 0; i--) {
    if (parts[i] < 0) {
      parts[i] = 255;
      parts[i-1]--;
    }
  }
  
  return parts.join('.');
}
