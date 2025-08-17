# IELTS Drill Web App

## Overview
This repository contains a single-page web application built with React and Tailwind CSS for practicing English grammar and vocabulary.

### Top-level files
- **`index.html`**: React app shell; fetches questions from `questions.json` and renders the interface.
- **`questions.json`**: External question bank with grammar metadata and reference links.
- **`README.md`**: You are reading it.

## Main components and flow
1. **Utility helpers**
   - `normalize`: lowercases, removes punctuation, and standardizes quotes.
   - `levenshtein`: computes edit distance between the student's response and the model answer.
   - `shuffle`: randomizes question order.
2. **External question bank (`questions.json`)**
   - Provides `id`, `category`, `prompt`, accepted answers, explanations, grammar titles, topic notes, detailed guidance, and reference URLs.
3. **`EnglishDrillApp` React component**
   - Uses React hooks for state management.
   - Functions like `checkAnswer`, `skip`, `next`, and `reshuffle` control question flow.
   - `getBestMatch` calculates "Almost" status when the user's answer is close to correct.

## Important concepts to grasp
- **React Hooks**: `useState`, `useEffect`, `useMemo`, and `useRef` manage state and side effects.
- **Edit-distance comparison**: The `levenshtein` function powers "almost correct" feedback.
- **Tailwind CSS**: Utility classes provide styling without dedicated CSS files.
- **Babel in the browser**: `<script type="text/babel">` enables JSX without a build step.

## Pointers for learning next
- **React basics**: Component structure and JSX syntax.
- **State and prop management**: How state drives the UI and question flow.
- **Tailwind CSS**: Understanding utility-first styling.
- **String-processing algorithms**: A deeper dive into Levenshtein distance and normalization techniques.
- **Modularization and build tools**: Learn about bundlers (Vite, Webpack) and how to break the monolithic `index.html` into separate components for scalability.

## Summary
This project is a small, standalone React application delivered entirely through a single HTML file. It demonstrates how to build an interactive language-drill tool using only CDN-supplied libraries and browser-side Babel. To grow or contribute, focus on mastering React hooks, Tailwind’s styling conventions, and basic algorithmic text processing. From there, the natural next step is learning how to modularize the code and introduce a build process for larger-scale development.

## Development

Run a local server to avoid browser `fetch` restrictions:

- `python -m http.server 8080`
- or `npx serve`

Open `http://localhost:8080/` and edit `questions.json` to update content—no rebuild required.

