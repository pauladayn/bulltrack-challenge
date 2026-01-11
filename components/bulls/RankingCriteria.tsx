"use client";

import { useState } from "react";
import { Info, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Toast } from "@/components/ui";

interface CriteriaItem {
  name: string;
  weight: number;
  color: string;
}

const criteria: CriteriaItem[] = [
  { name: "Crecimiento", weight: 30, color: "#36E47C" },
  { name: "Habilidad materna", weight: 30, color: "#78D19C" },
  { name: "Fertilidad", weight: 30, color: "#A5D1B7" },
];

const colorGuide = [
  {
    color: "bg-brand-green",
    label: "Excelente (Top 25%)",
    description: "Superior al promedio de la raza",
  },
  {
    color: "bg-yellow-400",
    label: "Promedio / Normal",
    description: "Dentro de la desviación estándar (#1)",
  },
  {
    color: "bg-red-500",
    label: "Inferior / Alerta",
    description: "Impacto negativo en el objetivo (Bottom 25%)",
  },
];

export default function RankingCriteria() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleEditCriteria = () => {
    setShowToast(true);
  };

  return (
    <>
      <div className="bg-bg-tertiary rounded-[8px] overflow-hidden">
        {/* Header - always visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Info className="w-6 h-6 text-text-primary" />
            <span className="text-base font-bold text-text-primary">
              Criterios del ranking
            </span>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-6 h-6 text-text-primary" strokeWidth={1.5} />
          ) : (
            <ChevronDown className="w-6 h-6 text-text-primary" strokeWidth={1.5} />
          )}
        </button>

        {/* Expanded content */}
        {isExpanded && (
          <div className="px-6 pb-4">
            {/* Horizontal divider */}
            <div className="w-full h-px bg-[#D9D9D9] mb-4" />
            
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
              <div className="w-px bg-[#9F9F9F] self-stretch" />

              {/* Peso de atributos */}
              <div className="flex flex-col gap-4 flex-1">
                <h3 className="text-[14px] font-medium text-text-primary uppercase tracking-wider">
                  Peso de atributos
                </h3>
                <div className="flex flex-col gap-3">
                  {criteria.map((item) => (
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
                            backgroundColor: item.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vertical divider */}
              <div className="w-px bg-[#9F9F9F] self-stretch" />

              {/* Guía de colores */}
              <div className="flex flex-col gap-4 flex-1">
                <h3 className="text-[14px] font-medium text-text-primary uppercase tracking-wider">
                  Guía de colores
                </h3>
                <div className="flex flex-col gap-3">
                  {colorGuide.map((item) => (
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
            <button
              onClick={handleEditCriteria}
              className="flex items-center gap-2 px-4 py-3 border border-[#29382F] rounded-[12px] w-fit mt-6 hover:bg-gray-100 transition-colors h-10"
            >
              <ArrowLeft className="w-5 h-5 text-[#29382F]" strokeWidth={1.5} />
              <span className="text-sm font-semibold text-[#29382F]">
                Editar criterios
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Toast */}
      <Toast
        message="Esta funcionalidad estará disponible próximamente"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}