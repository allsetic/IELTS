# IELTS Drill Agent Spec

## Purpose
- Maintain and expand a single-page React and Tailwind web app for grammar and vocabulary drills.

## Core Files
- **index.html** – loads the React app, fetches question data, manages UI and state.
- **questions.json** – external question bank with prompts, answers, explanations, and references.

## Responsibilities
1. **Load Data**
   - Fetch questions.json on startup.
   - Validate entries and handle missing fields gracefully.
2. **Render UI**
   - Present prompts, inputs, controls, and session stats.
   - Support actions: Check, Skip, Next, Shuffle, Reset.
3. **Check Answers**
   - Normalize user input and compare with accepted answers.
   - Apply Levenshtein distance to flag "Almost" responses.
4. **Provide Feedback**
   - Show correct answers and short explanations.
   - Display grammar titles, topic notes, detailed guidance, and reference links.

## Algorithms
- **normalize** – standardizes case and punctuation for reliable comparisons.
- **levenshtein** – measures edit distance to detect near-miss answers.
- **shuffle** – randomizes question order each session.

## Technologies
- React hooks: `useState`, `useEffect`, `useMemo`, `useRef`.
- Tailwind CSS for utility-first styling.
- Babel in the browser for JSX compilation.

## How to Run
- Serve files locally to enable fetch:
  - `python -m http.server 8080`
  - or `npx serve`
- Open `http://localhost:8080/` in a browser.

## Next Steps
- Break index.html into modular components.
- Introduce build tools (e.g., Vite or Webpack) for scalability.
- Explore deeper text-matching algorithms.
- Expand the question bank and adaptive analytics.
