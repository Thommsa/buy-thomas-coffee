# 👊 Fist My Bump

A chaotic little mini-game: tap the fists to give fistbumps. Level up. Get nastier.

**Live:** [https://thommsa.github.io/fist-my-bump/](https://thommsa.github.io/fist-my-bump/)

## Features

- First-person style fist emoji(s)
- Tap / click (as fast as you want) — animation never blocks counting
- Level system: every 10 total bumps unlocks another fist + counter
- Level 1 = 1 fist → Level 2 = 2 fists + 2 counters → … up to 8
- Random spicy / nasty texts instead of plain “BUMP!”
- Total counter + per-fist counters
- Everything remembered in localStorage
- Sparkles & level-up flash
- Fist emoji as favicon / browser icon

## How levels work

| Total bumps | Level | Fists shown |
|-------------|-------|-------------|
| 0–9         | 1     | 1           |
| 10–19       | 2     | 2           |
| 20–29       | 3     | 3           |
| …           | …     | …           |
| 70+         | 8     | 8           |

Each fist has its own counter. Click any of them.

## Files

- `index.html` – structure + favicon
- `style.css` – look, animations, responsive
- `script.js` – levels, multi-fist logic, persistence, nasty texts

Pure HTML/CSS/JS — no build step, no frameworks.
