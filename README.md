# 👊 Fist My Bump

A chaotic little mini-game: tap the fists to give fistbumps. Level up. Get nastier. Swear a bit.

**Live:** [https://thommsa.github.io/fist-my-bump/](https://thommsa.github.io/fist-my-bump/)

## Features

- First-person style fist emoji(s)
- Tap / click (as fast as you want) — animation never blocks counting
- **Exponential levels**: first level is easy, then each next level is ~10× harder
- Level 1 = 1 fist → Level 2 = 2 fists + 2 counters → … up to 8
- Random spicy / nasty / sweary texts
- Total counter + per-fist counters
- Everything remembered in localStorage
- Sparkles & level-up flash
- Fist emoji as favicon / browser icon

## How levels work (exponential)

| Total bumps   | Level | Fists shown |
|---------------|-------|-------------|
| 0 – 9         | 1     | 1           |
| 10 – 99       | 2     | 2           |
| 100 – 999     | 3     | 3           |
| 1,000 – 9,999 | 4     | 4           |
| 10,000 – 99,999 | 5   | 5           |
| 100,000 – 999,999 | 6 | 6         |
| 1,000,000 – 9,999,999 | 7 | 7     |
| 10,000,000+   | 8     | 8           |

Level 1 is easy. After that it gets exponentially harder (order of magnitude).

Each fist has its own counter. Click any of them.

## Files

- `index.html` – structure + favicon
- `style.css` – look, animations, responsive
- `script.js` – levels, multi-fist logic, persistence, nasty texts

Pure HTML/CSS/JS — no build step, no frameworks.
