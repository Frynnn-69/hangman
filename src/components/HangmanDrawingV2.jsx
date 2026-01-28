import React from 'react';
import stage0 from "../assets/gamba-hangman/Stage0.png";
import stage1 from "../assets/gamba-hangman/Stage1.png";
import stage2 from "../assets/gamba-hangman/Stage2.png";
import stage3 from "../assets/gamba-hangman/Stage3.png";
import stage4 from "../assets/gamba-hangman/Stage4.png";
import stage5 from "../assets/gamba-hangman/Stage5.png";

const IMAGES = [stage0, stage1, stage2, stage3, stage4, stage5];

export function HangmanDrawingV2({ numberOfGuesses }) {
  // We have stages 0-5. If guesses > 5, we stick to the last image (stage 5).
  const imageIndex = Math.min(numberOfGuesses, 5);

  return (
    <div className="flex justify-center items-center h-[400px] w-[320px]">
      <img 
        src={IMAGES[imageIndex]} 
        alt={`Hangman stage ${imageIndex}`} 
        className="w-full h-full object-contain"
      />
    </div>
  );
}
