import { Resume } from "@/hooks/use-experience";
import { calculateMonths, formatDuration, parseResumeDate } from "@/utils/date-utils";

export interface Experience {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  activities: string[];
  stack: string[];
  duration?: string;
  totalCompanyDuration?: string;
}

export class ExperienceParserService {
  static parseExperiences(markdownContent: string, resumeLang: Resume): Experience[] {
    try {
      const isPT = resumeLang === "curriculo";
      
      // Possible headers for the experience section
      const possibleHeaders = isPT 
        ? [
            "## 💼 Experiência Profissional", 
            "## Experiência Profissional", 
            "## Experiência", 
            "## 💼 Experiência",
            "## 💼 Professional Experience" // In case mixed
          ]
        : [
            "## 💼 Work Experience", 
            "## Work Experience", 
            "## Experience", 
            "## 💼 Experience",
            "## 💼 Professional Experience",
            "## Professional Experience"
          ];

      let experiencesSection = "";
      for (const header of possibleHeaders) {
        const sections = markdownContent.split(header);
        if (sections.length > 1) {
          experiencesSection = sections[1];
          break;
        }
      }

      // If no header found, try to find the content between Habilidades/Skills and Formação/Education
      if (!experiencesSection) {
        const startHeaders = isPT ? ["## 🛠 Habilidades", "## Habilidades"] : ["## 🛠 Skills", "## Skills"];
        const endHeaders = isPT ? ["## 🎓 Formação Acadêmica", "## Formação Acadêmica"] : ["## 🎓 Education", "## Education"];
        
        let startIndex = -1;
        for (const h of startHeaders) {
          const idx = markdownContent.indexOf(h);
          if (idx !== -1) {
            startIndex = idx + h.length;
            break;
          }
        }
        
        if (startIndex !== -1) {
          let endIndex = -1;
          for (const h of endHeaders) {
            const idx = markdownContent.indexOf(h, startIndex);
            if (idx !== -1) {
              endIndex = idx;
              break;
            }
          }
          
          if (endIndex !== -1) {
            experiencesSection = markdownContent.slice(startIndex, endIndex);
          } else {
            // If no end header, take everything after start
            experiencesSection = markdownContent.slice(startIndex);
          }
        }
      }

      if (!experiencesSection) {
        return [];
      }

      // Remove any subsequent major sections if they weren't removed by the fallback
      const nextSectionIndex = experiencesSection.indexOf("\n## ");
      if (nextSectionIndex !== -1) {
        experiencesSection = experiencesSection.slice(0, nextSectionIndex);
      }

      const rawExperiences = experiencesSection
        .split("---")
        .filter((exp) => exp.trim());

      const experiences = rawExperiences
        .map((exp) => {
          const trimmed = exp.trim();
          if (!trimmed.includes("###")) return null;

          const lines = trimmed.split("\n").filter((line) => line.trim());
          if (lines.length < 2) return null;

          // Find the line with the role and company (starts with ###)
          const headerLine = lines.find(l => l.startsWith("###"));
          if (!headerLine) return null;

          // Support different types of dashes: em dash (—), en dash (–), and hyphen (-)
          const parts = headerLine.replace("### ", "").split(/[—–-]/);
          if (parts.length < 2) return null;

          const role = parts[0].trim();
          const company = parts[1].replace(/\*\*/g, "").trim();

          // Find the line with the dates (usually the one after the header or containing bold dates)
          const dateLine = lines.find(l => l.match(/\*\*(.*?)[–—-].*?\*\*/));
          if (!dateLine) return null;

          const dateParts = dateLine.replace(/\*\*/g, "").split(/[–—-]/);
          const startDate = dateParts[0]?.trim() || "";
          const endDate = dateParts[1]?.trim() || "";

          const activities = lines
            .filter((line) => line.startsWith("- "))
            .map((line) => line.replace("- ", "").trim());

          const stackLine = lines.find(
            (line) => line.includes("Stack:") || line.includes("Ferramentas:") || line.includes("Tech:")
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

      // Calculate durations
      const companyDurations: Record<string, number> = {};
      
      experiences.forEach((exp) => {
        const start = parseResumeDate(exp.startDate, resumeLang);
        const end = parseResumeDate(exp.endDate, resumeLang);
        const months = calculateMonths(start, end);
        
        exp.duration = formatDuration(months, resumeLang);
        
        // Sum total time per company
        const companyKey = exp.company.toLowerCase().trim();
        companyDurations[companyKey] = (companyDurations[companyKey] || 0) + months;
      });

      // Assign total company duration to the first (latest) role of each company
      const processedCompanies = new Set<string>();
      experiences.forEach((exp) => {
        const companyKey = exp.company.toLowerCase().trim();
        const hasMultipleRoles = experiences.filter(e => e.company.toLowerCase().trim() === companyKey).length > 1;

        if (hasMultipleRoles && !processedCompanies.has(companyKey)) {
          exp.totalCompanyDuration = formatDuration(companyDurations[companyKey], resumeLang);
          processedCompanies.add(companyKey);
        }
      });

      return experiences;
    } catch (error) {
      console.error("Error parsing experiences:", error);
      return [];
    }
  }
}
