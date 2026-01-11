"use client";

import { useMemo } from "react";

import BullCard from "./BullCard";
import BullCardCompact from "./BullCardCompact";

import { useFilters } from "@/context/FiltersContext";

import { Bull } from "@/types/bulls";
import { filterAndSortBulls, FilterContext } from "@/lib/filters";

interface BullGridProps {
  bulls: Bull[];
}

export default function BullGrid({ bulls }: BullGridProps) {
  const { origin, coat, forHeifer, sortOrder, searchQuery, favorites, viewMode } =
    useFilters();

  const filteredAndSortedBulls = useMemo(() => {
    const ctx: FilterContext = { origin, coat, forHeifer, searchQuery, favorites };
    return filterAndSortBulls(bulls, ctx, sortOrder);
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
