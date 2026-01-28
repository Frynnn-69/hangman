import React from 'react';

export function GameOverlay({ isWinner, isLoser }) {
  if (!isWinner && !isLoser) return null;

  return (
    <div className="mt-4 mb-6">
      <h2 className="text-4xl md:text-5xl font-bold font-hand text-black text-center" style={{ fontSize: window.innerWidth >= 768 ? '3rem' : '2.25rem' }}>
        {isWinner ? "YOU WON!" : "GAME OVER"}
      </h2>
    </div>
  );
}
