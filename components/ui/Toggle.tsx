"use client";

import { cn } from "@/lib/utils";

interface ToggleProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export default function Toggle({ checked, onChange, label, className }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label || "Toggle"}
      onClick={() => onChange?.(!checked)}
      className={cn(
        "w-11 h-6 rounded-xl relative transition-colors cursor-pointer",
        checked ? "bg-brand-green" : "bg-black",
        className
      )}
    >
      <div
        className={cn(
          "w-5 h-5 rounded-full absolute top-0.5 transition-all",
          checked 
            ? "left-[22px] bg-sidebar" 
            : "left-0.5 bg-brand-green"
        )}
      />
    </button>
  );
}
