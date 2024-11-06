export interface Pokemon {
  id: number;
  name: string;
  urlImage: string;
  weight: number;
  height: number;
  abilities: AbilityField[];
  types: TypeField[];
  stats: StatField[];
}

export interface AbilityField {
  ability: AbilityInfo;
  isHidden: boolean;
  slot: number;
}

export interface AbilityInfo {
  name: string;
  url: string;
}

export interface TypeField {
  slot: number;
  type: TypeInfo;
}

export interface TypeInfo {
  name: string;
  url: string;
}

export interface StatField {
  baseStat: number;
  effort: number;
  stat: StatInfo;
}

export interface StatInfo {
  name: string;
  url: string;
}
