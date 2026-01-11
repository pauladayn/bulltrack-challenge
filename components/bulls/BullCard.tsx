"use client";

import { useState } from "react";
import Image from "next/image";

import { Divider, FavoriteButton, ViewButton } from "@/components/ui";

import BullBadge from "./BullBadge";
import BullScore from "./BullScore";
import RadarChart from "./RadarChart";
import BullDetailModal from "./BullDetailModal";

import { Bull } from "@/types/bulls";
import { getBullImage, getOrigenBadgeVariant, getUsoBadgeVariant, ORIGEN_LABELS, USO_LABELS } from "@/lib/bulls";

interface BullCardProps {
  bull: Bull;
  rank: number;
}

export default function BullCard({ bull, rank }: BullCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const origenBadgeVariant = getOrigenBadgeVariant(bull.origen);
  const usoBadgeVariant = getUsoBadgeVariant(bull.uso);

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
                {ORIGEN_LABELS[bull.origen]}
              </BullBadge>
              <BullBadge variant={usoBadgeVariant}>
                {USO_LABELS[bull.uso]}
              </BullBadge>
            </div>
          </div>
        </div>

        {/* Divider */}
        <Divider orientation="vertical" />

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
        <Divider orientation="vertical" />

        {/* Actions */}
        <div className="flex flex-col gap-4 shrink-0">
          <ViewButton
            onClick={() => setIsModalOpen(true)}
            ariaLabel={`Ver detalles del toro ${bull.caravana}`}
            size="md"
          />
          <FavoriteButton itemId={bull.id} size="md" />
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
