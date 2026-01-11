"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, Heart } from "lucide-react";
import { Bull } from "@/types/bulls";
import { useFilters } from "@/context/FiltersContext";
import { cn } from "@/lib/utils";
import BullBadge from "./BullBadge";
import BullScore from "./BullScore";
import RadarChart from "./RadarChart";
import BullDetailModal from "./BullDetailModal";

interface BullCardProps {
  bull: Bull;
  rank: number;
}

// Rotar entre las 3 imágenes disponibles
const getBullImage = (id: number) => {
  const imageIndex = (id % 3) + 1;
  return `/images/bulls/bull-${imageIndex}.png`;
};

export default function BullCard({ bull, rank }: BullCardProps) {
  const { toggleFavorite, isFavorite } = useFilters();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const favorite = isFavorite(bull.id);

  const origenBadgeVariant = bull.origen === "propio" ? "origin-propio" : "origin-catalogo";
  const usoBadgeVariant = bull.uso === "vaquillona" ? "uso-vaquillona" : "uso-vaca";

  return (
    <>
      <div className="bg-white rounded-3xl p-6 flex items-center gap-6">
        {/* Checkbox */}
        <div className="w-6 h-6 rounded-[8px] border-[1.5px] border-accent-blue shrink-0" />

        {/* Rank */}
        <span className="text-[32px] font-semibold text-text-green shrink-0">
          #{rank}
        </span>

        {/* Bull info section */}
        <div className="flex items-center gap-6 p-2 shrink-0 min-w-[280px]">
          {/* Bull image */}
          <div className="w-[83px] h-[72px] rounded-[8px] shrink-0 overflow-hidden">
            <Image
              src={getBullImage(bull.id)}
              alt={`Toro ${bull.caravana}`}
              width={83}
              height={72}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-semibold text-text-primary">
                Toro #{bull.caravana}
              </h3>
              <p className="text-base font-medium text-text-primary">
                {bull.raza} · {bull.edad_meses} meses
              </p>
            </div>

            {/* Badges */}
            <div className="flex gap-2">
              <BullBadge variant={origenBadgeVariant}>
                {bull.origen === "propio" ? "Propio" : "Catálogo"}
              </BullBadge>
              <BullBadge variant={usoBadgeVariant}>
                {bull.uso === "vaquillona" ? "Para vaquillona" : "Para vaca"}
              </BullBadge>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-24 bg-[#D9D9D9] shrink-0 self-center" />

        {/* Score section */}
        <div className="flex items-center gap-6 flex-1">
          <BullScore
            score={bull.bull_score}
            highlight={bull.caracteristica_destacada}
          />

          {/* Radar chart */}
          <RadarChart stats={bull.stats} size={88} />
        </div>

        {/* Divider */}
        <div className="w-px h-24 bg-[#D9D9D9] shrink-0 self-center" />

        {/* Actions */}
        <div className="flex flex-col gap-4 shrink-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-10 h-10 bg-brand-green-dark rounded-xl flex items-center justify-center hover:bg-brand-green-dark/80 transition-colors"
          >
            <Eye className="w-6 h-6 text-white" strokeWidth={1.5} />
          </button>
          <button
            onClick={() => toggleFavorite(bull.id)}
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
              favorite
                ? "bg-red-500 hover:bg-red-600"
                : "bg-brand-green-dark hover:bg-brand-green-dark/80"
            )}
          >
            <Heart
              className={cn("w-6 h-6", favorite ? "text-white fill-white" : "text-white")}
              strokeWidth={1.5}
            />
          </button>
        </div>
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