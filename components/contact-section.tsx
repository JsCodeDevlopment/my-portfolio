"use client";

import { MarqueeSection } from "@/components/ui/marquee-section";
import { useExperienceRequest } from "@/hooks/use-experience";
import { useTranslation } from "@/hooks/use-translation";
import { Github, Linkedin, Mail, Phone, ArrowUpRight } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../contexts/theme-context";
import { ContactForm } from "./contact-form";
import { ScrollReveal } from "./scroll-reveal";
import { SectionTitle } from "./section-title";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";

export function ContactSection() {
  const { theme } = useTheme();
  const { t, language } = useTranslation();
  const { contactInfo } = useExperienceRequest(
    language === "en" ? "resume" : "curriculo"
  );

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

  const marqueeItems = [
    "Jonatas Silva",
    "•",
    "Software Engineer",
    "•",
    "Full Stack Developer",
    "•",
    "UI/UX Enthusiast",
    "•",
  ];

  if (!contactInfo) return null;

  return (
    <section
      id="contact"
      onMouseMove={handleMouseMove}
      className={`pt-40 pb-20 transition-colors duration-300 relative overflow-hidden ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      {/* Dynamic Background Glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-100"
        style={{ background }}
      />

      <ToastContainer position="top-right" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" className="mb-24">
          <SectionTitle title={t("contact", "title")} />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Contact Info - Left Side (5 cols) */}
          <div className="lg:col-span-5 space-y-16">
            <ScrollReveal direction="up" delay={200}>
              <div className="space-y-6">
                 <span className="text-neon-green font-mono text-xs uppercase tracking-[0.6em] font-black">
                    Let's Talk
                 </span>
                 <h3 className={`text-4xl lg:text-6xl font-black leading-tight ${theme === "dark" ? "text-white" : "text-black"}`}>
                    {t("contact", "get_in_touch") || "Get in Touch"}
                 </h3>
                 <p className={`text-lg leading-relaxed max-w-md ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    {t("contact", "description")}
                 </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={400}>
              <div className="flex flex-col gap-8">
                {/* Phone & Email as large minimalist links */}
                <div className="space-y-4">
                  <a
                    href={`mailto:${contactInfo.email.value}`}
                    className="group flex flex-col gap-1 w-fit"
                  >
                    <span className={`text-[10px] font-mono uppercase tracking-[0.3em] font-black ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}>
                       Email Address
                    </span>
                    <div className="flex items-center gap-3">
                       <span className={`text-xl lg:text-2xl font-bold transition-all duration-500 group-hover:text-neon-green ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}>
                          {contactInfo.email.value}
                       </span>
                       <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 text-neon-green" />
                    </div>
                  </a>

                  <a
                    href={`tel:${contactInfo.phone.value.replace(/\D/g, "")}`}
                    className="group flex flex-col gap-1 w-fit"
                  >
                    <span className={`text-[10px] font-mono uppercase tracking-[0.3em] font-black ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}>
                       Direct Call
                    </span>
                    <div className="flex items-center gap-3">
                       <span className={`text-xl lg:text-2xl font-bold transition-all duration-500 group-hover:text-neon-green ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}>
                          {contactInfo.phone.value}
                       </span>
                       <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 text-neon-green" />
                    </div>
                  </a>
                </div>

                {/* Social Grid */}
                <div className="flex items-center gap-6 pt-8 border-t border-white/[0.05]">
                  {contactInfo.social.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative p-4 rounded-2xl transition-all duration-500 border ${
                        theme === "dark"
                          ? "bg-white/[0.02] border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.05]"
                          : "bg-black/[0.02] border-black/[0.05] hover:border-black/[0.1] hover:bg-white"
                      }`}
                    >
                      {social.label.toLowerCase().includes("github") ? (
                        <Github className={`w-6 h-6 transition-colors duration-500 ${theme === "dark" ? "text-gray-500 group-hover:text-white" : "text-gray-400 group-hover:text-black"}`} />
                      ) : (
                        <Linkedin className={`w-6 h-6 transition-colors duration-500 ${theme === "dark" ? "text-gray-500 group-hover:text-white" : "text-gray-400 group-hover:text-black"}`} />
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact Form - Right Side (7 cols) */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="up" delay={600}>
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Giant Statement Marquee (Improved) */}
      <div className="mt-48 pb-24 group">
        <MarqueeSection
          items={marqueeItems}
          renderItem={(text, index) => (
            <div key={`${text}-${index}`} className="px-10">
              <span 
                className={`text-8xl lg:text-[18rem] font-black uppercase transition-all duration-700 select-none ${
                   index % 2 === 0 
                    ? "text-neon-green drop-shadow-[0_0_30px_rgba(20,184,166,0.2)]" 
                    : theme === "dark" 
                      ? "text-transparent stroke-white/10 [webkit-text-stroke:2px_rgba(255,255,255,0.05)]" 
                      : "text-transparent stroke-black/10 [webkit-text-stroke:2px_rgba(0,0,0,0.05)]"
                }`}
              >
                {text}
              </span>
            </div>
          )}
        />
      </div>

      <div className="mt-20 py-10 border-t border-white/[0.05]">
         <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className={`text-[10px] font-mono uppercase tracking-[0.2em] ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
               © {new Date().getFullYear()} Jonatas Silva. All rights reserved.
            </p>
            <div className={`text-[10px] font-mono uppercase tracking-[0.2em] ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
               Brazil • GMT -3
            </div>
         </div>
      </div>
    </section>
  );
}
