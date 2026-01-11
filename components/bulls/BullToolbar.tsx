"use client";

import { SearchInput, ViewModeToggle } from "@/components/ui";

import RankingCriteria from "./RankingCriteria";

import { useFilters } from "@/context/FiltersContext";

interface BullToolbarProps {
  totalResults: number;
}

export default function BullToolbar({ totalResults }: BullToolbarProps) {
  const { searchQuery, setSearchQuery } = useFilters();

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

          <ViewModeToggle />
        </div>
      </div>
    </div>
  );
}
