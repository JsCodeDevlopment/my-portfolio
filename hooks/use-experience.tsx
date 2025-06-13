import { ContactParserService } from "@/services/contact-parser.service";
import { DecoderService } from "@/services/decoder.service";
import {
  AcademicEducation,
  Certificate,
  EducationCertificatesParserService,
} from "@/services/education-certificates-parser.service";
import {
  Experience,
  ExperienceParserService,
} from "@/services/experience-parser.service";
import { ContactInfo } from "@/types/contact.types";
import { useEffect, useState } from "react";

export type Resume = "curriculo" | "resume";

export interface Resumes {
  name: string;
  content: string;
  encoding: "base64";
  decodedContent?: string;
}

export function useExperienceRequest(resumeLang: Resume) {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<AcademicEducation | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/JsCodeDevlopment/my-resume/contents/${resumeLang}.md?ref=main`
        );
        const data = await response.json();
        if (data.content) {
          const decodedContent = DecoderService.decodeBase64(data.content);

          const experiences = ExperienceParserService.parseExperiences(
            decodedContent,
            resumeLang
          );
          setExperiences(experiences);

          const { education, certificates } =
            EducationCertificatesParserService.parse(
              decodedContent,
              resumeLang
            );
          setEducation(education);
          setCertificates(certificates);

          const contact = ContactParserService.parseContact(
            decodedContent,
            resumeLang
          );
          setContactInfo(contact);
        }
      } catch (error) {
        console.error("Error fetching resume data:", error);
      }
    };
    fetchData();
  }, [resumeLang]);

  return { experiences, education, certificates, contactInfo };
}
