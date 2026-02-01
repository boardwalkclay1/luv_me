const petalRing = document.getElementById("petalRing");
const petalText = document.getElementById("petalText");
const valentineAsk = document.getElementById("valentineAsk");

const teddy = document.querySelector(".teddy");
const rose = document.querySelector(".rose");
const chocolate = document.querySelector(".chocolate");

let lines = [
  "He loves me 💖",
  "He loves me not 💔",
  "He loves me 💖",
  "He loves me not 💔",
  "He loves me 💖",
  "He loves me not 💔"
];

let current = 0;

// Build petals
function buildPetals() {
  const total = lines.length;

  for (let i = 0; i < total; i++) {
    const p = document.createElement("div");
    const angle = (360 / total) * i;
    p.style.transform = `rotate(${angle}deg) translateY(-130px)`;
    p.dataset.index = i;
    petalRing.appendChild(p);

    p.addEventListener("click", pluck);
  }
}

buildPetals();

function pluck(e) {
  const i = parseInt(e.target.dataset.index);
  if (i !== current) return;

  petalText.innerText = lines[current];
  e.target.style.opacity = "0";
  e.target.style.transform += " scale(0.5)";
  setTimeout(() => e.target.remove(), 400);

  // POPUP ANIMATION
  if (current % 3 === 0) teddy.classList.add("show");
  if (current % 3 === 1) rose.classList.add("show");
  if (current % 3 === 2) chocolate.classList.add("show");

  setTimeout(() => {
    teddy.classList.remove("show");
    rose.classList.remove("show");
    chocolate.classList.remove("show");
  }, 1500);

  current++;

  if (current === lines.length) {
    setTimeout(() => petalText.innerText = "He loves me… 🌸", 800);
    setTimeout(() => petalText.innerText = "He loves me not… 💔", 1600);

    setTimeout(() => {
      petalText.innerText = "🌹 He loves me 🌹";
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
