"use client";

import { ProjectCard } from "@/components/project-card";
import { useProjectsRequest } from "@/hooks/use-projects";
import { useTranslation } from "@/hooks/use-translation";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../contexts/theme-context";
import { ScrollReveal } from "./scroll-reveal";
import { SectionTitle } from "./section-title";

export function ProjectsSection() {
  const { theme } = useTheme();
  const { repos } = useProjectsRequest();
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const currentScroll = window.scrollY;
        const relativeScroll = currentScroll - sectionTop + window.innerHeight;
        setScrollY(relativeScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const projects = repos
    .filter((repo) => repo.topics.includes("pinned"))
    .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`py-40 transition-colors duration-300 relative overflow-hidden ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      {/* Subtle atmospheric glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#14b8a6_0%,_transparent_70%)] blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" className="mb-24 text-center lg:text-left">
          <SectionTitle title={t("projects", "title")} />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono">
          {projects.map((project, index) => (
            <ParallaxProjectCard
              key={project.id}
              project={project}
              index={index}
              totalCards={projects.length}
              scrollY={scrollY}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ParallaxProjectCardProps {
  project: any;
  index: number;
  totalCards: number;
  scrollY: number;
}

function ParallaxProjectCard({
  project,
  index,
  totalCards,
  scrollY,
}: ParallaxProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [translateX, setTranslateX] = useState(150);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    const handleScroll = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const cardTop = rect.top;
        const cardHeight = rect.height;
        const viewportHeight = window.innerHeight;

        // Calculate parallax offset based on position relative to viewport
        const cardCenter = cardTop + cardHeight / 2;
        const viewportCenter = viewportHeight / 2;
        const distanceFromCenter = cardCenter - viewportCenter;
        const parallax = distanceFromCenter * 0.03;
        setParallaxOffset(parallax);

        // Calculate opacity - MUCH FASTER increase
        // Start earlier and complete faster
        const opacityStart = viewportHeight * 0.5; // Start when card is 50% above viewport
        const opacityEnd = viewportHeight * -0.1; // Complete when card is 10% into viewport
        const opacityRange = opacityStart - opacityEnd;
        const opacityProgress = Math.max(
          0,
          Math.min(1, (viewportHeight - cardTop - opacityEnd) / opacityRange)
        );
        // Use aggressive easing for rapid opacity increase
        const opacityEase = 1 - Math.pow(1 - opacityProgress, 1.5);
        setOpacity(opacityEase);

        // Calculate horizontal movement - EVEN FASTER and more visible
        // Start movement much earlier, complete very quickly
        const horizontalStart = viewportHeight * 0.4; // Start when card is 40% above viewport
        const horizontalEnd = viewportHeight * -0.05; // Complete when card is 5% into viewport
        const horizontalRange = horizontalStart - horizontalEnd;

        const horizontalProgress = Math.max(
          0,
          Math.min(
            1,
            (viewportHeight - cardTop - horizontalEnd) / horizontalRange
          )
        );

        // Very aggressive easing for quick completion
        const easeOut = 1 - Math.pow(1 - horizontalProgress, 1.8);
        const translateXValue = 150 * (1 - easeOut);
        setTranslateX(translateXValue);
      }
    };

    if (cardRef.current) {
      observer.observe(cardRef.current);
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleScroll, { passive: true });
      handleScroll();
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isVisible]);

  // Minimal delay - cards appear almost simultaneously
  const delay = index * 50;
  const translateY = isVisible ? parallaxOffset : 60;
  const scale = isVisible && opacity > 0.2 ? 1 : 0.92;

  // Ensure minimum opacity of 0.6 so movement is always visible
  // This makes the horizontal movement visible even before full opacity
  const finalOpacity = Math.max(0.6, Math.min(1, opacity));
  const finalTranslateX = translateX;

  return (
    <div
      ref={cardRef}
      style={{
        opacity: finalOpacity,
        transform: `translateX(${finalTranslateX}px) translateY(${translateY}px) scale(${scale})`,
        transition: `opacity 600ms ease-out ${delay}ms, transform 0ms linear 0ms`,
        willChange: "transform, opacity",
      }}
    >
      <ProjectCard project={project} index={index} />
    </div>
  );
}
