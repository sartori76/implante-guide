# Implante Guide — Pacote DetectiveRX (Fase 2)

Este pacote contém tudo que o Implante Guide precisa para ativar a **Fase 2 do
DetectiveRX**: um banco de identificação radiográfica por marca + imagens de
referência + prompt otimizado para a IA.

---

## Estrutura

```
implante-guide-rx/
├── src/
│   ├── rxdb.js                      ← banco de identificação (25 linhas, 16 marcas)
│   └── prompts/
│       └── detectiveRxPrompt.js     ← system prompt do DetectiveRX
├── public/
│   └── rx/
│       ├── pages/                   ← 33 páginas do guia como imagens (panorâmica por marca + teoria)
│       ├── embedded/                ← 44 RX individuais extraídos do PDF
│       └── manifest.json            ← listagem de todos os arquivos
└── scripts/
    └── extract_rx_images.py         ← script de extração (reutilizável se o PDF for atualizado)
```

---

## Como integrar ao app

### 1. Copiar arquivos para o projeto

```bash
# na raiz do implante-guide/
cp -r implante-guide-rx/src/rxdb.js              src/
cp -r implante-guide-rx/src/prompts              src/
cp -r implante-guide-rx/public/rx                public/
cp -r implante-guide-rx/scripts/extract_rx_images.py scripts/
```

### 2. Atualizar `api/chat.js` (DetectiveRX)

Quando o endpoint detectar que é uma chamada do DetectiveRX (parâmetro ou
tipo de entrada diferenciada), monte o system prompt assim:

```javascript
import { generateRXDBSummary } from '../src/rxdb.js';
import { DETECTIVE_RX_PROMPT } from '../src/prompts/detectiveRxPrompt.js';

// ... dentro do handler:
const systemPrompt = DETECTIVE_RX_PROMPT + '\n\n' + generateRXDBSummary();
```

### 3. Usar o banco no frontend (opcional — tela educativa)

```javascript
import { RX_DB, byConnType, byAngleRange, listBrands } from './rxdb.js';

// Exemplo: listar todos os implantes cone morse 11,5°
const cm11 = byAngleRange(11, 12);

// Exemplo: carregar imagem de referência de uma marca
const entry = RX_DB.find(e => e.brandKey === 'neodent' && e.lineKey === 'gran_morse');
const imgUrl = `/${entry.images.page}`;  // => /rx/pages/neodent_gran_morse.jpg
```

---

## Conteúdo do banco (`rxdb.js`)

**16 marcas, 25 linhas distintas:**

| Marca | Linhas mapeadas |
|-------|------------------|
| Neodent | CM Convencional, Gran Morse |
| S.I.N. | CM 11,5°, CM 16°, Unitite Prime/Compact/Slim |
| Conexão | CM NP, CM FIT |
| Straumann | Bone Level / Tissue Level (BL, BLT, BLX, BLC, TL, TLX, TLC, SC) |
| Nobel Biocare | CM triangular (Active, Replace, Parallel CC) |
| FGM | Arcsys (sem rosca interna) |
| Implacil | Maestro CM AR, Veloce AR, Due Cone |
| Intraoss | Advanced, Cônico, Extract, Cortical |
| Singular | CM 11,5°, GMC 16° |
| Titaniumfix | B-Fix (Profile, Blackfix) |
| Medens | CM |
| Bicon | Bicon (paredes paralelas) |
| Signo Vinces | Duocon 3,8 / 4,6 / 5,5 |
| Entoflex.inp | Supreme |
| Plenum | Unifit, Morsefit |

Cada entrada tem:

- `brand` + `line` + `models[]` (identificação)
- `connection` — tipo, rosca interna, ângulo, diâmetro de plataforma, rosca interna sim/não
- `rxSigns[]` — sinais radiográficos específicos da marca (ex: "ápices arredondados")
- `images` — caminhos das páginas e RX embutidos
- `source` — referência ao PDF fonte e página impressa

---

## Regra clínica absoluta implementada no prompt

O `detectiveRxPrompt.js` contém a seguinte regra inviolável:

> **NUNCA sugerir compatibilidades cruzadas entre marcas ou linhas.** Mesmo que
> o guia original mencione grupos de compatibilidade (ex: 11,5° com várias
> marcas), o app NÃO recomenda uso off-label. Cada implante recebe APENAS seu
> componente protético oficial do próprio fabricante.

Se o usuário perguntar "posso usar componente da marca X no implante Y?", a IA
recusará e orientará a contatar o fabricante identificado.

---

## Como re-gerar as imagens (se o PDF mudar)

```bash
pip install pymupdf --break-system-packages
python scripts/extract_rx_images.py <caminho_do_pdf.pdf> ./public/rx
```

O script valida cada página mapeada, extrai imagens embutidas filtrando logos e
backgrounds por tamanho mínimo, e escreve um `manifest.json` com tudo que foi
gerado. Se o PDF ganhar páginas novas, basta editar os dicts `PAGE_MAP` e
`CONCEPT_PAGES` no topo do script.

---

## Observações importantes sobre o PDF fonte

1. O PDF tem **numeração impressa diferente** da numeração física: página
   física 10 = página impressa 21. O script já lida com isso.

2. As páginas de **compatibilidade entre marcas** (impressas 47-48) foram
   deliberadamente **ignoradas** — o app não sugere off-label, então essa
   informação não entra no banco.

3. A página do Straumann tem anotação do próprio PDF (`whatimplantisthat.com`)
   nas imagens individuais — os RX embutidos mantêm esse watermark. Se quiser
   limpar, use um script adicional de crop/watermark removal.

---

Gerado em abril/2026 a partir de _Guia Prático para Identificação de Implantes_
(Pedro Nery).
