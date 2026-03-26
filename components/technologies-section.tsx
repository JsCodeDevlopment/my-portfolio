"use client";

import { useTranslation } from "@/hooks/use-translation";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { technologies } from "../constants/tecnologies.const";
import { useTheme } from "../contexts/theme-context";
import { ScrollReveal } from "./scroll-reveal";
import { SectionTitle } from "./section-title";

function TechItem({ tech, theme }: { tech: any; theme: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`
    radial-gradient(
      100px circle at ${mouseX}px ${mouseY}px,
      rgba(20, 184, 166, 0.1),
      transparent 80%
    )
  `;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={`group/tech relative flex items-center gap-4 p-5 rounded-2xl transition-all duration-500 cursor-default border ${
        theme === "dark"
          ? "border-transparent hover:border-white/[0.05] hover:bg-white/[0.02]"
          : "border-transparent hover:border-black/[0.05] hover:bg-black/[0.02]"
      }`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover/tech:opacity-100 rounded-2xl"
        style={{ background }}
      />

      <div className="relative z-10 w-10 h-10 flex items-center justify-center grayscale group-hover/tech:grayscale-0 transition-all duration-500 group-hover/tech:scale-110">
        <tech.image width={40} height={40} />
      </div>

      <div className="relative z-10 flex flex-col">
        <span
          className={`text-[11px] font-mono font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
            theme === "dark"
              ? "text-gray-500 group-hover/tech:text-white"
              : "text-gray-400 group-hover/tech:text-black"
          }`}
        >
          {tech.name}
        </span>
      </div>
    </motion.div>
  );
}

export function TechnologiesSection() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const techCategories = [
    {
      id: "frontend",
      title: t("technologies", "frontend"),
      items: technologies.filter((tech) =>
        [
          "react",
          "nextjs",
          "typescript",
          "javascript",
          "html",
          "css",
          "tailwind",
        ].includes(tech.id),
      ),
    },
    {
      id: "backend",
      title: t("technologies", "backend"),
      items: technologies.filter((tech) =>
        [
          "nodejs",
          "express",
          "nestjs",
          "golang",
          "mongodb",
          "postgresql",
          "mysql",
          "redis",
          "prisma",
        ].includes(tech.id),
      ),
    },
    {
      id: "tools",
      title: t("technologies", "tools"),
      items: technologies.filter((tech) =>
        ["git", "docker", "jest", "zod"].includes(tech.id),
      ),
    },
  ];

  return (
    <section
      id="technologies"
      className={`py-40 transition-colors duration-300 relative ${
        theme === "dark" ? "bg-black" : "bg-white"
      } overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" className="mb-24">
          <SectionTitle title={t("technologies", "title")} />
        </ScrollReveal>

        <div className="flex flex-col gap-24">
          {techCategories.map((category, index) => (
            <ScrollReveal key={category.id} direction="up" delay={index * 100}>
              <div className="relative">
                <div className="flex items-center gap-8 mb-12">
                  <h3
                    className={`text-sm font-mono font-black uppercase tracking-[0.4em] ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}
                  >
                    {category.title}
                  </h3>
                  <div
                    className={`flex-1 h-px ${theme === "dark" ? "bg-white/[0.05]" : "bg-black/[0.05]"}`}
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-4">
                  {category.items.map((tech: any) => (
                    <TechItem key={tech.id} tech={tech} theme={theme} />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#14b8a6_0%,_transparent_70%)] blur-[100px]" />
      </div>
    </section>
  );
}
