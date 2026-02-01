// PETAL LOGIC
const petalsContainer = document.getElementById("petals");
const petalText = document.getElementById("petalText");
const valentineAsk = document.getElementById("valentineAsk");

let petals = [
  "He loves me",
  "He loves me not",
  "He loves me",
  "He loves me not",
  "He loves me",
  "He loves me not" // last one (fake-out)
];

let index = 0;

// Create petals around the rose
function placePetals() {
  for (let i = 0; i < petals.length; i++) {
    const p = document.createElement("div");
    p.innerText = "🌸";
    p.style.left = (Math.cos(i * 0.9) * 100) + "px";
    p.style.top = (Math.sin(i * 0.9) * 100) + "px";
    p.dataset.index = i;
    petalsContainer.appendChild(p);

    p.addEventListener("click", pullPetal);
  }
}

placePetals();

function pullPetal(e) {
  const i = parseInt(e.target.dataset.index);

  if (i !== index) return; // must pull in order

  petalText.innerText = petals[index];
  e.target.remove();
  index++;

  // Last petal pulled
  if (index === petals.length) {
    setTimeout(() => {
      petalText.innerText = "He loves me…";
    }, 800);

    setTimeout(() => {
      petalText.innerText = "He loves me not…";
    }, 1600);

    // Magic final petal
    setTimeout(() => {
      petalText.innerText = "🌹 He loves me 🌹";
      showValentineAsk();
    }, 2600);
  }
}

// SHOW VALENTINE ASK
function showValentineAsk() {
  valentineAsk.classList.remove("hidden");
}


// YES / NO BUTTON LOGIC
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let dodgeCount = 0;
const maxDodges = 4;

// Move No button randomly
function moveNo() {
  const w = window.innerWidth - 80;
  const h = window.innerHeight - 40;

  noBtn.style.left = Math.random() * w + "px";
  noBtn.style.top = Math.random() * h + "px";
}

noBtn.addEventListener("mouseover", () => {
  dodgeCount++;

  if (dodgeCount >= maxDodges) {
    // Jump over YES
    const rect = yesBtn.getBoundingClientRect();
    noBtn.style.left = rect.left + "px";
    noBtn.style.top = rect.top + "px";

    // Teleport away before click
    noBtn.addEventListener("mousedown", moveNo, { once: true });
    return;
  }

  moveNo();
});

// YES → next page
yesBtn.addEventListener("click", () => {
  window.location.href = "joy.html";
});
