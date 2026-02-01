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

/* Build petals */
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

/* Floating words */
function spawnFloatingWord(text) {
  const word = document.createElement("div");
  word.classList.add("floatingWord");
  word.innerText = text;

  word.style.left = Math.random() * (window.innerWidth - 200) + "px";
  word.style.top = Math.random() * (window.innerHeight - 200) + "px";

  document.body.appendChild(word);
  setTimeout(() => word.remove(), 2000);
}

/* Popups */
function showPopup(type) {
  const el = document.querySelector("." + type);
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 1200);
}

/* Petal pulling */
function pluck(e) {
  const index = parseInt(e.target.dataset.index);

  spawnFloatingWord(lines[index]);

  e.target.style.opacity = "0";
  e.target.style.transform += " scale(.4)";
  setTimeout(() => e.target.remove(), 400);

  if (pulled % 3 === 0) showPopup("teddy");
  if (pulled % 3 === 1) showPopup("rose");
  if (pulled % 3 === 2) showPopup("chocolate");

  pulled++;

  if (pulled === lines.length) {
    goHaywire();
    setTimeout(showFinalPetal, 1500);
  }
}

/* Haywire */
function goHaywire() {
  document.querySelector(".flower").classList.add("haywire");
}

/* Final petal */
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

/* NO button dodging */
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

function moveNo() {
  const maxX = window.innerWidth - noBtn.offsetWidth - 20;
  const maxY = window.innerHeight - noBtn.offsetHeight - 20;

  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";
}

noBtn.addEventListener("mouseover", moveNo);

yesBtn.addEventListener("click", () => {
  window.location.href = "joy.html";
});
