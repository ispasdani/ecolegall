"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// Import all translation files
import en from "@/consts/translations/en";
import ro from "@/consts/translations/ro";
import { AvailableLanguage } from "@/types/languageTypes";

// Define types for the translations
type TranslationDictionary = Record<string, any>;

// Define the available languages

const translations: Record<AvailableLanguage, TranslationDictionary> = {
  en,
  ro,
};

// Define the context type
interface LanguageContextType {
  lang: AvailableLanguage;
  changeLang: (newLang: AvailableLanguage) => void;
  t: (key: string) => string;
}

// Create the context with null as initial value
const LanguageContext = createContext<LanguageContextType | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
  initialLang?: AvailableLanguage;
}

export function LanguageProvider({
  children,
  initialLang = "en",
}: LanguageProviderProps) {
  const [lang, setLang] = useState<AvailableLanguage>(initialLang);

  // Load language preference from localStorage (client-side only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("preferredLanguage");
      if (savedLang && ["en", "ro"].includes(savedLang)) {
        setLang(savedLang as AvailableLanguage);
      }
    }
  }, []);

  // Save language preference when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("preferredLanguage", lang);
    }
  }, [lang]);

  const changeLang = (newLang: AvailableLanguage): void => {
    console.log("ChangeLang called with:", newLang);
    if (["en", "ro"].includes(newLang)) {
      setLang(newLang);
      console.log("Language set to:", newLang);
    } else {
      console.warn(`Invalid language code: ${newLang}`);
    }
  };

  // Translation function
  const t = (key: string): string => {
    const keys = key.split(".");
    let result: any = translations[lang] || translations.en;

    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    return result as string;
  };

  const contextValue: LanguageContextType = {
    lang,
    changeLang,
    t,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
