// ─── Helper ──────────────────────────────────────────────────────────────────
export function gh(baseName, baseInfo, pairs) {
  const out = {};
  pairs.forEach(([h, sku]) => {
    out[h] = { name: `${baseName} GH ${h.replace(".", ",")}mm`, sku, torque: baseInfo.torque, chave: baseInfo.chave, type: baseInfo.type, material: baseInfo.material, shape: baseInfo.shape || "variobase" };
  });
  return out;
}

// ─── BASE DE DADOS ────────────────────────────────────────────────────────────
export const DB = {
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

// ─── DB Summary Generator ─────────────────────────────────────────────────────
export function generateDBSummary() {
  const lines = [];
  for (const [, brand] of Object.entries(DB)) {
    for (const [, fam] of Object.entries(brand.families)) {
      for (const [, line] of Object.entries(fam.lines)) {
        const components = [];
        for (const [, obj] of Object.entries(line.objectives || {})) {
          for (const st of (obj.subtypes || [])) {
            const firstHeight = Object.values(st.heights || {})[0];
            const torque = firstHeight?.torque || "";
            const chave = firstHeight?.chave || "";
            components.push(`${st.label} (torque: ${torque}, chave: ${chave})`);
          }
        }
        lines.push(
          `${brand.label} — ${fam.label} — ${line.label} | conexão: ${line.connection || "n/d"} | componentes: ${components.join(", ")}`
        );
      }
    }
  }
  return lines.join("\n");
}
