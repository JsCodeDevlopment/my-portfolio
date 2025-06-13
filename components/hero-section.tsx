"use client"

import { Spotlight } from "@/components/ui/spotlight-new"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useTheme } from "../contexts/theme-context"
import { ScrollReveal } from "./scroll-reveal"

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { theme } = useTheme()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) * 0.05,
        y: (e.clientY - window.innerHeight / 2) * 0.05,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center justify-center pt-20 relative overflow-hidden transition-colors duration-300 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      {/* Background Grid */}
      <div
        className={`absolute inset-0 ${
          theme === "dark"
            ? "bg-[linear-gradient(rgba(20,184,166,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.1)_1px,transparent_1px)]"
            : "bg-[linear-gradient(rgba(20,184,166,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.2)_1px,transparent_1px)]"
        } bg-[size:50px_50px]`}
      ></div>

      <Spotlight />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full animate-float ${
              theme === "dark" ? "bg-neon-green/20" : "bg-neon-green/40"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
        <ScrollReveal direction="fade" className="text-center mb-8">
          <p
            className={`text-sm tracking-[0.2em] font-mono uppercase transition-colors duration-300 ${
              theme === "dark" ? "text-gray-500" : "text-gray-600"
            }`}
          >
            CRAFTING DIGITAL EXPERIENCES SINCE — Y:2023
          </p>
        </ScrollReveal>

        <div className="flex items-center justify-center min-h-[60vh] relative">
          <div className="relative">
            {/* Large Letters with staggered animation */}
            <div className="flex items-center justify-center flex-wrap">
              {["J", "O", "N", "A", "T", "A", "S"].map((letter, index) => (
                <ScrollReveal key={index} direction="up" delay={index * 100} duration={600}>
                  <div
                    className="text-[8rem]  md:text-[12rem] xl:text-[200px] leading-none font-black select-none text-neon-green transition-all duration-500 cursor-default hover:scale-110"
                    style={{
                      textShadow:
                        theme === "dark" ? "0 0 30px rgba(20, 184, 166, 0.5)" : "0 0 20px rgba(20, 184, 166, 0.3)",
                    }}
                  >
                    {letter}
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal direction="up" delay={800} duration={600} className="mt-4">
              <div
                className="text-[8rem] md:text-[12rem] xl:text-[200px] font-black leading-none select-none text-neon-green transition-all duration-500 cursor-default text-center hover:scale-110"
                style={{
                  textShadow:
                    theme === "dark" ? "0 0 30px rgba(20, 184, 166, 0.5)" : "0 0 20px rgba(20, 184, 166, 0.3)",
                }}
              >
                SILVA
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={1000} duration={600} className="mt-6">
              <p className={`text-base sm:text-lg md:text-xl lg:text-2xl mt-5 font-mono font-thin text-center max-w-xl mx-auto transition-colors duration-300 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                Jonatas Silva — Mid-level software engineer turning ideas into digital products for over {new Date().getFullYear() - 2023} years.
              </p>
            </ScrollReveal>

            {/* Profile Photo that follows mouse */}
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out"
              style={{
                transform: `translate(${-50 + mousePosition.x}%, ${-50 + mousePosition.y}%)`,
              }}
            >
              <ScrollReveal direction="scale" delay={1000} duration={800}>
                <div className="relative group">
                  <div
                    className={`w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 rounded-full overflow-hidden border-4 border-neon-green shadow-2xl transition-all duration-300 hover:scale-110 ${
                      theme === "dark"
                        ? "shadow-neon-green/50 hover:shadow-neon-green/80"
                        : "shadow-neon-green/30 hover:shadow-neon-green/60"
                    }`}
                  >
                    <Image
                      src="/images/jonatas-profile.jpg"
                      alt="Jonatas Silva"
                      width={224}
                      height={224}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-neon-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
