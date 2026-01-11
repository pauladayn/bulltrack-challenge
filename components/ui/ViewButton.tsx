"use client";

import { Eye } from "lucide-react";

import { cn } from "@/lib/utils";

interface ViewButtonProps {
  onClick: () => void;
  ariaLabel: string;
  size?: "sm" | "md";
}

export default function ViewButton({ 
  onClick, 
  ariaLabel,
  size = "md" 
}: ViewButtonProps) {
  const sizeClasses = size === "sm" 
    ? "w-8 h-8 rounded-lg" 
    : "w-10 h-10 rounded-xl";
  
  const iconSize = size === "sm" ? "w-4 h-4" : "w-6 h-6";

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        sizeClasses,
        "bg-brand-green-dark flex items-center justify-center hover:bg-brand-green-dark/80 transition-colors cursor-pointer"
      )}
    >
      <Eye 
        className={cn(iconSize, "text-white")} 
        strokeWidth={1.5} 
        aria-hidden="true" 
      />
    </button>
  );
}
