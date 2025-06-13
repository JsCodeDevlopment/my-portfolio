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
      className={`py-20 transition-colors duration-300 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <ScrollReveal direction="up" className="mb-16">
          <SectionTitle title={t("education", "title")} />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 font-mono">
          {/* Formação Acadêmica */}
          {education && (
            <EducationCard
              course={education.course}
              institution={education.institution}
              start={education.start}
              index={0}
            />
          )}

          {/* Certificações */}
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
    </section>
  );
}
