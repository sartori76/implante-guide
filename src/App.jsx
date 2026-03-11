import { useState } from "react";
import {
  Search, ChevronRight, ChevronLeft, CheckCircle, ShoppingCart,
  ExternalLink, RotateCcw, Zap, Shield, AlertTriangle, Home,
  ArrowRight, Info, Layers
} from "lucide-react";

function gh(baseName, baseInfo, pairs) {
  const out = {};
  pairs.forEach(([h, sku]) => {
    out[h] = { name: `${baseName} GH ${h.replace(".", ",")}mm`, sku, torque: baseInfo.torque, chave: baseInfo.chave, type: baseInfo.type, material: baseInfo.material, shape: baseInfo.shape || "variobase" };
  });
  return out;
}

const IMPLANT_DB = {
  straumann: {
    label: "Straumann", logo: "STR", color: "#3b82f6", site: "straumann.com.br",
    connections: {
      // CrossFit = conexão RC usada nos implantes Bone Level (BL) e Bone Level Tapered (BLT)
      crossfit: { label: "CrossFit — Bone Level (BL/BLT · RC)", objectives: {
        unitariaParafusada: { subtypes: [
          { key:"variobase", label:"Variobase RC", desc:"Base universal para coroa parafusada — CAD/CAM. ∅ emergência 4,5 mm ou 5 mm. Acompanha parafuso SCS.", icon:"⬡",
            heights: gh("Variobase RC",{torque:"35 Ncm",chave:"SCS 1.25mm",type:"Variobase",material:"Ti Grau 5",shape:"variobase"},[
              ["1.0","022.0026"],["2.0","022.0107"],["3.0","022.0109"]
            ]) },
          { key:"sa", label:"Pilar Anatômico RC (Angulado 0° / 15°)", desc:"Pilar anatômico parafusado — corrige angulação. Disponível em 0° e 15°. Chave SCS.", icon:"↗",
            heights: gh("Pilar Anatômico RC 0°",{torque:"35 Ncm",chave:"SCS 1.25mm",type:"Pilar Anatômico RC",material:"Ti Grau 5",shape:"pilar_ang"},[
              ["2.0","022.4102"],["3.5","022.4104"]
            ]) },
        ]},
        unitariaCimentada: { subtypes: [
          { key:"variobaseCim", label:"Pilar Cimentável RC", desc:"Pilar cimentável com perfil de emergência anatômico. ∅ 5 mm ou ∅ 6,5 mm. Chave SCS.", icon:"⬡",
            heights: gh("Pilar Cimentável RC ∅5mm",{torque:"35 Ncm",chave:"SCS 1.25mm",type:"Pilar Cimentável RC",material:"Ti Grau 5",shape:"pilar_cim"},[
              ["1.0","022.4321"],["2.0","022.4322"],["3.0","022.4323"]
            ]) },
        ]},
        fixaMultipla: { subtypes: [
          { key:"sra", label:"SRA RC (Prótese Unida)", desc:"Screw-Retained Abutment para próteses fixas múltiplas. Disponível em 0°, 17° e 30°.", icon:"⬢",
            heights: gh("SRA RC 0°",{torque:"15 Ncm",chave:"SCS 1.25mm",type:"SRA Multi-Unit RC",material:"Ti Grau 5",shape:"sra"},[
              ["1.5","022.0132S"],["2.5","022.0133S"],["3.5","022.0134S"]
            ]) },
        ]},
      }},

      // TorcFit = conexão usada nos implantes Bone Level Xtend (BLX) — RB e WB
      torcfit: { label: "TorcFit — Bone Level Xtend (BLX)", objectives: {
        unitariaParafusada: { subtypes: [
          { key:"variobaseBLX", label:"Variobase BLX ∅3,8mm (RB/WB)", desc:"Variobase BLX perfil fino — para implantes RB e WB (∅3,5–6,5mm). Carga imediata e fluxo digital.", icon:"⬡",
            heights: gh("Variobase BLX ∅3,8mm",{torque:"35 Ncm",chave:"SCS 1.25mm",type:"Variobase BLX",material:"Ti Grau 5",shape:"variobase"},[
              ["1.5","062.4934"],["2.5","062.4935"],["3.5","062.4936"]
            ]) },
          { key:"variobaseBLXlarge", label:"Variobase BLX ∅4,5mm (RB/WB)", desc:"Variobase BLX perfil largo — maior perfil de emergência. Para implantes RB e WB.", icon:"⬡",
            heights: gh("Variobase BLX ∅4,5mm",{torque:"35 Ncm",chave:"SCS 1.25mm",type:"Variobase BLX",material:"Ti Grau 5",shape:"variobase_wide"},[
              ["1.5","062.4944"],["2.5","062.4945"],["3.5","062.4946"]
            ]) },
          { key:"saBLX", label:"Pilar Anatômico BLX (Angulado 0° / 17°)", desc:"Pilar anatômico para BLX — corrige angulação. ∅ emergência 3,8mm (RB/WB).", icon:"↗",
            heights: gh("Pilar Anatômico BLX 0°",{torque:"35 Ncm",chave:"SCS 1.25mm",type:"Pilar Anatômico BLX",material:"Ti Grau 5",shape:"pilar_ang"},[
              ["2.5","062.4103"],["3.5","062.4104"]
            ]) },
        ]},
        unitariaCimentada: { subtypes: [
          { key:"variobaseBLXcim", label:"Variobase BLX C (Cimentação)", desc:"Variobase BLX C para restaurações cimentadas — ∅4,5mm (RB/WB).", icon:"⬡",
            heights: gh("Variobase BLX C ∅4,5mm",{torque:"35 Ncm",chave:"SCS 1.25mm",type:"Variobase BLX Cimentado",material:"Ti Grau 5",shape:"pilar_cim"},[
              ["1.5","062.4961"]
            ]) },
        ]},
        fixaMultipla: { subtypes: [
          { key:"sraBLX", label:"SRA BLX (Prótese Unida)", desc:"Pilar SRA BLX para próteses fixas múltiplas. Disponível em 0°, 17° e 30°.", icon:"⬢",
            heights: gh("SRA BLX 0°",{torque:"15 Ncm",chave:"SCS 1.25mm",type:"SRA Multi-Unit BLX",material:"Ti Grau 5",shape:"sra"},[
              ["1.5","062.4722S"],["2.5","062.4723S"],["3.5","062.4724S"],["4.5","062.4725S"]
            ]) },
        ]},
      }},

      // TorcFit TLX = Tissue Level Xtend — plataforma é selecionada na tela tlxPlatform
      // Os subtypes são filtrados em runtime pela plataforma escolhida (tlxPlatform: "NT"|"RT"|"WT")
      torcfitTLX: { label: "TorcFit — Tissue Level Xtend (TLX)", isTLX: true, objectives: {
        unitariaParafusada: { subtypes: [
          { key:"variobaseTLX_coroa_NT",  plat:"NT", label:"Variobase para Coroa",       desc:"Variobase parafusada para coroa unitária — NT ∅3,5mm. Roxolid®. Torque 35 Ncm. Chave AS 046.786.", icon:"⬡", heights:{"unico":{name:"Variobase TLX Coroa NT",  sku:"037.0201", torque:"35 Ncm", chave:"Chave AS 046.786", type:"Variobase TLX NT",    material:"Ti Grau 5 (Roxolid®)", shape:"variobase"     }}},
          { key:"variobaseTLX_coroaAS_NT",plat:"NT", label:"Variobase para Coroa AS",    desc:"Variobase com acesso angulado (AS) — NT ∅3,5mm. Parafuso de subst. 036.3111. Torque 35 Ncm.",  icon:"↗", heights:{"unico":{name:"Variobase TLX Coroa AS NT",sku:"037.0203", torque:"35 Ncm", chave:"Chave AS 046.786", type:"Variobase TLX NT (AS)",material:"Ti Grau 5 (Roxolid®)", shape:"pilar_ang"   }}},
          { key:"pilarTempTLX_coroa_NT",  plat:"NT", label:"Pilar Temporário para Coroa",desc:"Pilar provisório para coroa unitária — NT ∅3,5mm. Torque 35 Ncm.", icon:"🕐",                  heights:{"unico":{name:"Pilar Temporário TLX Coroa NT",sku:"037.0000",torque:"35 Ncm", chave:"Chave AS 046.786", type:"Pilar Temporário TLX NT",material:"Ti Grau 5",              shape:"pilar_ang"   }}},
          { key:"variobaseTLX_coroa_RT",  plat:"RT", label:"Variobase para Coroa",       desc:"Variobase parafusada para coroa unitária — RT ∅4,8mm. Roxolid®. Torque 35 Ncm. Chave AS 046.787.", icon:"⬡", heights:{"unico":{name:"Variobase TLX Coroa RT",  sku:"037.1201", torque:"35 Ncm", chave:"Chave AS 046.787", type:"Variobase TLX RT",    material:"Ti Grau 5 (Roxolid®)", shape:"variobase"     }}},
          { key:"variobaseTLX_coroaAS_RT",plat:"RT", label:"Variobase para Coroa AS",    desc:"Variobase com acesso angulado (AS) — RT ∅4,8mm. Parafuso de subst. 036.3111. Torque 35 Ncm.",  icon:"↗", heights:{"unico":{name:"Variobase TLX Coroa AS RT",sku:"037.1203", torque:"35 Ncm", chave:"Chave AS 046.787", type:"Variobase TLX RT (AS)",material:"Ti Grau 5 (Roxolid®)", shape:"pilar_ang"   }}},
          { key:"pilarTempTLX_coroa_RT",  plat:"RT", label:"Pilar Temporário para Coroa",desc:"Pilar provisório para coroa unitária — RT ∅4,8mm. Torque 35 Ncm.", icon:"🕐",                  heights:{"unico":{name:"Pilar Temporário TLX Coroa RT",sku:"037.1000",torque:"35 Ncm", chave:"Chave AS 046.787", type:"Pilar Temporário TLX RT",material:"Ti Grau 5",              shape:"pilar_ang"   }}},
          { key:"variobaseTLX_coroa_WT",  plat:"WT", label:"Variobase para Coroa",       desc:"Variobase parafusada para coroa unitária — WT ∅6,5mm. Roxolid®. Torque 35 Ncm. Chave AS 046.788.", icon:"⬡", heights:{"unico":{name:"Variobase TLX Coroa WT",  sku:"037.2201", torque:"35 Ncm", chave:"Chave AS 046.788", type:"Variobase TLX WT",    material:"Ti Grau 5 (Roxolid®)", shape:"variobase_wide"}}},
          { key:"variobaseTLX_coroaAS_WT",plat:"WT", label:"Variobase para Coroa AS",    desc:"Variobase com acesso angulado (AS) — WT ∅6,5mm. Parafuso de subst. 036.3111. Torque 35 Ncm.",  icon:"↗", heights:{"unico":{name:"Variobase TLX Coroa AS WT",sku:"037.2203", torque:"35 Ncm", chave:"Chave AS 046.788", type:"Variobase TLX WT (AS)",material:"Ti Grau 5 (Roxolid®)", shape:"pilar_ang"   }}},
          { key:"pilarTempTLX_coroa_WT",  plat:"WT", label:"Pilar Temporário para Coroa",desc:"Pilar provisório para coroa unitária — WT ∅6,5mm. Torque 35 Ncm.", icon:"🕐",                  heights:{"unico":{name:"Pilar Temporário TLX Coroa WT",sku:"037.2000",torque:"35 Ncm", chave:"Chave AS 046.788", type:"Pilar Temporário TLX WT",material:"Ti Grau 5",              shape:"pilar_ang"   }}},
        ]},
        unitariaCimentada: { subtypes: [
          { key:"cilcalcTLX_coroa_NT",   plat:"NT", label:"Cilindro Calcinável para Coroa",    desc:"Cilindro calcinável para coroa cimentada — NT ∅3,5mm. Individual ou kit V4. Chave AS 046.786.", icon:"🔥", heights:{"unico":{name:"Cilindro Calcinável TLX Coroa NT",   sku:"037.0211 / 037.0211V4", torque:"35 Ncm", chave:"Chave AS 046.786", type:"Cilindro Calcinável TLX NT",      material:"Plástico calcinável", shape:"pilar_cim"}}},
          { key:"cilcalcTLX_coroaAS_NT", plat:"NT", label:"Cilindro Calcinável para Coroa AS", desc:"Cilindro calcinável com acesso angulado — NT ∅3,5mm. Chave AS 046.786.", icon:"🔥",              heights:{"unico":{name:"Cilindro Calcinável TLX Coroa AS NT",sku:"037.0212",            torque:"35 Ncm", chave:"Chave AS 046.786", type:"Cilindro Calcinável TLX NT (AS)",material:"Plástico calcinável", shape:"pilar_cim"}}},
          { key:"cilcalcTLX_coroa_RT",   plat:"RT", label:"Cilindro Calcinável para Coroa",    desc:"Cilindro calcinável para coroa cimentada — RT ∅4,8mm. Individual ou kit V4. Chave AS 046.787.", icon:"🔥", heights:{"unico":{name:"Cilindro Calcinável TLX Coroa RT",   sku:"037.1211 / 037.1211V4", torque:"35 Ncm", chave:"Chave AS 046.787", type:"Cilindro Calcinável TLX RT",      material:"Plástico calcinável", shape:"pilar_cim"}}},
          { key:"cilcalcTLX_coroaAS_RT", plat:"RT", label:"Cilindro Calcinável para Coroa AS", desc:"Cilindro calcinável com acesso angulado — RT ∅4,8mm. Chave AS 046.787.", icon:"🔥",              heights:{"unico":{name:"Cilindro Calcinável TLX Coroa AS RT",sku:"037.1212",            torque:"35 Ncm", chave:"Chave AS 046.787", type:"Cilindro Calcinável TLX RT (AS)",material:"Plástico calcinável", shape:"pilar_cim"}}},
          { key:"cilcalcTLX_coroa_WT",   plat:"WT", label:"Cilindro Calcinável para Coroa",    desc:"Cilindro calcinável para coroa cimentada — WT ∅6,5mm. Individual ou kit V4. Chave AS 046.788.", icon:"🔥", heights:{"unico":{name:"Cilindro Calcinável TLX Coroa WT",   sku:"037.2211 / 037.2211V4", torque:"35 Ncm", chave:"Chave AS 046.788", type:"Cilindro Calcinável TLX WT",      material:"Plástico calcinável", shape:"pilar_cim"}}},
          { key:"cilcalcTLX_coroaAS_WT", plat:"WT", label:"Cilindro Calcinável para Coroa AS", desc:"Cilindro calcinável com acesso angulado — WT ∅6,5mm. Chave AS 046.788.", icon:"🔥",              heights:{"unico":{name:"Cilindro Calcinável TLX Coroa AS WT",sku:"037.2212",            torque:"35 Ncm", chave:"Chave AS 046.788", type:"Cilindro Calcinável TLX WT (AS)",material:"Plástico calcinável", shape:"pilar_cim"}}},
        ]},
        fixaMultipla: { subtypes: [
          { key:"variobaseTLX_ponte_NT",  plat:"NT", label:"Variobase para Múltipla/Ponte",       desc:"Variobase para prótese fixa múltipla/ponte — NT ∅3,5mm. Torque 35 Ncm. Chave AS 046.786.", icon:"⬢", heights:{"unico":{name:"Variobase TLX Múltipla/Ponte NT",     sku:"037.0204",            torque:"35 Ncm", chave:"Chave AS 046.786", type:"Variobase TLX NT Multi-Unit",         material:"Ti Grau 5 (Roxolid®)", shape:"sra"    }}},
          { key:"cilcalcTLX_ponte_NT",    plat:"NT", label:"Cilindro Calcinável Múltipla/Ponte",  desc:"Cilindro calcinável para múltipla/ponte — NT ∅3,5mm. Individual ou kit V4.", icon:"🔥",            heights:{"unico":{name:"Cilindro Calcinável TLX Ponte NT",     sku:"037.0213 / 037.0213V4", torque:"15 Ncm", chave:"Chave AS 046.786", type:"Cilindro Calcinável TLX NT Ponte",    material:"Plástico calcinável", shape:"cilindro"}}},
          { key:"pilarTempTLX_ponte_NT",  plat:"NT", label:"Pilar Temporário para Múltipla/Ponte",desc:"Pilar provisório para próteses fixas múltiplas — NT ∅3,5mm. Torque 35 Ncm.", icon:"🕐",            heights:{"unico":{name:"Pilar Temporário TLX Múltipla NT",    sku:"037.0001",            torque:"35 Ncm", chave:"Chave AS 046.786", type:"Pilar Temporário TLX NT Multi-Unit",  material:"Ti Grau 5",            shape:"sra"    }}},
          { key:"variobaseTLX_ponte_RT",  plat:"RT", label:"Variobase para Múltipla/Ponte",       desc:"Variobase para prótese fixa múltipla/ponte — RT ∅4,8mm. Torque 35 Ncm. Chave AS 046.787.", icon:"⬢", heights:{"unico":{name:"Variobase TLX Múltipla/Ponte RT",     sku:"037.1204",            torque:"35 Ncm", chave:"Chave AS 046.787", type:"Variobase TLX RT Multi-Unit",         material:"Ti Grau 5 (Roxolid®)", shape:"sra"    }}},
          { key:"cilcalcTLX_ponte_RT",    plat:"RT", label:"Cilindro Calcinável Múltipla/Ponte",  desc:"Cilindro calcinável para múltipla/ponte — RT ∅4,8mm. Individual ou kit V4.", icon:"🔥",            heights:{"unico":{name:"Cilindro Calcinável TLX Ponte RT",     sku:"037.1213 / 037.1213V4", torque:"15 Ncm", chave:"Chave AS 046.787", type:"Cilindro Calcinável TLX RT Ponte",    material:"Plástico calcinável", shape:"cilindro"}}},
          { key:"pilarTempTLX_ponte_RT",  plat:"RT", label:"Pilar Temporário para Múltipla/Ponte",desc:"Pilar provisório para próteses fixas múltiplas — RT ∅4,8mm. Torque 35 Ncm.", icon:"🕐",            heights:{"unico":{name:"Pilar Temporário TLX Múltipla RT",    sku:"037.1001",            torque:"35 Ncm", chave:"Chave AS 046.787", type:"Pilar Temporário TLX RT Multi-Unit",  material:"Ti Grau 5",            shape:"sra"    }}},
          { key:"variobaseTLX_ponte_WT",  plat:"WT", label:"Variobase para Múltipla/Ponte",       desc:"Variobase para prótese fixa múltipla/ponte — WT ∅6,5mm. Torque 35 Ncm. Chave AS 046.788.", icon:"⬢", heights:{"unico":{name:"Variobase TLX Múltipla/Ponte WT",     sku:"037.2204",            torque:"35 Ncm", chave:"Chave AS 046.788", type:"Variobase TLX WT Multi-Unit",         material:"Ti Grau 5 (Roxolid®)", shape:"sra"    }}},
          { key:"cilcalcTLX_ponte_WT",    plat:"WT", label:"Cilindro Calcinável Múltipla/Ponte",  desc:"Cilindro calcinável para múltipla/ponte — WT ∅6,5mm. Individual ou kit V4.", icon:"🔥",            heights:{"unico":{name:"Cilindro Calcinável TLX Ponte WT",     sku:"037.2213 / 037.2213V4", torque:"15 Ncm", chave:"Chave AS 046.788", type:"Cilindro Calcinável TLX WT Ponte",    material:"Plástico calcinável", shape:"cilindro"}}},
          { key:"pilarTempTLX_ponte_WT",  plat:"WT", label:"Pilar Temporário para Múltipla/Ponte",desc:"Pilar provisório para próteses fixas múltiplas — WT ∅6,5mm. Torque 35 Ncm.", icon:"🕐",            heights:{"unico":{name:"Pilar Temporário TLX Múltipla WT",    sku:"037.2001",            torque:"35 Ncm", chave:"Chave AS 046.788", type:"Pilar Temporário TLX WT Multi-Unit",  material:"Ti Grau 5",            shape:"sra"    }}},
        ]},
      }},

      // SynOcta = conexão usada nos implantes Tissue Level (TL) — RN ∅4,8mm e WN ∅6,5mm
      synOcta: { label: "SynOcta — Tissue Level (TL/RN)", objectives: {
        unitariaParafusada: { subtypes: [
          { key:"variobaseTL", label:"Variobase TL RN", desc:"Variobase para Tissue Level RN (∅4,8mm) — perfil transmucoso integrado. Chave AS 046.787.", icon:"⬡",
            heights: gh("Variobase TL RN",{torque:"35 Ncm",chave:"Chave AS 046.787",type:"Variobase TL",material:"Ti Grau 5",shape:"variobase"},[
              ["1.5","048.601"]
            ]) },
          { key:"saTL", label:"Pilar Angulado TL (15° Tipo A/B)", desc:"Pilar angulado para Tissue Level RN — tipo A (aresta) ou tipo B (face livre). Chave AS.", icon:"↗",
            heights: gh("Pilar Angulado TL 15° RN Tipo A",{torque:"35 Ncm",chave:"Chave AS 046.787",type:"Pilar Angulado TL",material:"Ti Grau 5",shape:"pilar_ang"},[
              ["1.5","048.612"]
            ]) },
        ]},
        unitariaCimentada: { subtypes: [
          { key:"variobaseTLcim", label:"Pilar Cimentado TL RN", desc:"Pilar cimentado para Tissue Level RN — AP 5,5mm. Chave SCS.", icon:"⬡",
            heights: gh("Pilar Cimentado TL RN",{torque:"35 Ncm",chave:"SCS 1.25mm",type:"Pilar Cimentado TL",material:"Ti Grau 5",shape:"pilar_cim"},[
              ["1.5","048.605"]
            ]) },
        ]},
        fixaMultipla: { subtypes: [
          { key:"sraTL", label:"Cilindro Calcinável Ponte/Barra TL RN", desc:"Para próteses fixas múltiplas parafusadas — AP 3,5mm. Chave SCS.", icon:"⬢",
            heights: gh("Cilindro Ponte/Barra TL RN",{torque:"15 Ncm",chave:"SCS 1.25mm",type:"Cilindro Ponte/Barra TL",material:"Ti Grau 5",shape:"cilindro"},[
              ["1.5","048.381"]
            ]) },
        ]},
      }},
    },
  },
  neodent: {
    label: "Neodent", logo: "NEO", color: "#10b981", site: "neodent.com.br",
    connections: {
      gm: { label: "Grand Morse (GM)", objectives: {
        unitariaParafusada: { subtypes: [
          { key:"pilarGM", label:"Pilar GM Universal", desc:"Pilar padrão para coroa unitária parafusada", icon:"🔩", heights: gh("Pilar GM",{torque:"32 Ncm",chave:"Neo 1.20mm",type:"Pilar Protético",material:"Ti Grau 4"},[["0.8","120.120"],["1.5","120.130"],["2.5","120.140"],["3.5","120.150"],["4.5","120.160"]]) },
          { key:"microPilarGM", label:"Micro-Pilar GM", desc:"Plataforma reduzida — espaço estreito ou estética crítica", icon:"🔬", heights: gh("Micro-Pilar GM",{torque:"25 Ncm",chave:"Neo 1.20mm",type:"Micro-Pilar",material:"Ti Grau 4"},[["0.8","120.220"],["1.5","120.230"],["2.5","120.240"],["3.5","120.250"]]) },
        ]},
        unitariaCimentada: { subtypes: [{ key:"munhaoGM", label:"Munhão GM Universal", desc:"Munhão para coroa unitária cimentada", icon:"🦷", heights: gh("Munhão GM",{torque:"32 Ncm",chave:"Neo 1.20mm",type:"Munhão Cimentado",material:"Ti Grau 4"},[["0.8","120.121"],["1.5","120.131"],["2.5","120.141"],["3.5","120.151"],["4.5","120.161"]]) }]},
        fixaMultipla: { subtypes: [
          { key:"miniPilarGM", label:"Mini-Pilar GM", desc:"Para próteses fixas múltiplas parafusadas", icon:"⚙️", heights: gh("Mini-Pilar GM",{torque:"15 Ncm",chave:"Neo 1.20mm",type:"Mini-Pilar Multi-Unit",material:"Ti Grau 4"},[["0.8","120.132"],["1.5","120.133"],["2.5","120.134"],["3.5","120.135"]]) },
          { key:"muaGM", label:"Multi-Unit Abutment GM", desc:"MUA reto/angulado para barra protocolo e híbridas", icon:"⬢", heights: gh("MUA GM",{torque:"15 Ncm",chave:"Neo 1.20mm",type:"Multi-Unit Abutment",material:"Ti Grau 4"},[["1.5","120.172"],["2.5","120.173"],["3.5","120.174"]]) },
        ]},
      }},
      cm: { label: "Cone Morse (CM)", objectives: {
        unitariaParafusada: { subtypes: [{ key:"pilarCM", label:"Pilar CM Universal", desc:"Pilar cônico morse para coroa unitária parafusada", icon:"🔩", heights: gh("Pilar CM",{torque:"30 Ncm",chave:"Hex 1.20mm",type:"Pilar Protético",material:"Ti Grau 4"},[["0.8","110.230"],["1.5","110.234"],["2.5","110.238"],["3.5","110.242"],["4.5","110.246"]]) }]},
        unitariaCimentada: { subtypes: [{ key:"munhaoCM", label:"Munhão CM Universal", desc:"Munhão cônico morse para coroa unitária cimentada", icon:"🦷", heights: gh("Munhão CM",{torque:"30 Ncm",chave:"Hex 1.20mm",type:"Munhão Cimentado",material:"Ti Grau 4"},[["0.8","110.231"],["1.5","110.235"],["2.5","110.239"],["3.5","110.243"],["4.5","110.247"]]) }]},
        fixaMultipla: { subtypes: [{ key:"miniPilarCM", label:"Mini-Pilar CM", desc:"Para próteses múltiplas parafusadas — sistema CM", icon:"⚙️", heights: gh("Mini-Pilar CM",{torque:"15 Ncm",chave:"Hex 1.20mm",type:"Mini-Pilar Multi-Unit",material:"Ti Grau 4"},[["1.5","110.236"],["2.5","110.237"],["3.5","110.240"]]) }]},
      }},
      he: { label: "Hexágono Externo (HE)", objectives: {
        unitariaParafusada: { subtypes: [{ key:"pilarHE", label:"Pilar HE Universal", desc:"Pilar hexágono externo para coroa unitária parafusada", icon:"🔩", heights: gh("Pilar HE",{torque:"20 Ncm",chave:"Hex 0.9mm",type:"Pilar Protético",material:"Ti Grau 4"},[["1.5","105.010"],["2.5","105.014"],["3.5","105.018"],["4.5","105.022"]]) }]},
        unitariaCimentada: { subtypes: [{ key:"munhaoHE", label:"Munhão HE Universal", desc:"Munhão hexágono externo para coroa cimentada", icon:"🦷", heights: gh("Munhão HE",{torque:"20 Ncm",chave:"Hex 0.9mm",type:"Munhão Cimentado",material:"Ti Grau 4"},[["1.5","105.011"],["2.5","105.015"],["3.5","105.019"],["4.5","105.023"]]) }]},
        fixaMultipla: { subtypes: [{ key:"miniPilarHE", label:"Mini-Pilar HE", desc:"Para próteses fixas múltiplas — sistema HE", icon:"⚙️", heights: gh("Mini-Pilar HE",{torque:"15 Ncm",chave:"Hex 0.9mm",type:"Mini-Pilar Multi-Unit",material:"Ti Grau 4"},[["1.5","105.012"],["2.5","105.016"],["3.5","105.020"]]) }]},
      }},
      hi: { label: "Hexágono Interno (HI)", objectives: {
        unitariaParafusada: { subtypes: [{ key:"pilarHI", label:"Pilar HI Universal", desc:"Pilar hexágono interno para coroa unitária parafusada", icon:"🔩", heights: gh("Pilar HI",{torque:"25 Ncm",chave:"Hex 1.27mm",type:"Pilar Protético",material:"Ti Grau 4"},[["1.5","108.015"],["2.5","108.019"],["3.5","108.023"],["4.5","108.027"]]) }]},
        unitariaCimentada: { subtypes: [{ key:"munhaoHI", label:"Munhão HI Universal", desc:"Munhão hexágono interno para coroa cimentada", icon:"🦷", heights: gh("Munhão HI",{torque:"25 Ncm",chave:"Hex 1.27mm",type:"Munhão Cimentado",material:"Ti Grau 4"},[["1.5","108.016"],["2.5","108.020"],["3.5","108.024"],["4.5","108.028"]]) }]},
        fixaMultipla: { subtypes: [{ key:"miniPilarHI", label:"Mini-Pilar HI", desc:"Para próteses fixas múltiplas — sistema HI", icon:"⚙️", heights: gh("Mini-Pilar HI",{torque:"15 Ncm",chave:"Hex 1.27mm",type:"Mini-Pilar Multi-Unit",material:"Ti Grau 4"},[["1.5","108.017"],["2.5","108.021"],["3.5","108.025"]]) }]},
      }},
    },
  },
  sin: {
    label: "S.I.N. Implant System", logo: "SIN", color: "#a855f7", site: "sinimplantsystem.com.br",
    connections: {
      sinCM: { label: "Cone Morse (CM 16°)", objectives: {
        unitariaParafusada: { subtypes: [{ key:"pilar", label:"Pilar CM S.I.N.", desc:"Pilar cônico 16° para coroa unitária parafusada", icon:"🔩", heights: gh("Pilar CM S.I.N.",{torque:"20 Ncm",chave:"Hex 1.20mm",type:"Pilar Protético",material:"Ti Grau 4"},[["1.5","AUMP-4501C"],["2.5","AUMP-4502C"],["3.5","AUMP-4503C"],["4.5","AUMP-4504C"]]) }]},
        unitariaCimentada: { subtypes: [{ key:"munhao", label:"Abutment CM Cimentado S.I.N.", desc:"Abutment cônico cimentado com perfil emergência anatômico", icon:"🦷", heights: gh("Abutment CM Cim. S.I.N.",{torque:"20 Ncm",chave:"Hex 1.20mm",type:"Munhão Cimentado",material:"Ti Grau 4"},[["1.5","AIMP-4501C"],["2.5","AIMP-4502C"],["3.5","AIMP-4503C"],["4.5","AIMP-4504C"]]) }]},
        fixaMultipla: { subtypes: [{ key:"mua", label:"Mini-Pilar CM S.I.N.", desc:"Para próteses fixas múltiplas — sistema CM S.I.N.", icon:"⚙️", heights: gh("Mini-Pilar CM S.I.N.",{torque:"15 Ncm",chave:"Hex 1.20mm",type:"Mini-Pilar Multi-Unit",material:"Ti Grau 4"},[["1.5","MAMU-4501C"],["2.5","MAMU-4502C"],["3.5","MAMU-4503C"]]) }]},
      }},
      sinHI: { label: "Hexágono Interno (HI)", objectives: {
        unitariaParafusada: { subtypes: [{ key:"pilar", label:"Pilar HI S.I.N.", desc:"Pilar HI para coroa unitária parafusada", icon:"🔩", heights: gh("Pilar HI S.I.N.",{torque:"25 Ncm",chave:"Hex 1.27mm",type:"Pilar Protético",material:"Ti Grau 4"},[["1.5","PHI-RP-15"],["2.5","PHI-RP-25"],["3.5","PHI-RP-35"],["4.5","PHI-RP-45"]]) }]},
        unitariaCimentada: { subtypes: [{ key:"munhao", label:"Abutment HI Cimentado S.I.N.", desc:"Abutment HI para coroa cimentada", icon:"🦷", heights: gh("Abutment HI Cim. S.I.N.",{torque:"25 Ncm",chave:"Hex 1.27mm",type:"Munhão Cimentado",material:"Ti Grau 4"},[["1.5","PHI-CIM-15"],["2.5","PHI-CIM-25"],["3.5","PHI-CIM-35"],["4.5","PHI-CIM-45"]]) }]},
        fixaMultipla: { subtypes: [{ key:"mua", label:"Mini-Pilar HI S.I.N.", desc:"Para próteses fixas múltiplas — HI S.I.N.", icon:"⚙️", heights: gh("Mini-Pilar HI S.I.N.",{torque:"15 Ncm",chave:"Hex 1.27mm",type:"Mini-Pilar Multi-Unit",material:"Ti Grau 4"},[["1.5","MUA-HI-15"],["2.5","MUA-HI-25"],["3.5","MUA-HI-35"]]) }]},
      }},
      sinHE: { label: "Hexágono Externo (HE)", objectives: {
        unitariaParafusada: { subtypes: [{ key:"pilar", label:"Pilar HE S.I.N.", desc:"Pilar HE para coroa unitária parafusada", icon:"🔩", heights: gh("Pilar HE S.I.N.",{torque:"20 Ncm",chave:"Hex 0.9mm",type:"Pilar Protético",material:"Ti Grau 4"},[["1.5","PHE-RP-15"],["2.5","PHE-RP-25"],["3.5","PHE-RP-35"],["4.5","PHE-RP-45"]]) }]},
        unitariaCimentada: { subtypes: [{ key:"munhao", label:"Abutment HE Cimentado S.I.N.", desc:"Abutment HE para coroa cimentada", icon:"🦷", heights: gh("Abutment HE Cim. S.I.N.",{torque:"20 Ncm",chave:"Hex 0.9mm",type:"Munhão Cimentado",material:"Ti Grau 4"},[["1.5","PHE-CIM-15"],["2.5","PHE-CIM-25"],["3.5","PHE-CIM-35"],["4.5","PHE-CIM-45"]]) }]},
        fixaMultipla: { subtypes: [{ key:"mua", label:"Mini-Pilar HE S.I.N.", desc:"Para próteses fixas múltiplas — HE S.I.N.", icon:"⚙️", heights: gh("Mini-Pilar HE S.I.N.",{torque:"15 Ncm",chave:"Hex 0.9mm",type:"Mini-Pilar Multi-Unit",material:"Ti Grau 4"},[["1.5","MUA-HE-15"],["2.5","MUA-HE-25"],["3.5","MUA-HE-35"]]) }]},
      }},
    },
  },
  nobel: {
    label: "Nobel Biocare", logo: "NOB", color: "#f59e0b", site: "nobelbiocare.com",
    connections: {
      nobelActive: { label: "NobelActive (Cone Interno)", objectives: {
        unitariaParafusada: { subtypes: [{ key:"pilar", label:"Pilar NobelActive Parafusado", desc:"Pilar cônico interno para coroa unitária parafusada", icon:"🔩", heights: gh("Pilar NobelActive",{torque:"35 Ncm",chave:"Nobel Hex 1.25mm",type:"Pilar Protético",material:"Ti Grau 4"},[["1.5","30836-1"],["2.5","30836-2"],["3.5","30836-3"],["4.5","30836-4"]]) }]},
        unitariaCimentada: { subtypes: [{ key:"munhao", label:"Pilar NA Cimentado", desc:"Pilar cônico para coroa cimentada", icon:"🦷", heights: gh("Pilar NA Cim.",{torque:"35 Ncm",chave:"Nobel Hex 1.25mm",type:"Munhão Cimentado",material:"Ti Grau 4"},[["1.5","30837-1"],["2.5","30837-2"],["3.5","30837-3"],["4.5","30837-4"]]) }]},
        fixaMultipla: { subtypes: [{ key:"mua", label:"Multi-Unit Abutment NA", desc:"MUA para próteses fixas múltiplas e full arch", icon:"⚙️", heights: gh("MUA NobelActive",{torque:"15 Ncm",chave:"Nobel Hex 1.25mm",type:"Multi-Unit Abutment",material:"Ti Grau 4"},[["1.5","32626-1"],["2.5","32626-2"],["3.5","32626-3"]]) }]},
      }},
      nobelReplace: { label: "NobelReplace (Tri-Channel)", objectives: {
        unitariaParafusada: { subtypes: [{ key:"pilar", label:"Pilar NobelReplace Parafusado", desc:"Pilar Tri-Channel para coroa unitária parafusada", icon:"🔩", heights: gh("Pilar NobelReplace",{torque:"35 Ncm",chave:"Nobel Hex 1.25mm",type:"Pilar Protético",material:"Ti Grau 4"},[["1.5","33424-1"],["2.5","33424-2"],["3.5","33424-3"],["4.5","33424-4"]]) }]},
        unitariaCimentada: { subtypes: [{ key:"munhao", label:"Pilar NR Cimentado", desc:"Pilar Tri-Channel para coroa cimentada convencional", icon:"🦷", heights: gh("Pilar NR Cim.",{torque:"35 Ncm",chave:"Nobel Hex 1.25mm",type:"Munhão Cimentado",material:"Ti Grau 4"},[["1.5","33425-1"],["2.5","33425-2"],["3.5","33425-3"],["4.5","33425-4"]]) }]},
        fixaMultipla: { subtypes: [{ key:"mua", label:"Multi-Unit Abutment NR", desc:"MUA Tri-Channel para protocolo All-on-4/6", icon:"⚙️", heights: gh("MUA NobelReplace",{torque:"15 Ncm",chave:"Nobel Hex 1.25mm",type:"Multi-Unit Abutment",material:"Ti Grau 4"},[["1.5","32983-1"],["2.5","32983-2"],["3.5","32983-3"]]) }]},
      }},
    },
  },
  osstem: {
    label: "Osstem", logo: "OSS", color: "#06b6d4", site: "osstem.com.br",
    connections: {
      tsIII: { label: "TS III / TS IV (Cone Morse + HI)", objectives: {
        unitariaParafusada: { subtypes: [{ key:"pilar", label:"Pilar TS Parafusado", desc:"Pilar cônico interno para coroa unitária parafusada", icon:"🔩", heights: gh("Pilar TS Osstem",{torque:"30 Ncm",chave:"Hex 1.20mm",type:"Pilar Protético",material:"Ti Grau 4"},[["1.5","TSNBA-15"],["2.5","TSNBA-25"],["3.5","TSNBA-35"],["4.5","TSNBA-45"]]) }]},
        unitariaCimentada: { subtypes: [{ key:"munhao", label:"Pilar TS Cimentado", desc:"Pilar cônico para coroa cimentada sobre TS", icon:"🦷", heights: gh("Pilar TS Cim. Osstem",{torque:"30 Ncm",chave:"Hex 1.20mm",type:"Munhão Cimentado",material:"Ti Grau 4"},[["1.5","TSCBA-15"],["2.5","TSCBA-25"],["3.5","TSCBA-35"],["4.5","TSCBA-45"]]) }]},
        fixaMultipla: { subtypes: [{ key:"mua", label:"Multi-Unit TS Osstem", desc:"MUA para próteses fixas múltiplas — sistema TS", icon:"⚙️", heights: gh("MUA TS Osstem",{torque:"15 Ncm",chave:"Hex 1.20mm",type:"Multi-Unit Abutment",material:"Ti Grau 4"},[["1.5","TSMUA-15"],["2.5","TSMUA-25"],["3.5","TSMUA-35"]]) }]},
      }},
      ss: { label: "SS (Hexágono Externo)", objectives: {
        unitariaParafusada: { subtypes: [{ key:"pilar", label:"Pilar SS Parafusado", desc:"Pilar HE para coroa unitária parafusada — sistema SS", icon:"🔩", heights: gh("Pilar SS Osstem",{torque:"20 Ncm",chave:"Hex 0.9mm",type:"Pilar Protético",material:"Ti Grau 4"},[["1.5","SSNBA-15"],["2.5","SSNBA-25"],["3.5","SSNBA-35"],["4.5","SSNBA-45"]]) }]},
        unitariaCimentada: { subtypes: [{ key:"munhao", label:"Pilar SS Cimentado", desc:"Pilar HE para coroa cimentada — sistema SS", icon:"🦷", heights: gh("Pilar SS Cim. Osstem",{torque:"20 Ncm",chave:"Hex 0.9mm",type:"Munhão Cimentado",material:"Ti Grau 4"},[["1.5","SSCBA-15"],["2.5","SSCBA-25"],["3.5","SSCBA-35"],["4.5","SSCBA-45"]]) }]},
        fixaMultipla: { subtypes: [{ key:"mua", label:"Multi-Unit SS Osstem", desc:"MUA HE para próteses fixas múltiplas", icon:"⚙️", heights: gh("MUA SS Osstem",{torque:"15 Ncm",chave:"Hex 0.9mm",type:"Multi-Unit Abutment",material:"Ti Grau 4"},[["1.5","SSMUA-15"],["2.5","SSMUA-25"],["3.5","SSMUA-35"]]) }]},
      }},
    },
  },
  dentsply: {
    label: "Dentsply Sirona", logo: "DEN", color: "#ec4899", site: "dentsplysirona.com",
    connections: {
      xive: { label: "Xive (Cone Interno TG)", objectives: {
        unitariaParafusada: { subtypes: [{ key:"pilar", label:"Pilar Xive Parafusado", desc:"Pilar cônico interno TG para coroa unitária parafusada", icon:"🔩", heights: gh("Pilar Xive",{torque:"24 Ncm",chave:"Hex 1.22mm",type:"Pilar Protético",material:"Ti Grau 4"},[["1.5","XO4.5STP-15"],["2.5","XO4.5STP-25"],["3.5","XO4.5STP-35"],["4.5","XO4.5STP-45"]]) }]},
        unitariaCimentada: { subtypes: [{ key:"munhao", label:"Pilar Xive Cimentado", desc:"Pilar cônico cimentado com colar anatômico", icon:"🦷", heights: gh("Pilar Xive Cim.",{torque:"24 Ncm",chave:"Hex 1.22mm",type:"Munhão Cimentado",material:"Ti Grau 4"},[["1.5","XO4.5STC-15"],["2.5","XO4.5STC-25"],["3.5","XO4.5STC-35"],["4.5","XO4.5STC-45"]]) }]},
        fixaMultipla: { subtypes: [{ key:"mua", label:"Multi-Unit Xive", desc:"Para próteses fixas múltiplas — sistema Xive", icon:"⚙️", heights: gh("MUA Xive",{torque:"15 Ncm",chave:"Hex 1.22mm",type:"Multi-Unit Abutment",material:"Ti Grau 4"},[["1.5","XO4.5MU-15"],["2.5","XO4.5MU-25"],["3.5","XO4.5MU-35"]]) }]},
      }},
      ankylos: { label: "Ankylos (Cone Morse Puro)", objectives: {
        unitariaParafusada: { subtypes: [{ key:"pilar", label:"Pilar Balance Parafusado", desc:"Pilar Balance para coroa unitária — cone morse puro", icon:"🔩", heights: gh("Pilar Balance Ankylos",{torque:"15 Ncm",chave:"Hex 1.00mm",type:"Pilar Balance",material:"Ti Grau 4"},[["1.5","A-BTF-11"],["2.5","A-BTF-12"],["3.5","A-BTF-13"],["4.5","A-BTF-14"]]) }]},
        unitariaCimentada: { subtypes: [{ key:"munhao", label:"Pilar Balance Cimentado", desc:"Fixação friccional por cone morse puro — sem parafuso", icon:"🦷", heights: gh("Pilar Balance Cim. Ankylos",{torque:"15 Ncm",chave:"Hex 1.00mm",type:"Munhão Cimentado",material:"Ti Grau 4"},[["1.5","A-BTC-11"],["2.5","A-BTC-12"],["3.5","A-BTC-13"],["4.5","A-BTC-14"]]) }]},
        fixaMultipla: { subtypes: [{ key:"mua", label:"SynCone (Protocolo)", desc:"Abutment telescópico cónico para protocolo Ankylos", icon:"⚙️", heights: gh("SynCone Ankylos",{torque:"15 Ncm",chave:"Hex 1.00mm",type:"Abutment Telescópico",material:"Ti Grau 4"},[["1.5","A-SYN-15"],["2.5","A-SYN-25"],["3.5","A-SYN-35"]]) }]},
      }},
    },
  },
  intraoss: {
    label: "Intraoss", logo: "INT", color: "#14b8a6", site: "intraoss.com.br",
    connections: {
      intraossCM: { label: "Cone Morse (CM)", objectives: {
        unitariaParafusada: { subtypes: [{ key:"pilar", label:"Pilar CM Parafusado", desc:"Pilar CM para coroa unitária parafusada Intraoss", icon:"🔩", heights: gh("Pilar CM Intraoss",{torque:"30 Ncm",chave:"Hex 1.20mm",type:"Pilar Protético",material:"Ti Grau 4"},[["1.5","IOS-CM-PAR-15"],["2.5","IOS-CM-PAR-25"],["3.5","IOS-CM-PAR-35"],["4.5","IOS-CM-PAR-45"]]) }]},
        unitariaCimentada: { subtypes: [{ key:"munhao", label:"Munhão CM Cimentado", desc:"Munhão CM para coroa unitária cimentada", icon:"🦷", heights: gh("Munhão CM Intraoss",{torque:"30 Ncm",chave:"Hex 1.20mm",type:"Munhão Cimentado",material:"Ti Grau 4"},[["1.5","IOS-CM-CIM-15"],["2.5","IOS-CM-CIM-25"],["3.5","IOS-CM-CIM-35"],["4.5","IOS-CM-CIM-45"]]) }]},
        fixaMultipla: { subtypes: [{ key:"mua", label:"Mini-Pilar CM", desc:"Para próteses fixas múltiplas Intraoss CM", icon:"⚙️", heights: gh("Mini-Pilar CM Intraoss",{torque:"15 Ncm",chave:"Hex 1.20mm",type:"Mini-Pilar Multi-Unit",material:"Ti Grau 4"},[["1.5","IOS-CM-MU-15"],["2.5","IOS-CM-MU-25"],["3.5","IOS-CM-MU-35"]]) }]},
      }},
      intraossHE: { label: "Hexágono Externo (HE)", objectives: {
        unitariaParafusada: { subtypes: [{ key:"pilar", label:"Pilar HE Parafusado", desc:"Pilar HE para coroa unitária parafusada Intraoss", icon:"🔩", heights: gh("Pilar HE Intraoss",{torque:"20 Ncm",chave:"Hex 0.9mm",type:"Pilar Protético",material:"Ti Grau 4"},[["1.5","IOS-HE-PAR-15"],["2.5","IOS-HE-PAR-25"],["3.5","IOS-HE-PAR-35"],["4.5","IOS-HE-PAR-45"]]) }]},
        unitariaCimentada: { subtypes: [{ key:"munhao", label:"Munhão HE Cimentado", desc:"Munhão HE para coroa cimentada Intraoss", icon:"🦷", heights: gh("Munhão HE Intraoss",{torque:"20 Ncm",chave:"Hex 0.9mm",type:"Munhão Cimentado",material:"Ti Grau 4"},[["1.5","IOS-HE-CIM-15"],["2.5","IOS-HE-CIM-25"],["3.5","IOS-HE-CIM-35"],["4.5","IOS-HE-CIM-45"]]) }]},
        fixaMultipla: { subtypes: [{ key:"mua", label:"Mini-Pilar HE", desc:"Para próteses fixas múltiplas Intraoss HE", icon:"⚙️", heights: gh("Mini-Pilar HE Intraoss",{torque:"15 Ncm",chave:"Hex 0.9mm",type:"Mini-Pilar Multi-Unit",material:"Ti Grau 4"},[["1.5","IOS-HE-MU-15"],["2.5","IOS-HE-MU-25"],["3.5","IOS-HE-MU-35"]]) }]},
      }},
    },
  },
  titaniumfix: {
    label: "Titanium Fix", logo: "TFX", color: "#8b5cf6", site: "titaniumfix.com.br",
    connections: {
      tfCM: { label: "Cone Morse (Drive)", objectives: {
        unitariaParafusada: { subtypes: [{ key:"pilar", label:"Pilar Drive Parafusado", desc:"Pilar CM Drive para coroa unitária parafusada", icon:"🔩", heights: gh("Pilar Drive TFX",{torque:"32 Ncm",chave:"Hex 1.20mm",type:"Pilar Protético",material:"Ti Grau 4"},[["1.5","TF-DRV-PAR-15"],["2.5","TF-DRV-PAR-25"],["3.5","TF-DRV-PAR-35"],["4.5","TF-DRV-PAR-45"]]) }]},
        unitariaCimentada: { subtypes: [{ key:"munhao", label:"Munhão Drive Cimentado", desc:"Munhão CM Drive para coroa cimentada", icon:"🦷", heights: gh("Munhão Drive TFX",{torque:"32 Ncm",chave:"Hex 1.20mm",type:"Munhão Cimentado",material:"Ti Grau 4"},[["1.5","TF-DRV-CIM-15"],["2.5","TF-DRV-CIM-25"],["3.5","TF-DRV-CIM-35"],["4.5","TF-DRV-CIM-45"]]) }]},
        fixaMultipla: { subtypes: [{ key:"mua", label:"Mini-Pilar Drive", desc:"Para próteses fixas múltiplas Titanium Fix CM", icon:"⚙️", heights: gh("Mini-Pilar Drive TFX",{torque:"15 Ncm",chave:"Hex 1.20mm",type:"Mini-Pilar Multi-Unit",material:"Ti Grau 4"},[["1.5","TF-DRV-MU-15"],["2.5","TF-DRV-MU-25"],["3.5","TF-DRV-MU-35"]]) }]},
      }},
      tfHI: { label: "Hexágono Interno (HI)", objectives: {
        unitariaParafusada: { subtypes: [{ key:"pilar", label:"Pilar HI Parafusado", desc:"Pilar HI para coroa unitária parafusada Titanium Fix", icon:"🔩", heights: gh("Pilar HI TFX",{torque:"25 Ncm",chave:"Hex 1.27mm",type:"Pilar Protético",material:"Ti Grau 4"},[["1.5","TF-HI-PAR-15"],["2.5","TF-HI-PAR-25"],["3.5","TF-HI-PAR-35"],["4.5","TF-HI-PAR-45"]]) }]},
        unitariaCimentada: { subtypes: [{ key:"munhao", label:"Munhão HI Cimentado", desc:"Munhão HI para coroa cimentada Titanium Fix", icon:"🦷", heights: gh("Munhão HI TFX",{torque:"25 Ncm",chave:"Hex 1.27mm",type:"Munhão Cimentado",material:"Ti Grau 4"},[["1.5","TF-HI-CIM-15"],["2.5","TF-HI-CIM-25"],["3.5","TF-HI-CIM-35"],["4.5","TF-HI-CIM-45"]]) }]},
        fixaMultipla: { subtypes: [{ key:"mua", label:"Mini-Pilar HI", desc:"Para próteses fixas múltiplas Titanium Fix HI", icon:"⚙️", heights: gh("Mini-Pilar HI TFX",{torque:"15 Ncm",chave:"Hex 1.27mm",type:"Mini-Pilar Multi-Unit",material:"Ti Grau 4"},[["1.5","TF-HI-MU-15"],["2.5","TF-HI-MU-25"],["3.5","TF-HI-MU-35"]]) }]},
      }},
      tfHE: { label: "Hexágono Externo (HE)", objectives: {
        unitariaParafusada: { subtypes: [{ key:"pilar", label:"Pilar HE Parafusado", desc:"Pilar HE para coroa unitária parafusada Titanium Fix", icon:"🔩", heights: gh("Pilar HE TFX",{torque:"20 Ncm",chave:"Hex 0.9mm",type:"Pilar Protético",material:"Ti Grau 4"},[["1.5","TF-HE-PAR-15"],["2.5","TF-HE-PAR-25"],["3.5","TF-HE-PAR-35"],["4.5","TF-HE-PAR-45"]]) }]},
        unitariaCimentada: { subtypes: [{ key:"munhao", label:"Munhão HE Cimentado", desc:"Munhão HE para coroa cimentada Titanium Fix", icon:"🦷", heights: gh("Munhão HE TFX",{torque:"20 Ncm",chave:"Hex 0.9mm",type:"Munhão Cimentado",material:"Ti Grau 4"},[["1.5","TF-HE-CIM-15"],["2.5","TF-HE-CIM-25"],["3.5","TF-HE-CIM-35"],["4.5","TF-HE-CIM-45"]]) }]},
        fixaMultipla: { subtypes: [{ key:"mua", label:"Mini-Pilar HE", desc:"Para próteses fixas múltiplas Titanium Fix HE", icon:"⚙️", heights: gh("Mini-Pilar HE TFX",{torque:"15 Ncm",chave:"Hex 0.9mm",type:"Mini-Pilar Multi-Unit",material:"Ti Grau 4"},[["1.5","TF-HE-MU-15"],["2.5","TF-HE-MU-25"],["3.5","TF-HE-MU-35"]]) }]},
      }},
    },
  },
  conexao: {
    label: "Conexão Sistemas de Prótese", logo: "CNX", color: "#f97316", site: "conexao.com.br",
    connections: {
      flashCM: { label: "Flash / Torq (Cone Morse)", objectives: {
        unitariaParafusada: { subtypes: [{ key:"pilar", label:"Pilar Flash CM Parafusado", desc:"Pilar CM Flash para coroa unitária parafusada", icon:"🔩", heights: gh("Pilar Flash CM Conexão",{torque:"30 Ncm",chave:"Hex 1.20mm",type:"Pilar Protético",material:"Ti Grau 4 Hard"},[["1.5","CNX-CM-PAR-15"],["2.5","CNX-CM-PAR-25"],["3.5","CNX-CM-PAR-35"],["4.5","CNX-CM-PAR-45"]]) }]},
        unitariaCimentada: { subtypes: [{ key:"munhao", label:"Munhão Flash CM Cimentado", desc:"Munhão CM Flash para coroa cimentada", icon:"🦷", heights: gh("Munhão Flash CM Conexão",{torque:"30 Ncm",chave:"Hex 1.20mm",type:"Munhão Cimentado",material:"Ti Grau 4 Hard"},[["1.5","CNX-CM-CIM-15"],["2.5","CNX-CM-CIM-25"],["3.5","CNX-CM-CIM-35"],["4.5","CNX-CM-CIM-45"]]) }]},
        fixaMultipla: { subtypes: [{ key:"mua", label:"Mini-Pilar Flash CM", desc:"Para próteses fixas múltiplas Conexão CM", icon:"⚙️", heights: gh("Mini-Pilar Flash CM Conexão",{torque:"15 Ncm",chave:"Hex 1.20mm",type:"Mini-Pilar Multi-Unit",material:"Ti Grau 4 Hard"},[["1.5","CNX-CM-MU-15"],["2.5","CNX-CM-MU-25"],["3.5","CNX-CM-MU-35"]]) }]},
      }},
      easyHE: { label: "Easy / Short (Hex. Externo)", objectives: {
        unitariaParafusada: { subtypes: [{ key:"pilar", label:"Pilar HE Easy Parafusado", desc:"Pilar HE Easy para coroa unitária parafusada", icon:"🔩", heights: gh("Pilar HE Conexão",{torque:"20 Ncm",chave:"Hex 0.9mm",type:"Pilar Protético",material:"Ti Grau 4 Hard"},[["1.5","CNX-HE-PAR-15"],["2.5","CNX-HE-PAR-25"],["3.5","CNX-HE-PAR-35"],["4.5","CNX-HE-PAR-45"]]) }]},
        unitariaCimentada: { subtypes: [{ key:"munhao", label:"Munhão HE Easy Cimentado", desc:"Munhão HE Easy para coroa cimentada", icon:"🦷", heights: gh("Munhão HE Conexão",{torque:"20 Ncm",chave:"Hex 0.9mm",type:"Munhão Cimentado",material:"Ti Grau 4 Hard"},[["1.5","CNX-HE-CIM-15"],["2.5","CNX-HE-CIM-25"],["3.5","CNX-HE-CIM-35"],["4.5","CNX-HE-CIM-45"]]) }]},
        fixaMultipla: { subtypes: [{ key:"mua", label:"Mini-Pilar HE Easy", desc:"Para próteses fixas múltiplas Conexão HE", icon:"⚙️", heights: gh("Mini-Pilar HE Conexão",{torque:"15 Ncm",chave:"Hex 0.9mm",type:"Mini-Pilar Multi-Unit",material:"Ti Grau 4 Hard"},[["1.5","CNX-HE-MU-15"],["2.5","CNX-HE-MU-25"],["3.5","CNX-HE-MU-35"]]) }]},
      }},
    },
  },
  arcsys: {
    label: "Arcsys / FGM", logo: "ARC", color: "#22c55e", site: "fgm.ind.br",
    connections: {
      arcsysCM: { label: "Cone Morse Indexado", objectives: {
        unitariaParafusada: { subtypes: [{ key:"pilar", label:"Pilar CM Arcsys Parafusado", desc:"Pilar CM indexado para coroa unitária parafusada", icon:"🔩", heights: gh("Pilar CM Arcsys",{torque:"30 Ncm",chave:"Hex 1.20mm",type:"Pilar Protético",material:"Ti Grau 4"},[["1.5","ARC-CM-PAR-15"],["2.5","ARC-CM-PAR-25"],["3.5","ARC-CM-PAR-35"],["4.5","ARC-CM-PAR-45"]]) }]},
        unitariaCimentada: { subtypes: [{ key:"munhao", label:"Munhão CM Arcsys Cimentado", desc:"Munhão CM indexado para coroa cimentada", icon:"🦷", heights: gh("Munhão CM Arcsys",{torque:"30 Ncm",chave:"Hex 1.20mm",type:"Munhão Cimentado",material:"Ti Grau 4"},[["1.5","ARC-CM-CIM-15"],["2.5","ARC-CM-CIM-25"],["3.5","ARC-CM-CIM-35"],["4.5","ARC-CM-CIM-45"]]) }]},
        fixaMultipla: { subtypes: [{ key:"mua", label:"Mini-Pilar CM Arcsys", desc:"Para próteses fixas múltiplas Arcsys CM", icon:"⚙️", heights: gh("Mini-Pilar CM Arcsys",{torque:"15 Ncm",chave:"Hex 1.20mm",type:"Mini-Pilar Multi-Unit",material:"Ti Grau 4"},[["1.5","ARC-CM-MU-15"],["2.5","ARC-CM-MU-25"],["3.5","ARC-CM-MU-35"]]) }]},
      }},
      arcsysHI: { label: "Hexágono Interno (HI)", objectives: {
        unitariaParafusada: { subtypes: [{ key:"pilar", label:"Pilar HI Arcsys Parafusado", desc:"Pilar HI para coroa unitária parafusada", icon:"🔩", heights: gh("Pilar HI Arcsys",{torque:"25 Ncm",chave:"Hex 1.27mm",type:"Pilar Protético",material:"Ti Grau 4"},[["1.5","ARC-HI-PAR-15"],["2.5","ARC-HI-PAR-25"],["3.5","ARC-HI-PAR-35"],["4.5","ARC-HI-PAR-45"]]) }]},
        unitariaCimentada: { subtypes: [{ key:"munhao", label:"Munhão HI Arcsys Cimentado", desc:"Munhão HI para coroa cimentada Arcsys", icon:"🦷", heights: gh("Munhão HI Arcsys",{torque:"25 Ncm",chave:"Hex 1.27mm",type:"Munhão Cimentado",material:"Ti Grau 4"},[["1.5","ARC-HI-CIM-15"],["2.5","ARC-HI-CIM-25"],["3.5","ARC-HI-CIM-35"],["4.5","ARC-HI-CIM-45"]]) }]},
        fixaMultipla: { subtypes: [{ key:"mua", label:"Mini-Pilar HI Arcsys", desc:"Para próteses fixas múltiplas Arcsys HI", icon:"⚙️", heights: gh("Mini-Pilar HI Arcsys",{torque:"15 Ncm",chave:"Hex 1.27mm",type:"Mini-Pilar Multi-Unit",material:"Ti Grau 4"},[["1.5","ARC-HI-MU-15"],["2.5","ARC-HI-MU-25"],["3.5","ARC-HI-MU-35"]]) }]},
      }},
    },
  },
  implacil: {
    label: "Implacil De Bortoli", logo: "IMP", color: "#e11d48", site: "implacil.com.br",
    connections: {
      maestroCM: { label: "Maestro (Cone Morse)", objectives: {
        unitariaParafusada: { subtypes: [{ key:"pilar", label:"Pilar Maestro CM Parafusado", desc:"Pilar CM Maestro para coroa unitária parafusada", icon:"🔩", heights: gh("Pilar Maestro CM Implacil",{torque:"25 Ncm",chave:"Hex 1.20mm",type:"Pilar Protético",material:"Ti Grau 4"},[["1.5","IDB-CM-PAR-15"],["2.5","IDB-CM-PAR-25"],["3.5","IDB-CM-PAR-35"],["4.5","IDB-CM-PAR-45"]]) }]},
        unitariaCimentada: { subtypes: [{ key:"munhao", label:"Pilar Ideale CM Cimentado", desc:"Pilar Ideale CM para coroa cimentada", icon:"🦷", heights: gh("Pilar Ideale CM Implacil",{torque:"25 Ncm",chave:"Hex 1.20mm",type:"Munhão Cimentado",material:"Ti Grau 4"},[["1.5","IDB-CM-CIM-15"],["2.5","IDB-CM-CIM-25"],["3.5","IDB-CM-CIM-35"],["4.5","IDB-CM-CIM-45"]]) }]},
        fixaMultipla: { subtypes: [{ key:"mua", label:"Mini-Pilar Maestro CM", desc:"Para próteses fixas múltiplas Implacil CM", icon:"⚙️", heights: gh("Mini-Pilar Maestro CM Implacil",{torque:"15 Ncm",chave:"Hex 1.20mm",type:"Mini-Pilar Multi-Unit",material:"Ti Grau 4"},[["1.5","IDB-CM-MU-15"],["2.5","IDB-CM-MU-25"],["3.5","IDB-CM-MU-35"]]) }]},
      }},
      implacilHI: { label: "Hexágono Interno (HI)", objectives: {
        unitariaParafusada: { subtypes: [{ key:"pilar", label:"Pilar HI Implacil Parafusado", desc:"Pilar HI para coroa unitária parafusada", icon:"🔩", heights: gh("Pilar HI Implacil",{torque:"25 Ncm",chave:"Hex 1.27mm",type:"Pilar Protético",material:"Ti Grau 4"},[["1.5","IDB-HI-PAR-15"],["2.5","IDB-HI-PAR-25"],["3.5","IDB-HI-PAR-35"],["4.5","IDB-HI-PAR-45"]]) }]},
        unitariaCimentada: { subtypes: [{ key:"munhao", label:"Munhão HI Implacil Cimentado", desc:"Munhão HI para coroa cimentada", icon:"🦷", heights: gh("Munhão HI Implacil",{torque:"25 Ncm",chave:"Hex 1.27mm",type:"Munhão Cimentado",material:"Ti Grau 4"},[["1.5","IDB-HI-CIM-15"],["2.5","IDB-HI-CIM-25"],["3.5","IDB-HI-CIM-35"],["4.5","IDB-HI-CIM-45"]]) }]},
        fixaMultipla: { subtypes: [{ key:"mua", label:"Mini-Pilar HI Implacil", desc:"Para próteses fixas múltiplas Implacil HI", icon:"⚙️", heights: gh("Mini-Pilar HI Implacil",{torque:"15 Ncm",chave:"Hex 1.27mm",type:"Mini-Pilar Multi-Unit",material:"Ti Grau 4"},[["1.5","IDB-HI-MU-15"],["2.5","IDB-HI-MU-25"],["3.5","IDB-HI-MU-35"]]) }]},
      }},
      implacilHE: { label: "Hexágono Externo (HE)", objectives: {
        unitariaParafusada: { subtypes: [{ key:"pilar", label:"Pilar HE Implacil Parafusado", desc:"Pilar HE para coroa unitária parafusada", icon:"🔩", heights: gh("Pilar HE Implacil",{torque:"20 Ncm",chave:"Hex 0.9mm",type:"Pilar Protético",material:"Ti Grau 4"},[["1.5","IDB-HE-PAR-15"],["2.5","IDB-HE-PAR-25"],["3.5","IDB-HE-PAR-35"],["4.5","IDB-HE-PAR-45"]]) }]},
        unitariaCimentada: { subtypes: [{ key:"munhao", label:"Munhão HE Implacil Cimentado", desc:"Munhão HE para coroa cimentada", icon:"🦷", heights: gh("Munhão HE Implacil",{torque:"20 Ncm",chave:"Hex 0.9mm",type:"Munhão Cimentado",material:"Ti Grau 4"},[["1.5","IDB-HE-CIM-15"],["2.5","IDB-HE-CIM-25"],["3.5","IDB-HE-CIM-35"],["4.5","IDB-HE-CIM-45"]]) }]},
        fixaMultipla: { subtypes: [{ key:"mua", label:"Mini-Pilar HE Implacil", desc:"Para próteses fixas múltiplas Implacil HE", icon:"⚙️", heights: gh("Mini-Pilar HE Implacil",{torque:"15 Ncm",chave:"Hex 0.9mm",type:"Mini-Pilar Multi-Unit",material:"Ti Grau 4"},[["1.5","IDB-HE-MU-15"],["2.5","IDB-HE-MU-25"],["3.5","IDB-HE-MU-35"]]) }]},
      }},
    },
  },
};

const DETECTIVE_STEPS = [
  {id:1,title:"Corpo do Implante",subtitle:"Qual é o formato geral do corpo?",icon:"🦷",options:[{value:"conico",label:"Cônico",desc:"Afila progressivamente da plataforma ao ápice",icon:"▽"},{value:"cilindrico",label:"Cilíndrico",desc:"Diâmetro uniforme ao longo do corpo",icon:"▭"}]},
  {id:2,title:"Pescoço / Cervical",subtitle:"Onde está o nível da plataforma protética?",icon:"🔬",options:[{value:"tissueLevel",label:"Tissue Level",desc:"Plataforma ao nível do tecido mole",icon:"↑"},{value:"boneLevel",label:"Bone Level",desc:"Plataforma ao nível ósseo",icon:"↓"}]},
  {id:3,title:"Roscas",subtitle:"Como são os filetes de rosca?",icon:"🔩",options:[{value:"ativas",label:"Ativas / Agressivas",desc:"Roscas espaçadas, profundas, cortantes",icon:"≋"},{value:"finas",label:"Finas / Compressivas",desc:"Roscas próximas, menor profundidade",icon:"≡"}]},
  {id:4,title:"Ápice / Ponta",subtitle:"Qual é a morfologia da ponta?",icon:"🔍",options:[{value:"arredondado",label:"Arredondado",desc:"Ponta arredondada, perfil suave",icon:"○"},{value:"plano",label:"Plano",desc:"Base plana, perfil reto",icon:"□"},{value:"fenda",label:"Com Fenda/Furo",desc:"Orifício apical ou fenda visível na RX",icon:"◎"}]},
  {id:5,title:"Plataforma Protética",subtitle:"Qual é o tipo de conexão?",icon:"⚙️",options:[{value:"HE",label:"Hex. Externo (HE)",desc:"Hexágono projetado acima da plataforma",icon:"⬡"},{value:"HI",label:"Hex. Interno (HI)",desc:"Hexágono encaixado internamente",icon:"⬢"},{value:"CM",label:"Cone Morse (CM)",desc:"Conexão cônica sem hexágono visível",icon:"◆"}]},
];

const COMPATIBLE_BRANDS = {
  HE:["Neodent HE","S.I.N. HE","Titanium Fix HE","Conexão Easy HE","Implacil HE","Nobel Brånemark","Osstem SS","Intraoss HE"],
  HI:["Neodent HI","S.I.N. HI","Titanium Fix HI","Arcsys HI","Implacil HI","Osstem TS III","Dentsply Xive","Intraoss HI"],
  CM:["Neodent GM","Neodent CM","S.I.N. CM","Titanium Fix Drive","Conexão Flash","Arcsys CM","Implacil Maestro","Intraoss CM","Nobel Active","Dentsply Ankylos"]
};

const BRAND_GROUPS = {
  nacional:{label:"🇧🇷 Nacionais",keys:["neodent","sin","intraoss","titaniumfix","conexao","arcsys","implacil"]},
  internacional:{label:"🌍 Internacionais",keys:["straumann","nobel","osstem","dentsply"]}
};

const OBJECTIVE_OPTIONS = [
  {key:"unitariaParafusada",label:"Unitária Parafusada",desc:"Coroa única fixada por parafuso",icon:"🔩"},
  {key:"unitariaCimentada",label:"Unitária Cimentada",desc:"Coroa única fixada por cimentação",icon:"🦷"},
  {key:"fixaMultipla",label:"Fixa / Múltipla",desc:"Prótese parcial fixa ou full arch",icon:"⚙️"}
];

const HEIGHT_DESCS = {
  "0.8":"Tecido muito fino — perfil subgengival mínimo",
  "1.0":"Tecido fino — GH 1mm (anterior / biótipo delgado)",
  "1.5":"Tecido fino — GH 1,5mm (anterior / biótipo delgado)",
  "2.0":"Tecido médio-fino — GH 2mm (padrão anterior)",
  "2.5":"Tecido médio — GH 2,5mm (padrão clínico mais frequente)",
  "3.0":"Tecido médio-espesso — GH 3mm (posterior / padrão)",
  "3.5":"Tecido espesso — GH 3,5mm (posterior / biótipo grosso)",
  "4.5":"Tecido muito espesso — GH 4,5mm (ganho ósseo / regeneração)"
};

// ── Shared card style — always fully visible, no animation opacity trick ──
const cardStyle = {
  width:"100%", borderRadius:13,
  background:"rgba(30,41,59,0.95)",
  border:"1px solid rgba(71,85,105,0.8)",
  cursor:"pointer", textAlign:"left",
  display:"flex", alignItems:"center", gap:12,
  transition:"all .16s ease", color:"white",
  padding:"13px 16px",
};

const G = {
  page:{minHeight:"100vh",display:"flex",flexDirection:"column",padding:"20px 16px 32px",gap:14,maxWidth:450,margin:"0 auto"},
  row:{display:"flex",alignItems:"center",gap:10},
  mono:{fontFamily:"monospace"},
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap');
  *{box-sizing:border-box}
  body{margin:0;background:#020617;font-family:'DM Sans',sans-serif;color:white}
  @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
  @keyframes sh{0%{background-position:-200% 0}100%{background-position:200% 0}}
  input{box-sizing:border-box;outline:none}
  input::placeholder{color:#94a3b8}
  ::-webkit-scrollbar{width:3px} ::-webkit-scrollbar-track{background:#0f172a} ::-webkit-scrollbar-thumb{background:#334155;border-radius:2px}
  button{font-family:'DM Sans',sans-serif;}
  .hov:hover{transform:translateY(-1px);filter:brightness(1.15);box-shadow:0 6px 20px rgba(59,130,246,.25)}
`;

function Sty() { return <style>{css}</style>; }

function Logo() {
  return (
    <div style={{position:"relative",width:64,height:64,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <svg style={{position:"absolute",animation:"spin 20s linear infinite"}} width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="28" fill="none" stroke="#1e40af" strokeWidth="1" strokeDasharray="4 3" opacity=".6"/>
      </svg>
      <div style={{width:44,height:44,borderRadius:12,background:"linear-gradient(135deg,#1e40af,#3b82f6)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 22px rgba(59,130,246,.4)"}}>
        <span style={{fontSize:13,fontWeight:800,color:"white",letterSpacing:-1}}>SG</span>
      </div>
    </div>
  );
}

function Back({onClick}) {
  return (
    <button onClick={onClick} style={{width:34,height:34,borderRadius:9,background:"rgba(30,41,59,0.9)",border:"1px solid #475569",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>
      <ChevronLeft size={15} color="#e2e8f0"/>
    </button>
  );
}

function Hdr({title,sub,color="#94a3b8",onBack}) {
  return (
    <div style={G.row}>
      <Back onClick={onBack}/>
      <div>
        <h2 style={{margin:0,fontSize:16,fontWeight:700,color:"white"}}>{title}</h2>
        {sub && <p style={{margin:0,fontSize:11,color}}>{sub}</p>}
      </div>
    </div>
  );
}

function Chip({label,color="#94a3b8"}) {
  return <span style={{fontSize:9,color,background:"rgba(30,41,59,0.9)",border:`1px solid ${color}55`,padding:"2px 7px",borderRadius:18}}>{label}</span>;
}

function InfoBox({color="#3b82f6",icon,children}) {
  return (
    <div style={{padding:"10px 12px",borderRadius:10,background:`${color}18`,border:`1px solid ${color}44`,display:"flex",gap:7}}>
      {icon}
      <p style={{margin:0,fontSize:11,color,lineHeight:1.5}}>{children}</p>
    </div>
  );
}

function Placeholder({label}) {
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",gap:5,alignItems:"center"}}>
      <div style={{width:90,height:90,borderRadius:12,background:"linear-gradient(135deg,#0f172a,#1e293b)",border:"1px solid rgba(59,130,246,.3)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3}}>
        <span style={{fontSize:22}}>🦷</span>
        <span style={{fontSize:8,color:"#94a3b8",textAlign:"center",padding:"0 5px",lineHeight:1.3}}>{label}</span>
      </div>
    </div>
  );
}

// SVG illustrations for each component shape type
function ImplantShape({shape, label, size=90}) {
  const S = size;
  const svgProps = {width:S,height:S,viewBox:"0 0 60 80"};
  const blue = "#3b82f6";
  const blueDark = "#1d4ed8";
  const blueLight = "#60a5fa";
  const bg = "#1e293b";

  const shapes = {
    // Variobase reto — cilíndrico com base cônica e canal de parafuso
    variobase: (
      <svg {...svgProps}>
        {/* corpo cilíndrico */}
        <rect x="19" y="8" width="22" height="30" rx="4" fill={blueDark}/>
        {/* canal do parafuso */}
        <rect x="25" y="10" width="10" height="24" rx="3" fill={bg}/>
        <line x1="30" y1="13" x2="30" y2="30" stroke={blueLight} strokeWidth="1.2" strokeDasharray="2,2"/>
        {/* perfil de emergência cônico */}
        <path d="M19,38 Q13,52 22,62 Q26,67 30,68 Q34,67 38,62 Q47,52 41,38 Z" fill={blue}/>
        {/* ombro */}
        <ellipse cx="30" cy="38" rx="11" ry="3.5" fill={blueDark}/>
        {/* topo */}
        <ellipse cx="30" cy="8" rx="11" ry="3" fill={blueLight} opacity=".8"/>
      </svg>
    ),
    // Variobase largo — mesmo mas mais largo na emergência
    variobase_wide: (
      <svg {...svgProps}>
        <rect x="18" y="8" width="24" height="28" rx="4" fill={blueDark}/>
        <rect x="24" y="10" width="12" height="22" rx="3" fill={bg}/>
        <line x1="30" y1="13" x2="30" y2="28" stroke={blueLight} strokeWidth="1.2" strokeDasharray="2,2"/>
        <path d="M18,36 Q10,50 20,63 Q25,68 30,69 Q35,68 40,63 Q50,50 42,36 Z" fill={blue}/>
        <ellipse cx="30" cy="36" rx="12" ry="3.5" fill={blueDark}/>
        <ellipse cx="30" cy="8" rx="12" ry="3" fill={blueLight} opacity=".8"/>
      </svg>
    ),
    // Pilar cimentável — cônico/afunilado sem canal de parafuso visível
    pilar_cim: (
      <svg {...svgProps}>
        {/* base de conexão */}
        <rect x="22" y="48" width="16" height="16" rx="3" fill={blueDark}/>
        <ellipse cx="30" cy="48" rx="8" ry="3" fill={blue}/>
        {/* corpo afunilado */}
        <path d="M22,48 L20,18 Q20,10 30,8 Q40,10 40,18 L38,48 Z" fill={blue}/>
        {/* topo arredondado */}
        <ellipse cx="30" cy="10" rx="9" ry="4" fill={blueLight} opacity=".9"/>
        {/* linha de demarcação */}
        <line x1="20" y1="28" x2="40" y2="28" stroke={blueLight} strokeWidth=".8" opacity=".5"/>
      </svg>
    ),
    // Pilar anatômico angulado
    pilar_ang: (
      <svg {...svgProps}>
        {/* base de conexão reta */}
        <rect x="21" y="52" width="18" height="14" rx="3" fill={blueDark}/>
        <ellipse cx="30" cy="52" rx="9" ry="3" fill={blue}/>
        {/* corpo angulado ~12° */}
        <path d="M21,52 L17,22 Q16,12 28,9 Q40,8 42,18 L39,52 Z" fill={blue}/>
        {/* canal do parafuso angulado */}
        <path d="M26,12 L24,44" stroke={bg} strokeWidth="6" strokeLinecap="round"/>
        <path d="M26,14 L24,42" stroke={blueLight} strokeWidth="1.2" strokeDasharray="2,2"/>
        {/* topo */}
        <ellipse cx="25" cy="10" rx="8" ry="3.5" fill={blueLight} opacity=".9" transform="rotate(-10,25,10)"/>
      </svg>
    ),
    // SRA / Multi-Unit — cilíndrico com hexágono na base
    sra: (
      <svg {...svgProps}>
        {/* hexágono de conexão */}
        <polygon points="30,72 39,67 39,57 30,52 21,57 21,67" fill={blueDark}/>
        <polygon points="30,68 37,64 37,59 30,55 23,59 23,64" fill={blue} opacity=".7"/>
        {/* corpo cilíndrico */}
        <rect x="23" y="14" width="14" height="38" rx="3" fill={blue}/>
        {/* canal do parafuso */}
        <rect x="26" y="16" width="8" height="28" rx="2" fill={bg}/>
        <line x1="30" y1="19" x2="30" y2="40" stroke={blueLight} strokeWidth="1.2" strokeDasharray="2,2"/>
        {/* topo */}
        <ellipse cx="30" cy="14" rx="7" ry="2.5" fill={blueLight} opacity=".9"/>
      </svg>
    ),
    // Cilindro calcinável — ponte/barra
    cilindro: (
      <svg {...svgProps}>
        {/* corpo tubular */}
        <rect x="20" y="10" width="20" height="56" rx="4" fill={blue}/>
        {/* canal central */}
        <rect x="24" y="13" width="12" height="48" rx="2" fill={bg}/>
        <line x1="30" y1="16" x2="30" y2="58" stroke={blueLight} strokeWidth="1.2" strokeDasharray="3,2"/>
        {/* topo e base */}
        <ellipse cx="30" cy="10" rx="10" ry="3" fill={blueLight} opacity=".9"/>
        <ellipse cx="30" cy="66" rx="10" ry="3" fill={blueDark}/>
        {/* ranhuras decorativas */}
        <line x1="20" y1="25" x2="40" y2="25" stroke={blueLight} strokeWidth=".8" opacity=".4"/>
        <line x1="20" y1="50" x2="40" y2="50" stroke={blueLight} strokeWidth=".8" opacity=".4"/>
      </svg>
    ),
  };

  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",gap:5,alignItems:"center"}}>
      <div style={{width:S,height:S,borderRadius:12,background:"linear-gradient(135deg,#0f172a,#1e293b)",border:"1px solid rgba(59,130,246,.35)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(59,130,246,.12)"}}>
        {shapes[shape] || shapes.variobase}
      </div>
      {label && <span style={{fontSize:8,color:"#94a3b8",textAlign:"center",lineHeight:1.3}}>{label}</span>}
    </div>
  );
}

function HomeScreen({go}) {
  return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"24px 16px",gap:24}}>
      <Sty/>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:22,maxWidth:420,width:"100%"}}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:11}}>
          <Logo/>
          <div style={{textAlign:"center"}}>
            <h1 style={{margin:0,fontSize:22,fontWeight:800,letterSpacing:-.5,color:"white"}}>Sartori<span style={{color:"#3b82f6"}}> Guide</span></h1>
            <p style={{margin:"3px 0 0",fontSize:9,fontWeight:600,letterSpacing:2,textTransform:"uppercase",background:"linear-gradient(90deg,#94a3b8,#e2e8f0,#94a3b8)",backgroundSize:"200% 100%",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"sh 3s linear infinite"}}>Implant Protocol System</p>
          </div>
        </div>
        <div style={{width:"100%",padding:"18px",borderRadius:16,background:"rgba(15,23,42,.8)",border:"1px solid rgba(59,130,246,.3)",textAlign:"center"}}>
          <div style={{fontSize:26,marginBottom:7}}>🔍</div>
          <h2 style={{margin:"0 0 5px",fontSize:16,fontWeight:700,color:"white"}}>Você conhece o implante instalado?</h2>
          <p style={{margin:0,fontSize:12,color:"#94a3b8"}}>Escolha o fluxo para encontrar o componente correto</p>
        </div>
        <div style={{width:"100%",display:"flex",flexDirection:"column",gap:9}}>
          <button className="hov" onClick={()=>go("brandSelect")} style={{width:"100%",padding:"15px 18px",borderRadius:13,border:"none",cursor:"pointer",background:"linear-gradient(135deg,#1d4ed8,#3b82f6)",display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 7px 20px rgba(59,130,246,.28)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:34,height:34,borderRadius:8,background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>🦷</div>
              <div style={{textAlign:"left"}}>
                <div style={{fontSize:10,fontWeight:700,color:"white",letterSpacing:.5,textTransform:"uppercase",marginBottom:1}}>Sou o Reabilitador</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.85)"}}>Já conheço o implante</div>
              </div>
            </div>
            <ArrowRight size={14} color="white"/>
          </button>
          <button className="hov" onClick={()=>go("detective")} style={{width:"100%",padding:"15px 18px",borderRadius:13,cursor:"pointer",background:"rgba(30,41,59,0.95)",border:"1px solid rgba(59,130,246,.5)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:34,height:34,borderRadius:8,background:"rgba(59,130,246,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>🔬</div>
              <div style={{textAlign:"left"}}>
                <div style={{fontSize:10,fontWeight:700,color:"#cbd5e1",letterSpacing:.5,textTransform:"uppercase",marginBottom:1}}>Sou o Investigador</div>
                <div style={{fontSize:11,color:"#94a3b8"}}>Não conheço o implante</div>
              </div>
            </div>
            <Search size={14} color="#94a3b8"/>
          </button>
        </div>
        <p style={{margin:0,fontSize:9,color:"#475569"}}>v3.0 · 12 marcas · 60+ conexões</p>
      </div>
    </div>
  );
}

function Detective({go}) {
  const [step,setStep] = useState(1);
  const [ans,setAns] = useState({});
  const [sel,setSel] = useState(null);
  const [done,setDone] = useState(false);
  const cur = DETECTIVE_STEPS[step-1];

  const pick = v => {
    setSel(v);
    setTimeout(()=>{
      const a = {...ans,[step]:v};
      setAns(a);
      if(step<5){setStep(step+1);setSel(null);}
      else setDone(true);
    },250);
  };

  if(done) {
    const ct = ans[5];
    const brands = COMPATIBLE_BRANDS[ct]||[];
    return (
      <div style={{...G.page}}>
        <Sty/>
        <button onClick={()=>{setDone(false);setStep(5);setSel(null);}} style={{display:"flex",alignItems:"center",gap:5,background:"none",border:"none",color:"#94a3b8",cursor:"pointer",padding:0,fontSize:11}}><ChevronLeft size={13}/>Rever</button>
        <div style={{padding:18,borderRadius:14,background:"rgba(16,185,129,.12)",border:"1px solid rgba(16,185,129,.4)"}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}><CheckCircle size={15} color="#10b981"/><span style={{fontWeight:700,color:"#10b981",fontSize:13}}>Análise Concluída</span></div>
          <p style={{margin:"0 0 3px",fontSize:10,color:"#94a3b8"}}>Conexão identificada:</p>
          <p style={{margin:"0 0 12px",fontSize:18,fontWeight:800,color:"white"}}>{ct==="HE"?"Hexágono Externo":ct==="HI"?"Hexágono Interno":"Cone Morse"}</p>
          <p style={{margin:"0 0 7px",fontSize:10,color:"#94a3b8"}}>Marcas possivelmente compatíveis:</p>
          {brands.map((b,i)=>(
            <div key={i} style={{padding:"8px 12px",borderRadius:8,background:"rgba(30,41,59,0.9)",border:"1px solid #475569",display:"flex",alignItems:"center",gap:7,marginBottom:5}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:"#10b981",flexShrink:0}}/>
              <span style={{color:"#e2e8f0",fontSize:12}}>{b}</span>
            </div>
          ))}
        </div>
        <InfoBox color="#f59e0b" icon={<AlertTriangle size={12} color="#f59e0b" style={{flexShrink:0,marginTop:1}}/>}>Confirme a compatibilidade com a documentação do paciente antes do procedimento.</InfoBox>
        <button onClick={()=>go("brandSelect")} style={{padding:"14px",borderRadius:12,border:"none",cursor:"pointer",background:"linear-gradient(135deg,#1d4ed8,#3b82f6)",color:"white",fontWeight:700,fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>Prosseguir para seleção <ArrowRight size={14}/></button>
        <button onClick={()=>go("home")} style={{padding:"11px",borderRadius:11,border:"1px solid #475569",cursor:"pointer",background:"rgba(30,41,59,0.9)",color:"#cbd5e1",fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",gap:5}}><Home size={11}/>Início</button>
      </div>
    );
  }

  return (
    <div style={G.page}>
      <Sty/>
      <div style={G.row}>
        <Back onClick={()=>step>1?(setStep(step-1),setSel(null)):go("home")}/>
        <div style={{flex:1}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
            <span style={{fontSize:9,color:"#94a3b8",fontWeight:600,letterSpacing:.5}}>ANÁLISE RADIOGRÁFICA</span>
            <span style={{...G.mono,fontSize:9,color:"#3b82f6",fontWeight:700}}>{step}/5</span>
          </div>
          <div style={{height:3,borderRadius:2,background:"#1e293b",overflow:"hidden"}}>
            <div style={{height:"100%",width:`${step/5*100}%`,background:"linear-gradient(90deg,#3b82f6,#60a5fa)",transition:"width .45s ease"}}/>
          </div>
        </div>
      </div>
      <div style={{textAlign:"center",padding:"12px 0"}}>
        <div style={{fontSize:36,marginBottom:7}}>{cur.icon}</div>
        <h2 style={{margin:"0 0 4px",fontSize:18,fontWeight:700,color:"white"}}>{cur.title}</h2>
        <p style={{margin:0,fontSize:12,color:"#94a3b8"}}>{cur.subtitle}</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {cur.options.map(o=>(
          <button key={o.value} onClick={()=>pick(o.value)} className="hov"
            style={{...cardStyle,background:sel===o.value?"rgba(59,130,246,.25)":"rgba(30,41,59,0.95)",border:`1px solid ${sel===o.value?"#3b82f6":"#475569"}`}}>
            <div style={{width:36,height:36,borderRadius:9,flexShrink:0,background:sel===o.value?"rgba(59,130,246,.3)":"rgba(51,65,85,0.8)",border:`1px solid ${sel===o.value?"#3b82f6":"#64748b"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,color:"white"}}>{o.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,color:"white",fontSize:13,marginBottom:2}}>{o.label}</div>
              <div style={{fontSize:10,color:"#94a3b8",lineHeight:1.4}}>{o.desc}</div>
            </div>
            {sel===o.value&&<CheckCircle size={14} color="#3b82f6"/>}
          </button>
        ))}
      </div>
      {step===5&&<InfoBox color="#3b82f6" icon={<Info size={11} color="#3b82f6" style={{flexShrink:0,marginTop:1}}/>}><strong>Passo decisivo:</strong> A plataforma protética define a compatibilidade mecânica final.</InfoBox>}
    </div>
  );
}

function BrandSelect({go,setBrand}) {
  const [q,setQ] = useState("");
  const all = Object.entries(IMPLANT_DB);
  const fil = q.trim() ? all.filter(([,b])=>b.label.toLowerCase().includes(q.toLowerCase())) : null;

  const Btn = ([key,b]) => (
    <button key={key} onClick={()=>{setBrand(key);go("connectionSelect");}} className="hov"
      style={{...cardStyle}}>
      <div style={{width:36,height:36,borderRadius:9,flexShrink:0,background:`${b.color}33`,border:`1px solid ${b.color}99`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,color:"white",fontFamily:"monospace",letterSpacing:-.5}}>{b.logo}</div>
      <div style={{flex:1}}>
        <div style={{fontWeight:700,color:"white",fontSize:13,marginBottom:2}}>{b.label}</div>
        <div style={{fontSize:10,color:"#94a3b8"}}>{Object.keys(b.connections).length} conexões</div>
      </div>
      <ChevronRight size={14} color="#94a3b8"/>
    </button>
  );

  return (
    <div style={G.page}>
      <Sty/>
      <Hdr title="Selecionar Marca" sub={`${all.length} marcas disponíveis`} onBack={()=>go("home")}/>
      <div style={{position:"relative"}}>
        <Search size={13} color="#94a3b8" style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)"}}/>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar marca..." style={{width:"100%",padding:"10px 11px 10px 32px",borderRadius:10,background:"rgba(30,41,59,0.9)",border:"1px solid #475569",color:"white",fontSize:12,fontFamily:"inherit"}}/>
      </div>
      {fil ? (
        <div style={{display:"flex",flexDirection:"column",gap:7}}>
          {fil.length===0
            ? <p style={{color:"#94a3b8",textAlign:"center",fontSize:12,margin:"14px 0"}}>Nenhuma marca encontrada.</p>
            : fil.map(Btn)
          }
        </div>
      ) : (
        Object.entries(BRAND_GROUPS).map(([gk,g])=>(
          <div key={gk}>
            <p style={{margin:"0 0 8px",fontSize:9,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:1}}>{g.label}</p>
            <div style={{display:"flex",flexDirection:"column",gap:7}}>{g.keys.map(k=>all.find(([key])=>key===k)).filter(Boolean).map(Btn)}</div>
          </div>
        ))
      )}
    </div>
  );
}

function ConnectionSelect({brand,go,setConnection}) {
  const bd = IMPLANT_DB[brand]; if(!bd) return null;
  return (
    <div style={G.page}>
      <Sty/>
      <Hdr title="Tipo de Conexão" sub={bd.label} color={bd.color} onBack={()=>go("brandSelect")}/>
      <div style={{display:"flex",flexWrap:"wrap",gap:4}}><Chip label={bd.label} color={bd.color}/></div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {Object.entries(bd.connections).map(([key,c])=>{
          const tot = Object.values(c.objectives).reduce((n,o)=>n+o.subtypes.length,0);
          return (
            <button key={key} onClick={()=>{setConnection(key);go("objectiveSelect");}} className="hov"
              style={{...cardStyle}}>
              <div style={{width:10,height:10,borderRadius:"50%",flexShrink:0,background:bd.color,boxShadow:`0 0 6px ${bd.color}`}}/>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,color:"white",fontSize:13}}>{c.label}</div>
                <div style={{fontSize:10,color:"#94a3b8",marginTop:2}}>{tot} componentes</div>
              </div>
              <ChevronRight size={14} color="#94a3b8"/>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ObjectiveSelect({brand,connection,go,setObjective,goNext}) {
  const conn = IMPLANT_DB[brand]?.connections?.[connection];
  return (
    <div style={G.page}>
      <Sty/>
      <Hdr title="Objetivo Protético" sub="O que será reabilitado?" onBack={()=>go("connectionSelect")}/>
      <div style={{display:"flex",flexWrap:"wrap",gap:4}}><Chip label={IMPLANT_DB[brand]?.label}/><Chip label={conn?.label}/></div>
      <div style={{display:"flex",flexDirection:"column",gap:9}}>
        {OBJECTIVE_OPTIONS.map((obj)=>{
          const allSts = conn?.objectives?.[obj.key]?.subtypes||[];
          const n = conn?.isTLX ? (allSts.filter(s=>s.plat==="RT").length) : allSts.length;
          return (
            <button key={obj.key} onClick={()=>{setObjective(obj.key);goNext(obj.key);}} className="hov"
              style={{...cardStyle,padding:"16px"}}>
              <div style={{fontSize:22,width:40,height:40,borderRadius:10,background:"rgba(51,65,85,0.8)",border:"1px solid #64748b",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{obj.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,color:"white",fontSize:13,marginBottom:3}}>{obj.label}</div>
                <div style={{fontSize:10,color:"#94a3b8"}}>{obj.desc}</div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{fontSize:8,color:"#64748b",marginBottom:2}}>OPÇÕES</div>
                <div style={{fontSize:16,fontWeight:800,color:"#3b82f6"}}>{n}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Tela exclusiva TLX: escolha de plataforma NT / RT / WT ──────────────────
const TLX_PLATFORMS = [
  { key:"NT", label:"NT — Narrow TorcFit™", diam:"∅ 3,5 mm", desc:"Implantes de diâmetro reduzido. Plataforma protética NT. Chave AS 046.786.", color:"#818cf8", dot:"•" },
  { key:"RT", label:"RT — Regular TorcFit™", diam:"∅ 4,8 mm", desc:"Plataforma regular — indicação mais ampla. Chave AS 046.787.", color:"#3b82f6", dot:"••" },
  { key:"WT", label:"WT — Wide TorcFit™",   diam:"∅ 6,5 mm", desc:"Plataforma larga para implantes de maior diâmetro. Chave AS 046.788.", color:"#06b6d4", dot:"•••" },
];

function TLXPlatformSelect({brand,connection,objective,go,setTlxPlatform}) {
  const conn = IMPLANT_DB[brand]?.connections?.[connection];
  const objLabel = OBJECTIVE_OPTIONS.find(o=>o.key===objective)?.label;
  return (
    <div style={G.page}>
      <Sty/>
      <Hdr title="Plataforma TLX" sub="Selecione o pescoço do implante" color="#3b82f6" onBack={()=>go("objectiveSelect")}/>
      <div style={{display:"flex",flexWrap:"wrap",gap:4}}><Chip label="Straumann"/><Chip label="TorcFit TLX"/><Chip label={objLabel}/></div>
      <InfoBox color="#3b82f6" icon={<Info size={11} color="#3b82f6" style={{flexShrink:0,marginTop:1}}/>}>
        Verifique a marcação a laser no implante: <strong style={{color:"white"}}>NT (1 ponto) · RT (2 pontos) · WT (3 pontos)</strong>. Nunca misture pilares de plataformas diferentes.
      </InfoBox>
      <div style={{display:"flex",flexDirection:"column",gap:9}}>
        {TLX_PLATFORMS.map((p)=>(
          <button key={p.key} onClick={()=>{setTlxPlatform(p.key);go("subtypeSelect");}} className="hov"
            style={{...cardStyle,padding:"16px",border:`1px solid ${p.color}55`}}>
            <div style={{width:44,height:44,borderRadius:11,background:`${p.color}22`,border:`1px solid ${p.color}66`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0,gap:2}}>
              <span style={{fontSize:10,color:p.color,fontWeight:800,letterSpacing:1}}>{p.key}</span>
              <span style={{fontSize:9,color:p.color,opacity:.7}}>{p.dot}</span>
            </div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,color:"white",fontSize:13,marginBottom:2}}>{p.label}</div>
              <div style={{fontWeight:800,color:p.color,fontSize:12,marginBottom:3}}>{p.diam}</div>
              <div style={{fontSize:10,color:"#94a3b8",lineHeight:1.4}}>{p.desc}</div>
            </div>
            <ChevronRight size={14} color="#475569"/>
          </button>
        ))}
      </div>
    </div>
  );
}

function SubtypeSelect({brand,connection,objective,tlxPlatform,go,setSubtype}) {
  const conn = IMPLANT_DB[brand]?.connections?.[connection];
  const isTLX = !!conn?.isTLX;
  const allSts = conn?.objectives?.[objective]?.subtypes||[];
  // Para TLX filtra pela plataforma selecionada; para outros sistemas mostra todos
  const sts = isTLX ? allSts.filter(s=>s.plat===tlxPlatform) : allSts;
  const objLabel = OBJECTIVE_OPTIONS.find(o=>o.key===objective)?.label;
  const backScreen = isTLX ? "tlxPlatform" : "objectiveSelect";

  const platInfo = isTLX ? TLX_PLATFORMS.find(p=>p.key===tlxPlatform) : null;

  // Se só há 1 subtipo, ainda mostra a tela (não pula) para que o Back funcione
  return (
    <div style={G.page}>
      <Sty/>
      <Hdr title="Tipo de Componente" sub={platInfo ? `${platInfo.label} · ${objLabel}` : objLabel} onBack={()=>go(backScreen)}/>
      <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
        <Chip label={IMPLANT_DB[brand]?.label}/>
        <Chip label={conn?.label}/>
        {platInfo && <Chip label={`${tlxPlatform} ${platInfo.diam}`} color={platInfo.color}/>}
        <Chip label={objLabel}/>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:9}}>
        {sts.map((st)=>(
          <button key={st.key} onClick={()=>{setSubtype(st.key);go("result");}} className="hov"
            style={{...cardStyle,padding:"16px"}}>
            <div style={{fontSize:21,width:40,height:40,borderRadius:10,background:"rgba(51,65,85,0.8)",border:"1px solid #64748b",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{st.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,color:"white",fontSize:13,marginBottom:3}}>{st.label}</div>
              <div style={{fontSize:10,color:"#94a3b8",lineHeight:1.4}}>{st.desc}</div>
            </div>
            <ChevronRight size={14} color="#475569" style={{flexShrink:0}}/>
          </button>
        ))}
      </div>
      {!isTLX && <InfoBox color="#3b82f6" icon={<Layers size={11} color="#3b82f6" style={{flexShrink:0,marginTop:1}}/>}>Cada opção possui variações de altura gengival — você escolherá na próxima etapa.</InfoBox>}
    </div>
  );
}

function GengivalHeight({brand,connection,objective,subtype,go,setGengivalHeight}) {
  const conn = IMPLANT_DB[brand]?.connections?.[connection];
  const sts = conn?.objectives?.[objective]?.subtypes||[];
  const st = sts.find(s=>s.key===subtype)||sts[0];
  const heights = st ? Object.keys(st.heights) : [];
  const objLabel = OBJECTIVE_OPTIONS.find(o=>o.key===objective)?.label;
  const backScreen = "subtypeSelect";
  return (
    <div style={G.page}>
      <Sty/>
      <Hdr title="Altura Gengival" sub={`${st?.label||""} · ${objLabel||""}`} color="#10b981" onBack={()=>go(backScreen)}/>
      <div style={{display:"flex",flexWrap:"wrap",gap:4}}><Chip label={IMPLANT_DB[brand]?.label}/><Chip label={conn?.label}/><Chip label={st?.label} color="#10b981"/></div>
      <InfoBox color="#10b981" icon={<Info size={11} color="#10b981" style={{flexShrink:0,marginTop:1}}/>}>Meça a espessura do tecido mole com sonda periodontal para escolher a altura gengival ideal.</InfoBox>
      <div style={{display:"flex",flexDirection:"column",gap:7}}>
        {heights.map((h)=>(
          <button key={h} onClick={()=>{setGengivalHeight(h);go("result");}} className="hov"
            style={{...cardStyle}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0,width:18}}>
              <div style={{width:4,height:Math.round(parseFloat(h)*7)+8,minHeight:8,borderRadius:2,background:"linear-gradient(180deg,#10b981,#059669)"}}/>
            </div>
            <div style={{flex:1}}>
              <span style={{...G.mono,fontSize:15,fontWeight:800,color:"white"}}>{h.replace(".",",")} mm</span>
              <p style={{margin:"2px 0 0",fontSize:10,color:"#94a3b8",lineHeight:1.4}}>{HEIGHT_DESCS[h]||""}</p>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <div style={{fontSize:8,color:"#64748b",marginBottom:1}}>REF.</div>
              <div style={{...G.mono,fontSize:9,color:"#60a5fa"}}>{st?.heights?.[h]?.sku||"—"}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Result({brand,connection,objective,subtype,gengivalHeight,tlxPlatform,go,reset}) {
  const [added,setAdded] = useState(false);
  const bd = IMPLANT_DB[brand];
  const conn = bd?.connections?.[connection];
  const isTLX = !!conn?.isTLX;
  const sts = conn?.objectives?.[objective]?.subtypes||[];
  const st = sts.find(s=>s.key===subtype)||sts[0];
  // Para TLX usa sempre a chave "unico"; para outros usa gengivalHeight
  const heightKey = isTLX ? "unico" : gengivalHeight;
  const comp = st?.heights?.[heightKey];
  const platInfo = isTLX ? TLX_PLATFORMS.find(p=>p.key===tlxPlatform) : null;
  // Back: TLX volta para subtypeSelect (lista de componentes da plataforma); outros voltam para gengivalHeight
  const backScreen = isTLX ? "subtypeSelect" : "gengivalHeight";

  if(!comp||!bd) return (
    <div style={{padding:20,color:"white"}}>
      <p>Componente não encontrado.</p>
      <button onClick={reset} style={{color:"#3b82f6",background:"none",border:"none",cursor:"pointer"}}>↩ Recomeçar</button>
    </div>
  );
  return (
    <div style={G.page}>
      <Sty/>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <Back onClick={()=>go(backScreen)}/>
        <span style={{fontSize:9,color:"#10b981",fontWeight:700,textTransform:"uppercase",letterSpacing:.8}}>✓ Componente Encontrado</span>
        <button onClick={reset} style={{width:34,height:34,borderRadius:9,background:"rgba(30,41,59,0.9)",border:"1px solid #475569",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><RotateCcw size={12} color="#e2e8f0"/></button>
      </div>
      <div style={{borderRadius:16,padding:"18px",background:"rgba(30,41,59,0.95)",border:"1px solid rgba(59,130,246,.4)",boxShadow:"0 16px 44px rgba(0,0,0,.5)"}}>
        <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:13}}>
          <div style={{padding:"3px 8px",borderRadius:6,background:`${bd.color}33`,border:`1px solid ${bd.color}77`}}><span style={{fontSize:9,fontWeight:700,color:"white"}}>{bd.label}</span></div>
          <div style={{padding:"3px 8px",borderRadius:6,background:"rgba(51,65,85,0.8)",border:"1px solid #64748b"}}><span style={{fontSize:9,color:"#cbd5e1"}}>{conn?.label}</span></div>
          {platInfo
            ? <div style={{padding:"3px 8px",borderRadius:6,background:`${platInfo.color}22`,border:`1px solid ${platInfo.color}66`}}><span style={{...G.mono,fontSize:9,color:platInfo.color,fontWeight:700}}>{platInfo.key} {platInfo.diam}</span></div>
            : <div style={{padding:"3px 8px",borderRadius:6,background:"rgba(16,185,129,.2)",border:"1px solid rgba(16,185,129,.5)"}}><span style={{...G.mono,fontSize:9,color:"#10b981",fontWeight:700}}>↕ {gengivalHeight?.replace(".",",")}mm</span></div>
          }
        </div>
        <div style={{fontSize:8,color:"#94a3b8",fontWeight:600,letterSpacing:.5,textTransform:"uppercase",marginBottom:3}}>{comp.type}</div>
        <h3 style={{margin:"0 0 7px",fontSize:14,fontWeight:700,color:"white",lineHeight:1.3}}>{comp.name}</h3>
        <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:14}}>
          <span style={{fontSize:8,color:"#94a3b8"}}>REF.</span>
          <span style={{...G.mono,fontSize:11,fontWeight:600,color:"#60a5fa",background:"rgba(59,130,246,.15)",padding:"2px 6px",borderRadius:5}}>{comp.sku}</span>
        </div>
        <div style={{display:"flex",gap:9,marginBottom:14}}>
          <ImplantShape shape={comp.shape || "variobase"} label="Componente Protético" size={90}/>
          <Placeholder label="Scan Body / Transfer"/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
          <div style={{padding:"11px",borderRadius:9,background:"rgba(245,158,11,.12)",border:"1px solid rgba(245,158,11,.4)"}}>
            <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:4}}><Zap size={9} color="#f59e0b"/><span style={{fontSize:8,color:"#fcd34d",fontWeight:700,textTransform:"uppercase"}}>Torque</span></div>
            <span style={{...G.mono,fontSize:16,fontWeight:800,color:"#f59e0b"}}>{comp.torque}</span>
          </div>
          <div style={{padding:"11px",borderRadius:9,background:"rgba(59,130,246,.12)",border:"1px solid rgba(59,130,246,.4)"}}>
            <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:4}}><Shield size={9} color="#60a5fa"/><span style={{fontSize:8,color:"#93c5fd",fontWeight:700,textTransform:"uppercase"}}>Chave</span></div>
            <span style={{...G.mono,fontSize:12,fontWeight:800,color:"#60a5fa"}}>{comp.chave}</span>
          </div>
          <div style={{padding:"11px",borderRadius:9,background:"rgba(51,65,85,0.8)",border:"1px solid #64748b",gridColumn:"span 2",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontSize:8,color:"#94a3b8",fontWeight:700,textTransform:"uppercase",marginBottom:2}}>Material</div><span style={{fontSize:10,color:"#cbd5e1"}}>{comp.material}</span></div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:8,color:"#94a3b8",fontWeight:700,textTransform:"uppercase",marginBottom:2}}>{platInfo?"Plataforma":"Alt. Gengival"}</div>
              <span style={{...G.mono,fontSize:11,fontWeight:700,color:platInfo?platInfo.color:"#10b981"}}>
                {platInfo ? `${platInfo.key} ${platInfo.diam}` : `${gengivalHeight?.replace(".",",")} mm`}
              </span>
            </div>
          </div>
        </div>
      </div>
      <button onClick={()=>{setAdded(true);setTimeout(()=>setAdded(false),2500);}}
        style={{padding:"14px",borderRadius:12,border:"none",cursor:"pointer",background:added?"linear-gradient(135deg,#059669,#10b981)":"linear-gradient(135deg,#1d4ed8,#3b82f6)",color:"white",fontWeight:700,fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",gap:7,transition:"all .35s ease"}}>
        {added?<><CheckCircle size={14}/>Adicionado!</>:<><ShoppingCart size={14}/>Adicionar ao Pedido</>}
      </button>
      <a href={`https://${bd.site}`} target="_blank" rel="noopener noreferrer"
        style={{padding:"11px",borderRadius:11,border:"1px solid #475569",color:"#cbd5e1",fontWeight:600,fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",gap:6,textDecoration:"none",background:"rgba(30,41,59,0.9)"}}>
        <ExternalLink size={11}/>Ver no site do fabricante
      </a>
    </div>
  );
}

export default function App() {
  const [screen,setScreen] = useState("home");
  const [brand,setBrand] = useState(null);
  const [connection,setConnection] = useState(null);
  const [objective,setObjective] = useState(null);
  const [tlxPlatform,setTlxPlatform] = useState(null);
  const [subtype,setSubtype] = useState(null);
  const [gengivalHeight,setGengivalHeight] = useState(null);
  const go = s => setScreen(s);
  const reset = () => { setBrand(null);setConnection(null);setObjective(null);setTlxPlatform(null);setSubtype(null);setGengivalHeight(null);go("home"); };

  // Ao trocar objective, detecta se é TLX e redireciona para seleção de plataforma
  const goObjective = (obj) => {
    const isTLX = !!IMPLANT_DB[brand]?.connections?.[connection]?.isTLX;
    if(isTLX){ go("tlxPlatform"); } else { go("subtypeSelect"); }
  };

  const screens = {
    home: <HomeScreen go={go}/>,
    detective: <Detective go={go}/>,
    brandSelect: <BrandSelect go={go} setBrand={setBrand}/>,
    connectionSelect: <ConnectionSelect brand={brand} go={go} setConnection={setConnection}/>,
    objectiveSelect: <ObjectiveSelect brand={brand} connection={connection} go={go} setObjective={setObjective} goNext={goObjective}/>,
    tlxPlatform: <TLXPlatformSelect brand={brand} connection={connection} objective={objective} go={go} setTlxPlatform={setTlxPlatform}/>,
    subtypeSelect: <SubtypeSelect brand={brand} connection={connection} objective={objective} tlxPlatform={tlxPlatform} go={go} setSubtype={setSubtype}/>,
    gengivalHeight: <GengivalHeight brand={brand} connection={connection} objective={objective} subtype={subtype} go={go} setGengivalHeight={setGengivalHeight}/>,
    result: <Result brand={brand} connection={connection} objective={objective} subtype={subtype} gengivalHeight={gengivalHeight} tlxPlatform={tlxPlatform} go={go} reset={reset}/>,
  };

  return <div style={{background:"#020617",minHeight:"100vh",color:"white"}}>{screens[screen]||screens.home}</div>;
}
