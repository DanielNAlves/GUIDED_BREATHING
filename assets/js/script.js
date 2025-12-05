const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const statusEl = document.getElementById("status");
const timerEl = document.getElementById("timerDisplay");
const bubbleGroup = document.getElementById("bubbleGroup");
const svgAction = document.getElementById("svgAction");
const beep = document.getElementById("beepSound");
const themeToggle = document.getElementById("themeToggle");

const iconInspire = document.getElementById("iconInspire");
const iconHold = document.getElementById("iconHold");
const iconExpire = document.getElementById("iconExpire");

const sessionCountEl = document.getElementById("sessionCount");

const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

// 🔊 Ajuste fino dos volumes (bem baixinho)
bgMusic.volume = 0.005;  // música suave
beep.volume = 0.004;     // beep mais discreto

// Música Toggle
musicToggle.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {});
    musicToggle.textContent = "Música: On";
  } else {
    bgMusic.pause();
    musicToggle.textContent = "Música: Off";
  }
});

let running = false;
let stopRequested = false;

let theme = localStorage.getItem("theme") || "light";
document.body.className = theme;
themeToggle.textContent = theme === "light" ? "Dark Mode" : "Light Mode";

themeToggle.addEventListener("click", () => {
  theme = theme === "light" ? "dark" : "light";
  document.body.className = theme;
  themeToggle.textContent =
    theme === "light" ? "Dark Mode" : "Light Mode";
  localStorage.setItem("theme", theme);
});

function loadSessionCount() {
  const today = new Date().toISOString().slice(0, 10);
  const stored = JSON.parse(localStorage.getItem("sessions") || "{}");
  sessionCountEl.textContent = `Sessões hoje: ${stored[today] || 0}`;
}
loadSessionCount();

function addSessionCount() {
  const today = new Date().toISOString().slice(0, 10);
  const stored = JSON.parse(localStorage.getItem("sessions") || "{}");
  stored[today] = (stored[today] || 0) + 1;
  localStorage.setItem("sessions", JSON.stringify(stored));
  loadSessionCount();
}

function beepSound() {
  try {
    beep.currentTime = 0;
    beep.play();
  } catch (e) {}
}

function animateInspire() {
  bubbleGroup.style.transform = "scale(1.25)";
  svgAction.textContent = "Inspire";
  iconInspire.style.display = "block";
  iconHold.style.display = "none";
  iconExpire.style.display = "none";
}
function animateHold() {
  bubbleGroup.style.transform = "scale(1.25)";
  svgAction.textContent = "Segure";
  iconInspire.style.display = "none";
  iconHold.style.display = "block";
  iconExpire.style.display = "none";
}
function animateExhale() {
  bubbleGroup.style.transform = "scale(0.82)";
  svgAction.textContent = "Expire";
  iconInspire.style.display = "none";
  iconHold.style.display = "none";
  iconExpire.style.display = "block";
}
function resetAnimation() {
  bubbleGroup.style.transform = "scale(1)";
  svgAction.textContent = "Pronto";
  iconInspire.style.display = "none";
  iconHold.style.display = "none";
  iconExpire.style.display = "none";
}

function countdown(seconds, msg, animation) {
  return new Promise((resolve) => {
    statusEl.textContent = msg;
    timerEl.textContent = seconds;
    beepSound();
    animation();

    let t = seconds;
    const intv = setInterval(() => {
      if (stopRequested) {
        clearInterval(intv);
        resolve("stop");
        return;
      }
      t--;
      timerEl.textContent = t;
      if (t <= 0) {
        clearInterval(intv);
        resolve("ok");
      }
    }, 1000);
  });
}

async function startSession() {
  if (running) return;
  running = true;
  stopRequested = false;

  startBtn.disabled = true;
  stopBtn.disabled = false;

  try {
    bgMusic.muted = false;
    bgMusic.play().catch(() => {});
    musicToggle.textContent = "Música: On";
  } catch (_) {}

  await countdown(4, "Inspire por 4s", animateInspire);
  if (stopRequested) return endSessionEarly();

  await countdown(7, "Segure por 7s", animateHold);
  if (stopRequested) return endSessionEarly();

  await countdown(8, "Expire por 8s", animateExhale);
  if (stopRequested) return endSessionEarly();

  resetAnimation();
  beepSound();

  statusEl.textContent = "Sessão concluída";
  timerEl.textContent = "0";

  addSessionCount();

  running = false;
  stopRequested = false;
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function endSessionEarly() {
  running = false;
  stopRequested = false;
  startBtn.disabled = false;
  stopBtn.disabled = true;
  statusEl.textContent = "Interrompido";
  timerEl.textContent = "0";
  resetAnimation();
}

startBtn.addEventListener("click", startSession);
stopBtn.addEventListener("click", () => (stopRequested = true));
