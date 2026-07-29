(function () {
  const STORAGE_KEY = "fistMyBumpCount";

  const fist = document.getElementById("fist");
  const fistArea = document.getElementById("fistArea");
  const bumpText = document.getElementById("bumpText");
  const countEl = document.getElementById("count");
  const resetBtn = document.getElementById("resetBtn");

  let count = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
  let isAnimating = false;

  function updateDisplay() {
    countEl.textContent = count.toLocaleString();
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, String(count));
  }

  function spawnParticles() {
    const emojis = ["✨", "💥", "👊", "⭐"];
    const rect = fist.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for (let i = 0; i < 6; i++) {
      const p = document.createElement("span");
      p.className = "particle";
      p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const angle = (Math.PI * 2 * i) / 6 + Math.random() * 0.5;
      const dist = 60 + Math.random() * 40;
      p.style.left = cx + "px";
      p.style.top = cy + "px";
      p.style.setProperty("--tx", Math.cos(angle) * dist + "px");
      p.style.setProperty("--ty", Math.sin(angle) * dist + "px");
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 800);
    }
  }

  function doBump() {
    if (isAnimating) return;
    isAnimating = true;

    count += 1;
    updateDisplay();
    save();

    fist.classList.add("bumping");
    bumpText.classList.remove("show");
    // force reflow so animation restarts
    void bumpText.offsetWidth;
    bumpText.classList.add("show");

    if (count % 10 === 0) {
      spawnParticles();
    }

    setTimeout(() => {
      fist.classList.remove("bumping");
      isAnimating = false;
    }, 350);
  }

  fistArea.addEventListener("click", doBump);
  fistArea.addEventListener("touchstart", function (e) {
    e.preventDefault();
    doBump();
  }, { passive: false });

  resetBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    if (count === 0) return;
    if (confirm("Reset your fist bump count to zero?")) {
      count = 0;
      updateDisplay();
      save();
    }
  });

  updateDisplay();
})();
