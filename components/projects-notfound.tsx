import { useTheme } from "@/contexts/theme-context";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ProjectsNotFound() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-[100vh] flex items-center justify-center transition-colors duration-300 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <div className="text-center space-y-6">
        <div className="w-20 h-20 mx-auto">
          <svg
            className={`w-full h-full ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="space-y-2">
          <h2
            className={`text-2xl font-bold font-mono ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Project Not Found
          </h2>
          <p
            className={`text-lg font-mono ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            The project you're looking for doesn't exist or has been removed.
          </p>
        </div>
        <Link
          href="/#projects"
          className={`inline-flex items-center font-mono gap-2 px-6 py-3 rounded-lg transition-colors duration-300 ${
            theme === "dark"
              ? "bg-gray-800 hover:bg-gray-700 text-neon-green"
              : "bg-gray-200 hover:bg-gray-300 text-neon-green"
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Projects
        </Link>
      </div>
    </div>
  );
}
