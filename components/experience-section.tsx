"use client";

import { ExperienceCard } from "@/components/experience-card";
import { useCountAnimation } from "@/hooks/use-count-animation";
import { useExperienceRequest } from "@/hooks/use-experience";
import { useTranslation } from "@/hooks/use-translation";
import { useEffect, useRef } from "react";
import { useTheme } from "../contexts/theme-context";
import { ScrollReveal } from "./scroll-reveal";
import { SectionTitle } from "./section-title";

export function ExperienceSection() {
  const { theme } = useTheme();
  const { t, language } = useTranslation();
  const { experiences } = useExperienceRequest(
    language === "en" ? "resume" : "curriculo"
  );
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    { number: 30, label: t("experience", "projects") },
    { number: 10, label: t("experience", "satisfied") },
    { number: 100, label: t("experience", "positive") },
  ];

  const countAnimations = stats.map((stat) =>
    useCountAnimation(stat.number, 2000, false)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            countAnimations.forEach((animation) => animation.startAnimation());
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      className={`py-32 transition-colors duration-300 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <ScrollReveal direction="up" className="mb-16">
          <SectionTitle title={t("experience", "title")} />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 font-mono">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} index={index} />
          ))}
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <ScrollReveal
              key={index}
              direction="up"
              delay={index * 200}
              duration={800}
            >
              <div className="text-center group cursor-pointer">
                <div className="text-6xl sm:text-8xl font-black text-neon-green mb-2 transition-all duration-300">
                  {countAnimations[index].count}+
                </div>
                <div
                  className={`text-lg font-bold transition-colors duration-300 font-mono ${
                    theme === "dark"
                      ? "text-neon-green group-hover:text-white"
                      : "text-neon-green group-hover:text-black"
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
