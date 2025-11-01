"use client";

import { MarqueeSection } from "@/components/ui/marquee-section";
import { useExperienceRequest } from "@/hooks/use-experience";
import { useTranslation } from "@/hooks/use-translation";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../contexts/theme-context";
import { ContactForm } from "./contact-form";
import { ScrollReveal } from "./scroll-reveal";
import { SectionTitle } from "./section-title";

export function ContactSection() {
  const { theme } = useTheme();
  const { t, language } = useTranslation();
  const { contactInfo } = useExperienceRequest(
    language === "en" ? "resume" : "curriculo"
  );
  const text = [
    "Jonatas Silva-",
    "Software Engineer",
    `- © Todos os direitos reservados. 2025-${new Date().getFullYear()}-`,
  ];

  if (!contactInfo) return null;

  return (
    <section
      id="contact"
      className={`pt-32 pb-20 transition-colors duration-300 relative overflow-hidden ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <ToastContainer position="top-right" />
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" className="mb-16">
          <SectionTitle title={t("contact", "title")} />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 font-mono">
          <ScrollReveal direction="left" delay={200}>
            <div className="space-y-8">
              <div
                className={`group relative rounded-3xl p-8 transition-all duration-700 overflow-hidden ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-gray-900/40 via-gray-800/40 to-gray-900/40 backdrop-blur-xl border border-gray-800/30 hover:border-neon-green/20"
                    : "bg-gradient-to-br from-white/40 via-gray-50/40 to-white/40 backdrop-blur-xl border border-gray-300/30 hover:border-neon-green/40"
                } shadow-2xl hover:shadow-neon-green/10`}
                style={{
                  clipPath:
                    "polygon(0% 0%, 100% 0%, 100% 98%, 98% 100%, 2% 100%, 0% 98%)",
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

                <div className="relative z-10">
                  <h3
                    className={`text-2xl font-black mb-6 transition-all duration-500 uppercase tracking-tight ${
                      theme === "dark"
                        ? "text-white group-hover:text-neon-green"
                        : "text-black group-hover:text-neon-green"
                    }`}
                  >
                    {t("contact", "get_in_touch") || "Get in Touch"}
                  </h3>

                  <p
                    className={`text-base mb-8 leading-relaxed transition-colors duration-300 ${
                      theme === "dark"
                        ? "text-gray-400 group-hover:text-gray-300"
                        : "text-gray-600 group-hover:text-gray-800"
                    }`}
                  >
                    {t("contact", "description")}
                  </p>

                  <div className="space-y-4">
                    <a
                      href={`tel:${contactInfo.phone.value.replace(/\D/g, "")}`}
                      className={`group/item flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                        theme === "dark"
                          ? "bg-gray-800/40 hover:bg-gray-800/60 border border-gray-700/30 hover:border-neon-green/40"
                          : "bg-gray-100/60 hover:bg-gray-100/80 border border-gray-300/30 hover:border-neon-green/40"
                      }`}
                    >
                      <div
                        className={`p-3 rounded-lg transition-all duration-300 ${
                          theme === "dark"
                            ? "bg-neon-green/10 group-hover/item:bg-neon-green/20"
                            : "bg-neon-green/10 group-hover/item:bg-neon-green/20"
                        }`}
                      >
                        <Phone
                          className={`w-5 h-5 transition-colors duration-300 ${
                            theme === "dark"
                              ? "text-neon-green group-hover/item:text-neon-green-bright"
                              : "text-neon-green group-hover/item:text-neon-green-bright"
                          }`}
                        />
                      </div>
                      <span
                        className={`flex-1 transition-colors duration-300 ${
                          theme === "dark"
                            ? "text-gray-300 group-hover/item:text-white"
                            : "text-gray-700 group-hover/item:text-black"
                        }`}
                      >
                        {contactInfo.phone.value}
                      </span>
                    </a>

                    <a
                      href={`mailto:${contactInfo.email.value}`}
                      className={`group/item flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                        theme === "dark"
                          ? "bg-gray-800/40 hover:bg-gray-800/60 border border-gray-700/30 hover:border-neon-green/40"
                          : "bg-gray-100/60 hover:bg-gray-100/80 border border-gray-300/30 hover:border-neon-green/40"
                      }`}
                    >
                      <div
                        className={`p-3 rounded-lg transition-all duration-300 ${
                          theme === "dark"
                            ? "bg-neon-green/10 group-hover/item:bg-neon-green/20"
                            : "bg-neon-green/10 group-hover/item:bg-neon-green/20"
                        }`}
                      >
                        <Mail
                          className={`w-5 h-5 transition-colors duration-300 ${
                            theme === "dark"
                              ? "text-neon-green group-hover/item:text-neon-green-bright"
                              : "text-neon-green group-hover/item:text-neon-green-bright"
                          }`}
                        />
                      </div>
                      <span
                        className={`flex-1 transition-colors duration-300 ${
                          theme === "dark"
                            ? "text-gray-300 group-hover/item:text-white"
                            : "text-gray-700 group-hover/item:text-black"
                        }`}
                      >
                        {contactInfo.email.value}
                      </span>
                    </a>

                    {contactInfo.social.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group/item flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                          theme === "dark"
                            ? "bg-gray-800/40 hover:bg-gray-800/60 border border-gray-700/30 hover:border-neon-green/40"
                            : "bg-gray-100/60 hover:bg-gray-100/80 border border-gray-300/30 hover:border-neon-green/40"
                        }`}
                      >
                        <div
                          className={`p-3 rounded-lg transition-all duration-300 ${
                            theme === "dark"
                              ? "bg-neon-green/10 group-hover/item:bg-neon-green/20"
                              : "bg-neon-green/10 group-hover/item:bg-neon-green/20"
                          }`}
                        >
                          {social.label.toLowerCase().includes("github") ? (
                            <Github
                              className={`w-5 h-5 transition-colors duration-300 ${
                                theme === "dark"
                                  ? "text-neon-green group-hover/item:text-neon-green-bright"
                                  : "text-neon-green group-hover/item:text-neon-green-bright"
                              }`}
                            />
                          ) : (
                            <Linkedin
                              className={`w-5 h-5 transition-colors duration-300 ${
                                theme === "dark"
                                  ? "text-neon-green group-hover/item:text-neon-green-bright"
                                  : "text-neon-green group-hover/item:text-neon-green-bright"
                              }`}
                            />
                          )}
                        </div>
                        <span
                          className={`flex-1 transition-colors duration-300 ${
                            theme === "dark"
                              ? "text-gray-300 group-hover/item:text-white"
                              : "text-gray-700 group-hover/item:text-black"
                          }`}
                        >
                          {social.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl overflow-hidden">
                  <div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      border: "2px solid rgba(20, 184, 166, 0.2)",
                      filter: "blur(8px)",
                      clipPath:
                        "polygon(0% 0%, 100% 0%, 100% 98%, 98% 100%, 2% 100%, 0% 98%)",
                    }}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={400}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </div>

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
