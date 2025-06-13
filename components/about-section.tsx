"use client";

import { useTheme } from "../contexts/theme-context";
import { ScrollReveal } from "./scroll-reveal";
import { SectionTitle } from "./section-title";

export function AboutSection() {
  const { theme } = useTheme();

  const skills = [
    { name: "React", level: "1#", description: "Frontend" },
    { name: "Node.js", level: "2#", description: "Backend" },
    { name: "TypeScript", level: "3#", description: "Language" },
    { name: "Nest.js", level: "4#", description: "Backend" },
  ];

  return (
    <section
      id="about"
      className={`py-32 relative transition-colors duration-300 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <ScrollReveal direction="up" className="mb-16">
          <SectionTitle title="ABOUT" />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 font-mono">
          <div className="space-y-6">
            <ScrollReveal direction="left" delay={200}>
              <p
                className={`text-lg leading-relaxed transition-colors duration-300 ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-black"
                }`}
              >
                Hello! My name is Jonatas Silva, I am a software developer with
                over {new Date().getFullYear() - 2023} years of experience creating digital solutions focused on
                efficiency, performance and good user experience.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={400}>
              <p
                className={`text-lg leading-relaxed transition-colors duration-300 ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-black"
                }`}
              >
                Throughout my career, I have worked on projects in different
                segments and different project niches, which has given me a
                broader view of technology and business. I am familiar with
                frontend and backend development, but it is when creating
                solutions that connect purpose and technology that I feel most
                fulfilled.
              </p>
            </ScrollReveal>
          </div>

          <div className="space-y-6">
            <ScrollReveal direction="right" delay={200}>
              <p
                className={`text-lg leading-relaxed transition-colors duration-300 ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-black"
                }`}
              >
                I am driven by continuous learning, I enjoy working in a team
                and I see challenges as opportunities for growth. I always seek
                to write clean, well-structured and easy-to-maintain code. I am
                currently focused on building scalable applications and
                contributing to projects that generate a real impact on people's
                lives.
              </p>
            </ScrollReveal>

            <div className="space-y-4 mt-8">
              {skills.map((skill, index) => (
                <ScrollReveal
                  key={index}
                  direction="right"
                  delay={400 + index * 150}
                >
                  <div className="bg-neon-green rounded-lg p-4 hover:bg-neon-green-bright transition-all duration-300 hover:scale-105 cursor-pointer group">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-black font-bold text-lg group-hover:text-gray-900">
                          {skill.name}
                        </h3>
                        <p className="text-black/70 text-sm group-hover:text-gray-700">
                          {skill.description}
                        </p>
                      </div>
                      <div className="text-3xl font-black text-black/50 group-hover:text-gray-700">
                        {skill.level}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
