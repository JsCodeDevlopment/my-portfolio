"use client";

import { LanguageSwitcher } from "@/components/language-switcher";
import { useTheme } from "@/contexts/theme-context";
import { useTranslation } from "@/hooks/use-translation";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";

  const navigationItems = [
    { key: "home", href: "/", label: "home" },
    { key: "about", href: "/#about", label: "about" },
    { key: "projects", href: "/#projects", label: "projects" },
    { key: "experience", href: "/#experience", label: "experience" },
    { key: "contact", href: "/#contact", label: "contact" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (isHome && href.startsWith("/#")) {
      e.preventDefault();
      const id = href.replace("/#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled
          ? theme === "dark"
            ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.05] py-4"
            : "bg-white/80 backdrop-blur-xl border-b border-black/[0.05] py-4"
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div
              className={`relative w-10 h-10 rounded-xl overflow-hidden border transition-all duration-500 ${
                theme === "dark"
                  ? "border-white/10 group-hover:border-neon-green/50"
                  : "border-black/10 group-hover:border-black/30"
              }`}
            >
              <Image
                src="/images/js-logo.png"
                alt="JS"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                width={40}
                height={40}
              />
            </div>
            <div className="ml-4 hidden sm:block overflow-hidden">
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`block text-[10px] font-mono font-black uppercase tracking-[0.4em] ${theme === "dark" ? "text-white" : "text-black"}`}
              >
                Jonatas Silva
              </motion.span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-10">
            {navigationItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`group relative text-[10px] font-mono font-black uppercase tracking-[0.3em] transition-all duration-300 ${
                  theme === "dark"
                    ? "text-gray-500 hover:text-white"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                <span className="relative z-10">{t("header", item.label)}</span>
                <span className="absolute -bottom-1 left-0 w-full h-px bg-neon-green scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-8">
            <LanguageSwitcher />

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-xl border transition-all duration-500 ${
                  theme === "dark"
                    ? "border-white/10 hover:border-white/20 text-gray-500 hover:text-white bg-white/5"
                    : "border-black/10 hover:border-black/20 text-gray-400 hover:text-black bg-black/5"
                }`}
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              <Link
                href="/#contact"
                onClick={(e) => handleNavClick(e, "/#contact")}
                className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-neon-green text-black font-black text-[10px] uppercase tracking-widest hover:bg-neon-green-bright transition-all duration-500 hover:scale-105"
              >
                Hire Me
                <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>

          <button
            className={`lg:hidden p-3 rounded-xl border transition-all duration-500 ${
              theme === "dark"
                ? "border-white/10 text-white hover:bg-white/5"
                : "border-black/10 text-black hover:bg-black/5"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-neon-green" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`lg:hidden absolute top-full left-0 right-0 border-t transition-colors duration-500 ${
              theme === "dark"
                ? "bg-black border-white/[0.05]"
                : "bg-white border-black/[0.05]"
            } shadow-2xl`}
          >
            <div className="px-6 py-10 space-y-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`block text-2xl font-black uppercase tracking-tighter ${
                    theme === "dark"
                      ? "text-gray-500 hover:text-neon-green"
                      : "text-gray-400 hover:text-neon-green"
                  }`}
                >
                  {t("header", item.label)}
                </Link>
              ))}

              <div className="pt-8 border-t border-white/[0.05] flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <LanguageSwitcher />
                  <button
                    onClick={toggleTheme}
                    className={`flex items-center gap-3 p-3 rounded-xl border ${
                      theme === "dark"
                        ? "border-white/10 text-white"
                        : "border-black/10 text-black"
                    }`}
                  >
                    {theme === "dark" ? (
                      <Sun className="w-4 h-4" />
                    ) : (
                      <Moon className="w-4 h-4" />
                    )}
                    <span className="text-[10px] font-mono font-black uppercase tracking-widest">
                      {theme === "dark" ? "Light Mode" : "Dark Mode"}
                    </span>
                  </button>
                </div>

                <Link
                  href="/#contact"
                  onClick={(e) => handleNavClick(e, "/#contact")}
                  className="w-full py-4 rounded-2xl bg-neon-green text-black font-black text-sm uppercase tracking-[0.4em] flex items-center justify-center gap-2"
                >
                  Get in touch <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
