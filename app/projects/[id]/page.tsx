"use client";

import { ImageGallery } from "@/components/image-gallery";
import { Loading } from "@/components/loading-projects";
import { ProjectsNotFound } from "@/components/projects-notfound";
import { ScrollReveal } from "@/components/scroll-reveal";
import { MarqueeSection } from "@/components/ui/marquee-section";
import { technologies } from "@/constants/tecnologies.const";
import { useProjectsRequest } from "@/hooks/use-projects";
import { useTranslation } from "@/hooks/use-translation";
import { ArrowLeft, Calendar, Code, ExternalLink, Github } from "lucide-react";
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <Header />

      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal direction="up">
            <Link
              href="/#projects"
              className={`group inline-flex items-center font-mono gap-3 mb-12 p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "text-gray-400 hover:text-neon-green bg-gray-900/40 hover:bg-gray-800/60 border border-gray-800/30 hover:border-neon-green/40"
                  : "text-gray-600 hover:text-neon-green bg-gray-100/60 hover:bg-gray-200/80 border border-gray-300/30 hover:border-neon-green/40"
              }`}
            >
              <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>{t("project", "back")}</span>
            </Link>
          </ScrollReveal>

          <div className="text-center mb-20">
            <ScrollReveal direction="up" delay={100}>
              <div
                className={`inline-block mb-6 px-4 py-2 rounded-full text-sm font-semibold font-mono ${
                  theme === "dark"
                    ? "bg-neon-green/10 text-neon-green border border-neon-green/20"
                    : "bg-neon-green/10 text-neon-green border border-neon-green/30"
                }`}
              >
                {formatDate(project.created_at)}
              </div>
              <h1
                className={`text-5xl sm:text-6xl lg:text-8xl font-black mb-6 transition-colors duration-300 uppercase tracking-tight ${
                  theme === "dark"
                    ? "text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text"
                    : "text-black"
                }`}
                style={{
                  background:
                    theme === "dark"
                      ? "linear-gradient(135deg, #ffffff 0%, #14b8a6 100%)"
                      : undefined,
                  WebkitBackgroundClip: theme === "dark" ? "text" : undefined,
                  WebkitTextFillColor:
                    theme === "dark" ? "transparent" : undefined,
                }}
              >
                {project.name.replace(/-/g, " ") || project.title}
              </h1>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={200}>
            <div className="flex flex-wrap gap-4 justify-center mb-16">
              {project.homepage && (
                <a
                  href={project.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative inline-flex items-center font-mono gap-3 px-6 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 overflow-hidden ${
                    theme === "dark"
                      ? "bg-neon-green text-black hover:bg-neon-green-bright hover:shadow-lg hover:shadow-neon-green/50"
                      : "bg-neon-green text-black hover:bg-neon-green-bright hover:shadow-lg hover:shadow-neon-green/50"
                  }`}
                >
                  <ExternalLink className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  <span>{t("project", "deploy")}</span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </a>
              )}
              {project.html_url && (
                <a
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative inline-flex items-center font-mono gap-3 px-6 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 overflow-hidden border-2 ${
                    theme === "dark"
                      ? "border-neon-green/40 text-neon-green hover:border-neon-green hover:bg-neon-green/10"
                      : "border-neon-green/40 text-neon-green hover:border-neon-green hover:bg-neon-green/10"
                  }`}
                >
                  <Github className="w-5 h-5" />
                  <span>{t("project", "repository")}</span>
                </a>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={300}>
            <div className="mb-20">
              <div
                className={`relative aspect-video rounded-3xl overflow-hidden group ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-gray-900/40 via-gray-800/40 to-gray-900/40 backdrop-blur-xl border border-gray-800/30"
                    : "bg-gradient-to-br from-white/40 via-gray-50/40 to-white/40 backdrop-blur-xl border border-gray-300/30"
                } shadow-2xl`}
                style={{
                  clipPath:
                    "polygon(0% 0%, 100% 0%, 100% 98%, 98% 100%, 2% 100%, 0% 98%)",
                }}
              >
                <Image
                  src={
                    `${project.homepage}/preview.webp` ||
                    "/placeholder.svg?height=400&width=600&text=Mobile+View"
                  }
                  alt={project.name || project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div
                  className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100 opacity-0 ${
                    theme === "dark" ? "bg-neon-green/20" : "bg-neon-green/15"
                  }`}
                />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={350}>
            <div className="text-center mb-12">
              <h2
                className={`text-4xl sm:text-5xl font-black mb-4 uppercase tracking-tight transition-colors duration-300 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
                style={{
                  background:
                    theme === "dark"
                      ? "linear-gradient(135deg, #ffffff 0%, #14b8a6 100%)"
                      : "linear-gradient(135deg, #000000 0%, #14b8a6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Detalhes do Projeto
              </h2>
              <div className="w-24 h-1 mx-auto bg-neon-green rounded-full"></div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <ScrollReveal direction="left" delay={400}>
              <div
                className={`lg:col-span-2 group relative rounded-3xl p-10 transition-all duration-700 hover:scale-[1.02] ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-gray-900/50 via-gray-800/50 to-gray-900/50 backdrop-blur-xl border-2 border-gray-800/40 hover:border-neon-green/50"
                    : "bg-gradient-to-br from-white/50 via-gray-50/50 to-white/50 backdrop-blur-xl border-2 border-gray-300/40 hover:border-neon-green/50"
                } shadow-2xl hover:shadow-neon-green/20 overflow-hidden`}
                style={{
                  clipPath:
                    "polygon(0% 0%, 100% 0%, 100% 98%, 98% 100%, 2% 100%, 0% 98%)",
                }}
              >
                <div
                  className={`absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100 opacity-40 ${
                    theme === "dark" ? "bg-neon-green/25" : "bg-neon-green/20"
                  }`}
                />
                <div
                  className={`absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100 opacity-30 ${
                    theme === "dark" ? "bg-neon-green/20" : "bg-neon-green/15"
                  }`}
                />

                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div
                    className={`p-3 rounded-xl ${
                      theme === "dark"
                        ? "bg-neon-green/20 border border-neon-green/30"
                        : "bg-neon-green/15 border border-neon-green/30"
                    }`}
                  >
                    <Code className="w-6 h-6 text-neon-green" />
                  </div>
                  <h3
                    className={`text-3xl font-black transition-all duration-500 uppercase tracking-tight ${
                      theme === "dark"
                        ? "text-white group-hover:text-neon-green"
                        : "text-black group-hover:text-neon-green"
                    }`}
                  >
                    {t("project", "description")}
                  </h3>
                </div>

                <div
                  className={`h-px mb-8 relative z-10 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-transparent via-gray-700 to-transparent"
                      : "bg-gradient-to-r from-transparent via-gray-300 to-transparent"
                  }`}
                />

                <p
                  className={`relative z-10 leading-relaxed text-xl transition-colors duration-300 font-mono ${
                    theme === "dark"
                      ? "text-gray-300 group-hover:text-gray-100"
                      : "text-gray-700 group-hover:text-gray-900"
                  }`}
                >
                  {project.description}
                </p>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl overflow-hidden">
                  <div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      border: "2px solid rgba(20, 184, 166, 0.3)",
                      filter: "blur(8px)",
                      clipPath:
                        "polygon(0% 0%, 100% 0%, 100% 98%, 98% 100%, 2% 100%, 0% 98%)",
                    }}
                  />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={400}>
              <div
                className={`group relative rounded-3xl p-10 transition-all duration-700 hover:scale-[1.02] ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-gray-900/50 via-gray-800/50 to-gray-900/50 backdrop-blur-xl border-2 border-gray-800/40 hover:border-neon-green/50"
                    : "bg-gradient-to-br from-white/50 via-gray-50/50 to-white/50 backdrop-blur-xl border-2 border-gray-300/40 hover:border-neon-green/50"
                } shadow-2xl hover:shadow-neon-green/20 overflow-hidden`}
                style={{
                  clipPath:
                    "polygon(0% 0%, 100% 0%, 100% 98%, 98% 100%, 2% 100%, 0% 98%)",
                }}
              >
                <div
                  className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100 opacity-40 ${
                    theme === "dark" ? "bg-neon-green/25" : "bg-neon-green/20"
                  }`}
                />
                <div
                  className={`absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100 opacity-30 ${
                    theme === "dark" ? "bg-neon-green/20" : "bg-neon-green/15"
                  }`}
                />

                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div
                    className={`p-3 rounded-xl ${
                      theme === "dark"
                        ? "bg-neon-green/20 border border-neon-green/30"
                        : "bg-neon-green/15 border border-neon-green/30"
                    }`}
                  >
                    <Calendar className="w-6 h-6 text-neon-green" />
                  </div>
                  <h3
                    className={`text-2xl font-black transition-all duration-500 uppercase tracking-tight ${
                      theme === "dark"
                        ? "text-white group-hover:text-neon-green"
                        : "text-black group-hover:text-neon-green"
                    }`}
                  >
                    Informações
                  </h3>
                </div>

                <div
                  className={`h-px mb-8 relative z-10 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-transparent via-gray-700 to-transparent"
                      : "bg-gradient-to-r from-transparent via-gray-300 to-transparent"
                  }`}
                />

                <div className="relative z-10 space-y-6">
                  <div
                    className={`group/item flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                      theme === "dark"
                        ? "bg-gray-800/40 hover:bg-gray-800/60 border border-gray-700/30 hover:border-neon-green/40"
                        : "bg-gray-100/60 hover:bg-gray-100/80 border border-gray-300/30 hover:border-neon-green/40"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-neon-green/10 group-hover/item:bg-neon-green/20"
                          : "bg-neon-green/10 group-hover/item:bg-neon-green/20"
                      }`}
                    >
                      <Calendar
                        className={`w-6 h-6 transition-colors duration-300 ${
                          theme === "dark"
                            ? "text-neon-green group-hover/item:text-neon-green-bright"
                            : "text-neon-green group-hover/item:text-neon-green-bright"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <span
                        className={`block font-mono text-base font-semibold transition-colors duration-300 ${
                          theme === "dark"
                            ? "text-gray-200 group-hover/item:text-white"
                            : "text-gray-800 group-hover/item:text-black"
                        }`}
                      >
                        {formatDate(project.created_at)}
                      </span>
                      <span
                        className={`block font-mono text-xs mt-1 transition-colors duration-300 ${
                          theme === "dark"
                            ? "text-gray-400 group-hover/item:text-gray-300"
                            : "text-gray-500 group-hover/item:text-gray-600"
                        }`}
                      >
                        Data de criação
                      </span>
                    </div>
                  </div>

                  <div
                    className={`group/item flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                      theme === "dark"
                        ? "bg-gray-800/40 hover:bg-gray-800/60 border border-gray-700/30 hover:border-neon-green/40"
                        : "bg-gray-100/60 hover:bg-gray-100/80 border border-gray-300/30 hover:border-neon-green/40"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-neon-green/10 group-hover/item:bg-neon-green/20"
                          : "bg-neon-green/10 group-hover/item:bg-neon-green/20"
                      }`}
                    >
                      <Code
                        className={`w-6 h-6 transition-colors duration-300 ${
                          theme === "dark"
                            ? "text-neon-green group-hover/item:text-neon-green-bright"
                            : "text-neon-green group-hover/item:text-neon-green-bright"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <span
                        className={`block font-mono text-base font-semibold transition-colors duration-300 ${
                          theme === "dark"
                            ? "text-gray-200 group-hover/item:text-white"
                            : "text-gray-800 group-hover/item:text-black"
                        }`}
                      >
                        {project.language || "N/A"}
                      </span>
                      <span
                        className={`block font-mono text-xs mt-1 transition-colors duration-300 ${
                          theme === "dark"
                            ? "text-gray-400 group-hover/item:text-gray-300"
                            : "text-gray-500 group-hover/item:text-gray-600"
                        }`}
                      >
                        Linguagem principal
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl overflow-hidden">
                  <div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      border: "2px solid rgba(20, 184, 166, 0.3)",
                      filter: "blur(8px)",
                      clipPath:
                        "polygon(0% 0%, 100% 0%, 100% 98%, 98% 100%, 2% 100%, 0% 98%)",
                    }}
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={500}>
            <div className="mb-20">
              <h2
                className={`text-3xl font-black mb-8 uppercase tracking-tight transition-colors duration-300 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {t("project", "technologies")}
              </h2>
              <div
                className={`group relative rounded-3xl p-8 transition-all duration-700 ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-gray-900/40 via-gray-800/40 to-gray-900/40 backdrop-blur-xl border border-gray-800/30 hover:border-neon-green/20"
                    : "bg-gradient-to-br from-white/40 via-gray-50/40 to-white/40 backdrop-blur-xl border border-gray-300/30 hover:border-neon-green/40"
                } shadow-2xl hover:shadow-neon-green/10 overflow-hidden`}
                style={{
                  clipPath:
                    "polygon(0% 0%, 100% 0%, 100% 98%, 98% 100%, 2% 100%, 0% 98%)",
                }}
              >
                <div
                  className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100 opacity-30 ${
                    theme === "dark" ? "bg-neon-green/20" : "bg-neon-green/15"
                  }`}
                />
                <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {projectTechs.map((tech: any) => (
                    <div
                      key={tech.id}
                      className={`group/tech flex flex-col items-center p-4 rounded-xl transition-all duration-300 hover:scale-110 ${
                        theme === "dark"
                          ? "bg-gray-800/40 hover:bg-gray-800/60 border border-gray-700/30 hover:border-neon-green/40"
                          : "bg-gray-100/60 hover:bg-gray-100/80 border border-gray-300/30 hover:border-neon-green/40"
                      }`}
                    >
                      <div className="mb-3 transition-transform duration-300 group-hover/tech:scale-125">
                        <tech.image width={40} height={40} alt={tech.name} />
                      </div>
                      <span
                        className={`text-xs font-medium font-mono text-center transition-colors duration-300 ${
                          theme === "dark"
                            ? "text-gray-300 group-hover/tech:text-neon-green"
                            : "text-gray-700 group-hover/tech:text-neon-green"
                        }`}
                      >
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={600}>
            <div className="mb-20">
              <h3
                className={`text-3xl font-black mb-8 uppercase tracking-tight transition-colors duration-300 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {t("project", "gallery")}
              </h3>
              <ImageGallery images={galleryImages} />
            </div>
          </ScrollReveal>
        </div>

        <MarqueeSection
          items={text}
          renderItem={(text) => (
            <div key={text}>
              <text className="text-6xl text-neon-green sm:text-8xl lg:text-[15rem] font-black transition-colors duration-300 uppercase">
                {text}
              </text>
            </div>
          )}
        />
      </div>
    </div>
  );
}
