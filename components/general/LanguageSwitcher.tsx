// components/LanguageSwitcher.tsx
"use client";

import { useLanguage } from "@/context/LanguageContext";

type AvailableLanguage = "en";

interface Language {
  code: AvailableLanguage;
  name: string;
}

export default function LanguageSwitcher() {
  const { lang, changeLang } = useLanguage();

  const languages: Language[] = [{ code: "en", name: "English" }];

  return (
    <div className="language-switcher">
      {languages.map((language) => (
        <button
          key={language.code}
          onClick={() => changeLang(language.code)}
          className={`lang-button ${lang === language.code ? "active" : ""}`}
          aria-label={`Switch language to ${language.name}`}
        >
          {language.name}
        </button>
      ))}
    </div>
  );
}
