"use client"

import { useTheme } from "../contexts/theme-context"

export function Footer() {
  const { theme } = useTheme()

  return (
    <footer className={`py-12 transition-colors duration-500 ${theme === "dark" ? "bg-black border-t border-white/[0.05]" : "bg-[#f8f9fa] border-t border-slate-200"}`}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p
              className={`font-mono text-[10px] uppercase tracking-widest transition-colors duration-300 ${
                theme === "dark" ? "text-gray-500" : "text-slate-400"
              }`}
            >
              © {new Date().getFullYear()} Jonatas Silva
            </p>
          </div>

          <div
            className={`font-mono text-[10px] uppercase tracking-widest transition-colors duration-300 ${
              theme === "dark" ? "text-gray-500" : "text-slate-400"
            }`}
          >
            Designed & Developed with <span className="text-neon-green">♥</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
