"use client";

import { ExperienceCard } from "@/components/experience-card";
import { useCountAnimation } from "@/hooks/use-count-animation";
import { useExperienceRequest } from "@/hooks/use-experience";
import { useTranslation } from "@/hooks/use-translation";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { useTheme } from "../contexts/theme-context";
import { ScrollReveal } from "./scroll-reveal";
import { SectionTitle } from "./section-title";

export function ExperienceSection() {
  const { theme } = useTheme();
  const { t, language } = useTranslation();
  const { experiences } = useExperienceRequest(
    language === "en" ? "resume" : "curriculo",
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(experiences.length - 1) * (100 / experiences.length - 2.5)}%`],
  );

  const stats = [
    { number: 30, label: t("experience", "projects") },
    { number: 10, label: t("experience", "satisfied") },
    { number: 100, label: t("experience", "positive") },
  ];

  const count1 = useCountAnimation(stats[0].number, 2000, false);
  const count2 = useCountAnimation(stats[1].number, 2000, false);
  const count3 = useCountAnimation(stats[2].number, 2000, false);

  const countAnimations = [count1, count2, count3];

  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statsRef, { amount: 0.3, margin: "50px" });

  useEffect(() => {
    if (isInView) {
      countAnimations.forEach((animation) => {
        animation.resetAnimation();
        setTimeout(() => {
          animation.startAnimation();
        }, 100);
      });
    } else {
      countAnimations.forEach((animation) => {
        animation.resetAnimation();
      });
    }
  }, [isInView]);

  return (
    <section
      ref={containerRef}
      id="experience"
      className={`relative h-[300vh] transition-colors duration-500 ${
        theme === "dark" ? "bg-black" : "bg-[#f8f9fa]"
      }`}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-neon-green/20 blur-[150px] rounded-full" />
          <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-neon-green/10 blur-[150px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full mb-12 relative z-20">
          <ScrollReveal direction="up">
            <SectionTitle
              title={t("experience", "title")}
              index="04"
              subtitle={t("experience", "section_subtitle")}
            />
          </ScrollReveal>
        </div>

        <div className="relative flex items-center h-[65vh]">
          <motion.div style={{ x }} className="flex gap-12 px-6 lg:px-[10%]">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={index}
                {...exp}
                index={index}
                total={experiences.length}
                duration={exp.duration}
                totalCompanyDuration={exp.totalCompanyDuration}
              />
            ))}
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full mt-20 relative z-20">
          <div
            ref={statsRef}
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-12 border-t ${theme === "dark" ? "border-white/[0.05]" : "border-slate-200"}`}
          >
            {stats.map((stat, index) => (
              <ScrollReveal
                key={index}
                direction="up"
                delay={index * 150}
                duration={800}
              >
                <div
                  className={`group relative flex flex-col items-center justify-center p-8 transition-all duration-700 rounded-[2.5rem] ${
                    theme === "dark"
                      ? "bg-[#0c0c0d]/40 hover:bg-[#121214]/60"
                      : "bg-white hover:bg-white"
                  } border ${theme === "dark" ? "border-white/[0.04]" : "border-slate-200/60"} backdrop-blur-3xl overflow-hidden text-center shadow-2xl hover:shadow-neon-green/5 hover:-translate-y-2`}
                >
                  <div className="relative z-10">
                    <div className="relative inline-block mb-2">
                      <div
                        className={`text-5xl lg:text-6xl font-black mb-0 transition-all duration-700 group-hover:scale-110 group-hover:text-neon-green tracking-tighter ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                      >
                        {countAnimations[index].count}
                      </div>
                      <span className="absolute -top-2 -right-6 text-2xl font-black text-neon-green">
                        +
                      </span>
                    </div>
                    <div
                      className={`text-[10px] font-bold uppercase tracking-[0.4em] transition-colors duration-500 ${
                        theme === "dark"
                          ? "text-gray-500 group-hover:text-neon-green"
                          : "text-slate-400 group-hover:text-neon-green"
                      }`}
                    >
                      {stat.label}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
