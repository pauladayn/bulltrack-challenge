export type OriginFilter = 'todos' | 'propio' | 'catalogo' | 'favoritos';
export type CoatFilter = 'todos' | 'negro' | 'colorado';
export type SortOrder = 'score_desc' | 'score_asc';
export type ViewMode = 'list' | 'grid';

export interface FiltersState {
  origin: OriginFilter;
  coat: CoatFilter;
  forHeifer: boolean;
  sortOrder: SortOrder;
  searchQuery: string;
  favorites: number[];
  viewMode: ViewMode;
}