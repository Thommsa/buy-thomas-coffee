# buy him a ciffee ☕️

A chaotic little mini-game: tap the fists to give fistbumps. Level up. Get nastier. Swear a bit. Also buy someone a coffee by doing this useless work. Thomas's first try of making an application and show it to the public. The use? Learning. 

**Live:** [https://thommsa.github.io/fist-my-bump/](https://thommsa.github.io/fist-my-bump/)

Themed as a playful nod to *Project Hail Mary* — a blurred space “poster” slowly comes into focus the more you bump.

## Features

- First-person style fist emoji(s)
- Tap / click (as fast as you want) — animation never blocks counting
- **Exponential levels**: first level is easy, then each next level is ~10× harder
- Level 1 = 1 fist → Level 2 = 2 fists + 2 counters → … up to 8
- Random spicy / nasty / sweary texts (plus a few Hail Mary flavored ones)
- **Background reveal**: the space poster starts heavily blurred and pixel-soft; every bump slowly removes blur, raises brightness & saturation, and scales it up
- Continuous “Signal clarity” meter so late-game clicks still feel rewarding
- Total counter + per-fist counters
- Everything remembered in localStorage
- Sparkles & level-up flash
- Fist emoji as favicon / browser icon

Clarity uses a log scale so early clicks give big visual feedback and millions of bumps still slowly sharpen the background.

## Files

- `index.html` – structure + favicon + background layer
- `style.css` – look, animations, reveal filters
- `script.js` – levels, multi-fist logic, persistence, clarity, nasty texts

Pure HTML/CSS/JS — no build step, no frameworks.
