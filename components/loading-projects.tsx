"use client";

import { useTheme } from "@/contexts/theme-context";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { useEffect } from "react";

export function Loading() {
  const { theme } = useTheme();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const background = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px,
      rgba(20, 184, 166, 0.08),
      transparent 80%
    )
  `;

  return (
    <div
      className={`min-h-screen fixed inset-0 z-[100] flex flex-col items-center justify-center transition-colors duration-700 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-100"
        style={{ background }}
      />

      <div className="relative z-10 flex flex-col items-center gap-12">
        <div className="relative w-24 h-24">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 border-2 border-neon-green/20 rounded-[2rem]"
          />

          <motion.div
            animate={{
              scale: [0.8, 1, 0.8],
              borderRadius: ["30%", "50%", "30%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-4 bg-neon-green shadow-[0_0_30px_rgba(20,184,166,0.5)]"
          />

          <div className="absolute inset-1 border-t-2 border-neon-green rounded-full animate-spin duration-[1500ms]" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-neon-green font-mono text-[10px] lowercase tracking-[0.8em] font-black"
          >
            initialising
          </motion.span>

          <h2
            className={`text-4xl lg:text-5xl font-black tracking-tighter ${theme === "dark" ? "text-white" : "text-black"}`}
          >
            JONATAS<span className="text-neon-green">.</span>
          </h2>

          <div className="flex items-center gap-4 mt-4 overflow-hidden">
            <span
              className={`text-[10px] font-mono uppercase tracking-widest ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}
            >
              Establishing Core
            </span>
            <div
              className={`w-32 h-px ${theme === "dark" ? "bg-white/5" : "bg-black/5"} relative`}
            >
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-y-0 w-1/2 bg-neon-green/40 blur-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-20 right-20 text-[10vw] font-black opacity-[0.02] pointer-events-none select-none ${theme === "dark" ? "text-white" : "text-black"}`}
      >
        LOADING
      </div>
    </div>
  );
}
