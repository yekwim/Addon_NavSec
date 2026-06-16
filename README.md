# 🛡️ NavSec - Extensão de Apoio ao Hardening

O **NavSec** é uma extensão de browser (Manifest V3) desenvolvida como ferramenta de apoio ao diagnóstico de segurança e hardening de aplicações web (Trilha 1 - AppHardener). 

A extensão atua inteiramente no lado do cliente (client-side) e funciona como um assistente de segurança: deteta tecnologias JavaScript e frameworks a correr no ecrã atual, extrai as respetivas versões e consulta a base de dados pública **OSV.dev** em tempo real para reportar vulnerabilidades conhecidas (CVEs), o seu nível de severidade (CVSS) e os passos de remediação.

## ✨ Funcionalidades (MVP)

* **Análise Passiva (Fingerprinting):** Lê objetos globais (`window`) para identificar bibliotecas ativas no DOM sem realizar pedidos intrusivos ou testes dinâmicos (DAST).
* **Escopo Focado:** Deteção nativa das bibliotecas mais comuns do mercado: *jQuery, AngularJS, Vue.js, Lodash, Moment.js e Bootstrap*.
* **Integração OSV.dev:** Consulta assíncrona à API do *Open Source Vulnerabilities* (mantida pela Google) para garantir que os dados de CVE estão sempre atualizados.
* **Cálculo de Severidade:** Mapeia a pontuação CVSS e destaca vulnerabilidades Críticas, Altas e Médias.
* **Painel de Remediação:** Apresenta instruções claras e links oficiais para que a equipa de desenvolvimento possa aplicar a correção (Hardening).

## 🛠️ Tecnologias Utilizadas

* **Estrutura:** Chrome Extension Manifest V3 (Compatível com Google Chrome, Brave e Edge).
* **Linguagens:** JavaScript (ES6+), HTML5 e CSS3 (UI e Design System customizado).
* **APIs de Navegador:** `chrome.scripting`, `chrome.runtime`, e injetores de DOM (`content scripts`).
* **Fontes de Dados:** API Pública OSV.dev (`https://api.osv.dev/v1/query`).

## 🚀 Como Instalar e Executar (Modo de Programador)

Como o projeto está em desenvolvimento, a instalação é feita manualmente:

1. Faz o download ou clona este repositório para o teu computador.
2. Abre o teu browser (Brave, Chrome ou Edge).
3. Na barra de endereços, digita:
   * **Brave:** `brave://extensions/`
   * **Chrome:** `chrome://extensions/`
4. No canto superior direito, ativa a opção **"Modo de programador"** (Developer mode).
5. No canto superior esquerdo, clica em **"Carregar sem compactação"** (Load unpacked).
6. Seleciona a pasta raiz do projeto NavSec (onde se encontra o ficheiro `manifest.json`).
7. **Pronto!** O ícone do NavSec aparecerá na tua barra de extensões. Fixa-o (alfinete) para acederes facilmente.

## 📁 Estrutura de Ficheiros

```text
NavSec/
├── manifest.json       # Ficheiro de configuração e permissões (Manifest V3)
├── popup.html          # Estrutura HTML do painel principal (UI)
├── popup.js            # Orquestrador de interface e eventos do utilizador
├── icons/              # Ícones da extensão (16x16, 48x48, 128x128)
├── styles/             # Ficheiros CSS base e específicos de cada ecrã
├── views/              # Fragmentos HTML carregados dinamicamente
└── scripts/
    ├── content.js      # Script injetado na página para extrair versões do DOM
    ├── engine.js       # Motor de segurança: comunica com a API OSV.dev e avalia riscos
    ├── tela1.js        # Lógica do ecrã de Resumo e Tecnologias
    ├── tela2.js        # Lógica do ecrã de Detalhes da Vulnerabilidade
    └── tela3.js        # Lógica do ecrã de Remediação e Passos
