# Detective RX — Fase 2: Banco de Imagens de Referência

## Objetivo
Aumentar a precisão da identificação de implantes pela IA, fornecendo imagens de RX
de referência junto com a RX do paciente em cada análise. O Claude compara
visualmente a morfologia do implante desconhecido com os sistemas do banco,
retornando não só a conexão protética, mas o **sistema específico mais provável**
(ex: Neodent GM Helix CM, Straumann BLX ∅3,8mm).

---

## Estrutura do Banco de Imagens

### Localização no projeto
```
/public/rx-references/
  straumann_bl_blt.jpg
  straumann_blx_blc.jpg
  straumann_tlx.jpg
  straumann_tl.jpg
  neodent_gm.jpg
  neodent_cm.jpg
  sin_cm.jpg
  sin_hi.jpg
  sin_he.jpg
  nobel_active.jpg
  nobel_replace.jpg
  osstem_ts.jpg
  osstem_ss.jpg
  implacil_cm.jpg
  implacil_hi.jpg
  implacil_he.jpg
  dentsply_xive.jpg
  dentsply_ankylos.jpg
```

---

## Especificação por Imagem

Cada imagem de referência deve ser uma **RX periapical** com as seguintes
características técnicas:

- **Tipo:** Periapical ortorradial (implante paralelo ao sensor)
- **Definição:** Alta resolução, implante visível do ápice à plataforma
- **Sem componente protético:** Implante exposto ou com cicatrizador simples
- **Formato:** JPG ou PNG, mínimo 400x600px
- **Orientação:** Vertical, implante centralizado

---

## Tabela de Referências a Coletar

| Arquivo | Sistema | Conexão | Características Morfológicas Chave |
|---|---|---|---|
| `straumann_bl_blt.jpg` | Straumann BL/BLT | CrossFit RC | Corpo cônico, roscas duplas finas, ápice com fenda, bone level, colo liso |
| `straumann_blx_blc.jpg` | Straumann BLX/BLC | TorcFit BLX | Corpo cônico agressivo, macroroscas com microroscas, ápice cortante, colo liso |
| `straumann_tlx.jpg` | Straumann TLX | TorcFit TLX | Colar transmucoso visível, corpo cônico, roscas finas, tissue level |
| `straumann_tl.jpg` | Straumann TL clássico | SynOcta RN | Colar transmucoso largo, corpo cilíndrico, roscas finas, tissue level clássico |
| `neodent_gm.jpg` | Neodent Grand Morse | Grand Morse | Corpo cônico, macroroscas espaçadas, ápice com fenda, conexão cônica sem hex visível |
| `neodent_cm.jpg` | Neodent Cone Morse | Cone Morse | Similar ao GM mas conexão ligeiramente diferente, corpo cônico, roscas agressivas |
| `sin_cm.jpg` | S.I.N. Cone Morse | Cone Morse | Corpo cilíndrico-cônico, roscas duplas, ápice arredondado |
| `sin_hi.jpg` | S.I.N. HI | Hexágono Interno | Plataforma com hex interno visível, corpo cilíndrico, roscas regulares |
| `sin_he.jpg` | S.I.N. HE | Hexágono Externo | Hex externo projetado acima da plataforma, corpo cilíndrico, roscas regulares |
| `nobel_active.jpg` | Nobel NobelActive | Cone Interno | Corpo cônico agressivo, roscas autotarrachantes, ápice cortante, conexão cônica interna |
| `nobel_replace.jpg` | Nobel Replace | Tri-channel | Corpo cilíndrico-cônico, roscas regulares, conexão tri-lobo característica |
| `osstem_ts.jpg` | Osstem TS III | Hexágono Interno | Corpo cilíndrico, roscas duplas, ápice arredondado, hex interno |
| `osstem_ss.jpg` | Osstem SS | Hexágono Externo | Hex externo visível, corpo cilíndrico, roscas simples regulares |
| `implacil_cm.jpg` | Implacil Maestro CM | Cone Morse | Corpo cônico, macroroscas, ápice com fenda, conexão cônica |
| `implacil_hi.jpg` | Implacil HI | Hexágono Interno | Hex interno, corpo cilíndrico, roscas compressivas |
| `implacil_he.jpg` | Implacil HE | Hexágono Externo | Hex externo, corpo cilíndrico, roscas simples |
| `dentsply_xive.jpg` | Dentsply Xive | Cone Interno | Corpo cilíndrico com afunilamento apical, roscas finas, conexão cônica interna |
| `dentsply_ankylos.jpg` | Dentsply Ankylos | Cone Morse Puro | Corpo cilíndrico, roscas muito finas, cone morse puro sem hex, colo liso |

---

## Como Integrar na Análise (Implementação Fase 2)

### Lógica de seleção de referências
Quando o usuário preenche o checklist, o sistema seleciona automaticamente as
imagens de referência mais relevantes antes de chamar a API:

```javascript
function selectReferences(checklist) {
  const refs = [];

  // Filtrar por conexão (se informada)
  if (checklist.conexao === "CM") {
    refs.push("neodent_gm", "neodent_cm", "straumann_blx_blc",
              "straumann_tlx", "nobel_active", "implacil_cm", "dentsply_ankylos");
  } else if (checklist.conexao === "HI") {
    refs.push("sin_hi", "osstem_ts", "implacil_hi", "dentsply_xive");
  } else if (checklist.conexao === "HE") {
    refs.push("sin_he", "osstem_ss", "implacil_he");
  } else {
    // "Não sei" — envia todas (máximo 4 por chamada para não exceder tokens)
    refs.push("neodent_gm", "straumann_blx_blc", "sin_he", "osstem_ts");
  }

  // Filtrar por nível (refinamento adicional)
  if (checklist.nivel === "Tecidual") {
    refs.push("straumann_tl", "straumann_tlx");
  }

  // Retornar máximo 4 referências para controle de tokens
  return [...new Set(refs)].slice(0, 4);
}
```

### Prompt atualizado com referências
```javascript
const prompt = `
Você é um especialista em implantodontia.

A PRIMEIRA IMAGEM é a radiografia do implante desconhecido do paciente.
As imagens seguintes são referências de sistemas conhecidos:
${selectedRefs.map((r, i) => `- Imagem ${i + 2}: ${REF_LABELS[r]}`).join('\n')}

Informações fornecidas pelo clínico:
${checklistToText(checklist)}

Compare visualmente a morfologia do implante desconhecido com as referências.
Identifique:
1) Sistema mais provável (marca e linha específica)
2) Segundo sistema mais provável
3) Características que levaram a essa conclusão
4) Nível de confiança: Alto / Médio / Baixo

Responda em português, sem markdown, de forma objetiva e clínica.
`;
```

### Envio das imagens para a API
```javascript
// No api/chat.js — atualizar para aceitar array de imagens
const content = [
  {
    type: "image",
    source: { type: "base64", media_type: "image/jpeg", data: patientImage }
  },
  ...referenceImages.map(ref => ({
    type: "image",
    source: { type: "base64", media_type: "image/jpeg", data: ref.base64 }
  })),
  {
    type: "text",
    text: prompt
  }
];
```

---

## Fontes para Obter as Imagens de Referência

Prioridade para obter RX limpas e representativas:

1. **Casos clínicos próprios** — RX de implantes com marca conhecida e documentada
2. **Catálogos dos fabricantes** — alguns publicam RX representativas
3. **Artigos científicos** — muitos casos clínicos publicados têm RX periapicais
4. **Sites dos fabricantes** — Straumann, Neodent e Nobel têm materiais educativos
5. **SpotImplant blog** — publica artigos com imagens educativas de identificação

---

## Estimativa de Melhoria de Precisão

| Situação | Fase 1 (atual) | Fase 2 (com banco) |
|---|---|---|
| Conexão correta (HE/HI/CM) | ~70% | ~85% |
| Sistema específico correto | ~30% | ~65% |
| Com checklist preenchido | ~50% | ~80% |
| Casos ambíguos (CM vs HI) | ~40% | ~60% |

*Estimativas baseadas em características do modelo Claude Vision.
Precisão real depende da qualidade das RX fornecidas.*

---

## Próximos Passos

- [ ] Coletar 18 imagens de referência conforme tabela acima
- [ ] Salvar em `/public/rx-references/` com os nomes especificados
- [ ] Atualizar `api/chat.js` para aceitar array de imagens
- [ ] Implementar `selectReferences()` no componente `DetectiveRX`
- [ ] Atualizar prompt com labels das referências
- [ ] Testar com casos clínicos conhecidos e medir precisão
- [ ] Adicionar feedback do usuário ("A identificação estava correta?")
  para monitorar qualidade ao longo do tempo

---

*Documento criado em Abril/2026 — Implante Guide v1.0*
*Implementar após coleta do banco de imagens de referência.*
