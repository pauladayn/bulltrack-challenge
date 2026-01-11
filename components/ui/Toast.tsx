"use client";

import { useEffect } from "react";

import { X, Info } from "lucide-react";

import { cn } from "@/lib/utils";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  variant?: "info" | "success" | "warning";
}

const variantStyles = {
  info: "bg-sidebar border-brand-green",
  success: "bg-brand-green-dark border-brand-green",
  warning: "bg-yellow-900 border-yellow-500",
};

export default function Toast({
  message,
  isVisible,
  onClose,
  duration = 3000,
  variant = "info",
}: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div 
      role="alert"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-[200] animate-in slide-in-from-bottom-4 fade-in duration-300"
    >
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg",
          variantStyles[variant]
        )}
      >
        <Info className="w-5 h-5 text-brand-green shrink-0" aria-hidden="true" />
        <span className="text-sm text-white">{message}</span>
        <button
          onClick={onClose}
          aria-label="Cerrar notificación"
          className="ml-2 p-1 hover:bg-white/10 rounded transition-colors cursor-pointer"
        >
          <X className="w-4 h-4 text-white" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}