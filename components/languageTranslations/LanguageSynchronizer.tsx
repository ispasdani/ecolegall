"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { AvailableLanguage } from "@/types/languageTypes";

const availableLanguages: AvailableLanguage[] = ["en", "ro"];

export default function LanguageSynchronizer() {
  const params = useParams();
  const rawUrlLang = params.lang;
  const urlLang = Array.isArray(rawUrlLang) ? rawUrlLang[0] : rawUrlLang;
  const { lang, changeLang } = useLanguage();

  // Use ref to track if we're in the middle of a language change initiated by the user
  const isChangingLang = useRef(false);

  useEffect(() => {
    // Only sync if we have a URL language and it's different from current language
    if (
      urlLang &&
      availableLanguages.includes(urlLang as AvailableLanguage) &&
      urlLang !== lang &&
      !isChangingLang.current // Don't sync if we're in the middle of a user-initiated change
    ) {
      isChangingLang.current = true;
      changeLang(urlLang as AvailableLanguage);

      // Reset the flag after a short delay
      setTimeout(() => {
        isChangingLang.current = false;
      }, 100);
    }
  }, [urlLang, lang, changeLang]);

  // Reset flag when URL changes (user navigated)
  useEffect(() => {
    isChangingLang.current = false;
  }, [urlLang]);

  // This component doesn't render anything visible
  return null;
}
