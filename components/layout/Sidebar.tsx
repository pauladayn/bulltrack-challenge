"use client";

import { useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { useFilters } from "@/context/FiltersContext";
import { Checkbox, Toggle, Select, Toast } from "@/components/ui";
import { OriginFilter, CoatFilter, SortOrder } from "@/types/filters";

const originOptions: { value: OriginFilter; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "propio", label: "Toros propios" },
  { value: "catalogo", label: "Catálogo" },
  { value: "favoritos", label: "Favoritos" },
];

const coatOptions: { value: CoatFilter; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "negro", label: "Negro" },
  { value: "colorado", label: "Colorado" },
];

const sortOptions: { value: SortOrder; label: string }[] = [
  { value: "score_desc", label: "Score mejor a peor" },
  { value: "score_asc", label: "Score peor a mejor" },
];

export default function Sidebar() {
  const {
    origin,
    setOrigin,
    coat,
    setCoat,
    forHeifer,
    setForHeifer,
    sortOrder,
    setSortOrder,
  } = useFilters();

  const [showToast, setShowToast] = useState(false);

  const handleEditCriteria = () => {
    setShowToast(true);
  };

  return (
    <>
      <aside className="fixed left-0 top-0 w-[281px] h-screen bg-sidebar pt-[88px] overflow-y-auto scrollbar-hide">
        <div className="flex flex-col gap-6 p-10 pt-6">
          {/* Filtros activos section */}
          <div className="flex flex-col">
            {/* Title */}
            <p className="text-[14px] font-medium text-white uppercase tracking-wider">
              Filtros activos
            </p>

            {/* Active filter badges */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-4">
              <span className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-sidebar-card rounded-[8px] text-xs font-semibold text-[#8DA596]">
                Badge <X className="w-5 h-5 cursor-pointer text-[#8DA596]" />
              </span>
              <span className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-sidebar-card rounded-[8px] text-xs font-semibold text-[#8DA596]">
                Badge <X className="w-5 h-5 cursor-pointer text-[#8DA596]" />
              </span>
              <span className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-sidebar-card rounded-[8px] text-xs font-semibold text-[#8DA596]">
                Badge <X className="w-5 h-5 cursor-pointer text-[#8DA596]" />
              </span>
              <span className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-sidebar-card rounded-[8px] text-xs font-semibold text-[#8DA596]">
                Badge <X className="w-5 h-5 cursor-pointer text-[#8DA596]" />
              </span>
            </div>

            {/* Origen filter */}
            <div className="flex flex-col gap-4 mt-[26px]">
              <p className="text-[14px] font-normal text-white">Origen</p>

              <div className="flex flex-col gap-2">
                {originOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => setOrigin(option.value)}
                    className={`bg-sidebar-card flex items-center justify-between px-3 py-4 rounded-[8px] h-14 transition-colors cursor-pointer ${
                      origin === option.value
                        ? "border border-brand-green"
                        : ""
                    }`}
                  >
                    <span className="text-[14px] text-white">{option.label}</span>
                    <Checkbox
                      checked={origin === option.value}
                      onChange={() => setOrigin(option.value)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white mt-6" />

            {/* Filtros productivos */}
            <div className="flex flex-col mt-[26px]">
              <p className="text-[12px] font-medium text-white uppercase tracking-wider">
                Filtros productivos
              </p>

              {/* Para vaquillona toggle */}
              <div className="bg-sidebar-card rounded-[8px] py-1 mt-4">
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex flex-col">
                    <span className="text-[14px] text-white">Para vaquillona</span>
                    <span className="text-xs text-white opacity-70">
                      Facilidad de parto
                    </span>
                  </div>
                  <Toggle checked={forHeifer} onChange={setForHeifer} />
                </div>
              </div>

              {/* Pelaje dropdown */}
              <div className="flex flex-col gap-2 mt-4">
                <p className="text-[14px] font-normal text-white">Pelaje</p>
                <Select
                  value={coat}
                  onChange={(value) => setCoat(value as CoatFilter)}
                  options={coatOptions}
                />
              </div>
            </div>

            {/* Ordenamiento */}
            <div className="flex flex-col gap-2 mt-[26px]">
              <p className="text-[12px] font-medium text-white uppercase tracking-wider">
                Ordenamiento
              </p>
              <Select
                value={sortOrder}
                onChange={(value) => setSortOrder(value as SortOrder)}
                options={sortOptions}
              />
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white mt-6" />
          </div>

          {/* Objetivo actual card */}
          <div className="bg-sidebar-card border border-sidebar-border rounded-[8px] p-4 flex flex-col gap-4 mt-6">
            <div className="flex flex-col gap-2">
              <p className="text-[14px] font-semibold text-white">Objetivo actual</p>
              <p className="text-[14px] font-light text-white">
                Maximizar la ganancia de peso (destete) manteniendo facilidad de
                parto.
              </p>
            </div>
            <button
              onClick={handleEditCriteria}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-brand-green-hover border border-brand-green rounded-[8px] h-10 hover:bg-brand-green/20 transition-colors whitespace-nowrap"
            >
              <ArrowLeft className="w-6 h-6 text-brand-green shrink-0" strokeWidth={1.5} />
              <span className="text-[14px] font-semibold text-brand-green">
                Editar criterios
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Toast */}
      <Toast
        message="Esta funcionalidad estará disponible próximamente"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}