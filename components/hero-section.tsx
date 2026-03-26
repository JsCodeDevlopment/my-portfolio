"use client";

import { useTranslation } from "@/hooks/use-translation";
import { ArrowDown } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import Image from "next/image";
import { useTheme } from "../contexts/theme-context";
import { ScrollReveal } from "./scroll-reveal";
import Particles from "./ui/particles";

export function HeroSection() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ clientX, clientY }: any) {
    mouseX.set(clientX);
    mouseY.set(clientY);
  }

  const background = useMotionTemplate`
    radial-gradient(
      800px circle at ${mouseX}px ${mouseY}px,
      rgba(20, 184, 166, 0.07),
      transparent 80%
    )
  `;

  const years = new Date().getFullYear() - 2023;

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-300 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <div
        className={`absolute inset-0 z-0 ${
          theme === "dark"
            ? "bg-[linear-gradient(rgba(20,184,166,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.05)_1px,transparent_1px)]"
            : "bg-[linear-gradient(rgba(20,184,166,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.1)_1px,transparent_1px)]"
        } bg-[size:60px_60px]`}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-100"
        style={{ background }}
      />

      <Particles
        className="absolute inset-0 z-10"
        quantity={80}
        staticity={30}
        ease={50}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-20">
        <div className="flex flex-col items-center text-center">
          <ScrollReveal direction="up" delay={200}>
            <div className="mb-12 relative">
              <div className="relative group">
                <div
                  className={`w-32 h-32 lg:w-40 lg:h-40 rounded-[2.5rem] overflow-hidden border-2 transition-all duration-700 ${
                    theme === "dark"
                      ? "border-white/10 group-hover:border-neon-green/50"
                      : "border-black/10 group-hover:border-black/30"
                  }`}
                >
                  <Image
                    src="/images/jonatas-profile.jpg"
                    alt="Jonatas Silva"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    priority
                  />
                </div>
                <div className="absolute -inset-4 border border-neon-green/10 rounded-[3rem] animate-[spin_20s_linear_infinite] -z-10" />
                <div className="absolute -inset-8 border border-neon-green/5 rounded-[3.5rem] animate-[spin_30s_linear_reverse_infinite] -z-10" />
              </div>
            </div>
          </ScrollReveal>

          <div className="space-y-2 pointer-events-none mb-10">
            <ScrollReveal direction="up" delay={400}>
              <span className="text-neon-green font-mono text-xs uppercase tracking-[0.6em] font-black block mb-4">
                {t("hero", "greeting")}
              </span>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={600}>
              <h1
                className={`text-[12vw] lg:text-[10rem] font-black leading-none tracking-tighter ${theme === "dark" ? "text-white" : "text-black"}`}
              >
                JONATAS{" "}
                <span className="text-neon-green inline-block transition-all duration-700">
                  SILVA
                </span>
              </h1>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={800}>
            <p
              className={`text-lg lg:text-2xl font-mono font-medium max-w-2xl mx-auto tracking-tight transition-colors duration-500 ${
                theme === "dark" ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {t("hero", "description", { years: years.toString() })}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={1000} className="mt-20">
            <button
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className={`group flex flex-col items-center gap-4 transition-all duration-500`}
            >
              <div
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${
                  theme === "dark"
                    ? "border-white/10 group-hover:border-neon-green"
                    : "border-black/10 group-hover:border-black"
                }`}
              >
                <ArrowDown
                  className={`w-5 h-5 transition-all duration-500 ${theme === "dark" ? "text-gray-600 group-hover:text-neon-green" : "text-gray-400 group-hover:text-black"} group-hover:translate-y-1`}
                />
              </div>
              <span
                className={`text-[10px] font-mono font-black uppercase tracking-[0.4em] ${theme === "dark" ? "text-gray-600 group-hover:text-white" : "text-gray-400 group-hover:text-black"}`}
              >
                Explore Projects
              </span>
            </button>
          </ScrollReveal>
        </div>
      </div>

      <div
        className={`absolute top-1/4 -left-20 text-[15vw] font-black pointer-events-none select-none opacity-[0.02] ${theme === "dark" ? "text-white" : "text-black"}`}
      >
        SOFTWARE
      </div>
      <div
        className={`absolute bottom-1/4 -right-20 text-[15vw] font-black pointer-events-none select-none opacity-[0.02] ${theme === "dark" ? "text-white" : "text-black"}`}
      >
        ENGINEER
      </div>
    </section>
  );
}
