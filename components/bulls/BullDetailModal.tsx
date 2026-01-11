"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { Bull } from "@/types/bulls";
import { Modal } from "@/components/ui";
import BullScoreDetail from "./BullScoreDetail";
import BullBadge from "./BullBadge";
import RadarChart from "./RadarChart";

interface BullDetailModalProps {
  bull: Bull | null;
  isOpen: boolean;
  onClose: () => void;
}

// Rotar entre las 3 imágenes disponibles
const getBullImage = (id: number) => {
  const imageIndex = (id % 3) + 1;
  return `/images/bulls/bull-${imageIndex}.png`;
};

export default function BullDetailModal({
  bull,
  isOpen,
  onClose,
}: BullDetailModalProps) {
  if (!bull) return null;

  const origenBadgeVariant = bull.origen === "propio" ? "origin-propio" : "origin-catalogo";
  const usoBadgeVariant = bull.uso === "vaquillona" ? "uso-vaquillona" : "uso-vaca";

  // Calculate top percentile based on score (mock logic)
  const topPercentile = bull.bull_score >= 90 ? 1 : bull.bull_score >= 80 ? 5 : 10;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[680px]">
      <div className="bg-brand-green-dark rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-sidebar-border">
          <div className="flex items-center gap-6 flex-1">
            {/* Bull image */}
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
              <Image
                src={getBullImage(bull.id)}
                alt={`Toro ${bull.caravana}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold text-white">
                Toro #{bull.caravana}
              </h2>
              <p className="text-base text-white/80">
                {bull.raza} · {bull.edad_meses} meses
              </p>
            </div>

            {/* Vertical divider */}
            <div className="w-px h-16 bg-sidebar-border shrink-0" />

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

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-[8px] bg-sidebar-card flex items-center justify-center hover:bg-sidebar-border transition-colors shrink-0"
          >
            <X className="w-5 h-5 text-white" strokeWidth={1.5} />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 flex gap-4">
          {/* Score detail panel - 50% width */}
          <div className="w-1/2">
            <BullScoreDetail
              score={bull.bull_score}
              stats={bull.stats}
              topPercentile={topPercentile}
              description={bull.caracteristica_destacada}
            />
          </div>

          {/* Radar chart large - 50% width */}
          <div className="w-1/2 flex flex-col items-center justify-center">
            <RadarChart stats={bull.stats} size={250} />
            <p className="text-sm text-white/60 mt-4 text-center">
              Distribución de características genéticas
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}