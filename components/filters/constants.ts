import { OriginFilter, CoatFilter, SortOrder } from "@/types/filters";

// Filter Option Types
export interface FilterOption<T> {
  value: T;
  label: string;
}

// Origin Filter Options
export const ORIGIN_OPTIONS: FilterOption<OriginFilter>[] = [
  { value: "todos", label: "Todos" },
  { value: "propio", label: "Toros propios" },
  { value: "catalogo", label: "Catálogo" },
  { value: "favoritos", label: "Favoritos" },
];

// Coat Filter Options
export const COAT_OPTIONS: FilterOption<CoatFilter>[] = [
  { value: "todos", label: "Todos" },
  { value: "negro", label: "Negro" },
  { value: "colorado", label: "Colorado" },
];

// Sort Order Options
export const SORT_OPTIONS: FilterOption<SortOrder>[] = [
  { value: "score_desc", label: "Score mejor a peor" },
  { value: "score_asc", label: "Score peor a mejor" },
];
