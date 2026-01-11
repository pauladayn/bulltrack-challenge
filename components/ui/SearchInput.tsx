"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({ 
  value, 
  onChange, 
  placeholder = "Busca por caravana, nombre o cabaña",
  className 
}: SearchInputProps) {
  return (
    <div className={cn(
      "bg-white flex items-center px-6 py-4 rounded-[8px]",
      className
    )}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 text-base text-text-primary placeholder:text-text-primary bg-transparent outline-none"
      />
      <Search className="w-6 h-6 text-text-primary" strokeWidth={1.5} />
    </div>
  );
}