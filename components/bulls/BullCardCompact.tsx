"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, Heart } from "lucide-react";
import { Bull } from "@/types/bulls";
import { useFilters } from "@/context/FiltersContext";
import { cn } from "@/lib/utils";
import BullBadge from "./BullBadge";
import BullDetailModal from "./BullDetailModal";

interface BullCardCompactProps {
  bull: Bull;
  rank: number;
}

// Rotar entre las 3 imágenes disponibles
const getBullImage = (id: number) => {
  const imageIndex = (id % 3) + 1;
  return `/images/bulls/bull-${imageIndex}.png`;
};

export default function BullCardCompact({ bull, rank }: BullCardCompactProps) {
  const { toggleFavorite, isFavorite } = useFilters();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const favorite = isFavorite(bull.id);

  const origenBadgeVariant = bull.origen === "propio" ? "origin-propio" : "origin-catalogo";

  // Formatear score para display
  const displayScore = (bull.bull_score / 100).toFixed(1);

  return (
    <>
      <div className="bg-white rounded-2xl p-4 flex flex-col gap-3">
        {/* Header with rank and actions */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold text-text-green">#{rank}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-8 h-8 bg-brand-green-dark rounded-lg flex items-center justify-center hover:bg-brand-green-dark/80 transition-colors"
            >
              <Eye className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => toggleFavorite(bull.id)}
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                favorite
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-brand-green-dark hover:bg-brand-green-dark/80"
              )}
            >
              <Heart
                className={cn("w-4 h-4", favorite ? "text-white fill-white" : "text-white")}
              />
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="w-full h-24 rounded-lg overflow-hidden">
          <Image
            src={getBullImage(bull.id)}
            alt={`Toro ${bull.caravana}`}
            width={200}
            height={96}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-text-primary">
            Toro #{bull.caravana}
          </h3>
          <p className="text-sm text-text-secondary">
            {bull.raza} · {bull.edad_meses}m
          </p>
        </div>

        {/* Score */}
        <div className="flex items-center justify-between bg-bg-tertiary rounded-lg px-3 py-2">
          <span className="text-xs font-medium text-text-primary uppercase">
            Bull Score
          </span>
          <span className="text-lg font-semibold text-brand-green">
            {displayScore}
          </span>
        </div>

        {/* Badge */}
        <BullBadge variant={origenBadgeVariant}>
          {bull.origen === "propio" ? "Propio" : "Catálogo"}
        </BullBadge>
      </div>

      {/* Detail Modal */}
      <BullDetailModal
        bull={bull}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}