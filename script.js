(function () {
  const STORAGE_KEY = "fistMyBumpData";
  const MAX_LEVEL = 12;

  // Gradual difficulty (not exponential)
  // Level 1: 0–9
  // Level 2: 10+
  // Level 3: 20+
  // Level 4: 32+
  // Level 5: 64+
  // Level 6: 90+
  // Level 7: 100+
  // then continue gently toward level 10+
  const LEVEL_THRESHOLDS = [0, 10, 20, 32, 64, 90, 100, 140, 200, 280, 380, 500, 650];

  // Texts get filthier the more you click
  const textsMild = [
    "BUMP!",
    "SMASH!",
    "PUNCH!",
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
    "FIST OF FURY!",
    "YEET THE FIST!",
    "ABSOLUTE UNIT!",
    "CONTACT!",
    "BRO FIST!",
    "RESPECT +1",
    "ANOTHER ONE!",
    "KEEP GOING!",
    "DON'T STOP!",
    "HAIL MARY!",
    "FOR EARTH!",
    "SOLVE IT!"
  ];

  const textsSpicy = [
    "FUCK YEAH!",
    "HOLY SHIT!",
    "WHAT THE FUCK!",
    "BADASS!",
    "MOTHERFUCKER!",
    "SHIT YEAH!",
    "HELL YEAH!",
    "SON OF A BITCH!",
    "FUCKING LEGEND!",
    "ABSOLUTE MADLAD!",
    "CUNTPUNCH!",
    "BALLSY!",
    "SAVAGE!",
    "BOOM BITCH!",
    "EAT THIS!",
    "DIRTY BUMP!",
    "SWEATY KNUCKLES!",
    "FILTHY!",
    "NASTY!",
    "RAW!",
    "UNHINGED!",
    "SCIENCE BITCH!",
    "ASTROPHAGE SUCKS!",
    "ROCKY WOULD APPROVE!",
    "GRACE UNDER PRESSURE!",
    "KNUCKLE SANDWICH!",
    "FACE MEET FIST!",
    "THIS IS FUCKED!"
  ];

  const textsFilthy = [
    "CUNTFLAPS!",
    "FUCK MY LIFE!",
    "ABSOLUTE CUNT!",
    "POES!",
    "FOKKEN HELL!",
    "KAK!",
    "BLIKSEM!",
    "DONDER!",
    "JOL IT!",
    "SKOP THAT!",
    "LEKKER FOK!",
    "BRU THAT HURT!",
    "DOOS!",
    "FOK JOU!",
    "CUM THROUGH!",
    "HARDER DADDY!",
    "CHOKE ON IT!",
    "GAG ON THE FIST!",
    "SLUTTY KNUCKLES!",
    "PORN-STAR BUMP!",
    "DEEPSTROKE!",
    "RAIL ME!",
    "WRECKED!",
    "CREAMPIE THE VOID!",
    "SPIT ON IT!",
    "FILTHY LITTLE BUMP!",
    "CUNTPUNCH DELUXE!",
    "BALLS DEEP!",
    "ROUGHER!",
    "MAKE IT WET!",
    "FUCK THE SIGNAL!",
    "HORNY SCIENCE!",
    "THROBBING!",
    "DRIPPING!",
    "ABSOLUTE WHORE ENERGY!",
    "NUTTED!",
    "CLAP THOSE CHEEKS!",
    "RAUNCHY AS KAK!",
    "FOKKEN LEGEND!",
    "POESKLAP!",
    "KAKHOUSE!",
    "MOER TOE!",
    "JY IS 'N DOOS!",
    "VOKKEN NICE!",
    "SWEATY POES ENERGY!",
    "CUMGUZZLER BUMP!",
    "FACEFUCK THE STARS!",
    "ASTROPHAGE MY ASS!",
    "ROCKY LIKES IT ROUGH!",
    "HAIL MARY YOU FILTHY ANIMAL!"
  ];

  const textsNuclear = [
    "CUNTFLAPS OF DOOM!",
    "FOKKEN CUNTFLAPS!",
    "POES IN SPACE!",
    "KAKSTORM!",
    "BLIKSEM THE VOID!",
    "MOER DIE FOK!",
    "ABSOLUTE POES!",
    "CUM-SOAKED KNUCKLES!",
    "GAG REFLEX ACTIVATED!",
    "BALLS-DEEP IN THE SIGNAL!",
    "CREAMPIE THE UNIVERSE!",
    "SLUTMODE: ENGAGED!",
    "PORNSTAR SCIENTIST!",
    "THROAT GOAT BUMP!",
    "DESTROY THAT HOLE!",
    "FILTHY SOUTH AFRICAN ENERGY!",
    "JY IS 'N FOCKEN LEGEND!",
    "POESKLAP FROM TAU CETI!",
    "KAK OP JOU!",
    "DONDER EN BLIKSEM!",
    "LEKKER NAT!",
    "HARDCORE AS FUCK!",
    "WRECK MY SIGNAL!",
    "NUT IN THE VOID!",
    "CUNTPUNCH TO THE FACE!",
    "SPIT-ROAST THE ASTROPHAGE!",
    "RAIL THE SHIP!",
    "HORNY AS KAK!",
    "FOKKEN UNHINGED!",
    "ABSOLUTE DEGENERATE!",
    "MAKE ROCKY PROUD!",
    "SCIENCE WHORE!",
    "CUMROCKET!",
    "DEEPTHROAT THE HAIL MARY!",
    "POESENSIEG!",
    "KAKHOUSE RULES!",
    "MOER TOE BRU!",
    "VOK JOU HARDER!",
    "SWEATY CUNTFLAPS!",
    "FACE FULL OF FIST!",
    "GAPE THE SIGNAL!",
    "RUIN ME!",
    "ABSOLUTE FILTH!",
    "NUCLEAR CUNT ENERGY!"
  ];

  const levelSubtitles = [
    "Level 1 — one lonely fist. Easy mode. Hit it.",
    "Level 2 — still one fist. Warming up.",
    "Level 3 — still one fist. Getting serious.",
    "Level 4 — still one fist. Almost there…",
    "Level 5 — second fist unlocked. Now we're talking.",
    "Level 6 — two fists. Keep going.",
    "Level 7 — two fists. The grind continues.",
    "Level 8 — two fists. Almost legendary.",
    "Level 9 — two fists. One more to the third…",
    "Level 10 — third fist unlocked. Absolute chaos.",
    "Level 11 — three fists. Seek help.",
    "Level 12 — three fists. You absolute monster."
  ];

  const fistsContainer = document.getElementById("fistsContainer");
  const totalCountEl = document.getElementById("totalCount");
  const levelBadge = document.getElementById("levelBadge");
  const subtitle = document.getElementById("subtitle");
  const resetBtn = document.getElementById("resetBtn");
  const bgReveal = document.getElementById("bgReveal");
  const clarityFill = document.getElementById("clarityFill");
  const clarityPct = document.getElementById("clarityPct");

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

  // Fist unlocks:
  // Levels 1–4 → 1 fist
  // Levels 5–9 → 2 fists
  // Level 10+  → 3 fists
  function getDesiredFistCount(level) {
    if (level <= 4) return 1;
    if (level < 10) return 2;
    return 3;
  }

  // Continuous reward: log-scale clarity
  function getClarity(total) {
    if (total <= 0) return 0;
    return Math.min(1, Math.log10(total + 1) / 7.5);
  }

  // The more you click, the filthier it gets
  function getBumpText() {
    const t = state.total;
    let pool;

    if (t < 25) {
      pool = Math.random() < 0.25 ? textsSpicy : textsMild;
    } else if (t < 150) {
      const r = Math.random();
      if (r < 0.35) pool = textsMild;
      else if (r < 0.75) pool = textsSpicy;
      else pool = textsFilthy;
    } else if (t < 2000) {
      const r = Math.random();
      if (r < 0.15) pool = textsSpicy;
      else if (r < 0.65) pool = textsFilthy;
      else pool = textsNuclear;
    } else {
      pool = Math.random() < 0.55 ? textsNuclear : textsFilthy;
    }

    return pool[Math.floor(Math.random() * pool.length)];
  }

  function updateBackground() {
    if (!bgReveal) return;
    const c = getClarity(state.total);
    const blur = (48 * (1 - c)).toFixed(1) + "px";
    const bright = (0.18 + 0.82 * c).toFixed(3);
    const sat = (0.1 + 0.95 * c).toFixed(3);
    const scale = (0.90 + 0.12 * c).toFixed(3);
    const opacity = (0.22 + 0.78 * c).toFixed(3);

    bgReveal.style.setProperty("--blur", blur);
    bgReveal.style.setProperty("--bright", bright);
    bgReveal.style.setProperty("--sat", sat);
    bgReveal.style.setProperty("--scale", scale);
    bgReveal.style.setProperty("--poster-opacity", opacity);

    if (clarityFill && clarityPct) {
      const pct = Math.round(c * 100);
      clarityFill.style.width = pct + "%";
      clarityPct.textContent = pct + "%";
    }
  }

  function ensureFists() {
    const level = getLevel();
    const desired = getDesiredFistCount(level);
    while (state.fists.length < desired) {
      state.fists.push(0);
    }
  }

  function updateUI() {
    ensureFists();
    const level = getLevel();

    levelBadge.textContent = "LEVEL " + level;
    subtitle.textContent = levelSubtitles[Math.min(level - 1, levelSubtitles.length - 1)] || levelSubtitles[levelSubtitles.length - 1];
    totalCountEl.textContent = state.total.toLocaleString();
    updateBackground();

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

        const handler = (e) => {
          e.preventDefault();
          doBump(idx, fistEl, textEl, countEl);
        };
        wrapper.addEventListener("click", handler);
        wrapper.addEventListener("touchstart", handler, { passive: false });
      });
    } else {
      currentWrappers.forEach((w, idx) => {
        const c = w.querySelector(".fist-count");
        if (c) c.textContent = state.fists[idx];
      });
    }
  }

  function spawnParticles(x, y) {
    const emojis = ["✨", "💥", "👊", "⭐", "🔥", "💢", "🚀", "🌌"];
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
    state.fists[index] += 1;
    state.total += 1;
    save();

    const prevLevel = getLevel(state.total - 1);
    const newLevel = getLevel();

    countEl.textContent = state.fists[index];
    totalCountEl.textContent = state.total.toLocaleString();
    updateBackground();

    fistEl.classList.remove("bumping");
    void fistEl.offsetWidth;
    fistEl.classList.add("bumping");
    setTimeout(() => fistEl.classList.remove("bumping"), 320);

    textEl.textContent = getBumpText();
    textEl.classList.remove("show");
    void textEl.offsetWidth;
    textEl.classList.add("show");

    if (state.total % 10 === 0 || newLevel > prevLevel) {
      const rect = fistEl.getBoundingClientRect();
      spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }

    if (newLevel > prevLevel) {
      levelUpFlash();
      updateUI();
    }
  }

  resetBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (state.total === 0) return;
    if (confirm("Reset ALL fists and the total count to zero?\n\nYour knuckles will be sad.\nThe signal will go dark again.")) {
      state = { total: 0, fists: [0] };
      save();
      updateUI();
    }
  });

  // init
  updateUI();
})();
