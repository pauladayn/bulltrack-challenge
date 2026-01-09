"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { OriginFilter, CoatFilter, SortOrder, FiltersState } from "@/types/bulls";

interface FiltersContextType extends FiltersState {
  setOrigin: (origin: OriginFilter) => void;
  setCoat: (coat: CoatFilter) => void;
  setForHeifer: (forHeifer: boolean) => void;
  setSortOrder: (sortOrder: SortOrder) => void;
  setSearchQuery: (query: string) => void;
  toggleFavorite: (bullId: number) => void;
  isFavorite: (bullId: number) => boolean;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

const initialState: FiltersState = {
  origin: "todos",
  coat: "todos",
  forHeifer: false,
  sortOrder: "score_desc",
  searchQuery: "",
  favorites: [],
};

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [origin, setOrigin] = useState<OriginFilter>(initialState.origin);
  const [coat, setCoat] = useState<CoatFilter>(initialState.coat);
  const [forHeifer, setForHeifer] = useState(initialState.forHeifer);
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialState.sortOrder);
  const [searchQuery, setSearchQuery] = useState(initialState.searchQuery);
  const [favorites, setFavorites] = useState<number[]>(initialState.favorites);

  const toggleFavorite = (bullId: number) => {
    setFavorites((prev) =>
      prev.includes(bullId)
        ? prev.filter((id) => id !== bullId)
        : [...prev, bullId]
    );
  };

  const isFavorite = (bullId: number) => favorites.includes(bullId);

  return (
    <FiltersContext.Provider
      value={{
        origin,
        coat,
        forHeifer,
        sortOrder,
        searchQuery,
        favorites,
        setOrigin,
        setCoat,
        setForHeifer,
        setSortOrder,
        setSearchQuery,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return context;
}