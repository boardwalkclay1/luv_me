const petalRing = document.getElementById("petalRing");
const valentineAsk = document.getElementById("valentineAsk");

let lines = [
  "He loves me 💖",
  "He loves me not 💔",
  "He loves me 💖",
  "He loves me not 💔",
  "He loves me 💖",
  "He loves me not 💔"
];

let pulled = 0;

/* BUILD PETALS — user can click ANY one */
function buildPetals() {
  const total = lines.length;

  for (let i = 0; i < total; i++) {
    const p = document.createElement("div");
    const angle = (360 / total) * i;

    p.style.transform = `rotate(${angle}deg) translate(0, -110px)`;
    p.dataset.index = i;

    petalRing.appendChild(p);
    p.addEventListener("click", pluck);
  }
}

buildPetals();

/* FLOATING WORDS */
function spawnFloatingWord(text) {
  const word = document.createElement("div");
  word.classList.add("floatingWord");
  word.innerText = text;

  word.style.left = Math.random() * (window.innerWidth - 200) + "px";
  word.style.top = Math.random() * (window.innerHeight - 200) + "px";

  document.body.appendChild(word);

  setTimeout(() => word.remove(), 2000);
}

/* PETAL PULLING */
function pluck(e) {
  const index = parseInt(e.target.dataset.index);

  spawnFloatingWord(lines[index]);

  e.target.style.opacity = "0";
  e.target.style.transform += " scale(0.4)";
  setTimeout(() => e.target.remove(), 400);

  pulled++;

  if (pulled === lines.length) {
    goHaywire();
    setTimeout(showFinalPetal, 1500);
  }
}

/* HAYWIRE MODE */
function goHaywire() {
  document.querySelector(".flower").classList.add("haywire");
}

/* FINAL PETAL */
function showFinalPetal() {
  const final = document.createElement("div");
  final.id = "finalPetal";
  final.innerText = "💘";
  final.style.position = "absolute";
  final.style.top = "110px";
  final.style.left = "75px";
  final.style.transform = "translate(0, -110px)";
  final.style.zIndex = "20";

  final.addEventListener("click", () => {
    spawnFloatingWord("He LOVES you! 💘");
    document.querySelector(".flower").classList.remove("haywire");
    valentineAsk.classList.remove("hidden");
  });

  petalRing.appendChild(final);
}

/* YES / NO BUTTON LOGIC */
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
