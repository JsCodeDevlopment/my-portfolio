"use client"

interface ScrollingTextProps {
  text: string
  direction?: "left" | "right"
  className?: string
}

export function ScrollingText({ text, direction = "left", className = "" }: ScrollingTextProps) {
  const animationClass = direction === "left" ? "animate-scroll-left" : "animate-scroll-right"

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className={`inline-block ${animationClass}`}>
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} className="mx-8">
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
