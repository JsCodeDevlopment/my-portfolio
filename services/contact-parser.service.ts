import { Resume } from "@/hooks/use-experience";
import { ContactInfo } from "@/types/contact.types";

export class ContactParserService {
  static parseContact(
    markdownContent: string,
    resumeLang: Resume
  ): ContactInfo {
    try {
      // Try different possible section headers
      const possibleHeaders = [
        resumeLang === "curriculo" 
          ? ["## 📞 Contato", "## Contato", "## 📱 Contato", "## 📲 Contato"]
          : ["## 📞 Contact", "## Contact", "## 📱 Contact", "## 📲 Contact"]
      ].flat();

      let contactSectionContent = "";
      for (const header of possibleHeaders) {
        const sections = markdownContent.split(header);
        if (sections.length > 1) {
          contactSectionContent = sections[1];
          break;
        }
      }

      if (!contactSectionContent) {
        // If no section header found, try to find contact info anywhere in the content
        contactSectionContent = markdownContent;
      }

      // Find the next section or end of content
      const nextSectionIndex = contactSectionContent.indexOf("\n## ");
      if (nextSectionIndex !== -1) {
        contactSectionContent = contactSectionContent.slice(0, nextSectionIndex);
      }

      const lines = contactSectionContent
        .split("\n")
        .filter((line) => line.trim());

      // Look for contact information in any line
      const phoneLine = lines.find((line) => 
        line.includes("📞") || 
        line.includes("📱") || 
        line.includes("📲") ||
        line.toLowerCase().includes("phone") ||
        line.toLowerCase().includes("telefone")
      );

      const emailLine = lines.find((line) => 
        line.includes("✉️") || 
        line.includes("📧") ||
        line.toLowerCase().includes("email") ||
        line.toLowerCase().includes("e-mail")
      );

      const socialLines = lines.filter((line) => 
        line.includes("🔗") || 
        line.includes("github") || 
        line.includes("linkedin")
      );

      if (!phoneLine || !emailLine) {
        throw new Error("Required contact information (phone or email) not found");
      }

      // More flexible regex patterns
      const phoneMatch = phoneLine.match(/\*\*(.*?):\*\* (.*)/) || 
                        phoneLine.match(/(?:📞|📱|📲)?\s*\*\*(.*?):\*\* (.*)/) ||
                        phoneLine.match(/(?:📞|📱|📲)?\s*(.*?):\s*(.*)/);

      const emailMatch = emailLine.match(/\*\*(.*?):\*\* (.*)/) || 
                        emailLine.match(/(?:✉️|📧)?\s*\*\*(.*?):\*\* (.*)/) ||
                        emailLine.match(/(?:✉️|📧)?\s*(.*?):\s*(.*)/);

      if (!phoneMatch || !emailMatch) {
        throw new Error("Invalid contact information format");
      }

      const socialLinks = socialLines
        .map((line) => {
          // Try different patterns for social links
          const markdownMatch = line.match(/\[(.*?)\]\((.*?)\)/);
          const urlMatch = line.match(/(https?:\/\/[^\s]+)/);
          const labelMatch = line.match(/(?:github|linkedin)/i);

          if (markdownMatch) {
            return { label: markdownMatch[1], url: markdownMatch[2] };
          } else if (urlMatch && labelMatch) {
            return { 
              label: labelMatch[0].charAt(0).toUpperCase() + labelMatch[0].slice(1), 
              url: urlMatch[1] 
            };
          }
          return null;
        })
        .filter(Boolean) as { label: string; url: string }[];

      return {
        phone: {
          label: phoneMatch[1].trim(),
          value: phoneMatch[2].trim(),
        },
        email: {
          label: emailMatch[1].trim(),
          value: emailMatch[2].trim(),
        },
        social: socialLinks,
      };
    } catch (error) {
      console.error("Error parsing contact information:", error);
      throw error;
    }
  }
}
