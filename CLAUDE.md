# Implante Guide — Manual do Projeto

## Objetivo
App React para cirurgiões dentistas e protéticos escolherem componentes protéticos de implantes dentários. O usuário navega por marca → família → linha → objetivo protético → componente específico e encontra referências, torque, chave e especificações técnicas.

## Usuários
- Cirurgiões dentistas
- Protéticos

## Stack Técnica
- **Frontend:** React (JSX) — arquivo principal `src/App.jsx`
- **Banco de dados:** `src/db.js` — exporta `DB`, `gh()` e `generateDBSummary()`
- **Build:** Vite
- **Deploy:** Vercel (automático ao fazer merge na `main`)
- **Versionamento:** GitHub — `github.com/sartori76/implante-guide`
- **Review de código:** CodeRabbit (revisa PRs automaticamente)
- **Qualidade:** Biome + Prettier
- **API de IA:** Anthropic Claude (`api/chat.js` — Edge Function)
- **Email:** Resend (`api/feedback.js` — Edge Function)

## Design Visual
- **Cor de fundo:** Azul escuro (`#020617`)
- **Cor primária botões:** Azul (`#3b82f6`)
- **Cor secundária:** Cinza escuro (`rgba(30,41,59,0.9)`)
- **Cor de destaque:** Verde (`#10b981`)
- **Cor de alerta:** Vermelho (`#ef4444`)
- **Fonte:** Padrão do sistema
- **Largura máxima:** 430px — compatível com celular
- **Centralização:** App centralizado horizontalmente na página
- **Border radius padrão:** 9–16px nos cards e botões
- **Padding-bottom da página:** 160px (reserva para barra de feedback fixa)

## Padrão de Botões — REGRA CRÍTICA
**NUNCA usar lucide-react para ícones de botões de navegação.**
**SEMPRE usar emoticons ou SVG inline com `stroke` hardcoded.**

| Botão | Estilo | Ícone |
|-------|--------|-------|
| Voltar | Quadrado cinza escuro, borda `#475569`, 34×34px, borderRadius 9 | ← |
| Reiniciar | Mesmo estilo do Voltar | ↺ |
| Home (fluxo) | Mesmo estilo do Voltar, `marginLeft: auto` | ↩ |
| Copiar resultado | `borderRadius 11`, borda `#475569`, bg `rgba(30,41,59,0.9)` | SVG inline |
| Copiar análise RX | Mesmo estilo do Copiar resultado | SVG inline |
| Carrinho | Fundo escuro | 🛒 |
| Remover item | Vermelho `#ef4444` | ✕ |
| Imprimir | Azul primário | 🖨️ |
| Limpar pedido | Cinza | 🗑️ |
| Ir para loja | Cinza | 🔗 |

**Estado copiado:** `background: linear-gradient(135deg,#059669,#10b981)`, cor branca, texto `✓ Copiado!`, duração 2,5s.

## Fluxo de Desenvolvimento
1. Pedir alteração ao Claude Code no VS Code
2. Claude Code edita os arquivos diretamente
3. Claude Code faz commit e push
4. Abrir PR no GitHub
5. CodeRabbit revisa automaticamente 🐰
6. Merge → Vercel faz deploy automático

## Marcas no Banco de Dados (`src/db.js`)

| Chave | Label | Status | Famílias / Linhas |
|-------|-------|--------|-------------------|
| `straumann` | Straumann | ✅ Completo | Bone Level (BL/BLT, BLX/BLC, SC) · Tissue Level (TL, TLX/TLC) |
| `neodent` | Neodent | ✅ Completo | Grand Morse · Acqua |
| `sin` | SIN | ✅ Completo | SIN (hexágono interno) |
| `intraoss` | Intraoss | ✅ Parcial | CM · HE |
| `titaniumfix` | Titanium Fix | ✅ Parcial | Hexágono Externo · Hexágono Interno · Cônico |
| `conexao` | Conexão Sistemas de Prótese | ✅ Parcial | CM · HE · SC |
| `implacil` | Implacil De Bortoli | ✅ Parcial | HI · HE |
| `nobel` | Nobel Biocare | ✅ Parcial | Nobel Active · Nobel Replace |
| `osstem` | Osstem | ✅ Parcial | US · SS |
| `dentsply` | Dentsply Sirona | ✅ Parcial | Astra EV · Ankylos |
| ~~`xxx`~~ | ~~Marca Teste~~ | ❌ Removido | Removido em abr/2026 |

> Marcas "Parciais" têm estrutura funcional mas podem ter menos componentes por linha do que o catálogo completo do fabricante.

## Regras Críticas de Conexão (para a IA e para editar o DB)
- **BLX e BLC** usam **TorcFit®** — NUNCA CrossFit
- **TLX e TLC** usam **TorcFit®** — NUNCA CrossFit
- **BL e BLT** usam **CrossFit® RC** — NUNCA TorcFit
- **SC** usa **Small CrossFit® SC** — exclusivo
- Nunca misturar sistemas de conexão entre linhas diferentes

## Funcionalidades Implementadas

### Fluxo Principal — "Conheço o Implante"
- Seleção por marca → família → linha → objetivo protético → componente → altura gengival
- Botão ↩ Home em todas as 7 telas intermediárias do fluxo
- Exibição de especificações: REF/SKU, torque, chave, material, altura gengival
- Foto de referência do componente (quando disponível)
- Tela de resultado com todos os dados do componente

### Carrinho e Pedidos
- Carrinho de pedidos com revisão e remoção de itens
- Botão "Copiar resultado" — copia especificações formatadas para área de transferência
- Impressão do pedido
- Link direto para loja do fabricante
- Limpar pedido

### Histórico de Consultas
- Seção "Consultas Recentes" na tela Home
- Persistência via `localStorage`
- Até 5 consultas armazenadas

### DetectiveRX — Identificação de Implante por RX
- Tela acessível via botão na Home ("Identificar Implante")
- Upload de imagem (arrastar ou clicar) — JPG, PNG, WEBP
- Checklist clínico opcional (conexão, plataforma, corpo, colar, ângulo)
- Botão "Analisar com IA" → envia imagem + checklist para Claude Vision via `api/chat.js`
- Card de resultado com análise textual da IA
- **Botão "Copiar análise"** — copia análise formatada com header, disclaimer e timestamp
- InfoBox de disclaimer (⚠️) abaixo do botão de cópia
- Banco de cards de referência visual por conexão (educativo, sem clique)
- **Fase 2 pendente:** banco de imagens radiográficas reais por marca (aguardando PDF)

### Chat de Dúvidas Clínicas (IA)
- Integrado via `api/chat.js` (Vercel Edge Function)
- Modelo: `claude-sonnet-4-6`
- System prompt gerado dinamicamente de `generateDBSummary()` em `src/db.js`
- Suporta envio de imagens (base64) para análise multimodal

### Feedback
- Barra fixa no rodapé (56px) com botão ⚠️ "Relatar problema / sugestão"
- Modal com seleção de tipo (Bug / Sugestão / Dado incorreto), campo de texto (até 2000 chars)
- Timestamp registrado ao abrir o modal
- Payload: tipo, mensagem, tela atual, marca selecionada, versão, URL, user-agent, timestamp
- Envio via `api/feedback.js` → Resend API → email para `sartori76@gmail.com`
- Rate limiting: 5 requisições/IP/hora
- Remetente: `Implante Guide <onboarding@resend.dev>` (domínio sandbox Resend)
- Float buttons (IA, carrinho) ficam 72px acima da barra de feedback

## Estrutura de Pastas
```
implante-guide/
├── src/
│   ├── App.jsx          ← componentes React (telas, UI, lógica)
│   └── db.js            ← DB completo, gh(), generateDBSummary()
├── api/
│   ├── chat.js          ← Edge Function — chat IA (Anthropic)
│   └── feedback.js      ← Edge Function — feedback por email (Resend)
├── public/
│   ├── variobase_blx.jpg
│   └── variobase_as.jpg
├── .coderabbit.yaml     ← configuração do CodeRabbit
├── biome.json           ← configuração do Biome
├── CLAUDE.md            ← este arquivo
└── package.json
```

## Regras Críticas do Código
- **Ícones de navegação:** SEMPRE emoticons ou SVG inline — NUNCA `lucide-react`
- **Botão Voltar:** `aria-label="Voltar"` + emoticon ← visível
- **Botão Reiniciar:** `aria-label="Reiniciar consulta"` + emoticon ↺ visível
- **Botão Home:** `aria-label="Voltar ao início"` + emoticon ↩, via prop `onHome` no componente `Hdr`
- **SVGs decorativos:** sempre `aria-hidden="true" focusable="false"`
- **Botões de ação:** sempre `type="button"` explícito
- **Clipboard:** sempre `async/await` com `try/catch` — nunca `.then()` sem catch
- **Imagem Variobase BLX:** `/variobase_blx.jpg` (underline, não hífen)
- **Imagem Variobase AS:** `/variobase_as.jpg`
- **Layout:** max-width 430px, centralizado, responsivo para celular
- **DB:** nunca editar o DB diretamente no `App.jsx` — toda lógica de dados fica em `src/db.js`

## Backlog Pendente

### Alta prioridade
- [ ] Fase 2 do DetectiveRX: banco de imagens radiográficas reais por marca (aguardando PDF do Rafael)
- [ ] Expandir links para lojas de todos os fabricantes
- [ ] Completar catálogos das marcas parciais (Intraoss, Titanium Fix, Osstem, etc.)

### Média prioridade
- [ ] Novas marcas: Arkys FGM, SIN (pendentes de dados)
- [ ] Filtro por especificação técnica (diâmetro, conexão, torque)
- [ ] Identificação de implante por foto (câmera, não só RX)

### Baixa prioridade
- [ ] Modo offline / PWA
- [ ] Histórico com mais de 5 entradas e busca

## Variáveis de Ambiente (Vercel)
| Variável | Uso |
|----------|-----|
| `ANTHROPIC_API_KEY` | Chat IA e DetectiveRX |
| `RESEND_API_KEY` | Envio de emails de feedback |
| `FEEDBACK_EMAIL` | Destinatário dos feedbacks (`sartori76@gmail.com`) |

## Comandos Úteis
```bash
# Build local
npm run build

# Ver status do git
git status

# Ver últimos commits
git log --oneline -10

# Voltar para main e atualizar
git checkout main && git pull origin main
```

## gstack
Use /browse from gstack for all web browsing. Never use mcp__claude-in-chrome__* tools.
Available skills: /office-hours, /plan-ceo-review, /plan-eng-review, /plan-design-review, /design-consultation, /design-shotgun, /design-html, /review, /ship, /land-and-deploy, /canary, /benchmark, /browse, /connect-chrome, /qa, /qa-only, /design-review, /setup-browser-cookies, /setup-deploy, /retro, /investigate, /document-release, /codex, /cso, /autoplan, /plan-devex-review, /devex-review, /careful, /freeze, /guard, /unfreeze, /gstack-upgrade, /learn
