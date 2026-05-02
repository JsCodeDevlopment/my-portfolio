"use client";

import { useTheme } from "@/contexts/theme-context";
import { useTranslation } from "@/hooks/use-translation";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";

interface ExperienceCardProps {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  activities: string[];
  stack: string[];
  index: number;
  total: number;
  duration?: string;
  totalCompanyDuration?: string;
}

export function ExperienceCard({
  role,
  company,
  startDate,
  endDate,
  activities,
  stack,
  index,
  total,
  duration,
  totalCompanyDuration,
}: ExperienceCardProps) {
  const { theme } = useTheme();
  const { t, language } = useTranslation();
  const isEven = index % 2 === 0;
  const isPT = language === "pt";

  // Mouse tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`
    radial-gradient(
      650px circle at ${mouseX}px ${mouseY}px,
      rgba(20, 184, 166, 0.15),
      transparent 80%
    )
  `;

  // Reverse numbering: Top card is the highest number
  const jobNumber = total - index;
  const formattedNumber = jobNumber < 10 ? `0${jobNumber}` : jobNumber;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
      onMouseMove={onMouseMove}
      className={`group relative w-full mb-16 lg:mb-24 flex ${
        isEven ? "lg:justify-start" : "lg:justify-end"
      }`}
    >
      {/* Decorative Index Background (Giant Number) */}
      <span
        className={`absolute hidden lg:block text-[15rem] font-bold select-none opacity-[0.03] transition-all duration-700 top-[-6rem] ${
          isEven ? "right-[5%]" : "left-[5%]"
        } ${theme === "dark" ? "text-white" : "text-slate-900"} group-hover:opacity-[0.07] group-hover:scale-105`}
      >
        {formattedNumber}
      </span>

      {/* Main Card */}
      <div className="w-full lg:w-[48%] relative perspective-1000">
        {/* The Actual Card */}
        <div
          className={`relative h-full rounded-[2rem] p-8 lg:p-12 transition-all duration-700 overflow-hidden ${
            theme === "dark"
              ? "bg-[#0a0a0b]/90 border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              : "bg-white border-slate-200/60 shadow-[0_20px_40px_rgba(0,0,0,0.05)]"
          } backdrop-blur-2xl group-hover:shadow-neon-green/10 group-hover:translate-y-[-8px]`}
        >
          {/* Dynamic Background Glow following mouse */}
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
            style={{ background }}
          />

          {/* Animated Highlight Line (Top edge) */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon-green/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

          {/* Header Section */}
          <div className="relative mb-8 pt-2">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex-1">
                <motion.h3
                  className={`text-3xl lg:text-4xl font-extrabold mb-3 leading-tight tracking-tight ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  } group-hover:text-neon-green transition-colors duration-500`}
                >
                  {role}
                </motion.h3>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neon-green/10 flex items-center justify-center border border-neon-green/20 group-hover:bg-neon-green/20 transition-all duration-500">
                    <span className="text-neon-green font-bold text-lg">@</span>
                  </div>
                  <span
                    className={`text-xl lg:text-2xl font-bold tracking-tight ${
                      theme === "dark" ? "text-gray-200" : "text-slate-800"
                    }`}
                  >
                    {company.replace(/\*\*/g, "")}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                <div
                  className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest transition-all duration-500 ${
                    theme === "dark"
                      ? "bg-white/5 text-gray-400 group-hover:bg-neon-green group-hover:text-black shadow-lg"
                      : "bg-slate-50 text-slate-500 group-hover:bg-slate-900 group-hover:text-white shadow-sm border border-slate-200/60"
                  }`}
                >
                  {startDate} — {endDate}
                </div>

                {duration && (
                  <div className="flex flex-col items-start md:items-end gap-1">
                    <div
                      className={`text-[10px] font-mono font-bold uppercase tracking-widest ${theme === "dark" ? "text-neon-green/80" : "text-neon-green"}`}
                    >
                      {duration}{" "}
                      {totalCompanyDuration
                        ? isPT
                          ? "no cargo"
                          : "in role"
                        : ""}
                    </div>
                    {totalCompanyDuration && (
                      <div
                        className={`text-[10px] font-mono font-bold uppercase tracking-widest ${theme === "dark" ? "text-gray-500" : "text-slate-400"}`}
                      >
                        {isPT ? "Total:" : "Total:"} {totalCompanyDuration}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Separator */}
          <div
            className={`w-full h-px mb-8 ${theme === "dark" ? "bg-white/5" : "bg-slate-200/60"}`}
          />

          {/* Content Body */}
          <div className="space-y-6 mb-10 overflow-hidden">
            {activities.map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex gap-5 items-start group/item"
              >
                <div
                  className={`mt-2.5 flex-shrink-0 w-2 h-2 rounded-full transition-all duration-500 ${
                    theme === "dark"
                      ? "bg-neon-green group-hover/item:bg-neon-green shadow-[0_0_8px_rgba(20,184,166,0.6)]"
                      : "bg-neon-green/60 group-hover/item:bg-neon-green"
                  } group-hover/item:scale-125`}
                />
                <p
                  className={`text-normal leading-6 tracking-[0.15em] transition-colors duration-300 ${
                    theme === "dark"
                      ? "text-gray-300 group-hover:text-gray-100"
                      : "text-slate-600 group-hover:text-slate-900"
                  }`}
                >
                  {activity}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Tech Footer */}
          {stack.length > 0 && (
            <div className="relative pt-8">
              <div className="flex items-center gap-4 mb-5">
                <span
                  className={`text-[10px] font-mono tracking-[0.3em] uppercase ${
                    theme === "dark" ? "text-gray-600" : "text-slate-400"
                  }`}
                >
                  {t("experience", "technologies_used")}
                </span>
                <div
                  className={`flex-1 h-px ${theme === "dark" ? "bg-white/[0.03]" : "bg-slate-200/60"}`}
                />
              </div>
              <div className="flex flex-wrap gap-2.5">
                {stack.map((tech, i) => (
                  <span
                    key={i}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-white/[0.03] text-gray-400 border border-white/[0.05] hover:bg-neon-green/10 hover:border-neon-green/30 hover:text-neon-green"
                        : "bg-slate-50 text-slate-500 border border-slate-200/60 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900 shadow-sm"
                    } hover:scale-105 hover:-translate-y-1 shadow-sm`}
                  >
                    {tech.replace(/\*\*/g, "")}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center Marker Line Intersection (Desktop Only) */}
      <div
        className={`hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center w-12 h-12 z-30`}
      >
        <div
          className={`absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-neon-green`}
        />
        <div
          className={`relative w-4 h-4 rounded-full border-2 transition-all duration-500 ${
            theme === "dark"
              ? "bg-black border-white/20 group-hover:border-neon-green group-hover:bg-neon-green group-hover:shadow-[0_0_15px_rgba(20,184,166,0.8)]"
              : "bg-white border-slate-200 group-hover:border-neon-green group-hover:bg-neon-green group-hover:shadow-[0_0_15px_rgba(20,184,166,0.6)]"
          } group-hover:scale-125`}
        />
      </div>
    </motion.div>
  );
}
