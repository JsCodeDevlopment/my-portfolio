import { Resume } from "@/hooks/use-experience";

export interface AcademicEducation {
  course: string;
  institution: string;
  start: string;
}

export interface Certificate {
  title: string;
  institution: string;
  description: string[];
}

export class EducationCertificatesParserService {
  static parse(markdownContent: string, resumeLang: Resume) {
    // Definições de acordo com o idioma
    const isPT = resumeLang === "curriculo";
    const educationSectionTitle = isPT ? "## 🎓 Formação Acadêmica" : "## 🎓 Education";
    const certSectionTitle = isPT ? "## 📜 Certificações" : "## 📜 Certifications";

    // Formação Acadêmica / Education
    const educationSection = markdownContent.split(educationSectionTitle)[1]?.split("---")[0] || "";
    const courseMatch = isPT
      ? educationSection.match(/\*\*Curso:\*\*\s*(.+)/)
      : educationSection.match(/\*\*Degree:\*\*\s*(.+)/);
    const institutionMatch = educationSection.match(/\*\*(?:Instituição|Institution):\*\*\s*(.+)/);
    const startMatch = isPT
      ? educationSection.match(/\*\*(?:Ingresso|Início):\*\*\s*(.+)/)
      : educationSection.match(/\*\*Start Date:\*\*\s*(.+)/);

    const education: AcademicEducation | null = courseMatch && institutionMatch && startMatch
      ? {
          course: courseMatch[1].trim(),
          institution: institutionMatch[1].trim(),
          start: startMatch[1].trim(),
        }
      : null;

    // Certificações / Certifications
    const certSection = markdownContent.split(certSectionTitle)[1]?.split("---")[0] || "";
    const certBlocks = certSection.split("\n- ").filter(Boolean);

    const certificates: Certificate[] = certBlocks
      .map(block => {
        if (!block.trim()) return null;
        const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
        const header = lines[0];
        if (!header) return null;
        
        // Support different dash types
        const headerMatch = header.match(/\*\*(.+)\*\*\s*[–—-]\s*(.+)/);
        const title = headerMatch ? headerMatch[1].trim() : "";
        const institution = headerMatch ? headerMatch[2].trim() : "";
        
        const descLines = lines.slice(1);
        const description = descLines.join(" ").split(".").map(s => s.trim()).filter(Boolean);
        return { title, institution, description };
      })
      .filter(Boolean) as Certificate[];

    return { education, certificates };
  }
}
 