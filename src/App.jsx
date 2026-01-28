import React, { useState, useEffect, useCallback } from 'react';
import wordsData from './data/wordsWithHints.json';
import { HangmanDrawingV2 } from './components/HangmanDrawingV2';
// import { HangmanDrawing } from './components/HangmanDrawing';
import { WordDisplay } from './components/WordDisplay';
import { Keyboard } from './components/Keyboard';
import { GameOverlay } from './components/GameOverlay';

function App() {
  const getRandomWordWithHint = () => {
    const randomItem = wordsData[Math.floor(Math.random() * wordsData.length)];
    const randomHint = randomItem.hints[Math.floor(Math.random() * randomItem.hints.length)];
    return { word: randomItem.word, hint: randomHint };
  };

  // Generate initial data once
  const [gameData, setGameData] = useState(() => getRandomWordWithHint());
  const [guessedLetters, setGuessedLetters] = useState([]);

  const wordToGuess = gameData.word;
  const currentHint = gameData.hint;

  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 5;
  const isWinner = wordToGuess
    .split("")
    .every(letter => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback((letter) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) return;
    setGuessedLetters(current => [...current, letter]);
  }, [guessedLetters, isLoser, isWinner]);

  useEffect(() => {
    const handler = (e) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/i)) return;
      e.preventDefault();
      addGuessedLetter(key.toUpperCase());
    };

    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    }
  }, [addGuessedLetter]);

  const resetGame = () => {
    setGuessedLetters([]);
    setGameData(getRandomWordWithHint());
  };

  return (
    <div className="w-full min-h-screen paper-texture flex flex-col items-center py-8 text-gray-800 font-sans overflow-hidden">
      
      {/* HEADER */}
      <h1 className="text-4xl md:text-5xl font-bold transform -rotate-2 font-hand mt-8 mb-4 text-center leading-tight" style={{ fontSize: window.innerWidth >= 768 ? '3rem' : '2.25rem' }}>
        Hangman <br/>
        <span className="text-2xl md:text-3xl block text-center opacity-80 mt-2" style={{ fontSize: window.innerWidth >= 768 ? '1.875rem' : '1.5rem' }}>{currentHint}</span>
      </h1>






      {/* DRAWING AREA */}
      <div className="relative mb-12" style={{ marginBottom: '24px' }}>
         {/* <HangmanDrawing numberOfGuesses={incorrectLetters.length} /> */}
         <HangmanDrawingV2 numberOfGuesses={incorrectLetters.length} />
      </div>

      {/* GAME OVER OVERLAY - Right below character */}
      <GameOverlay 
        isWinner={isWinner} 
        isLoser={isLoser} 
      />

      {/* WORD DISPLAY - Hidden when game over */}
      {!isWinner && !isLoser && (
        <WordDisplay 
          wordToGuess={wordToGuess} 
          guessedLetters={guessedLetters} 
          reveal={isLoser} 
        />
      )}


      {/* RESET BUTTON & KEYBOARD CONTAINER */}
      <div className="w-full px-6 flex flex-col items-center mt-auto mb-8 gap-16" style={{ gap: '40px' }}>
        <button 
          onClick={resetGame}
          className="px-4 py-2 bg-[#f0f0f0] border-[3px] border-black font-hand text-lg font-bold rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all active:bg-gray-200"
          style={{ fontSize: '1.125rem' }}
        >
           ↺ RESET GAME
        </button>

        {/* Hidden input for mobile native keyboard */}
        <input
          type="text"
          maxLength={1}
          autoComplete="off"
          autoCapitalize="characters"
          className="md:hidden absolute opacity-0 pointer-events-none"
          style={{ position: 'absolute', left: '-9999px' }}
          onKeyDown={(e) => {
            if (e.key.match(/^[a-z]$/i)) {
              e.preventDefault();
              addGuessedLetter(e.key.toUpperCase());
            }
          }}
          autoFocus
        />

        {/* Visual keyboard - hidden on mobile */}
        <div className="hidden md:flex w-full justify-center">
          <Keyboard 
            activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
            inactiveLetters={guessedLetters}
            addGuessedLetter={addGuessedLetter}
            disabled={isWinner || isLoser}
          />
        </div>
      </div>



    </div>
  );
}

export default App;
