"use client";

import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface MarqueeProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

export function MarqueeSection<T>({ items, renderItem }: MarqueeProps<T>) {
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        "relative flex h-fit mt-20 w-full flex-col items-center justify-center overflow-hidden opacity-5",
        theme === "light" && "bg-black opacity-100"
      )}
    >
      <Marquee
        pauseOnHover
        className={cn("[--duration:30s]", theme === "light" && "bg-black")}
      >
        {items.map((item, index) => (
          <div key={index}>{renderItem(item)}</div>
        ))}
      </Marquee>
    </div>
  );
}
