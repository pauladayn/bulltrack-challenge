import { Bull } from "@/types/bulls";
import { FiltersState, SortOrder } from "@/types/filters";

// ============================================
// FILTER TYPES
// ============================================

/**
 * Subset of FiltersState used for filtering bulls
 * Excludes sortOrder and viewMode which are not filter criteria
 */
export type FilterContext = Pick<
  FiltersState,
  "origin" | "coat" | "forHeifer" | "searchQuery" | "favorites"
>;

/**
 * A filter predicate takes a bull and context, returns true if bull passes
 */
export type FilterPredicate = (bull: Bull, ctx: FilterContext) => boolean;

// ============================================
// FILTER PREDICATES
// ============================================

/**
 * Array of filter predicates - easy to extend with new filters
 * Each predicate returns true if the bull passes the filter
 */
export const FILTERS: FilterPredicate[] = [
  // Origin filter
  (bull, { origin, favorites }) => {
    if (origin === "todos") return true;
    if (origin === "favoritos") return favorites.includes(bull.id);
    return bull.origen === origin;
  },

  // Coat filter
  (bull, { coat }) => coat === "todos" || bull.pelaje === coat,

  // Heifer filter (facilidad de parto)
  (bull, { forHeifer }) => !forHeifer || bull.uso === "vaquillona",

  // Search filter
  (bull, { searchQuery }) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return [bull.caravana, bull.nombre, bull.raza].some((field) =>
      field.toLowerCase().includes(query)
    );
  },
];

// ============================================
// FILTER & SORT FUNCTIONS
// ============================================

/**
 * Apply all filters to bulls array
 */
export const applyFilters = (bulls: Bull[], ctx: FilterContext): Bull[] =>
  bulls.filter((bull) => FILTERS.every((predicate) => predicate(bull, ctx)));

/**
 * Sort strategies mapped by SortOrder
 */
export const SORT_STRATEGIES: Record<SortOrder, (a: Bull, b: Bull) => number> = {
  score_desc: (a, b) => b.bull_score - a.bull_score,
  score_asc: (a, b) => a.bull_score - b.bull_score,
};

/**
 * Filter and sort bulls in one operation
 */
export const filterAndSortBulls = (
  bulls: Bull[],
  ctx: FilterContext,
  sortOrder: SortOrder
): Bull[] => {
  const filtered = applyFilters(bulls, ctx);
  return filtered.sort(SORT_STRATEGIES[sortOrder]);
};
