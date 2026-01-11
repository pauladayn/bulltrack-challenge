"use client";

import { ArrowLeft } from "lucide-react";

interface EditCriteriaButtonProps {
  onClick: () => void;
}

export default function EditCriteriaButton({ onClick }: EditCriteriaButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Editar criterios de ranking"
      className="flex items-center justify-center gap-2 px-4 py-3 bg-brand-green-hover border border-brand-green rounded-[8px] h-10 hover:bg-brand-green/20 transition-colors whitespace-nowrap cursor-pointer"
    >
      <ArrowLeft 
        className="w-5 h-5 text-brand-green shrink-0" 
        strokeWidth={1.5} 
        aria-hidden="true" 
      />
      <span className="text-[14px] font-semibold text-brand-green">
        Editar criterios
      </span>
    </button>
  );
}
