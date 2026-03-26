"use client";

import { ImageGallery } from "@/components/image-gallery";
import { Loading } from "@/components/loading-projects";
import { ProjectsNotFound } from "@/components/projects-notfound";
import { ScrollReveal } from "@/components/scroll-reveal";
import { MarqueeSection } from "@/components/ui/marquee-section";
import { technologies } from "@/constants/tecnologies.const";
import { useProjectsRequest } from "@/hooks/use-projects";
import { useTranslation } from "@/hooks/use-translation";
import { getGalleryImages, getImageUrl } from "@/utils/image-utils";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
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
  const [galleryImages, setGalleryImages] = useState<
    { src: string; alt: string }[]
  >([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`
    radial-gradient(
      800px circle at ${mouseX}px ${mouseY}px,
      rgba(20, 184, 166, 0.05),
      transparent 80%
    )
  `;

  useEffect(() => {
    if (project) {
      getGalleryImages(project).then(setGalleryImages);
    }
  }, [project]);

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
          tech.name.toLowerCase() === topic.toLowerCase(),
      ),
    )
    .filter(Boolean);

  const displayImages =
    galleryImages.length > 0
      ? galleryImages
      : [
          {
            src: getImageUrl(project, "gallery/image1.png"),
            alt: "Desktop View",
          },
          {
            src: getImageUrl(project, "gallery/image2.png"),
            alt: "Mobile View",
          },
        ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  const marqueeItems = [
    project.name.replace(/-/g, " ").toUpperCase(),
    "•",
    t("project", "case_study"),
    "•",
    project.language?.toUpperCase() || "DEVELOPMENT",
    "•",
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`min-h-screen transition-colors duration-700 relative overflow-hidden ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <Header />

      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-100"
        style={{ background }}
      />

      <div className="pt-40 lg:pt-48 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal direction="up">
            <Link
              href="/#projects"
              className={`group inline-flex items-center gap-2 mb-16 p-2 rounded-full transition-all duration-500 border ${
                theme === "dark"
                  ? "text-gray-500 border-white/10 hover:border-white/20 hover:text-white"
                  : "text-gray-400 border-black/10 hover:border-black/20 hover:text-black"
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-neon-green/10 flex items-center justify-center group-hover:bg-neon-green/20 transition-all duration-500">
                <ArrowLeft className="w-4 h-4 text-neon-green" />
              </div>
              <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em] pr-4">
                {t("project", "back")}
              </span>
            </Link>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32 items-end">
            <div className="lg:col-span-8">
              <ScrollReveal direction="up" delay={100}>
                <span className="text-neon-green font-mono text-xs uppercase tracking-[0.6em] font-black block mb-6">
                  {formatDate(project.created_at)}
                </span>
                <h1
                  className={`text-[12vw] lg:text-[10rem] font-black leading-none tracking-tighter ${theme === "dark" ? "text-white" : "text-black"}`}
                >
                  {project.name.replace(/-/g, " ")}
                </h1>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-4 pb-4">
              <ScrollReveal direction="up" delay={200}>
                <div className="flex flex-col gap-4">
                  {project.homepage && (
                    <a
                      href={project.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-1 w-fit"
                    >
                      <span
                        className={`text-[10px] font-mono uppercase tracking-[0.3em] font-black ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}
                      >
                        {t("project", "live_preview")}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xl font-bold transition-all duration-500 group-hover:text-neon-green ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}
                        >
                          {t("project", "visit_site")}
                        </span>
                        <ArrowUpRight className="w-5 h-5 text-neon-green opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" />
                      </div>
                    </a>
                  )}
                  {project.html_url && (
                    <a
                      href={project.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-1 w-fit"
                    >
                      <span
                        className={`text-[10px] font-mono uppercase tracking-[0.3em] font-black ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}
                      >
                        {t("project", "source_code")}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xl font-bold transition-all duration-500 group-hover:text-neon-green ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}
                        >
                          {t("project", "github_repo")}
                        </span>
                        <Github className="w-5 h-5 text-neon-green opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" />
                      </div>
                    </a>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>

          <ScrollReveal direction="up" delay={300}>
            <div className="relative aspect-video lg:aspect-[21/9] rounded-[3.5rem] overflow-hidden mb-32 border border-white/[0.05]">
              <Image
                src={getImageUrl(project, "preview.webp")}
                alt={project.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
            <div className="lg:col-span-7">
              <ScrollReveal direction="up">
                <div className="space-y-12">
                  <div className="space-y-6">
                    <span className="text-neon-green font-mono text-[10px] uppercase tracking-[0.4em] font-black">
                      {t("project", "abstract")}
                    </span>
                    <h2
                      className={`text-3xl lg:text-5xl font-black ${theme === "dark" ? "text-white" : "text-black"}`}
                    >
                      {t("project", "vision")}
                    </h2>
                    <p
                      className={`text-xl lg:text-2xl leading-relaxed font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {project.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-5 space-y-12">
              <ScrollReveal direction="up" delay={200}>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <span className="text-neon-green font-mono text-[10px] uppercase tracking-[0.4em] font-black">
                      Technologies
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {projectTechs.map((tech: any) => (
                        <div
                          key={tech.id}
                          className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all duration-500 group ${
                            theme === "dark"
                              ? "bg-white/[0.02] border-white/[0.05] hover:border-neon-green/20"
                              : "bg-black/[0.02] border-black/[0.05] hover:bg-white hover:shadow-xl"
                          }`}
                        >
                          <tech.image
                            width={20}
                            height={20}
                            alt={tech.name}
                            className="grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                          <span
                            className={`text-[10px] font-mono font-black uppercase tracking-widest ${theme === "dark" ? "text-gray-500 group-hover:text-white" : "text-gray-400 group-hover:text-black"}`}
                          >
                            {tech.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 pt-8 border-t border-white/[0.05]">
                    <span className="text-neon-green font-mono text-[10px] uppercase tracking-[0.4em] font-black">
                      {t("project", "system_specs")}
                    </span>
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <span
                          className={`block text-[10px] font-mono uppercase tracking-widest mb-1 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}
                        >
                          {t("project", "language_label")}
                        </span>
                        <span
                          className={`text-lg font-bold ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}
                        >
                          {project.language || "TypeScript"}
                        </span>
                      </div>
                      <div>
                        <span
                          className={`block text-[10px] font-mono uppercase tracking-widest mb-1 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}
                        >
                          {t("project", "timeline")}
                        </span>
                        <span
                          className={`text-lg font-bold ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}
                        >
                          {formatDate(project.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          <ScrollReveal direction="up">
            <div className="space-y-12 mb-32">
              <div className="flex items-center gap-8">
                <h3
                  className={`text-sm font-mono font-black uppercase tracking-[0.4em] ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}
                >
                  {t("project", "gallery_label")}
                </h3>
                <div
                  className={`flex-1 h-px ${theme === "dark" ? "bg-white/[0.05]" : "bg-black/[0.05]"}`}
                />
              </div>
              <ImageGallery images={displayImages} />
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-20 opacity-20 grayscale hover:grayscale-0 transition-all duration-1000">
          <MarqueeSection
            items={marqueeItems}
            renderItem={(text, index) => (
              <div key={`${text}-${index}`} className="px-10">
                <span
                  className={`text-6xl lg:text-[15rem] font-black uppercase tracking-tighter transition-all duration-700 select-none ${
                    index % 2 === 0
                      ? "text-neon-green"
                      : theme === "dark"
                        ? "text-transparent stroke-white/10 [webkit-text-stroke:2px_rgba(255,255,255,0.05)]"
                        : "text-transparent stroke-black/10 [webkit-text-stroke:2px_rgba(0,0,0,0.05)]"
                  }`}
                >
                  {text}
                </span>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
