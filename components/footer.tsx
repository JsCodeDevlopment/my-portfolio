"use client"

import { useTheme } from "../contexts/theme-context"

export function Footer() {
  const { theme } = useTheme()

  return (
    <footer className={`py-12 transition-colors duration-300 ${theme === "dark" ? "bg-gray-100" : "bg-gray-900"}`}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p
              className={`font-light transition-colors duration-300 ${
                theme === "dark" ? "text-dark-600" : "text-gray-300"
              }`}
            >
              © 2024 Jonatas Silva
            </p>
          </div>

          <div
            className={`font-light transition-colors duration-300 ${
              theme === "dark" ? "text-dark-600" : "text-gray-300"
            }`}
          >
            Designed & Developed with ❤️
          </div>
        </div>
      </div>
    </footer>
  )
}
