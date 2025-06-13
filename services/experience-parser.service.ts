import { Resume } from "@/hooks/use-experience";

export interface Experience {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  activities: string[];
  stack: string[];
}

export class ExperienceParserService {
  static parseExperiences(markdownContent: string, resumeLang: Resume): Experience[] {
    try {
      const experienceSection = resumeLang === "curriculo" ? "## 💼 Experiência Profissional" : "## 💼 Work Experience";
      const sections = markdownContent.split(experienceSection);

      if (sections.length < 2) {
        return [];
      }

      let experiencesSection = sections[1];
      const nextSectionIndex = experiencesSection.indexOf("\n## ");
      if (nextSectionIndex !== -1) {
        experiencesSection = experiencesSection.slice(0, nextSectionIndex);
      }

      const experiences = experiencesSection
        .split("---")
        .filter((exp) => exp.trim());

      return experiences
        .map((exp) => {
          const trimmed = exp.trim();
          if (!trimmed.startsWith("###")) return null;

          const lines = trimmed.split("\n").filter((line) => line.trim());

          const [role, company] = lines[0]
            .replace("### ", "")
            .split("—")
            .map((item) => item.trim());

          const [startDate, endDate] = lines[1]
            .replace("**", "")
            .replace("**", "")
            .split("–")
            .map((date) => date.trim());

          const activities = lines
            .filter((line) => line.startsWith("- "))
            .map((line) => line.replace("- ", "").trim());

          const stackLine = lines.find(
            (line) => line.includes("Stack:") || line.includes("Ferramentas:")
          );
          const stack = stackLine
            ? stackLine
                .split(":")[1]
                .trim()
                .split(",")
                .map((item) => item.trim())
            : [];

          return {
            role,
            company,
            startDate,
            endDate,
            activities,
            stack,
          };
        })
        .filter(Boolean) as Experience[];
    } catch (error) {
      console.error("Error parsing experiences:", error);
      return [];
    }
  }
}
