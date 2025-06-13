"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale"
  duration?: number
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 800,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay])

  const getInitialStyles = () => {
    switch (direction) {
      case "up":
        return "translate-y-12 opacity-0"
      case "down":
        return "-translate-y-12 opacity-0"
      case "left":
        return "translate-x-12 opacity-0"
      case "right":
        return "-translate-x-12 opacity-0"
      case "scale":
        return "scale-95 opacity-0"
      case "fade":
        return "opacity-0"
      default:
        return "translate-y-12 opacity-0"
    }
  }

  const getVisibleStyles = () => {
    return "translate-y-0 translate-x-0 scale-100 opacity-100"
  }

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${getVisibleStyles()} ${!isVisible ? getInitialStyles() : ""} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  )
}
