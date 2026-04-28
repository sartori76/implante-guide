// src/rxdb.js
// ─────────────────────────────────────────────────────────────────────────────
// BANCO DE IDENTIFICACAO RADIOGRAFICA DE IMPLANTES
//
// Separado do db.js (catalogo protetico) porque tem funcao diferente:
//   - db.js       = catalogo de COMPONENTES proteticos por marca
//   - rxdb.js     = dados para IDENTIFICAR a marca/linha a partir de um RX
//
// Fonte primaria: "Guia Pratico para Identificacao de Implantes" (Pedro Nery)
// Consolidado em abril/2026.
//
// IMPORTANTE - REGRA CLINICA DO APP:
//   Este banco identifica a marca/linha do implante a partir do RX.
//   ATENCAO: o app NUNCA sugere componente protetico off-label.
//   Apos identificar a marca/linha, o protetico especifico vem do db.js
//   da propria marca - sem sugestao de "compatibilidade cruzada".
// ─────────────────────────────────────────────────────────────────────────────

/** @typedef {'HE'|'HI'|'CM'|'CM-sem-rosca'|'Bicon'|'Tri'} ConnType */

export const RX_DB = [
  // ═════════════════════════════════ NEODENT ═════════════════════════════════
  {
    brandKey: 'neodent',
    brand: 'Neodent',
    lineKey: 'cm_convencional',
    line: 'Cone Morse Convencional',
    models: ['Drive', 'Titamax', 'Alvim'],
    connection: {
      type: 'CM',
      internalThread: 1.8,      // mm
      internalAngle: 11.5,      // graus
      platformDiameter: 2.5,    // mm
      hasInternalThread: true,
    },
    rxSigns: [
      'Interface protetica unica, independente do diametro do implante',
      'Importante observar a anatomia interna para confirmar que se trata de Neodent CM convencional',
    ],
    images: {
      page: 'rx/pages/neodent_cm_convencional.jpg',
      embedded: [
        'rx/embedded/neodent_cm_convencional_01.jpg',
      ],
    },
    source: { pdf: 'guia_identificacao_implantes', printedPage: 21 },
  },
  {
    brandKey: 'neodent',
    brand: 'Neodent',
    lineKey: 'gran_morse',
    line: 'Gran Morse (GM)',
    models: ['Helix GM', 'Titamax GM', 'Drive GM'],
    connection: {
      type: 'CM',
      internalThread: 1.6,
      internalAngle: 16,
      platformDiameter: 3.0,
      hasInternalThread: true,
    },
    rxSigns: [
      'Implantes GM apresentam 3 niveis internos bem definidos ao olhar radiografico',
    ],
    images: {
      page: 'rx/pages/neodent_gran_morse.jpg',
      embedded: [
        'rx/embedded/neodent_gran_morse_01.jpg',
        'rx/embedded/neodent_gran_morse_02.jpg',
      ],
    },
    source: { pdf: 'guia_identificacao_implantes', printedPage: 22 },
  },

  // ══════════════════════════════════ S.I.N. ══════════════════════════════════
  {
    brandKey: 'sin',
    brand: 'S.I.N.',
    lineKey: 'cm_11_5',
    line: 'Cone Morse 11,5°',
    models: ['Strong SW', 'Epikut', 'Tryon'],
    connection: {
      type: 'CM',
      internalThread: 1.8,
      internalAngle: 11.5,
      platformDiameter: 2.5,
      hasInternalThread: true,
    },
    rxSigns: [],
    images: {
      page: 'rx/pages/sin_cm_11_5.jpg',
      embedded: [
        'rx/embedded/sin_cm_11_5_01.jpg',
        'rx/embedded/sin_cm_11_5_02.jpg',
      ],
    },
    source: { pdf: 'guia_identificacao_implantes', printedPage: 23 },
  },
  {
    brandKey: 'sin',
    brand: 'S.I.N.',
    lineKey: 'cm_16',
    line: 'Cone Morse 16° (variante)',
    models: ['Strong SW', 'Epikut'],
    connection: {
      type: 'CM',
      internalThread: 1.6,
      internalAngle: 16,
      platformDiameter: 2.72,   // <- diferente de Neodent GM (3.0mm)
      hasInternalThread: true,
    },
    rxSigns: [
      'Angulacao 16° mas diametro da plataforma (2,72mm) menor que Neodent GM (3,0mm)',
    ],
    images: {
      page: 'rx/pages/sin_cm_16.jpg',
      embedded: [
        'rx/embedded/sin_cm_16_01.jpg',
        'rx/embedded/sin_cm_16_02.jpg',
        'rx/embedded/sin_cm_16_03.jpg',
      ],
    },
    source: { pdf: 'guia_identificacao_implantes', printedPage: 24 },
  },
  {
    brandKey: 'sin',
    brand: 'S.I.N.',
    lineKey: 'unitite_prime',
    line: 'Unitite Prime',
    models: ['Prime'],
    connection: {
      type: 'CM',
      internalThread: null,
      internalAngle: 11.5,
      platformDiameter: 2.5,
      hasInternalThread: true,
    },
    rxSigns: [],
    images: { page: 'rx/pages/sin_unitite.jpg', embedded: [] },
    source: { pdf: 'guia_identificacao_implantes', printedPage: 25 },
  },
  {
    brandKey: 'sin',
    brand: 'S.I.N.',
    lineKey: 'unitite_compact',
    line: 'Unitite Compact',
    models: ['Compact'],
    connection: {
      type: 'CM',
      internalThread: null,
      internalAngle: 4,
      platformDiameter: 2.5,
      hasInternalThread: true,
    },
    rxSigns: ['Angulacao interna muito baixa (4°), paredes quase paralelas'],
    images: { page: 'rx/pages/sin_unitite.jpg', embedded: [] },
    source: { pdf: 'guia_identificacao_implantes', printedPage: 25 },
  },
  {
    brandKey: 'sin',
    brand: 'S.I.N.',
    lineKey: 'unitite_slim',
    line: 'Unitite Slim',
    models: ['Slim'],
    connection: {
      type: 'CM',
      internalThread: null,
      internalAngle: 3,
      platformDiameter: 2.0,
      hasInternalThread: true,
    },
    rxSigns: ['Corpo estreito, angulacao 3° - paredes quase paralelas'],
    images: { page: 'rx/pages/sin_unitite.jpg', embedded: [] },
    source: { pdf: 'guia_identificacao_implantes', printedPage: 25 },
  },

  // ═══════════════════════════════ CONEXAO ══════════════════════════════════
  {
    brandKey: 'conexao',
    brand: 'Conexao Sistemas de Protese',
    lineKey: 'cm_np',
    line: 'Cone Morse Plataforma NP',
    models: ['Flash', 'Torq', 'Expand'],
    connection: {
      type: 'CM',
      internalThread: 1.6,
      internalAngle: 24,
      platformDiameter: 2.95,
      hasInternalThread: true,
    },
    rxSigns: ['Angulacao interna de 24° - abertura evidente no RX'],
    images: {
      page: 'rx/pages/conexao_cm_np.jpg',
      embedded: ['rx/embedded/conexao_cm_np_01.jpg'],
    },
    source: { pdf: 'guia_identificacao_implantes', printedPage: 26 },
  },
  {
    brandKey: 'conexao',
    brand: 'Conexao Sistemas de Protese',
    lineKey: 'cm_fit',
    line: 'Cone Morse Plataforma FIT',
    models: ['Flash', 'Torq', 'Flex Gold'],
    connection: {
      type: 'CM',
      internalThread: 1.8,
      internalAngle: 11.5,
      platformDiameter: 2.5,
      hasInternalThread: true,
    },
    rxSigns: [],
    images: {
      page: 'rx/pages/conexao_cm_fit.jpg',
      embedded: ['rx/embedded/conexao_cm_fit_01.jpg'],
    },
    source: { pdf: 'guia_identificacao_implantes', printedPage: 27 },
  },

  // ═══════════════════════════════ STRAUMANN ════════════════════════════════
  {
    brandKey: 'straumann',
    brand: 'Straumann',
    lineKey: 'bone_tissue_level',
    line: 'Bone Level / Tissue Level',
    models: ['BL', 'BLT', 'BLX', 'BLC', 'TL', 'TLX', 'TLC', 'SC'],
    connection: {
      type: 'CM',
      internalThread: 1.8,
      internalAngle: 8,         // <- unico 8°, diferencial Straumann
      platformDiameter: {       // diametro depende do corpo
        'Ø3.3': 2.8,
        'Ø4.1 | Ø4.8': 3.3,
      },
      hasInternalThread: true,
    },
    rxSigns: [
      'Angulacao interna de 8° - unica no mercado (diferencial Straumann)',
      'Apices arredondados - caracteristica muito especifica da marca',
      'Tissue Level: colar liso supra-osseo visivel no RX',
    ],
    images: {
      page: 'rx/pages/straumann_bl_tl.jpg',
      pageExtra: 'rx/pages/straumann_rx_extra.jpg',
      embedded: [
        'rx/embedded/straumann_bl_tl_01.jpg',
        'rx/embedded/straumann_bl_tl_02.jpg',
        'rx/embedded/straumann_bl_tl_03.jpg',
        'rx/embedded/straumann_rx_extra_01.jpg',
        'rx/embedded/straumann_rx_extra_02.jpg',
        'rx/embedded/straumann_rx_extra_03.jpg',
        'rx/embedded/straumann_rx_extra_04.jpg',
        'rx/embedded/straumann_rx_extra_05.jpg',
      ],
    },
    source: { pdf: 'guia_identificacao_implantes', printedPage: 28 },
  },

  // ═══════════════════════════════ NOBEL BIOCARE ════════════════════════════
  {
    brandKey: 'nobel',
    brand: 'Nobel Biocare',
    lineKey: 'cm_triangular',
    line: 'Cone Morse - anatomia triangular',
    models: ['NobelActive', 'NobelReplace', 'NobelParallel CC'],
    connection: {
      type: 'Tri',
      internalThread: null,
      internalAngle: null,
      platformDiameter: null,
      hasInternalThread: true,
    },
    rxSigns: [
      'Anatomia triangular UNICA da Nobel - facil identificacao clinica',
      'Coloracao diferenciada da plataforma por plataforma (NP rosa, RP amarelo, WP azul, 6.0 verde)',
    ],
    images: {
      page: 'rx/pages/nobel_biocare.jpg',
      pageExtra: 'rx/pages/nobel_biocare_rx_extra.jpg',
      embedded: [
        'rx/embedded/nobel_biocare_01.jpg',
        'rx/embedded/nobel_biocare_02.jpg',
        'rx/embedded/nobel_biocare_03.jpg',
        'rx/embedded/nobel_biocare_04.jpg',
        'rx/embedded/nobel_biocare_rx_extra_01.jpg',
        'rx/embedded/nobel_biocare_rx_extra_02.jpg',
        'rx/embedded/nobel_biocare_rx_extra_03.jpg',
      ],
    },
    source: { pdf: 'guia_identificacao_implantes', printedPage: 30 },
  },

  // ══════════════════════════════════ FGM ════════════════════════════════════
  {
    brandKey: 'fgm',
    brand: 'FGM',
    lineKey: 'arcsys',
    line: 'Arcsys',
    models: ['Arcsys'],
    connection: {
      type: 'CM-sem-rosca',
      internalThread: null,
      internalAngle: null,
      platformDiameter: null,
      hasInternalThread: false, // <- diferencial absoluto
    },
    rxSigns: [
      'Ausencia TOTAL de rosca interna visivel no RX - diferencial absoluto',
      'Interface protetica unica para todos os implantes',
      'Componente protetico fixado por friccao mecanica (sem parafuso)',
    ],
    images: {
      page: 'rx/pages/fgm_arcsys.jpg',
      embedded: [
        'rx/embedded/fgm_arcsys_01.jpg',
        'rx/embedded/fgm_arcsys_02.jpg',
        'rx/embedded/fgm_arcsys_03.jpg',
        'rx/embedded/fgm_arcsys_04.jpg',
      ],
    },
    source: { pdf: 'guia_identificacao_implantes', printedPage: 32 },
  },

  // ═══════════════════════════════ IMPLACIL ═════════════════════════════════
  {
    brandKey: 'implacil',
    brand: 'Implacil De Bortoli',
    lineKey: 'cm_11_5',
    line: 'Cone Morse',
    models: ['Maestro CM AR', 'Veloce AR', 'Due Cone'],
    connection: {
      type: 'CM',
      internalThread: 1.8,
      internalAngle: 11.5,
      platformDiameter: 2.5,
      hasInternalThread: true,
    },
    rxSigns: [],
    images: {
      page: 'rx/pages/implacil_cm.jpg',
      embedded: ['rx/embedded/implacil_cm_01.jpg'],
    },
    source: { pdf: 'guia_identificacao_implantes', printedPage: 33 },
  },

  // ════════════════════════════════ INTRAOSS ════════════════════════════════
  {
    brandKey: 'intraoss',
    brand: 'Intraoss',
    lineKey: 'cm_11_5',
    line: 'Cone Morse',
    models: ['Advanced', 'Conico', 'Extract', 'Cortical'],
    connection: {
      type: 'CM',
      internalThread: 1.8,
      internalAngle: 11.5,
      platformDiameter: 2.5,
      hasInternalThread: true,
    },
    rxSigns: [],
    images: {
      page: 'rx/pages/intraoss_cm.jpg',
      embedded: [
        'rx/embedded/intraoss_cm_01.jpg',
        'rx/embedded/intraoss_cm_02.jpg',
      ],
    },
    source: { pdf: 'guia_identificacao_implantes', printedPage: 34 },
  },

  // ═══════════════════════════════ SINGULAR ═════════════════════════════════
  {
    brandKey: 'singular',
    brand: 'Singular Implants',
    lineKey: 'cm_11_5',
    line: 'Conexao Conica 11,5°',
    models: ['Conico', 'Cilindrico', 'Go Direct'],
    connection: {
      type: 'CM',
      internalThread: 1.8,
      internalAngle: 11.5,
      platformDiameter: 2.5,
      hasInternalThread: true,
    },
    rxSigns: [],
    images: { page: 'rx/pages/singular_cm_11_5.jpg', embedded: [] },
    source: { pdf: 'guia_identificacao_implantes', printedPage: 35 },
  },
  {
    brandKey: 'singular',
    brand: 'Singular Implants',
    lineKey: 'gmc_16',
    line: 'Conexao Conica GMC 16°',
    models: ['GMC Conico', 'GMC Cilindrico', 'GMC Go Direct'],
    connection: {
      type: 'CM',
      internalThread: 1.6,
      internalAngle: 16,
      platformDiameter: 3.0,
      hasInternalThread: true,
    },
    rxSigns: [],
    images: {
      page: 'rx/pages/singular_gmc_16.jpg',
      embedded: ['rx/embedded/singular_gmc_16_01.jpg'],
    },
    source: { pdf: 'guia_identificacao_implantes', printedPage: 36 },
  },

  // ═══════════════════════════════ TITANIUMFIX ══════════════════════════════
  {
    brandKey: 'titaniumfix',
    brand: 'Titaniumfix',
    lineKey: 'bfix',
    line: 'Cone Morse B-Fix',
    models: ['Profile', 'Blackfix'],
    connection: {
      type: 'CM',
      internalThread: 1.6,
      internalAngle: 11,        // <- angulacao unica 11° (nao 11,5°)
      platformDiameter: 2.1,
      hasInternalThread: true,
    },
    rxSigns: [
      'Angulacao 11° (nao 11,5°) - diferencial Titaniumfix B-Fix',
      'Diametro de plataforma estreito (2,1mm)',
    ],
    images: {
      page: 'rx/pages/titaniumfix_bfix.jpg',
      embedded: ['rx/embedded/titaniumfix_bfix_01.jpg'],
    },
    source: { pdf: 'guia_identificacao_implantes', printedPage: 37 },
  },

  // ════════════════════════════════ MEDENS ══════════════════════════════════
  {
    brandKey: 'medens',
    brand: 'Medens',
    lineKey: 'cm',
    line: 'Cone Morse',
    models: ['Medens CM'],
    connection: {
      type: 'CM',
      internalThread: 1.6,
      internalAngle: 10,        // <- 10° exato, nao 11,5°
      platformDiameter: 2.8,
      hasInternalThread: true,
    },
    rxSigns: ['Angulacao interna 10° - fora dos grupos comuns (8, 11, 11.5, 16, 22, 24°)'],
    images: { page: 'rx/pages/medens_cm.jpg', embedded: [] },
    source: { pdf: 'guia_identificacao_implantes', printedPage: 38 },
  },

  // ═════════════════════════════════ BICON ═══════════════════════════════════
  {
    brandKey: 'bicon',
    brand: 'Bicon',
    lineKey: 'bicon',
    line: 'Bicon (plataforma paralela)',
    models: ['Bicon'],
    connection: {
      type: 'Bicon',
      internalThread: null,
      internalAngle: 1.5,       // <- paredes quase paralelas
      platformDiameter: null,
      hasInternalThread: false,
    },
    rxSigns: [
      'Angulacao interna 1,5° - paredes internas quase paralelas',
      'Plataforma protetica unica (mesmo componente para todos os diametros)',
      'Corpo caracteristicamente curto e largo no RX',
    ],
    images: {
      page: 'rx/pages/bicon_1.jpg',
      pageExtra: 'rx/pages/bicon_2.jpg',
      embedded: [
        'rx/embedded/bicon_1_01.jpg',
        'rx/embedded/bicon_1_02.jpg',
        'rx/embedded/bicon_1_03.jpg',
        'rx/embedded/bicon_1_04.jpg',
        'rx/embedded/bicon_2_01.jpg',
        'rx/embedded/bicon_2_02.jpg',
      ],
    },
    source: { pdf: 'guia_identificacao_implantes', printedPage: 39 },
  },

  // ═══════════════════════════════ SIGNO VINCES ═════════════════════════════
  {
    brandKey: 'signovinces',
    brand: 'Signo Vinces',
    lineKey: 'duocon_3_8',
    line: 'Infra / Impact / Duocon 3,8',
    models: ['Infra', 'Impact', 'Duocon 3,8'],
    connection: {
      type: 'CM',
      internalThread: 1.6,
      internalAngle: 22,
      platformDiameter: 3.8,
      hasInternalThread: true,
    },
    rxSigns: ['Angulacao interna 22° - abertura marcada, aspecto de taca no RX'],
    images: {
      page: 'rx/pages/signovinces_3_8.jpg',
      embedded: [
        'rx/embedded/signovinces_3_8_01.jpg',
        'rx/embedded/signovinces_3_8_02.jpg',
      ],
    },
    source: { pdf: 'guia_identificacao_implantes', printedPage: 41 },
  },
  {
    brandKey: 'signovinces',
    brand: 'Signo Vinces',
    lineKey: 'duocon_4_6',
    line: 'Duocon 4,6 / 5,5',
    models: ['Duocon 4,6', 'Duocon 5,5'],
    connection: {
      type: 'CM',
      internalThread: 2.0,      // <- rosca maior (2.0mm) diferencia dos outros
      internalAngle: 22,
      platformDiameter: 4.6,
      hasInternalThread: true,
    },
    rxSigns: ['Rosca interna 2,0mm (maior) + diametro plataforma 4,6mm - porte maior'],
    images: { page: 'rx/pages/signovinces_4_6_5_5.jpg', embedded: [] },
    source: { pdf: 'guia_identificacao_implantes', printedPage: 42 },
  },

  // ══════════════════════════════ ENTOFLEX.INP ══════════════════════════════
  {
    brandKey: 'entoflex',
    brand: 'Entoflex.inp',
    lineKey: 'supreme',
    line: 'Supreme',
    models: ['Supreme'],
    connection: {
      type: 'CM',
      internalThread: 1.8,
      internalAngle: 11.5,
      platformDiameter: 2.5,
      hasInternalThread: true,
    },
    rxSigns: [],
    images: {
      page: 'rx/pages/entoflex_supreme.jpg',
      embedded: ['rx/embedded/entoflex_supreme_01.jpg'],
    },
    source: { pdf: 'guia_identificacao_implantes', printedPage: 43 },
  },

  // ═══════════════════════════════ PLENUM ═══════════════════════════════════
  {
    brandKey: 'plenum',
    brand: 'Plenum',
    lineKey: 'unifit',
    line: 'Unifit (UF)',
    models: ['UF'],
    connection: {
      type: 'CM',
      internalThread: 1.8,
      internalAngle: 11.5,
      platformDiameter: 2.5,
      hasInternalThread: true,
    },
    rxSigns: [],
    images: { page: 'rx/pages/plenum_unifit.jpg', embedded: [] },
    source: { pdf: 'guia_identificacao_implantes', printedPage: 44 },
  },
  {
    brandKey: 'plenum',
    brand: 'Plenum',
    lineKey: 'morsefit',
    line: 'Morsefit (MF)',
    models: ['MF'],
    connection: {
      type: 'CM',
      internalThread: 1.6,
      internalAngle: 16,
      platformDiameter: 3.0,
      hasInternalThread: true,
    },
    rxSigns: [],
    images: {
      page: 'rx/pages/plenum_morsefit.jpg',
      embedded: ['rx/embedded/plenum_morsefit_01.jpg'],
    },
    source: { pdf: 'guia_identificacao_implantes', printedPage: 45 },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Filtra entradas por tipo de conexao (HE, HI, CM, Bicon, Tri). */
export const byConnType = (type) =>
  RX_DB.filter((e) => e.connection.type === type);

/** Filtra entradas compativeis com um intervalo de angulacao interna.
 *  Uso: encontrar candidatos a partir de uma medida tomada no RX. */
export const byAngleRange = (minDeg, maxDeg) =>
  RX_DB.filter((e) => {
    const a = e.connection.internalAngle;
    return typeof a === 'number' && a >= minDeg && a <= maxDeg;
  });

/** Lista todas as marcas distintas presentes no RX_DB. */
export const listBrands = () =>
  [...new Set(RX_DB.map((e) => e.brandKey))];

/** Gera resumo textual do banco para o system prompt da IA (DetectiveRX).
 *  Inclui apenas dados essenciais, sem URLs de imagens. */
export function generateRXDBSummary() {
  const lines = ['BANCO DE IDENTIFICACAO RADIOGRAFICA (resumo por marca/linha):', ''];
  for (const e of RX_DB) {
    const c = e.connection;
    const specs = [];
    if (c.internalThread != null) specs.push(`rosca ${c.internalThread}mm`);
    if (c.internalAngle != null)  specs.push(`angulo ${c.internalAngle}°`);
    if (typeof c.platformDiameter === 'number')
      specs.push(`plataforma ${c.platformDiameter}mm`);
    if (c.hasInternalThread === false) specs.push('SEM rosca interna');
    const signs = e.rxSigns.length ? ` | sinais: ${e.rxSigns.join('; ')}` : '';
    lines.push(
      `- ${e.brand} / ${e.line} [${e.models.join(', ')}]: ` +
      `${c.type}${specs.length ? ' - ' + specs.join(', ') : ''}${signs}`
    );
  }
  return lines.join('\n');
}
