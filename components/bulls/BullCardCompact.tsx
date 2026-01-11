"use client";

import { useState } from "react";
import Image from "next/image";

import { FavoriteButton, ViewButton } from "@/components/ui";

import BullBadge from "./BullBadge";
import BullDetailModal from "./BullDetailModal";

import { Bull } from "@/types/bulls";
import { getBullImage, getOrigenBadgeVariant, ORIGEN_LABELS } from "@/lib/bulls";

interface BullCardCompactProps {
  bull: Bull;
  rank: number;
}

export default function BullCardCompact({ bull, rank }: BullCardCompactProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const origenBadgeVariant = getOrigenBadgeVariant(bull.origen);

  // Formatear score para display
  const displayScore = (bull.bull_score / 100).toFixed(1);

  return (
    <>
      <div className="bg-white rounded-2xl p-4 flex flex-col gap-3">
        {/* Header with rank and actions */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold text-text-green">#{rank}</span>
          <div className="flex gap-2">
            <ViewButton
              onClick={() => setIsModalOpen(true)}
              ariaLabel={`Ver detalles del toro ${bull.caravana}`}
              size="sm"
            />
            <FavoriteButton itemId={bull.id} size="sm" />
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
          {ORIGEN_LABELS[bull.origen]}
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
