"use client";

import { useState } from "react";

import { Download } from "lucide-react";

import { Toast } from "@/components/ui";

export default function ExportButton() {
  const [showToast, setShowToast] = useState(false);

  const handleExport = () => {
    setShowToast(true);
  };

  return (
    <>
      <button
        onClick={handleExport}
        aria-label="Exportar datos"
        className="flex items-center justify-center gap-2 px-3 py-2 bg-brand-green-dark rounded-[8px] h-8 w-[115px] cursor-pointer"
      >
        <span className="text-[12px] font-semibold text-white">Exportar</span>
        <Download className="w-4 h-4 text-white" strokeWidth={1.5} aria-hidden="true" />
      </button>

      <Toast
        message="Esta funcionalidad estará disponible próximamente"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
