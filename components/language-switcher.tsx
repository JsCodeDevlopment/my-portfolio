"use client";

import { useLanguage } from "@/contexts/language-context";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "pt" : "en")}
      className={`relative w-16 h-7 rounded-full transition-all duration-300 flex items-center p-0.5 bg-gray-700`}
    >
      <div className={`absolute flex items-center justify-center w-6 h-6 rounded-full transition-transform duration-300 ${
        language === "en" 
          ? "translate-x-9 bg-neon-green" 
          : "translate-x-0 bg-neon-green"
      }`}>
        <span className="text-[10px] font-medium text-black">
          {language === "en" ? "EN" : "PT"}
        </span>
      </div>
      <div className="flex justify-between w-full px-1.5">
        <span className={`text-[10px] font-medium ${language === "en" ? "text-gray-400" : "text-black"}`}>PT</span>
        <span className={`text-[10px] font-medium ${language === "en" ? "text-black" : "text-gray-400"}`}>EN</span>
      </div>
    </button>
  );
} 