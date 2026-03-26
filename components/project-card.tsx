"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { technologies } from "@/constants/tecnologies.const";
import { useTheme } from "@/contexts/theme-context";
import { useTranslation } from "@/hooks/use-translation";
import { Repos } from "@/hooks/use-projects";
import { getImageUrl } from "@/utils/image-utils";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: Repos;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`
    radial-gradient(
      350px circle at ${mouseX}px ${mouseY}px,
      rgba(20, 184, 166, 0.12),
      transparent 80%
    )
  `;

  const previewImageUrl = getImageUrl(project, "preview.webp");

  const formattedDate = new Date(project.created_at).toLocaleDateString(
    "pt-BR",
    {
      month: "short",
      year: "numeric",
    },
  );

  const projectTechs = (project.topics || [])
    .filter((topic) => topic !== "pinned")
    .map((topic: string) =>
      technologies.find(
        (tech) =>
          tech.id.toLowerCase() === topic.toLowerCase() ||
          tech.name.toLowerCase() === topic.toLowerCase(),
      ),
    )
    .filter(Boolean)
    .slice(0, 6);

  const remainingTechs =
    project.topics.filter((t: string) => t !== "pinned").length - 6;

  return (
    <TooltipProvider>
      <Link href={`/projects/${project.id}`}>
        <motion.div
          onMouseMove={handleMouseMove}
          data-cursor="project"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          className={`group relative rounded-[2.5rem] overflow-hidden transition-all duration-700 cursor-pointer border ${
            theme === "dark"
              ? "bg-[#0c0c0d]/80 border-white/[0.05] hover:border-neon-green/30"
              : "bg-white border-black/[0.05] hover:border-black/[0.1] shadow-xl hover:shadow-2xl"
          }`}
        >
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
            style={{ background }}
          />

          <div className="aspect-[16/10] relative overflow-hidden m-4 rounded-[1.8rem]">
            <Image
              src={previewImageUrl}
              alt={project.name}
              fill
              className="object-cover transition-all duration-1000 group-hover:scale-105"
            />

            <div
              className={`absolute top-4 right-4 z-20 px-4 py-1.5 rounded-full backdrop-blur-md text-[10px] font-mono font-black uppercase tracking-widest transition-all duration-500 ${
                theme === "dark"
                  ? "bg-black/60 text-gray-400 border border-white/10 group-hover:text-neon-green group-hover:border-neon-green/40"
                  : "bg-white/60 text-gray-500 border border-black/10 group-hover:text-black group-hover:border-black/20"
              }`}
            >
              {formattedDate}
            </div>
          </div>

          <div className="px-8 pb-8 pt-2 relative z-10">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3
                className={`text-2xl lg:text-3xl font-black group-hover:text-neon-green transition-all duration-500 uppercase tracking-tighter ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {project.name.replace(/-/g, " ")}
              </h3>
            </div>

            {project.description && (
              <p
                className={`text-sm leading-relaxed mb-8 transition-colors duration-500 line-clamp-2 ${
                  theme === "dark"
                    ? "text-gray-400 group-hover:text-gray-200"
                    : "text-gray-600 group-hover:text-gray-900"
                }`}
              >
                {project.description}
              </p>
            )}

            <div
              className={`w-full h-px mb-6 ${theme === "dark" ? "bg-white/[0.05]" : "bg-black/[0.05]"}`}
            />

            <div className="flex items-center justify-between">
              {projectTechs.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {projectTechs.map((tech: any) => (
                    <Tooltip key={tech.id} delayDuration={200}>
                      <TooltipTrigger asChild>
                        <div
                          className={`relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-500 ${
                            theme === "dark"
                              ? "bg-white/[0.03] border border-white/[0.05] group-hover:border-neon-green/30 group-hover:bg-neon-green/10"
                              : "bg-black/[0.03] border border-black/[0.05] group-hover:border-black/10"
                          }`}
                        >
                          <tech.image
                            width={20}
                            height={20}
                            alt={tech.name}
                            className="transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className={`${
                          theme === "dark"
                            ? "bg-[#0c0c0d] border-white/10 text-white"
                            : "bg-white border-black/10 text-black"
                        } font-mono text-[10px] uppercase tracking-widest`}
                      >
                        <p>{tech.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                  {remainingTechs > 0 && (
                    <div
                      className={`flex items-center justify-center w-9 h-9 rounded-xl text-[10px] font-mono font-black border transition-all duration-500 ${
                        theme === "dark"
                          ? "bg-white/[0.03] text-gray-500 border-white/[0.05]"
                          : "bg-black/[0.03] text-gray-400 border-black/[0.05]"
                      }`}
                    >
                      +{remainingTechs}
                    </div>
                  )}
                </div>
              )}

              <div
                className={`text-[10px] font-mono font-black uppercase tracking-[0.2em] transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 ${
                  theme === "dark" ? "text-neon-green" : "text-black"
                }`}
              >
                {t("projects", "details")} →
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </TooltipProvider>
  );
}
