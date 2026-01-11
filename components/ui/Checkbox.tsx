"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

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
      role="checkbox"
      aria-checked={checked}
      aria-label={label || "Checkbox"}
      onClick={() => onChange?.(!checked)}
      className={cn(
        "flex items-center gap-3 shrink-0 cursor-pointer",
        label && "w-full",
        className
      )}
    >
      <div
        className={cn(
          "w-6 h-6 rounded-[8px] border-[1.5px] flex items-center justify-center transition-colors shrink-0",
          checked
            ? "bg-brand-green border-brand-green"
            : "border-brand-green bg-transparent"
        )}
      >
        {checked && <Check className="w-4 h-4 text-sidebar" strokeWidth={3} aria-hidden="true" data-testid="check-icon" />}
      </div>
      {label && <span className="text-sm text-white">{label}</span>}
    </button>
  );
}
