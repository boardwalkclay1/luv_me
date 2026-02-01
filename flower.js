const petalRing = document.getElementById("petalRing");
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

let pulled = 0;

/* 🌸 BUILD PETALS — ANY ORDER */
function buildPetals() {
  const total = lines.length;

  for (let i = 0; i < total; i++) {
    const p = document.createElement("div");
    const angle = (360 / total) * i;

    p.style.transform = `rotate(${angle}deg) translate(0, -95px)`;
    p.dataset.index = i;

    petalRing.appendChild(p);
    p.addEventListener("click", pluck);
  }
}

buildPetals();

/* 💬 FLOATING WORDS */
function spawnFloatingWord(text) {
  const word = document.createElement("div");
  word.classList.add("floatingWord");
  word.innerText = text;

  word.style.left = Math.random() * (window.innerWidth - 200) + "px";
  word.style.top = Math.random() * (window.innerHeight - 200) + "px";

  document.body.appendChild(word);
  setTimeout(() => word.remove(), 2000);
}

/* 🌸 PETAL PULLING */
function pluck(e) {
  const index = parseInt(e.target.dataset.index);

  spawnFloatingWord(lines[index]);

  e.target.style.opacity = "0";
  e.target.style.transform += " scale(.4)";
  setTimeout(() => e.target.remove(), 400);

  /* POPUPS */
  if (pulled % 3 === 0) teddy.classList.add("show");
  if (pulled % 3 === 1) rose.classList.add("show");
  if (pulled % 3 === 2) chocolate.classList.add("show");

  setTimeout(() => {
    teddy.classList.remove("show");
    rose.classList.remove("show");
    chocolate.classList.remove("show");
  }, 1500);

  pulled++;

  if (pulled === lines.length) {
    goHaywire();
    setTimeout(showFinalPetal, 1500);
  }
}

/* 🤯 HAYWIRE */
function goHaywire() {
  document.querySelector(".flower").classList.add("haywire");
}

/* 🌸 FINAL PETAL */
function showFinalPetal() {
  const final = document.createElement("div");
  final.id = "finalPetal";
  final.innerText = "💘";

  final.style.position = "absolute";
  final.style.top = "115px";
  final.style.left = "80px";
  final.style.transform = "translate(0, -95px)";
  final.style.zIndex = "20";

  final.addEventListener("click", () => {
    spawnFloatingWord("He LOVES you! 💘");
    document.querySelector(".flower").classList.remove("haywire");
    valentineAsk.classList.remove("hidden");
  });

  petalRing.appendChild(final);
}

/* ❤️ YES / ❌ NO */
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let dodges = 0;

function moveNo() {
  noBtn.style.left = Math.random() * (window.innerWidth - 80) + "px";
  noBtn.style.top = Math.random() * (window.innerHeight - 40) + "px";
}

noBtn.addEventListener("mouseover", () => {
  dodges++;
  if (dodges >= 4) {
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
