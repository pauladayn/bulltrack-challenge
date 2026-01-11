import { CloudCog } from "lucide-react";

import MainLayout from "@/components/layout/MainLayout";
import ExportButton from "@/components/layout/ExportButton";
import { BullGrid } from "@/components/bulls";
import BullToolbar from "@/components/bulls/BullToolbar";

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
          <span className="text-[14px] font-normal text-text-primary">
            Datos actualizados hace 2 min
          </span>
        </div>

        {/* Title section */}
        <div className="flex flex-col gap-2 mt-6">
          <div className="flex items-center justify-between">
            <h1 className="text-[32px] font-semibold text-text-primary">
              Resultados de la clasificación
            </h1>
            <ExportButton />
          </div>
          <p className="text-[16px] font-normal text-text-primary">
            Los resultados están ordenados por Bulltrack Score que reflejan tus objetivos de producción
          </p>
        </div>

        <div className="mt-[22px]">
          <BullToolbar totalResults={bulls.length} />
        </div>

        <div className="mt-6">
          <BullGrid bulls={bulls} />
        </div>
      </div>
    </MainLayout>
  );
}
