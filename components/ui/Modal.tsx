"use client";

import { ReactNode, useEffect } from "react";

import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export default function Modal({ 
  isOpen, 
  onClose, 
  children, 
  className,
  ariaLabel = "Modal dialog"
}: ModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100]"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/25"
        onClick={onClose}
        data-testid="modal-overlay"
        aria-hidden="true"
      />
      
      {/* Modal content */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div 
          className={cn(
            "relative w-full",
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
