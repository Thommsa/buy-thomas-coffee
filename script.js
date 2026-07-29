(function () {
  const STORAGE_KEY = "fistMyBumpData";
  const MAX_LEVEL = 8;

  // Exponential thresholds (order of magnitude harder each time)
  // Level 1: easy (0-9)
  // Level 2: 10+
  // Level 3: 100+
  // Level 4: 1,000+
  // Level 5: 10,000+
  // Level 6: 100,000+
  // Level 7: 1,000,000+
  // Level 8: 10,000,000+
  const LEVEL_THRESHOLDS = [0, 10, 100, 1000, 10000, 100000, 1000000, 10000000];

  const nastyTexts = [
    "BUMP!",
    "SMASH!",
    "PUNCH!",
    "FISTED!",
    "HARDER!",
    "TAKE THAT!",
    "OW YEAH!",
    "CRUSH IT!",
    "KNUCKLE!",
    "BOOM!",
    "SLAM!",
    "POW!",
    "RIGHT IN THE FEELS!",
    "GET FISTED!",
    "NO MERCY!",
    "THAT'S A BUMP!",
    "FIST OF FURY!",
    "HANDSHAKE FROM HELL!",
    "BONE CRUNCH!",
    "YEET THE FIST!",
    "ABSOLUTE UNIT!",
    "FIST MODE ENGAGED!",
    "CONTACT!",
    "DIRTY BUMP!",
    "SWEATY KNUCKLES!",
    "BRO FIST!",
    "RESPECT +1",
    "ANOTHER ONE!",
    "KEEP GOING!",
    "DON'T STOP!",
    "FILTHY!",
    "NASTY!",
    "RAW!",
    "UNHINGED!",
    "CHAOTIC GOOD!",
    "FISTBUMP OF DOOM!",
    // swearing every now and then
    "FUCK YEAH!",
    "HOLY SHIT!",
    "WHAT THE FUCK!",
    "BADASS!",
    "MOTHERFUCKER!",
    "SHIT YEAH!",
    "DAMN!",
    "HELL YEAH!",
    "SON OF A BITCH!",
    "FUCKING LEGEND!",
    "ABSOLUTE MADLAD!",
    "CUNTPUNCH!",
    "BALLSY!",
    "SAVAGE!",
    "GO HARD OR GO HOME!",
    "THIS IS FUCKED!",
    "KNUCKLE SANDWICH!",
    "FACE MEET FIST!",
    "BOOM BITCH!",
    "EAT THIS!",
    "RESPECT THE FIST!"
  ];

  const levelSubtitles = [
    "Level 1 — one lonely fist. Easy mode. Hit it.",
    "Level 2 — two fists. Getting serious.",
    "Level 3 — trio of knuckles. No escape.",
    "Level 4 — four fists. Things are getting weird.",
    "Level 5 — five fists. You're committed now.",
    "Level 6 — six fists. Absolute chaos.",
    "Level 7 — seven fists. Seek help.",
    "Level 8 — eight fists. You absolute monster."
  ];

  const fistsContainer = document.getElementById("fistsContainer");
  const totalCountEl = document.getElementById("totalCount");
  const levelBadge = document.getElementById("levelBadge");
  const subtitle = document.getElementById("subtitle");
  const resetBtn = document.getElementById("resetBtn");

  // state: { total: number, fists: number[] }
  let state = load();

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.total === "number" && Array.isArray(parsed.fists)) {
          return parsed;
        }
      }
    } catch (e) {}
    return { total: 0, fists: [0] };
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function getLevel(total) {
    const t = total === undefined ? state.total : total;
    let level = 1;
    for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
      if (t >= LEVEL_THRESHOLDS[i]) {
        level = i + 1;
      } else {
        break;
      }
    }
    return Math.min(level, MAX_LEVEL);
  }

  function ensureFists() {
    const level = getLevel();
    while (state.fists.length < level) {
      state.fists.push(0);
    }
  }

  function updateUI() {
    ensureFists();
    const level = getLevel();

    levelBadge.textContent = "LEVEL " + level;
    subtitle.textContent = levelSubtitles[Math.min(level - 1, levelSubtitles.length - 1)] || levelSubtitles[levelSubtitles.length - 1];
    totalCountEl.textContent = state.total.toLocaleString();

    // rebuild fists only if count changed
    const currentWrappers = fistsContainer.querySelectorAll(".fist-wrapper");
    if (currentWrappers.length !== state.fists.length) {
      fistsContainer.innerHTML = "";
      state.fists.forEach((count, idx) => {
        const wrapper = document.createElement("div");
        wrapper.className = "fist-wrapper";
        wrapper.dataset.index = idx;

        const textEl = document.createElement("div");
        textEl.className = "bump-text";
        textEl.textContent = "BUMP!";

        const fistEl = document.createElement("div");
        fistEl.className = "fist";
        fistEl.textContent = "👊";

        const countEl = document.createElement("div");
        countEl.className = "fist-count";
        countEl.textContent = count;

        wrapper.appendChild(textEl);
        wrapper.appendChild(fistEl);
        wrapper.appendChild(countEl);
        fistsContainer.appendChild(wrapper);

        // click / touch
        const handler = (e) => {
          e.preventDefault();
          doBump(idx, fistEl, textEl, countEl);
        };
        wrapper.addEventListener("click", handler);
        wrapper.addEventListener("touchstart", handler, { passive: false });
      });
    } else {
      // just update counts
      currentWrappers.forEach((w, idx) => {
        const c = w.querySelector(".fist-count");
        if (c) c.textContent = state.fists[idx];
      });
    }
  }

  function spawnParticles(x, y) {
    const emojis = ["✨", "💥", "👊", "⭐", "🔥", "💢"];
    for (let i = 0; i < 7; i++) {
      const p = document.createElement("span");
      p.className = "particle";
      p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const angle = (Math.PI * 2 * i) / 7 + Math.random() * 0.6;
      const dist = 50 + Math.random() * 50;
      p.style.left = x + "px";
      p.style.top = y + "px";
      p.style.setProperty("--tx", Math.cos(angle) * dist + "px");
      p.style.setProperty("--ty", Math.sin(angle) * dist + "px");
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 750);
    }
  }

  function levelUpFlash() {
    const flash = document.createElement("div");
    flash.className = "level-up-flash";
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 700);
  }

  function doBump(index, fistEl, textEl, countEl) {
    // Always count — no animation lock. Rapid taps work.
    state.fists[index] += 1;
    state.total += 1;
    save();

    const prevLevel = getLevel(state.total - 1);
    const newLevel = getLevel();

    // update this fist's count immediately
    countEl.textContent = state.fists[index];
    totalCountEl.textContent = state.total.toLocaleString();

    // restart animation even if still running
    fistEl.classList.remove("bumping");
    void fistEl.offsetWidth; // reflow
    fistEl.classList.add("bumping");
    setTimeout(() => fistEl.classList.remove("bumping"), 320);

    // random nasty / swear text
    textEl.textContent = nastyTexts[Math.floor(Math.random() * nastyTexts.length)];
    textEl.classList.remove("show");
    void textEl.offsetWidth;
    textEl.classList.add("show");

    // particles on milestones or level up
    if (state.total % 10 === 0 || newLevel > prevLevel) {
      const rect = fistEl.getBoundingClientRect();
      spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }

    if (newLevel > prevLevel) {
      levelUpFlash();
      // rebuild UI so new fist appears
      updateUI();
    }
  }

  resetBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (state.total === 0) return;
    if (confirm("Reset ALL fists and the total count to zero?\n\nYour knuckles will be sad.")) {
      state = { total: 0, fists: [0] };
      save();
      updateUI();
    }
  });

  // init
  updateUI();
})();
