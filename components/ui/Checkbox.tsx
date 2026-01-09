"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface CheckboxProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export default function Checkbox({ checked, onChange, label, className }: CheckboxProps) {
  return (
    <button
      type="button"
      onClick={() => onChange?.(!checked)}
      className={cn(
        "flex items-center gap-3 w-full",
        className
      )}
    >
      <div
        className={cn(
          "w-6 h-6 rounded-lg border-[1.5px] flex items-center justify-center transition-colors",
          checked
            ? "bg-brand-green border-brand-green"
            : "border-brand-green bg-transparent"
        )}
      >
        {checked && <Check className="w-4 h-4 text-sidebar" strokeWidth={3} />}
      </div>
      {label && <span className="text-sm text-white">{label}</span>}
    </button>
  );
}