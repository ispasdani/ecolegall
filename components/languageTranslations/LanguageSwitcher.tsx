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
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

interface Language {
  code: AvailableLanguage;
  name: string;
}

export default function LanguageSwitcher() {
  const { lang, changeLang } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  console.log("Current language:", lang); // Debug current language

  const languages: Language[] = [
    { code: "en", name: "English" },
    { code: "ro", name: "Romanian" },
  ];

  const currentLanguage = languages.find((language) => language.code === lang);

  const handleLanguageChange = (code: AvailableLanguage) => {
    console.log("Changing language to:", code); // Debug language change
    changeLang(code);

    // Update URL to reflect language change
    // Extract current language from URL and replace it
    const pathParts = pathname.split("/");

    // Assuming language is the first part of the path after the initial slash
    if (
      pathParts.length > 1 &&
      languages.some((l) => l.code === pathParts[1])
    ) {
      pathParts[1] = code;
      const newPath = pathParts.join("/");
      router.push(newPath);
    } else {
      // If no language in path, add it
      const newPath = `/${code}${pathname}`;
      router.push(newPath);
    }
  };

  // Debug re-renders
  useEffect(() => {
    console.log("LanguageSwitcher rendered with language:", lang);
  }, [lang]);

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
