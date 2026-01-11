"use client";

import { useMemo } from "react";

import BullCard from "./BullCard";
import BullCardCompact from "./BullCardCompact";

import { useFilters } from "@/context/FiltersContext";

import { Bull } from "@/types/bulls";
import { OriginFilter, CoatFilter, SortOrder } from "@/types/filters";

// ============================================
// FILTER PATTERN - Scalable filter architecture
// ============================================

interface FilterContext {
  origin: OriginFilter;
  coat: CoatFilter;
  forHeifer: boolean;
  searchQuery: string;
  favorites: number[];
}

type FilterPredicate = (bull: Bull, ctx: FilterContext) => boolean;

/**
 * Array of filter predicates - easy to add new filters
 * Each predicate returns true if the bull passes the filter
 */
const FILTERS: FilterPredicate[] = [
  // Origin filter
  (bull, { origin, favorites }) => {
    if (origin === "todos") return true;
    if (origin === "favoritos") return favorites.includes(bull.id);
    return bull.origen === origin;
  },

  // Coat filter
  (bull, { coat }) => coat === "todos" || bull.pelaje === coat,

  // Heifer filter
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

/**
 * Apply all filters to bulls array
 */
const applyFilters = (bulls: Bull[], ctx: FilterContext): Bull[] =>
  bulls.filter((bull) => FILTERS.every((predicate) => predicate(bull, ctx)));

/**
 * Sort strategies by sort order
 */
const SORT_STRATEGIES: Record<SortOrder, (a: Bull, b: Bull) => number> = {
  score_desc: (a, b) => b.bull_score - a.bull_score,
  score_asc: (a, b) => a.bull_score - b.bull_score,
};

// ============================================
// COMPONENT
// ============================================

interface BullGridProps {
  bulls: Bull[];
}

export default function BullGrid({ bulls }: BullGridProps) {
  const { origin, coat, forHeifer, sortOrder, searchQuery, favorites, viewMode } =
    useFilters();

  const filteredAndSortedBulls = useMemo(() => {
    const ctx: FilterContext = { origin, coat, forHeifer, searchQuery, favorites };
    const filtered = applyFilters(bulls, ctx);
    return filtered.sort(SORT_STRATEGIES[sortOrder]);
  }, [bulls, origin, coat, forHeifer, sortOrder, searchQuery, favorites]);

  if (filteredAndSortedBulls.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-text-muted">
        <p className="text-lg">
          No se encontraron toros con los filtros seleccionados
        </p>
      </div>
    );
  }

  // Grid view
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredAndSortedBulls.map((bull, index) => (
          <BullCardCompact key={bull.id} bull={bull} rank={index + 1} />
        ))}
      </div>
    );
  }

  // List view (default)
  return (
    <div className="flex flex-col gap-4">
      {filteredAndSortedBulls.map((bull, index) => (
        <BullCard key={bull.id} bull={bull} rank={index + 1} />
      ))}
    </div>
  );
}
