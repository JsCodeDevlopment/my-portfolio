"use client";

import { MouseFollower } from "@/components/mouse-follower";
import { MarqueeSection } from "@/components/ui/marquee-section";
import { technologies } from "@/constants/tecnologies.const";
import { AboutSection } from "../components/about-section";
import { ContactSection } from "../components/contact-section";
import { EducationSection } from "../components/education-section";
import { ExperienceSection } from "../components/experience-section";
import { Header } from "../components/header";
import { HeroSection } from "../components/hero-section";
import { ProjectsSection } from "../components/projects-section";
import { TechnologiesSection } from "../components/technologies-section";
import { useTheme } from "../contexts/theme-context";

export default function Portfolio() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-black" : "bg-white"
      } transition-colors duration-300`}
    >
      <MouseFollower />
      <Header />
      <main>
        <HeroSection />
        <MarqueeSection
          items={technologies}
          renderItem={(technology) => (
            <div key={technology.id}>
              <technology.image width={50} height={50} />
            </div>
          )}
        />
        <AboutSection />
        <TechnologiesSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>
    </div>
  );
}
