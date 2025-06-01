"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";

// Import all translation files
import en from "@/consts/translations/en";
import ro from "@/consts/translations/ro";
import { AvailableLanguage } from "@/types/languageTypes";

// Define types for the translations
type TranslationDictionary = Record<string, any>;

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
  // Define which routes should NOT update the URL when language changes
  publicRoutes?: string[];
}

export function LanguageProvider({
  children,
  initialLang = "en",
  publicRoutes = ["/", "/home"], // Default public routes
}: LanguageProviderProps) {
  const [lang, setLang] = useState<AvailableLanguage>(initialLang);
  const router = useRouter();
  const pathname = usePathname();

  // Check if current route is a public route (shouldn't update URL)
  const isPublicRoute = publicRoutes.some((route) => {
    // Remove language prefix from pathname for comparison
    const pathWithoutLang = pathname.replace(/^\/[a-z]{2}(\/|$)/, "/");
    return pathWithoutLang === route || pathWithoutLang.startsWith(route + "/");
  });

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

      // Only update URL if not on a public route
      if (!isPublicRoute) {
        // Handle URL updates for protected routes
        const currentPath = pathname;

        // If current path already has a language prefix, replace it
        if (currentPath.match(/^\/[a-z]{2}\//)) {
          const newPath = currentPath.replace(/^\/[a-z]{2}/, `/${newLang}`);

          // Only navigate if the path is actually different
          if (newPath !== currentPath) {
            router.push(newPath);
          } else {
          }
        } else {
          // Add language prefix to the current path
          const newPath = `/${newLang}${currentPath}`;
          router.push(newPath);
        }
      } else {
        console.log("Public route detected, not updating URL");
      }
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
