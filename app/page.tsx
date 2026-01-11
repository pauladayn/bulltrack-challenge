import MainLayout from "@/components/layout/MainLayout";
import { BullGrid } from "@/components/bulls";
import BullToolbar from "@/components/bulls/BullToolbar";
import { CloudCog, Download } from "lucide-react";
import { getBulls } from "./actions/bulls";

export default async function Home() {
  // Fetch bulls using Server Action
  const bulls = await getBulls();

  return (
    <MainLayout>
      <div className="flex flex-col">
        {/* Sync status */}
        <div className="flex items-center gap-2">
          <CloudCog className="w-4 h-4 text-brand-green-dark" strokeWidth={1.5} />
          <span className="text-[14px] font-normal text-[#2D2D2D]">
            Datos actualizados hace 2 min
          </span>
        </div>

        {/* Title section */}
        <div className="flex flex-col gap-2 mt-6">
          <div className="flex items-center justify-between">
            <h1 className="text-[32px] font-semibold text-[#2D2D2D]">
              Resultados de la clasificación
            </h1>
            <button className="flex items-center justify-center gap-2 px-3 py-2 bg-brand-green-dark rounded-[8px] h-8 w-[115px]">
              <span className="text-[12px] font-semibold text-white">Exportar</span>
              <Download className="w-4 h-4 text-white" strokeWidth={1.5} />
            </button>
          </div>
          <p className="text-[16px] font-normal text-[#2D2D2D]">
            Los resultados están ordenados por Bulltrack Score que reflejan tus objetivos de producción
          </p>
        </div>

        {/* Toolbar - 22px spacing from description */}
        <div className="mt-[22px]">
          <BullToolbar totalResults={bulls.length} />
        </div>

        {/* Bull cards - 24px spacing from toolbar */}
        <div className="mt-6">
          <BullGrid bulls={bulls} />
        </div>
      </div>
    </MainLayout>
  );
}