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
  { name: "Crecimiento", weight: 30, color: "bg-brand-green" },
  { name: "Habilidad materna", weight: 30, color: "bg-brand-green" },
  { name: "Fertilidad", weight: 30, color: "bg-brand-green/50" },
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
      <div className="bg-bg-tertiary rounded-lg overflow-hidden">
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
            <ChevronUp className="w-6 h-6 text-text-primary" />
          ) : (
            <ChevronDown className="w-6 h-6 text-text-primary" />
          )}
        </button>

        {/* Expanded content */}
        {isExpanded && (
          <div className="px-4 pb-4">
            <div className="bg-white rounded-lg p-6">
              <div className="grid grid-cols-3 gap-8">
                {/* Índice activo */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-medium text-text-primary uppercase tracking-wider">
                    Índice activo
                  </h3>
                  <p className="text-sm text-text-primary">
                    El <span className="font-bold">Bull Track Score</span> se calcula en
                    tiempo real basándose en los DEPs oficiales y tus criterios
                    personalizados.
                  </p>
                  <button
                    onClick={handleEditCriteria}
                    className="flex items-center gap-2 px-4 py-3 border border-text-primary rounded-xl w-fit mt-4 hover:bg-gray-100 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-text-primary" />
                    <span className="text-sm font-semibold text-text-primary">
                      Editar criterios
                    </span>
                  </button>
                </div>

                {/* Peso de atributos */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-medium text-text-primary uppercase tracking-wider">
                    Peso de atributos
                  </h3>
                  <div className="flex flex-col gap-3">
                    {criteria.map((item) => (
                      <div key={item.name} className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-text-primary">{item.name}</span>
                          <span className="text-sm text-text-primary">{item.weight}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={cn("h-full rounded-full", item.color)}
                            style={{ width: `${item.weight}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guía de colores */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-medium text-text-primary uppercase tracking-wider">
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
            </div>
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