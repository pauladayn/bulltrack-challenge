"use client";

import { ChevronDown, ArrowLeft } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 w-[281px] h-screen bg-sidebar pt-[88px] overflow-y-auto">
      <div className="flex flex-col gap-6 p-10 pt-6">
        {/* Filtros activos section */}
        <div className="flex flex-col gap-6">
          {/* Title */}
          <div className="flex flex-col gap-6">
            <p className="text-sm font-medium text-white uppercase tracking-wider">
              Filtros activos
            </p>

            {/* Origen filter */}
            <div className="flex flex-col gap-4">
              <p className="text-sm font-normal text-white">Origen</p>
              
              <div className="flex flex-col gap-2">
                {/* Filter options - estos serán componentes después */}
                <FilterOption label="Todos" checked={true} />
                <FilterOption label="Toros propios" checked={false} />
                <FilterOption label="Catálogo" checked={false} />
                <FilterOption label="Favoritos" checked={false} />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-sidebar-border" />

          {/* Filtros productivos */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-medium text-white uppercase tracking-wider">
              Filtros productivos
            </p>

            {/* Para vaquillona toggle */}
            <div className="bg-sidebar-card rounded-lg py-1">
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex flex-col">
                  <span className="text-sm text-white">Para vaquillona</span>
                  <span className="text-xs text-white">Facilidad de parto</span>
                </div>
                <ToggleSwitch checked={false} />
              </div>
            </div>

            {/* Pelaje dropdown */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-normal text-white">Pelaje</p>
              <DropdownSelect label="Todos" />
            </div>
          </div>

          {/* Ordenamiento */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-white uppercase tracking-wider">
              Ordenamiento
            </p>
            <DropdownSelect label="Score mejor a peor" />
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-sidebar-border" />
        </div>

        {/* Objetivo actual card */}
        <div className="bg-sidebar-card border border-sidebar-border rounded-lg p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-white">Objetivo actual</p>
            <p className="text-sm font-light text-white">
              Maximizar la ganancia de peso (destete) manteniendo facilidad de parto.
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-brand-green-hover border border-brand-green rounded-xl h-10 w-fit">
            <ArrowLeft className="w-6 h-6 text-brand-green" />
            <span className="text-sm font-semibold text-brand-green">Editar criterios</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

// Componentes temporales - los moveremos a /components/ui después
function FilterOption({ label, checked }: { label: string; checked: boolean }) {
  return (
    <div className={`bg-sidebar-card flex items-center justify-between px-3 py-4 rounded-lg h-14 ${checked ? 'border border-brand-green' : ''}`}>
      <span className="text-sm text-white">{label}</span>
      <div className={`w-6 h-6 rounded-lg border-[1.5px] flex items-center justify-center ${checked ? 'bg-brand-green border-brand-green' : 'border-brand-green'}`}>
        {checked && (
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M1 5L5 9L13 1" stroke="#111714" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
    </div>
  );
}

function ToggleSwitch({ checked }: { checked: boolean }) {
  return (
    <div className={`w-11 h-6 rounded-xl relative cursor-pointer ${checked ? 'bg-brand-green' : 'bg-black'}`}>
      <div className={`w-5 h-5 rounded-full bg-brand-green absolute top-0.5 transition-all ${checked ? 'left-[22px]' : 'left-0.5'}`} />
    </div>
  );
}

function DropdownSelect({ label }: { label: string }) {
  return (
    <div className="bg-sidebar-card flex items-center justify-between px-3 py-4 rounded-lg h-14">
      <span className="text-sm text-white">{label}</span>
      <ChevronDown className="w-6 h-6 text-brand-green" />
    </div>
  );
}