"use client";

import { X } from "lucide-react";

import { Checkbox, Divider, EditCriteriaButton, SectionTitle, Select, Toast, Toggle } from "@/components/ui";

import { useFilters } from "@/context/FiltersContext";
import { useToast } from "@/hooks";

import { CoatFilter, SortOrder } from "@/types/filters";
import { ORIGIN_OPTIONS, COAT_OPTIONS, SORT_OPTIONS } from "@/components/filters";
import { ACTIVE_FILTER_BADGES } from "@/lib/constants";

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

  const toast = useToast();

  return (
    <>
      <aside className="fixed left-0 top-0 w-[281px] h-screen bg-sidebar pt-[88px] overflow-y-auto scrollbar-hide">
        <div className="flex flex-col gap-6 p-10 pt-6">
          {/* Filtros activos section */}
          <div className="flex flex-col">
            {/* Title */}
            <SectionTitle>Filtros activos</SectionTitle>

            {/* Active filter badges - mapped from constants */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-4">
              {ACTIVE_FILTER_BADGES.map((badge, index) => (
                <span
                  key={index}
                  className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-sidebar-badge-bg rounded-[8px] text-xs font-semibold text-sidebar-badge-text"
                >
                  {badge}
                  <X className="w-5 h-5 cursor-pointer text-sidebar-badge-text" aria-hidden="true" />
                </span>
              ))}
            </div>

            {/* Origen filter */}
            <div className="flex flex-col gap-4 mt-[26px]">
              <p className="text-[14px] font-normal text-white">Origen</p>

              <div className="flex flex-col gap-2">
                {ORIGIN_OPTIONS.map((option) => (
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
            <Divider className="bg-white mt-6" />

            {/* Filtros productivos */}
            <div className="flex flex-col mt-[26px]">
              <SectionTitle size="sm">Filtros productivos</SectionTitle>

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
                  options={COAT_OPTIONS}
                />
              </div>
            </div>

            {/* Ordenamiento */}
            <div className="flex flex-col gap-2 mt-[26px]">
              <SectionTitle size="sm">Ordenamiento</SectionTitle>
              <Select
                value={sortOrder}
                onChange={(value) => setSortOrder(value as SortOrder)}
                options={SORT_OPTIONS}
              />
            </div>

            {/* Divider */}
            <Divider className="bg-white mt-6" />
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
            <EditCriteriaButton onClick={toast.show} />
          </div>
        </div>
      </aside>

      {/* Toast */}
      <Toast
        message="Esta funcionalidad estará disponible próximamente"
        isVisible={toast.isVisible}
        onClose={toast.hide}
      />
    </>
  );
}
