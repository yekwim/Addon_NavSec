// =============================================================
// tela1.js  -  Tela inicial: resumo + tecnologias detectadas.
// Recebe (container, ctx) do popup.js.
// =============================================================

import { pageUrl, summary, technologies, riskLabels } from "./data.js";

const SUMMARY_CARDS = [
  { key: "alto", label: "Alto" },
  { key: "medio", label: "Medio" },
  { key: "ok", label: "OK" },
];

export function init(container, ctx) {
  // URL analisada
  const urlInput = container.querySelector("#page-url");
  if (urlInput) urlInput.value = pageUrl;

  // Cards de resumo
  const grid = container.querySelector("#summary-grid");
  grid.innerHTML = "";
  SUMMARY_CARDS.forEach(({ key, label }) => {
    const card = document.createElement("div");
    card.className = `summary-card summary-card--${key}`;
    card.innerHTML =
      `<span class="summary-card__num">${summary[key]}</span>` +
      `<span class="summary-card__label">${label}</span>`;
    grid.appendChild(card);
  });

  // Lista de tecnologias
  const list = container.querySelector("#tech-list");
  list.innerHTML = "";
  technologies.forEach((tech) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "tech-card";
    card.innerHTML = `
      <span class="tech-card__main">
        <span class="tech-card__name">${tech.name}</span>
        <span class="tech-card__version">versao ${tech.version}</span>
      </span>
      <span class="tech-card__meta">
        <span class="badge badge--${tech.risk}">${riskLabels[tech.risk]}</span>
        <span class="tech-card__cve">${tech.cveCount} CVE</span>
      </span>
      <span class="tech-card__chevron" aria-hidden="true">&rsaquo;</span>`;
    card.addEventListener("click", () =>
      ctx.goTo("tela2", { selectedTechId: tech.id })
    );
    list.appendChild(card);
  });
}
