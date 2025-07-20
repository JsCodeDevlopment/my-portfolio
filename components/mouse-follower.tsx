import { useEffect, useRef, useState } from "react";

export function MouseFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isProject, setIsProject] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - (isProject ? 60 : 6)}px, ${e.clientY - (isProject ? 20 : 6)}px)`;
      }
    };
    const handleOver = (e: Event) => {
      if ((e.target as HTMLElement).closest('[data-cursor="project"]')) setIsProject(true);
    };
    const handleOut = (e: Event) => {
      if ((e.target as HTMLElement).closest('[data-cursor="project"]')) setIsProject(false);
    };
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [isProject]);

  return (
    <div
      ref={dotRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: isProject ? 120 : 12,
        height: isProject ? 40 : 12,
        borderRadius: isProject ? "999px" : "50%",
        background: isProject ? "rgba(30,30,30,0.3)" : "#fff",
        color: "#fff",
        border: isProject ? "1px solid #fff" : "none",
        boxShadow: isProject
          ? "none"
          : "0 0 2px 0.5px #fff, 0 0 4px 1px #faffd1",
        backdropFilter: isProject ? "blur(8px)" : undefined,
        WebkitBackdropFilter: isProject ? "blur(8px)" : undefined,
        pointerEvents: "none",
        zIndex: 9999,
        transition:
          "width 0.5s, height 0.5s, border-radius 0.5s, background 0.5s, border 0.5s, color 0.5s, box-shadow 0.5s, font-size 0.5s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "inherit",
        fontWeight: 500,
        fontSize: isProject ? 18 : 0,
        letterSpacing: 0.2,
        overflow: "hidden",
      }}
    >
      {isProject && (
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          View Project
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-up-right-icon lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
        </span>
      )}
    </div>
  );
} 