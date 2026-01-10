"use client";

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
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[900px]">
      <div className="bg-white rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-light">
          <div className="flex items-center gap-4">
            {/* Bull image */}
            <div className="w-20 h-20 rounded-xl bg-gray-300 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-amber-700 to-amber-900" />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold text-text-primary">
                Toro #{bull.caravana}
              </h2>
              <p className="text-base text-text-secondary">
                {bull.raza} · {bull.edad_meses} meses
              </p>
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

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-bg-tertiary flex items-center justify-center hover:bg-border-light transition-colors"
          >
            <X className="w-5 h-5 text-text-primary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex gap-6">
          {/* Score detail panel */}
          <BullScoreDetail
            score={bull.bull_score}
            stats={bull.stats}
            topPercentile={topPercentile}
            description={bull.caracteristica_destacada}
          />

          {/* Radar chart large */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <RadarChart stats={bull.stats} size={250} />
            <p className="text-sm text-text-muted mt-4">
              Distribución de características genéticas
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}