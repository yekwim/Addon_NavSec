// =============================================================
// data.js  -  Fonte unica de dados (mock) da extensao.
// Em producao, estes dados viriam da analise da pagina + base de CVE.
// Importado tanto pelo popup quanto pelas views (mesma instancia).
// =============================================================

export const pageUrl = "https://exemplo.com.br";

export const technologies = [
  {
    id: "jquery",
    name: "jQuery",
    version: "1.11.0",
    risk: "alto",            // alto | medio | ok
    cveCount: 1,
    cve: "CVE-2020-11023",
    cwe: "CWE-79 - Cross-Site Scripting (XSS)",
    cvss: "6.1 - Media/Alta",
    description:
      "Versoes anteriores a 3.5.0 permitem a execucao de scripts ao manipular HTML proveniente de fontes nao confiaveis, possibilitando ataques de XSS.",
    currentVersion: "1.11.0",
    recommendedVersion: "3.5.0 ou superior",
    steps: [
      "Atualizar a biblioteca jQuery do projeto.",
      "Revisar usos de .html() com dados externos.",
      "Testar a aplicacao apos a atualizacao.",
    ],
    reference: "https://nvd.nist.gov/vuln/detail/CVE-2020-11023",
  },
  {
    id: "angularjs",
    name: "AngularJS",
    version: "1.6.2",
    risk: "alto",
    cveCount: 1,
    cve: "CVE-2020-7676",
    cwe: "CWE-79 - Cross-Site Scripting (XSS)",
    cvss: "6.1 - Media/Alta",
    description:
      "Versoes anteriores a 1.8.0 do AngularJS sao suscetiveis a XSS por meio de atributos manipulados, permitindo a injecao de scripts.",
    currentVersion: "1.6.2",
    recommendedVersion: "1.8.0 ou superior",
    steps: [
      "Atualizar o AngularJS para a versao 1.8.0 ou superior.",
      "Avaliar a migracao para um framework com suporte ativo.",
      "Revisar bindings que recebem conteudo de terceiros.",
    ],
    reference: "https://nvd.nist.gov/vuln/detail/CVE-2020-7676",
  },
  {
    id: "lodash",
    name: "Lodash",
    version: "4.17.4",
    risk: "medio",
    cveCount: 1,
    cve: "CVE-2019-10744",
    cwe: "CWE-1321 - Prototype Pollution",
    cvss: "5.6 - Media",
    description:
      "Versoes anteriores a 4.17.12 estao sujeitas a poluicao de prototipo via defaultsDeep, podendo alterar propriedades de Object.prototype.",
    currentVersion: "4.17.4",
    recommendedVersion: "4.17.12 ou superior",
    steps: [
      "Atualizar o Lodash para 4.17.12 ou superior.",
      "Evitar mesclar objetos vindos de entrada nao confiavel.",
      "Rodar a auditoria de dependencias do projeto.",
    ],
    reference: "https://nvd.nist.gov/vuln/detail/CVE-2019-10744",
  },
  {
    id: "vue",
    name: "Vue.js",
    version: "3.4.0",
    risk: "ok",
    cveCount: 0,
    cve: "-",
    cwe: "-",
    cvss: "-",
    description: "Nenhuma vulnerabilidade conhecida para a versao detectada.",
    currentVersion: "3.4.0",
    recommendedVersion: "Ja esta em uma versao segura.",
    steps: ["Manter a biblioteca atualizada conforme novos lancamentos."],
    reference: "https://github.com/vuejs/core/releases",
  },
  {
    id: "bootstrap",
    name: "Bootstrap",
    version: "5.3.2",
    risk: "ok",
    cveCount: 0,
    cve: "-",
    cwe: "-",
    cvss: "-",
    description: "Nenhuma vulnerabilidade conhecida para a versao detectada.",
    currentVersion: "5.3.2",
    recommendedVersion: "Ja esta em uma versao segura.",
    steps: ["Manter a biblioteca atualizada conforme novos lancamentos."],
    reference: "https://github.com/twbs/bootstrap/releases",
  },
  {
    id: "moment",
    name: "Moment.js",
    version: "2.29.4",
    risk: "ok",
    cveCount: 0,
    cve: "-",
    cwe: "-",
    cvss: "-",
    description: "Nenhuma vulnerabilidade conhecida para a versao detectada.",
    currentVersion: "2.29.4",
    recommendedVersion: "Ja esta em uma versao segura.",
    steps: ["Considerar bibliotecas mais leves em projetos novos."],
    reference: "https://github.com/moment/moment/releases",
  },
];

// Resumo calculado a partir das tecnologias.
export const summary = technologies.reduce(
  (acc, t) => {
    acc[t.risk] += 1;
    return acc;
  },
  { alto: 0, medio: 0, ok: 0 }
);

// Rotulos legiveis para cada nivel de risco.
export const riskLabels = { alto: "ALTO", medio: "MEDIO", ok: "OK" };

export function getTech(id) {
  return technologies.find((t) => t.id === id) || technologies[0];
}
