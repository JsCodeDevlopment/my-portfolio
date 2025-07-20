"use client";

import { LanguageSwitcher } from "@/components/language-switcher";
import { useTheme } from "@/contexts/theme-context";
import { useTranslation } from "@/hooks/use-translation";
import { Menu, Moon, Sun, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  let isProjectDetail = false;
  if (typeof window !== "undefined") {
    const path = window.location.pathname;
    isProjectDetail = /^\/projects\/[^/]+$/.test(path);
  }

  const navigationItems = [
    {
      key: "home",
      href: (typeof window !== "undefined" && isProjectDetail) ? "/" : "#home",
      translationKey: "home"
    },
    {
      key: "about",
      href: "#about",
      translationKey: "about"
    },
    {
      key: "projects",
      href: "#projects",
      translationKey: "projects"
    },
    {
      key: "experience",
      href: "#experience",
      translationKey: "experience"
    },
    {
      key: "contact",
      href: "#contact",
      translationKey: "contact"
    }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 dark:bg-black/80 light:bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Image
              src="/images/js-logo.png"
              alt="Jonatas Silva"
              className="w-10 h-10 rounded-full"
              width={100}
              height={100}
            />
          </div>

          <nav className="hidden md:flex items-center space-x-12 font-mono">
            {navigationItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-neon-green dark:hover:text-neon-green light:hover:text-neon-green transition-all duration-300 text-sm font-medium hover:glow"
              >
                {t("header", item.translationKey)}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <div className="flex items-center space-x-2">
              <Sun className="w-4 h-4 text-gray-400 dark:text-gray-400 light:text-gray-600" />
              <button
                onClick={toggleTheme}
                className="w-12 h-6 bg-gray-700 dark:bg-gray-700 light:bg-gray-300 rounded-full relative cursor-pointer hover:bg-gray-600 dark:hover:bg-gray-600 light:hover:bg-gray-400 transition-colors"
              >
                <div
                  className={`w-5 h-5 bg-neon-green rounded-full absolute top-0.5 transition-all duration-300 shadow-lg shadow-neon-green/50 ${
                    theme === "dark" ? "right-0.5" : "left-0.5"
                  }`}
                ></div>
              </button>
              <Moon className="w-4 h-4 text-gray-400 dark:text-gray-400 light:text-gray-600" />
            </div>
          </div>

          <button
            className="md:hidden p-2 text-white dark:text-white light:text-black hover:text-neon-green transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black dark:bg-black light:bg-white border-t border-gray-800 dark:border-gray-800 light:border-gray-200">
          <div className="px-6 py-4 space-y-4">
            {navigationItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="block text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-neon-green transition-colors"
              >
                {t("header", item.translationKey)}
              </a>
            ))}

            <div className="pt-4 border-t border-gray-800 dark:border-gray-800 light:border-gray-200 flex justify-between items-center">
              <LanguageSwitcher />
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-neon-green transition-colors"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
                <span>
                  {theme === "dark"
                    ? t("header", "lightMode")
                    : t("header", "darkMode")}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
