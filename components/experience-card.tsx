import { ScrollReveal } from "@/components/scroll-reveal";
import { useTheme } from "@/contexts/theme-context";

interface ExperienceCardProps {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  activities: string[];
  stack: string[];
  index: number;
}

export function ExperienceCard({
  role,
  company,
  startDate,
  endDate,
  activities,
  stack,
  index,
}: ExperienceCardProps) {
  const { theme } = useTheme();

  return (
    <ScrollReveal key={index} direction={index % 2 === 0 ? "left" : "right"} delay={index * 150}>
      <div className="group hover:transform hover:scale-105 transition-all duration-300">
        <h3
          className={`text-2xl font-bold mb-2 group-hover:text-neon-green transition-colors duration-300 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          {role}
        </h3>
        <div
          className={`mb-2 transition-colors duration-300 ${
            theme === "dark"
              ? "text-gray-400 group-hover:text-gray-300"
              : "text-gray-600 group-hover:text-gray-700"
          }`}
        >
          {company.replace(/\*\*/g, '')}
        </div>
        <div
          className={`text-sm mb-4 transition-colors duration-300 ${
            theme === "dark"
              ? "text-gray-500 group-hover:text-gray-400"
              : "text-gray-500 group-hover:text-gray-600"
          }`}
        >
          {startDate} – {endDate}
        </div>
        <ul
          className={`leading-relaxed transition-colors duration-300 ${
            theme === "dark" ? "text-gray-300 group-hover:text-white" : "text-gray-700 group-hover:text-black"
          }`}
        >
          {activities.map((desc, i) => (
            <li key={i}>- {desc}</li>
          ))}
        </ul>
        {stack.length > 0 && (
          <div className="mt-2 text-xs italic text-neon-green">
            Stack: {stack.join(", ").replace(/\*\*/g, '')}
          </div>
        )}
      </div>
    </ScrollReveal>
  );
} 