"use client";

import { TrendingUp } from "lucide-react";

import { BullStats } from "@/types/bulls";

import { cn } from "@/lib/utils";
import { STAT_LABELS, getStatBarColor } from "@/lib/bulls";

interface BullScoreDetailProps {
  score: number;
  stats: BullStats;
  topPercentile?: number;
  description?: string | null;
}

export default function BullScoreDetail({
  score,
  stats,
  topPercentile = 5,
  description,
}: BullScoreDetailProps) {
  // Formatear score para display (ej: 90 -> 0.9, 264 -> 26.4)
  const displayScore =
    score > 100 ? (score / 10).toFixed(1) : (score / 100).toFixed(1);

  return (
    <div className="bg-sidebar rounded-3xl p-6 flex flex-col gap-6 w-full max-w-[320px]">
      {/* Top badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-green-dark border border-brand-green rounded-lg w-fit">
        <TrendingUp className="w-4 h-4 text-brand-green" />
        <span className="text-xs font-semibold text-brand-green">
          Top {topPercentile}%
        </span>
      </div>

      {/* Score header */}
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-white">Bulltrack score</span>
        <span className="text-4xl font-semibold text-brand-green">
          {displayScore}
        </span>
      </div>

      {/* Stats breakdown */}
      <div className="flex flex-col gap-4">
        {(Object.entries(stats) as [keyof BullStats, number][]).map(
          ([key, value]) => (
            <div key={key} className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white">{STAT_LABELS[key]}</span>
                <span className="text-sm text-white">{value.toFixed(1)}</span>
              </div>
              <div className="h-2 bg-sidebar-border rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full", getStatBarColor(value))}
                  style={{ width: `${Math.min(value, 100)}%` }}
                />
              </div>
            </div>
          )
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm text-white">
          <span className="font-bold">Excelente desempeño.</span> {description}
        </p>
      )}
    </div>
  );
}
