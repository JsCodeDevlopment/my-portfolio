"use client";

import { ProjectCard } from "@/components/project-card";
import { useProjectsRequest } from "@/hooks/use-projects";
import { useTranslation } from "@/hooks/use-translation";
import { useTheme } from "../contexts/theme-context";
import { ScrollReveal } from "./scroll-reveal";
import { SectionTitle } from "./section-title";

export function ProjectsSection() {
  const { theme } = useTheme();
  const { repos } = useProjectsRequest();
  const { t } = useTranslation();

  return (
    <section
      id="projects"
      className={`py-32 transition-colors duration-300  ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <ScrollReveal direction="up" className="mb-16">
          <SectionTitle title={t("projects", "title")} />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono">
          {repos
            .filter((repo) => repo.topics.includes("pinned"))
            .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
            .map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
}