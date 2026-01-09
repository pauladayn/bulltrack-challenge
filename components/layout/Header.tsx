"use client";

import { MapPin, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-[88px] bg-sidebar z-50">
      <div className="flex items-center justify-between h-full px-10">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-green rounded-3xl flex items-center justify-center">
            <span className="text-lg font-semibold text-[#393939]">B</span>
          </div>
          <span className="text-lg font-semibold text-white">Bulltrack</span>
        </div>

        {/* Right side - Location & Avatar */}
        <div className="flex items-center gap-6">
          {/* Location selector */}
          <button className="flex items-center gap-2 px-4 py-3 bg-brand-green-hover border border-brand-green rounded-xl h-10">
            <MapPin className="w-6 h-6 text-brand-green" />
            <span className="text-sm font-semibold text-brand-green">La soledad</span>
            <ChevronDown className="w-6 h-6 text-brand-green" />
          </button>

          {/* Avatar */}
          <div className="relative w-14 h-14">
            <div className="w-14 h-14 rounded-full bg-gray-300 overflow-hidden">
              {/* Placeholder avatar - podés reemplazar con una imagen real */}
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400" />
            </div>
            {/* Online indicator */}
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-brand-green rounded-full border-2 border-white" />
          </div>
        </div>
      </div>
    </header>
  );
}