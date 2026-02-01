const petalRing = document.getElementById("petalRing");
const petalResult = document.getElementById("petalResult");
const valentineAsk = document.getElementById("valentineAsk");

let petalLines = [
  "He loves me",
  "He loves me not",
  "He loves me",
  "He loves me not",
  "He loves me",
  "He loves me not"
];

let current = 0;

// Create petals in a circle
function buildPetals() {
  const total = petalLines.length;

  for (let i = 0; i < total; i++) {
    const p = document.createElement("div");
    const angle = (360 / total) * i;
    p.style.transform = `rotate(${angle}deg) translateY(-120px)`;
    p.dataset.index = i;
    petalRing.appendChild(p);

    p.addEventListener("click", pluckPetal);
  }
}

buildPetals();

function pluckPetal(e) {
  const i = parseInt(e.target.dataset.index);
  if (i !== current) return;

  petalResult.innerText = petalLines[current];
  e.target.remove();
  current++;

  if (current === petalLines.length) {
    setTimeout(() => petalResult.innerText = "He loves me…", 800);
    setTimeout(() => petalResult.innerText = "He loves me not…", 1600);

    setTimeout(() => {
      petalResult.innerText = "🌹 He loves me 🌹";
      valentineAsk.classList.remove("hidden");
    }, 2600);
  }
}

// YES / NO BUTTON LOGIC
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let dodges = 0;
const maxDodges = 4;

function moveNo() {
  const w = window.innerWidth - 80;
  const h = window.innerHeight - 40;

  noBtn.style.left = Math.random() * w + "px";
  noBtn.style.top = Math.random() * h + "px";
}

noBtn.addEventListener("mouseover", () => {
  dodges++;

  if (dodges >= maxDodges) {
    const rect = yesBtn.getBoundingClientRect();
    noBtn.style.left = rect.left + "px";
    noBtn.style.top = rect.top + "px";

    noBtn.addEventListener("mousedown", moveNo, { once: true });
    return;
  }

  moveNo();
});

yesBtn.addEventListener("click", () => {
  window.location.href = "joy.html";
});
