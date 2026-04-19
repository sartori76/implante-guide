import { useState, useEffect } from "react";
import {
  ChevronRight, CheckCircle,
  ExternalLink, Zap, Shield, Home, ArrowRight,
  Info, AlertTriangle, Search
} from "lucide-react";

// ─── Helper ──────────────────────────────────────────────────────────────────
function gh(baseName, baseInfo, pairs) {
  const out = {};
  pairs.forEach(([h, sku]) => {
    out[h] = { name: `${baseName} GH ${h.replace(".", ",")}mm`, sku, torque: baseInfo.torque, chave: baseInfo.chave, type: baseInfo.type, material: baseInfo.material, shape: baseInfo.shape || "variobase" };
  });
  return out;
}

// ─── BASE DE DADOS ────────────────────────────────────────────────────────────
const DB = {
  straumann: {
    label: "Straumann", logo: "STR", color: "#3b82f6", site: "straumann.com.br",
    families: {
      boneLevel: {
        label: "Bone Level", desc: "Implante de nível ósseo — plataforma ao nível da crista óssea", icon: "🦴",
        lines: {
          blblt: {
            label: "BL / BLT", desc: "Bone Level e Bone Level Tapered — conexão CrossFit® (RC)", icon: "⬡", connection: "CrossFit® RC",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Componente: Variobase® — coroa parafusada ou cimentada", icon: "🦷",
                subtypes: [
                  { key: "variobase_rc", label: "Variobase® RC", icon: "⬡", desc: "Base universal para coroa parafusada CAD/CAM. ∅ emergência 4,5 mm ou 5 mm. Parafuso SCS incluso.", heights: gh("Variobase RC", { torque: "35 Ncm", chave: "SCS 1.25mm", type: "Variobase", material: "Ti Grau 5", shape: "variobase" }, [["1.0", "022.0026"], ["2.0", "022.0107"], ["3.0", "022.0109"]]) },
                  { key: "pilar_rc", label: "Pilar Anatômico RC (0° / 15°)", icon: "↗", desc: "Pilar anatômico parafusado — corrige angulação 0° ou 15°. Chave SCS.", heights: gh("Pilar Anatômico RC 0°", { torque: "35 Ncm", chave: "SCS 1.25mm", type: "Pilar Anatômico RC", material: "Ti Grau 5", shape: "pilar_ang" }, [["2.0", "022.4102"], ["3.5", "022.4104"]]) },
                  { key: "pilar_cim_rc", label: "Pilar Cimentável RC", icon: "🪝", desc: "Pilar cimentável com perfil anatômico. ∅ 5mm ou 6,5mm. Chave SCS.", heights: gh("Pilar Cimentável RC ∅5mm", { torque: "35 Ncm", chave: "SCS 1.25mm", type: "Pilar Cimentável RC", material: "Ti Grau 5", shape: "pilar_cim" }, [["1.0", "022.4321"], ["2.0", "022.4322"], ["3.0", "022.4323"]]) },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "Componente: SRA — Screw-Retained Abutment para próteses fixas unidas", icon: "🦷🦷",
                subtypes: [
                  { key: "sra_rc", label: "SRA RC — Screw-Retained Abutment", icon: "⬢", desc: "Pilar SRA para próteses fixas múltiplas parafusadas. Disponível em 0°, 17° e 30°.", heights: gh("SRA RC 0°", { torque: "15 Ncm", chave: "SCS 1.25mm", type: "SRA Multi-Unit RC", material: "Ti Grau 5", shape: "sra" }, [["1.5", "022.0132S"], ["2.5", "022.0133S"], ["3.5", "022.0134S"]]) },
                ]
              },
            }
          },
          blxblc: {
            label: "BLX / BLC", desc: "Bone Level Xtend e Bone Level Xtend Conical — conexão TorcFit®", icon: "⭐", connection: "TorcFit® BLX",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Componente: Variobase® BLX — coroa parafusada ou cimentada", icon: "🦷",
                subtypes: [
                  { key: "vb_blx_38", label: "Variobase® BLX ∅3,8mm", icon: "⬡", imgRef: "/variobase_blx.jpg", desc: "Variobase BLX perfil fino — implantes RB e WB (∅3,5–6,5mm). Ideal para carga imediata.", heights: gh("Variobase BLX ∅3,8mm", { torque: "35 Ncm", chave: "SCS 1.25mm", type: "Variobase BLX", material: "Ti Grau 5", shape: "variobase" }, [["1.5", "062.4934"], ["2.5", "062.4935"], ["3.5", "062.4936"]]) },
                  { key: "vb_blx_45", label: "Variobase® BLX ∅4,5mm", icon: "⬡", imgRef: "/variobase_blx.jpg", desc: "Variobase BLX perfil largo — maior perfil de emergência. Para implantes RB e WB.", heights: gh("Variobase BLX ∅4,5mm", { torque: "35 Ncm", chave: "SCS 1.25mm", type: "Variobase BLX", material: "Ti Grau 5", shape: "variobase_wide" }, [["1.5", "062.4944"], ["2.5", "062.4945"], ["3.5", "062.4946"]]) },
                  { key: "pilar_blx", label: "Pilar Anatômico BLX (0° / 17°)", icon: "↗", desc: "Pilar anatômico BLX — corrige angulação 0° ou 17°. ∅ emergência 3,8mm.", heights: gh("Pilar Anatômico BLX 0°", { torque: "35 Ncm", chave: "SCS 1.25mm", type: "Pilar Anatômico BLX", material: "Ti Grau 5", shape: "pilar_ang" }, [["2.5", "062.4103"], ["3.5", "062.4104"]]) },
                  { key: "vb_blxc", label: "Variobase® BLX C (Cimentado)", icon: "🪝", imgRef: "/variobase_blx.jpg", desc: "Variobase BLX C para restaurações cimentadas — ∅4,5mm.", heights: gh("Variobase BLX C ∅4,5mm", { torque: "35 Ncm", chave: "SCS 1.25mm", type: "Variobase BLX Cimentado", material: "Ti Grau 5", shape: "pilar_cim" }, [["1.5", "062.4961"]]) },
                  { key: "vb_blx_as", label: "Variobase® AS BLX ∅4,5mm", icon: "↗", imgRef: "/variobase_as.jpg", desc: "Variobase BLX com acesso angulado (AS) — ∅4,5mm RB/WB. Acompanha parafuso SCS.", heights: { "1.5": { name: "Variobase AS BLX ∅4,5mm", sku: "062.4972", torque: "35 Ncm", chave: "SCS 1.25mm", type: "Variobase BLX AS", material: "Ti Grau 5 (Roxolid®)", shape: "pilar_ang" } } },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "Componente: SRA BLX — Screw-Retained Abutment para próteses fixas unidas", icon: "🦷🦷",
                subtypes: [
                  { key: "sra_blx", label: "SRA BLX — Screw-Retained Abutment", icon: "⬢", desc: "Pilar SRA BLX para próteses fixas múltiplas. Disponível em 0°, 17° e 30°.", heights: gh("SRA BLX 0°", { torque: "15 Ncm", chave: "SCS 1.25mm", type: "SRA Multi-Unit BLX", material: "Ti Grau 5", shape: "sra" }, [["1.5", "062.4722S"], ["2.5", "062.4723S"], ["3.5", "062.4724S"], ["4.5", "062.4725S"]]) },
                ]
              },
            }
          },
          sc: {
            label: "SC (Small CrossFit™)", desc: "Implante de diâmetro reduzido ∅2,9mm — conexão Small CrossFit® (SC). Cimentada ou parafusada.", icon: "💎", connection: "Small CrossFit® SC",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Pilar Variobase® SC — para próteses unitárias. Acompanha parafuso 025.0031.", icon: "🦷",
                subtypes: [
                  { key: "vb_sc", label: "Pilar Variobase® SC", icon: "⬡", desc: "Variobase SC para prótese unitária cimentada ou parafusada. ∅2,9mm. Acompanha parafuso 025.0031.", heights: gh("Variobase SC", { torque: "35 Ncm", chave: "SCS 1.25mm", type: "Variobase SC", material: "Ti Grau 5", shape: "variobase" }, [["1.0", "022.0038"], ["2.0", "022.0039"], ["3.0", "022.0040"]]) },
                ]
              },
            }
          },
        }
      },
      tissueLevel: {
        label: "Tissue Level", desc: "Implante de nível gengival — colar transmucoso integrado ao implante", icon: "🫧",
        lines: {
          tl: {
            label: "TL (Tissue Level clássico)", desc: "Tissue Level RN — conexão SynOcta® (∅4,8mm). Colar transmucoso 1,8mm.", icon: "⬡", connection: "SynOcta® RN",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Componente: Variobase® TL — coroa parafusada ou cimentada", icon: "🦷",
                subtypes: [
                  { key: "vb_tl", label: "Variobase® TL RN", icon: "⬡", desc: "Variobase para Tissue Level RN (∅4,8mm) — perfil transmucoso integrado. Chave AS 046.787.", heights: gh("Variobase TL RN", { torque: "35 Ncm", chave: "Chave AS 046.787", type: "Variobase TL", material: "Ti Grau 5", shape: "variobase" }, [["1.5", "048.601"]]) },
                  { key: "pilar_tl_ang", label: "Pilar Angulado TL 15°", icon: "↗", desc: "Pilar angulado para Tissue Level RN — tipo A (aresta) ou tipo B (face livre). Chave AS.", heights: gh("Pilar Angulado TL 15° RN", { torque: "35 Ncm", chave: "Chave AS 046.787", type: "Pilar Angulado TL", material: "Ti Grau 5", shape: "pilar_ang" }, [["1.5", "048.612"]]) },
                  { key: "pilar_tl_cim", label: "Pilar Cimentado TL RN", icon: "🪝", desc: "Pilar cimentado para Tissue Level RN — AP 5,5mm. Chave SCS.", heights: gh("Pilar Cimentado TL RN", { torque: "35 Ncm", chave: "SCS 1.25mm", type: "Pilar Cimentado TL", material: "Ti Grau 5", shape: "pilar_cim" }, [["1.5", "048.605"]]) },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "Componente: Cilindro Calcinável — para próteses fixas unidas/ponte/barra", icon: "🦷🦷",
                subtypes: [
                  { key: "cil_tl", label: "Cilindro Calcinável Ponte/Barra TL RN", icon: "⬢", desc: "Para próteses fixas múltiplas parafusadas — AP 3,5mm. Chave SCS.", heights: gh("Cilindro Ponte/Barra TL RN", { torque: "15 Ncm", chave: "SCS 1.25mm", type: "Cilindro Ponte/Barra TL", material: "Ti Grau 5", shape: "cilindro" }, [["1.5", "048.381"]]) },
                ]
              },
            }
          },
          tlx: {
            label: "TLX / TLC (Tissue Level Xtend)", desc: "Tissue Level Xtend — conexão TorcFit®. Plataformas NT, RT e WT.", icon: "⭐", connection: "TorcFit® TLX", isTLX: true,
            tlxPlatforms: [
              { key: "NT", label: "NT — Narrow TorcFit™", diam: "∅ 3,5 mm", desc: "Implantes de diâmetro reduzido. Chave AS 046.786.", color: "#818cf8", dot: "•" },
              { key: "RT", label: "RT — Regular TorcFit™", diam: "∅ 4,8 mm", desc: "Plataforma regular — indicação mais ampla. Chave AS 046.787.", color: "#3b82f6", dot: "••" },
              { key: "WT", label: "WT — Wide TorcFit™", diam: "∅ 6,5 mm", desc: "Plataforma larga para implantes de maior diâmetro. Chave AS 046.788.", color: "#06b6d4", dot: "•••" },
            ],
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Componente: Variobase® TLX — coroa parafusada ou cimentada", icon: "🦷",
                subtypes: [
                  { key: "vb_tlx_NT", plat: "NT", label: "Variobase® para Coroa", icon: "⬡", desc: "Variobase parafusada — NT ∅3,5mm. Roxolid®. Torque 35 Ncm.", heights: { "unico": { name: "Variobase TLX Coroa NT", sku: "037.0201", torque: "35 Ncm", chave: "Chave AS 046.786", type: "Variobase TLX NT", material: "Ti Grau 5 (Roxolid®)", shape: "variobase" } } },
                  { key: "vb_tlx_AS_NT", plat: "NT", label: "Variobase® para Coroa AS", icon: "↗", desc: "Variobase com acesso angulado — NT ∅3,5mm.", heights: { "unico": { name: "Variobase TLX Coroa AS NT", sku: "037.0203", torque: "35 Ncm", chave: "Chave AS 046.786", type: "Variobase TLX NT (AS)", material: "Ti Grau 5 (Roxolid®)", shape: "pilar_ang" } } },
                  { key: "pt_tlx_NT", plat: "NT", label: "Pilar Temporário para Coroa", icon: "🕐", desc: "Pilar provisório — NT ∅3,5mm.", heights: { "unico": { name: "Pilar Temporário TLX NT", sku: "037.0000", torque: "35 Ncm", chave: "Chave AS 046.786", type: "Pilar Temporário TLX NT", material: "Ti Grau 5", shape: "pilar_ang" } } },
                  { key: "vb_tlx_RT", plat: "RT", label: "Variobase® para Coroa", icon: "⬡", desc: "Variobase parafusada — RT ∅4,8mm. Roxolid®. Torque 35 Ncm.", heights: { "unico": { name: "Variobase TLX Coroa RT", sku: "037.1201", torque: "35 Ncm", chave: "Chave AS 046.787", type: "Variobase TLX RT", material: "Ti Grau 5 (Roxolid®)", shape: "variobase" } } },
                  { key: "vb_tlx_AS_RT", plat: "RT", label: "Variobase® para Coroa AS", icon: "↗", desc: "Variobase com acesso angulado — RT ∅4,8mm.", heights: { "unico": { name: "Variobase TLX Coroa AS RT", sku: "037.1203", torque: "35 Ncm", chave: "Chave AS 046.787", type: "Variobase TLX RT (AS)", material: "Ti Grau 5 (Roxolid®)", shape: "pilar_ang" } } },
                  { key: "pt_tlx_RT", plat: "RT", label: "Pilar Temporário para Coroa", icon: "🕐", desc: "Pilar provisório — RT ∅4,8mm.", heights: { "unico": { name: "Pilar Temporário TLX RT", sku: "037.1000", torque: "35 Ncm", chave: "Chave AS 046.787", type: "Pilar Temporário TLX RT", material: "Ti Grau 5", shape: "pilar_ang" } } },
                  { key: "vb_tlx_WT", plat: "WT", label: "Variobase® para Coroa", icon: "⬡", desc: "Variobase parafusada — WT ∅6,5mm. Roxolid®. Torque 35 Ncm.", heights: { "unico": { name: "Variobase TLX Coroa WT", sku: "037.2201", torque: "35 Ncm", chave: "Chave AS 046.788", type: "Variobase TLX WT", material: "Ti Grau 5 (Roxolid®)", shape: "variobase_wide" } } },
                  { key: "vb_tlx_AS_WT", plat: "WT", label: "Variobase® para Coroa AS", icon: "↗", desc: "Variobase com acesso angulado — WT ∅6,5mm.", heights: { "unico": { name: "Variobase TLX Coroa AS WT", sku: "037.2203", torque: "35 Ncm", chave: "Chave AS 046.788", type: "Variobase TLX WT (AS)", material: "Ti Grau 5 (Roxolid®)", shape: "pilar_ang" } } },
                  { key: "pt_tlx_WT", plat: "WT", label: "Pilar Temporário para Coroa", icon: "🕐", desc: "Pilar provisório — WT ∅6,5mm.", heights: { "unico": { name: "Pilar Temporário TLX WT", sku: "037.2000", torque: "35 Ncm", chave: "Chave AS 046.788", type: "Pilar Temporário TLX WT", material: "Ti Grau 5", shape: "pilar_ang" } } },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "Componente: Variobase® TLX para Múltipla ou Cilindro Calcinável", icon: "🦷🦷",
                subtypes: [
                  { key: "vb_tlx_ponte_NT", plat: "NT", label: "Variobase® para Múltipla/Ponte", icon: "⬢", desc: "Variobase para prótese fixa múltipla — NT ∅3,5mm.", heights: { "unico": { name: "Variobase TLX Múltipla NT", sku: "037.0204", torque: "35 Ncm", chave: "Chave AS 046.786", type: "Variobase TLX NT Multi-Unit", material: "Ti Grau 5 (Roxolid®)", shape: "sra" } } },
                  { key: "cil_tlx_NT", plat: "NT", label: "Cilindro Calcinável Múltipla/Ponte", icon: "🔥", desc: "Cilindro calcinável para múltipla/ponte — NT ∅3,5mm.", heights: { "unico": { name: "Cilindro Calcinável TLX NT", sku: "037.0213 / 037.0213V4", torque: "15 Ncm", chave: "Chave AS 046.786", type: "Cilindro Calcinável TLX NT", material: "Plástico calcinável", shape: "cilindro" } } },
                  { key: "vb_tlx_ponte_RT", plat: "RT", label: "Variobase® para Múltipla/Ponte", icon: "⬢", desc: "Variobase para prótese fixa múltipla — RT ∅4,8mm.", heights: { "unico": { name: "Variobase TLX Múltipla RT", sku: "037.1204", torque: "35 Ncm", chave: "Chave AS 046.787", type: "Variobase TLX RT Multi-Unit", material: "Ti Grau 5 (Roxolid®)", shape: "sra" } } },
                  { key: "cil_tlx_RT", plat: "RT", label: "Cilindro Calcinável Múltipla/Ponte", icon: "🔥", desc: "Cilindro calcinável para múltipla/ponte — RT ∅4,8mm.", heights: { "unico": { name: "Cilindro Calcinável TLX RT", sku: "037.1213 / 037.1213V4", torque: "15 Ncm", chave: "Chave AS 046.787", type: "Cilindro Calcinável TLX RT", material: "Plástico calcinável", shape: "cilindro" } } },
                  { key: "vb_tlx_ponte_WT", plat: "WT", label: "Variobase® para Múltipla/Ponte", icon: "⬢", desc: "Variobase para prótese fixa múltipla — WT ∅6,5mm.", heights: { "unico": { name: "Variobase TLX Múltipla WT", sku: "037.2204", torque: "35 Ncm", chave: "Chave AS 046.788", type: "Variobase TLX WT Multi-Unit", material: "Ti Grau 5 (Roxolid®)", shape: "sra" } } },
                  { key: "cil_tlx_WT", plat: "WT", label: "Cilindro Calcinável Múltipla/Ponte", icon: "🔥", desc: "Cilindro calcinável para múltipla/ponte — WT ∅6,5mm.", heights: { "unico": { name: "Cilindro Calcinável TLX WT", sku: "037.2213 / 037.2213V4", torque: "15 Ncm", chave: "Chave AS 046.788", type: "Cilindro Calcinável TLX WT", material: "Plástico calcinável", shape: "cilindro" } } },
                ]
              },
            }
          },
        }
      },
    }
  },
  neodent: {
    label: "Neodent", logo: "NEO", color: "#10b981", site: "neodent.com.br",
    families: {
      gm: {
        label: "Grand Morse (GM)", desc: "Conexão cônica morse de alto engajamento — implante mais vendido do Brasil", icon: "🏆",
        lines: {
          gm_main: {
            label: "Grand Morse", desc: "Conexão Grand Morse — torque 32 Ncm. Chave Neo 1.20mm.", icon: "⬡", connection: "Grand Morse",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Componente: Pilar GM ou Munhão — coroa parafusada ou cimentada", icon: "🦷",
                subtypes: [
                  { key: "pilar_gm", label: "Pilar GM Universal", icon: "🔩", desc: "Pilar padrão para coroa unitária parafusada.", heights: gh("Pilar GM", { torque: "32 Ncm", chave: "Neo 1.20mm", type: "Pilar Protético", material: "Ti Grau 4", shape: "variobase" }, [["0.8", "120.120"], ["1.5", "120.130"], ["2.5", "120.140"], ["3.5", "120.150"], ["4.5", "120.160"]]) },
                  { key: "micro_gm", label: "Micro-Pilar GM", icon: "🔬", desc: "Plataforma reduzida — espaço estreito ou estética crítica.", heights: gh("Micro-Pilar GM", { torque: "25 Ncm", chave: "Neo 1.20mm", type: "Micro-Pilar", material: "Ti Grau 4", shape: "variobase" }, [["0.8", "120.220"], ["1.5", "120.230"], ["2.5", "120.240"], ["3.5", "120.250"]]) },
                  { key: "munhao_gm", label: "Munhão GM (Cimentado)", icon: "🪝", desc: "Munhão para coroa unitária cimentada.", heights: gh("Munhão GM", { torque: "32 Ncm", chave: "Neo 1.20mm", type: "Munhão Cimentado", material: "Ti Grau 4", shape: "pilar_cim" }, [["0.8", "120.121"], ["1.5", "120.131"], ["2.5", "120.141"], ["3.5", "120.151"], ["4.5", "120.161"]]) },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "Componente: Mini-Pilar GM ou MUA — próteses fixas unidas", icon: "🦷🦷",
                subtypes: [
                  { key: "mini_gm", label: "Mini-Pilar GM", icon: "⚙️", desc: "Para próteses fixas múltiplas parafusadas.", heights: gh("Mini-Pilar GM", { torque: "15 Ncm", chave: "Neo 1.20mm", type: "Mini-Pilar Multi-Unit", material: "Ti Grau 4", shape: "sra" }, [["0.8", "120.132"], ["1.5", "120.133"], ["2.5", "120.134"], ["3.5", "120.135"]]) },
                  { key: "mua_gm", label: "Multi-Unit Abutment GM", icon: "⬢", desc: "MUA reto/angulado para barra protocolo e híbridas.", heights: gh("MUA GM", { torque: "15 Ncm", chave: "Neo 1.20mm", type: "Multi-Unit Abutment", material: "Ti Grau 4", shape: "sra" }, [["1.5", "120.172"], ["2.5", "120.173"], ["3.5", "120.174"]]) },
                ]
              },
            }
          }
        }
      },
      cm: {
        label: "Cone Morse (CM)", desc: "Conexão cônica morse — implante Drive CM", icon: "🔺",
        lines: {
          cm_main: {
            label: "Cone Morse", desc: "Conexão Cone Morse Neodent — torque 30 Ncm. Chave Hex 1.20mm.", icon: "⬡", connection: "Cone Morse",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Componente: Pilar CM ou Munhão — coroa parafusada ou cimentada", icon: "🦷",
                subtypes: [
                  { key: "pilar_cm", label: "Pilar CM Universal", icon: "🔩", desc: "Pilar cônico morse para coroa unitária parafusada.", heights: gh("Pilar CM", { torque: "30 Ncm", chave: "Hex 1.20mm", type: "Pilar Protético", material: "Ti Grau 4", shape: "variobase" }, [["0.8", "110.230"], ["1.5", "110.234"], ["2.5", "110.238"], ["3.5", "110.242"], ["4.5", "110.246"]]) },
                  { key: "munhao_cm", label: "Munhão CM (Cimentado)", icon: "🪝", desc: "Munhão cônico morse para coroa unitária cimentada.", heights: gh("Munhão CM", { torque: "30 Ncm", chave: "Hex 1.20mm", type: "Munhão Cimentado", material: "Ti Grau 4", shape: "pilar_cim" }, [["0.8", "110.231"], ["1.5", "110.235"], ["2.5", "110.239"], ["3.5", "110.243"], ["4.5", "110.247"]]) },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "Componente: Mini-Pilar CM — próteses fixas unidas", icon: "🦷🦷",
                subtypes: [
                  { key: "mini_cm", label: "Mini-Pilar CM", icon: "⚙️", desc: "Para próteses múltiplas parafusadas — sistema CM.", heights: gh("Mini-Pilar CM", { torque: "15 Ncm", chave: "Hex 1.20mm", type: "Mini-Pilar Multi-Unit", material: "Ti Grau 4", shape: "sra" }, [["1.5", "110.236"], ["2.5", "110.237"], ["3.5", "110.240"]]) },
                ]
              },
            }
          }
        }
      },
      he: {
        label: "Hexágono Externo (HE)", desc: "Conexão hexágono externo — implante tradicional", icon: "⬡",
        lines: {
          he_main: {
            label: "Hexágono Externo", desc: "Conexão HE Neodent — torque 20 Ncm. Chave Hex 0.9mm.", icon: "⬡", connection: "Hexágono Externo",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Componente: Pilar HE ou Munhão — coroa parafusada ou cimentada", icon: "🦷",
                subtypes: [
                  { key: "pilar_he", label: "Pilar HE Universal", icon: "🔩", desc: "Pilar hexágono externo para coroa unitária parafusada.", heights: gh("Pilar HE", { torque: "20 Ncm", chave: "Hex 0.9mm", type: "Pilar Protético", material: "Ti Grau 4", shape: "variobase" }, [["1.5", "105.010"], ["2.5", "105.014"], ["3.5", "105.018"], ["4.5", "105.022"]]) },
                  { key: "munhao_he", label: "Munhão HE (Cimentado)", icon: "🪝", desc: "Munhão hexágono externo para coroa cimentada.", heights: gh("Munhão HE", { torque: "20 Ncm", chave: "Hex 0.9mm", type: "Munhão Cimentado", material: "Ti Grau 4", shape: "pilar_cim" }, [["1.5", "105.011"], ["2.5", "105.015"], ["3.5", "105.019"], ["4.5", "105.023"]]) },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "Componente: Mini-Pilar HE — próteses fixas unidas", icon: "🦷🦷",
                subtypes: [
                  { key: "mini_he", label: "Mini-Pilar HE", icon: "⚙️", desc: "Para próteses fixas múltiplas — sistema HE.", heights: gh("Mini-Pilar HE", { torque: "15 Ncm", chave: "Hex 0.9mm", type: "Mini-Pilar Multi-Unit", material: "Ti Grau 4", shape: "sra" }, [["1.5", "105.012"], ["2.5", "105.016"], ["3.5", "105.020"]]) },
                ]
              },
            }
          }
        }
      },
    }
  },
  sin: {
    label: "S.I.N. Implant System", logo: "SIN", color: "#a855f7", site: "sinimplantsystem.com.br",
    families: {
      sinCM: {
        label: "Cone Morse (CM 16°)", desc: "Conexão cônica 16° — torque 20 Ncm. Chave Hex 1.20mm.", icon: "◆",
        lines: {
          sinCM_main: {
            label: "Cone Morse 16°", desc: "Cone Morse 16° S.I.N. — torque 20 Ncm. Hex 1.20mm.", icon: "◆", connection: "Cone Morse 16°",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Pilar CM parafusado ou Abutment cimentado", icon: "🦷",
                subtypes: [
                  { key: "pilar", label: "Pilar CM S.I.N.", icon: "🔩", desc: "Pilar cônico 16° para coroa unitária parafusada", heights: gh("Pilar CM S.I.N.", { torque: "20 Ncm", chave: "Hex 1.20mm", type: "Pilar Protético", material: "Ti Grau 4", shape: "variobase" }, [["1.5", "AUMP-4501C"], ["2.5", "AUMP-4502C"], ["3.5", "AUMP-4503C"], ["4.5", "AUMP-4504C"]]) },
                  { key: "munhao", label: "Abutment CM Cimentado S.I.N.", icon: "🪝", desc: "Abutment cônico cimentado com perfil emergência anatômico", heights: gh("Abutment CM Cim. S.I.N.", { torque: "20 Ncm", chave: "Hex 1.20mm", type: "Munhão Cimentado", material: "Ti Grau 4", shape: "pilar_cim" }, [["1.5", "AIMP-4501C"], ["2.5", "AIMP-4502C"], ["3.5", "AIMP-4503C"], ["4.5", "AIMP-4504C"]]) },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "Mini-Pilar CM para próteses fixas múltiplas", icon: "🦷🦷",
                subtypes: [
                  { key: "mua", label: "Mini-Pilar CM S.I.N.", icon: "⚙️", desc: "Para próteses fixas múltiplas — sistema CM S.I.N.", heights: gh("Mini-Pilar CM S.I.N.", { torque: "15 Ncm", chave: "Hex 1.20mm", type: "Mini-Pilar Multi-Unit", material: "Ti Grau 4", shape: "sra" }, [["1.5", "MAMU-4501C"], ["2.5", "MAMU-4502C"], ["3.5", "MAMU-4503C"]]) },
                ]
              },
            }
          }
        }
      },
      sinHI: {
        label: "Hexágono Interno (HI)", desc: "Conexão HI — torque 25 Ncm. Chave Hex 1.27mm.", icon: "⬢",
        lines: {
          sinHI_main: {
            label: "Hexágono Interno", desc: "HI S.I.N. — torque 25 Ncm. Hex 1.27mm.", icon: "⬢", connection: "Hexágono Interno",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Pilar HI parafusado ou Abutment cimentado", icon: "🦷",
                subtypes: [
                  { key: "pilar", label: "Pilar HI S.I.N.", icon: "🔩", desc: "Pilar HI para coroa unitária parafusada", heights: gh("Pilar HI S.I.N.", { torque: "25 Ncm", chave: "Hex 1.27mm", type: "Pilar Protético", material: "Ti Grau 4", shape: "variobase" }, [["1.5", "PHI-RP-15"], ["2.5", "PHI-RP-25"], ["3.5", "PHI-RP-35"], ["4.5", "PHI-RP-45"]]) },
                  { key: "munhao", label: "Abutment HI Cimentado S.I.N.", icon: "🪝", desc: "Abutment HI para coroa cimentada", heights: gh("Abutment HI Cim. S.I.N.", { torque: "25 Ncm", chave: "Hex 1.27mm", type: "Munhão Cimentado", material: "Ti Grau 4", shape: "pilar_cim" }, [["1.5", "PHI-CIM-15"], ["2.5", "PHI-CIM-25"], ["3.5", "PHI-CIM-35"], ["4.5", "PHI-CIM-45"]]) },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "Mini-Pilar HI para próteses fixas múltiplas", icon: "🦷🦷",
                subtypes: [
                  { key: "mua", label: "Mini-Pilar HI S.I.N.", icon: "⚙️", desc: "Para próteses fixas múltiplas — HI S.I.N.", heights: gh("Mini-Pilar HI S.I.N.", { torque: "15 Ncm", chave: "Hex 1.27mm", type: "Mini-Pilar Multi-Unit", material: "Ti Grau 4", shape: "sra" }, [["1.5", "MUA-HI-15"], ["2.5", "MUA-HI-25"], ["3.5", "MUA-HI-35"]]) },
                ]
              },
            }
          }
        }
      },
      sinHE: {
        label: "Hexágono Externo (HE)", desc: "Conexão HE — torque 20 Ncm. Chave Hex 0.9mm.", icon: "⬡",
        lines: {
          sinHE_main: {
            label: "Hexágono Externo", desc: "HE S.I.N. — torque 20 Ncm. Hex 0.9mm.", icon: "⬡", connection: "Hexágono Externo",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Pilar HE parafusado ou Abutment cimentado", icon: "🦷",
                subtypes: [
                  { key: "pilar", label: "Pilar HE S.I.N.", icon: "🔩", desc: "Pilar HE para coroa unitária parafusada", heights: gh("Pilar HE S.I.N.", { torque: "20 Ncm", chave: "Hex 0.9mm", type: "Pilar Protético", material: "Ti Grau 4", shape: "variobase" }, [["1.5", "PHE-RP-15"], ["2.5", "PHE-RP-25"], ["3.5", "PHE-RP-35"], ["4.5", "PHE-RP-45"]]) },
                  { key: "munhao", label: "Abutment HE Cimentado S.I.N.", icon: "🪝", desc: "Abutment HE para coroa cimentada", heights: gh("Abutment HE Cim. S.I.N.", { torque: "20 Ncm", chave: "Hex 0.9mm", type: "Munhão Cimentado", material: "Ti Grau 4", shape: "pilar_cim" }, [["1.5", "PHE-CIM-15"], ["2.5", "PHE-CIM-25"], ["3.5", "PHE-CIM-35"], ["4.5", "PHE-CIM-45"]]) },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "Mini-Pilar HE para próteses fixas múltiplas", icon: "🦷🦷",
                subtypes: [
                  { key: "mua", label: "Mini-Pilar HE S.I.N.", icon: "⚙️", desc: "Para próteses fixas múltiplas — HE S.I.N.", heights: gh("Mini-Pilar HE S.I.N.", { torque: "15 Ncm", chave: "Hex 0.9mm", type: "Mini-Pilar Multi-Unit", material: "Ti Grau 4", shape: "sra" }, [["1.5", "MUA-HE-15"], ["2.5", "MUA-HE-25"], ["3.5", "MUA-HE-35"]]) },
                ]
              },
            }
          }
        }
      },
    }
  },
  intraoss: {
    label: "Intraoss", logo: "INT", color: "#14b8a6", site: "intraoss.com.br",
    families: {
      intraossCM: {
        label: "Cone Morse (CM)", desc: "Conexão CM — torque 30 Ncm. Chave Hex 1.20mm.", icon: "◆",
        lines: {
          intraossCM_main: {
            label: "Cone Morse", desc: "CM Intraoss — torque 30 Ncm. Hex 1.20mm.", icon: "◆", connection: "Cone Morse",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Pilar CM parafusado ou Munhão cimentado", icon: "🦷",
                subtypes: [
                  { key: "pilar", label: "Pilar CM Parafusado", icon: "🔩", desc: "Pilar CM para coroa unitária parafusada Intraoss", heights: gh("Pilar CM Intraoss", { torque: "30 Ncm", chave: "Hex 1.20mm", type: "Pilar Protético", material: "Ti Grau 4", shape: "variobase" }, [["1.5", "IOS-CM-PAR-15"], ["2.5", "IOS-CM-PAR-25"], ["3.5", "IOS-CM-PAR-35"], ["4.5", "IOS-CM-PAR-45"]]) },
                  { key: "munhao", label: "Munhão CM Cimentado", icon: "🪝", desc: "Munhão CM para coroa unitária cimentada", heights: gh("Munhão CM Intraoss", { torque: "30 Ncm", chave: "Hex 1.20mm", type: "Munhão Cimentado", material: "Ti Grau 4", shape: "pilar_cim" }, [["1.5", "IOS-CM-CIM-15"], ["2.5", "IOS-CM-CIM-25"], ["3.5", "IOS-CM-CIM-35"], ["4.5", "IOS-CM-CIM-45"]]) },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "Mini-Pilar CM para próteses fixas múltiplas", icon: "🦷🦷",
                subtypes: [
                  { key: "mua", label: "Mini-Pilar CM Intraoss", icon: "⚙️", desc: "Para próteses fixas múltiplas Intraoss CM", heights: gh("Mini-Pilar CM Intraoss", { torque: "15 Ncm", chave: "Hex 1.20mm", type: "Mini-Pilar Multi-Unit", material: "Ti Grau 4", shape: "sra" }, [["1.5", "IOS-CM-MU-15"], ["2.5", "IOS-CM-MU-25"], ["3.5", "IOS-CM-MU-35"]]) },
                ]
              },
            }
          }
        }
      },
      intraossHE: {
        label: "Hexágono Externo (HE)", desc: "Conexão HE — torque 20 Ncm. Chave Hex 0.9mm.", icon: "⬡",
        lines: {
          intraossHE_main: {
            label: "Hexágono Externo", desc: "HE Intraoss — torque 20 Ncm. Hex 0.9mm.", icon: "⬡", connection: "Hexágono Externo",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Pilar HE parafusado ou Munhão cimentado", icon: "🦷",
                subtypes: [
                  { key: "pilar", label: "Pilar HE Parafusado", icon: "🔩", desc: "Pilar HE para coroa unitária parafusada Intraoss", heights: gh("Pilar HE Intraoss", { torque: "20 Ncm", chave: "Hex 0.9mm", type: "Pilar Protético", material: "Ti Grau 4", shape: "variobase" }, [["1.5", "IOS-HE-PAR-15"], ["2.5", "IOS-HE-PAR-25"], ["3.5", "IOS-HE-PAR-35"], ["4.5", "IOS-HE-PAR-45"]]) },
                  { key: "munhao", label: "Munhão HE Cimentado", icon: "🪝", desc: "Munhão HE para coroa cimentada Intraoss", heights: gh("Munhão HE Intraoss", { torque: "20 Ncm", chave: "Hex 0.9mm", type: "Munhão Cimentado", material: "Ti Grau 4", shape: "pilar_cim" }, [["1.5", "IOS-HE-CIM-15"], ["2.5", "IOS-HE-CIM-25"], ["3.5", "IOS-HE-CIM-35"], ["4.5", "IOS-HE-CIM-45"]]) },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "Mini-Pilar HE para próteses fixas múltiplas", icon: "🦷🦷",
                subtypes: [
                  { key: "mua", label: "Mini-Pilar HE Intraoss", icon: "⚙️", desc: "Para próteses fixas múltiplas Intraoss HE", heights: gh("Mini-Pilar HE Intraoss", { torque: "15 Ncm", chave: "Hex 0.9mm", type: "Mini-Pilar Multi-Unit", material: "Ti Grau 4", shape: "sra" }, [["1.5", "IOS-HE-MU-15"], ["2.5", "IOS-HE-MU-25"], ["3.5", "IOS-HE-MU-35"]]) },
                ]
              },
            }
          }
        }
      },
    }
  },
  titaniumfix: {
    label: "Titanium Fix", logo: "TFX", color: "#8b5cf6", site: "titaniumfix.com.br",
    families: {
      tfCM: {
        label: "Cone Morse Drive", desc: "Conexão CM Drive — torque 32 Ncm. Chave Hex 1.20mm.", icon: "◆",
        lines: {
          tfCM_main: {
            label: "Cone Morse Drive", desc: "CM Drive TFX — torque 32 Ncm. Hex 1.20mm.", icon: "◆", connection: "Cone Morse Drive",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Pilar Drive parafusado ou Munhão cimentado", icon: "🦷",
                subtypes: [
                  { key: "pilar", label: "Pilar Drive Parafusado", icon: "🔩", desc: "Pilar CM Drive para coroa unitária parafusada", heights: gh("Pilar Drive TFX", { torque: "32 Ncm", chave: "Hex 1.20mm", type: "Pilar Protético", material: "Ti Grau 4", shape: "variobase" }, [["1.5", "TF-DRV-PAR-15"], ["2.5", "TF-DRV-PAR-25"], ["3.5", "TF-DRV-PAR-35"], ["4.5", "TF-DRV-PAR-45"]]) },
                  { key: "munhao", label: "Munhão Drive Cimentado", icon: "🪝", desc: "Munhão CM Drive para coroa cimentada", heights: gh("Munhão Drive TFX", { torque: "32 Ncm", chave: "Hex 1.20mm", type: "Munhão Cimentado", material: "Ti Grau 4", shape: "pilar_cim" }, [["1.5", "TF-DRV-CIM-15"], ["2.5", "TF-DRV-CIM-25"], ["3.5", "TF-DRV-CIM-35"], ["4.5", "TF-DRV-CIM-45"]]) },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "Mini-Pilar Drive para próteses fixas múltiplas", icon: "🦷🦷",
                subtypes: [
                  { key: "mua", label: "Mini-Pilar Drive TFX", icon: "⚙️", desc: "Para próteses fixas múltiplas Titanium Fix CM", heights: gh("Mini-Pilar Drive TFX", { torque: "15 Ncm", chave: "Hex 1.20mm", type: "Mini-Pilar Multi-Unit", material: "Ti Grau 4", shape: "sra" }, [["1.5", "TF-DRV-MU-15"], ["2.5", "TF-DRV-MU-25"], ["3.5", "TF-DRV-MU-35"]]) },
                ]
              },
            }
          }
        }
      },
      tfHI: {
        label: "Hexágono Interno (HI)", desc: "Conexão HI — torque 25 Ncm. Chave Hex 1.27mm.", icon: "⬢",
        lines: {
          tfHI_main: {
            label: "Hexágono Interno", desc: "HI TFX — torque 25 Ncm. Hex 1.27mm.", icon: "⬢", connection: "Hexágono Interno",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Pilar HI parafusado ou Munhão cimentado", icon: "🦷",
                subtypes: [
                  { key: "pilar", label: "Pilar HI Parafusado", icon: "🔩", desc: "Pilar HI para coroa unitária parafusada Titanium Fix", heights: gh("Pilar HI TFX", { torque: "25 Ncm", chave: "Hex 1.27mm", type: "Pilar Protético", material: "Ti Grau 4", shape: "variobase" }, [["1.5", "TF-HI-PAR-15"], ["2.5", "TF-HI-PAR-25"], ["3.5", "TF-HI-PAR-35"], ["4.5", "TF-HI-PAR-45"]]) },
                  { key: "munhao", label: "Munhão HI Cimentado", icon: "🪝", desc: "Munhão HI para coroa cimentada Titanium Fix", heights: gh("Munhão HI TFX", { torque: "25 Ncm", chave: "Hex 1.27mm", type: "Munhão Cimentado", material: "Ti Grau 4", shape: "pilar_cim" }, [["1.5", "TF-HI-CIM-15"], ["2.5", "TF-HI-CIM-25"], ["3.5", "TF-HI-CIM-35"], ["4.5", "TF-HI-CIM-45"]]) },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "Mini-Pilar HI para próteses fixas múltiplas", icon: "🦷🦷",
                subtypes: [
                  { key: "mua", label: "Mini-Pilar HI TFX", icon: "⚙️", desc: "Para próteses fixas múltiplas Titanium Fix HI", heights: gh("Mini-Pilar HI TFX", { torque: "15 Ncm", chave: "Hex 1.27mm", type: "Mini-Pilar Multi-Unit", material: "Ti Grau 4", shape: "sra" }, [["1.5", "TF-HI-MU-15"], ["2.5", "TF-HI-MU-25"], ["3.5", "TF-HI-MU-35"]]) },
                ]
              },
            }
          }
        }
      },
      tfHE: {
        label: "Hexágono Externo (HE)", desc: "Conexão HE — torque 20 Ncm. Chave Hex 0.9mm.", icon: "⬡",
        lines: {
          tfHE_main: {
            label: "Hexágono Externo", desc: "HE TFX — torque 20 Ncm. Hex 0.9mm.", icon: "⬡", connection: "Hexágono Externo",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Pilar HE parafusado ou Munhão cimentado", icon: "🦷",
                subtypes: [
                  { key: "pilar", label: "Pilar HE Parafusado", icon: "🔩", desc: "Pilar HE para coroa unitária parafusada Titanium Fix", heights: gh("Pilar HE TFX", { torque: "20 Ncm", chave: "Hex 0.9mm", type: "Pilar Protético", material: "Ti Grau 4", shape: "variobase" }, [["1.5", "TF-HE-PAR-15"], ["2.5", "TF-HE-PAR-25"], ["3.5", "TF-HE-PAR-35"], ["4.5", "TF-HE-PAR-45"]]) },
                  { key: "munhao", label: "Munhão HE Cimentado", icon: "🪝", desc: "Munhão HE para coroa cimentada Titanium Fix", heights: gh("Munhão HE TFX", { torque: "20 Ncm", chave: "Hex 0.9mm", type: "Munhão Cimentado", material: "Ti Grau 4", shape: "pilar_cim" }, [["1.5", "TF-HE-CIM-15"], ["2.5", "TF-HE-CIM-25"], ["3.5", "TF-HE-CIM-35"], ["4.5", "TF-HE-CIM-45"]]) },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "Mini-Pilar HE para próteses fixas múltiplas", icon: "🦷🦷",
                subtypes: [
                  { key: "mua", label: "Mini-Pilar HE TFX", icon: "⚙️", desc: "Para próteses fixas múltiplas Titanium Fix HE", heights: gh("Mini-Pilar HE TFX", { torque: "15 Ncm", chave: "Hex 0.9mm", type: "Mini-Pilar Multi-Unit", material: "Ti Grau 4", shape: "sra" }, [["1.5", "TF-HE-MU-15"], ["2.5", "TF-HE-MU-25"], ["3.5", "TF-HE-MU-35"]]) },
                ]
              },
            }
          }
        }
      },
    }
  },
  conexao: {
    label: "Conexão Sistemas de Prótese", logo: "CNX", color: "#f97316", site: "conexao.com.br",
    families: {
      flashCM: {
        label: "Flash / Torq (Cone Morse)", desc: "Conexão CM Flash — torque 30 Ncm. Chave Hex 1.20mm.", icon: "◆",
        lines: {
          flashCM_main: {
            label: "Cone Morse Flash", desc: "Flash CM Conexão — torque 30 Ncm. Hex 1.20mm.", icon: "◆", connection: "Cone Morse Flash",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Pilar Flash CM parafusado ou Munhão cimentado", icon: "🦷",
                subtypes: [
                  { key: "pilar", label: "Pilar Flash CM Parafusado", icon: "🔩", desc: "Pilar CM Flash para coroa unitária parafusada", heights: gh("Pilar Flash CM Conexão", { torque: "30 Ncm", chave: "Hex 1.20mm", type: "Pilar Protético", material: "Ti Grau 4 Hard", shape: "variobase" }, [["1.5", "CNX-CM-PAR-15"], ["2.5", "CNX-CM-PAR-25"], ["3.5", "CNX-CM-PAR-35"], ["4.5", "CNX-CM-PAR-45"]]) },
                  { key: "munhao", label: "Munhão Flash CM Cimentado", icon: "🪝", desc: "Munhão CM Flash para coroa cimentada", heights: gh("Munhão Flash CM Conexão", { torque: "30 Ncm", chave: "Hex 1.20mm", type: "Munhão Cimentado", material: "Ti Grau 4 Hard", shape: "pilar_cim" }, [["1.5", "CNX-CM-CIM-15"], ["2.5", "CNX-CM-CIM-25"], ["3.5", "CNX-CM-CIM-35"], ["4.5", "CNX-CM-CIM-45"]]) },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "Mini-Pilar Flash CM para próteses fixas múltiplas", icon: "🦷🦷",
                subtypes: [
                  { key: "mua", label: "Mini-Pilar Flash CM Conexão", icon: "⚙️", desc: "Para próteses fixas múltiplas Conexão CM", heights: gh("Mini-Pilar Flash CM Conexão", { torque: "15 Ncm", chave: "Hex 1.20mm", type: "Mini-Pilar Multi-Unit", material: "Ti Grau 4 Hard", shape: "sra" }, [["1.5", "CNX-CM-MU-15"], ["2.5", "CNX-CM-MU-25"], ["3.5", "CNX-CM-MU-35"]]) },
                ]
              },
            }
          }
        }
      },
      easyHE: {
        label: "Easy / Short (Hex. Externo)", desc: "Conexão HE Easy — torque 20 Ncm. Chave Hex 0.9mm.", icon: "⬡",
        lines: {
          easyHE_main: {
            label: "Hexágono Externo Easy", desc: "Easy HE Conexão — torque 20 Ncm. Hex 0.9mm.", icon: "⬡", connection: "Hexágono Externo Easy",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Pilar HE Easy parafusado ou Munhão cimentado", icon: "🦷",
                subtypes: [
                  { key: "pilar", label: "Pilar HE Easy Parafusado", icon: "🔩", desc: "Pilar HE Easy para coroa unitária parafusada", heights: gh("Pilar HE Conexão", { torque: "20 Ncm", chave: "Hex 0.9mm", type: "Pilar Protético", material: "Ti Grau 4 Hard", shape: "variobase" }, [["1.5", "CNX-HE-PAR-15"], ["2.5", "CNX-HE-PAR-25"], ["3.5", "CNX-HE-PAR-35"], ["4.5", "CNX-HE-PAR-45"]]) },
                  { key: "munhao", label: "Munhão HE Easy Cimentado", icon: "🪝", desc: "Munhão HE Easy para coroa cimentada", heights: gh("Munhão HE Conexão", { torque: "20 Ncm", chave: "Hex 0.9mm", type: "Munhão Cimentado", material: "Ti Grau 4 Hard", shape: "pilar_cim" }, [["1.5", "CNX-HE-CIM-15"], ["2.5", "CNX-HE-CIM-25"], ["3.5", "CNX-HE-CIM-35"], ["4.5", "CNX-HE-CIM-45"]]) },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "Mini-Pilar HE Easy para próteses fixas múltiplas", icon: "🦷🦷",
                subtypes: [
                  { key: "mua", label: "Mini-Pilar HE Easy Conexão", icon: "⚙️", desc: "Para próteses fixas múltiplas Conexão HE", heights: gh("Mini-Pilar HE Conexão", { torque: "15 Ncm", chave: "Hex 0.9mm", type: "Mini-Pilar Multi-Unit", material: "Ti Grau 4 Hard", shape: "sra" }, [["1.5", "CNX-HE-MU-15"], ["2.5", "CNX-HE-MU-25"], ["3.5", "CNX-HE-MU-35"]]) },
                ]
              },
            }
          }
        }
      },
    }
  },
  arcsys: {
    label: "Arcsys / FGM", logo: "ARC", color: "#22c55e", site: "fgm.ind.br",
    families: {
      arcsysCM: {
        label: "Cone Morse Indexado", desc: "Cone Morse indexado — torque 30 Ncm. Chave Hex 1.20mm.", icon: "◆",
        lines: {
          arcsysCM_main: {
            label: "Cone Morse Indexado", desc: "CM Arcsys — torque 30 Ncm. Hex 1.20mm.", icon: "◆", connection: "Cone Morse Indexado",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Pilar CM parafusado ou Munhão cimentado", icon: "🦷",
                subtypes: [
                  { key: "pilar", label: "Pilar CM Arcsys Parafusado", icon: "🔩", desc: "Pilar CM indexado para coroa unitária parafusada", heights: gh("Pilar CM Arcsys", { torque: "30 Ncm", chave: "Hex 1.20mm", type: "Pilar Protético", material: "Ti Grau 4", shape: "variobase" }, [["1.5", "ARC-CM-PAR-15"], ["2.5", "ARC-CM-PAR-25"], ["3.5", "ARC-CM-PAR-35"], ["4.5", "ARC-CM-PAR-45"]]) },
                  { key: "munhao", label: "Munhão CM Arcsys Cimentado", icon: "🪝", desc: "Munhão CM indexado para coroa cimentada", heights: gh("Munhão CM Arcsys", { torque: "30 Ncm", chave: "Hex 1.20mm", type: "Munhão Cimentado", material: "Ti Grau 4", shape: "pilar_cim" }, [["1.5", "ARC-CM-CIM-15"], ["2.5", "ARC-CM-CIM-25"], ["3.5", "ARC-CM-CIM-35"], ["4.5", "ARC-CM-CIM-45"]]) },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "Mini-Pilar CM para próteses fixas múltiplas", icon: "🦷🦷",
                subtypes: [
                  { key: "mua", label: "Mini-Pilar CM Arcsys", icon: "⚙️", desc: "Para próteses fixas múltiplas Arcsys CM", heights: gh("Mini-Pilar CM Arcsys", { torque: "15 Ncm", chave: "Hex 1.20mm", type: "Mini-Pilar Multi-Unit", material: "Ti Grau 4", shape: "sra" }, [["1.5", "ARC-CM-MU-15"], ["2.5", "ARC-CM-MU-25"], ["3.5", "ARC-CM-MU-35"]]) },
                ]
              },
            }
          }
        }
      },
      arcsysHI: {
        label: "Hexágono Interno (HI)", desc: "Conexão HI — torque 25 Ncm. Chave Hex 1.27mm.", icon: "⬢",
        lines: {
          arcsysHI_main: {
            label: "Hexágono Interno", desc: "HI Arcsys — torque 25 Ncm. Hex 1.27mm.", icon: "⬢", connection: "Hexágono Interno",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Pilar HI parafusado ou Munhão cimentado", icon: "🦷",
                subtypes: [
                  { key: "pilar", label: "Pilar HI Arcsys Parafusado", icon: "🔩", desc: "Pilar HI para coroa unitária parafusada", heights: gh("Pilar HI Arcsys", { torque: "25 Ncm", chave: "Hex 1.27mm", type: "Pilar Protético", material: "Ti Grau 4", shape: "variobase" }, [["1.5", "ARC-HI-PAR-15"], ["2.5", "ARC-HI-PAR-25"], ["3.5", "ARC-HI-PAR-35"], ["4.5", "ARC-HI-PAR-45"]]) },
                  { key: "munhao", label: "Munhão HI Arcsys Cimentado", icon: "🪝", desc: "Munhão HI para coroa cimentada Arcsys", heights: gh("Munhão HI Arcsys", { torque: "25 Ncm", chave: "Hex 1.27mm", type: "Munhão Cimentado", material: "Ti Grau 4", shape: "pilar_cim" }, [["1.5", "ARC-HI-CIM-15"], ["2.5", "ARC-HI-CIM-25"], ["3.5", "ARC-HI-CIM-35"], ["4.5", "ARC-HI-CIM-45"]]) },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "Mini-Pilar HI para próteses fixas múltiplas", icon: "🦷🦷",
                subtypes: [
                  { key: "mua", label: "Mini-Pilar HI Arcsys", icon: "⚙️", desc: "Para próteses fixas múltiplas Arcsys HI", heights: gh("Mini-Pilar HI Arcsys", { torque: "15 Ncm", chave: "Hex 1.27mm", type: "Mini-Pilar Multi-Unit", material: "Ti Grau 4", shape: "sra" }, [["1.5", "ARC-HI-MU-15"], ["2.5", "ARC-HI-MU-25"], ["3.5", "ARC-HI-MU-35"]]) },
                ]
              },
            }
          }
        }
      },
    }
  },
  implacil: {
    label: "Implacil De Bortoli", logo: "IMP", color: "#e11d48", site: "implacil.com.br",
    families: {
      maestroCM: {
        label: "Maestro (Cone Morse)", desc: "Cone Morse Maestro — torque 25 Ncm. Chave Hex 1.20mm.", icon: "◆",
        lines: {
          maestroCM_main: {
            label: "Maestro Cone Morse", desc: "Maestro CM Implacil — torque 25 Ncm. Hex 1.20mm.", icon: "◆", connection: "Cone Morse Maestro",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Pilar Maestro parafusado ou Ideale cimentado", icon: "🦷",
                subtypes: [
                  { key: "pilar", label: "Pilar Maestro CM Parafusado", icon: "🔩", desc: "Pilar CM Maestro para coroa unitária parafusada", heights: gh("Pilar Maestro CM Implacil", { torque: "25 Ncm", chave: "Hex 1.20mm", type: "Pilar Protético", material: "Ti Grau 4", shape: "variobase" }, [["1.5", "IDB-CM-PAR-15"], ["2.5", "IDB-CM-PAR-25"], ["3.5", "IDB-CM-PAR-35"], ["4.5", "IDB-CM-PAR-45"]]) },
                  { key: "munhao", label: "Pilar Ideale CM Cimentado", icon: "🪝", desc: "Pilar Ideale CM para coroa cimentada", heights: gh("Pilar Ideale CM Implacil", { torque: "25 Ncm", chave: "Hex 1.20mm", type: "Munhão Cimentado", material: "Ti Grau 4", shape: "pilar_cim" }, [["1.5", "IDB-CM-CIM-15"], ["2.5", "IDB-CM-CIM-25"], ["3.5", "IDB-CM-CIM-35"], ["4.5", "IDB-CM-CIM-45"]]) },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "Mini-Pilar Maestro para próteses fixas múltiplas", icon: "🦷🦷",
                subtypes: [
                  { key: "mua", label: "Mini-Pilar Maestro CM Implacil", icon: "⚙️", desc: "Para próteses fixas múltiplas Implacil CM", heights: gh("Mini-Pilar Maestro CM Implacil", { torque: "15 Ncm", chave: "Hex 1.20mm", type: "Mini-Pilar Multi-Unit", material: "Ti Grau 4", shape: "sra" }, [["1.5", "IDB-CM-MU-15"], ["2.5", "IDB-CM-MU-25"], ["3.5", "IDB-CM-MU-35"]]) },
                ]
              },
            }
          }
        }
      },
      implacilHI: {
        label: "Hexágono Interno (HI)", desc: "Conexão HI — torque 25 Ncm. Chave Hex 1.27mm.", icon: "⬢",
        lines: {
          implacilHI_main: {
            label: "Hexágono Interno", desc: "HI Implacil — torque 25 Ncm. Hex 1.27mm.", icon: "⬢", connection: "Hexágono Interno",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Pilar HI parafusado ou Munhão cimentado", icon: "🦷",
                subtypes: [
                  { key: "pilar", label: "Pilar HI Implacil Parafusado", icon: "🔩", desc: "Pilar HI para coroa unitária parafusada", heights: gh("Pilar HI Implacil", { torque: "25 Ncm", chave: "Hex 1.27mm", type: "Pilar Protético", material: "Ti Grau 4", shape: "variobase" }, [["1.5", "IDB-HI-PAR-15"], ["2.5", "IDB-HI-PAR-25"], ["3.5", "IDB-HI-PAR-35"], ["4.5", "IDB-HI-PAR-45"]]) },
                  { key: "munhao", label: "Munhão HI Implacil Cimentado", icon: "🪝", desc: "Munhão HI para coroa cimentada", heights: gh("Munhão HI Implacil", { torque: "25 Ncm", chave: "Hex 1.27mm", type: "Munhão Cimentado", material: "Ti Grau 4", shape: "pilar_cim" }, [["1.5", "IDB-HI-CIM-15"], ["2.5", "IDB-HI-CIM-25"], ["3.5", "IDB-HI-CIM-35"], ["4.5", "IDB-HI-CIM-45"]]) },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "Mini-Pilar HI para próteses fixas múltiplas", icon: "🦷🦷",
                subtypes: [
                  { key: "mua", label: "Mini-Pilar HI Implacil", icon: "⚙️", desc: "Para próteses fixas múltiplas Implacil HI", heights: gh("Mini-Pilar HI Implacil", { torque: "15 Ncm", chave: "Hex 1.27mm", type: "Mini-Pilar Multi-Unit", material: "Ti Grau 4", shape: "sra" }, [["1.5", "IDB-HI-MU-15"], ["2.5", "IDB-HI-MU-25"], ["3.5", "IDB-HI-MU-35"]]) },
                ]
              },
            }
          }
        }
      },
      implacilHE: {
        label: "Hexágono Externo (HE)", desc: "Conexão HE — torque 20 Ncm. Chave Hex 0.9mm.", icon: "⬡",
        lines: {
          implacilHE_main: {
            label: "Hexágono Externo", desc: "HE Implacil — torque 20 Ncm. Hex 0.9mm.", icon: "⬡", connection: "Hexágono Externo",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Pilar HE parafusado ou Munhão cimentado", icon: "🦷",
                subtypes: [
                  { key: "pilar", label: "Pilar HE Implacil Parafusado", icon: "🔩", desc: "Pilar HE para coroa unitária parafusada", heights: gh("Pilar HE Implacil", { torque: "20 Ncm", chave: "Hex 0.9mm", type: "Pilar Protético", material: "Ti Grau 4", shape: "variobase" }, [["1.5", "IDB-HE-PAR-15"], ["2.5", "IDB-HE-PAR-25"], ["3.5", "IDB-HE-PAR-35"], ["4.5", "IDB-HE-PAR-45"]]) },
                  { key: "munhao", label: "Munhão HE Implacil Cimentado", icon: "🪝", desc: "Munhão HE para coroa cimentada", heights: gh("Munhão HE Implacil", { torque: "20 Ncm", chave: "Hex 0.9mm", type: "Munhão Cimentado", material: "Ti Grau 4", shape: "pilar_cim" }, [["1.5", "IDB-HE-CIM-15"], ["2.5", "IDB-HE-CIM-25"], ["3.5", "IDB-HE-CIM-35"], ["4.5", "IDB-HE-CIM-45"]]) },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "Mini-Pilar HE para próteses fixas múltiplas", icon: "🦷🦷",
                subtypes: [
                  { key: "mua", label: "Mini-Pilar HE Implacil", icon: "⚙️", desc: "Para próteses fixas múltiplas Implacil HE", heights: gh("Mini-Pilar HE Implacil", { torque: "15 Ncm", chave: "Hex 0.9mm", type: "Mini-Pilar Multi-Unit", material: "Ti Grau 4", shape: "sra" }, [["1.5", "IDB-HE-MU-15"], ["2.5", "IDB-HE-MU-25"], ["3.5", "IDB-HE-MU-35"]]) },
                ]
              },
            }
          }
        }
      },
    }
  },
  nobel: {
    label: "Nobel Biocare", logo: "NOB", color: "#f59e0b", site: "nobelbiocare.com",
    families: {
      nobelActive: {
        label: "NobelActive (Cone Interno)", desc: "Cone interno NobelActive — torque 35 Ncm. Chave Nobel Hex 1.25mm.", icon: "◆",
        lines: {
          nobelActive_main: {
            label: "NobelActive Cone Interno", desc: "NobelActive — torque 35 Ncm. Nobel Hex 1.25mm.", icon: "◆", connection: "Cone Interno NobelActive",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Pilar NobelActive parafusado ou cimentado", icon: "🦷",
                subtypes: [
                  { key: "pilar", label: "Pilar NobelActive Parafusado", icon: "🔩", desc: "Pilar cônico interno para coroa unitária parafusada", heights: gh("Pilar NobelActive", { torque: "35 Ncm", chave: "Nobel Hex 1.25mm", type: "Pilar Protético", material: "Ti Grau 4", shape: "variobase" }, [["1.5", "30836-1"], ["2.5", "30836-2"], ["3.5", "30836-3"], ["4.5", "30836-4"]]) },
                  { key: "munhao", label: "Pilar NA Cimentado", icon: "🪝", desc: "Pilar cônico para coroa cimentada", heights: gh("Pilar NA Cim.", { torque: "35 Ncm", chave: "Nobel Hex 1.25mm", type: "Munhão Cimentado", material: "Ti Grau 4", shape: "pilar_cim" }, [["1.5", "30837-1"], ["2.5", "30837-2"], ["3.5", "30837-3"], ["4.5", "30837-4"]]) },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "Multi-Unit Abutment para full arch e múltiplas", icon: "🦷🦷",
                subtypes: [
                  { key: "mua", label: "Multi-Unit Abutment NobelActive", icon: "⚙️", desc: "MUA para próteses fixas múltiplas e full arch", heights: gh("MUA NobelActive", { torque: "15 Ncm", chave: "Nobel Hex 1.25mm", type: "Multi-Unit Abutment", material: "Ti Grau 4", shape: "sra" }, [["1.5", "32626-1"], ["2.5", "32626-2"], ["3.5", "32626-3"]]) },
                ]
              },
            }
          }
        }
      },
      nobelReplace: {
        label: "NobelReplace (Tri-Channel)", desc: "Tri-Channel NobelReplace — torque 35 Ncm. Chave Nobel Hex 1.25mm.", icon: "⬢",
        lines: {
          nobelReplace_main: {
            label: "NobelReplace Tri-Channel", desc: "NobelReplace — torque 35 Ncm. Nobel Hex 1.25mm.", icon: "⬢", connection: "Tri-Channel NobelReplace",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Pilar NobelReplace parafusado ou cimentado", icon: "🦷",
                subtypes: [
                  { key: "pilar", label: "Pilar NobelReplace Parafusado", icon: "🔩", desc: "Pilar Tri-Channel para coroa unitária parafusada", heights: gh("Pilar NobelReplace", { torque: "35 Ncm", chave: "Nobel Hex 1.25mm", type: "Pilar Protético", material: "Ti Grau 4", shape: "variobase" }, [["1.5", "33424-1"], ["2.5", "33424-2"], ["3.5", "33424-3"], ["4.5", "33424-4"]]) },
                  { key: "munhao", label: "Pilar NR Cimentado", icon: "🪝", desc: "Pilar Tri-Channel para coroa cimentada convencional", heights: gh("Pilar NR Cim.", { torque: "35 Ncm", chave: "Nobel Hex 1.25mm", type: "Munhão Cimentado", material: "Ti Grau 4", shape: "pilar_cim" }, [["1.5", "33425-1"], ["2.5", "33425-2"], ["3.5", "33425-3"], ["4.5", "33425-4"]]) },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "MUA Tri-Channel para protocolo All-on-4/6", icon: "🦷🦷",
                subtypes: [
                  { key: "mua", label: "Multi-Unit Abutment NobelReplace", icon: "⚙️", desc: "MUA Tri-Channel para protocolo All-on-4/6", heights: gh("MUA NobelReplace", { torque: "15 Ncm", chave: "Nobel Hex 1.25mm", type: "Multi-Unit Abutment", material: "Ti Grau 4", shape: "sra" }, [["1.5", "32983-1"], ["2.5", "32983-2"], ["3.5", "32983-3"]]) },
                ]
              },
            }
          }
        }
      },
    }
  },
  osstem: {
    label: "Osstem", logo: "OSS", color: "#06b6d4", site: "osstem.com.br",
    families: {
      tsIII: {
        label: "TS III / TS IV (Cone Morse + HI)", desc: "Sistema TS — torque 30 Ncm. Chave Hex 1.20mm.", icon: "◆",
        lines: {
          tsIII_main: {
            label: "TS Cone Morse / HI", desc: "TS III/IV Osstem — torque 30 Ncm. Hex 1.20mm.", icon: "◆", connection: "Cone Morse TS",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Pilar TS parafusado ou cimentado", icon: "🦷",
                subtypes: [
                  { key: "pilar", label: "Pilar TS Parafusado", icon: "🔩", desc: "Pilar cônico interno para coroa unitária parafusada", heights: gh("Pilar TS Osstem", { torque: "30 Ncm", chave: "Hex 1.20mm", type: "Pilar Protético", material: "Ti Grau 4", shape: "variobase" }, [["1.5", "TSNBA-15"], ["2.5", "TSNBA-25"], ["3.5", "TSNBA-35"], ["4.5", "TSNBA-45"]]) },
                  { key: "munhao", label: "Pilar TS Cimentado", icon: "🪝", desc: "Pilar cônico para coroa cimentada sobre TS", heights: gh("Pilar TS Cim. Osstem", { torque: "30 Ncm", chave: "Hex 1.20mm", type: "Munhão Cimentado", material: "Ti Grau 4", shape: "pilar_cim" }, [["1.5", "TSCBA-15"], ["2.5", "TSCBA-25"], ["3.5", "TSCBA-35"], ["4.5", "TSCBA-45"]]) },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "Multi-Unit TS para próteses fixas múltiplas", icon: "🦷🦷",
                subtypes: [
                  { key: "mua", label: "Multi-Unit TS Osstem", icon: "⚙️", desc: "MUA para próteses fixas múltiplas — sistema TS", heights: gh("MUA TS Osstem", { torque: "15 Ncm", chave: "Hex 1.20mm", type: "Multi-Unit Abutment", material: "Ti Grau 4", shape: "sra" }, [["1.5", "TSMUA-15"], ["2.5", "TSMUA-25"], ["3.5", "TSMUA-35"]]) },
                ]
              },
            }
          }
        }
      },
      ssOsstem: {
        label: "SS (Hexágono Externo)", desc: "Sistema SS HE — torque 20 Ncm. Chave Hex 0.9mm.", icon: "⬡",
        lines: {
          ssOsstem_main: {
            label: "Hexágono Externo SS", desc: "SS Osstem — torque 20 Ncm. Hex 0.9mm.", icon: "⬡", connection: "Hexágono Externo SS",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Pilar SS parafusado ou cimentado", icon: "🦷",
                subtypes: [
                  { key: "pilar", label: "Pilar SS Parafusado", icon: "🔩", desc: "Pilar HE para coroa unitária parafusada — sistema SS", heights: gh("Pilar SS Osstem", { torque: "20 Ncm", chave: "Hex 0.9mm", type: "Pilar Protético", material: "Ti Grau 4", shape: "variobase" }, [["1.5", "SSNBA-15"], ["2.5", "SSNBA-25"], ["3.5", "SSNBA-35"], ["4.5", "SSNBA-45"]]) },
                  { key: "munhao", label: "Pilar SS Cimentado", icon: "🪝", desc: "Pilar HE para coroa cimentada — sistema SS", heights: gh("Pilar SS Cim. Osstem", { torque: "20 Ncm", chave: "Hex 0.9mm", type: "Munhão Cimentado", material: "Ti Grau 4", shape: "pilar_cim" }, [["1.5", "SSCBA-15"], ["2.5", "SSCBA-25"], ["3.5", "SSCBA-35"], ["4.5", "SSCBA-45"]]) },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "Multi-Unit SS para próteses fixas múltiplas", icon: "🦷🦷",
                subtypes: [
                  { key: "mua", label: "Multi-Unit SS Osstem", icon: "⚙️", desc: "MUA HE para próteses fixas múltiplas", heights: gh("MUA SS Osstem", { torque: "15 Ncm", chave: "Hex 0.9mm", type: "Multi-Unit Abutment", material: "Ti Grau 4", shape: "sra" }, [["1.5", "SSMUA-15"], ["2.5", "SSMUA-25"], ["3.5", "SSMUA-35"]]) },
                ]
              },
            }
          }
        }
      },
    }
  },
  dentsply: {
    label: "Dentsply Sirona", logo: "DEN", color: "#ec4899", site: "dentsplysirona.com",
    families: {
      xive: {
        label: "Xive (Cone Interno TG)", desc: "Cone Interno TG Xive — torque 24 Ncm. Chave Hex 1.22mm.", icon: "◆",
        lines: {
          xive_main: {
            label: "Xive Cone Interno TG", desc: "Xive — torque 24 Ncm. Hex 1.22mm.", icon: "◆", connection: "Cone Interno TG Xive",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Pilar Xive parafusado ou cimentado", icon: "🦷",
                subtypes: [
                  { key: "pilar", label: "Pilar Xive Parafusado", icon: "🔩", desc: "Pilar cônico interno TG para coroa unitária parafusada", heights: gh("Pilar Xive", { torque: "24 Ncm", chave: "Hex 1.22mm", type: "Pilar Protético", material: "Ti Grau 4", shape: "variobase" }, [["1.5", "XO4.5STP-15"], ["2.5", "XO4.5STP-25"], ["3.5", "XO4.5STP-35"], ["4.5", "XO4.5STP-45"]]) },
                  { key: "munhao", label: "Pilar Xive Cimentado", icon: "🪝", desc: "Pilar cônico cimentado com colar anatômico", heights: gh("Pilar Xive Cim.", { torque: "24 Ncm", chave: "Hex 1.22mm", type: "Munhão Cimentado", material: "Ti Grau 4", shape: "pilar_cim" }, [["1.5", "XO4.5STC-15"], ["2.5", "XO4.5STC-25"], ["3.5", "XO4.5STC-35"], ["4.5", "XO4.5STC-45"]]) },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "Multi-Unit Xive para próteses fixas múltiplas", icon: "🦷🦷",
                subtypes: [
                  { key: "mua", label: "Multi-Unit Xive", icon: "⚙️", desc: "Para próteses fixas múltiplas — sistema Xive", heights: gh("MUA Xive", { torque: "15 Ncm", chave: "Hex 1.22mm", type: "Multi-Unit Abutment", material: "Ti Grau 4", shape: "sra" }, [["1.5", "XO4.5MU-15"], ["2.5", "XO4.5MU-25"], ["3.5", "XO4.5MU-35"]]) },
                ]
              },
            }
          }
        }
      },
      ankylos: {
        label: "Ankylos (Cone Morse Puro)", desc: "Cone Morse Puro Ankylos — torque 15 Ncm. Chave Hex 1.00mm.", icon: "◆",
        lines: {
          ankylos_main: {
            label: "Ankylos Cone Morse Puro", desc: "Ankylos — torque 15 Ncm. Hex 1.00mm.", icon: "◆", connection: "Cone Morse Puro Ankylos",
            objectives: {
              unitaria: {
                label: "Prótese Unitária", desc: "Pilar Balance parafusado ou cimentado", icon: "🦷",
                subtypes: [
                  { key: "pilar", label: "Pilar Balance Parafusado", icon: "🔩", desc: "Pilar Balance para coroa unitária — cone morse puro", heights: gh("Pilar Balance Ankylos", { torque: "15 Ncm", chave: "Hex 1.00mm", type: "Pilar Balance", material: "Ti Grau 4", shape: "variobase" }, [["1.5", "A-BTF-11"], ["2.5", "A-BTF-12"], ["3.5", "A-BTF-13"], ["4.5", "A-BTF-14"]]) },
                  { key: "munhao", label: "Pilar Balance Cimentado", icon: "🪝", desc: "Fixação friccional por cone morse puro — sem parafuso", heights: gh("Pilar Balance Cim. Ankylos", { torque: "15 Ncm", chave: "Hex 1.00mm", type: "Munhão Cimentado", material: "Ti Grau 4", shape: "pilar_cim" }, [["1.5", "A-BTC-11"], ["2.5", "A-BTC-12"], ["3.5", "A-BTC-13"], ["4.5", "A-BTC-14"]]) },
                ]
              },
              multipla: {
                label: "Prótese Unida / Múltipla", desc: "SynCone telescópico para protocolo Ankylos", icon: "🦷🦷",
                subtypes: [
                  { key: "mua", label: "SynCone (Protocolo Ankylos)", icon: "⚙️", desc: "Abutment telescópico cônico para protocolo Ankylos", heights: gh("SynCone Ankylos", { torque: "15 Ncm", chave: "Hex 1.00mm", type: "Abutment Telescópico", material: "Ti Grau 4", shape: "sra" }, [["1.5", "A-SYN-15"], ["2.5", "A-SYN-25"], ["3.5", "A-SYN-35"]]) },
                ]
              },
            }
          }
        }
      },
    }
  },
};

// ─── Detective (Investigador) ─────────────────────────────────────────────────
const DETECTIVE_STEPS = [
  { id: 1, title: "Corpo do Implante", subtitle: "Qual é o formato geral do corpo?", icon: "🦷", options: [{ value: "conico", label: "Cônico", desc: "Afila progressivamente da plataforma ao ápice", icon: "▽" }, { value: "cilindrico", label: "Cilíndrico", desc: "Diâmetro uniforme ao longo do corpo", icon: "▭" }] },
  { id: 2, title: "Pescoço / Cervical", subtitle: "Onde está o nível da plataforma protética?", icon: "🔬", options: [{ value: "tissueLevel", label: "Tissue Level", desc: "Plataforma ao nível do tecido mole", icon: "↑" }, { value: "boneLevel", label: "Bone Level", desc: "Plataforma ao nível ósseo", icon: "↓" }] },
  { id: 3, title: "Roscas", subtitle: "Como são os filetes de rosca?", icon: "🔩", options: [{ value: "ativas", label: "Ativas / Agressivas", desc: "Roscas espaçadas, profundas, cortantes", icon: "≋" }, { value: "finas", label: "Finas / Compressivas", desc: "Roscas próximas, menor profundidade", icon: "≡" }] },
  { id: 4, title: "Ápice / Ponta", subtitle: "Qual é a morfologia da ponta?", icon: "🔍", options: [{ value: "arredondado", label: "Arredondado", desc: "Ponta arredondada, perfil suave", icon: "○" }, { value: "plano", label: "Plano", desc: "Base plana, perfil reto", icon: "□" }, { value: "fenda", label: "Com Fenda/Furo", desc: "Orifício apical ou fenda visível na RX", icon: "◎" }] },
  { id: 5, title: "Plataforma Protética", subtitle: "Qual é o tipo de conexão?", icon: "⚙️", options: [{ value: "HE", label: "Hex. Externo (HE)", desc: "Hexágono projetado acima da plataforma", icon: "⬡" }, { value: "HI", label: "Hex. Interno (HI)", desc: "Hexágono encaixado internamente", icon: "⬢" }, { value: "CM", label: "Cone Morse (CM)", desc: "Conexão cônica sem hexágono visível", icon: "◆" }] },
];
function getCompatibleBrands(ct) {
  const results = [];
  Object.values(DB).forEach(brand => {
    Object.values(brand.families).forEach(fam => {
      Object.values(fam.lines).forEach(line => {
        const c = (line.connection || "").toLowerCase();
        const match =
          (ct === "HE" && (c.includes("he") || c.includes("externo"))) ||
          (ct === "HI" && (c.includes("hi") || c.includes("interno"))) ||
          (ct === "CM" && (c.includes("morse") || c.includes("torcfit") || c.includes("crossfit")));
        if (match) results.push(`${brand.label} — ${line.connection}`);
      });
    });
  });
  return results;
}

// ─── Estilos ──────────────────────────────────────────────────────────────────
const HEIGHT_DESCS = {
  "0.8": "Tecido muito fino — perfil subgengival mínimo",
  "1.0": "Tecido fino — GH 1mm (anterior / biótipo delgado)",
  "1.5": "Tecido fino — GH 1,5mm (anterior / biótipo delgado)",
  "2.0": "Tecido médio-fino — GH 2mm (padrão anterior)",
  "2.5": "Tecido médio — GH 2,5mm (padrão clínico mais frequente)",
  "3.0": "Tecido médio-espesso — GH 3mm (posterior / padrão)",
  "3.5": "Tecido espesso — GH 3,5mm (posterior / biótipo grosso)",
  "4.5": "Tecido muito espesso — GH 4,5mm (ganho ósseo / regeneração)",
  "unico": "Componente único — sem variação de altura gengival (sistema TLX)"
};
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap');
  html,body{margin:0;padding:0;width:100%;min-height:100vh}
  #root{width:100%;min-height:100vh;display:flex;justify-content:center;background:#020617}
  *{box-sizing:border-box} body{background:#020617;font-family:'DM Sans',sans-serif;color:white}
  @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
  @keyframes sh{0%{background-position:-200% 0}100%{background-position:200% 0}}
  @keyframes fadeIn{from{opacity:0;transform:translateX(100%)}to{opacity:1;transform:translateX(0)}}
  @keyframes fadeInBack{from{opacity:0;transform:translateX(-100%)}to{opacity:1;transform:translateX(0)}}
  @keyframes pulse-ring{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:.1;transform:scale(1.22)}}
  input{box-sizing:border-box;outline:none} input::placeholder{color:#94a3b8}
  ::-webkit-scrollbar{width:3px} ::-webkit-scrollbar-track{background:#0f172a} ::-webkit-scrollbar-thumb{background:#334155;border-radius:2px}
  @media print{body{background:white!important;color:black!important} .no-print{display:none!important} .print-card{background:white!important;border:1px solid #ccc!important;color:black!important} .print-sku{color:#1d4ed8!important} .print-brand{color:#555!important}}
  button{font-family:'DM Sans',sans-serif;}
  .hov{position:relative;cursor:pointer;transition:transform 200ms ease-out,box-shadow 200ms ease-out;}
  .hov:hover{transform:scale(1.20);box-shadow:0 8px 28px rgba(59,130,246,.30);z-index:2;}
  .fadein{animation:fadeIn .22s ease-out both}
  .fadein-back{animation:fadeInBack .22s ease-out both}
`;
function Sty() { return <style>{css}</style>; }
const G = {
  page: { minHeight: "100vh", display: "flex", flexDirection: "column", padding: "20px 16px 120px", gap: 14, maxWidth: 430, margin: "0 auto" },
  row: { display: "flex", alignItems: "center", gap: 10 },
  mono: { fontFamily: "monospace" },
};
const card = { width: "100%", borderRadius: 13, background: "rgba(30,41,59,0.95)", border: "1px solid rgba(71,85,105,0.8)", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 12, transition: "all .16s ease", color: "white", padding: "14px 16px" };

// ─── Componentes UI ───────────────────────────────────────────────────────────
function Logo() {
  return (
    <div style={{ position: "relative", width: 84, height: 84, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Anel de brilho pulsando */}
      <div style={{ position: "absolute", width: 84, height: 84, borderRadius: "50%", border: "1.5px solid rgba(59,130,246,.55)", animation: "pulse-ring 2.8s ease-in-out infinite", pointerEvents: "none" }} />
      {/* Anel giratório */}
      <svg style={{ position: "absolute", animation: "spin 20s linear infinite" }} width="76" height="76" viewBox="0 0 76 76">
        <circle cx="38" cy="38" r="34" fill="none" stroke="#1e40af" strokeWidth="1" strokeDasharray="4 3" opacity=".6" />
      </svg>
      {/* Inner box glassmorphism */}
      <div style={{ width: 50, height: 50, borderRadius: 15, background: "linear-gradient(135deg,rgba(30,64,175,0.55),rgba(59,130,246,0.38))", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(147,197,253,.38)", boxShadow: "0 0 24px rgba(59,130,246,.42), inset 0 1px 0 rgba(255,255,255,.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 14, fontWeight: 800, color: "white", letterSpacing: -1 }}>SG</span>
      </div>
    </div>
  );
}

// Botão Voltar — emoticon Unicode ←
function Back({ onClick }) {
  return (
    <button onClick={onClick} aria-label="Voltar"
      style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(30,41,59,0.9)", border: "1px solid #475569", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
      <span style={{ color: "#e2e8f0", fontSize: 20 }}>←</span>
    </button>
  );
}

function Hdr({ title, sub, color = "#94a3b8", onBack }) {
  return <div style={G.row}><Back onClick={onBack} /><div><h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "white" }}>{title}</h2>{sub && <p style={{ margin: 0, fontSize: 11, color }}>{sub}</p>}</div></div>;
}
function InfoBox({ color = "#3b82f6", icon, children }) {
  return <div style={{ padding: "10px 12px", borderRadius: 10, background: `${color}18`, border: `1px solid ${color}44`, display: "flex", gap: 7 }}>{icon}<p style={{ margin: 0, fontSize: 11, color, lineHeight: 1.5 }}>{children}</p></div>;
}
function Breadcrumb({ steps, brandColor }) {
  const s = steps.filter(Boolean);
  const activeColor = brandColor || "#60a5fa";
  return <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>{s.map((t, i) => <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>{i > 0 && <ChevronRight size={9} color="#475569" />}<span style={{ fontSize: 9, color: i === s.length - 1 ? activeColor : "#64748b", fontWeight: i === s.length - 1 ? 700 : 400 }}>{t}</span></span>)}</div>;
}
function ImplantShape({ shape, size = 90 }) {
  const S = size, b = "#3b82f6", bd = "#1d4ed8", bl = "#60a5fa", bg = "#1e293b";
  const shapes = {
    variobase: <svg width={S} height={S} viewBox="0 0 60 80"><rect x="19" y="8" width="22" height="30" rx="4" fill={bd} /><rect x="25" y="10" width="10" height="24" rx="3" fill={bg} /><line x1="30" y1="13" x2="30" y2="30" stroke={bl} strokeWidth="1.2" strokeDasharray="2,2" /><path d="M19,38 Q13,52 22,62 Q26,67 30,68 Q34,67 38,62 Q47,52 41,38 Z" fill={b} /><ellipse cx="30" cy="38" rx="11" ry="3.5" fill={bd} /><ellipse cx="30" cy="8" rx="11" ry="3" fill={bl} opacity=".8" /></svg>,
    variobase_wide: <svg width={S} height={S} viewBox="0 0 60 80"><rect x="18" y="8" width="24" height="28" rx="4" fill={bd} /><rect x="24" y="10" width="12" height="22" rx="3" fill={bg} /><line x1="30" y1="13" x2="30" y2="28" stroke={bl} strokeWidth="1.2" strokeDasharray="2,2" /><path d="M18,36 Q10,50 20,63 Q25,68 30,69 Q35,68 40,63 Q50,50 42,36 Z" fill={b} /><ellipse cx="30" cy="36" rx="12" ry="3.5" fill={bd} /><ellipse cx="30" cy="8" rx="12" ry="3" fill={bl} opacity=".8" /></svg>,
    pilar_cim: <svg width={S} height={S} viewBox="0 0 60 80"><rect x="22" y="48" width="16" height="16" rx="3" fill={bd} /><ellipse cx="30" cy="48" rx="8" ry="3" fill={b} /><path d="M22,48 L20,18 Q20,10 30,8 Q40,10 40,18 L38,48 Z" fill={b} /><ellipse cx="30" cy="10" rx="9" ry="4" fill={bl} opacity=".9" /></svg>,
    pilar_ang: <svg width={S} height={S} viewBox="0 0 60 80"><rect x="21" y="52" width="18" height="14" rx="3" fill={bd} /><ellipse cx="30" cy="52" rx="9" ry="3" fill={b} /><path d="M21,52 L17,22 Q16,12 28,9 Q40,8 42,18 L39,52 Z" fill={b} /><path d="M26,12 L24,44" stroke={bg} strokeWidth="6" strokeLinecap="round" /><path d="M26,14 L24,42" stroke={bl} strokeWidth="1.2" strokeDasharray="2,2" /><ellipse cx="25" cy="10" rx="8" ry="3.5" fill={bl} opacity=".9" transform="rotate(-10,25,10)" /></svg>,
    sra: <svg width={S} height={S} viewBox="0 0 60 80"><polygon points="30,72 39,67 39,57 30,52 21,57 21,67" fill={bd} /><polygon points="30,68 37,64 37,59 30,55 23,59 23,64" fill={b} opacity=".7" /><rect x="23" y="14" width="14" height="38" rx="3" fill={b} /><rect x="26" y="16" width="8" height="28" rx="2" fill={bg} /><line x1="30" y1="19" x2="30" y2="40" stroke={bl} strokeWidth="1.2" strokeDasharray="2,2" /><ellipse cx="30" cy="14" rx="7" ry="2.5" fill={bl} opacity=".9" /></svg>,
    cilindro: <svg width={S} height={S} viewBox="0 0 60 80"><rect x="20" y="10" width="20" height="56" rx="4" fill={b} /><rect x="24" y="13" width="12" height="48" rx="2" fill={bg} /><line x1="30" y1="16" x2="30" y2="58" stroke={bl} strokeWidth="1.2" strokeDasharray="3,2" /><ellipse cx="30" cy="10" rx="10" ry="3" fill={bl} opacity=".9" /><ellipse cx="30" cy="66" rx="10" ry="3" fill={bd} /></svg>,
  };
  return <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: S, height: S, borderRadius: 12, background: "linear-gradient(135deg,#0f172a,#1e293b)", border: "1px solid rgba(59,130,246,.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>{shapes[shape] || shapes.variobase}</div></div>;
}

// ─── TELA HOME ────────────────────────────────────────────────────────────────
function HomeScreen({ go, history, clearHistory }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, width: "100%" }}>
        {/* Logo + título */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 13 }}>
          <Logo />
          <div style={{ textAlign: "center" }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: -.5, color: "white" }}>Sartori<span style={{ color: "#3b82f6" }}> Guide</span></h1>
            <p style={{ margin: "4px 0 0", fontSize: 9, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase", opacity: 0.6, background: "linear-gradient(90deg,#94a3b8,#e2e8f0,#94a3b8)", backgroundSize: "200% 100%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "sh 3s linear infinite" }}>Implant Protocol System</p>
          </div>
        </div>

        {/* Card pergunta — glassmorphism sutil */}
        <div style={{ width: "100%", padding: "18px", borderRadius: 18, background: "rgba(15,23,42,.55)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(59,130,246,.22)", boxShadow: "0 1px 0 rgba(147,197,253,.12) inset, 0 8px 32px rgba(0,0,0,.28)", textAlign: "center" }}>
          <div style={{ fontSize: 26, marginBottom: 7 }}>🔍</div>
          <h2 style={{ margin: "0 0 5px", fontSize: 16, fontWeight: 700, color: "white" }}>Você conhece o implante instalado?</h2>
          <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>Escolha o fluxo para encontrar o componente correto</p>
        </div>

        {/* Consultas Recentes */}
        {history.length > 0 && (
          <div style={{ width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 1 }}>Consultas Recentes</span>
              <button onClick={clearHistory}
                style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: 10, color: "#475569", padding: "2px 6px", borderRadius: 5 }}>
                Limpar histórico
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {history.map((item, i) => {
                const brand = DB[item.brand];
                return (
                  <button key={i} className="hov" onClick={() => go("result", { ...item })}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: 11, background: "rgba(30,41,59,0.95)", border: "1px solid #475569", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, textAlign: "left" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9, minWidth: 0 }}>
                      <div style={{ width: 26, height: 26, borderRadius: 7, background: brand ? `${brand.color}22` : "rgba(59,130,246,.15)", border: `1px solid ${brand ? brand.color : "#3b82f6"}66`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 800, color: brand ? brand.color : "#3b82f6", fontFamily: "monospace", flexShrink: 0 }}>
                        {brand ? brand.logo : "?"}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: "white", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                        <div style={{ fontSize: 9, color: "#60a5fa", fontFamily: "monospace", marginTop: 1 }}>{item.sku}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 12, color: "#475569", flexShrink: 0 }}>→</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Botões */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
          {/* Botão 1 — Conheço o implante */}
          <button className="hov" onClick={() => go("brandSelect", {})}
            style={{ width: "100%", padding: "16px 18px", borderRadius: 14, border: "none", cursor: "pointer", background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 6px 24px rgba(59,130,246,.32)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 50, background: "rgba(255,255,255,.22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🦷</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "white" }}>Conheço o implante</div>
            </div>
            <span style={{ fontSize: 16, color: "rgba(255,255,255,.8)" }}>→</span>
          </button>

          {/* Botão 2 — Quero identificar */}
          <button className="hov" onClick={() => go("detective", {})}
            style={{ width: "100%", padding: "16px 18px", borderRadius: 14, cursor: "pointer", background: "rgba(15,23,42,.6)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid #475569", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 50, background: "rgba(59,130,246,.18)", border: "1px solid rgba(59,130,246,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🔬</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0" }}>Quero identificar o implante</div>
            </div>
            <span style={{ fontSize: 16, color: "#475569" }}>→</span>
          </button>
        </div>

        <button onClick={() => go("about", {})} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, padding: "4px 8px", borderRadius: 6 }}>
          <span style={{ fontSize: 11 }}>ℹ️</span>
          <span style={{ fontSize: 9, color: "#334155" }}>v5.0 · 11 marcas · Sobre</span>
        </button>
      </div>
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About({ go }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", padding: "20px 16px 40px", gap: 20, maxWidth: 430, margin: "0 auto" }} className="fadein">
      <Hdr title="Sobre" onBack={() => go("home", {}, "back")} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, paddingTop: 12 }}>
        <Logo />
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "white", letterSpacing: -0.5 }}>Implante<span style={{ color: "#3b82f6" }}> Guide</span></h1>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(30,41,59,0.95)", border: "1px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#94a3b8" }}>Versão</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "white", fontFamily: "monospace" }}>1.0.0</span>
        </div>
        <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(30,41,59,0.95)", border: "1px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#94a3b8" }}>Base de dados atualizada em</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "white" }}>Abril 2026</span>
        </div>
      </div>
      <div style={{ padding: "16px", borderRadius: 12, background: "rgba(245,158,11,.08)", border: "1px solid rgba(245,158,11,.25)" }}>
        <p style={{ margin: "0 0 6px", fontSize: 10, fontWeight: 700, color: "#f59e0b", textTransform: "uppercase", letterSpacing: 1 }}>Aviso Legal</p>
        <p style={{ margin: 0, fontSize: 11, color: "#94a3b8", lineHeight: 1.6 }}>
          As informações apresentadas neste aplicativo têm caráter exclusivamente informativo e de apoio à decisão clínica. A confirmação dos componentes, torques e protocolos é de responsabilidade exclusiva do profissional habilitado. Consulte sempre a bula, o catálogo oficial do fabricante e a documentação técnica antes de qualquer procedimento.
        </p>
      </div>
    </div>
  );
}

// ─── DETECTIVE ────────────────────────────────────────────────────────────────
const RX_REFS = [
  { key: "cm", label: "Cone Morse", desc: "Conexão cônica de alto engajamento", color: "#f59e0b" },
  { key: "hi", label: "Hexágono Interno", desc: "Hexágono interno indexado", color: "#3b82f6" },
  { key: "he", label: "Hexágono Externo", desc: "Hexágono externo tradicional", color: "#10b981" },
  { key: "cmi", label: "Cone Morse Indexado", desc: "Cone morse com indexação rotacional", color: "#a78bfa" },
];

const AI_RX_PROMPT = "Você é um especialista em implantodontia. Analise esta radiografia periapical e identifique: 1) O tipo de conexão protética (Hexágono Externo, Hexágono Interno ou Cone Morse); 2) Características morfológicas visíveis (formato do corpo, tipo de rosca, ápice); 3) Possíveis marcas e sistemas compatíveis com base no DB: Straumann BLX/BL/TLX, Neodent GM/CM, Nobel Biocare, S.I.N., Osstem, Implacil, Dentsply. Seja objetivo e clínico. Responda em português.";

function DetectiveRX() {
  const [img, setImg] = useState(null);
  const [aiReply, setAiReply] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [drag, setDrag] = useState(false);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => { setImg(e.target.result); setAiReply(null); };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!img || aiLoading) return;
    setAiLoading(true);
    setAiReply(null);
    try {
      const [header, base64] = img.split(",");
      const mediaType = header.match(/data:(image\/\w+);/)?.[1] || "image/jpeg";
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: AI_RX_PROMPT, image: base64, mediaType }),
      });
      const data = await res.json();
      setAiReply(data.reply || data.error || "Sem resposta.");
    } catch {
      setAiReply("Erro ao conectar com o assistente.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Instrução */}
      <div style={{ padding: "12px 14px", borderRadius: 11, background: "rgba(30,41,59,0.8)", border: "1px solid #334155" }}>
        <div style={{ fontSize: 12, color: "#cbd5e1", lineHeight: 1.6 }}>
          📋 Faça o upload da RX do implante desconhecido e compare com as referências abaixo.
        </div>
        <div style={{ fontSize: 10, color: "#64748b", marginTop: 6 }}>
          💡 Para melhor resultado, use RX periapical com boa definição.
        </div>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]); }}
        onClick={() => document.getElementById("rx-upload-input").click()}
        style={{ borderRadius: 14, border: `2px dashed ${drag ? "#3b82f6" : "#334155"}`, background: drag ? "rgba(59,130,246,.08)" : "rgba(15,23,42,0.6)", padding: "28px 16px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer", transition: "all .2s", minHeight: 140 }}
      >
        <input id="rx-upload-input" type="file" accept="image/jpeg,image/png,image/webp" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files[0])} />
        {img ? (
          <img src={img} alt="RX upload" style={{ maxWidth: "100%", maxHeight: 220, borderRadius: 10, objectFit: "contain" }} />
        ) : (
          <>
            <div style={{ fontSize: 36 }}>📷</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "white" }}>Arraste ou clique para enviar</div>
            <div style={{ fontSize: 10, color: "#64748b" }}>JPG, PNG ou WEBP</div>
          </>
        )}
      </div>

      {/* Botões de ação */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <button
          onClick={handleAnalyze}
          disabled={!img || aiLoading}
          style={{ padding: "14px", borderRadius: 12, border: "none", cursor: !img || aiLoading ? "not-allowed" : "pointer", background: !img || aiLoading ? "rgba(59,130,246,.4)" : "linear-gradient(135deg,#1d4ed8,#3b82f6)", color: "white", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
        >
          {aiLoading ? "⏳ Analisando..." : "🤖 Analisar com IA"}
        </button>
        {aiReply && (
          <div style={{ padding: "14px", borderRadius: 10, background: "rgba(15,23,42,0.95)", border: "1px solid #3b82f6", fontSize: 12, color: "#e2e8f0", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
            <div style={{ fontSize: 10, color: "#60a5fa", fontWeight: 700, marginBottom: 6 }}>🤖 ANÁLISE DA IA</div>
            {aiReply}
          </div>
        )}
        {img && (
          <button onClick={() => setImg(null)}
            style={{ padding: "10px", borderRadius: 10, border: "1px solid #334155", cursor: "pointer", background: "rgba(30,41,59,0.8)", color: "#94a3b8", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            ✕ Remover imagem
          </button>
        )}
      </div>

      {/* Banco de referências */}
      <div>
        <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Referências por Conexão</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {RX_REFS.map(ref => (
            <div key={ref.key} style={{ borderRadius: 12, background: "rgba(30,41,59,0.9)", border: `1px solid ${ref.color}44`, overflow: "hidden" }}>
              <div style={{ padding: "10px 12px", borderBottom: `1px solid ${ref.color}22` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "white", marginBottom: 2 }}>{ref.label}</div>
                <div style={{ fontSize: 9, color: "#64748b", lineHeight: 1.4 }}>{ref.desc}</div>
              </div>
              <div style={{ height: 90, background: "rgba(15,23,42,0.6)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 4 }}>
                <div style={{ fontSize: 20 }}>🦷</div>
                <div style={{ fontSize: 9, color: "#475569" }}>RX em breve</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Detective({ go }) {
  const [tab, setTab] = useState("rx");
  const [step, setStep] = useState(1);
  const [ans, setAns] = useState({});
  const [sel, setSel] = useState(null);
  const [done, setDone] = useState(false);
  const cur = DETECTIVE_STEPS[step - 1];

  const pick = v => {
    setSel(v);
    setTimeout(() => {
      const a = { ...ans, [step]: v };
      setAns(a);
      if (step < 5) { setStep(step + 1); setSel(null); }
      else setDone(true);
    }, 250);
  };

  const TABS = [{ key: "rx", label: "📸 Por RX" }, { key: "quiz", label: "🔬 Por Perguntas" }];

  return (
    <div style={G.page} className="fadein">
      {/* Header */}
      <div style={G.row}>
        <Back onClick={() => go("home", {}, "back")} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "white" }}>Identificar Implante</div>
          <div style={{ fontSize: 10, color: "#64748b" }}>Descubra a marca pelo RX ou perguntas</div>
        </div>
      </div>

      {/* Abas */}
      <div style={{ display: "flex", gap: 6, padding: "2px", background: "rgba(30,41,59,0.8)", borderRadius: 11, border: "1px solid #1e293b" }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{ flex: 1, padding: "9px 0", borderRadius: 9, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 12, transition: "all .2s", background: tab === t.key ? "rgba(59,130,246,.25)" : "transparent", color: tab === t.key ? "#60a5fa" : "#64748b" }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Conteúdo da aba RX */}
      {tab === "rx" && <DetectiveRX />}

      {/* Conteúdo da aba Quiz */}
      {tab === "quiz" && (done ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <button onClick={() => { setDone(false); setStep(5); setSel(null); }}
            style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0, fontSize: 11 }}>
            <span style={{ fontSize: 14 }}>←</span> Rever
          </button>
          <div style={{ padding: 18, borderRadius: 14, background: "rgba(16,185,129,.12)", border: "1px solid rgba(16,185,129,.4)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}><CheckCircle size={15} color="#10b981" /><span style={{ fontWeight: 700, color: "#10b981", fontSize: 13 }}>Análise Concluída</span></div>
            <p style={{ margin: "0 0 3px", fontSize: 10, color: "#94a3b8" }}>Conexão identificada:</p>
            <p style={{ margin: "0 0 12px", fontSize: 18, fontWeight: 800, color: "white" }}>{ans[5] === "HE" ? "Hexágono Externo" : ans[5] === "HI" ? "Hexágono Interno" : "Cone Morse"}</p>
            <p style={{ margin: "0 0 7px", fontSize: 10, color: "#94a3b8" }}>Marcas possivelmente compatíveis:</p>
            {getCompatibleBrands(ans[5]).map((b, i) => (
              <div key={i} style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(30,41,59,0.9)", border: "1px solid #475569", display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", flexShrink: 0 }} />
                <span style={{ color: "#e2e8f0", fontSize: 12 }}>{b}</span>
              </div>
            ))}
          </div>
          <InfoBox color="#f59e0b" icon={<AlertTriangle size={12} color="#f59e0b" style={{ flexShrink: 0, marginTop: 1 }} />}>Confirme a compatibilidade com a documentação do paciente antes do procedimento.</InfoBox>
          <button onClick={() => go("brandSelect", { detectedConnection: ans[5] })} style={{ padding: "14px", borderRadius: 12, border: "none", cursor: "pointer", background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", color: "white", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>Prosseguir para seleção <ArrowRight size={14} /></button>
          <button onClick={() => go("home", {})} style={{ padding: "11px", borderRadius: 11, border: "1px solid #475569", cursor: "pointer", background: "rgba(30,41,59,0.9)", color: "#cbd5e1", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}><Home size={11} />Início</button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 9, color: "#94a3b8", fontWeight: 600, letterSpacing: .5 }}>ANÁLISE RADIOGRÁFICA</span>
            <span style={{ ...G.mono, fontSize: 9, color: "#3b82f6", fontWeight: 700 }}>{step}/5</span>
          </div>
          <div style={{ height: 3, borderRadius: 2, background: "#1e293b", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${step / 5 * 100}%`, background: "linear-gradient(90deg,#3b82f6,#60a5fa)", transition: "width .45s ease" }} />
          </div>
          <div style={{ textAlign: "center", padding: "8px 0" }}>
            <div style={{ fontSize: 36, marginBottom: 7 }}>{cur.icon}</div>
            <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 700, color: "white" }}>{cur.title}</h2>
            <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>{cur.subtitle}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {cur.options.map(o => (
              <button key={o.value} onClick={() => pick(o.value)} className="hov"
                style={{ ...card, background: sel === o.value ? "rgba(59,130,246,.25)" : "rgba(30,41,59,0.95)", border: `1px solid ${sel === o.value ? "#3b82f6" : "#475569"}` }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, flexShrink: 0, background: sel === o.value ? "rgba(59,130,246,.3)" : "rgba(51,65,85,0.8)", border: `1px solid ${sel === o.value ? "#3b82f6" : "#64748b"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "white" }}>{o.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: "white", fontSize: 13, marginBottom: 2 }}>{o.label}</div>
                  <div style={{ fontSize: 10, color: "#94a3b8", lineHeight: 1.4 }}>{o.desc}</div>
                </div>
                {sel === o.value && <CheckCircle size={14} color="#3b82f6" />}
              </button>
            ))}
          </div>
          {step > 1 && (
            <button onClick={() => { setStep(step - 1); setSel(null); }}
              style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0, fontSize: 11, alignSelf: "flex-start" }}>
              <span style={{ fontSize: 14 }}>←</span> Voltar
            </button>
          )}
          {step === 5 && <InfoBox color="#3b82f6" icon={<Info size={11} color="#3b82f6" style={{ flexShrink: 0, marginTop: 1 }} />}><strong>Passo decisivo:</strong> A plataforma protética define a compatibilidade mecânica final.</InfoBox>}
        </div>
      ))}
    </div>
  );
}

// ─── HELPER: logo de conexão protética ────────────────────────────────────────
function connLogo(label) {
  if (label === "Bone Level") return "/logo_BL.png";
  if (label === "Tissue Level") return "/logo_TL.png";
  if (label.includes("Cone Morse") || label.includes("Grand Morse") || label.includes("NobelActive") || label.includes("Xive")) return "/logo_CM.png";
  if (label.includes("Hexágono Externo") || label.includes("Hex. Externo")) return "/logo_HE.png";
  if (label.includes("Hexágono Interno")) return "/logo_HI.png";
  return null;
}

// ─── SELEÇÃO DE MARCA ─────────────────────────────────────────────────────────
function isCompatible(brand, ct) {
  if (!ct) return true;
  return Object.values(brand.families).some(fam =>
    Object.values(fam.lines).some(line => {
      const c = (line.connection || "").toLowerCase();
      if (ct === "HE") return c.includes("he") || c.includes("externo");
      if (ct === "HI") return c.includes("hi") || c.includes("interno");
      if (ct === "CM") return c.includes("morse") || c.includes("torcfit") || c.includes("crossfit");
      return false;
    })
  );
}

function BrandSelect({ go, state = {}, favorites, toggleFavorite }) {
  const [search, setSearch] = useState("");
  const { detectedConnection: ct } = state;

  const filtered = Object.entries(DB)
    .filter(([, brand]) => brand.label.toLowerCase().includes(search.toLowerCase()))
    .sort(([aKey, a], [bKey, b]) => {
      if (ct) {
        const aComp = isCompatible(a, ct);
        const bComp = isCompatible(b, ct);
        if (aComp !== bComp) return aComp ? -1 : 1;
      }
      const aFav = favorites.includes(aKey);
      const bFav = favorites.includes(bKey);
      if (aFav !== bFav) return aFav ? -1 : 1;
      return a.label.localeCompare(b.label, "pt-BR");
    });

  const ctLabel = ct === "HE" ? "Hexágono Externo" : ct === "HI" ? "Hexágono Interno" : ct === "CM" ? "Cone Morse" : null;

  return (
    <div style={G.page} className="fadein">
      <Hdr title="Selecionar Marca" sub={`${Object.keys(DB).length} marcas disponíveis`} onBack={() => go("home", {}, "back")} />
      {ct && (
        <InfoBox color="#f59e0b" icon={<Info size={11} color="#f59e0b" style={{ flexShrink: 0, marginTop: 1 }} />}>
          Conexão identificada: <strong>{ctLabel}</strong> — marcas compatíveis destacadas abaixo.
        </InfoBox>
      )}
      <div style={{ position: "relative" }}>
        <Search size={13} color="#64748b" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
        <input
          type="text"
          placeholder="Buscar marca..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", padding: "10px 12px 10px 34px", borderRadius: 10, background: "rgba(30,41,59,0.95)", border: "1px solid #475569", color: "white", fontSize: 13 }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {filtered.length === 0
          ? <p style={{ color: "#64748b", fontSize: 12, textAlign: "center" }}>Nenhuma marca encontrada.</p>
          : filtered.map(([key, brand]) => {
            const compat = isCompatible(brand, ct);
            return (
              <button key={key} className="hov" onClick={() => go("familySelect", { brand: key })}
                style={{ ...card, border: `1px solid ${compat ? brand.color : brand.color + "44"}`, opacity: ct && !compat ? 0.45 : 1 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: `${brand.color}22`, border: `1px solid ${brand.color}66`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: brand.color, fontFamily: "monospace", flexShrink: 0 }}>{brand.logo}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: "white", fontSize: 14 }}>{brand.label}</div>
                  <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 1 }}>
                    {Object.values(brand.families).map(f => f.label).join(" · ")}
                  </div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); toggleFavorite(key); }} aria-label={favorites.includes(key) ? "Remover favorito" : "Favoritar"}
                  style={{ width: 30, height: 30, borderRadius: 8, border: favorites.includes(key) ? "1px solid #f59e0b" : "1px solid #334155", background: favorites.includes(key) ? "rgba(245,158,11,.15)" : "transparent", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .2s", marginRight: 4 }}>
                  {favorites.includes(key) ? "⭐" : "☆"}
                </button>
                <ChevronRight size={14} color={brand.color} />
              </button>
            );
          })
        }
      </div>
    </div>
  );
}

// ─── FAMÍLIA ──────────────────────────────────────────────────────────────────
function FamilySelect({ state, go }) {
  const brand = DB[state.brand];
  const isStr = state.brand === "straumann";
  return (
    <div style={G.page} className="fadein">
      <Hdr title={isStr ? "Tipo de Implante" : "Conexão Protética"} sub={brand.label} color={brand.color} onBack={() => go("brandSelect", {}, "back")} />
      <Breadcrumb steps={[brand.label]} brandColor={brand.color} />
      {isStr && <InfoBox color="#3b82f6" icon={<Info size={11} color="#3b82f6" style={{ flexShrink: 0, marginTop: 1 }} />}>
        <strong style={{ color: "white" }}>Bone Level:</strong> plataforma ao nível da crista óssea. <strong style={{ color: "white" }}>Tissue Level:</strong> colar transmucoso integrado ao implante.
      </InfoBox>}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {Object.entries(brand.families).map(([key, fam]) => (
          <button key={key} className="hov" onClick={() => go("lineSelect", { ...state, family: key })}
            style={{ ...card, padding: "16px" }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(51,65,85,0.8)", border: "1px solid #64748b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {connLogo(fam.label) ? <img src={connLogo(fam.label)} alt={fam.label} style={{ width: 36, height: 36, objectFit: "contain" }} /> : <span style={{ fontSize: 26 }}>{fam.icon}</span>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: "white", fontSize: 14, marginBottom: 3 }}>{fam.label}</div>
              <div style={{ fontSize: 10, color: "#94a3b8", lineHeight: 1.4 }}>{fam.desc}</div>
            </div>
            <ChevronRight size={14} color="#475569" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── LINHA ────────────────────────────────────────────────────────────────────
function lineNext(line) {
  return line.hasBodySelect ? "bodySelect" : line.isTLX ? "tlxPlatform" : "objectiveSelect";
}

function LineSelect({ state, go }) {
  const brand = DB[state.brand];
  const fam = brand.families[state.family];
  const lines = Object.entries(fam.lines);

  useEffect(() => {
    if (lines.length === 1) {
      const [lineKey, line] = lines[0];
      go(lineNext(line), { ...state, line: lineKey });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (lines.length === 1) return <div style={G.page} />;

  return (
    <div style={G.page} className="fadein">
      <Hdr title="Linha do Implante" sub={`${brand.label} — ${fam.label}`} color={brand.color} onBack={() => go("familySelect", state, "back")} />
      <Breadcrumb steps={[brand.label, fam.label]} brandColor={brand.color} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {lines.map(([key, line]) => (
          <button key={key} className="hov" onClick={() => go(lineNext(line), { ...state, line: key })}
            style={{ ...card, padding: "16px" }}>
            <div style={{ width: 44, height: 44, borderRadius: 11, background: "rgba(51,65,85,0.8)", border: "1px solid #64748b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {connLogo(line.label) ? <img src={connLogo(line.label)} alt={line.label} style={{ width: 32, height: 32, objectFit: "contain" }} /> : <span style={{ fontSize: 22 }}>{line.icon}</span>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: "white", fontSize: 13, marginBottom: 3 }}>{line.label}</div>
              <div style={{ fontSize: 10, color: "#94a3b8", lineHeight: 1.4 }}>{line.desc}</div>
            </div>
            <ChevronRight size={14} color="#475569" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── SELEÇÃO DE CORPO (RB / WB) ───────────────────────────────────────────────
function BodySelect({ state, go }) {
  const brand = DB[state.brand];
  const fam = brand.families[state.family];
  const line = fam.lines[state.line];
  return (
    <div style={G.page} className="fadein">
      <Hdr title="Corpo do Implante" sub="Regular Body (RB) ou Wide Body (WB)?" color={brand.color} onBack={() => go("lineSelect", state, "back")} />
      <Breadcrumb steps={[brand.label, fam.label, line.label]} brandColor={brand.color} />
      <InfoBox color="#3b82f6" icon={<Info size={11} color="#3b82f6" style={{ flexShrink: 0, marginTop: 1 }} />}>
        Verifique o <strong style={{ color: "white" }}>diâmetro do implante</strong> na documentação clínica ou na embalagem para identificar o corpo correto.
      </InfoBox>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {line.bodyOptions.map((b) => (
          <button key={b.key} className="hov" onClick={() => go("objectiveSelect", { ...state, body: b.key })}
            style={{ ...card, padding: "16px", border: `1px solid ${b.color}55` }}>
            <div style={{ width: 44, height: 44, borderRadius: 11, background: `${b.color}22`, border: `1px solid ${b.color}66`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0, gap: 2 }}>
              <span style={{ fontSize: 11, color: b.color, fontWeight: 800 }}>{b.key}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: "white", fontSize: 13, marginBottom: 2 }}>{b.label}</div>
              <div style={{ fontWeight: 800, color: b.color, fontSize: 12, marginBottom: 3 }}>{b.diam}</div>
              <div style={{ fontSize: 10, color: "#94a3b8", lineHeight: 1.4 }}>{b.desc}</div>
            </div>
            <ChevronRight size={14} color="#475569" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── PLATAFORMA TLX ───────────────────────────────────────────────────────────
function TLXPlatform({ state, go }) {
  const brand = DB[state.brand];
  const fam = brand.families[state.family];
  const line = fam.lines[state.line];
  return (
    <div style={G.page} className="fadein">
      <Hdr title="Plataforma TLX" sub="Selecione o pescoço do implante" color="#3b82f6" onBack={() => go("lineSelect", state, "back")} />
      <Breadcrumb steps={[brand.label, fam.label, line.label]} brandColor={brand.color} />
      <InfoBox color="#3b82f6" icon={<Info size={11} color="#3b82f6" style={{ flexShrink: 0, marginTop: 1 }} />}>
        Marcação a laser no implante: <strong style={{ color: "white" }}>NT (1 ponto) · RT (2 pontos) · WT (3 pontos)</strong>. Nunca misture pilares de plataformas diferentes.
      </InfoBox>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {line.tlxPlatforms.map((p) => (
          <button key={p.key} className="hov" onClick={() => go("objectiveSelect", { ...state, tlxPlatform: p.key })}
            style={{ ...card, padding: "16px", border: `1px solid ${p.color}55` }}>
            <div style={{ width: 44, height: 44, borderRadius: 11, background: `${p.color}22`, border: `1px solid ${p.color}66`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0, gap: 2 }}>
              <span style={{ fontSize: 10, color: p.color, fontWeight: 800 }}>{p.key}</span>
              <span style={{ fontSize: 9, color: p.color, opacity: .7 }}>{p.dot}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: "white", fontSize: 13, marginBottom: 2 }}>{p.label}</div>
              <div style={{ fontWeight: 800, color: p.color, fontSize: 12, marginBottom: 3 }}>{p.diam}</div>
              <div style={{ fontSize: 10, color: "#94a3b8", lineHeight: 1.4 }}>{p.desc}</div>
            </div>
            <ChevronRight size={14} color="#475569" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── OBJETIVO ─────────────────────────────────────────────────────────────────
function ObjectiveSelect({ state, go }) {
  const brand = DB[state.brand];
  const fam = brand.families[state.family];
  const line = fam.lines[state.line];
  const lines = Object.entries(fam.lines);
  const backScreen = line.isTLX ? "tlxPlatform" : line.hasBodySelect ? "bodySelect" : (lines.length > 1 ? "lineSelect" : "familySelect");
  const tlxPlat = line.isTLX ? line.tlxPlatforms?.find(p => p.key === state.tlxPlatform) : null;
  const bodyOpt = line.hasBodySelect && state.body ? line.bodyOptions?.find(b => b.key === state.body) : null;
  return (
    <div style={G.page} className="fadein">
      <Hdr title="Objetivo Protético" sub="Unitária ou Prótese Unida?" onBack={() => go(backScreen, state, "back")} />
      <Breadcrumb steps={[brand.label, fam.label, line.label, tlxPlat ? `${tlxPlat.key} ${tlxPlat.diam}` : bodyOpt ? bodyOpt.key : null, null].filter(Boolean)} brandColor={brand.color} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {Object.entries(line.objectives).map(([key, obj]) => (
          <button key={key} className="hov" onClick={() => go("subtypeSelect", { ...state, objective: key })}
            style={{ ...card, padding: "18px", border: `1px solid ${key === "unitaria" ? "rgba(59,130,246,.35)" : "rgba(16,185,129,.35)"}` }}>
            <div style={{ fontSize: key === "unitaria" ? 26 : 18, width: 50, height: 50, borderRadius: 12, background: key === "unitaria" ? "rgba(59,130,246,.18)" : "rgba(16,185,129,.15)", border: `1px solid ${key === "unitaria" ? "rgba(59,130,246,.4)" : "rgba(16,185,129,.4)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, whiteSpace: "nowrap", letterSpacing: key === "unitaria" ? 0 : 1 }}>{obj.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: "white", fontSize: 14, marginBottom: 4 }}>{obj.label}</div>
              <div style={{ fontSize: 10, color: "#94a3b8", lineHeight: 1.5 }}>{obj.desc}</div>
            </div>
            <ChevronRight size={14} color="#475569" />
          </button>
        ))}
      </div>
      {state.brand === "straumann" && (
        <InfoBox color="#f59e0b" icon={<Info size={11} color="#f59e0b" style={{ flexShrink: 0, marginTop: 1 }} />}>
          <strong>Unitária:</strong> Variobase® (coroa única). &nbsp;<strong>Unida:</strong> SRA / MUA (múltiplos implantes em prótese fixa unida).
        </InfoBox>
      )}
    </div>
  );
}

// ─── SUBTIPO ──────────────────────────────────────────────────────────────────
function SubtypeSelect({ state, go }) {
  const brand = DB[state.brand];
  const fam = brand.families[state.family];
  const line = fam.lines[state.line];
  const obj = line.objectives[state.objective];
  const isTLX = !!line.isTLX;
  const allSubs = isTLX ? obj.subtypes.filter(s => s.plat === state.tlxPlatform) : obj.subtypes;
  const subs = state.body ? allSubs.filter(s => !s.body || s.body === state.body) : allSubs;
  const tlxPlat = isTLX ? line.tlxPlatforms?.find(p => p.key === state.tlxPlatform) : null;
  const bodyOpt = line.hasBodySelect && state.body ? line.bodyOptions?.find(b => b.key === state.body) : null;
  return (
    <div style={G.page} className="fadein">
      <Hdr title="Componente Protético" sub={obj.label} onBack={() => go("objectiveSelect", state, "back")} />
      <Breadcrumb steps={[brand.label, fam.label, line.label, tlxPlat ? tlxPlat.key : bodyOpt ? bodyOpt.key : null, obj.label].filter(Boolean)} brandColor={brand.color} />
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {subs.map((st) => (
          <button key={st.key} className="hov" onClick={() => go(isTLX ? "result" : "heightSelect", { ...state, subtype: st.key, gengivalHeight: isTLX ? "unico" : null })}
            style={{ ...card, padding: "16px" }}>
            <div style={{ fontSize: 20, width: 42, height: 42, borderRadius: 10, background: "rgba(51,65,85,0.8)", border: "1px solid #64748b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{st.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: "white", fontSize: 13, marginBottom: 3 }}>{st.label}</div>
              <div style={{ fontSize: 10, color: "#94a3b8", lineHeight: 1.4 }}>{st.desc}</div>
            </div>
            <ChevronRight size={14} color="#475569" style={{ flexShrink: 0 }} />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── ALTURA GENGIVAL ──────────────────────────────────────────────────────────
function HeightSelect({ state, go }) {
  const brand = DB[state.brand];
  const fam = brand.families[state.family];
  const line = fam.lines[state.line];
  const obj = line.objectives[state.objective];
  const st = obj.subtypes.find(s => s.key === state.subtype);
  return (
    <div style={G.page} className="fadein">
      <Hdr title="Altura Gengival" sub={st?.label} color="#10b981" onBack={() => go("subtypeSelect", state, "back")} />
      <Breadcrumb steps={[brand.label, fam.label, line.label, obj.label, st?.label]} brandColor={brand.color} />
      <InfoBox color="#10b981" icon={<Info size={11} color="#10b981" style={{ flexShrink: 0, marginTop: 1 }} />}>
        Meça a espessura do tecido mole com sonda periodontal para escolher a altura gengival correta.
      </InfoBox>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {Object.keys(st.heights).map((h) => (
          <button key={h} className="hov" onClick={() => go("result", { ...state, gengivalHeight: h })}
            style={{ ...card }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 18 }}>
              <div style={{ width: 4, height: Math.round(parseFloat(h) * 7) + 8, minHeight: 8, borderRadius: 2, background: "linear-gradient(180deg,#10b981,#059669)" }} />
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ ...G.mono, fontSize: 15, fontWeight: 800, color: "white" }}>{h.replace(".", ",")} mm</span>
              <p style={{ margin: "2px 0 0", fontSize: 10, color: "#94a3b8", lineHeight: 1.4 }}>{HEIGHT_DESCS[h] || ""}</p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 8, color: "#64748b", marginBottom: 1 }}>REF.</div>
              <div style={{ ...G.mono, fontSize: 9, color: "#60a5fa" }}>{st.heights[h]?.sku || "—"}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── RESULTADO ────────────────────────────────────────────────────────────────
function Result({ state, go, addToCart, reset, addToHistory }) {
  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);
  const brand = DB[state.brand];
  const fam = brand.families[state.family];
  const line = fam.lines[state.line];
  const obj = line.objectives[state.objective];
  const st = obj.subtypes.find(s => s.key === state.subtype);
  const isTLX = !!line.isTLX;
  const comp = st?.heights?.[isTLX ? "unico" : state.gengivalHeight];
  const tlxPlat = isTLX ? line.tlxPlatforms?.find(p => p.key === state.tlxPlatform) : null;
  const bodyOpt = line.hasBodySelect && state.body ? line.bodyOptions?.find(b => b.key === state.body) : null;
  const backScreen = isTLX ? "subtypeSelect" : "heightSelect";

  useEffect(() => {
    if (comp && addToHistory) {
      addToHistory({
        brand: state.brand, family: state.family, line: state.line,
        body: state.body, tlxPlatform: state.tlxPlatform, objective: state.objective,
        subtype: state.subtype, gengivalHeight: state.gengivalHeight,
        name: comp.name, sku: comp.sku, label: brand.label,
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!comp) return <div style={{ padding: 20, color: "white" }}><p>Componente não encontrado.</p><button onClick={reset} style={{ color: "#3b82f6", background: "none", border: "none", cursor: "pointer" }}>↩ Recomeçar</button></div>;

  return (
    <div style={G.page} className="fadein">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Back onClick={() => go(backScreen, state, "back")} />
        <span style={{ fontSize: 9, color: "#10b981", fontWeight: 700, textTransform: "uppercase", letterSpacing: .8 }}>✓ Componente Encontrado</span>
        {/* Botão Reiniciar — emoticon Unicode ↺ */}
        <button onClick={reset} aria-label="Reiniciar consulta"
          style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(30,41,59,0.9)", border: "1px solid #475569", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <span style={{ color: "#e2e8f0", fontSize: 20 }}>↺</span>
        </button>
      </div>
      <Breadcrumb steps={[brand.label, fam.label, line.label, tlxPlat ? tlxPlat.key : bodyOpt ? bodyOpt.key : null, obj.label].filter(Boolean)} brandColor={brand.color} />
      <div style={{ borderRadius: 16, padding: "18px", background: "rgba(30,41,59,0.95)", border: "1px solid rgba(59,130,246,.4)", boxShadow: "0 16px 44px rgba(0,0,0,.5)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 13 }}>
          <div style={{ padding: "3px 8px", borderRadius: 6, background: `${brand.color}33`, border: `1px solid ${brand.color}77` }}><span style={{ fontSize: 9, fontWeight: 700, color: "white" }}>{brand.label}</span></div>
          <div style={{ padding: "3px 8px", borderRadius: 6, background: "rgba(51,65,85,0.8)", border: "1px solid #64748b" }}><span style={{ fontSize: 9, color: "#cbd5e1" }}>{line.connection}</span></div>
          {tlxPlat
            ? <div style={{ padding: "3px 8px", borderRadius: 6, background: `${tlxPlat.color}22`, border: `1px solid ${tlxPlat.color}66` }}><span style={{ ...G.mono, fontSize: 9, color: tlxPlat.color, fontWeight: 700 }}>{tlxPlat.key} {tlxPlat.diam}</span></div>
            : <div style={{ padding: "3px 8px", borderRadius: 6, background: "rgba(16,185,129,.2)", border: "1px solid rgba(16,185,129,.5)" }}><span style={{ ...G.mono, fontSize: 9, color: "#10b981", fontWeight: 700 }}>↕ {state.gengivalHeight?.replace(".", ",")}mm</span></div>
          }
          {bodyOpt && <div style={{ padding: "3px 8px", borderRadius: 6, background: `${bodyOpt.color}22`, border: `1px solid ${bodyOpt.color}66` }}><span style={{ ...G.mono, fontSize: 9, color: bodyOpt.color, fontWeight: 700 }}>{bodyOpt.key} · {bodyOpt.diam}</span></div>}
        </div>
        <div style={{ fontSize: 8, color: "#94a3b8", fontWeight: 600, letterSpacing: .5, textTransform: "uppercase", marginBottom: 3 }}>{comp.type}</div>
        <h3 style={{ margin: "0 0 7px", fontSize: 14, fontWeight: 700, color: "white", lineHeight: 1.3 }}>{comp.name}</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 14 }}>
          <span style={{ fontSize: 8, color: "#94a3b8" }}>REF.</span>
          <span style={{ ...G.mono, fontSize: 11, fontWeight: 600, color: "#60a5fa", background: "rgba(59,130,246,.15)", padding: "2px 6px", borderRadius: 5 }}>{comp.sku}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
          {st.imgRef
            ? <div style={{ width: 110, height: 110, borderRadius: 12, background: "linear-gradient(135deg,#0f172a,#1e293b)", border: "1px solid rgba(59,130,246,.35)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <img src={st.imgRef} alt={st.label} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 4 }} onError={e => { e.target.style.display = "none"; }} />
              </div>
            : <ImplantShape shape={comp.shape || "variobase"} size={110} />
          }
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          <div style={{ padding: "14px", borderRadius: 9, background: "rgba(245,158,11,.12)", border: "1px solid rgba(245,158,11,.4)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}><Zap size={9} color="#f59e0b" /><span style={{ fontSize: 8, color: "#fcd34d", fontWeight: 700, textTransform: "uppercase" }}>Torque</span></div>
            <span style={{ ...G.mono, fontSize: 28, fontWeight: 800, color: "#f59e0b", letterSpacing: -0.5 }}>{comp.torque}</span>
          </div>
          <div style={{ padding: "14px", borderRadius: 9, background: "rgba(59,130,246,.12)", border: "1px solid rgba(59,130,246,.4)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}><Shield size={9} color="#60a5fa" /><span style={{ fontSize: 8, color: "#93c5fd", fontWeight: 700, textTransform: "uppercase" }}>Chave</span></div>
            <span style={{ ...G.mono, fontSize: 18, fontWeight: 800, color: "#60a5fa" }}>{comp.chave}</span>
          </div>
          <div style={{ padding: "11px", borderRadius: 9, background: "rgba(51,65,85,0.8)", border: "1px solid #64748b", gridColumn: "span 2", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div><div style={{ fontSize: 8, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>Material</div><span style={{ fontSize: 10, color: "#cbd5e1" }}>{comp.material}</span></div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 8, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>{tlxPlat ? "Plataforma" : "Alt. Gengival"}</div>
              <span style={{ ...G.mono, fontSize: 11, fontWeight: 700, color: tlxPlat ? tlxPlat.color : "#10b981" }}>
                {tlxPlat ? `${tlxPlat.key} ${tlxPlat.diam}` : `${state.gengivalHeight?.replace(".", ",")} mm`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Botão Adicionar ao Pedido — ícone SVG inline, stroke hardcoded */}
      <button
        onClick={() => { addToCart({ id: Date.now(), name: comp.name, sku: comp.sku, brandLabel: brand.label, brandSite: brand.site }); setAdded(true); setTimeout(() => setAdded(false), 2500); }}
        style={{ padding: "14px", borderRadius: 12, border: "none", cursor: "pointer", background: added ? "linear-gradient(135deg,#059669,#10b981)" : "linear-gradient(135deg,#1d4ed8,#3b82f6)", color: "white", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, transition: "all .35s ease" }}
      >
        {added ? (<><CheckCircle size={14} />Adicionado!</>) : (<><span style={{ fontSize: 16 }}>🛒</span> Adicionar ao Pedido</>)}
      </button>

      <button
        onClick={() => {
          const texto = [
            `${brand.label} — ${line.label}`,
            comp.name,
            `REF: ${comp.sku}`,
            `Torque: ${comp.torque}`,
            `Chave: ${comp.chave}`,
            `Material: ${comp.material}`,
            tlxPlat ? `Plataforma: ${tlxPlat.key} ${tlxPlat.diam}` : `Altura Gengival: ${state.gengivalHeight.replace(".", ",")}mm`,
          ].join("\n");
          navigator.clipboard.writeText(texto);
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        }}
        style={{ padding: "12px", borderRadius: 11, border: "1px solid #475569", cursor: "pointer", background: copied ? "linear-gradient(135deg,#059669,#10b981)" : "rgba(30,41,59,0.9)", color: copied ? "white" : "#cbd5e1", fontSize: 11, fontWeight: copied ? 700 : 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "all .35s ease" }}
      >
        {copied ? "✓ Copiado!" : (<>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copiar resultado
        </>)}
      </button>

      <a href={`https://${brand.site}`} target="_blank" rel="noopener noreferrer"
        style={{ padding: "11px", borderRadius: 11, border: "1px solid #475569", color: "#cbd5e1", fontWeight: 600, fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, textDecoration: "none", background: "rgba(30,41,59,0.9)" }}>
        <ExternalLink size={11} />Ver no site do fabricante
      </a>
      <button onClick={reset} style={{ padding: "10px", borderRadius: 11, border: "1px solid #334155", cursor: "pointer", background: "transparent", color: "#64748b", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
        <Home size={11} />Nova consulta
      </button>
    </div>
  );
}

// ─── TELA CARRINHO ────────────────────────────────────────────────────────────
function CartScreen({ cart, removeFromCart, clearCart, go }) {
  const brandSites = [...new Set(cart.map(i => i.brandSite).filter(Boolean))];

  return (
    <div style={G.page} className="fadein">
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <Back onClick={() => go("home", {}, "back")} />
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "white" }}>🛒 Revisão do Pedido</h2>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "#94a3b8" }}>{cart.length} item(s)</span>
      </div>

      {cart.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 20px", color: "#64748b" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div>
          <p style={{ margin: 0, fontSize: 13 }}>Nenhum componente no pedido.</p>
          <button onClick={() => go("home", {})} style={{ marginTop: 16, padding: "10px 20px", borderRadius: 10, border: "1px solid #475569", background: "rgba(30,41,59,0.9)", color: "#cbd5e1", fontSize: 12, cursor: "pointer" }}>
            ← Voltar ao início
          </button>
        </div>
      ) : (
        <>
          <div id="print-area">
            {cart.map(item => (
              <div key={item.id} className="print-card" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "10px 12px", borderRadius: 10, background: "rgba(30,41,59,0.9)", border: "1px solid #334155", marginBottom: 6 }}>
                <div>
                  <div style={{ fontSize: 12, color: "white", fontWeight: 600 }}>{item.name}</div>
                  <div className="print-sku" style={{ fontSize: 10, color: "#60a5fa", fontFamily: "monospace", marginTop: 2 }}>REF: {item.sku}</div>
                  {item.brandLabel && <div className="print-brand" style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>{item.brandLabel}</div>}
                </div>
                <button onClick={() => removeFromCart(item.id)} className="no-print" aria-label={`Remover ${item.name}`}
                  style={{ width: 26, height: 26, borderRadius: 6, background: "rgba(239,68,68,.2)", border: "1px solid rgba(239,68,68,.4)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, marginLeft: 8 }}>
                  <span style={{ color: "white", fontSize: 16, lineHeight: 1 }}>✕</span>
                </button>
              </div>
            ))}
          </div>

          <div className="no-print" style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
            <button onClick={() => window.print()}
              style={{ padding: "13px", borderRadius: 12, border: "none", cursor: "pointer", background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", color: "white", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
              <span style={{ fontSize: 15 }}>🖨️</span> Imprimir Pedido
            </button>
            {brandSites.map(site => (
              <a key={site} href={`https://${site}`} target="_blank" rel="noopener noreferrer"
                style={{ padding: "11px", borderRadius: 11, border: "1px solid #475569", color: "#cbd5e1", fontWeight: 600, fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, textDecoration: "none", background: "rgba(30,41,59,0.9)" }}>
                <span style={{ fontSize: 13 }}>🔗</span> Ir para a loja: {site}
              </a>
            ))}
            <button onClick={() => { clearCart(); go("home", {}); }}
              style={{ padding: "10px", borderRadius: 11, border: "1px solid #334155", cursor: "pointer", background: "transparent", color: "#64748b", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
              <span style={{ fontSize: 13 }}>🗑️</span> Limpar Pedido
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home");
  const [slideDir, setSlideDir] = useState("forward");
  const [state, setState] = useState({});
  const [cart, setCart] = useState(() => { try { return JSON.parse(localStorage.getItem("sartori_cart") || "[]"); } catch { return []; } });
  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => { try { return JSON.parse(localStorage.getItem("fav_brands") || "[]"); } catch { return []; } });
  const [favOpen, setFavOpen] = useState(false);

  const [history, setHistory] = useState(() => { try { return JSON.parse(localStorage.getItem("sartori_history") || "[]"); } catch { return []; } });

  const go = (newScreen, newState = {}, dir = "forward") => { setSlideDir(dir); setState(newState); setScreen(newScreen); setFavOpen(false); };
  const reset = () => { setState({}); setScreen("home"); };
  const addToCart = (item) => setCart(prev => { const next = [...prev, item]; localStorage.setItem("sartori_cart", JSON.stringify(next)); return next; });
  const addToHistory = (item) => setHistory(prev => {
    const dedup = prev.filter(h => h.sku !== item.sku);
    const next = [item, ...dedup].slice(0, 5);
    localStorage.setItem("sartori_history", JSON.stringify(next));
    return next;
  });
  const clearHistory = () => { setHistory([]); localStorage.removeItem("sartori_history"); };
  const removeFromCart = (id) => setCart(prev => { const next = prev.filter(i => i.id !== id); localStorage.setItem("sartori_cart", JSON.stringify(next)); return next; });
  const clearCart = () => { setCart([]); localStorage.removeItem("sartori_cart"); };
  const toggleFavorite = (key) => setFavorites(prev => {
    const next = prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key];
    localStorage.setItem("fav_brands", JSON.stringify(next));
    return next;
  });

  const handleAiSend = async () => {
    if (!aiInput.trim() || aiLoading) return;
    setAiLoading(true);
    setAiReply("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: aiInput.trim() }),
      });
      const data = await res.json();
      setAiReply(data.reply || data.error || "Sem resposta.");
    } catch {
      setAiReply("Erro ao conectar com o assistente.");
    } finally {
      setAiLoading(false);
      setAiInput("");
    }
  };

  const screens = {
    home: <HomeScreen go={go} history={history} clearHistory={clearHistory} />,
    about: <About go={go} />,
    detective: <Detective go={go} />,
    brandSelect: <BrandSelect go={go} state={state} favorites={favorites} toggleFavorite={toggleFavorite} />,
    familySelect: <FamilySelect state={state} go={go} />,
    lineSelect: <LineSelect state={state} go={go} />,
    bodySelect: <BodySelect state={state} go={go} />,
    tlxPlatform: <TLXPlatform state={state} go={go} />,
    objectiveSelect: <ObjectiveSelect state={state} go={go} />,
    subtypeSelect: <SubtypeSelect state={state} go={go} />,
    heightSelect: <HeightSelect state={state} go={go} />,
    result: <Result state={state} go={go} addToCart={addToCart} reset={reset} addToHistory={addToHistory} />,
    cart: <CartScreen cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} go={go} />,
  };

  return (
    // #root já tem display:flex + justify-content:center via CSS
    // Este div é o wrapper de 430px centralizado
    <div style={{ width: "100%", maxWidth: 430, minHeight: "100vh", position: "relative", color: "white" }}>
      <Sty />
      <div key={screen} className={slideDir === "back" ? "fadein-back" : "fadein"} style={{ width: "100%" }}>
        {screens[screen] || screens.home}
      </div>

      {/* Botão flutuante Favoritos */}
      {favorites.length > 0 && (
        <div style={{ position: "fixed", bottom: 16, left: 16, zIndex: 101, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
          {favOpen && (
            <div style={{ background: "rgba(15,23,42,0.97)", border: "1px solid #f59e0b", borderRadius: 12, padding: "10px 12px", minWidth: 180, boxShadow: "0 4px 20px rgba(245,158,11,.2)" }}>
              <div style={{ fontSize: 10, color: "#f59e0b", fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Acesso rápido</div>
              {favorites.map(key => { const brand = DB[key]; if (!brand) return null; return (
                <button key={key} onClick={() => go("familySelect", { brand: key })}
                  style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", background: "transparent", border: "none", cursor: "pointer", padding: "6px 4px", borderRadius: 8, marginBottom: 2 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: `${brand.color}22`, border: `1px solid ${brand.color}66`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 800, color: brand.color, fontFamily: "monospace", flexShrink: 0 }}>{brand.logo}</div>
                  <span style={{ color: "white", fontSize: 13, fontWeight: 600 }}>{brand.label}</span>
                </button>
              ); })}
            </div>
          )}
          <button onClick={() => setFavOpen(v => !v)} aria-label="Marcas favoritas"
            style={{ width: 48, height: 48, borderRadius: "50%", background: favOpen ? "linear-gradient(135deg,#92400e,#d97706)" : "linear-gradient(135deg,#78350f,#b45309)", border: `2px solid #f59e0b`, fontSize: 22, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 16px rgba(245,158,11,.4)" }}>
            ⭐
          </button>
        </div>
      )}

      {/* Botões flutuantes direita: IA (baixo) + Carrinho (acima da IA quando visível) */}
      <div style={{ position: "fixed", bottom: 16, right: 16, zIndex: 101, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
        {aiOpen && (
          <div style={{ background: "rgba(15,23,42,0.97)", border: "1px solid #3b82f6", borderRadius: 14, padding: "14px", width: 280, boxShadow: "0 4px 24px rgba(59,130,246,.3)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#60a5fa", marginBottom: 10 }}>🤖 Assistente Clínico</div>
            {aiReply && (
              <div style={{ fontSize: 11, color: "#e2e8f0", lineHeight: 1.6, marginBottom: 10, padding: "10px", borderRadius: 8, background: "rgba(59,130,246,.1)", border: "1px solid rgba(59,130,246,.2)" }}>
                {aiReply}
              </div>
            )}
            <textarea
              value={aiInput}
              onChange={e => setAiInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleAiSend(); } }}
              placeholder="Digite sua dúvida clínica..."
              rows={3}
              style={{ width: "100%", background: "rgba(30,41,59,0.95)", border: "1px solid #475569", borderRadius: 8, color: "white", fontSize: 11, padding: "8px 10px", resize: "none", fontFamily: "inherit" }}
            />
            <button
              onClick={handleAiSend}
              disabled={aiLoading || !aiInput.trim()}
              style={{ marginTop: 8, width: "100%", padding: "8px", borderRadius: 8, border: "none", background: aiLoading ? "rgba(59,130,246,.4)" : "linear-gradient(135deg,#1d4ed8,#3b82f6)", color: "white", fontSize: 11, fontWeight: 700, cursor: aiLoading ? "not-allowed" : "pointer" }}
            >
              {aiLoading ? "Consultando..." : "Enviar"}
            </button>
          </div>
        )}
        {cart.length > 0 && (
          <div style={{ position: "relative" }}>
            <button
              onClick={() => go("cart", {})}
              style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", border: "2px solid #3b82f6", fontSize: 22, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 16px rgba(59,130,246,.45)" }}
              aria-label="Carrinho"
            >
              🛒
            </button>
            <div style={{ position: "absolute", top: -4, right: -4, width: 18, height: 18, borderRadius: "50%", background: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "white", pointerEvents: "none" }}>
              {cart.length}
            </div>
          </div>
        )}
        <button
          onClick={() => setAiOpen(v => !v)}
          style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#1e3a8a,#1d4ed8)", border: "2px solid #3b82f6", fontSize: 22, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 16px rgba(59,130,246,.45)" }}
          aria-label="Assistente IA"
        >
          🤖
        </button>
      </div>
    </div>
  );
}