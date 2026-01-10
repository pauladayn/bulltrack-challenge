"use client";

import { useMemo } from "react";
import { Bull } from "@/types/bulls";
import { useFilters } from "@/context/FiltersContext";
import BullCard from "./BullCard";

interface BullGridProps {
  bulls: Bull[];
}

export default function BullGrid({ bulls }: BullGridProps) {
  const {
    origin,
    coat,
    forHeifer,
    sortOrder,
    searchQuery,
    favorites,
  } = useFilters();

  const filteredAndSortedBulls = useMemo(() => {
    let result = [...bulls];

    // Filter by origin
    if (origin === "propio") {
      result = result.filter((bull) => bull.origen === "propio");
    } else if (origin === "catalogo") {
      result = result.filter((bull) => bull.origen === "catalogo");
    } else if (origin === "favoritos") {
      result = result.filter((bull) => favorites.includes(bull.id));
    }

    // Filter by coat
    if (coat !== "todos") {
      result = result.filter((bull) => bull.pelaje === coat);
    }

    // Filter by heifer usage
    if (forHeifer) {
      result = result.filter((bull) => bull.uso === "vaquillona");
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (bull) =>
          bull.caravana.toLowerCase().includes(query) ||
          bull.nombre.toLowerCase().includes(query)
      );
    }

    // Sort by score
    result.sort((a, b) => {
      if (sortOrder === "score_desc") {
        return b.bull_score - a.bull_score;
      }
      return a.bull_score - b.bull_score;
    });

    return result;
  }, [bulls, origin, coat, forHeifer, sortOrder, searchQuery, favorites]);

  if (filteredAndSortedBulls.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-text-muted">
        <p className="text-lg">No se encontraron toros con los filtros seleccionados</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {filteredAndSortedBulls.map((bull, index) => (
        <BullCard key={bull.id} bull={bull} rank={index + 1} />
      ))}
    </div>
  );
}