// =============================================================
// popup.js  -  Orquestrador da aplicacao (shell).
// Responsabilidades:
//   - registrar as views;
//   - carregar dinamicamente o HTML (views/*.html) e o CSS (styles/*.css);
//   - importar o modulo de script de cada view e injetar dependencias (ctx);
//   - controlar a navegacao circular (chevrons, teclado, indicadores).
// Carregado como modulo ES (type="module") -> import() dinamico permitido em MV3.
// =============================================================

import { downloadReport } from "./scripts/report.js";

// ---- Registro de views (ordem define a navegacao por chevron) ----
const VIEWS = [
  { id: "tela1", title: "Analise da pagina atual",   html: "views/tela1.html", script: "scripts/tela1.js", css: "styles/tela1.css" },
  { id: "tela2", title: "Detalhe da vulnerabilidade", html: "views/tela2.html", script: "scripts/tela2.js", css: "styles/tela2.css" },
  { id: "tela3", title: "Como corrigir",              html: "views/tela3.html", script: "scripts/tela3.js", css: "styles/tela3.css" },
];

// ---- Estado compartilhado entre as views (injetado via ctx) ----
const state = { index: 0, selectedTechId: "jquery" };

// ---- Referencias do shell ----
const contentArea = document.getElementById("content-area");
const subtitleEl = document.getElementById("header-subtitle");
const dotsEl = document.getElementById("nav-dots");

// ---- Caches para nao recarregar CSS/JS ja importados ----
const loadedCss = new Set();
const loadedModules = new Map();

// Resolve caminhos para a URL interna da extensao (ou relativa, em testes fora do Chrome).
function resolve(path) {
  if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.getURL) {
    return chrome.runtime.getURL(path);
  }
  return path;
}

function ensureCss(view) {
  if (loadedCss.has(view.id)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = resolve(view.css);
  link.dataset.view = view.id;
  document.head.appendChild(link);
  loadedCss.add(view.id);
}

async function loadModule(view) {
  if (loadedModules.has(view.id)) return loadedModules.get(view.id);
  const mod = await import(resolve(view.script));
  loadedModules.set(view.id, mod);
  return mod;
}

// ---- Contexto injetado em cada view (injecao de dependencias) ----
const ctx = {
  state,
  goTo: goToById,
  next: () => navigate(1),
  prev: () => navigate(-1),
};

function indexOf(id) {
  return VIEWS.findIndex((v) => v.id === id);
}

// Navegacao circular: passa do fim para o inicio e vice-versa.
function navigate(direction) {
  const total = VIEWS.length;
  const nextIndex = (state.index + direction + total) % total;
  render(nextIndex);
}

function goToById(id, options = {}) {
  if (options.selectedTechId) state.selectedTechId = options.selectedTechId;
  const i = indexOf(id);
  if (i >= 0) render(i);
}

function renderDots() {
  dotsEl.innerHTML = "";
  VIEWS.forEach((view, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "dot" + (i === state.index ? " dot--active" : "");
    dot.setAttribute("aria-label", `Ir para ${view.title}`);
    dot.addEventListener("click", () => render(i));
    dotsEl.appendChild(dot);
  });
}

async function render(index) {
  const view = VIEWS[index];
  state.index = index;
  subtitleEl.textContent = view.title;
  ensureCss(view);

  // 1) Carrega o HTML da view.
  let markup;
  try {
    const res = await fetch(resolve(view.html));
    if (!res.ok) throw new Error(res.status);
    markup = await res.text();
  } catch (err) {
    contentArea.innerHTML =
      '<div class="state-error">Nao foi possivel carregar esta tela.</div>';
    console.error("[NavSec] Falha ao carregar", view.html, err);
    return;
  }

  // 2) Injeta o conteudo e dispara a transicao.
  contentArea.classList.remove("is-visible");
  contentArea.innerHTML = markup;
  contentArea.scrollTop = 0;

  // 3) Executa o modulo da view, injetando o contexto.
  try {
    const mod = await loadModule(view);
    if (mod && typeof mod.init === "function") {
      mod.init(contentArea, ctx);
    }
  } catch (err) {
    console.error("[NavSec] Falha ao iniciar a view", view.id, err);
  }

  renderDots();
  requestAnimationFrame(() => contentArea.classList.add("is-visible"));
}

// ---- Ligacoes do shell ----
document.getElementById("nav-prev").addEventListener("click", () => navigate(-1));
document.getElementById("nav-next").addEventListener("click", () => navigate(1));
document.getElementById("btn-pdf").addEventListener("click", () => {
  try {
    downloadReport();
  } catch (err) {
    console.error("[NavSec] Falha ao gerar o relatorio", err);
  }
});

// Navegacao por teclado (setas esquerda/direita).
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") navigate(-1);
  else if (e.key === "ArrowRight") navigate(1);
});

// ---- Inicio ----
render(0);
