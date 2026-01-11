"use client";

import { List, LayoutGrid } from "lucide-react";

import { useFilters } from "@/context/FiltersContext";

import { cn } from "@/lib/utils";
import { ViewMode } from "@/types/filters";

interface ViewOption {
  mode: ViewMode;
  icon: typeof List;
  label: string;
}

const VIEW_OPTIONS: ViewOption[] = [
  { mode: "list", icon: List, label: "Ver como lista" },
  { mode: "grid", icon: LayoutGrid, label: "Ver como grilla" },
];

export default function ViewModeToggle() {
  const { viewMode, setViewMode } = useFilters();

  return (
    <div 
      className="flex rounded-[8px] overflow-hidden" 
      role="group" 
      aria-label="Modo de visualización"
    >
      {VIEW_OPTIONS.map(({ mode, icon: Icon, label }) => (
        <button
          key={mode}
          onClick={() => setViewMode(mode)}
          aria-label={label}
          aria-pressed={viewMode === mode}
          className={cn(
            "px-6 py-2 transition-colors cursor-pointer",
            viewMode === mode
              ? "bg-brand-green-dark"
              : "bg-border-light hover:bg-gray-300"
          )}
        >
          <Icon
            className={cn(
              "w-6 h-6",
              viewMode === mode ? "text-white" : "text-text-primary"
            )}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
}
