<a name="readme-top"></a>

<!-- HEADER -->
<br />
<div align="center">
  <a href="#">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSys10LGiTbpboS_qhhVp1KcVlJMVp3-EB1yA&s" alt="Hangman Logo" width="360" height="180">
  </a>
  
  <h3 align="center">The Hangman Challenge</h3>

  <p align="center">
    <strong>Interactive Word Guessing Game with Smart Hint System</strong>
    <br />
    <em>A modern take on the classic Hangman game built with React</em>
  </p>
</div>

<br />

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#key-features">Key Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#technical-implementation">Technical Implementation</a>
      <ul>
        <li><a href="#smart-randomization-system">Smart Randomization System</a></li>
        <li><a href="#game-logic-flow">Game Logic Flow</a></li>
        <li><a href="#responsive-design">Responsive Design</a></li>
      </ul>
    </li>
    <li><a href="#development-process">Development Process</a></li>
    <li><a href="#documentation">Documentation</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

**Hangman Game** is a web-based word guessing game that brings the classic pen-and-paper experience to the digital world. The game features a hand-drawn aesthetic with a paper texture background, sketchy borders, and custom hangman illustrations.

This project was developed as part of a Computer Graphics course assignment, demonstrating practical applications of modern web technologies in creating interactive, visually appealing applications.

### Key Features

✨ **Smart Hint System**

- Dynamic contextual clues for each word
- 48 unique combinations (16 words × 3 hints per word)
- Randomized hints prevent repetitive gameplay

🎨 **Hand-Drawn Aesthetic**

- Custom paper texture background
- Sketchy button borders
- 6-stage custom hangman illustrations
- Smooth animations and transitions

📱 **Cross-Platform Support**

- Fully responsive design (mobile & desktop)
- Native keyboard integration on mobile devices
- Touch-friendly interface with tap-to-type functionality

<!-- 🎮 **Polished Game Mechanics**

- Real-time visual feedback
- Prevent duplicate guesses
- Animated win/lose overlays
- Instant game reset -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![React][React.js]][React-url]
- [![Vite][Vite]][Vite-url]
- [![TailwindCSS][TailwindCSS]][Tailwind-url]
- [![JavaScript][JavaScript]][JavaScript-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TECHNICAL IMPLEMENTATION -->

## Technical Implementation

### Smart Randomization System

The core innovation of this project is the **dual-layer randomization** system that ensures fresh gameplay experiences.

#### How It Works

```jsx
const getRandomWordWithHint = () => {
  // Layer 1: Random word selection
  const randomItem = wordsData[Math.floor(Math.random() * wordsData.length)];

  // Layer 2: Random hint selection (1 of 3 per word)
  const randomHint =
    randomItem.hints[Math.floor(Math.random() * randomItem.hints.length)];

  return { word: randomItem.word, hint: randomHint };
};
```

**Mathematical Breakdown:**

1. **Word Selection**
   - `Math.random()` generates a decimal between 0 and 0.9999...
   - Multiply by array length (16) → 0 to 15.9999...
   - `Math.floor()` rounds down to integer index
   - Result: Equal probability (6.25%) for each word

2. **Hint Selection**
   - Same process applied to 3 hints per word
   - Result: 33.3% probability for each hint variant

**Total Combinations:** 16 words × 3 hints = **48 unique gameplay experiences**

#### Data Structure

```json
{
  "word": "KERTAS",
  "hints": ["📄 Bahan tulis putih", "✏️ Media gambar", "🗒️ Tipis & mudah sobek"]
}
```

Each word contains:

- A target word (uppercase, single word)
- Three contextual hints with emoji icons
- Varying difficulty levels (some obvious, some cryptic)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Game Logic Flow

#### Win/Lose Detection

**Win Condition:**

```jsx
const isWinner = wordToGuess
  .split("")
  .every((letter) => guessedLetters.includes(letter));
```

The game checks if **all letters** in the target word have been guessed:

- `split("")` converts string to array of characters
- `every()` returns true only if ALL letters pass the condition
- Efficient short-circuit evaluation (stops at first false)

**Loss Condition:**

```jsx
const incorrectLetters = guessedLetters.filter(
  (letter) => !wordToGuess.includes(letter),
);
const isLoser = incorrectLetters.length >= 5;
```

Process:

1. Filter guessed letters that DON'T exist in target word
2. Count incorrect guesses
3. Lose if count reaches 5 (matching 6 hangman stages: 0-5)

#### Duplicate Prevention

```jsx
const addGuessedLetter = useCallback(
  (letter) => {
    // Guard clause: prevent invalid states
    if (guessedLetters.includes(letter) || isLoser || isWinner) return;

    // Immutable state update
    setGuessedLetters((current) => [...current, letter]);
  },
  [guessedLetters, isLoser, isWinner],
);
```

**Protection Against:**

- Double-clicking the same letter
- Input after game completion
- Race conditions (memoized with `useCallback`)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Responsive Design

#### Desktop Experience

- Visual on-screen keyboard (A-Z grid)
- Physical keyboard support via event listeners
- Larger spacing and font sizes
- Hover effects on interactive elements

#### Mobile Experience

- Hidden visual keyboard to save screen space
- Native mobile keyboard integration
- Tap-anywhere-to-type functionality
- Optimized layouts (wrapped word display, compact spacing)

**Cross-Platform Input Handling:**

```jsx
// iOS Safari compatibility
onKeyDown={(e) => {
  if (e.key.match(/^[a-z]$/i)) {
    e.preventDefault();
  }
}}

// Android Chrome compatibility
onChange={(e) => {
  const value = e.target.value.toUpperCase();
  if (value.match(/^[A-Z]$/)) {
    addGuessedLetter(value);
  }
  e.target.value = ''; // Clear for next input
}}
```

Both platforms use the same game logic but different input handlers to ensure reliability.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DEVELOPMENT PROCESS -->

## Development Process

### Architecture Decisions

**Component-Based Structure**

The application is divided into focused, reusable components:

```
App.jsx (State Container)
├── HangmanDrawingV2.jsx    → Visual feedback (6 stages)
├── WordDisplay.jsx          → Interactive word reveal
├── Keyboard.jsx             → Input interface
└── GameOverlay.jsx          → Win/lose animations
```

**Unidirectional Data Flow**

All state lives in `App.jsx` and flows down to children via props:

- Parent manages: word selection, guess tracking, win/lose logic
- Children receive: display data and callback functions
- No child component modifies shared state directly

**Performance Optimizations**

- `useCallback` for memoized functions (prevent re-creation on render)
- `useMemo` for derived state (auto-recompute from dependencies)
- Early return patterns (conditional rendering only when needed)
- CSS Grid for responsive layouts (no JavaScript calculations)

### Technical Challenges & Solutions

| Challenge                                   | Solution                          | Implementation                               |
| ------------------------------------------- | --------------------------------- | -------------------------------------------- |
| Mobile keyboard blocked by browser security | Manual focus via user interaction | Tap-to-focus with invisible input field      |
| Hint/word mismatch in randomization         | Atomic state update               | Store both in single object, update together |

### Development Timeline

1. **Core Game Logic** (40%) - State management, win/lose detection
2. **UI Components** (30%) - Visual design, responsive layouts
3. **Polish & UX** (20%) - Animations, mobile support, edge cases
4. **Testing & Fixes** (10%) - Cross-browser testing, bug fixes

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DOCUMENTATION -->

## Documentation

### Desktop Version

![Desktop Gameplay](https://i.postimg.cc/kXckP7Fy/desktop-ver.png)
_Main game interface with hand-drawn aesthetic and paper texture_

![Desktop Win State](https://i.postimg.cc/3J7Pqkpw/desktop-ver-win.png)
_Victory screen with animated celebration message_

![Desktop Lose State](https://i.postimg.cc/7YVprqMV/desktop-ver-lose.png)
_Game over screen revealing the answer in red_

### Mobile Version

![Mobile Gameplay](https://i.postimg.cc/3JBPQ3Cn/mobile-ver.png)
_Optimized mobile layout with native keyboard support_

![Mobile Win State](https://i.postimg.cc/KvNdhmrL/mobile-ver-win.png)
_Responsive win overlay on mobile devices_

![Mobile Lose State](https://i.postimg.cc/WbnQcs6Z/mobile-ver-lose.png)
_Mobile game over screen with full word reveal_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

**Developed by:** Kelompok 3  
**Course:** Computer Graphics  
**Lecturer:** Dwi Widiastuti
**Institution:** Gunadarma University

**Project Links:**

- Live Demo: [Deployed on Netlify](https://game-hangman-tugasgrafkom.netlify.app/)
- Source Code: [GitHub Repository](https://github.com/Frynnn-69/hangman)

---

<p align="center">
  <small>
    Computer Graphics Course Project - Kelompok 3
  </small>
</p>

<!-- MARKDOWN LINKS & IMAGES -->

[React.js]: https://img.shields.io/badge/react-000000?style=for-the-badge&logo=react
[React-url]: https://reactjs.org/
[Vite]: https://img.shields.io/badge/vite-000000?style=for-the-badge&logo=vite
[Vite-url]: https://vitejs.dev/
[TailwindCSS]: https://img.shields.io/badge/Tailwindcss-000000?style=for-the-badge&logo=Tailwindcss
[Tailwind-url]: https://tailwindcss.com/
[JavaScript]: https://img.shields.io/badge/javascript-000000?style=for-the-badge&logo=javascript
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
