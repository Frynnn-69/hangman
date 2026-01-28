import React from 'react';

export function WordDisplay({ wordToGuess, guessedLetters, reveal = false }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-4xl uppercase font-bold font-mono my-16 px-4" style={{ marginTop: '32px', marginBottom: '32px', fontSize: '2.25rem' }}>
      {wordToGuess.split("").map((letter, index) => (
        <span style={{ borderBottom: ".1em solid black" }} key={index} className="min-w-[50px] text-center">
          <span
            style={{
              visibility: guessedLetters.includes(letter) || reveal
                ? "visible"
                : "hidden",
              color: !guessedLetters.includes(letter) && reveal ? "red" : "black",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
}
