"use client";

import { useTranslation } from "@/hooks/use-translation";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { useTheme } from "../contexts/theme-context";
import { ScrollReveal } from "./scroll-reveal";
import { SectionTitle } from "./section-title";

export function AboutSection() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px,
      rgba(20, 184, 166, 0.05),
      transparent 80%
    )
  `;

  const skills = [
    {
      name: "TypeScript",
      role: "Language",
      description: t("about", "language"),
    },
    { name: "Node.js", role: "Runtime", description: t("about", "runtime") },
    { name: "React", role: "Frontend", description: t("about", "framework") },
    { name: "NestJS", role: "Backend", description: t("about", "framework") },
  ];

  const stats = [
    {
      label: "Years Exp.",
      value: (new Date().getFullYear() - 2023).toString() + "+",
    },
    { label: "Projects", value: "30+" },
    { label: "Coffee/Day", value: "∞" },
  ];

  return (
    <section
      id="about"
      onMouseMove={handleMouseMove}
      className={`py-40 relative transition-colors duration-300 overflow-hidden ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-100"
        style={{ background }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" className="mb-24 text-center lg:text-left">
          <SectionTitle title={t("about", "title")} />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-7 space-y-12">
            <ScrollReveal direction="up" delay={200}>
              <h3
                className={`text-4xl lg:text-6xl font-black leading-[1.1] tracking-tighter ${theme === "dark" ? "text-white" : "text-black"}`}
              >
                {t("about", "hero_text_1")}{" "}
                <span className="text-neon-green">{t("about", "hero_text_2")}</span>{" "}
                {t("about", "hero_text_3")}{" "}
                <span className="text-neon-green/40">{t("about", "hero_text_4")}</span>.
              </h3>
            </ScrollReveal>

            <div className="space-y-8 max-w-2xl">
              <ScrollReveal direction="up" delay={400}>
                <p
                  className={`text-xl leading-relaxed ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                >
                  {t("about", "description_1", {
                    years: (new Date().getFullYear() - 2023).toString(),
                  })}
                </p>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={600}>
                <p
                  className={`text-lg leading-relaxed ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}
                >
                  {t("about", "description_2")} {t("about", "description_3")}
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={800}>
              <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/[0.05]">
                <div className="space-y-2">
                  <span className="text-neon-green font-mono text-[10px] uppercase tracking-[0.4em] font-black">
                    {t("about", "years_exp")}
                  </span>
                  <div
                    className={`text-4xl lg:text-5xl font-black ${theme === "dark" ? "text-white" : "text-black"}`}
                  >
                    {(new Date().getFullYear() - 2023).toString()}+
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-neon-green font-mono text-[10px] uppercase tracking-[0.4em] font-black">
                    {t("about", "projects_stat")}
                  </span>
                  <div
                    className={`text-4xl lg:text-5xl font-black ${theme === "dark" ? "text-white" : "text-black"}`}
                  >
                    30+
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-neon-green font-mono text-[10px] uppercase tracking-[0.4em] font-black">
                    {t("about", "coffee_day")}
                  </span>
                  <div
                    className={`text-4xl lg:text-5xl font-black ${theme === "dark" ? "text-white" : "text-black"}`}
                  >
                    ∞
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5">
            <ScrollReveal direction="up" delay={1000}>
              <div
                className={`relative p-8 lg:p-12 rounded-[3.5rem] border transition-all duration-700 ${
                  theme === "dark"
                    ? "bg-[#0c0c0d]/60 border-white/[0.05] hover:border-neon-green/20"
                    : "bg-gray-50 border-black/[0.05] hover:bg-white hover:shadow-2xl"
                } backdrop-blur-3xl`}
              >
                <div className="mb-10 flex flex-col gap-2">
                  <span className="text-neon-green font-mono text-[10px] uppercase tracking-[0.4em] font-black">
                    {t("about", "current_focus")}
                  </span>
                  <h4
                    className={`text-3xl font-black ${theme === "dark" ? "text-white" : "text-black"}`}
                  >
                    {t("about", "core_stack")}
                  </h4>
                </div>

                <div className="space-y-8">
                  {skills.map((skill, i) => (
                    <div key={i} className="group relative">
                      <div className="flex justify-between items-end mb-2">
                        <div>
                          <span
                            className={`text-[10px] font-mono uppercase tracking-widest ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}
                          >
                            {skill.role}
                          </span>
                          <h5
                            className={`text-xl font-bold transition-all duration-300 group-hover:text-neon-green ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}
                          >
                            {skill.name}
                          </h5>
                        </div>
                        <span
                          className={`text-xs font-mono font-black ${theme === "dark" ? "text-neon-green/40" : "text-black/20"}`}
                        >
                          {skill.description}
                        </span>
                      </div>
                      <div
                        className={`w-full h-px ${theme === "dark" ? "bg-white/[0.05]" : "bg-black/[0.05]"}`}
                      />
                      <div className="absolute bottom-0 left-0 w-full h-px bg-neon-green scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </div>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-white/[0.03] flex justify-center">
                  <button
                    onClick={() =>
                      document
                        .getElementById("technologies")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className={`flex items-center gap-2 group/btn px-6 py-3 rounded-full border transition-all duration-500 ${
                      theme === "dark"
                        ? "border-white/10 hover:border-neon-green/40 hover:bg-neon-green/5"
                        : "border-black/10 hover:border-black/20 hover:bg-black/5"
                    }`}
                  >
                    <span
                      className={`text-[10px] font-mono font-black uppercase tracking-widest ${theme === "dark" ? "text-gray-400 group-hover:text-neon-green" : "text-gray-500 group-hover:text-black"}`}
                    >
                      {t("about", "view_tech_stack")}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-neon-green group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <div
        className={`absolute -bottom-20 -left-20 text-[20rem] font-black pointer-events-none select-none opacity-[0.02] ${theme === "dark" ? "text-white" : "text-black"}`}
      >
        {t("about", "bg_text")}
      </div>
    </section>
  );
}
