# Implante Guide — Manual do Projeto

## Objetivo
App React para cirurgiões dentistas e protéticos escolherem componentes protéticos de implantes dentários. O usuário navega por marca → linha → objetivo protético → componente específico e encontra referências, torque, chave e especificações técnicas.

## Usuários
- Cirurgiões dentistas
- Protéticos

## Stack Técnica
- **Frontend:** React (JSX) — arquivo principal `src/App.jsx`
- **Build:** Vite
- **Deploy:** Vercel (automático ao fazer push na `main`)
- **Versionamento:** GitHub — `github.com/sartori76/implante-guide`
- **Review de código:** CodeRabbit (revisa PRs automaticamente)
- **Qualidade:** Biome + Prettier

## Fluxo de Desenvolvimento
1. Gerar código no Claude Cowork
2. Colar no VS Code (`Cmd+A` → `Cmd+V` → `Cmd+S`)
3. Rodar `./deploy.sh "descricao da mudanca"`
4. Abrir PR no GitHub
5. CodeRabbit revisa automaticamente
6. Merge → Vercel faz deploy

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
- Carrinho de pedidos

## Funcionalidades Futuras
- [ ] Link direto para página de compra do fabricante por componente
- [ ] Direcionamento para app/site do fabricante ao escolher componente
- [ ] Novas marcas e linhas de implantes

## Regras Importantes do Código
- **Ícones:** usar sempre emoticons ou SVG inline com `stroke` hardcoded — NUNCA `lucide-react` para botões de navegação
- **Botão Voltar:** deve ter `aria-label="Voltar"` e ícone `←` visível
- **Botão Reiniciar:** deve ter `aria-label="Reiniciar consulta"` e ícone `↺` visível
- **Imagem Variobase:** referenciar como `/variobase_blx.jpg` (underline, não hífen)
- **Centralização:** app centralizado na página com max-width de 430px

## Estrutura de Pastas
```
implante-guide/
├── src/
│   └── App.jsx          ← arquivo principal com todo o código
├── public/
│   └── variobase_blx.jpg
├── .coderabbit.yaml     ← configuração do CodeRabbit
├── biome.json           ← configuração do Biome
├── deploy.sh            ← script para criar branch + commit + push
├── CLAUDE.md            ← este arquivo
└── package.json
```

## Comandos Úteis
```bash
# Deploy rápido
./deploy.sh "descricao da mudanca"

# Verificar status
git status

# Ver últimos commits
git log --oneline -5

# Voltar para main
git checkout main
```
