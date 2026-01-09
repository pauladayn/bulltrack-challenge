"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-brand-green-dark text-white hover:bg-brand-green-dark/90",
  secondary: "bg-brand-green-hover border border-brand-green text-brand-green hover:bg-brand-green-hover/80",
  ghost: "bg-transparent text-brand-green hover:bg-brand-green-hover/50",
  outline: "bg-transparent border border-brand-green text-brand-green hover:bg-brand-green-hover",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-xs h-8",
  md: "px-4 py-3 text-sm h-10",
  lg: "px-6 py-4 text-base h-12",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className,
  disabled = false,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
}