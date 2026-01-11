"use client";

import { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from "react";

import { OriginFilter, CoatFilter, SortOrder, ViewMode, FiltersState } from "@/types/filters";

import { STORAGE_KEYS } from "@/lib/constants";

// ============================================
// ACTIONS
// ============================================

type FiltersAction =
  | { type: "SET_ORIGIN"; payload: OriginFilter }
  | { type: "SET_COAT"; payload: CoatFilter }
  | { type: "SET_FOR_HEIFER"; payload: boolean }
  | { type: "SET_SORT_ORDER"; payload: SortOrder }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_VIEW_MODE"; payload: ViewMode }
  | { type: "SET_FAVORITES"; payload: number[] }
  | { type: "TOGGLE_FAVORITE"; payload: number };

// ============================================
// REDUCER
// ============================================

const filtersReducer = (state: FiltersState, action: FiltersAction): FiltersState => {
  switch (action.type) {
    case "SET_ORIGIN":
      return { ...state, origin: action.payload };
    case "SET_COAT":
      return { ...state, coat: action.payload };
    case "SET_FOR_HEIFER":
      return { ...state, forHeifer: action.payload };
    case "SET_SORT_ORDER":
      return { ...state, sortOrder: action.payload };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "SET_VIEW_MODE":
      return { ...state, viewMode: action.payload };
    case "SET_FAVORITES":
      return { ...state, favorites: action.payload };
    case "TOGGLE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.includes(action.payload)
          ? state.favorites.filter((id) => id !== action.payload)
          : [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};

// ============================================
// INITIAL STATE
// ============================================

const initialState: FiltersState = {
  origin: "todos",
  coat: "todos",
  forHeifer: false,
  sortOrder: "score_desc",
  searchQuery: "",
  favorites: [],
  viewMode: "list",
};

// ============================================
// CONTEXT
// ============================================

interface FiltersContextType extends FiltersState {
  setOrigin: (origin: OriginFilter) => void;
  setCoat: (coat: CoatFilter) => void;
  setForHeifer: (forHeifer: boolean) => void;
  setSortOrder: (sortOrder: SortOrder) => void;
  setSearchQuery: (query: string) => void;
  setViewMode: (viewMode: ViewMode) => void;
  toggleFavorite: (bullId: number) => void;
  isFavorite: (bullId: number) => boolean;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

// ============================================
// PROVIDER
// ============================================

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(filtersReducer, initialState);

  // Load favorites from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEYS.FAVORITES);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          dispatch({ type: "SET_FAVORITES", payload: parsed });
        }
      } catch {
        // Invalid JSON, ignore
      }
    }
  }, []);

  // Persist favorites to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(state.favorites));
  }, [state.favorites]);

  // Memoized action dispatchers
  const setOrigin = useCallback((origin: OriginFilter) => 
    dispatch({ type: "SET_ORIGIN", payload: origin }), []);
  
  const setCoat = useCallback((coat: CoatFilter) => 
    dispatch({ type: "SET_COAT", payload: coat }), []);
  
  const setForHeifer = useCallback((forHeifer: boolean) => 
    dispatch({ type: "SET_FOR_HEIFER", payload: forHeifer }), []);
  
  const setSortOrder = useCallback((sortOrder: SortOrder) => 
    dispatch({ type: "SET_SORT_ORDER", payload: sortOrder }), []);
  
  const setSearchQuery = useCallback((query: string) => 
    dispatch({ type: "SET_SEARCH_QUERY", payload: query }), []);
  
  const setViewMode = useCallback((viewMode: ViewMode) => 
    dispatch({ type: "SET_VIEW_MODE", payload: viewMode }), []);
  
  const toggleFavorite = useCallback((bullId: number) => 
    dispatch({ type: "TOGGLE_FAVORITE", payload: bullId }), []);
  
  const isFavorite = useCallback((bullId: number) => 
    state.favorites.includes(bullId), [state.favorites]);

  return (
    <FiltersContext.Provider
      value={{
        ...state,
        setOrigin,
        setCoat,
        setForHeifer,
        setSortOrder,
        setSearchQuery,
        setViewMode,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

// ============================================
// HOOK
// ============================================

export function useFilters() {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return context;
}
