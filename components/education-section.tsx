"use client";

import { CertificateCard } from "@/components/certificate-card";
import { EducationCard } from "@/components/education-card";
import { useExperienceRequest } from "@/hooks/use-experience";
import { useTranslation } from "@/hooks/use-translation";
import { useTheme } from "../contexts/theme-context";
import { ScrollReveal } from "./scroll-reveal";
import { SectionTitle } from "./section-title";

export function EducationSection() {
  const { theme } = useTheme();
  const { t, language } = useTranslation();
  const { education, certificates } = useExperienceRequest(
    language === "en" ? "resume" : "curriculo"
  );

  return (
    <section
      id="education"
      className={`py-40 transition-colors duration-300 relative ${
        theme === "dark" ? "bg-black" : "bg-white"
      } overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" className="mb-32">
          <SectionTitle 
            title={t("education", "title")} 
            index="05" 
            subtitle={t("education", "section_subtitle")}
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Main Education */}
          {education && (
             <div className="md:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-8 mb-10">
                   <h3 className={`text-sm font-mono font-black uppercase tracking-[0.4em] ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}>
                      {t("education", "formation")}
                   </h3>
                   <div className={`flex-1 h-px ${theme === "dark" ? "bg-white/[0.05]" : "bg-black/[0.05]"}`} />
                </div>
                <EducationCard
                  course={education.course}
                  institution={education.institution}
                  start={education.start}
                  index={0}
                />
             </div>
          )}

          {/* Certificates */}
          <div className="md:col-span-2">
             <div className="flex items-center gap-8 mb-10">
                <h3 className={`text-sm font-mono font-black uppercase tracking-[0.4em] ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}>
                   {t("education", "certificates")}
                </h3>
                <div className={`flex-1 h-px ${theme === "dark" ? "bg-white/[0.05]" : "bg-black/[0.05]"}`} />
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {certificates &&
                  certificates.map((cert, idx) => (
                    <CertificateCard
                      key={cert.title + cert.institution + idx}
                      title={cert.title}
                      institution={cert.institution}
                      description={cert.description}
                      index={idx + 1}
                    />
                  ))}
             </div>
          </div>
        </div>
      </div>
      
      {/* Extremely faint atmospheric glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#14b8a6_0%,_transparent_70%)] blur-[100px]" />
      </div>
    </section>
  );
}
