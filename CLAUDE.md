# Implante Guide — Manual do Projeto

## Objetivo
App React para cirurgiões dentistas e protéticos escolherem componentes protéticos de implantes dentários. O usuário navega por marca → linha → objetivo protético → componente específico e encontra referências, torque, chave e especificações técnicas.

## Usuários
- Cirurgiões dentistas
- Protéticos

## Stack Técnica
- **Frontend:** React (JSX) — arquivo principal `src/App.jsx`
- **Build:** Vite
- **Deploy:** Vercel (automático ao fazer merge na `main`)
- **Versionamento:** GitHub — `github.com/sartori76/implante-guide`
- **Review de código:** CodeRabbit (revisa PRs automaticamente)
- **Qualidade:** Biome + Prettier

## Design Visual
- **Cor de fundo:** Azul escuro (`#020617`)
- **Cor primária botões:** Azul (`#3b82f6`)
- **Cor secundária:** Cinza escuro (`rgba(30,41,59,0.9)`)
- **Cor de destaque:** Verde (`#10b981`)
- **Cor de alerta:** Vermelho (`#ef4444`)
- **Fonte:** Padrão do sistema (definida pelo Claude)
- **Largura máxima:** 430px — compatível com celular
- **Centralização:** App centralizado horizontalmente na página
- **Border radius padrão:** 9-16px nos cards e botões

## Padrão de Botões — REGRA CRÍTICA
**NUNCA usar lucide-react para ícones de botões de navegação.**
**SEMPRE usar emoticons visíveis dentro dos botões.**

| Botão | Estilo | Emoticon |
|-------|--------|----------|
| Voltar | Quadrado cinza escuro, borda `#475569` | ← |
| Reiniciar | Quadrado cinza escuro, borda `#475569` | ↺ |
| Carrinho | Fundo escuro | 🛒 |
| Remover item | Vermelho `#ef4444` | ✕ |
| Imprimir | Azul primário | 🖨️ |
| Limpar pedido | Cinza | 🗑️ |
| Ir para loja | Cinza | 🔗 |

## Fluxo de Desenvolvimento
1. Pedir alteração ao Claude Code no VS Code
2. Claude Code edita o `App.jsx` diretamente
3. Claude Code faz commit e push
4. Abrir PR no GitHub
5. CodeRabbit revisa automaticamente 🐰
6. Merge → Vercel faz deploy automático

## Marcas Disponíveis
- Straumann
- Neodent
- SIN
- Conexão
- Intraoss
- Implacil de Bortoli
- Osstem
- Arkys FGM
- Nobel Biocare
- Dentsply Sirona
- Titanium Fix
- XXX (Marca TESTE — para desenvolvimento)

> Novas marcas podem ser adicionadas futuramente seguindo o mesmo padrão do DB no `App.jsx`.

## Funcionalidades Existentes
- Seleção por marca
- Seleção por linha do implante
- Seleção por objetivo protético (unitária, múltipla)
- Seleção de Scan Body / Transfer
- Exibição de especificações: REF, torque, chave, material, altura gengival
- Foto de referência do componente
- Carrinho de pedidos com revisão
- Impressão do pedido
- Link direto para loja do fabricante
- Limpar pedido

## Funcionalidades Futuras
- [ ] Expandir links para lojas de todos os fabricantes
- [ ] Novas marcas e linhas de implantes
- [ ] Filtro por especificação técnica

## Regras Críticas do Código
- **Ícones:** SEMPRE emoticons ou SVG inline com `stroke` hardcoded — NUNCA `lucide-react` para navegação
- **Botão Voltar:** `aria-label="Voltar"` + emoticon ← visível
- **Botão Reiniciar:** `aria-label="Reiniciar consulta"` + emoticon ↺ visível
- **Botão Remover:** `aria-label` com nome do item + emoticon ✕ visível
- **Imagem Variobase:** `/variobase_blx.jpg` (underline, não hífen)
- **Layout:** max-width 430px, centralizado, responsivo para celular

## Estrutura de Pastas
```
implante-guide/
├── src/
│   └── App.jsx          ← arquivo principal
├── public/
│   └── variobase_blx.jpg
├── .coderabbit.yaml     ← configuração do CodeRabbit
├── biome.json           ← configuração do Biome
├── deploy.sh            ← script de deploy
├── CLAUDE.md            ← este arquivo
└── package.json
```

## Comandos Úteis
```bash
# Ver status do git
git status

# Ver últimos commits
git log --oneline -5

# Voltar para main e atualizar
git checkout main
git pull origin main
```

## Funcionalidades de IA — Planejadas para o Lançamento

### Chat de Dúvidas Clínicas
Integração com API da Anthropic para responder dúvidas dos usuários diretamente no app.

**Exemplos de uso:**
- "Quais pilares são compatíveis com implante Straumann BLX?"
- "Qual torque usar para este componente?"
- "Qual a diferença entre Variobase RC e BLX?"

**Como implementar:**
1. Criar conta em `console.anthropic.com`
2. Adicionar créditos (mínimo $5)
3. Gerar API Key
4. Adicionar chat no `App.jsx` via Claude Code
5. Configurar API Key de forma segura no Vercel (nunca expor no GitHub)

**Custo estimado:** menos de $5/mês na fase inicial

---

### Análise de Radiografia
Upload de rx pelo usuário → IA analisa formato do implante, conexão e plataforma → compara com banco de dados → sugere marca e linha.

---

### Identificação de Implante por Foto
Foto do implante ou componente → IA identifica marca e linha.

---

> ⚠️ Implementar apenas após finalizar todas as marcas e funcionalidades principais do app.
