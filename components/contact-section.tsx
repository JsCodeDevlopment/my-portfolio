"use client";

import { MarqueeSection } from "@/components/ui/marquee-section";
import { useExperienceRequest } from "@/hooks/use-experience";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../contexts/theme-context";
import { ContactForm } from "./contact-form";
import { ScrollReveal } from "./scroll-reveal";
import { SectionTitle } from "./section-title";

export function ContactSection() {
  const { theme } = useTheme();
  const { contactInfo } = useExperienceRequest("resume");
  const text = ["Jonatas Silva-", "Software Engineer", `- © Todos os direitos reservados. 2025-${new Date().getFullYear()}-`];

  if (!contactInfo) return null;

  return (
    <section
      id="contact"
      className={`pt-32 transition-colors duration-300 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <ToastContainer position="top-right" />
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <ScrollReveal direction="up" className="mb-16">
          <SectionTitle title="CONTACT" />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 font-mono">
          <ScrollReveal direction="left" delay={200}>
            <div className="space-y-8">
              <div>
                <p
                  className={`text-lg mb-8 transition-colors duration-300 ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-black"
                  }`}
                >
                  Looking to start a project or you need consultation? Feel free
                  to contact me.
                </p>

                <div className="space-y-4">
                  <a
                    href={`tel:${contactInfo.phone.value.replace(/\D/g, "")}`}
                    className={`flex items-center gap-3 transition-colors duration-300 hover:text-neon-green ${
                      theme === "dark"
                        ? "text-gray-400 hover:text-gray-300"
                        : "text-gray-600 hover:text-gray-700"
                    }`}
                  >
                    <Phone className="w-5 h-5" />
                    <span>{contactInfo.phone.value}</span>
                  </a>

                  <a
                    href={`mailto:${contactInfo.email.value}`}
                    className="flex items-center gap-3 text-neon-green hover:text-neon-green-bright transition-colors duration-300 hover:underline"
                  >
                    <Mail className="w-5 h-5" />
                    <span>{contactInfo.email.value}</span>
                  </a>

                  {contactInfo.social.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-neon-green hover:text-neon-green-bright transition-colors duration-300 hover:underline"
                    >
                      {social.label.toLowerCase().includes("github") ? (
                        <Github className="w-5 h-5" />
                      ) : (
                        <Linkedin className="w-5 h-5" />
                      )}
                      <span>{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={400}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </div>

      {/* Footer Scrolling Text */}
      {/* <ScrollReveal direction="fade" delay={600} className="mt-32 py-8">
        <ScrollingText
          text="JONATAS SILVA - FULLSTACK DEVELOPER"
          className={`text-6xl sm:text-8xl lg:text-[12rem] font-black transition-colors duration-300 ${
            theme === "dark" ? "text-neon-green/30" : "text-neon-green/40"
          }`}
        />
        </ScrollReveal> */}

        <MarqueeSection
          items={text}
          renderItem={(text) => (
            <div key={text}>
              <text className="text-6xl text-neon-green sm:text-8xl lg:text-[15rem] font-black transition-colors duration-300 uppercase">
                {text}
              </text>
            </div>
          )}
        />
    </section>
  );
}
