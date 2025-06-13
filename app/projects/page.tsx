"use client"

import { Header } from "../../components/header"
import { ProjectsSection } from "../../components/projects-section"
import { useTheme } from "../../contexts/theme-context"

export default function ProjectsPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === "dark" ? "bg-black" : "bg-white"}`}>
      <Header />
      <div className="pt-20">
        <ProjectsSection />
      </div>
    </div>
  )
}
