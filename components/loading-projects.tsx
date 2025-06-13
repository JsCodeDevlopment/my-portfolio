import { useTheme } from "@/contexts/theme-context";

export function Loading() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-[100vh] flex items-center justify-center transition-colors duration-300 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-neon-green border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p
          className={`text-xl font-mono ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Loading project...
        </p>
      </div>
    </div>
  );
}
