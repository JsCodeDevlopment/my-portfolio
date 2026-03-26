"use client";

import { useTheme } from "@/contexts/theme-context";
import { ScrollReveal } from "@/components/scroll-reveal";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";

interface CertificateCardProps {
  title: string;
  institution: string;
  description: string[];
  index: number;
}

export function CertificateCard({
  title,
  institution,
  description,
  index,
}: CertificateCardProps) {
  const { theme } = useTheme();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`
    radial-gradient(
      150px circle at ${mouseX}px ${mouseY}px,
      rgba(20, 184, 166, 0.08),
      transparent 80%
    )
  `;

  return (
    <ScrollReveal direction="up" delay={index * 100}>
      <motion.div
        onMouseMove={handleMouseMove}
        className={`group relative p-8 rounded-3xl transition-all duration-500 border ${
          theme === "dark"
            ? "border-transparent hover:border-white/[0.05] hover:bg-white/[0.02]"
            : "border-transparent hover:border-black/[0.05] hover:bg-black/[0.02]"
        }`}
      >
        {/* Subtle Hover Glow */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 rounded-3xl"
          style={{ background }}
        />

        <div className="relative z-10 space-y-3">
          <span className="text-neon-green font-mono text-[10px] uppercase tracking-[0.4em] font-black">
            Certificate
          </span>

          <h3
            className={`text-lg lg:text-xl font-black transition-colors duration-500 group-hover:text-neon-green ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            {title}
          </h3>

          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-mono font-bold tracking-widest ${theme === "dark" ? "text-gray-600" : "text-gray-500"}`}>
               {institution}
            </span>
          </div>

          {description && description.length > 0 && (
            <div className="pt-3">
              {description.map((desc, i) => (
                <p key={i} className={`text-xs leading-relaxed transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-500 group-hover:text-gray-400" : "text-gray-600 group-hover:text-gray-800"
                }`}>
                  {desc}
                </p>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </ScrollReveal>
  );
}