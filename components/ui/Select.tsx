"use client";

import { useState, useRef, useEffect, useId } from "react";

import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  className?: string;
}

export default function Select({ 
  value, 
  onChange, 
  options, 
  placeholder = "Seleccionar",
  label,
  className 
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Trigger */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={label || "Seleccionar opción"}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-sidebar-card flex items-center justify-between px-3 py-4 rounded-[8px] h-14 w-full cursor-pointer"
      >
        <span className="text-sm text-white">
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown 
          className={cn(
            "w-6 h-6 text-brand-green transition-transform",
            isOpen && "rotate-180"
          )}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div 
          id={listboxId}
          role="listbox"
          aria-activedescendant={value}
          className="absolute top-full left-0 right-0 mt-1 bg-sidebar-card rounded-[8px] border border-sidebar-border overflow-hidden z-50"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={value === option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={cn(
                "w-full px-3 py-3 text-sm text-left text-white hover:bg-brand-green-hover transition-colors cursor-pointer",
                value === option.value && "bg-brand-green-hover"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
