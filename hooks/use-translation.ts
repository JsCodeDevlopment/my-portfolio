"use client";

import { useLanguage } from "@/contexts/language-context";
import { translations } from "@/translations";

type TranslationValue = string;

export function useTranslation() {
  const { language } = useLanguage();

  const t = (section: keyof typeof translations.en, key: string, params?: Record<string, string>): string => {
    const translation = translations[language][section][key as keyof typeof translations.en[typeof section]] as TranslationValue;
    
    if (!translation) {
      console.warn(`Translation missing for ${section}.${key}`);
      return key;
    }

    if (params) {
      let result = translation;
      for (const [paramKey, value] of Object.entries(params)) {
        result = result.replace(`{${paramKey}}`, value);
      }
      return result;
    }

    return translation;
  };

  return { t, language };
} 