/**
 * Definição de tipos para os dados das magias
 * Estes tipos são baseados na estrutura dos arquivos JSON de magias
 */

export interface SpellTime {
  number: number;
  unit: string;
}

export interface SpellDistance {
  type: string;
  amount: number;
}

export interface SpellRange {
  type: string;
  distance: SpellDistance;
}

export interface SpellComponents {
  v?: boolean;  // Verbal
  s?: boolean;  // Somático
  m?: string | boolean;  // Material
}

export interface SpellDuration {
  type: string;
  duration?: {
    type: string;
    amount: number;
  };
}

export interface ScalingLevelDice {
  label: string;
  scaling: {
    [key: string]: string;
  };
}

export interface SpellSource {
  source: string;
  page?: number;
}

export interface SpellClass {
  name: string;
  source: string;
  definedInSource?: string;
}

// Tipos para as entradas de texto da magia
export type SpellEntryContent = string | SpellEntryObject;

export interface SpellEntryObject {
  type?: string;
  name?: string;
  caption?: string;
  text?: string;
  items?: SpellEntryContent[];
  entries?: SpellEntryContent[];
  [key: string]: string | number | boolean | SpellEntryContent | SpellEntryContent[] | undefined;
}

export interface SpellData {
  name: string;
  source: string;
  page?: number;
  srd?: boolean;
  basicRules?: boolean;
  level: number;
  school: string;
  time: SpellTime[];
  range: SpellRange;
  components: SpellComponents;
  duration: SpellDuration[];
  entries: SpellEntryContent[];
  entriesHigherLevel?: SpellEntryContent[];
  scalingLevelDice?: ScalingLevelDice;
  damageInflict?: string[];
  damageResist?: string[];
  damageImmune?: string[];
  damageVulnerable?: string[];
  savingThrow?: string[];
  abilityCheck?: string[];
  miscTags?: string[];
  areaTags?: string[];
  classes?: {
    fromClassList?: SpellSource[];
    fromSubclass?: SpellSource[];
  };
  backgrounds?: SpellSource[];
  otherSources?: SpellSource[];
  reprintedAs?: string[];
  classesWhoCanUse?: SpellClass[];
}

export interface SpellCollection {
  spell: SpellData[];
} 