"use client";

import { useState } from "react";

import { Info, ChevronDown, ChevronUp } from "lucide-react";

import { Divider, EditCriteriaButton, Toast } from "@/components/ui";
import { useToast } from "@/hooks";

import { cn } from "@/lib/utils";
import { RANKING_CRITERIA, COLOR_GUIDE } from "@/lib/constants";

export default function RankingCriteria() {
  const [isExpanded, setIsExpanded] = useState(false);
  const toast = useToast();

  return (
    <>
      <div className="bg-bg-tertiary rounded-[8px] overflow-hidden">
        {/* Header - always visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls="ranking-criteria-content"
          className="w-full p-4 flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Info className="w-6 h-6 text-text-primary" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-base font-bold text-text-primary">
              Criterios del ranking
            </span>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-6 h-6 text-text-primary" strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <ChevronDown className="w-6 h-6 text-text-primary" strokeWidth={1.5} aria-hidden="true" />
          )}
        </button>

        {/* Expanded content */}
        {isExpanded && (
          <div id="ranking-criteria-content" className="px-6 pb-4">
            {/* Horizontal divider */}
            <Divider className="mb-4" />
            
            <div className="flex gap-8 pt-4">
              {/* Índice activo */}
              <div className="flex flex-col gap-4 flex-1 max-w-[280px]">
                <h3 className="text-[14px] font-medium text-text-primary uppercase tracking-wider">
                  Índice activo
                </h3>
                <p className="text-sm text-text-primary">
                  El <span className="font-bold">Bull Track Score</span> se calcula en
                  tiempo real basándose en los DEPs oficiales y tus criterios
                  personalizados.
                </p>
              </div>

              {/* Vertical divider */}
              <Divider orientation="vertical" className="bg-divider-dark self-stretch h-auto" />

              {/* Peso de atributos */}
              <div className="flex flex-col gap-4 flex-1">
                <h3 className="text-[14px] font-medium text-text-primary uppercase tracking-wider">
                  Peso de atributos
                </h3>
                <div className="flex flex-col gap-3">
                  {RANKING_CRITERIA.map((item) => (
                    <div key={item.name} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-primary">{item.name}</span>
                        <span className="text-sm text-text-primary">{item.weight}%</span>
                      </div>
                      <div className="h-2 bg-white rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ 
                            width: `${item.weight}%`,
                            backgroundColor: item.colorVar
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vertical divider */}
              <Divider orientation="vertical" className="bg-divider-dark self-stretch h-auto" />

              {/* Guía de colores */}
              <div className="flex flex-col gap-4 flex-1">
                <h3 className="text-[14px] font-medium text-text-primary uppercase tracking-wider">
                  Guía de colores
                </h3>
                <div className="flex flex-col gap-3">
                  {COLOR_GUIDE.map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className={cn("w-4 h-4 rounded-full shrink-0 mt-0.5", item.color)} />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-text-primary">
                          {item.label}
                        </span>
                        <span className="text-xs text-text-secondary">
                          {item.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Button - outside the 3 columns */}
            <div className="mt-6">
              <EditCriteriaButton onClick={toast.show} />
            </div>
          </div>
        )}
      </div>

      {/* Toast */}
      <Toast
        message="Esta funcionalidad estará disponible próximamente"
        isVisible={toast.isVisible}
        onClose={toast.hide}
      />
    </>
  );
}
