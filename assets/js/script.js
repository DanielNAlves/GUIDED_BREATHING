// ------------------ DOM ------------------
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
const beepToggle = document.getElementById("beepToggle");

const resetBtn = document.getElementById("resetSessions");
const exportBtn = document.getElementById("exportSessions");
const chartRange = document.getElementById("chartRange");
const canvas = document.getElementById("sessionChart");
const ctx = canvas.getContext("2d");

// ------------------ Configurações iniciais ------------------
let beepEnabled = true;
bgMusic.volume = 0.05; // padrão confortável
beep.volume = 0.15;

// ------------------ Persistência: sessionsData ------------------
function getSessionsData() {
  return JSON.parse(localStorage.getItem("sessionsData") || "{}");
}
function saveSessionsData(data) {
  localStorage.setItem("sessionsData", JSON.stringify(data));
}

// Inicializa estrutura se necessário
function ensureSessionsStructure() {
  const today = new Date().toISOString().slice(0, 10);
  const data = getSessionsData();
  if (!data.sessions) data.sessions = {};
  if (data.sessions[today] === undefined) data.sessions[today] = 0;
  data.today = today;
  saveSessionsData(data);
}
ensureSessionsStructure();

// ------------------ Load / Add / Reset ------------------
function loadSessionCount() {
  ensureSessionsStructure();
  const data = getSessionsData();
  const today = data.today || new Date().toISOString().slice(0, 10);
  sessionCountEl.dataset.date = today;
  sessionCountEl.textContent = `Sessões hoje: ${data.sessions[today] || 0}`;
}
loadSessionCount();

function addSessionCount() {
  const today = new Date().toISOString().slice(0, 10);
  const data = getSessionsData();
  if (!data.sessions) data.sessions = {};
  data.sessions[today] = (data.sessions[today] || 0) + 1;
  data.today = today;
  saveSessionsData(data);
  loadSessionCount();
  autoBackup();
  renderChart();
}

function resetTodayCount() {
  const today = new Date().toISOString().slice(0, 10);
  const data = getSessionsData();
  data.sessions = data.sessions || {};
  data.sessions[today] = 0;
  data.today = today;
  saveSessionsData(data);
  loadSessionCount();
  autoBackup();
  renderChart();
}

// ------------------ Backup automático ------------------
function autoBackup() {
  const data = localStorage.getItem("sessionsData");
  if (data) localStorage.setItem("sessionsBackup", data);
}

// ------------------ Exportar JSON ------------------
function exportSessions() {
  const data = localStorage.getItem("sessionsData") || "{}";
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "historico_respiracao.json";
  a.click();
  URL.revokeObjectURL(url);
}

// ------------------ Histórico ------------------
function getWeeklyHistory() {
  const data = getSessionsData().sessions || {};
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    days.push({ date: key, count: data[key] || 0 });
  }
  return days;
}

function getMonthlyHistory() {
  const data = getSessionsData().sessions || {};
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const days = [];
  const lastDay = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= lastDay; d++) {
    const date = new Date(year, month, d).toISOString().slice(0, 10);
    days.push({ date, count: data[date] || 0 });
  }
  return days;
}

// ------------------ Gráfico simples em Canvas ------------------
function resizeCanvasForDPR() {
  const DPR = window.devicePixelRatio || 1;
  const styleW = canvas.clientWidth || 320;
  const styleH = canvas.clientHeight || 140;
  canvas.width = styleW * DPR;
  canvas.height = styleH * DPR;
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}
function drawChart(data) {
  // limpa
  resizeCanvasForDPR();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const padding = 10;
  const w = canvas.width / (window.devicePixelRatio || 1) - padding * 2;
  const h = canvas.height / (window.devicePixelRatio || 1) - padding * 2;
  const max = Math.max(...data.map((x) => x.count), 1);
  const barW = w / data.length;

  // fundo (transparente mantém o fundo do site)
  ctx.fillStyle = window.getComputedStyle(document.body).backgroundColor || "#fff";
  ctx.fillRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));

  data.forEach((d, i) => {
    const barH = (d.count / max) * (h - 20);
    const x = padding + i * barW;
    const y = padding + (h - barH);

    ctx.fillStyle = "#4a6cf7";
    ctx.fillRect(x + 4, y, barW - 8, barH);

    // label count
    ctx.fillStyle = "#fff";
    ctx.font = "10px Inter, Arial";
    ctx.fillText(String(d.count), x + 6, y - 4);

    // label date curta (MM-DD)
    const lab = d.date.slice(5);
    ctx.fillStyle = "#666";
    ctx.fillText(lab, x + 6, padding + h + 10);
  });
}
function renderChart() {
  const range = chartRange.value;
  if (range === "weekly") {
    const data = getWeeklyHistory();
    drawChart(data);
  } else {
    const data = getMonthlyHistory().slice(-30);
    drawChart(data);
  }
}

// ------------------ Áudio e animações ------------------
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

// Beep Toggle
beepToggle.addEventListener("click", () => {
  beepEnabled = !beepEnabled;
  beepToggle.textContent = beepEnabled ? "Beep: On" : "Beep: Off";
});

function beepSound() {
  if (!beepEnabled) return;
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

// contador
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

// sessão
let running = false,
  stopRequested = false;
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

// theme
let theme = localStorage.getItem("theme") || "light";
document.body.className = theme;
themeToggle.textContent = theme === "light" ? "Dark Mode" : "Light Mode";
themeToggle.addEventListener("click", () => {
  theme = theme === "light" ? "dark" : "light";
  document.body.className = theme;
  themeToggle.textContent = theme === "light" ? "Dark Mode" : "Light Mode";
  localStorage.setItem("theme", theme);
});

// controles extras
resetBtn.addEventListener("click", () => {
  if (confirm("Zerar contagem de hoje?")) resetTodayCount();
});
exportBtn.addEventListener("click", exportSessions);
chartRange.addEventListener("change", renderChart);

// inicializa gráfico
renderChart();

// restaurar backup automaticamente (se não houver data principal)
(function tryRestoreBackup() {
  const data = localStorage.getItem("sessionsData");
  const backup = localStorage.getItem("sessionsBackup");
  if (!data && backup) localStorage.setItem("sessionsData", backup);
})();
