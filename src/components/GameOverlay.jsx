import React from 'react';

export function GameOverlay({ isWinner, isLoser }) {
  if (!isWinner && !isLoser) return null;

  return (
    <div className="mt-4 mb-6">
      <h2 
        className="text-4xl md:text-5xl font-bold font-hand text-black text-center animate-bounce" 
        style={{ 
          fontSize: window.innerWidth >= 768 ? '3rem' : '2.25rem',
          animation: 'scaleUp 0.5s ease-out'
        }}
      >
        {isWinner ? "🎉 YOU WON! 🎉" : "💀 GAME OVER 💀"}
      </h2>
      
      <style jsx>{`
        @keyframes scaleUp {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
