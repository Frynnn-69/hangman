import React from 'react';

const KEYS = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
]

export function Keyboard({ activeLetters, inactiveLetters, addGuessedLetter, disabled = false }) {
  return (
    <div 
      style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(65px, 1fr))", 
        gap: ".5rem",
        paddingLeft: "16px",
        paddingRight: "16px",
        boxSizing: "border-box"
      }} 
      className="w-full max-w-[800px]"
    >
      {KEYS.map(key => {
        const isActive = activeLetters.includes(key)
        const isInactive = inactiveLetters.includes(key) // actually 'already guessed'
        return (
          <button
            onClick={() => addGuessedLetter(key)}
            className={`
              btn-sketchy aspect-square text-lg font-bold uppercase cursor-pointer
              ${isActive ? "bg-blue-300" : ""}
              ${isInactive ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-200"}
            `}
            disabled={isInactive || disabled || isActive}
            key={key}
            style={{
                border: "3px solid black",
                background: "transparent",
                borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                transition: "all 0.1s ease-in-out",
                fontSize: "1.125rem"
            }}
          >
            {key}
          </button>
        )
      })}
    </div>
  )
}
