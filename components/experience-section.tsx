"use client";

import { ExperienceCard } from "@/components/experience-card";
import { useCountAnimation } from "@/hooks/use-count-animation";
import { useExperienceRequest } from "@/hooks/use-experience";
import { useTranslation } from "@/hooks/use-translation";
import { motion, useInView, useScroll, useSpring } from "motion/react";
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
    offset: ["start end", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

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
      id="experience"
      className={`py-40 transition-colors duration-300 relative ${
        theme === "dark" ? "bg-black" : "bg-white"
      } overflow-hidden`}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-neon-green/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-neon-green/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" className="mb-32">
          <div className="flex flex-col gap-6">
            <SectionTitle 
              title={t("experience", "title")} 
              index="04" 
              subtitle={t("experience", "section_subtitle")}
            />
          </div>
        </ScrollReveal>

        <div ref={containerRef} className="relative mb-48 pt-12">
          {/* Central Vertical Line (Desktop only) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2">
            <div
              className={`w-full h-full ${theme === "dark" ? "bg-white/10" : "bg-black/10"}`}
            />
            <motion.div
              style={{ scaleY }}
              className="absolute top-0 w-full h-full bg-neon-green origin-top drop-shadow-[0_0_15px_#14b8a6]"
            />
          </div>

          {/* Cards Content */}
          <div className="space-y-32 lg:space-y-48">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={index}
                {...exp}
                index={index}
                total={experiences.length}
              />
            ))}
          </div>
        </div>

        {/* Stats Section - Reimagined for Ultra-Premium feel */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 pt-20 border-t border-white/[0.05]"
        >
          {stats.map((stat, index) => (
            <ScrollReveal
              key={index}
              direction="up"
              delay={index * 150}
              duration={800}
            >
              <div
                className={`group relative flex flex-col items-center justify-center p-16 transition-all duration-700 rounded-[3rem] ${
                  theme === "dark"
                    ? "bg-[#0c0c0d]/40 hover:bg-[#121214]/60"
                    : "bg-gray-50 hover:bg-white"
                } border border-white/[0.04] backdrop-blur-3xl overflow-hidden text-center shadow-2xl hover:shadow-neon-green/5 hover:-translate-y-4`}
              >
                {/* Floating Glow Sphere */}
                <div
                  className={`absolute -top-10 -right-10 w-40 h-40 blur-3xl rounded-full transition-all duration-700 opacity-0 group-hover:opacity-40 group-hover:scale-150 bg-neon-green/30`}
                />

                <div className="relative z-10">
                  <div className="relative inline-block mb-6">
                    <div className="text-7xl sm:text-8xl lg:text-9xl font-black mb-0 transition-all duration-700 group-hover:scale-110 group-hover:text-neon-green tracking-tighter">
                      {countAnimations[index].count}
                    </div>
                    <span className="absolute -top-4 -right-8 text-4xl lg:text-5xl font-black text-neon-green">
                      +
                    </span>
                  </div>
                  <div
                    className={`text-xs lg:text-sm font-bold uppercase tracking-[0.4em] transition-colors duration-500 ${
                      theme === "dark"
                        ? "text-gray-500 group-hover:text-neon-green"
                        : "text-gray-400 group-hover:text-neon-green"
                    }`}
                  >
                    {stat.label}
                  </div>
                </div>

                {/* Cyber-pulse effect at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
                  <div className="w-full h-full bg-neon-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-center" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
