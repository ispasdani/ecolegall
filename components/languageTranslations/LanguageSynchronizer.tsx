"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { AvailableLanguage } from "@/types/languageTypes";

const availableLanguages: AvailableLanguage[] = ["en", "ro"];

export default function LanguageSynchronizer() {
  const params = useParams();
  const rawUrlLang = params.lang;
  const urlLang = Array.isArray(rawUrlLang) ? rawUrlLang[0] : rawUrlLang;
  const { lang, changeLang } = useLanguage();

  useEffect(() => {
    if (
      urlLang &&
      availableLanguages.includes(urlLang as AvailableLanguage) &&
      urlLang !== lang
    ) {
      changeLang(urlLang as AvailableLanguage);
    }
  }, [urlLang, lang, changeLang]);

  // This component doesn't render anything visible
  return null;
}
