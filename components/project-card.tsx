import { ScrollReveal } from "@/components/scroll-reveal";
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

  return (
    <ScrollReveal key={index} direction="up" delay={index * 200} duration={600}>
      <Link href={`/projects/${project.id}`}>
        <div
          className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 cursor-pointer ${
            theme === "dark"
              ? "bg-gray-900 hover:bg-gray-800"
              : "bg-gray-300 hover:bg-gray-500"
          }`}
        >
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={previewImageUrl}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          <div className="p-6">
            <h3
              className={`text-xl font-bold group-hover:text-neon-green transition-colors duration-300 uppercase ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              {project.name.replace(/-/g, " ")}
            </h3>
          </div>

          <div className="absolute inset-0 bg-neon-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>
    </ScrollReveal>
  );
}
