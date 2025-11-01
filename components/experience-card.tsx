import { ScrollReveal } from "@/components/scroll-reveal";
import { useTheme } from "@/contexts/theme-context";
import { useTranslation } from "@/hooks/use-translation";

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
  const { t } = useTranslation();

  return (
    <ScrollReveal
      key={index}
      direction={index % 2 === 0 ? "left" : "right"}
      delay={index * 150}
    >
      <div
        className={`group relative rounded-3xl p-6 lg:p-8 transition-all duration-700 hover:scale-[1.02] cursor-pointer overflow-hidden ${
          theme === "dark"
            ? "bg-gradient-to-br from-gray-900/40 via-gray-800/40 to-gray-900/40 backdrop-blur-xl border border-gray-800/30 hover:border-neon-green/20"
            : "bg-gradient-to-br from-white/40 via-gray-50/40 to-white/40 backdrop-blur-xl border border-gray-300/30 hover:border-neon-green/40"
        } shadow-2xl hover:shadow-neon-green/10`}
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% 98%, 98% 100%, 0% 100%)",
        }}
      >
        <div
          className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100 opacity-30 ${
            theme === "dark" ? "bg-neon-green/20" : "bg-neon-green/15"
          }`}
        />
        <div
          className={`absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100 opacity-20 ${
            theme === "dark" ? "bg-neon-green/15" : "bg-neon-green/10"
          }`}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-neon-green/0 via-neon-green/0 to-neon-green/0 group-hover:from-neon-green/8 group-hover:via-neon-green/3 group-hover:to-neon-green/8 transition-all duration-700 opacity-0 group-hover:opacity-100 blur-2xl"></div>

        <div className="absolute left-0 top-6 bottom-6 w-0.5 overflow-hidden">
          <div
            className="w-full h-full transition-all duration-700 group-hover:opacity-100 opacity-40 rounded-full"
            style={{
              background: `radial-gradient(circle, ${
                theme === "dark"
                  ? "rgba(20, 184, 166, 0.6)"
                  : "rgba(20, 184, 166, 0.7)"
              } 0%, transparent 100%)`,
              filter: "blur(2px)",
            }}
          />
        </div>

        <div className="absolute left-0 top-6 transform -translate-x-1/2">
          <div
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              theme === "dark"
                ? "bg-neon-green/40 group-hover:bg-neon-green border-2 border-neon-green/60 group-hover:border-neon-green group-hover:scale-150"
                : "bg-neon-green/50 group-hover:bg-neon-green border-2 border-neon-green/70 group-hover:border-neon-green group-hover:scale-150"
            }`}
            style={{
              boxShadow: `0 0 20px ${
                theme === "dark"
                  ? "rgba(20, 184, 166, 0.5)"
                  : "rgba(20, 184, 166, 0.6)"
              }`,
            }}
          />
        </div>

        <div className="relative z-10 pl-8">
          <div className="mb-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <h3
                  className={`text-xl md:text-2xl font-black mb-2 group-hover:text-neon-green transition-all duration-500 uppercase tracking-tight ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {role}
                </h3>
                <div
                  className={`text-base font-semibold mb-3 transition-colors duration-500 ${
                    theme === "dark"
                      ? "text-neon-green group-hover:text-neon-green-bright"
                      : "text-neon-green group-hover:text-neon-green-bright"
                  }`}
                >
                  {company.replace(/\*\*/g, "")}
                </div>
              </div>
            </div>

            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-500 backdrop-blur-sm ${
                theme === "dark"
                  ? "bg-gray-800/40 text-gray-300 border border-gray-700/30 group-hover:bg-neon-green/15 group-hover:border-neon-green/40 group-hover:text-neon-green"
                  : "bg-white/40 text-gray-700 border border-gray-300/30 group-hover:bg-neon-green/15 group-hover:border-neon-green/40 group-hover:text-neon-green"
              }`}
              style={{
                clipPath: "polygon(0% 0%, 100% 0%, 98% 100%, 2% 100%)",
              }}
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {startDate} – {endDate}
            </div>
          </div>

          <ul className="space-y-3 mb-5">
            {activities.map((desc, i) => (
              <li
                key={i}
                className={`flex items-start gap-3 text-sm leading-relaxed transition-colors duration-500 ${
                  theme === "dark"
                    ? "text-gray-400 group-hover:text-gray-200"
                    : "text-gray-600 group-hover:text-gray-800"
                }`}
              >
                <span
                  className={`mt-2 flex-shrink-0 w-2 h-2 rounded-full transition-all duration-500 ${
                    theme === "dark"
                      ? "bg-neon-green/40 group-hover:bg-neon-green group-hover:scale-125"
                      : "bg-neon-green/50 group-hover:bg-neon-green group-hover:scale-125"
                  }`}
                  style={{
                    filter: `blur(1px)`,
                  }}
                />
                <span className="flex-1">{desc}</span>
              </li>
            ))}
          </ul>

          {stack.length > 0 && (
            <div className="mt-5 pt-5 relative">
              <div
                className={`absolute top-0 left-0 right-0 h-px transition-all duration-500 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-transparent via-gray-800/50 to-transparent group-hover:via-neon-green/30"
                    : "bg-gradient-to-r from-transparent via-gray-300/50 to-transparent group-hover:via-neon-green/40"
                }`}
                style={{
                  clipPath: "polygon(2% 0%, 98% 0%, 100% 100%, 0% 100%)",
                }}
              />
              <h4
                className={`text-sm font-semibold mb-3 transition-colors duration-500 ${
                  theme === "dark"
                    ? "text-gray-400 group-hover:text-neon-green"
                    : "text-gray-600 group-hover:text-neon-green"
                }`}
              >
                {t("experience", "technologies_used")}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {stack.map((tech, i) => (
                  <span
                    key={i}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-gray-800/50 text-gray-300 border border-gray-700/40 group-hover:bg-neon-green/20 group-hover:border-neon-green/50 group-hover:text-neon-green"
                        : "bg-gray-100/60 text-gray-700 border border-gray-300/50 group-hover:bg-neon-green/15 group-hover:border-neon-green/40 group-hover:text-neon-green"
                    }`}
                  >
                    {tech.replace(/\*\*/g, "")}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl">
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              border: "2px solid rgba(20, 184, 166, 0.15)",
              filter: "blur(8px)",
              clipPath: "polygon(0% 0%, 100% 0%, 98% 100%, 2% 100%)",
            }}
          />
        </div>
      </div>
    </ScrollReveal>
  );
}
