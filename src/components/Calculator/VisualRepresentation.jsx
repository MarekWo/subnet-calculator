import React, { useEffect, useRef } from 'react';
import Card from '../Common/Card';

const VisualRepresentation = ({ results }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (!results || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Ustawienie wymiarów canvas
    canvas.width = canvas.offsetWidth;
    canvas.height = 200;
    
    // Czyszczenie canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Rysowanie wizualizacji sieci
    drawNetworkVisualization(ctx, canvas.width, canvas.height, results);
    
  }, [results, canvasRef]);
  
  const drawNetworkVisualization = (ctx, width, height, results) => {
    const padding = 20;
    const innerWidth = width - (padding * 2);
    const innerHeight = height - (padding * 2);
    
    // Tło
    ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#1f2937' : '#f3f4f6';
    ctx.fillRect(0, 0, width, height);
    
    // Rysowanie głównego prostokąta sieci
    ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#3b82f6' : '#93c5fd';
    ctx.fillRect(padding, padding, innerWidth, innerHeight);
    
    // Rysowanie obszaru użytecznych hostów
    const totalAddresses = Math.pow(2, 32 - results.cidr);
    const usableRatio = results.totalHosts / totalAddresses;
    
    // Obszar użytecznych hostów (jeśli jest więcej niż 2 hosty)
    if (results.totalHosts > 0) {
      ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#10b981' : '#34d399';
      
      // Obliczanie pozycji i szerokości obszaru użytecznych hostów
      const usableWidth = innerWidth * usableRatio;
      const usableX = padding + (innerWidth - usableWidth) / 2;
      
      ctx.fillRect(usableX, padding + 40, usableWidth, innerHeight - 80);
      
      // Etykiety
      ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#f9fafb' : '#111827';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      
      // Adres sieci
      ctx.fillText(results.networkAddress, padding + 60, padding + 20);
      
      // Adres rozgłoszeniowy
      ctx.fillText(results.broadcastAddress, width - padding - 60, padding + 20);
      
      // Pierwszy użyteczny adres
      if (results.totalHosts > 0) {
        ctx.fillText(results.firstUsable, usableX + 60, padding + 60);
      }
      
      // Ostatni użyteczny adres
      if (results.totalHosts > 0) {
        ctx.fillText(results.lastUsable, usableX + usableWidth - 60, padding + 60);
      }
      
      // Liczba hostów
      ctx.font = '14px Arial';
      ctx.fillText(`Liczba dostępnych hostów: ${results.totalHosts.toLocaleString('pl-PL')}`, width / 2, height - padding - 20);
      
      // CIDR
      ctx.font = 'bold 16px Arial';
      ctx.fillText(`/${results.cidr}`, width / 2, padding + innerHeight / 2);
    } else {
      // Przypadek dla sieci bez użytecznych hostów (np. /31 lub /32)
      ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#f9fafb' : '#111827';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`Sieć /${results.cidr} - brak użytecznych hostów`, width / 2, height / 2);
      
      if (results.cidr === 31) {
        ctx.fillText('(Sieć typu punkt-punkt)', width / 2, height / 2 + 20);
      } else if (results.cidr === 32) {
        ctx.fillText('(Pojedynczy adres)', width / 2, height / 2 + 20);
      }
    }
  };
  
  if (!results) return null;
  
  return (
    <Card title="Wizualizacja sieci" className="mb-6">
      <div className="w-full">
        <canvas 
          ref={canvasRef} 
          className="w-full rounded border border-gray-200 dark:border-gray-700"
          style={{ height: '200px' }}
        />
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
          Wizualizacja sieci {results.networkAddress}/{results.cidr}
        </p>
      </div>
    </Card>
  );
};

export default VisualRepresentation;
