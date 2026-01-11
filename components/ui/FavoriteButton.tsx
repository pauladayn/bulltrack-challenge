"use client";

import { Heart } from "lucide-react";

import { useFilters } from "@/context/FiltersContext";

import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  itemId: number;
  size?: "sm" | "md";
}

export default function FavoriteButton({ itemId, size = "md" }: FavoriteButtonProps) {
  const { toggleFavorite, isFavorite } = useFilters();
  const favorite = isFavorite(itemId);

  const sizeClasses = size === "sm" 
    ? "w-8 h-8 rounded-lg" 
    : "w-10 h-10 rounded-xl";
  
  const iconSize = size === "sm" ? "w-4 h-4" : "w-6 h-6";

  return (
    <button
      onClick={() => toggleFavorite(itemId)}
      aria-label={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      aria-pressed={favorite}
      className={cn(
        sizeClasses,
        "flex items-center justify-center transition-colors cursor-pointer",
        favorite
          ? "bg-red-500 hover:bg-red-600"
          : "bg-brand-green-dark hover:bg-brand-green-dark/80"
      )}
    >
      <Heart
        className={cn(iconSize, favorite ? "text-white fill-white" : "text-white")}
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </button>
  );
}
