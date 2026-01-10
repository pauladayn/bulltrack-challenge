"use client";

import { SearchInput } from "@/components/ui";
import { useFilters } from "@/context/FiltersContext";
import { List, Grid } from "lucide-react";
import RankingCriteria from "./RankingCriteria";

interface BullToolbarProps {
  totalResults: number;
}

export default function BullToolbar({ totalResults }: BullToolbarProps) {
  const { searchQuery, setSearchQuery } = useFilters();

  return (
    <div className="flex flex-col gap-2">
      {/* Ranking criteria accordion */}
      <RankingCriteria />

      {/* Search and view toggle */}
      <div className="bg-bg-tertiary rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              className="w-[490px]"
            />
            <p className="text-xl text-text-primary">
              <span className="font-bold">{totalResults}</span> resultados
            </p>
          </div>

          {/* View toggle */}
          <div className="flex rounded-lg overflow-hidden">
            <button className="px-6 py-2 bg-brand-green-dark">
              <List className="w-6 h-6 text-white" />
            </button>
            <button className="px-6 py-2 bg-border-light">
              <Grid className="w-6 h-6 text-text-primary" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}