"use client";

import { ExperienceCard } from "@/components/experience-card";
import { useCountAnimation } from "@/hooks/use-count-animation";
import { useExperienceRequest } from "@/hooks/use-experience";
import { useTranslation } from "@/hooks/use-translation";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../contexts/theme-context";
import { ScrollReveal } from "./scroll-reveal";
import { SectionTitle } from "./section-title";

export function ExperienceSection() {
  const { theme } = useTheme();
  const { t, language } = useTranslation();
  const { experiences } = useExperienceRequest(
    language === "en" ? "resume" : "curriculo"
  );
  const statsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [timelinePath, setTimelinePath] = useState<string>("");
  const [pathPoints, setPathPoints] = useState<
    { x: number; y: number; side: "left" | "right" }[]
  >([]);

  const stats = [
    { number: 30, label: t("experience", "projects") },
    { number: 10, label: t("experience", "satisfied") },
    { number: 100, label: t("experience", "positive") },
  ];

  const countAnimations = stats.map((stat) =>
    useCountAnimation(stat.number, 2000, false)
  );

  const animationsRef = useRef(countAnimations);
  animationsRef.current = countAnimations;

  useEffect(() => {
    if (!statsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animationsRef.current.forEach((animation) => {
              animation.resetAnimation();
              setTimeout(() => {
                animation.startAnimation();
              }, 50);
            });
          } else {
            animationsRef.current.forEach((animation) => {
              animation.resetAnimation();
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: "50px" }
    );

    observer.observe(statsRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const calculateTimeline = () => {
      if (!timelineRef.current) return;

      const gridContainer = timelineRef.current.querySelector(
        "[data-card-container]"
      ) as HTMLElement;
      if (!gridContainer) return;

      const cards = Array.from(gridContainer.children) as HTMLElement[];
      if (cards.length < 2) return;

      const containerRect = timelineRef.current.getBoundingClientRect();
      const pathPoints: { x: number; y: number; side: "left" | "right" }[] = [];

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const relativeX = rect.left - containerRect.left + rect.width / 2;
        const relativeY = rect.top - containerRect.top;

        pathPoints.push({
          x: relativeX,
          y: relativeY,
          side: index % 2 === 0 ? "left" : "right",
        });
      });

      if (pathPoints.length < 2) return;

      let path = `M ${pathPoints[0].x} ${pathPoints[0].y}`;

      for (let i = 1; i < pathPoints.length; i++) {
        const prev = pathPoints[i - 1];
        const curr = pathPoints[i];

        const prevIsLeft = (i - 1) % 2 === 0;
        const currentIsLeft = i % 2 === 0;
        const prevCardHeight = cards[i - 1].getBoundingClientRect().height;
        const prevBottomY = prev.y + prevCardHeight;
        const isLastCard = i === pathPoints.length - 1;
        const currentCardHeight = cards[i].getBoundingClientRect().height;
        const currBottomY = curr.y + currentCardHeight;

        const isFirstConnection = i === 1;

        if (isFirstConnection) {
          const distanceX = curr.x - prev.x;

          const cp1X = prev.x + distanceX * 0.3;
          const cp1Y = prev.y;

          const cp2X = curr.x - distanceX * 0.3;
          const cp2Y = curr.y;

          path += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${curr.x} ${curr.y}`;
          path += ` M ${curr.x} ${currBottomY}`;
        } else {
          if (prevIsLeft !== currentIsLeft) {
            const targetY = isLastCard ? currBottomY : curr.y;
            const distanceY = targetY - prevBottomY;
            const distanceX = curr.x - prev.x;

            const cp1X = prev.x + distanceX * 0.5;
            const cp1Y = prevBottomY + distanceY * 0.2;

            const cp2X = prev.x + distanceX * 0.5;
            const cp2Y = targetY - distanceY * 0.1;

            path += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${curr.x} ${targetY}`;
          } else {
            const targetY = isLastCard ? currBottomY : curr.y;
            const distanceY = targetY - prevBottomY;

            const cp1X = prev.x + (curr.x - prev.x) * 0.2;
            const cp1Y = prevBottomY + distanceY * 0.5;

            const cp2X = curr.x - (curr.x - prev.x) * 0.2;
            const cp2Y = targetY - distanceY * 0.1;

            path += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${curr.x} ${targetY}`;
          }
        }
      }

      setTimelinePath(path);

      const finalPathPoints: {
        x: number;
        y: number;
        side: "left" | "right";
      }[] = [
        {
          x: pathPoints[0].x,
          y: pathPoints[0].y,
          side: "left",
        },
      ];
      for (let i = 1; i < pathPoints.length; i++) {
        const curr = pathPoints[i];
        const isLastCard = i === pathPoints.length - 1;
        const isFirstConnection = i === 1;
        const currentCardHeight = cards[i].getBoundingClientRect().height;

        if (isLastCard) {
          finalPathPoints.push({
            ...pathPoints[i],
            y: curr.y + currentCardHeight,
          });
        } else if (isFirstConnection) {
          finalPathPoints.push({
            ...pathPoints[i],
            y: curr.y,
          });
        } else {
          finalPathPoints.push({ ...pathPoints[i] });
        }
      }
      setPathPoints(finalPathPoints);
    };

    const handleResize = () => {
      setTimeout(calculateTimeline, 150);
    };

    const timer = setTimeout(() => {
      calculateTimeline();
    }, 500);

    const observer = new MutationObserver(() => {
      setTimeout(calculateTimeline, 100);
    });

    if (timelineRef.current) {
      observer.observe(timelineRef.current, {
        childList: true,
        subtree: true,
      });
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", calculateTimeline, { passive: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", calculateTimeline);
    };
  }, [experiences]);

  return (
    <section
      id="experience"
      className={`py-32 transition-colors duration-300 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <ScrollReveal direction="up" className="mb-16">
          <SectionTitle title={t("experience", "title")} />
        </ScrollReveal>

        <div ref={timelineRef} className="relative mb-20">
          {experiences.length > 1 && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <defs>
                <linearGradient
                  id="timeline-gradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor={
                      theme === "dark"
                        ? "rgba(20, 184, 166, 0.3)"
                        : "rgba(20, 184, 166, 0.4)"
                    }
                  />
                  <stop
                    offset="100%"
                    stopColor={
                      theme === "dark"
                        ? "rgba(20, 184, 166, 0.6)"
                        : "rgba(20, 184, 166, 0.7)"
                    }
                  />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d={timelinePath}
                fill="none"
                stroke="url(#timeline-gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
                opacity={timelinePath ? 0.7 : 0}
                className="transition-opacity duration-700"
                style={{
                  filter: `drop-shadow(0 0 8px ${
                    theme === "dark"
                      ? "rgba(20, 184, 166, 0.5)"
                      : "rgba(20, 184, 166, 0.6)"
                  })`,
                }}
              />
              {pathPoints.map((point, index) => (
                <circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r="6"
                  fill={
                    theme === "dark"
                      ? "rgba(20, 184, 166, 0.8)"
                      : "rgba(20, 184, 166, 0.9)"
                  }
                  opacity={timelinePath ? 1 : 0}
                  className="transition-opacity duration-700"
                  style={{
                    filter: `drop-shadow(0 0 12px ${
                      theme === "dark"
                        ? "rgba(20, 184, 166, 0.8)"
                        : "rgba(20, 184, 166, 0.9)"
                    })`,
                  }}
                />
              ))}
            </svg>
          )}

          <div
            data-card-container
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 font-mono relative"
            style={{ zIndex: 10 }}
          >
            {experiences.map((exp, index) => (
              <div key={index} data-card-index={index}>
                <ExperienceCard {...exp} index={index} />
              </div>
            ))}
          </div>
        </div>

        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <ScrollReveal
              key={index}
              direction="up"
              delay={index * 150}
              duration={800}
            >
              <div
                className={`group relative rounded-3xl p-6 lg:p-8 transition-all duration-700 hover:scale-105 cursor-pointer overflow-hidden ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-gray-900/40 via-gray-800/40 to-gray-900/40 backdrop-blur-xl border border-gray-800/30 hover:border-neon-green/20"
                    : "bg-gradient-to-br from-white/40 via-gray-50/40 to-white/40 backdrop-blur-xl border border-gray-300/30 hover:border-neon-green/40"
                } shadow-2xl hover:shadow-neon-green/10`}
                style={{
                  clipPath: "polygon(0% 0%, 100% 0%, 98% 100%, 2% 100%)",
                }}
              >
                <div
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100 opacity-20 ${
                    theme === "dark" ? "bg-neon-green/15" : "bg-neon-green/10"
                  }`}
                />
                <div
                  className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl transition-all duration-700 group-hover:scale-125 group-hover:opacity-100 opacity-15 ${
                    theme === "dark" ? "bg-neon-green/20" : "bg-neon-green/15"
                  }`}
                />

                <div className="absolute inset-0 bg-gradient-to-br from-neon-green/0 via-neon-green/0 to-neon-green/0 group-hover:from-neon-green/8 group-hover:via-neon-green/3 group-hover:to-neon-green/8 transition-all duration-700 opacity-0 group-hover:opacity-100 blur-2xl"></div>

                <div className="relative z-10 text-center">
                  <div className="text-5xl sm:text-7xl lg:text-8xl font-black mb-3 transition-all duration-700 group-hover:scale-105">
                    {countAnimations[index].count}+
                  </div>
                  <div
                    className={`text-base sm:text-lg font-bold transition-colors duration-500 font-mono uppercase tracking-wider ${
                      theme === "dark"
                        ? "text-gray-400 group-hover:text-neon-green"
                        : "text-gray-600 group-hover:text-neon-green"
                    }`}
                  >
                    {stat.label}
                  </div>
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl">
                  <div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      border: "2px solid rgba(20, 184, 166, 0.2)",
                      filter: "blur(8px)",
                      clipPath: "polygon(0% 0%, 100% 0%, 98% 100%, 2% 100%)",
                    }}
                  />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
