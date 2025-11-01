import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { technologies } from "@/constants/tecnologies.const";
import { useTheme } from "@/contexts/theme-context";
import { Repos } from "@/hooks/use-projects";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: Repos;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { theme } = useTheme();

  const previewImageUrl = project.homepage
    ? `${project.homepage}/preview.webp`
    : "/placeholder.svg?height=400&width=600";

  const formattedDate = new Date(project.created_at).toLocaleDateString(
    "pt-BR",
    {
      month: "short",
      year: "numeric",
    }
  );

  const projectTechs = (project.topics || [])
    .filter((topic) => topic !== "pinned")
    .map((topic: string) =>
      technologies.find(
        (tech) =>
          tech.id.toLowerCase() === topic.toLowerCase() ||
          tech.name.toLowerCase() === topic.toLowerCase()
      )
    )
    .filter(Boolean)
    .slice(0, 6);

  const remainingTechs =
    project.topics.filter((t: string) => t !== "pinned").length - 6;

  return (
    <TooltipProvider>
      <Link href={`/projects/${project.id}`}>
          <div
            data-cursor="project"
            className={`group relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] cursor-pointer ${
              theme === "dark"
                ? "bg-gradient-to-br from-gray-900/80 to-gray-800/80 hover:from-gray-800/90 hover:to-gray-700/90 border border-gray-800/50 hover:border-neon-green/30"
                : "bg-gradient-to-br from-gray-100/80 to-gray-200/80 hover:from-gray-200/90 hover:to-gray-300/90 border border-gray-300/50 hover:border-neon-green/50"
            } shadow-xl hover:shadow-2xl hover:shadow-neon-green/20`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neon-green/0 via-neon-green/0 to-neon-green/0 group-hover:from-neon-green/10 group-hover:via-neon-green/5 group-hover:to-neon-green/10 transition-all duration-500 opacity-0 group-hover:opacity-100 blur-xl"></div>

            <div className="aspect-video relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 group-hover:from-black/80 transition-all duration-500"></div>
              <Image
                src={previewImageUrl}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div
                className={`absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full backdrop-blur-sm text-xs font-semibold transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-black/40 text-gray-300 border border-gray-700/50 group-hover:bg-neon-green/20 group-hover:border-neon-green/50 group-hover:text-neon-green"
                    : "bg-white/40 text-gray-700 border border-gray-400/50 group-hover:bg-neon-green/20 group-hover:border-neon-green/50 group-hover:text-neon-green"
                }`}
              >
                {formattedDate}
              </div>
            </div>

            <div className="p-6 relative z-10">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3
                  className={`text-xl md:text-2xl font-black group-hover:text-neon-green transition-all duration-300 uppercase tracking-tight flex-1 ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                  style={{
                    textShadow:
                      theme === "dark"
                        ? "0 0 20px rgba(20, 184, 166, 0)"
                        : "0 0 10px rgba(20, 184, 166, 0)",
                  }}
                >
                  {project.name.replace(/-/g, " ")}
                </h3>
              </div>

              {project.description && (
                <p
                  className={`text-sm leading-relaxed line-clamp-2 mt-2 transition-colors duration-300 ${
                    theme === "dark"
                      ? "text-gray-400 group-hover:text-gray-300"
                      : "text-gray-600 group-hover:text-gray-700"
                  }`}
                >
                  {project.description}
                </p>
              )}

              {projectTechs.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  {projectTechs.map((tech: any) => (
                    <Tooltip key={tech.id} delayDuration={200}>
                      <TooltipTrigger asChild>
                        <div
                          className={`relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                            theme === "dark"
                              ? "bg-gray-800/60 border border-gray-700/50 group-hover:bg-neon-green/20 group-hover:border-neon-green/50"
                              : "bg-gray-200/60 border border-gray-300/50 group-hover:bg-neon-green/20 group-hover:border-neon-green/50"
                          }`}
                        >
                          <tech.image
                            width={24}
                            height={24}
                            alt={tech.name}
                            className="transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className={`${
                          theme === "dark"
                            ? "bg-gray-900 border-gray-700 text-white"
                            : "bg-gray-100 border-gray-300 text-black"
                        }`}
                      >
                        <p className="font-semibold">{tech.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                  {remainingTechs > 0 && (
                    <Tooltip delayDuration={200}>
                      <TooltipTrigger asChild>
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-lg text-xs font-semibold transition-all duration-300 ${
                            theme === "dark"
                              ? "bg-gray-800/60 text-gray-400 border border-gray-700/50"
                              : "bg-gray-200/60 text-gray-500 border border-gray-300/50"
                          }`}
                        >
                          +{remainingTechs}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className={`${
                          theme === "dark"
                            ? "bg-gray-900 border-gray-700 text-white"
                            : "bg-gray-100 border-gray-300 text-black"
                        }`}
                      >
                        <p className="font-semibold">
                          Mais {remainingTechs} tecnologias
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              )}
            </div>

            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 rounded-3xl border-2 border-neon-green/30 blur-sm"></div>
            </div>
          </div>
      </Link>
    </TooltipProvider>
  );
}
