import MainLayout from "@/components/layout/MainLayout";
import { CloudCog } from "lucide-react";

export default function Home() {
  return (
    <MainLayout>
      {/* Header info */}
      <div className="flex flex-col gap-6">
        {/* Sync status */}
        <div className="flex items-center gap-2">
          <CloudCog className="w-4 h-4 text-brand-green-dark" />
          <span className="text-sm text-text-primary">
            Datos actualizados hace 2 min
          </span>
        </div>

        {/* Title section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-[32px] font-semibold text-text-primary">
              Resultados de la clasificación
            </h1>
            <button className="flex items-center gap-2 px-3 py-2 bg-brand-green-dark rounded-lg h-8">
              <span className="text-xs font-semibold text-white">Exportar</span>
            </button>
          </div>
          <p className="text-base text-text-primary">
            Los resultados están ordenados por Bulltrack Score que reflejan tus objetivos de producción
          </p>
        </div>

        {/* Placeholder for content */}
        <div className="bg-bg-tertiary rounded-lg p-4 mt-4">
          <p className="text-text-primary">
            🐂 Aquí irán las BullCards - Fase 5
          </p>
        </div>
      </div>
    </MainLayout>
  );
}