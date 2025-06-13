import { ScrollReveal } from "@/components/scroll-reveal";
import { useTheme } from "@/contexts/theme-context";

interface EducationCardProps {
  course: string;
  institution: string;
  start: string;
  description?: string[];
  index?: number;
}

export function EducationCard({ course, institution, start, description, index = 0 }: EducationCardProps) {
  const { theme } = useTheme();

  return (
    <ScrollReveal direction="left" delay={index * 200}>
      <div className="group hover:transform hover:scale-105 transition-all duration-300">
        <h3
          className={`text-2xl font-bold mb-2 group-hover:text-neon-green transition-colors duration-300 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          {course}
        </h3>
        <div
          className={`mb-2 transition-colors duration-300 ${
            theme === "dark"
              ? "text-gray-400 group-hover:text-gray-300"
              : "text-gray-600 group-hover:text-gray-700"
          }`}
        >
          {institution}
        </div>
        <div
          className={`text-sm mb-4 transition-colors duration-300 ${
            theme === "dark"
              ? "text-gray-500 group-hover:text-gray-400"
              : "text-gray-500 group-hover:text-gray-600"
          }`}
        >
          {start}
        </div>
        {description && (
          <ul
            className={`text-sm mb-2 transition-colors duration-300 ${
              theme === "dark"
                ? "text-gray-300 group-hover:text-white"
                : "text-gray-700 group-hover:text-black"
            }`}
          >
            {description.map((desc, i) => (
              <li className="text-neon-green" key={i}>- {desc}</li>
            ))}
          </ul>
        )}
      </div>
    </ScrollReveal>
  );
} 