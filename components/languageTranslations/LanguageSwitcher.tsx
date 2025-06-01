"use client";

import { useLanguage } from "@/context/LanguageContext";
import { AvailableLanguage } from "@/types/languageTypes";
import { Check, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Language {
  code: AvailableLanguage;
  name: string;
}

export default function LanguageSwitcher() {
  const { lang, changeLang } = useLanguage();

  const languages: Language[] = [
    { code: "en", name: "English" },
    { code: "ro", name: "Romanian" },
  ];

  const currentLanguage = languages.find((language) => language.code === lang);

  const handleLanguageChange = (code: AvailableLanguage) => {
    // Just call changeLang - let LanguageProvider handle URL logic
    changeLang(code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span>{currentLanguage?.name || "Language"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span>{language.name}</span>
            {lang === language.code && <Check className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
