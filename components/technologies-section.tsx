"use client";

import { useTranslation } from "@/hooks/use-translation";
import { technologies } from "../constants/tecnologies.const";
import { useTheme } from "../contexts/theme-context";
import { ScrollReveal } from "./scroll-reveal";
import { SectionTitle } from "./section-title";

export function TechnologiesSection() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  // Group technologies by category
  const techCategories = {
    frontend: technologies.filter((tech) =>
      [
        "react",
        "nextjs",
        "typescript",
        "javascript",
        "html",
        "css",
        "sass",
        "tailwind",
        "styled-components",
        "shadcn-ui",
      ].includes(tech.id)
    ),
    backend: technologies.filter((tech) =>
      [
        "nodejs",
        "express",
        "nestjs",
        "golang",
        "mongodb",
        "mongoose",
        "postgresql",
        "mysql",
        "redis",
        "bullmq",
        "jwt",
        "prisma",
        "typeorm",
        "swagger",
        "rabbitmq",
      ].includes(tech.id)
    ),
    tools: technologies.filter((tech) =>
      ["git", "docker", "jest", "zod"].includes(tech.id)
    ),
  };

  return (
    <section
      id="technologies"
      className={`py-32 transition-colors duration-300 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <ScrollReveal direction="up" className="mb-16">
          <SectionTitle title={t("technologies", "title")} />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 font-mono">
          {/* Frontend Technologies */}
          <ScrollReveal direction="up" delay={200}>
            <div className="group">
              <h3
                className={`text-2xl font-bold mb-6 group-hover:text-neon-green transition-colors duration-300 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {t("technologies", "frontend")}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {techCategories.frontend.map((tech) => (
                  <div
                    key={tech.id}
                    className={`group/tech p-4 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer ${
                      theme === "dark"
                        ? "bg-gray-900 hover:bg-gray-800"
                        : "bg-gray-300 hover:bg-gray-500"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 relative">
                        <tech.image width={32} height={32} />
                      </div>
                      <span
                        className={`text-sm font-medium transition-colors duration-300 ${
                          theme === "dark"
                            ? "text-gray-300 group-hover/tech:text-white"
                            : "text-gray-700 group-hover/tech:text-black"
                        }`}
                      >
                        {tech.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Backend Technologies */}
          <ScrollReveal direction="up" delay={400}>
            <div className="group">
              <h3
                className={`text-2xl font-bold mb-6 group-hover:text-neon-green transition-colors duration-300 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {t("technologies", "backend")}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {techCategories.backend.map((tech) => (
                  <div
                    key={tech.id}
                    className={`group/tech p-4 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer ${
                      theme === "dark"
                        ? "bg-gray-900 hover:bg-gray-800"
                        : "bg-gray-300 hover:bg-gray-500"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 relative">
                        <tech.image width={32} height={32} />
                      </div>
                      <span
                        className={`text-sm font-medium transition-colors duration-300 ${
                          theme === "dark"
                            ? "text-gray-300 group-hover/tech:text-white"
                            : "text-gray-700 group-hover/tech:text-black"
                        }`}
                      >
                        {tech.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Tools */}
          <ScrollReveal direction="up" delay={600}>
            <div className="group">
              <h3
                className={`text-2xl font-bold mb-6 group-hover:text-neon-green transition-colors duration-300 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {t("technologies", "tools")}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {techCategories.tools.map((tech) => (
                  <div
                    key={tech.id}
                    className={`group/tech p-4 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer ${
                      theme === "dark"
                        ? "bg-gray-900 hover:bg-gray-800"
                        : "bg-gray-300 hover:bg-gray-500"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 relative">
                        <tech.image width={32} height={32} />
                      </div>
                      <span
                        className={`text-sm font-medium transition-colors duration-300 ${
                          theme === "dark"
                            ? "text-gray-300 group-hover/tech:text-white"
                            : "text-gray-700 group-hover/tech:text-black"
                        }`}
                      >
                        {tech.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
