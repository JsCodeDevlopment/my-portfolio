import { LanguageProvider } from "@/contexts/language-context";
import type { Metadata } from "next";
import { Big_Shoulders_Display, Inter } from "next/font/google";
import type React from "react";
import { ThemeProvider } from "../contexts/theme-context";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const bigShouldersDisplay = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-big-shoulders-display",
});

export const metadata: Metadata = {
  title: "Jonatas Silva - Software Engineer",
  description: "Portfolio of Jonatas Silva, a passionate software engineer",
  generator: "Jonatas Silva",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${bigShouldersDisplay.className}`}>
        <LanguageProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
