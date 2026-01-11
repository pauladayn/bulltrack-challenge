"use client";

import { SearchInput } from "@/components/ui";
import { useFilters } from "@/context/FiltersContext";
import { List, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import RankingCriteria from "./RankingCriteria";

interface BullToolbarProps {
  totalResults: number;
}

export default function BullToolbar({ totalResults }: BullToolbarProps) {
  const { searchQuery, setSearchQuery, viewMode, setViewMode } = useFilters();

  return (
    <div className="flex flex-col gap-2">
      {/* Ranking criteria accordion */}
      <RankingCriteria />

      {/* Search and view toggle */}
      <div className="bg-bg-tertiary rounded-[8px] px-6 py-4">
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
          <div className="flex rounded-[8px] overflow-hidden">
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "px-6 py-2 transition-colors",
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
              />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "px-6 py-2 transition-colors",
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
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}