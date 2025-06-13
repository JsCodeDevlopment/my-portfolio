"use client";

import { useTheme } from "../contexts/theme-context";

interface SectionTitleProps {
  title: string;
  className?: string;
}

export function SectionTitle({ title, className = "" }: SectionTitleProps) {
  const { theme } = useTheme();

  return (
    <div className={`group cursor-pointer ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-6xl sm:text-8xl lg:text-9xl font-black text-neon-green transition-all duration-300">
          {title}
        </h2>

        {/* Line and Arrow Container */}
        <div className="flex items-center flex-1 ml-8">
          {/* Main Line */}
          <div
            className={`flex-1 h-1 relative overflow-hidden transition-colors duration-300 ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-300"
            }`}
          >
            {/* Animated line that extends on hover */}
            <div className="absolute inset-0 bg-neon-green transform origin-left scale-x-75 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
          </div>

          {/* Arrow that appears on hover */}
          <div className="ml-4 flex items-center relative w-12 h-6">
            <div className="absolute left-0 w-8 h-1 bg-neon-green transform origin-left scale-x-75 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
            <div className="absolute top-[5px] left-0 w-8 h-1 bg-neon-green transform origin-right rotate-45 translate-y-1 translate-x-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-300"></div>
            <div className="absolute top-[5px] left-0 w-8 h-1 bg-neon-green transform origin-right -rotate-45 translate-y-1 translate-x-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-300"></div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="w-24 h-1 bg-neon-green"></div>
    </div>
  );
}
