"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../contexts/theme-context";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
}

export default function Particles({
  className = "",
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const particles = useRef<any[]>([]);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const { theme } = useTheme();

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", initCanvas);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", initCanvas);
    };
  }, [theme]);

  useEffect(() => {
    initCanvas();
  }, [refresh]);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  type Circle = {
    x: number;
    y: number;
    translateX: number;
    translateY: number;
    size: number;
    alpha: number;
    targetAlpha: number;
    dx: number;
    dy: number;
    magnetism: number;
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      particles.current = [];
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  };

  const circleParams = (): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const size = Math.floor(Math.random() * 2) + 1;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.2;
    const dy = (Math.random() - 0.5) * 0.2;
    const magnetism = 0.1 + Math.random() * 4;
    return {
      x,
      y,
      translateX,
      translateY,
      size,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  };

  const drawCircle = (circle: Circle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 2 * Math.PI);
      context.current.fillStyle = theme === "dark" 
        ? `rgba(20, 184, 166, ${alpha})` 
        : `rgba(20, 184, 166, ${alpha * 1.2})`;
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!update) {
        particles.current.push(circle);
      }
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h,
      );
    }
  };

  const drawParticles = () => {
    clearContext();
    const particleCount = quantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  };

  const remapValue = (
    value: number,
    start1: number,
    stop1: number,
    start2: number,
    stop2: number,
  ): number => {
    const rel = (value - start1) / (stop1 - start1);
    return start2 + rel * (stop2 - start2);
  };

  const animate = () => {
    clearContext();
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();

    particles.current.forEach((particle: Circle, i: number) => {
      // Handle the alpha
      const edgeactive = 20;
      const xDist = Math.min(particle.x, canvasSize.current.w - particle.x);
      const yDist = Math.min(particle.y, canvasSize.current.h - particle.y);
      const edgeDistance = Math.min(xDist, yDist);

      if (edgeDistance < edgeactive) {
        particle.targetAlpha = remapValue(
          edgeDistance,
          0,
          edgeactive,
          0,
          particle.targetAlpha,
        );
      }

      if (particle.alpha < particle.targetAlpha) {
        particle.alpha += 0.02;
      } else if (particle.alpha > particle.targetAlpha) {
        particle.alpha -= 0.02;
      }

      // Calculate relative mouse position
      const mouseX = mouse.current.x - rect.left;
      const mouseY = mouse.current.y - rect.top;

      // Move particle
      particle.x += particle.dx;
      particle.y += particle.dy;
      particle.translateX +=
        (mouseX / (staticity / particle.magnetism) -
          particle.translateX) /
        ease;
      particle.translateY +=
        (mouseY / (staticity / particle.magnetism) -
          particle.translateY) /
        ease;

      // Out of bounds
      if (
        particle.x < -particle.size ||
        particle.x > canvasSize.current.w + particle.size ||
        particle.y < -particle.size ||
        particle.y > canvasSize.current.h + particle.size
      ) {
        // Reset particle
        particles.current[i] = circleParams();
      } else {
        drawCircle(particle, true);
      }
    });

    // Draw lines between nearby particles
    if (context.current) {
        const mouseX = mouse.current.x - rect.left;
        const mouseY = mouse.current.y - rect.top;

        for (let i = 0; i < particles.current.length; i++) {
            for (let j = i + 1; j < particles.current.length; j++) {
                const p1 = particles.current[i];
                const p2 = particles.current[j];
                const p1x = p1.x + p1.translateX;
                const p1y = p1.y + p1.translateY;
                const p2x = p2.x + p2.translateX;
                const p2y = p2.y + p2.translateY;
                
                const dx = p1x - p2x;
                const dy = p1y - p2y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    // Check if mouse is near the line to highlight it
                    const midX = (p1x + p2x) / 2;
                    const midY = (p1y + p2y) / 2;
                    const mouseDist = Math.sqrt((midX - mouseX) ** 2 + (midY - mouseY) ** 2);
                    const highlight = mouseDist < 100 ? (1 - mouseDist / 100) * 0.2 : 0;

                    context.current.beginPath();
                    context.current.strokeStyle = theme === "dark" 
                        ? `rgba(20, 184, 166, ${(0.05 + highlight) * (1 - distance / 120)})`
                        : `rgba(20, 184, 166, ${(0.1 + highlight) * (1 - distance / 120)})`;
                    context.current.lineWidth = 0.5;
                    context.current.moveTo(p1x, p1y);
                    context.current.lineTo(p2x, p2y);
                    context.current.stroke();
                }
            }
        }
    }

    requestAnimationFrame(animate);
  };

  return (
    <div
      className={`pointer-events-none ${className}`}
      ref={canvasContainerRef}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
