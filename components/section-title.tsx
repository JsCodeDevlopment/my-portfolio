"use client";

import { motion } from "motion/react";
import { useTheme } from "../contexts/theme-context";

interface SectionTitleProps {
  title: string;
  index?: string;
  subtitle?: string;
  className?: string;
}

export function SectionTitle({
  title,
  index = "01",
  subtitle = "Section",
  className = "",
}: SectionTitleProps) {
  const { theme } = useTheme();

  return (
    <div className={`relative group ${className}`}>
      {/* Metadata Marker */}
      <div className="flex items-center gap-4 mb-6 overflow-hidden">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-3"
        >
          <span className="text-neon-green font-mono text-[10px] font-black uppercase tracking-[0.4em]">
            {subtitle}
          </span>
          <div className={`w-8 h-px ${theme === "dark" ? "bg-white/10" : "bg-black/10"}`} />
          <span className={`font-mono text-[10px] font-black tracking-widest ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}>
            NO. {index}
          </span>
        </motion.div>
      </div>

      {/* Main Title */}
      <div className="relative inline-block">
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={`text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter transition-all duration-700 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          {title}<span className="text-neon-green">.</span>
        </motion.h2>

        {/* Dynamic Underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-neon-green via-neon-green/40 to-transparent origin-left"
        />
      </div>

      {/* Background Decorative Element */}
      <div 
        className={`absolute -top-12 -left-8 text-[12rem] font-black pointer-events-none select-none opacity-[0.02] transition-transform duration-1000 group-hover:translate-x-4 ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        {title.toUpperCase()}
      </div>
    </div>
  );
}
