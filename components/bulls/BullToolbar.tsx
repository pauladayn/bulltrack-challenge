"use client";

import { List, LayoutGrid } from "lucide-react";

import { SearchInput } from "@/components/ui";
import RankingCriteria from "./RankingCriteria";

import { useFilters } from "@/context/FiltersContext";

import { cn } from "@/lib/utils";

interface BullToolbarProps {
  totalResults: number;
}

export default function BullToolbar({ totalResults }: BullToolbarProps) {
  const { searchQuery, setSearchQuery, viewMode, setViewMode } = useFilters();

  return (
    <div className="flex flex-col gap-4">
      {/* Ranking criteria accordion */}
      <RankingCriteria />

      {/* Search and view toggle */}
      <div className="bg-bg-tertiary rounded-[8px] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 flex-1 max-w-[50%]">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              className="flex-1"
            />
            <p className="text-xl text-text-primary whitespace-nowrap">
              <span className="font-bold">{totalResults}</span> resultados
            </p>
          </div>

          {/* View toggle */}
          <div className="flex rounded-[8px] overflow-hidden" role="group" aria-label="Modo de visualización">
            <button
              onClick={() => setViewMode("list")}
              aria-label="Ver como lista"
              aria-pressed={viewMode === "list"}
              className={cn(
                "px-6 py-2 transition-colors cursor-pointer",
                viewMode === "list"
                  ? "bg-brand-green-dark"
                  : "bg-border-light hover:bg-gray-300"
              )}
            >
              <List
                className={cn(
                  "w-6 h-6",
                  viewMode === "list" ? "text-white" : "text-text-primary"
                )}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              aria-label="Ver como grilla"
              aria-pressed={viewMode === "grid"}
              className={cn(
                "px-6 py-2 transition-colors cursor-pointer",
                viewMode === "grid"
                  ? "bg-brand-green-dark"
                  : "bg-border-light hover:bg-gray-300"
              )}
            >
              <LayoutGrid
                className={cn(
                  "w-6 h-6",
                  viewMode === "grid" ? "text-white" : "text-text-primary"
                )}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
