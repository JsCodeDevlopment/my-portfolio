"use client";

import { ImageGallery } from "@/components/image-gallery";
import { Loading } from "@/components/loading-projects";
import { ProjectsNotFound } from "@/components/projects-notfound";
import { MarqueeSection } from "@/components/ui/marquee-section";
import { technologies } from "@/constants/tecnologies.const";
import { useProjectsRequest } from "@/hooks/use-projects";
import { useTranslation } from "@/hooks/use-translation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "../../../components/header";
import { useTheme } from "../../../contexts/theme-context";

export default function ProjectPage() {
  const { theme } = useTheme();
  const { repos } = useProjectsRequest();
  const { t } = useTranslation();
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const text = ["JONATAS SILVA-", "FULLSTACK DEVELOPER-"];

  useEffect(() => {
    if (!id || !repos.length) return;
    const filtered = repos
      .filter((repo) => repo.topics.includes("pinned"))
      .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
    const found = filtered.find((repo) => String(repo.id) === String(id));
    setProject(found || null);
    setLoading(false);
  }, [id, repos]);

  if (loading) {
    return <Loading />;
  }

  if (!project) {
    return <ProjectsNotFound />;
  }

  const projectTechs = (project.topics || [])
    .map((topic: string) =>
      technologies.find(
        (tech) =>
          tech.id.toLowerCase() === topic.toLowerCase() ||
          tech.name.toLowerCase() === topic.toLowerCase()
      )
    )
    .filter(Boolean);

  const galleryImages = [
    {
      src:
        `${project.homepage}/gallery/image1.png` ||
        "/placeholder.svg?height=400&width=600&text=Desktop+View",
      alt: "Desktop View",
    },
    {
      src:
        `${project.homepage}/gallery/image2.png` ||
        "/placeholder.svg?height=400&width=600&text=Mobile+View",
      alt: "Mobile View",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <Header />

      <div className="pt-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
          <Link
            href="/#projects"
            className={`flex items-center font-mono gap-2 transition-colors duration-300 ${
              theme === "dark"
                ? "text-gray-400 hover:text-neon-green"
                : "text-gray-600 hover:text-neon-green"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            {t("project", "back")}
          </Link>
        </div>

        <div className="text-center mb-16">
          <h1
            className={`text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 transition-colors duration-300 uppercase ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            {project.name.replace(/-/g, " ") || project.title}
          </h1>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 mb-16">
          <div className="mb-16">
            <h3
              className={`text-2xl font-bold mb-6 uppercase text-neon-green transition-colors duration-300`}
            >
              {t("project", "description")}
            </h3>
            <p
              className={`leading-relaxed text-xl transition-colors duration-300 max-w-3xl font-mono ${
                theme === "dark"
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              {project.description}
            </p>
          </div>

          <div className="flex gap-6 mb-12">
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center font-mono gap-2 text-neon-green hover:text-neon-green-bright transition-colors duration-300 uppercase"
              >
                <ExternalLink className="w-4 h-4" />
                {t("project", "deploy")}
              </a>
            )}
            {project.html_url && (
              <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center font-mono gap-2 text-neon-green hover:text-neon-green-bright transition-colors duration-300 uppercase"
              >
                <Github className="w-4 h-4" />
                {t("project", "repository")}
              </a>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6 uppercase text-neon-green">
              {t("project", "technologies")}
            </h2>
            <div className="flex flex-wrap gap-6 items-center font-mono">
              {projectTechs.map((tech: any) => (
                <div
                  key={tech.id}
                  className={`flex flex-col items-center p-4 rounded-lg transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gray-900 hover:bg-gray-800"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  <tech.image width={48} height={48} alt={tech.name} />
                  <span className="text-sm mt-2 font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 mb-20">
          <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden group">
            <Image
              src={
                `${project.homepage}/preview.webp` ||
                "/placeholder.svg?height=400&width=600&text=Mobile+View"
              }
              alt={project.name || project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 mb-20">
          <h3
            className={`text-2xl font-bold font-mono mb-8 transition-colors duration-300 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            {t("project", "gallery")}
          </h3>
          <ImageGallery images={galleryImages} />
        </div>

        <MarqueeSection
          items={text}
          renderItem={(text) => (
            <div key={text}>
              <text className="text-6xl text-neon-green sm:text-8xl lg:text-[15rem] font-black transition-colors duration-300">
                {text}
              </text>
            </div>
          )}
        />
      </div>
    </div>
  );
}
